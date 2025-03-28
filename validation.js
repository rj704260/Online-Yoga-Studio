document.addEventListener("DOMContentLoaded", function () {
    // Switching between Sign In and Sign Up Tabs
    const signInTab = document.getElementById("signin-tab");
    const signUpTab = document.getElementById("signup-tab");
    const signInForm = document.getElementById("signin-form");
    const signUpForm = document.getElementById("signup-form");

    signInTab.addEventListener("click", function () {
        signInForm.classList.remove("hidden");
        signUpForm.classList.add("hidden");
        signInTab.classList.add("active");
        signUpTab.classList.remove("active");
    });

    signUpTab.addEventListener("click", function () {
        signUpForm.classList.remove("hidden");
        signInForm.classList.add("hidden");
        signUpTab.classList.add("active");
        signInTab.classList.remove("active");
    });

    // Form Validation
    function showError(input, message) {
        const errorSpan = input.nextElementSibling;
        errorSpan.textContent = message;
        input.classList.add("error");
    }

    function clearError(input) {
        const errorSpan = input.nextElementSibling;
        errorSpan.textContent = "";
        input.classList.remove("error");
    }

    // Sign Up Validation
    function validateSignUpForm() {
        let valid = true;

        // Full Name Validation
        const name = document.getElementById("signup-name");
        if (name.value.trim().length < 3) {
            showError(name, "Full Name must be at least 3 characters.");
            valid = false;
        } else {
            clearError(name);
        }

        // Email Validation
        const email = document.getElementById("signup-email");
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!emailPattern.test(email.value)) {
            showError(email, "Invalid email format.");
            valid = false;
        } else {
            clearError(email);
        }

        // Password Validation
        const password = document.getElementById("signup-password");
        if (password.value.length < 6) {
            showError(password, "Password must be at least 6 characters.");
            valid = false;
        } else {
            clearError(password);
        }

        return valid;
    }

    document.querySelector("#signup-form form").addEventListener("submit", function (event) {
        if (!validateSignUpForm()) {
            event.preventDefault();
        }
    });

    // Sign In Validation
    function validateSignInForm() {
        let valid = true;

        const email = document.getElementById("signin-email");
        const password = document.getElementById("signin-password");

        if (email.value.trim() === "") {
            showError(email, "Email is required.");
            valid = false;
        } else {
            clearError(email);
        }

        if (password.value.trim() === "") {
            showError(password, "Password is required.");
            valid = false;
        } else {
            clearError(password);
        }

        return valid;
    }

    document.querySelector("#signin-form form").addEventListener("submit", function (event) {
        if (!validateSignInForm()) {
            event.preventDefault();
        }
    });

    // Forgot Password Modal
    const forgotPasswordLink = document.querySelector(".links a");
    forgotPasswordLink.addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementById("forgot-password-modal").style.display = "block";
    });

    // OTP Generation
    document.getElementById("send-otp-btn").addEventListener("click", function () {
        const phoneInput = document.getElementById("forgot-phone");
        if (phoneInput.value.length === 10) {
            document.getElementById("otp-section").style.display = "block";
            document.getElementById("otp-message").textContent = "OTP sent to " + phoneInput.value;
        } else {
            alert("Please enter a valid 10-digit mobile number.");
        }
    });
});
