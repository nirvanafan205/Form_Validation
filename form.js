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

/* Starting ponit stuff */
// Start Year validation: Must be a valid year (2-digit or 4-digit, not in the future)
document.getElementById("startYear").addEventListener("input", function (event) {
  var input = event.target;
  var startYearValidationMessage = document.getElementById("startYearValidation");
  var startYear = input.value.trim();

  // Check if the year is in 2-digit or 4-digit format
  var isValidFormat = startYear.length === 2 || startYear.length === 4;

  // Check if the year contains only digits
  var isValidYear = true;
  for (var i = 0; i < startYear.length; i++) {
    var char = startYear[i];
    if (char < "0" || char > "9") {
      isValidYear = false;
      break;
    }
  }

  // Check if the year is not in the future
  var currentYear = new Date().getFullYear();
  var year = startYear.length === 2 ? parseInt("20" + startYear, 10) : parseInt(startYear, 10);
  var isNotInFuture = year <= currentYear;

  // Combine the format, valid year, and not in the future checks
  var isValid = isValidFormat && isValidYear && isNotInFuture;

  // Display validation message
  startYearValidationMessage.style.display = isValid ? "none" : "block";
  startYearValidationMessage.textContent = isValid ? "" : "Invalid year format or year is in the future.";
});

// Start Semester validation: Must be a valid semester option
document.getElementById("startSemester").addEventListener("change", function (event) {
  var input = event.target;
  var startSemesterValidationMessage = document.getElementById("startSemesterValidation");
  var selectedSemester = input.value;

  // Define the valid semester options
  var validSemesters = ["Spring", "Summer", "Fall", "Winter"];

  // Check if the selected semester is a valid option
  var isValidSemester = validSemesters.includes(selectedSemester);

  // Display validation message
  startSemesterValidationMessage.style.display = isValidSemester ? "none" : "block";
  startSemesterValidationMessage.textContent = isValidSemester ? "" : "Invalid semester option.";
});

