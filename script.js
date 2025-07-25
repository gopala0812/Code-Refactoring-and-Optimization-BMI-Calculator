const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const weightUnit = document.getElementById("weight-unit");
const heightUnit = document.getElementById("height-unit");
const bmiDisplay = document.getElementById("bmi");
const descDisplay = document.getElementById("desc");

// Converts all height to meters
function convertHeightToMeters(value, unit) {
  switch (unit) {
    case "cm":
      return value / 100;
    case "in":
      return value * 0.0254;
    case "ft":
      return value * 0.3048;
    default:
      return value;
  }
}

// Converts all weight to kg
function convertWeightToKg(value, unit) {
  switch (unit) {
    case "lb":
      return value * 0.453592;
    case "kg":
    default:
      return value;
  }
}

function calculateBMI() {
  const rawWeight = parseFloat(weightInput.value);
  const rawHeight = parseFloat(heightInput.value);

  if (isNaN(rawWeight) || isNaN(rawHeight) || rawWeight <= 0 || rawHeight <= 0) {
    bmiDisplay.textContent = "0";
    descDisplay.textContent = "N/A";
    bmiDisplay.style.color = "#fff";
    return;
  }

  const weight = convertWeightToKg(rawWeight, weightUnit.value);
  const height = convertHeightToMeters(rawHeight, heightUnit.value);
  const bmi = weight / (height * height);
  const roundedBMI = bmi.toFixed(1);
  bmiDisplay.textContent = roundedBMI;

  let desc = "";
  let color = "";

  if (bmi < 18.5) {
    desc = "Underweight";
    color = "#3498db";
  } else if (bmi < 25) {
    desc = "Normal";
    color = "#2ecc71";
  } else if (bmi < 30) {
    desc = "Overweight";
    color = "#f39c12";
  } else {
    desc = "Obese";
    color = "#e74c3c";
  }

  descDisplay.textContent = desc;
  bmiDisplay.style.color = color;
}

// Add dynamic listeners
[weightInput, heightInput, weightUnit, heightUnit].forEach((el) =>
  el.addEventListener("input", calculateBMI)
);

// Initial calculation
calculateBMI();
