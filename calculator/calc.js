// Select the result input field
const resultField = document.getElementById("result");

// Append value to the input field
function appendValue(value) {
  resultField.value += value;
}

// Clear the input field
function clearScreen() {
  resultField.value = "";
}

// Remove the last character
function backspace() {
  resultField.value = resultField.value.slice(0, -1);
}

// Calculate the result
function calculate() {
  try {
    resultField.value = eval(resultField.value); // Use eval carefully!
  } catch (error) {
    resultField.value = "Error";
  }
}