/* Password section stuff */
// Password validation: Must contain a mix of uppercase letters, lowercase letters, and numbers
document.getElementById("passwordInput").addEventListener("input", function (event) { /* adds an event listener to the "passwordInput" element, which listens for the "input" event. */
  var input = event.target; // represents the element that triggered the event, assign it to the variable input for reference.

  // Three boolean variables are initialized to false.
  // variables will be used to track whether the password contains at least
  // one lowercase letter, one uppercase letter, and one number
  var hasLowercase = false;
  var hasUppercase = false;
  var hasNumber = false;

  //  loop is used to iterate through each character of the password
  for (var i = 0; i < input.value.length; i++) {
    var char = input.value[i];
    if (char >= "a" && char <= "z") {
      hasLowercase = true;
    } else if (char >= "A" && char <= "Z") {
      hasUppercase = true;
    } else if (char >= "0" && char <= "9") {
      hasNumber = true;
    }

    /*
      each character is checked to determine whether it belongs to lowercase letters, uppercase letters, or numbers using their respective ASCII character codes.
      If a character matches any of these categories, the corresponding boolean variable is set to true.
    */
  }

  //  initialized to an empty string. 
  // will be used to store the specific requirements that the password must meet
  var message = "";

  // A series of if statements are used to construct the message string based on the password validation rules.
  // If a requirement is not met, a message for that requirement is added to the message string.
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

  /*
    After checking all the characters in the password, the length of the message string is examined.
    If it is empty, it means all password requirements are met, and the password is valid.
    If the password input is empty (all spaces) and contains no characters, the validation message is hidden.
    Otherwise, if the password is valid (all requirements are met), the validation message is hidden.
    If the password is invalid , the validation message is shown with the specific feedback provided in the message variable.
  */
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

  /*
    function handles the visibility of the password.
    When the password input is of type password, it shows the password as plain text.
    if the input is of type "text," it hides the password.
  */
}

// Function to show/hide the Password validation message
function showPasswordValidationMessage(show, message) {
  var validationMessage = document.getElementById("passwordValidation");
  validationMessage.style.display = show ? "block" : "none"; // ternary operator
  validationMessage.textContent = message;
  /*
    responsible for showing/hiding the validation message.
    takes two arguments: show, a boolean that determines whether to show or hide the message, and message, which contains the specific validation feedback.
    If show is true, the message is displayed (display: block), and if show is false, the message is hidden (display: none).
    The textContent property is used to set the message content.
  */
}

// Form submission handler
document.getElementById("myForm").addEventListener("submit", function (event) { /* adds an event listener to the "submit" event of the form element with the id "myForm." */

  // fetches the password input element with the id "passwordInput" and assigns it to the variable passwordInput
  var passwordInput = document.getElementById("passwordInput");

  // Three boolean variables are initialized to false. will be used to track whether the password contains at least one
  // lowercase letter, one uppercase letter, and one number, respectively
  var hasLowercase = false;
  var hasUppercase = false;
  var hasNumber = false;

  // loop is used to iterate through each character of the password
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

  // display an alert message:
  alert("Form validation succeeded!");

  // prevents the form from being submitted to the server, effectively preventing form submission if the validation fails.
  event.preventDefault();
});

/* Student ID stuff */
// Student ID validation: Must contain exactly 9 digits
/*
  adds an event listener to the "input" event of the element with the ID "numbers."
  function provided as the second argument will be executed whenever the user types or modifies the input in the student ID field
*/
document.getElementById("numbers").addEventListener("input", function (event) {
  /*
    event object contains information about the event that occurred.
    The event.target property represents the element that triggered the event, which is the student ID input field itself.

    studentIDValidationMessage is used to retrieve the element with the ID "studentIDValidation" and assign it to a variable.
    This element is the container for the validation message for the student ID.

    inputValue is a variable that stores the trimmed value of the student ID input.
    The .trim() method is used to remove any leading or trailing whitespaces from the input.

    isValid is a boolean variable initialized to true.
    It will be used to track whether the student ID is valid or not.
  */
  var input = event.target;
  var studentIDValidationMessage = document.getElementById("studentIDValidation");
  var inputValue = input.value.trim();
  var isValid = true;

  // Check if the input is empty or has a length other than 9

  /*
    checks the validity of the student ID input.
    checks whether the inputValue is empty or its length is not equal to 9.
    If either condition is true, it sets isValid to false, indicating that the student ID is invalid.

    If the inputValue passes the above check, it enters the else block.
    In the else block, it iterates through each character of the inputValue using a for loop.

    For each character char in inputValue, it checks whether it is a digit.
    If any character is not a digit, it sets isValid to false and immediately breaks out of the loop using the break statement.
  */

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

  //  this block shows or hides the validation message for the student ID.
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


  /*
    responsible for showing or hiding the validation message for the student ID.
    It takes one argument show, which is a boolean value that determines whether to show (true) or hide (false) the message.

    The function retrieves the element with the ID "studentIDValidation" and assigns it to the variable validationMessage.
    This element is the container for the validation message for the student ID.

    Depending on the value of show, it sets the display style of the validationMessage element to either "block" (to show the message) or "none" (to hide the message).
    This effectively controls the visibility of the validation message.
  */
}

/* Word Count input section */
// Function to count words and update word count label
function countWords(inputElement) { /* The inputElement is expected to be an input field from which the word count needs to be calculated. */
  /*
    retrieves the value of the input field and then .trim() method is used to remove any leading or trailing whitespaces from the value.
    .split(" ") is used to split the trimmed value into an array of words based on spaces (" ").
  */
  var words = inputElement.value.trim().split(" ");
  var wordCountLabel = document.getElementById("wordCountLabel");

  // Remove empty words from the array
  words = words.filter(function (word) {
    return word !== "";
  });

  // calculates the remaining words the user can input. The maximum word count allowed is 25
  var remainingWords = 25 - words.length; // initialized with the difference between the maximum word count and the number of words in the words array.

  // Set minimum remaining words to zero
  remainingWords = Math.max(remainingWords, 0); //  ensure that remainingWords is at least zero. If it is negative, it is set to zero.
  wordCountLabel.textContent = "Words left: " + remainingWords;  //  display the remaining word count.

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