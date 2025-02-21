document.addEventListener("DOMContentLoaded", function () {
    const roleRadios = document.querySelectorAll("input[name='role']");
    const passwordSection = document.getElementById("password-section");
    const friendSection = document.getElementById("friend-section");
    const passwordInput = document.getElementById("password-input");
    const submitBtn = document.getElementById("submit-btn");
    const errorMessage = document.getElementById("error-message");
    const friendNameInput = document.getElementById("friend-name");
    const friendBtn = document.getElementById("friend-btn");
    const generalBtn = document.getElementById("general-btn");

    // Handle role selection
    roleRadios.forEach(radio => {
        radio.addEventListener("change", function () {
            if (this.value === "curator") {
                passwordSection.style.display = "block";
                friendSection.style.display = "none";
                generalBtn.style.display = "none";
            } else if (this.value === "friend") {
                friendSection.style.display = "block";
                passwordSection.style.display = "none";
                generalBtn.style.display = "none";
            } else {
                passwordSection.style.display = "none";
                friendSection.style.display = "none";
                generalBtn.style.display = "block";
            }
        });
    });

    // Handle password submission for curators
    submitBtn.addEventListener("click", function () {
        if (passwordInput.value.toLowerCase() === "harlem") {
            window.location.href = "/pages/studio_museum_current_projects.html";  // Redirect to curator page
        } else {
            errorMessage.textContent = "Access Denied.";
            errorMessage.style.display = "block";
            passwordInput.value = "";
        }
    });

    // Handle name input for friends
    friendBtn.addEventListener("click", function () {
        const friendName = friendNameInput.value.trim();
        if (friendName) {
            window.location.href = `/friend-projects.html?name=${encodeURIComponent(friendName)}`;
        } else {
            alert("Please enter your name.");
        }
    });

    // Handle navigation for non-curators
    generalBtn.addEventListener("click", function () {
        const selectedRole = document.querySelector("input[name='role']:checked").value;
        if (selectedRole === "artist") {
            window.location.href = "/artist-insights.html";
        } else if (selectedRole === "curious") {
            window.location.href = "/portfolio.html";
        }
    });

    // Allow pressing Enter key to submit password or name
    passwordInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            submitBtn.click();
        }
    });

    friendNameInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            friendBtn.click();
        }
    });
});
