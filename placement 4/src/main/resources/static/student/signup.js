document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        dept: document.getElementById("dept").value,
        yearOfStudy: document.getElementById("yearOfStudy").value,
        cgpa: document.getElementById("cgpa").value,
        skills: document.getElementById("skills").value,
        HSCMarks: document.getElementById("HSCMarks").value,
        SSCMarks: document.getElementById("SSCMarks").value,
        major: document.getElementById("major").value,
    };

    fetch("http://localhost:8080/students/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        if (result && result.id) {
            localStorage.setItem('studentId', result.id);
            window.location.href = "student-profile.html";
        }
    })
    .catch(error => console.error("Error:", error));
});

document.getElementById("loginLink").addEventListener("click", function() {
    window.location.href = "login.html";
});
