let display = document.getElementById('display');

function append(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    display.value = eval(display.value.replace('×', '*').replace('÷', '/'));
  } catch (e) {
    display.value = 'Error';
  }
}

// Optional: Allow keyboard input
document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (!isNaN(key) || ['+', '-', '*', '/', '.', '%'].includes(key)) {
    append(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key.toLowerCase() === 'c') {
    clearDisplay();
  }
});


// ---------- UNIT CONVERTER ----------

// Define unit conversion factors
const units = {
  length: {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    millimeter: 1000,
    inch: 39.3701,
    foot: 3.28084
  },
  weight: {
    kilogram: 1,
    gram: 1000,
    milligram: 1_000_000,
    pound: 2.20462,
    ounce: 35.274
  },
  temperature: {
    celsius: "°C",
    fahrenheit: "°F",
    kelvin: "K"
  }
};

function updateUnits() {
  const category = document.getElementById("category").value;
  const fromUnit = document.getElementById("fromUnit");
  const toUnit = document.getElementById("toUnit");

  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";

  for (let unit in units[category]) {
    let option1 = document.createElement("option");
    option1.value = unit;
    option1.text = unit.charAt(0).toUpperCase() + unit.slice(1);
    fromUnit.appendChild(option1);

    let option2 = option1.cloneNode(true);
    toUnit.appendChild(option2);
  }
}

function convertUnit() {
  const category = document.getElementById("category").value;
  const from = document.getElementById("fromUnit").value;
  const to = document.getElementById("toUnit").value;
  const value = parseFloat(document.getElementById("inputValue").value);
  const resultBox = document.getElementById("result");

  if (isNaN(value)) {
    resultBox.innerHTML = "⚠️ Please enter a valid number.";
    return;
  }

  let result;

  // Temperature conversions (special case)
  if (category === "temperature") {
    result = convertTemperature(from, to, value);
  } else {
    let baseValue = value / units[category][from];
    result = baseValue * units[category][to];
  }

  resultBox.innerHTML = `✅ ${value} ${from} = <strong>${result.toFixed(4)} ${to}</strong>`;
}

function convertTemperature(from, to, value) {
  if (from === to) return value;

  let celsius;

  // Convert to Celsius
  if (from === "fahrenheit") celsius = (value - 32) * (5 / 9);
  else if (from === "kelvin") celsius = value - 273.15;
  else celsius = value;

  // Convert from Celsius to target
  if (to === "fahrenheit") return celsius * (9 / 5) + 32;
  if (to === "kelvin") return celsius + 273.15;
  return celsius;
}

// Initialize default category on load
document.addEventListener("DOMContentLoaded", updateUnits);




// ---------- CURRENCY CONVERTER ----------

// Fixed exchange rates (you can change them anytime)
const exchangeRates = {
  INR: {
    USD: 0.012, // 1 INR = 0.012 USD
  },
  USD: {
    INR: 83.0, // 1 USD = 83 INR
  },
};

function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = document.getElementById("fromCurrency").value;
  const to = document.getElementById("toCurrency").value;
  const resultBox = document.getElementById("currencyResult");

  if (isNaN(amount)) {
    resultBox.innerHTML = "⚠️ Please enter a valid number.";
    return;
  }

  if (from === to) {
    resultBox.innerHTML = `✅ ${amount} ${from} = ${amount} ${to}`;
    return;
  }

  let rate = exchangeRates[from][to];
  let result = amount * rate;

  resultBox.innerHTML = `✅ ${amount} ${from} = <strong>${result.toFixed(2)} ${to}</strong>`;
}






// ---------- FORMULA LIBRARY ----------

// Trigonometric Calculations
function calcTrig(type) {
  const angleDeg = parseFloat(document.getElementById('angleInput').value);
  const resultBox = document.getElementById('trigResult');

  if (isNaN(angleDeg)) {
    resultBox.innerHTML = "⚠️ Please enter a valid angle.";
    return;
  }

  const angleRad = (Math.PI / 180) * angleDeg; // Convert to radians
  let result;

  switch (type) {
    case 'sin':
      result = Math.sin(angleRad);
      break;
    case 'cos':
      result = Math.cos(angleRad);
      break;
    case 'tan':
      result = Math.tan(angleRad);
      break;
  }

  resultBox.innerHTML = `✅ ${type}(${angleDeg}°) = <strong>${result.toFixed(5)}</strong>`;
}

// Logarithmic Calculations
function calcLog(type) {
  const value = parseFloat(document.getElementById('logInput').value);
  const resultBox = document.getElementById('logResult');

  if (isNaN(value) || value <= 0) {
    resultBox.innerHTML = "⚠️ Please enter a number greater than 0.";
    return;
  }

  let result;

  if (type === 'log10') {
    result = Math.log10(value);
  } else if (type === 'ln') {
    result = Math.log(value);
  }

  resultBox.innerHTML = `✅ ${type}( ${value} ) = <strong>${result.toFixed(5)}</strong>`;
}



