document.addEventListener("DOMContentLoaded", function () {
    const saveShowButton = document.getElementById("save-show");
    const beginShowButton = document.getElementById("begin-show");
    const breedButtons = document.querySelectorAll(".breed-button");
    const notificationSound = new Audio("notification.mp3"); // Add your notification sound file here
  
    // Save Show
    if (saveShowButton) {
      saveShowButton.addEventListener("click", async () => {
        const category = document.getElementById("category").value;
        const table = document.getElementById("table").value;
        const selectedBreeds = Array.from(
          document.querySelectorAll(".breed-checkbox:checked")
        ).map((checkbox) => checkbox.value);
  
        if (!category || !table || selectedBreeds.length === 0) {
          alert("Please select a category, table, and at least one breed.");
          return;
        }
  
        try {
          const response = await fetch("http://localhost:3000/api/save-show", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category, table, breeds: selectedBreeds }),
          });
          const data = await response.json();
          alert(`Show saved successfully!\nCategory: ${category}\nTable: ${table}\nBreeds: ${selectedBreeds.join(", ")}`);
        } catch (error) {
          console.error("Error saving show:", error);
          alert("An error occurred while saving the show. Please try again.");
        }
      });
    }
  
    // Begin Show
    if (beginShowButton) {
      beginShowButton.addEventListener("click", () => {
        window.location.href = "lineup.html";
      });
    }
  
    // Notify Exhibitors
    breedButtons.forEach((button) => {
      button.addEventListener("click", async () => {
        const breed = button.dataset.breed;
  
        try {
          const response = await fetch("http://localhost:3000/api/notifications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ breed }),
          });
          const data = await response.json();
          alert(`Notification sent for breed: ${breed}`);
          notificationSound.play(); // Play notification sound
        } catch (error) {
          console.error("Error sending notification:", error);
          alert("An error occurred while sending the notification. Please try again.");
        }
      });
    });
  });