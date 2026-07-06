document.getElementById("login-btn").onclick = () => {

    const pass = document.getElementById("password-input").value.trim();

    if (pass === "6285") {
        localStorage.setItem("adminLogged", "true");
        window.location.href = "admin.html";
    } else {
        document.getElementById("error-msg").style.display = "block";
    }
};
