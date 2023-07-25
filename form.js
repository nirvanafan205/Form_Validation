// Password section
function togglePasswordVisibility() {
  var passwordInput = document.getElementById("passwordInput");
  var togglePassword = document.getElementById("togglePassword");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePassword.classList.remove("fa-lock");
    togglePassword.classList.add("fa-unlock");
  } else {
    passwordInput.type = "password";
    togglePassword.classList.remove("fa-unlock");
    togglePassword.classList.add("fa-lock");
  }
}

// Function to show/hide the Username validation message
function showUsernameValidationMessage(show) {
  var validationMessage = document.getElementById("usernameValidation");
  validationMessage.style.display = show ? "block" : "none";
}

// Function to show/hide the Password validation message
function showPasswordValidationMessage(show, message) {
  var validationMessage = document.getElementById("passwordValidation");
  validationMessage.style.display = show ? "block" : "none";
  validationMessage.textContent = message;
}

// Username validation: Allow only lowercase letters
document
  .getElementById("userInput")
  .addEventListener("input", function (event) {
    var input = event.target;
    var regex = /^[a-z]*$/; // Regular expression to match only lowercase letters

    if (!regex.test(input.value)) {
      showUsernameValidationMessage(true);
      document.getElementById("usernameValidation").textContent =
        "Username must contain only lowercase letters.";
    } else {
      showUsernameValidationMessage(false);
      document.getElementById("usernameValidation").textContent = "";
    }
  });

// Password validation: Must contain a mix of uppercase letters, lowercase letters, and numbers
document
  .getElementById("passwordInput")
  .addEventListener("input", function (event) {
    var input = event.target;
    var lowercaseRegex = /^(?=.*[a-z])/;
    var uppercaseRegex = /^(?=.*[A-Z])/;
    var numberRegex = /^(?=.*\d)/;

    var message = "";

    if (!lowercaseRegex.test(input.value)) {
      message += "At least one lowercase letter";
    }
    if (!uppercaseRegex.test(input.value)) {
      if (message !== "") {
        message += ", ";
      }
      message += "at least one uppercase letter";
    }
    if (!numberRegex.test(input.value)) {
      if (message !== "") {
        message += ", ";
      }
      message += "at least one number";
    }

    if (input.value.length < 8) {
      if (message !== "") {
        message += ", ";
      }
      message += "be at least 8 characters long";
    }

    if (input.value.trim() === "") {
      // If the password input is empty, hide the validation message
      showPasswordValidationMessage(false);
    } else if (message === "") {
      // If the password is valid, hide the validation message
      showPasswordValidationMessage(false);
    } else {
      // If the password is invalid, show the validation message with specific feedback
      showPasswordValidationMessage(
        true,
        "Password must contain: " + message + "."
      );
    }
  });

// Form submission handler
document.getElementById("myForm").addEventListener("submit", function (event) {
  var passwordInput = document.getElementById("passwordInput");
  var lowercaseRegex = /^(?=.*[a-z])/;
  var uppercaseRegex = /^(?=.*[A-Z])/;
  var numberRegex = /^(?=.*\d)/;

  var message = "Password must contain: ";
  if (!lowercaseRegex.test(passwordInput.value)) {
    message += "at least one lowercase letter, ";
  }

  if (!uppercaseRegex.test(passwordInput.value)) {
    message += "at least one uppercase letter, ";
  }
  if (!numberRegex.test(passwordInput.value)) {
    message += "at least one number, ";
  }

  // Remove the trailing comma and space from the message
  message = message.replace(/, $/, "");

  if (passwordInput.value.length < 8) {
    message += ", and be at least 8 characters long.";
  }

  if (message === "Password must contain:") {
    // If the password is valid, hide the validation message
    showPasswordValidationMessage(false);
  } else {
    // If the password is invalid, show the validation message with specific feedback
    showPasswordValidationMessage(true, message);
    event.preventDefault(); // Prevent form submission if validation fails
  }

  // Your custom form validation logic goes here
  // For demonstration purposes, let's just display an alert message:
  alert("Form validation succeeded!");
  event.preventDefault(); // Prevent form submission for demonstration purposes
});

// Function to show/hide the Student ID validation message
function showStudentIDValidationMessage(show) {
  var validationMessage = document.getElementById("studentIDValidation");
  validationMessage.style.display = show ? "block" : "none";
}

// Student ID validation: Must contain exactly 9 digits
document.getElementById("numbers").addEventListener("input", function (event) {
  var input = event.target;
  var regex = /^\d{9}$/; // Regular expression to match exactly 9 digits

  if (input.value.trim() === "") {
    // If the input is empty, hide the validation message
    showStudentIDValidationMessage(false);
  } else if (!regex.test(input.value)) {
    showStudentIDValidationMessage(true);
    document.getElementById("studentIDValidation").textContent = "Student ID must be exactly 9 digits.";
  } else {
    showStudentIDValidationMessage(false);
    document.getElementById("studentIDValidation").textContent = "";
  }
});