document.addEventListener("DOMContentLoaded", function() {
    const pcId = localStorage.getItem('pcId');
    if (!pcId) {
        alert("No Placement Coordinator ID found, please login or signup first.");
        window.location.href = "login.html";
        return;
    }

    // Fetch placement coordinator data
    fetch(`http://localhost:8080/pcs/${pcId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch placement coordinator data');
            }
            return response.json();
        })
        .then(data => {
            // Ensure data contains expected fields
            if (data && data.name && data.email && data.dept && data.contactNo) {
                document.getElementById('pc-name').innerText = data.name;
                document.getElementById('pc-email').innerText = data.email;
                document.getElementById('pc-dept').innerText = data.dept;
                document.getElementById('pc-contactNo').innerText = data.contactNo;

                // Pre-fill edit form with current data
                document.getElementById('edit-name').value = data.name;
                document.getElementById('edit-email').value = data.email;
                document.getElementById('edit-dept').value = data.dept;
                document.getElementById('edit-contactNo').value = data.contactNo;
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
            contactNo: document.getElementById("edit-contactNo").value,
        };

        fetch(`http://localhost:8080/pcs/${pcId}`, {
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
        localStorage.removeItem('pcId');
        window.location.href = "login.html";
    });
});
