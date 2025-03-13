self.addEventListener("push", function (event) {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: "images/notification-icon.png",
    badge: "images/notification-badge.png",
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});
