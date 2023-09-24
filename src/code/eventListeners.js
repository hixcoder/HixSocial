// ================ DRAWER ================
const drawerCheckbox = document.getElementById("drawer");
const drawerIcon = document.getElementById("drawer-icon");
const nav = document.getElementsByClassName("nav");
const navlink = document.getElementsByClassName("navlink");

drawerCheckbox.addEventListener("change", () => {
  drawerIcon.style.transition = "0.5s";
  for (let i = 0; i < navlink.length; i++) {
    if (drawerCheckbox.checked) {
      navlink[i].style.marginTop = "-100%";
      drawerIcon.className = "fa-solid fa-bars";
      // nav[0].style.height = "0";
    } else {
      // nav[0].style.height = "100vh";
      navlink[i].style.marginTop = "0";
      navlink[i].style.transition = "0.5s";
      drawerIcon.className = "fa-solid fa-x";
    }
  }
});
// ================ /DRAWER ================

// ================ Modals ================
// Get the modal
var loginModal = document.getElementById("loginModal");
var registerModal = document.getElementById("registerModal");
var btnLogin = document.getElementById("btn-login");
var btnRegister = document.getElementById("btn-register");
var spanLogin = document.getElementsByClassName("close")[0];
var spanRegister = document.getElementsByClassName("close")[1];

// When the user clicks on the button, open the modal
btnLogin.onclick = function () {
  loginModal.style.display = "block";
};
btnRegister.onclick = function () {
  registerModal.style.display = "block";
};
// When the user clicks on <span> (x), close the modal
spanLogin.onclick = function () {
  loginModal.style.display = "none";
};
spanRegister.onclick = function () {
  registerModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == loginModal) {
    loginModal.style.display = "none";
  } else if (event.target == registerModal) {
    registerModal.style.display = "none";
  }
};

// login button clicked
function loginBtnClicked() {
  const userName = document.getElementById("userName-input").value;
  const password = document.getElementById("password-input").value;
  login(userName, password, () => {
    loginModal.style.display = "none";
    setupUI();
  });
}

// register button clicked
function registerBtnClicked() {
  const userName = document.getElementById("userName-input-register").value;
  const password = document.getElementById("password-input-register").value;
  const fullName = document.getElementById("fullName-input-register").value;
  const email = document.getElementById("email-input-register").value;
  register(fullName, userName, email, password, () => {
    registerModal.style.display = "none";
    setupUI();
  });
}

// logout button clicked
function logoutBtnClicked() {
  localStorage.setItem("token", "");
  localStorage.setItem("user", "");
  setupUI();
}
// ================ /Modals ================

// ================ SETUP UI ================
function setupUI() {
  const token = localStorage.getItem("token");
  const loginBtn = document.getElementById("btn-login");
  const registerBtn = document.getElementById("btn-register");
  const logoutBtn = document.getElementById("btn-logout");

  if (token == "") {
    // user is not login [guest]
    loginBtn.style.display = "inline-block";
    registerBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
  } else {
    loginBtn.style.display = "none";
    registerBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
    // user is login
  }
}
// ================ /SETUP UI ================

setupUI();
