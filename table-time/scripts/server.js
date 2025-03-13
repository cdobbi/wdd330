const webPush = require("web-push");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// VAPID keys should only be generated once.
const vapidKeys = {
  publicKey: "YOUR_PUBLIC_VAPID_KEY",
  privateKey: "YOUR_PRIVATE_VAPID_KEY",
};

webPush.setVapidDetails(
  "mailto:your-email@example.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

app.use(bodyParser.json());

app.post("/send-notification", (req, res) => {
  const subscription = req.body.subscription;
  const payload = JSON.stringify({
    title: "Table Time Alert",
    body: req.body.message,
    icon: "images/notification-icon.png",
  });

  webPush
    .sendNotification(subscription, payload)
    .then((response) => {
      res.status(200).json({ success: true });
    })
    .catch((error) => {
      console.error("Error sending push notification:", error);
      res.status(500).json({ success: false, error });
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
