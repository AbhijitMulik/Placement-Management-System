document.addEventListener("DOMContentLoaded", function() {
    const studentId = localStorage.getItem('studentId');
    if (!studentId) {
        alert("No student ID found, please login or signup first.");
        window.location.href = "login.html";
        return;
    }

    // Fetch student data
    fetch(`http://localhost:8080/students/${studentId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch student data');
            }
            return response.json();
        })
        .then(data => {
            // Ensure data contains expected fields
            if (data && data.name && data.email && data.dept && data.cgpa && data.skills) {
                document.getElementById('student-name').innerText = data.name;
                document.getElementById('student-email').innerText = data.email;
                document.getElementById('student-dept').innerText = data.dept;
                document.getElementById('student-cgpa').innerText = data.cgpa;
                document.getElementById('student-skills').innerText = data.skills;

                // Pre-fill edit form with current data
                document.getElementById('edit-name').value = data.name;
                document.getElementById('edit-email').value = data.email;
                document.getElementById('edit-dept').value = data.dept;
                document.getElementById('edit-cgpa').value = data.cgpa;
                document.getElementById('edit-skills').value = data.skills;
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
            email: document.getElementById("edit-email").value,
            dept: document.getElementById("edit-dept").value,
            cgpa: parseFloat(document.getElementById("edit-cgpa").value),
            skills: document.getElementById("edit-skills").value,
        };

        fetch(`http://localhost:8080/students/${studentId}`, {
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


    fetch("http://localhost:8080/students/verifiedCompanies")
            .then(response => response.json())
            .then(companies => {
                const verifiedCompanyList = document.getElementById("verified-company-list");
                companies.forEach(company => {
                    const companyItem = document.createElement("div");
                    companyItem.innerHTML = `
                        <p>${company.name}</p>
                        <button>Apply Now</button>
                    `;
                    verifiedCompanyList.appendChild(companyItem);
                });
            });

    // Handle logout
    document.getElementById("logout").addEventListener("click", function() {
        localStorage.removeItem('studentId');
        window.location.href = "login.html";
    });
});
