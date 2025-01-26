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
    }); // <- This is where the bracket was missing.

    // Fetch verified companies
    
         // Fetch the list of companies
         fetch("http://localhost:8080/students/verifiedCompanies")
         .then(response => response.json())
         .then(companies => {
             const companyListDiv = document.getElementById('company-list');
             companyListDiv.innerHTML = ''; // Clear previous list

             companies.forEach(company => {
                 const companyDiv = document.createElement('div');
                 companyDiv.classList.add('company-item');

                 const applyButton = document.createElement('button');
                 applyButton.innerText = "Apply Now";
                 applyButton.id = `apply-button-${company.id}`;
                 
                 // Check if the student has already applied
                 fetch(`http://localhost:8080/students/${studentId}/has-applied/${company.id}`)
                     .then(response => response.json())
                     .then(data => {
                         if (data.hasApplied) {
                             applyButton.innerText = "Applied";
                             applyButton.disabled = true;
                         }
                     });

                 applyButton.addEventListener('click', function() {
                     applyToCompany(studentId, company.id);
                 });

                 companyDiv.innerHTML = `
                     <h4>${company.name}</h4>
                     <p>${company.companyType}</p>
                     <p>Criteria: CGPA >= ${company.criteriaCgpa}</p>
                 `;
                 companyDiv.appendChild(applyButton);
                 companyListDiv.appendChild(companyDiv);
             });
         });
 })
 .catch(error => {
     console.error("Error fetching student data:", error);
     alert("Error fetching profile data.");
 });

    // Handle logout
    document.getElementById("logout").addEventListener("click", function() {
        localStorage.removeItem('studentId');
        window.location.href = "login.html";
    });


// Apply for company function with button update
window.applyForCompany = function(companyId, button) {
    const studentId = localStorage.getItem('studentId');
    
    fetch(`http://localhost:8080/students/${studentId}/apply/${companyId}`, { method: "POST" })
        .then(response => response.json())
        .then(data => {
            alert(data);
            // Change button to "Applied"
            button.innerText = "Applied";
            button.disabled = true; // Disable the button after applying
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error applying for the company.");
        });
};
