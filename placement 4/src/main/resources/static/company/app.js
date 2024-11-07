document.addEventListener("DOMContentLoaded", function() {
    const companyId = localStorage.getItem('companyId');
    if (!companyId) {
        alert("No company ID found, please login or signup first.");
        window.location.href = "login.html";
        return;
    }

    // Fetch company data
    fetch(`http://localhost:8080/companies/${companyId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch company data');
            }
            return response.json();
        })
        .then(data => {
            // Ensure data contains expected fields
            if (data && data.name && data.companyType && data.contactPerson && data.email && data.noOfVacancies && data.criteriaCgpa && data.interviewDate) {
                document.getElementById('company-name').innerText = data.name;
                document.getElementById('company-type').innerText = data.companyType;
                document.getElementById('contact-person').innerText = data.contactPerson;
                document.getElementById('company-email').innerText = data.email;
                document.getElementById('no-of-vacancies').innerText = data.noOfVacancies;
                document.getElementById('criteria-cgpa').innerText = data.criteriaCgpa;
                document.getElementById('interview-date').innerText = data.interviewDate;

                // Pre-fill edit form with current data
                document.getElementById('edit-name').value = data.name;
                document.getElementById('edit-company-type').value = data.companyType;
                document.getElementById('edit-contact-person').value = data.contactPerson;
                document.getElementById('edit-email').value = data.email;
                document.getElementById('edit-vacancies').value = data.noOfVacancies;
                document.getElementById('edit-cgpa').value = data.criteriaCgpa;
                document.getElementById('edit-date').value = data.interviewDate;
            } else {
                throw new Error('Incomplete data received from server');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error fetching profile data. Please try again later.");
        });

    // Open edit modal
    document.getElementById("edit-profile").addEventListener("click", function() {
        document.getElementById("edit-profile-modal").style.display = "block";
    });

    // Close edit modal
    document.getElementById("close-modal").addEventListener("click", function() {
        document.getElementById("edit-profile-modal").style.display = "none";
    });

    // Handle profile update form submission
    document.getElementById("editProfileForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const updatedData = {
            name: document.getElementById("edit-name").value,
            companyType: document.getElementById("edit-company-type").value,
            contactPerson: document.getElementById("edit-contact-person").value,
            email: document.getElementById("edit-email").value,
            noOfVacancies: parseInt(document.getElementById("edit-vacancies").value),
            criteriaCgpa: parseFloat(document.getElementById("edit-cgpa").value),
            interviewDate: document.getElementById("edit-date").value
        };

        fetch(`http://localhost:8080/companies/${companyId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to update profile");
            }
            return response.json();
        })
        .then(() => {
            alert("Profile updated successfully");
            window.location.reload();
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error updating profile. Please try again.");
        });
    });

    // Handle logout
    document.getElementById("logout").addEventListener("click", function() {
        localStorage.removeItem('companyId');
        window.location.href = "login.html";
    });
});
