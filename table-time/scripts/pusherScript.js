document.addEventListener("DOMContentLoaded", function () {
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher("999673f7c045421210be", {
        cluster: "us3",
    });

    var channel = pusher.subscribe("my-channel");
    channel.bind("my-event", function (data) {
        // Check if the browser supports notifications
        if ("Notification" in window) {
            // Request permission to display notifications
            Notification.requestPermission().then(function (permission) {
                if (permission === "granted") {
                    // Create and display the notification
                    var notification = new Notification("Table Time Alert", {
                        body: data.message,
                        icon: "images/notification-icon.png" // Optional: Add an icon for the notification
                    });

                    // Play a sound
                    var audio = new Audio("sounds/alert.mp3"); // Path to your alert sound file
                    audio.play();
                }
            });
        } else {
            // Fallback for browsers that do not support notifications
            alert(data.message);
        }
    });
});
