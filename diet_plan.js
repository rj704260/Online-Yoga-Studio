document.addEventListener("DOMContentLoaded", function () {
    const diseaseSelect = document.getElementById("disease-select");
    const dietPlanDiv = document.getElementById("diet-plan");
    const dietDescription = document.getElementById("diet-description");

    const dietPlans = {
        diabetes: {
            breakfast: "Oatmeal with almonds + 1 boiled egg",
            lunch: "Brown rice + grilled vegetables + yogurt",
            dinner: "Vegetable soup + whole-grain toast",
            description: "A healthy diet for diabetes includes controlled portions and healthy carbs.",
        },
        hypertension: {
            breakfast: "Banana + Greek yogurt with flaxseeds",
            lunch: "Grilled salmon + steamed broccoli + quinoa",
            dinner: "Mixed vegetable salad with olive oil dressing",
            description: "Focus on low-sodium foods to help manage blood pressure.",
        },
        asthma: {
            breakfast: "Warm turmeric milk + boiled egg + whole wheat toast",
            lunch: "Brown rice + grilled chicken + steamed spinach",
            dinner: "Lentil soup + whole-grain bread + mixed greens",
            description: "A diet rich in fruits and vegetables to help manage asthma.",
        },
        heart_disease: {
            breakfast: "Oatmeal with walnuts + berries",
            lunch: "Quinoa salad with grilled salmon",
            dinner: "Steamed vegetables + baked chicken breast",
            description: "Heart-healthy foods include omega-3 fatty acids and fiber.",
        },
        arthritis: {
            breakfast: "Chia seed pudding + fresh berries",
            lunch: "Grilled fish + quinoa + green salad",
            dinner: "Lentil soup + sautéed spinach",
            description: "Include anti-inflammatory foods like fish, nuts, and berries.",
        },
        obesity: {
            breakfast: "Smoothie with banana, spinach, and almond milk",
            lunch: "Grilled chicken + brown rice + steamed veggies",
            dinner: "Vegetable stir-fry with tofu",
            description: "Focus on portion control and healthy food selections.",
        },
        thyroid: {
            breakfast: "Scrambled eggs + whole-wheat toast",
            lunch: "Baked fish + quinoa + sautéed kale",
            dinner: "Sweet potato + steamed broccoli + grilled tofu",
            description: "A balanced diet supports thyroid health.",
        },
        back_pain: {
            breakfast: "Greek yogurt with flaxseeds + nuts",
            lunch: "Lean meat + whole-grain pasta + green beans",
            dinner: "Vegetable curry + brown rice",
            description: "Foods rich in omega-3s may support joint health.",
        },
        depression: {
            breakfast: "Avocado toast + boiled eggs",
            lunch: "Grilled salmon + spinach salad",
            dinner: "Quinoa with roasted vegetables",
            description: "Nutrient-rich foods can improve mood and mental well-being.",
        },
        pcos: {
            breakfast: "Chia pudding with nuts and seeds",
            lunch: "Grilled chicken + roasted veggies",
            dinner: "Steamed fish + brown rice",
            description: "Balanced meals can help manage symptoms of PCOS.",
        },
        insomnia: {
            breakfast: "Almond milk smoothie with banana",
            lunch: "Quinoa with steamed vegetables",
            dinner: "Whole-wheat pasta + sautéed greens",
            description: "Include foods that promote sleep, such as walnuts and chamomile.",
        },
        skin_disorders: {
            breakfast: "Carrot juice + oatmeal",
            lunch: "Grilled chicken + fresh salad",
            dinner: "Vegetable soup + whole-wheat toast",
            description: "Opt for foods with antioxidants to support skin health.",
        },
        joint_pain: {
            breakfast: "Ginger tea + scrambled eggs",
            lunch: "Lentil soup + whole-grain toast",
            dinner: "Grilled fish + steamed vegetables",
            description: "Focus on anti-inflammatory foods for joint health.",
        },
        high_cholesterol: {
            breakfast: "Oatmeal with chia seeds",
            lunch: "Grilled salmon + avocado salad",
            dinner: "Steamed vegetables + brown rice",
            description: "Include soluble fiber to help lower cholesterol.",
        },
        migraines: {
            breakfast: "Smoothie with banana and flaxseeds",
            lunch: "Grilled chicken + sweet potatoes",
            dinner: "Steamed fish + green beans",
            description: "Certain foods may help reduce migraine frequency.",
        },
        ibs: {
            breakfast: "Banana + almond milk yogurt",
            lunch: "Grilled tofu + white rice",
            dinner: "Carrot soup + whole-wheat toast",
            description: "A diet low in FODMAPs can alleviate IBS symptoms.",
        },
        osteoporosis: {
            breakfast: "Cheese + whole-wheat toast",
            lunch: "Spinach salad with grilled chicken",
            dinner: "Baked fish + sautéed greens",
            description: "Include calcium and vitamin D-rich foods.",
        },
        anxiety: {
            breakfast: "Chamomile tea + whole-grain toast",
            lunch: "Grilled turkey + quinoa",
            dinner: "Lentil soup + steamed broccoli",
            description: "Foods rich in omega-3s can support mental health.",
        },
        acid_reflux: {
            breakfast: "Oatmeal + banana",
            lunch: "Grilled chicken + steamed veggies",
            dinner: "Brown rice + roasted zucchini",
            description: "Avoid spicy and acidic foods to manage symptoms.",
        },
        fatigue: {
            breakfast: "Scrambled eggs + whole-grain toast",
            lunch: "Grilled salmon + quinoa salad",
            dinner: "Sweet potato + steamed greens",
            description: "Focus on iron-rich foods to combat fatigue.",
        },
    };

    diseaseSelect.addEventListener("change", function () {
        const selectedDisease = diseaseSelect.value;

        if (selectedDisease && dietPlans[selectedDisease]) {
            const plan = dietPlans[selectedDisease];

            // Display the diet plan
            dietPlanDiv.innerHTML = `
                <h2>Diet Plan for ${selectedDisease.replace("_", " ").toUpperCase()}</h2>
                <p><strong>Breakfast:</strong> ${plan.breakfast}</p>
                <p><strong>Lunch:</strong> ${plan.lunch}</p>
                <p><strong>Dinner:</strong> ${plan.dinner}</p>
            `;

            // Update Description
            dietDescription.textContent = plan.description;
        } else {
            dietPlanDiv.innerHTML = "";
            dietDescription.textContent = "";
        }
    });
});