document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        companyType: document.getElementById("companyType").value,
        contactPerson: document.getElementById("contactPerson").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        noOfVacancies: document.getElementById("noOfVacancies").value,
        criteriaCgpa: document.getElementById("criteriaCgpa").value,
        interviewDate: document.getElementById("interviewDate").value,
    };

    fetch("http://localhost:8080/companies/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        if (result && result.id) {
            localStorage.setItem('companyId', result.id);
            window.location.href = "company-profile.html";
        }
    })
    .catch(error => console.error("Error:", error));
});

document.getElementById("loginLink").addEventListener("click", function() {
    window.location.href = "login.html";
});
