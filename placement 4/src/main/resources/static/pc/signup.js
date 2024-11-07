document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        dept: document.getElementById("dept").value,
        contactNo: document.getElementById("contactNo").value,
    };

    fetch("http://localhost:8080/pcs/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            alert("Signup successful! Please log in.");
            window.location.href = "login.html";
        } else {
            alert("Signup failed");
            throw new Error("Signup failed");
        }
    })
    .catch(error => console.error("Error:", error));
});

document.getElementById("loginLink").addEventListener("click", function() {
    window.location.href = "login.html";
});
