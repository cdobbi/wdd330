self.addEventListener("push", function (event) {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: "images/notification-icon.png",
    badge: "images/notification-badge.png",
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

document.addEventListener("DOMContentLoaded", function () {
  // Enable pusher logging - don't include this in production
  Pusher.logToConsole = true;

  var pusher = new Pusher("999673f7c045421210be", {
    cluster: "us3",
  });

  var channel = pusher.subscribe("my-channel");
  channel.bind("my-event", function (data) {
    // Check if the browser supports notifications and service workers
    if ("Notification" in window && "serviceWorker" in navigator) {
      // Request permission to display notifications
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          // Subscribe to push notifications
          navigator.serviceWorker.ready.then(function (registration) {
            registration.pushManager
              .subscribe({
                userVisibleOnly: true,
                applicationServerKey: "YOUR_PUBLIC_VAPID_KEY",
              })
              .then(function (subscription) {
                console.log("Subscribed to push notifications:", subscription);
              })
              .catch(function (error) {
                console.error(
                  "Failed to subscribe to push notifications:",
                  error
                );
              });
          });
        }
      });
    } else {
      // Fallback for browsers that do not support notifications
      alert(data.message);
    }
  });
});
