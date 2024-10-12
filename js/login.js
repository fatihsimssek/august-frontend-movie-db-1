const loginFormElement = document.querySelector("#loginForm");

// Get user LocalStorage

const getUserToLocalStorage = (user) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const userObject = users.filter((item) => item.email === user.email);

  const result = userObject.length
    ? userObject[0]
    : { email: "", password: "" };

  return result;
};

// Checking the mail
const checkValidateMail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return regex.test(email);
};

const loginFormSubmitHandler = (e) => {
  e.preventDefault();

  const loginForm = {};

  // Get form data
  const loginFormData = new FormData(loginFormElement);
  loginFormData.forEach((value, key) => (loginForm[key] = value));

  const userEmail = loginForm.email.toLowerCase().trim();
  const userPassword = loginForm.password.trim();

  // Form Validations
  const validEmail = checkValidateMail(userEmail) ? userEmail : false;
  const validPassword = userPassword.length >= 8 ? userPassword : false;

  // Form Show Error
  const emailError = document.querySelector("#emailError");
  const passwordError = document.querySelector("#passwordError");

  !validEmail
    ? emailError.classList.add("show-error")
    : emailError.classList.remove("show-error");
  !validPassword
    ? passwordError.classList.add("show-error")
    : passwordError.classList.remove("show-error");

  const userData = {
    email: validEmail,
    password: validPassword,
  };

  // Checking to entered user
  const enteredUser =
    userData.email && userData.password
      ? getUserToLocalStorage(userData)
      : { email: "", password: "" };

  if (
    enteredUser.email === userData.email &&
    enteredUser.password === userData.password
  ) {
    enteredUser.isAuth = true;
    localStorage.setItem("user", JSON.stringify(enteredUser));
    showAlertMessage(true);
  } else {
    showAlertMessage(false);
    return false;
  }
};

// Alert message

const showAlertMessage = (type) => {
  const alertMessage = document.querySelector("#loginAlertBox");
  const alertTitle = alertMessage.querySelector(".lg-alert-title");
  const alertContent = alertMessage.querySelector(".lg-alert-content");

  const alertProgressBar = alertMessage.querySelector("#loginProgressBar");
  const alertProgressBarFill = alertProgressBar.querySelector(
    ".lg-alert-progress-bar-fill"
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
    type ? (window.location.href = "/index.html") : null;
  }, 4000);
};

// Manipulating label
const emailInput = document.querySelector("#email");
const emailLabel = document.querySelector('label[for="email"]');
const passwordInput = document.querySelector("#password");
const passwordLabel = document.querySelector('label[for="password"]');

emailInput.addEventListener("focus", () => {
  emailLabel.classList.add("lg-form-input-focus");
});

emailInput.addEventListener("blur", () => {
  const hasValue = emailInput.value ? true : false;
  hasValue
    ? emailLabel.classList.add("lg-form-input-focus")
    : emailLabel.classList.remove("lg-form-input-focus");
});

passwordInput.addEventListener("focus", () => {
  passwordLabel.classList.add("lg-form-input-focus");
});

passwordInput.addEventListener("blur", () => {
  const hasValue = passwordInput.value ? true : false;
  hasValue
    ? passwordLabel.classList.add("lg-form-input-focus")
    : passwordLabel.classList.remove("lg-form-input-focus");
});
