document.addEventListener("DOMContentLoaded", function () {
    // Tab Switching Logic
    const signinTab = document.getElementById("signin-tab");
    const signupTab = document.getElementById("signup-tab");
    const signinForm = document.getElementById("signin-form");
    const signupForm = document.getElementById("signup-form");

    signinTab.addEventListener("click", function () {
        signinTab.classList.add("active");
        signupTab.classList.remove("active");
        signinForm.classList.add("active");
        signupForm.classList.remove("active");
    });

    signupTab.addEventListener("click", function () {
        signupTab.classList.add("active");
        signinTab.classList.remove("active");
        signupForm.classList.add("active");
        signinForm.classList.remove("active");
    });

    // Default show Sign In
    signinForm.classList.add("active");

    // Validation Function
    function validateInput(input, type) {
        let value = input.value.trim();
        let errorMsg = "";
        
        if (value === "") {
            errorMsg = "This field cannot be empty.";
        } else {
            switch (type) {
                case "name":
                    if (!/^[A-Za-z\s]+$/.test(value)) {
                        errorMsg = "Only alphabets are allowed.";
                    }
                    break;
                case "email":
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                        errorMsg = "Enter a valid email address.";
                    }
                    break;
                case "password":
                    if (value.length < 6) {
                        errorMsg = "Password must be at least 6 characters.";
                    }
                    break;
                case "weight":
                    if (isNaN(value) || value <= 0) {
                        errorMsg = "Enter a valid weight.";
                    }
                    break;
            }
        }

        // Display error or remove it
        let errorElement = input.nextElementSibling;
        if (errorMsg) {
            errorElement.textContent = errorMsg;
            input.classList.add("error");
        } else {
            errorElement.textContent = "";
            input.classList.remove("error");
        }
    }

    // Tab switching logic
    signinTab.addEventListener("click", function () {
        signinForm.classList.remove("hidden");
        signupForm.classList.add("hidden");
        this.classList.add("active");
        signupTab.classList.remove("active");
    });

    signupTab.addEventListener("click", function () {
        signupForm.classList.remove("hidden");
        signinForm.classList.add("hidden");
        this.classList.add("active");
        signinTab.classList.remove("active");
    });

    // Health condition selection
    const healthConditionDropdown = document.getElementById("health-condition");
    healthConditionDropdown.addEventListener("change", function () {
        alert("Selected Health Condition: " + healthConditionDropdown.value);
    });

    // Add event listeners to fields for inline validation
    document.getElementById("signup-name").addEventListener("blur", function () {
        validateInput(this, "name");
    });

    document.getElementById("signup-email").addEventListener("blur", function () {
        validateInput(this, "email");
    });

    document.getElementById("signup-password").addEventListener("blur", function () {
        validateInput(this, "password");
    });

    document.getElementById("signup-weight").addEventListener("blur", function () {
        validateInput(this, "weight");
    });

    // Prevent form submission if there are errors
    document.querySelector("form").addEventListener("submit", function (event) {
        let inputs = document.querySelectorAll(".input-group input");
        let hasError = false;

        inputs.forEach(input => {
            validateInput(input, input.getAttribute("id").split("-")[1]); // auto-detect type
            if (input.classList.contains("error")) {
                hasError = true;
            }
        });

        if (hasError) {
            event.preventDefault();
            alert("Please fix the errors before submitting.");
        } else {
            alert("Form submitted successfully!");
        }
    });
    async function fetchYogaPlans() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            alert("Please sign in first!");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:3000/plans/${user.health_condition}`);
            const plans = await response.json();
    
            let output = "<h2>Your Yoga & Diet Plan</h2><ul>";
            plans.forEach(plan => {
                output += `<li><strong>${plan.yoga_exercise}</strong>: ${plan.diet_plan}</li>`;
            });
            output += "</ul>";
    
            document.getElementById("plans-container").innerHTML = output;
        } catch (error) {
            console.error("Error:", error);
        }
    }
    
});
document.querySelector("#signup-form form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const userData = Object.fromEntries(formData);

    try {
        const response = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        const data = await response.json();
        if (response.ok) {
            alert("✅ Signup successful!");
        } else {
            alert("❌ " + data.error);
        }
    } catch (error) {
        console.error("Error:", error);
    }
});
document.querySelector("#signin-form form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const userData = Object.fromEntries(formData);

    try {
        const response = await fetch("http://localhost:3000/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        const data = await response.json();
        if (response.ok) {
            alert("✅ Login successful!");
            localStorage.setItem("user", JSON.stringify(data.user));
        } else {
            alert("❌ " + data.error);
        }
    } catch (error) {
        console.error("Error:", error);
    }
});
