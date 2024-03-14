//BMI Calculator
function calculateBMI() {
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value) / 100;
    const resultDiv = document.getElementById("bmiResult");

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        resultDiv.textContent = "Please enter valid weight and height.";
    }
    else {
        const bmi = weight / (height * height);
        const bmiRounded = bmi.toFixed(2);
        let bmiCategory = "";

        if (bmi < 18.5) {
            bmiCategory = "Underweight";
            bmiMessage = "Your BMI indicates that your weight is Underweight. You may need to consider gaining some weight.";
        } else if (bmi < 24.9) {
            bmiCategory = "Normal weight";
            bmiMessage = "Your BMI indicates that your weight is Normal. Congratulations for maintaining a healthy weight!";
        } else if (bmi < 29.9) {
            bmiCategory = "Overweight";
            bmiMessage = "Your BMI indicates that your weight is Overweight. You may need to consider losing some weight for better health.";
        } else {
            bmiCategory = "Obese";
            bmiMessage = "Your BMI indicates that your weight is Obese. You may need to consider losing weight to improve your health.";
        }
        resultDiv.innerHTML = `<h3>Your Body Mass Index (BMI) is ${bmiRounded}.</h3><h3>${bmiMessage}</h3>`;
    }
}
//BMR Calculator
function calculateBMR() {
    const gender = document.getElementById("gender").value;
    const weight = parseFloat(document.getElementById("weight1").value);
    const height = parseFloat(document.getElementById("height1").value);
    const age = parseInt(document.getElementById("age").value);
    const resultDiv = document.getElementById("bmrResult");

    if (isNaN(weight) || isNaN(height) || isNaN(age) || weight <= 0 || height <= 0 || age <= 0) {
        resultDiv.textContent = "Enter a valid height, weight and age.";
    }
    else {
        let bmr = 0;
        if (gender === "male") {
            //Harris-Benedict Equation for BMR
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        }
        else if (gender === "female") {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }
        resultDiv.innerHTML = `<h3>Your Basal Metabolic Rate (BMR) is approximately: <strong>${bmr.toFixed(2)}</strong> calories per day.</h3>`;

    }
}
//Calorie Intake Calculator
function calorieIntakeCalculator() {
    const gender = document.getElementById("gender2").value;
    const age = parseInt(document.getElementById("age2").value);
    const weight = parseFloat(document.getElementById("weight2").value);
    const height = parseFloat(document.getElementById("height2").value);
    const activityLevel = document.getElementById("activityLevel").value;
    const goal = document.getElementById("goal").value;
    const resultDiv = document.getElementById("calorieIntakeResult");

    if (isNaN(age) || isNaN(weight) || isNaN(height) || age <= 0 || weight <= 0 || height <= 0) {
        resultDiv.textContent = "Please enter a valid Age, Weight and Height";
    }
    else {
        let bmr = 0;
        if (gender === "male") {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else if (gender === "female") {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }

        let calorieIntake = 0;
        switch (activityLevel) {
            case "sedentary":
                calorieIntake = (goal === "lose" ? bmr : goal === "maintain" ? bmr * 1.2 : bmr * 1.5);
                break;

            case "lightly_active":
                calorieIntake = (goal === "lose" ? bmr * 1.3 : goal === "maintain" ? bmr * 1.375 : bmr * 1.7);
                break;

            case "moderately_active":
                calorieIntake = (goal === "lose" ? bmr * 1.5 : goal === "maintain" ? bmr * 1.55 : bmr * 1.9);
                break;

            case "very_active":
                calorieIntake = (goal === "lose" ? bmr * 1.7 : goal === "maintain" ? bmr * 1.725 : bmr * 2.0);
                break;

            case "extra_active":
                calorieIntake = (goal === "lose" ? bmr * 1.85 : goal === "maintain" ? bmr * 1.9 : bmr * 2.1);
                break;
        }
        resultDiv.innerHTML = `<h3>Your estimated daily calorie intake for weight ${goal === "lose" ? "loss" : (goal === "maintain" ? "maintenance" : "gain")} is approximately: <strong>${calorieIntake.toFixed(2)}</strong> calories per day.</h3>`;
    }
}
//Heart Rate Calculator
function heartRateCalculator() {
    const age = parseInt(document.getElementById("age3").value);
    const fitnessLevel = document.getElementById("fitnessLevel").value;
    resultDiv = document.getElementById("heartRateResult");

    if (isNaN(age) || age <= 0) {
        resultDiv.textContent = "Enter a valid age";
    }
    else {
        let maxHeartRate = 220 - age;
        let lowerBound, upperBound;

        if (fitnessLevel === "low") {
            lowerBound = maxHeartRate * 0.5;
            upperBound = maxHeartRate * 0.6;
        }
        else if (fitnessLevel === "moderate") {
            lowerBound = maxHeartRate * 0.6;
            upperBound = maxHeartRate * 0.7;
        } else if (fitnessLevel === "high") {
            lowerBound = maxHeartRate * 0.7;
            upperBound = maxHeartRate * 0.85;
        }
        resultDiv.innerHTML = `
            <h3>Your Target Heart Rate Zone</h3>
            <h3><b>Lower Bound</b> : ${Math.round(lowerBound)} <i>bpm</i></h3>
            <h3><b>Upper Bound</b> : ${Math.round(upperBound)} <i>bpm</i></h3>
        `;
    }
}
//Water Intake Calculator
function waterIntakeCalculator() {
    const weight = parseFloat(document.getElementById("weight4").value);
    const resultDiv = document.getElementById("waterIntakeResult");

    if (isNaN(weight) || weight <= 0) {
        resultDiv.textContent = "Enter a valid weight";
    }
    else {
        const waterIntake = (weight * 30).toFixed(2);
        resultDiv.innerHTML = `
        <h3>Your Recommended Daily Water Intake</h3>
        <h3><b>${waterIntake}</b> ml </h3>
        `;
    }
}

//Sleep Duration Calculator
function sleepDurationCalculator() {

    const age = parseInt(document.getElementById("age6").value);
    const wakeupTime = document.getElementById("wakeUpTime").value;
    const resultDiv = document.getElementById("sleepDurationResult");

    if (isNaN(age) || age <= 0) {
        resultDiv.textContent = "Enter a valid age.";
    } else {

        const wakeupDate = new Date();
        const [hours, minutes] = wakeupTime.split(":");
        wakeupDate.setHours(hours, minutes, 0, 0);

        // 0-2 years: 14 hours (840 minutes)
        // 3-12 years: 10 hours (600 minutes)
        // 13-18 years: 8 hours (480 minutes)
        // 19+ years: 7-9 hours (420-540 minutes)

        let sleepDurationMinutes;
        if (age <= 2) {
            sleepDurationMinutes = 840;
        } else if (age <= 12) {
            sleepDurationMinutes = 600;
        } else if (age <= 18) {
            sleepDurationMinutes = 480;
        } else {
            sleepDurationMinutes = Math.floor(Math.random() * (540 - 420 + 1)) + 420;
        }

        const bedtime = new Date(wakeupDate.getTime() - sleepDurationMinutes * 60 * 1000);

        const bedtimeHours = bedtime.getHours().toString().padStart(2, "0");
        const bedtimeMinutes = bedtime.getMinutes().toString().padStart(2, "0");

        resultDiv.innerHTML = `<h3>If you want to wake up refreshed at ${wakeupTime} you should go to bed by ${bedtimeHours}:${bedtimeMinutes} </h3>`;
    }
}
//Calculator Dropdown Function
function showCalculator() {
    const calculatorSelect = document.getElementById("calculatorSelect");
    const selectedCalculator = calculatorSelect.value;
    const calculatorContainer = document.getElementById("calculatorContainer");

    const calculatorSections = document.querySelectorAll("#calculatorContainer > div");
    calculatorSections.forEach(section => {
        section.style.display = "none";
    });

    if (selectedCalculator === "none") {
        calculatorContainer.style.display = "block";
        document.getElementById("bmiCalculator").style.display = "none";
        document.getElementById("bmrCalculator").style.display = "none";
        document.getElementById("calorieIntakeCalculator").style.display = "none";
        document.getElementById("heartRateCalculator").style.display = "none";
        document.getElementById("waterIntakeCalculator").style.display = "none";
        document.getElementById("sleepDurationCalculator").style.display = "none";
    }
    else if (selectedCalculator === "bmi") {
        document.getElementById("bmiCalculator").style.display = "block";
        document.getElementById("bmrCalculator").style.display = "none";
        document.getElementById("calorieIntakeCalculator").style.display = "none";
        document.getElementById("heartRateCalculator").style.display = "none";
        document.getElementById("waterIntakeCalculator").style.display = "none";
        document.getElementById("sleepDurationCalculator").style.display = "none";
    }
    else if (selectedCalculator === "bmr") {
        document.getElementById("bmrCalculator").style.display = "block";
        document.getElementById("bmiCalculator").style.display = "none";
        document.getElementById("calorieIntakeCalculator").style.display = "none";
        document.getElementById("heartRateCalculator").style.display = "none";
        document.getElementById("waterIntakeCalculator").style.display = "none";
        document.getElementById("sleepDurationCalculator").style.display = "none";
    }

    else if (selectedCalculator === "calorie_intake") {
        document.getElementById("calorieIntakeCalculator").style.display = "block";
        document.getElementById("bmiCalculator").style.display = "none";
        document.getElementById("bmrCalculator").style.display = "none";
        document.getElementById("heartRateCalculator").style.display = "none";
        document.getElementById("waterIntakeCalculator").style.display = "none";
        document.getElementById("sleepDurationCalculator").style.display = "none";
    }

    else if (selectedCalculator === "heart_rate") {
        document.getElementById("heartRateCalculator").style.display = "block";
        document.getElementById("bmiCalculator").style.display = "none";
        document.getElementById("bmrCalculator").style.display = "none";
        document.getElementById("calorieIntakeCalculator").style.display = "none";
        document.getElementById("waterIntakeCalculator").style.display = "none";
        document.getElementById("sleepDurationCalculator").style.display = "none";
    }

    else if (selectedCalculator === "water_intake") {
        document.getElementById("waterIntakeCalculator").style.display = "block";
        document.getElementById("bmiCalculator").style.display = "none";
        document.getElementById("bmrCalculator").style.display = "none";
        document.getElementById("calorieIntakeCalculator").style.display = "none";
        document.getElementById("heartRateCalculator").style.display = "none";
        document.getElementById("sleepDurationCalculator").style.display = "none";
    }

    else if (selectedCalculator === "sleep_duration") {
        document.getElementById("sleepDurationCalculator").style.display = "block";
        document.getElementById("bmiCalculator").style.display = "none";
        document.getElementById("bmrCalculator").style.display = "none";
        document.getElementById("calorieIntakeCalculator").style.display = "none";
        document.getElementById("heartRateCalculator").style.display = "none";
        document.getElementById("waterIntakeCalculator").style.display = "none";
    }
}
