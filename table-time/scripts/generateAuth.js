const crypto = require("crypto");
const axios = require("axios");

const authKey = "999673f7c045421210be";
const authTimestamp = Math.floor(Date.now() / 1000); // Generates current timestamp
const authVersion = "1.0";
const bodyMD5 = "2c99321eeba901356c4c7998da9be9e0";
const secretKey = "f38c091aeb07c7e5194a"; // Your app's secret key

const stringToSign = `POST\n/apps/1957068/events\nauth_key=${authKey}&auth_timestamp=${authTimestamp}&auth_version=${authVersion}&body_md5=${bodyMD5}`;

const authSignature = crypto
  .createHmac("sha256", secretKey)
  .update(stringToSign)
  .digest("hex");

console.log(`Auth Signature: ${authSignature}`);

// Send event to Pusher
const eventData = {
  name: "my-event",
  channel: "my-channel",
  data: JSON.stringify({ message: "Take your breed to the show table!" }),
};

axios
  .post("https://api.pusherapp.com/apps/1957068/events", eventData, {
    headers: {
      "Content-Type": "application/json",
      "X-Pusher-Key": authKey,
      "X-Pusher-Signature": authSignature,
      "X-Pusher-Timestamp": authTimestamp,
      "X-Pusher-Version": authVersion,
    },
  })
  .then((response) => {
    console.log("Event sent successfully:", response.data);
  })
  .catch((error) => {
    console.error("Error sending event:", error);
  });
