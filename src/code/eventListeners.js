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

// ================ Login Modal ================
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("btn-login");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// login button clicked
function loginBtnClicked() {
  const userName = document.getElementById("userName-input").value;
  const password = document.getElementById("password-input").value;
  // alert(userName + " " + password);
  login(userName, password, () => {
    modal.style.display = "none";
    setupUI();
  });
}

// logout button clicked
function logoutBtnClicked() {
  localStorage.setItem("token", "");
  localStorage.setItem("user", "");
  setupUI();
  console.log("hello");
}

// ================ SETUP UI ================
function setupUI() {
  const token = localStorage.getItem("token");
  const loginBtn = document.getElementById("btn-login");
  const registerBtn = document.getElementById("btn-register");
  const logoutBtn = document.getElementById("btn-logout");

  console.log("hello " + token);
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

setupUI();
