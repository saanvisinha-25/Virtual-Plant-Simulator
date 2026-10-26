/* VIRTUAL PLANT GROWTH SIMULATOR */

const water = document.getElementById("water");
const sunlight = document.getElementById("sunlight");
const temperature = document.getElementById("temperature");

const waterValue = document.getElementById("water-value");
const sunlightValue = document.getElementById("sunlight-value");
const temperatureValue = document.getElementById("temperature-value");

const plant = document.getElementById("plant");
const stage = document.getElementById("stage");
const status = document.getElementById("status");

const scoreDisplay = document.getElementById("score");
const progress = document.getElementById("growth-progress");
const healthStatus = document.getElementById("health-status");
const explanation = document.getElementById("growth-explanation");

const simulateButton = document.getElementById("simulate-button");

const experiment = document.getElementById("experiment");
const experimentButton = document.getElementById("experiment-button");
const experimentResult = document.getElementById("experiment-result");

// Update the numbers beside the sliders.
function updateLabels() {
    waterValue.textContent = water.value;
    sunlightValue.textContent = sunlight.value;
    temperatureValue.textContent = temperature.value;
}

water.addEventListener("input", updateLabels);
sunlight.addEventListener("input", updateLabels);
temperature.addEventListener("input", updateLabels);

// Calculate an illustrative growth score.
function simulateGrowth() {
    const w = Number(water.value);
    const s = Number(sunlight.value);
    const t = Number(temperature.value);

    // Best illustrative conditions for this model:
    // water = 60%, sunlight = 70%, temperature = 25°C.
    const waterScore = Math.max(0, 100 - Math.abs(w - 60) * 2);
    const sunlightScore = Math.max(0, 100 - Math.abs(s - 70) * 2);
    const temperatureScore = Math.max(0, 100 - Math.abs(t - 25) * 4);

    const score = Math.round(
        (waterScore + sunlightScore + temperatureScore) / 3
    );

    scoreDisplay.textContent = score;
    progress.value = score;

    let condition;
    let emoji;
    let growthStage;

    if (score >= 80) {
        condition = "Healthy";
        emoji = "🌿";
        growthStage = "Growing Plant";
    } else if (score >= 50) {
        condition = "Moderate";
        emoji = "🌱";
        growthStage = "Seedling Stage";
    } else {
        condition = "Needs Better Conditions";
        emoji = "🪴";
        growthStage = "Slow Growth";
    }

    plant.textContent = emoji;
    stage.textContent = growthStage;
    status.textContent = "Plant condition: " + condition;
    healthStatus.textContent = "Plant condition: " + condition;

    explanation.textContent =
        "Illustrative growth score based on water, sunlight and temperature.";
}

// Run the main simulation.
simulateButton.addEventListener("click", simulateGrowth);

// Run a preset experiment.
experimentButton.addEventListener("click", function () {
    const selected = experiment.value;

    if (selected === "balanced") {
        water.value = 60;
        sunlight.value = 70;
        temperature.value = 25;
        experimentResult.textContent =
            "Balanced conditions: the model predicts favourable growth.";
    } else if (selected === "low-water") {
        water.value = 15;
        sunlight.value = 70;
        temperature.value = 25;
        experimentResult.textContent =
            "Low water: water shortage can affect turgor and other plant processes.";
    } else if (selected === "low-light") {
        water.value = 60;
        sunlight.value = 10;
        temperature.value = 25;
        experimentResult.textContent =
            "Low sunlight: reduced light can limit photosynthesis.";
    } else if (selected === "high-temperature") {
        water.value = 60;
        sunlight.value = 70;
        temperature.value = 42;
        experimentResult.textContent =
            "High temperature: excessive heat can disrupt plant processes.";
    }

    updateLabels();
    simulateGrowth();
});

// Set the initial labels and results.
updateLabels();
simulateGrowth();