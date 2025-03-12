document.addEventListener("DOMContentLoaded", function () {
  const publishDateElement = document.getElementById("publish-date");
  const now = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  publishDateElement.textContent = now.toLocaleDateString("en-US", options);

  // Function to display notification
  function displayNotification(breed) {
    alert(`Alert: Please bring your ${breed} to the judge's table.`);
  }

  // Listen for changes in localStorage
  window.addEventListener("storage", function (event) {
    if (event.key === "currentBreed" && event.newValue) {
      displayNotification(event.newValue);
    }
  });

  // Initial check for currentBreed in localStorage
  const currentBreed = localStorage.getItem("currentBreed");
  if (currentBreed) {
    displayNotification(currentBreed);
  }
});
