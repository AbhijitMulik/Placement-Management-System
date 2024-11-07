document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        contactNo: document.getElementById("contactNo").value
    };

    fetch("http://localhost:8080/tpos/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert("Sign up failed, please try again.");
            throw new Error("Sign up failed");
        }
    })
    .then(newTpo => {
        alert("Sign up successful! Please log in.");
        window.location.href = "login.html";
    })
    .catch(error => console.error("Error:", error));
});

document.getElementById("loginLink").addEventListener("click", function() {
   window.location.href = "login.html";
});
