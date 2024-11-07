document.addEventListener("DOMContentLoaded", function () {
    // Ensure elements are loaded before adding event listeners
    const editProfileButton = document.getElementById("edit-profile");
    const closeButton = document.getElementById("close-modal");
    const editProfileModal = document.getElementById("edit-profile-modal");

    // Check if the elements exist and add event listeners
    if (editProfileButton) {
        editProfileButton.addEventListener("click", function () {
            editProfileModal.style.display = "block";
            console.log("Form opened");
        });
    } else {
        console.error("Edit Profile button not found in the DOM.");
    }

    if (closeButton) {
        closeButton.addEventListener("click", function () {
            editProfileModal.style.display = "none";
        });
    } else {
        console.error("Close modal button not found in the DOM.");
    }

    // Get TPO ID from localStorage
    const tpoId = localStorage.getItem("tpoId");
    if (!tpoId) {
        alert("No TPO ID found, please login or signup first.");
        window.location.href = "login.html";
        return;
    }

    // Fetch TPO data
    fetch(`http://localhost:8080/tpos/${tpoId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch TPO data");
            }
            return response.json();
        })
        .then((data) => {
            if (data && data.name && data.email && data.contactNo) {
                document.getElementById("tpo-name").innerText = data.name;
                document.getElementById("tpo-email").innerText = data.email;
                document.getElementById("tpo-contactNo").innerText = data.contactNo;

                // Pre-fill the edit form with current data
                document.getElementById("edit-name").value = data.name;
                document.getElementById("edit-email").value = data.email;
                document.getElementById("edit-contactNo").value = data.contactNo;
            } else {
                throw new Error("Incomplete data received from server");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Error fetching profile data. Please try again later.");
        });

    // Fetch all companies
    fetch("http://localhost:8080/tpos/companies")
        .then((response) => response.json())
        .then((companies) => {
            const companyList = document.getElementById("company-list");
            companies.forEach((company) => {
                const companyItem = document.createElement("div");
                companyItem.classList.add("company-details");
                companyItem.innerHTML = `
                    <p><strong>Name:</strong> ${company.name}</p>
                    <p><strong>Type:</strong> ${company.companyType}</p>
                    <p><strong>Contact Person:</strong> ${company.contactPerson}</p>
                    <p><strong>Email:</strong> ${company.email}</p>
                    <p><strong>Vacancies:</strong> ${company.noOfVacancies}</p>
                    <p><strong>Criteria CGPA:</strong> ${company.criteriaCgpa}</p>
                    <p><strong>Interview Date:</strong> ${new Date(company.interviewDate).toLocaleDateString()}</p>
                `;

                if (company.verified) {
                    const verifiedStatus = document.createElement("div");
                    verifiedStatus.classList.add("verified");
                    verifiedStatus.innerHTML = `Verified <span class="verified-icon">✔️</span>`;
                    companyItem.appendChild(verifiedStatus);
                } else {
                    const verifyButton = document.createElement("button");
                    verifyButton.textContent = "Verify";
                    verifyButton.addEventListener("click", function () {
                        verifyCompany(company.id, companyItem);
                    });
                    companyItem.appendChild(verifyButton);
                }

                companyList.appendChild(companyItem);
            });
        })
        .catch((error) => {
            console.error("Error fetching companies:", error);
        });

       

    // Handle form submission for profile update
    document.getElementById("editProfileForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const updatedTpo = {
            name: document.getElementById("edit-name").value,
            email: document.getElementById("edit-email").value,
            contactNo: document.getElementById("edit-contactNo").value,
        };

        fetch(`http://localhost:8080/tpos/${tpoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTpo),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update profile");
                }
                return response.json();
            })
            .then(() => {
                alert("Profile updated successfully!");
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
                alert("Error updating profile. Please try again later.");
            });
    });

    // Function to verify a company
    function verifyCompany(companyId, companyItem) {
        fetch(`http://localhost:8080/tpos/verifyCompany/${companyId}`, {
            method: "PUT",
        })
            .then(() => {
                const verifyButton = companyItem.querySelector("button");
                if (verifyButton) {
                    verifyButton.remove();
                }

                const verifiedStatus = document.createElement("div");
                verifiedStatus.classList.add("verified");
                verifiedStatus.innerHTML = `Verified <span class="verified-icon">✔️</span>`;
                companyItem.appendChild(verifiedStatus);
            })
            .catch(() => alert("Error verifying company"));
    }

    // Handle logout
    document.getElementById("logout").addEventListener("click", function () {
        localStorage.removeItem("tpoId");
        window.location.href = "login.html";
    });
});
