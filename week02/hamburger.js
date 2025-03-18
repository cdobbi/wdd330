const hambutton = document.querySelector('.🍔');
const mainnav = document.querySelector('.navigation');
let alertShown = false; // Flag to track if the alert has been shown

hambutton.addEventListener('click', () => {
  mainnav.classList.toggle('responsive');
  alertShown = false; // Reset the flag when the menu is toggled
}, false);

// To solve the mid resizing issue with responsive class [window.onresize]
window.addEventListener('resize', () => {
  if (window.innerWidth > 760) { // window.innerWidth includes the scrollbar (if any), document.documentElement.clientWidth does not
    if (mainnav.classList.contains('responsive')) {
      mainnav.classList.remove('responsive');
      if (!alertShown) {
        window.alert("The responsive class has been removed.");
        alertShown = true; // Set the flag to true after showing the alert
      }
    }
  } else {
    alertShown = false; // Reset the flag if the window is resized to a width less than or equal to 760 pixels
  }
});