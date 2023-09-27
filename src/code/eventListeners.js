// ================ DRAWER ================

function drawer() {
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
}
// ================ /DRAWER ================

// ================ Modals ================
// Get the modal
var loginModal = document.getElementById("loginModal");
var registerModal = document.getElementById("registerModal");
var btnLogin = document.getElementById("btn-login");
var btnRegister = document.getElementById("btn-register");
var spanLogin = document.getElementsByClassName("close")[0];
var spanRegister = document.getElementsByClassName("close")[1];
const input = document.getElementById("register-img-input");

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
  const registerImg = document.getElementById("register-img-input").files[0];
  register(fullName, userName, email, password, registerImg, () => {
    registerModal.style.display = "none";
    setupUI();
  });
}

// for the register img preview
const previewPhoto = () => {
  const file = input.files;
  if (file) {
    const fileReader = new FileReader();
    const preview = document.getElementById("register-img");
    fileReader.onload = (event) => {
      preview.setAttribute("src", event.target.result);
    };
    fileReader.readAsDataURL(file[0]);
  }
};

// logout button clicked
function logoutBtnClicked() {
  localStorage.setItem("token", "");
  localStorage.setItem("user", "");
  setupUI();
}
// ================ /Modals ================

// ================ SETUP UI ================
var isLargeScreen = false;

function pixelsToRem(pixels) {
  const baseFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );
  return pixels / baseFontSize;
}

// Define a function to handle the window resize event
function handleResize() {
  // Get the window width in pixels
  const windowWidthPixels = window.innerWidth;

  // Convert the window width to rems
  const windowWidthRems = pixelsToRem(windowWidthPixels);

  // console.log(`Window width: ${windowWidthRems}rem`);

  // You can add your responsive code here
  if (windowWidthRems <= 55) {
    // Execute code for small screens (less than or equal to 55rem)
    isLargeScreen = false;
  } else {
    // Execute code for larger screens
    isLargeScreen = true;
  }
  setupUI();
}

// here we fill the image and name of user in the create post div
function showUserInfo() {
  const publisherImg = document.getElementById("post-publisher-img");
  const publisherName = document.getElementById("post-publisher-name");
  const userData = JSON.parse(localStorage.getItem("user"));
  if (JSON.stringify(userData.profile_image) != "{}") {
    publisherImg.src = userData.profile_image;
  }

  publisherName.innerHTML = userData.username;
  console.log(JSON.stringify(userData.profile_image));
}

function setupUI() {
  const token = localStorage.getItem("token");
  const loginBtn = document.getElementById("btn-login");
  const registerBtn = document.getElementById("btn-register");
  const logoutBtn = document.getElementById("btn-logout");
  const addPost = document.getElementById("create-post");

  // console.log("isLargeScreen: " + isLargeScreen);
  if (token == "") {
    // user is not login [guest]
    loginBtn.style.display = isLargeScreen ? "inline-block" : "block";
    registerBtn.style.display = isLargeScreen ? "inline-block" : "block";
    logoutBtn.style.display = "none";
    addPost.style.display = "none";
  } else {
    // user is login
    addPost.style.display = "block";
    loginBtn.style.display = "none";
    registerBtn.style.display = "none";
    logoutBtn.style.display = isLargeScreen ? "inline-block" : "block";
    showUserInfo();
  }
}
// ================ /SETUP UI ================

// ================ Create Post ================
// register button clicked
function publishBtnClicked() {
  const postTitle = document.getElementById("create-post-title").value;
  const postDescription = document.getElementById("create-post-body").value;
  const postImg = document.getElementById("create-post-img").files[0];
  // const publishBtn = document.getElementById("email-input-register").value;

  publishPost(postTitle, postDescription, postImg, () => {
    setupUI();
  });
}
// ================ /Create Post ================

drawer();
handleResize();
window.addEventListener("resize", handleResize);
input.addEventListener("change", previewPhoto);
setupUI();
