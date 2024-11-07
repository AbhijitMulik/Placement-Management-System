document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = { email: email, password: password };

    fetch("http://localhost:8080/students/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert("Invalid login credentials");
            throw new Error("Login failed");
        }
    })
    .then(studentData => {
        localStorage.setItem('studentId', studentData.id);
        window.location.href = "student-profile.html";
    })
    .catch(error => console.error("Error:", error));
});

document.getElementById("signupLink").addEventListener("click", function() {
    window.location.href = "signup.html";
});
