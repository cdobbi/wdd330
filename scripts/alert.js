document.addEventListener("DOMContentLoaded", function () {
    const notificationSound = new Audio("/sounds/alert.mp3");
    const displayedNotifications = new Set();

    async function checkForNotifications() {
        const exhibitorEntries = JSON.parse(localStorage.getItem("exhibitorEntries"));
        if (!exhibitorEntries || !exhibitorEntries.breeds) {
            console.warn("No exhibitor entries found.");
            return;
        }

        try {
            const response = await fetch("https://wdd330-owtb.onrender.com/api/notifications");
            if (!response.ok) {
                throw new Error("Failed to fetch notifications.");
            }

            const notifications = await response.json();
            notifications.forEach((notification) => {
                if (!displayedNotifications.has(notification.breed) && exhibitorEntries.breeds.includes(notification.breed)) {
                    displayedNotifications.add(notification.breed);

                    // Play sound and show notification
                    notificationSound.play();
                    if ("Notification" in window) {
                        Notification.requestPermission().then((permission) => {
                            if (permission === "granted") {
                                new Notification("Table-Time Notification", {
                                    body: `Your breed (${notification.breed}) is up next!`,
                                });
                            }
                        });
                    } else {
                        alert(`Your breed (${notification.breed}) is up next!`);
                    }
                }
            });
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    }

    // Poll the backend every 30 seconds (adjust interval as needed)
    setInterval(checkForNotifications, 30000);
});
