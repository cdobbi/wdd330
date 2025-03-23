document.addEventListener("DOMContentLoaded", function () {
    const notificationSound = new Audio("notification.mp3"); // Add your notification sound file here
  
    async function checkForNotifications() {
      try {
        const response = await fetch("http://localhost:3000/api/notifications");
        if (!response.ok) {
          throw new Error("Failed to fetch notifications.");
        }
  
        const notifications = await response.json();
        const exhibitorEntries = JSON.parse(
          localStorage.getItem("exhibitorEntries")
        );
  
        if (!exhibitorEntries || !exhibitorEntries.breeds) {
          console.warn("No exhibitor entries found.");
          return;
        }
  
        notifications.forEach((notification) => {
          if (exhibitorEntries.breeds.includes(notification.breed)) {
            // Play notification sound
            notificationSound.play();
  
            // Show browser notification (if supported)
            if ("Notification" in window) {
              Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                  new Notification("Table-Time Notification", {
                    body: `Your breed (${notification.breed}) is up next!`,
                  });
                }
              });
            } else {
              // Fallback for unsupported browsers
              alert(`Your breed (${notification.breed}) is up next!`);
            }
          }
        });
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }
  
    // Poll the backend every 5 seconds
    setInterval(checkForNotifications, 5000);
  });