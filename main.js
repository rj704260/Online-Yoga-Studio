document.addEventListener("DOMContentLoaded", function () {
    // ✅ Tab Switching Logic (Sign-In / Sign-Up)
    const signinTab = document.getElementById("signin-tab");
    const signupTab = document.getElementById("signup-tab");
    const signinForm = document.getElementById("signin-form");
    const signupForm = document.getElementById("signup-form");

    signinTab.addEventListener("click", function () {
        signinForm.classList.add("active");
        signupForm.classList.remove("active");
        signinTab.classList.add("active");
        signupTab.classList.remove("active");
    });

    signupTab.addEventListener("click", function () {
        signupForm.classList.add("active");
        signinForm.classList.remove("active");
        signupTab.classList.add("active");
        signinTab.classList.remove("active");
    });

    // ✅ Default to Sign-In form
    signinForm.classList.add("active");

    // ✅ API Base URL
    const BASE_URL = "http://localhost:3000/api";

    // ✅ Function to Validate Input Fields
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

        let errorElement = input.nextElementSibling;
        if (errorMsg) {
            errorElement.textContent = errorMsg;
            input.classList.add("error");
        } else {
            errorElement.textContent = "";
            input.classList.remove("error");
        }
    }

    // ✅ Attach Validation Event Listeners
    document.getElementById("signup-name")?.addEventListener("blur", function () {
        validateInput(this, "name");
    });

    document.getElementById("signup-email")?.addEventListener("blur", function () {
        validateInput(this, "email");
    });

    document.getElementById("signup-password")?.addEventListener("blur", function () {
        validateInput(this, "password");
    });

    document.getElementById("signup-weight")?.addEventListener("blur", function () {
        validateInput(this, "weight");
    });

    // ✅ User Sign-Up API Call
    document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("signup-name").value;
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;
        const weight = document.getElementById("signup-weight").value;
        const health_condition = document.getElementById("signup-health").value;
        const other_disease = document.getElementById("signup-disease").value;

        try {
            const response = await fetch(`${BASE_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, weight, health_condition, other_disease })
            });

            const data = await response.json();
            alert(data.message || data.error);
            if (response.ok) {
                document.getElementById("signup-form").reset();
                signinTab.click(); // Switch to Sign-In tab after successful signup
            }
        } catch (error) {
            console.error("Sign-Up Error:", error);
        }
    });

    // ✅ User Sign-In API Call
    document.getElementById("signin-form")?.addEventListener("submit", async function (event) {
        event.preventDefault();
    
        const email = document.getElementById("signin-email").value.trim();
        const password = document.getElementById("signin-password").value.trim();
    
        if (!email || !password) {
            alert("Please enter email and password.");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:3000/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ signin_email: email, signin_password: password }),
            });
    
            const data = await response.json();
            if (response.ok) {
                alert("Login successful!");
                localStorage.setItem("token", data.token); // Save token for authentication
                window.location.href = "dashboard.html"; // Redirect to dashboard
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    });
    

    // ✅ Fetch Yoga & Diet Plans API Call (After Login)
    async function fetchPlans() {
        const healthCondition = document.getElementById("health-condition")?.value || "Diabetes"; // Example
        const token = localStorage.getItem("token");

        if (!token) {
            alert("You must be logged in to view plans.");
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/plans/${healthCondition}`, {
                method: "GET",
                headers: { "Authorization": token }
            });

            const data = await response.json();
            displayPlans(data); // Function to display plans in UI
        } catch (error) {
            console.error("Fetch Plans Error:", error);
        }
    }

    // ✅ Function to Display Plans in UI
    function displayPlans(plans) {
        const plansContainer = document.getElementById("plans-container");
        if (!plansContainer) return;

        plansContainer.innerHTML = ""; // Clear existing content
        if (plans.length === 0) {
            plansContainer.innerHTML = "<p>No plans available.</p>";
            return;
        }

        plans.forEach(plan => {
            const planCard = document.createElement("div");
            planCard.classList.add("plan-card");
            planCard.innerHTML = `
                <h3>${plan.plan_name}</h3>
                <p><strong>Health Condition:</strong> ${plan.health_condition}</p>
                <p><strong>Yoga:</strong> ${plan.yoga_exercise}</p>
                <p><strong>Diet:</strong> ${plan.diet_plan}</p>
            `;
            plansContainer.appendChild(planCard);
        });
    }

    // ✅ Logout Function
    document.getElementById("logout-btn")?.addEventListener("click", () => {
        localStorage.removeItem("token");
        alert("Logged out successfully!");
        window.location.href = "index.html"; // Redirect to login page
    });

    // ✅ Load Plans if User is Logged In
    if (window.location.pathname.includes("dashboard.html")) {
        fetchPlans();
    }
});
