const registerFormElement = document.querySelector("#registerForm");

// * Save the user to LocalStorage
const saveUserToLocalStorage = (user) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));

  registerFormElement.reset();

  return true;
};

const registerFormSubmitHandler = (e) => {
  e.preventDefault();

  const registerForm = {};

  // Get form data
  const registerFormData = new FormData(registerFormElement);
  registerFormData.forEach((value, key) => (registerForm[key] = value));

  const userName = registerForm.name.trim();
  const userEmail = registerForm.email.toLowerCase().trim();
  const userPassword = registerForm.password.trim();
  const userConfirmPassword = registerForm.confirmPassword.trim();
  const userTerms = registerForm.sppCheckbox === undefined ? false : true;

  // Form Validations
  const validName = userName.length >= 3 ? userName : false;
  const validEmail = checkValidateMail(userEmail) ? userEmail : false;
  const validPassword = userPassword.length >= 8 ? userPassword : false;
  const validConfirmPassword =
    validPassword === userConfirmPassword ? userConfirmPassword : false;
  const validTerms = userTerms ? userTerms : false;

  // !Form Show Error
  const nameError = document.querySelector("#nameError");
  const emailError = document.querySelector("#emailError");
  const passwordError = document.querySelector("#passwordError");
  const confirmPassWord = document.querySelector("#confirmPasswordError");
  const userTermsError = document.querySelector("#userTermsError");

  // * Validation name
  !validName
    ? nameError.classList.add("show-error")
    : nameError.classList.remove("show-error");

  userName.length === 0
    ? (nameError.textContent = "You must write a name")
    : (nameError.textContent = "Name should be 3 characters or than more");

  // * Validation email
  !validEmail
    ? emailError.classList.add("show-error")
    : emailError.classList.remove("show-error");

  userEmail.length === 0
    ? (emailError.textContent = "You must add a valid email address")
    : (emailError.textContent = "No valid email");

  // * Validation password
  !validPassword
    ? passwordError.classList.add("show-error")
    : passwordError.classList.remove("show-error");

  // * Validation confirm password
  !validConfirmPassword
    ? confirmPassWord.classList.add("show-error")
    : confirmPassWord.classList.remove("show-error");

  // * Valid user terms

  !validTerms
    ? userTermsError.classList.add("show-error")
    : userTermsError.classList.remove("show-error");

  const newUserData = {
    isAuth: false,
    name: validName,
    email: validEmail,
    password: validConfirmPassword,
    terms: validTerms,
  };

  // Save user
  const isRegistered =
    newUserData.name &&
    newUserData.email &&
    newUserData.password &&
    newUserData.terms
      ? saveUserToLocalStorage(newUserData)
      : null;

  isRegistered ? showAlertMessage(true) : showAlertMessage(false);
};

// Checking the mail
const checkValidateMail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return regex.test(email);
};

// Alert message

const showAlertMessage = (type) => {
  const alertMessage = document.querySelector("#registerAlertBox");
  const alertTitle = alertMessage.querySelector(".rg-alert-title");
  const alertContent = alertMessage.querySelector(".rg-alert-content");

  const alertProgressBar = alertMessage.querySelector("#registerProgressBar");
  const alertProgressBarFill = alertProgressBar.querySelector(
    ".rg-alert-progress-bar-fill"
  );

  if (type) {
    // alertMessage.style.display = "flex";
    alertMessage.classList.add("alert-animate");
    alertProgressBarFill.classList.add("progress-animate");
    alertMessage.style.backgroundColor = "#e91e6285";
    alertTitle.innerHTML = "Successfully";
    alertContent.textContent = "You redirect to login page, please wait...";
  } else {
    // alertMessage.style.display = "flex";
    alertMessage.classList.add("alert-animate");
    alertProgressBarFill.classList.add("progress-animate");
    alertMessage.style.backgroundColor = "#1a227e74";
    alertTitle.textContent = "Danger";
    alertContent.innerHTML =
      "Failed to register! </br> Check the information, please";
  }

  // let time = 100;
  // const step = 100 / (2500 / 10);
  // const interval = setInterval(() => {
  //   time -= step;
  //   alertProgressBarFill.style.width = `${time}%`;
  //   if (time <= 0) {
  //     clearInterval(interval);
  //   }
  // }, 10);

  setTimeout(() => {
    // alertMessage.style.display = "none";
    alertMessage.classList.remove("alert-animate");
    alertProgressBarFill.classList.remove("progress-animate");
    type ? (window.location.href = "/login.html") : null;
  }, 4000);
};

// Manipulating label
const nameInput = document.querySelector("#name");
const nameLabel = document.querySelector('label[for="name"]');
const emailInput = document.querySelector("#email");
const emailLabel = document.querySelector('label[for="email"]');
const passwordInput = document.querySelector("#password");
const passwordLabel = document.querySelector('label[for="password"]');
const confirmPasswordInput = document.querySelector("#confirmPassword");
const confirmPasswordLabel = document.querySelector(
  'label[for="confirmPassword"]'
);

nameInput.addEventListener("focus", () => {
  nameLabel.classList.add("rg-form-input-focus");
});

nameInput.addEventListener("blur", () => {
  const hasValue = nameInput.value ? true : false;
  hasValue
    ? nameLabel.classList.add("rg-form-input-focus")
    : nameLabel.classList.remove("rg-form-input-focus");
});

emailInput.addEventListener("focus", () => {
  emailLabel.classList.add("rg-form-input-focus");
});

emailInput.addEventListener("blur", () => {
  const hasValue = emailInput.value ? true : false;
  hasValue
    ? emailLabel.classList.add("rg-form-input-focus")
    : emailLabel.classList.remove("rg-form-input-focus");
});

passwordInput.addEventListener("focus", () => {
  passwordLabel.classList.add("rg-form-input-focus");
});

passwordInput.addEventListener("blur", () => {
  const hasValue = passwordInput.value ? true : false;
  hasValue
    ? passwordLabel.classList.add("rg-form-input-focus")
    : passwordLabel.classList.remove("rg-form-input-focus");
});

confirmPasswordInput.addEventListener("focus", () => {
  confirmPasswordLabel.classList.add("rg-form-input-focus");
});

confirmPasswordInput.addEventListener("blur", () => {
  const hasValue = confirmPasswordInput.value ? true : false;
  hasValue
    ? confirmPasswordLabel.classList.add("rg-form-input-focus")
    : confirmPasswordLabel.classList.remove("rg-form-input-focus");
});
