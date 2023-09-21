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
