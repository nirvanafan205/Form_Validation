/* Username section stuff */
// Username validation: Allow only lowercase letters
document.getElementById("userInput").addEventListener("input", function (event) { /* adds an event listener to the "userInput" element, listens for the "input" event.  */
  var input = event.target; //  represents the element that triggered the event, assign it to the variable input for reference.

  // retrieves the element with the ID "usernameValidation" and assigns it to the variable usernameMessage.
  // This element is the container for the validation message for the username.
  var usernameValidationMessage = document.getElementById("usernameValidation");

  // will be used to track whether the username is valid or not.
  var isValid = true;

  // loop iterates through each character of the value of the entered username
  for (var i = 0; i < input.value.length; i++) {

    // In each iteration of the loop, the variable char is assigned the current character of the username string.
    var char = input.value[i];

    /*
      if statement checks if the current character char is not a lowercase letter by comparing its character code.
      If the character is not within the lowercase letter range, the isValid variable is set to false.
    */
    if (char < "a" || char > "z") {
      isValid = false;
      break;
    }
  }


  /*
    After the loop finishes, this if-else block checks the value of isValid.
    If it is false, it means that at least one character in the username is not a lowercase letter,
    validation message for the username is displayed with the error message
    if isValid is still true, it means the username contains only lowercase letters, and the validation message is cleared
  */
  if (!isValid) {
    showUsernameValidationMessage(true);
    usernameValidationMessage.textContent = "Username must contain only lowercase letters.";
  } else {
    showUsernameValidationMessage(false);
    usernameValidationMessage.textContent = "";
  }
});

/*
  function that toggles the display of the username validation message based on the show argument.
  If show is true, the message is displayed (display: block)
  if show is false, the message is hidden (display: none)
  This function is used to control the visibility of the validation message.
*/
// Function to show/hide the Username validation message
function showUsernameValidationMessage(show) {
  var validationMessage = document.getElementById("usernameValidation");
  validationMessage.style.display = show ? "block" : "none";
}

/*
   enforce the rule that the username can only contain lowercase letters.
   listens for changes in the "userInput" element and checks each character of the entered username.
   If any character is not a lowercase letter, the validation message is displayed, indicating the error.
   if all characters are lowercase letters, the validation message is cleared.
*/

/* Password section stuff */
// Password validation: Must contain a mix of uppercase letters, lowercase letters, and numbers
document.getElementById("passwordInput").addEventListener("input", function (event) {
  var input = event.target;

  var hasLowercase = false;
  var hasUppercase = false;
  var hasNumber = false;

  for (var i = 0; i < input.value.length; i++) {
    var char = input.value[i];
    if (char >= "a" && char <= "z") {
      hasLowercase = true;
    } else if (char >= "A" && char <= "Z") {
      hasUppercase = true;
    } else if (char >= "0" && char <= "9") {
      hasNumber = true;
    }
  }

  var message = "";

  if (!hasLowercase) {
    message += "At least one lowercase letter";
  }
  if (!hasUppercase) {
    if (message !== "") {
      message += ", ";
    }
    message += "at least one uppercase letter";
  }
  if (!hasNumber) {
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

// Function to show/hide the Password validation message
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

// Function to show/hide the Password validation message
function showPasswordValidationMessage(show, message) {
  var validationMessage = document.getElementById("passwordValidation");
  validationMessage.style.display = show ? "block" : "none";
  validationMessage.textContent = message;
}

// Form submission handler
document.getElementById("myForm").addEventListener("submit", function (event) {
  var passwordInput = document.getElementById("passwordInput");
  var hasLowercase = false;
  var hasUppercase = false;
  var hasNumber = false;

  for (var i = 0; i < passwordInput.value.length; i++) {
    var char = passwordInput.value[i];
    if (char >= "a" && char <= "z") {
      hasLowercase = true;
    } else if (char >= "A" && char <= "Z") {
      hasUppercase = true;
    } else if (char >= "0" && char <= "9") {
      hasNumber = true;
    }
  }

  var message = "Password must contain: ";

  if (!hasLowercase) {
    message += "at least one lowercase letter, ";
  }

  if (!hasUppercase) {
    message += "at least one uppercase letter, ";
  }

  if (!hasNumber) {
    message += "at least one number, ";
  }

  if (passwordInput.value.length < 8) {
    message += "and be at least 8 characters long.";
  } else {
    // Remove the trailing comma and space from the message
    message = message.substring(0, message.length - 2);
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

/* Student ID stuff */

// Student ID validation: Must contain exactly 9 digits
document.getElementById("numbers").addEventListener("input", function (event) {
  var input = event.target;
  var studentIDValidationMessage = document.getElementById("studentIDValidation");
  var inputValue = input.value.trim();
  var isValid = true;

  // Check if the input is empty or has a length other than 9
  if (inputValue === "" || inputValue.length !== 9) {
    isValid = false;
  } else {
    // Check if each character of the input is a digit (0-9)
    for (var i = 0; i < inputValue.length; i++) {
      var char = inputValue[i];
      if (char < "0" || char > "9") {
        isValid = false;
        break;
      }
    }
  }

  if (!isValid) {
    showStudentIDValidationMessage(true);
    studentIDValidationMessage.textContent = "Student ID must be exactly 9 digits.";
  } else {
    showStudentIDValidationMessage(false);
    studentIDValidationMessage.textContent = "";
  }
});

// Function to show/hide the Student ID validation message
function showStudentIDValidationMessage(show) {
  var validationMessage = document.getElementById("studentIDValidation");
  validationMessage.style.display = show ? "block" : "none";
}

/* Word Count input section */
// Function to count words and update word count label
function countWords(inputElement) {
  var words = inputElement.value.trim().split(" ");
  var wordCountLabel = document.getElementById("wordCountLabel");

  // Remove empty words from the array
  words = words.filter(function (word) {
    return word !== "";
  });

  var remainingWords = 25 - words.length;
  // Set minimum remaining words to zero
  remainingWords = Math.max(remainingWords, 0);
  wordCountLabel.textContent = "Words left: " + remainingWords;

  // Disable the input only when remaining words are zero and the user presses the space bar
  inputElement.disabled = remainingWords === 0 && event.data === " ";
}

// Call the countWords() function when the page loads to display the initial word count
window.addEventListener("load", function () {
  var wordInput = document.getElementById("word");
  var userInput = document.getElementById("userInput");
  var studentIDInput = document.getElementById("numbers");

  // Reset the word count when the page loads
  wordInput.value = "";
  countWords(wordInput);

  // Reset the username input
  userInput.value = "";
  showUsernameValidationMessage(false);

  // Reset the student ID input
  studentIDInput.value = "";
  showStudentIDValidationMessage(false);

  // Add the event listener for word count using "input" event
  wordInput.addEventListener("input", function (event) {
    countWords(wordInput, event);
  });
});