document.addEventListener("DOMContentLoaded", function () {
    const breedOptionsContainer = document.getElementById("breed-options");
    const saveEntriesButton = document.getElementById("save-entries");
  
    // Fetch the data from the JSON file
    fetch("data/data.json")
      .then((response) => response.json())
      .then((data) => {
        // Populate breed options
        data.entries.forEach((entry) => {
          const breedOption = document.createElement("div");
          breedOption.className = "form-check form-check-inline";
  
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.className = "form-check-input";
          checkbox.id = entry.breed;
          checkbox.value = entry.breed;
  
          const label = document.createElement("label");
          label.className = "form-check-label";
          label.htmlFor = entry.breed;
          label.textContent = entry.breed;
  
          breedOption.appendChild(checkbox);
          breedOption.appendChild(label);
          breedOptionsContainer.appendChild(breedOption);
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  
    // Event listener for the "Start Application" button
    saveEntriesButton.addEventListener("click", function () {
      const selectedBreeds = [];
      const checkboxes = breedOptionsContainer.querySelectorAll(
        "input[type=checkbox]"
      );
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          selectedBreeds.push(checkbox.value);
        }
      });
  
      if (selectedBreeds.length === 0) {
        alert("Please select at least one breed to start the application.");
      } else {
        const entries = { breeds: selectedBreeds };
        localStorage.setItem("exhibitorEntries", JSON.stringify(entries));
        alert(
          "Your entries have been saved. You will be notified when your breed is called."
        );
      }
    });
  
    // Poll for notifications
    async function checkForNotifications() {
      try {
        const response = await fetch("http://localhost:3000/api/notifications");
        const notifications = await response.json();
        const exhibitorEntries = JSON.parse(
          localStorage.getItem("exhibitorEntries")
        );
  
        notifications.forEach((notification) => {
          if (exhibitorEntries.breeds.includes(notification.breed)) {
            alert(`Your breed (${notification.breed}) is up next!`);
            const notificationSound = new Audio("sounds/alert.mp3");
            notificationSound.play();
          }
        });
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }
  
    // Poll every 5 seconds
    setInterval(checkForNotifications, 5000);
  });