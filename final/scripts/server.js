require("dotenv").config();
const express = require("express");
const Pusher = require("pusher");

const app = express();
const port = 3000;

// Configure Pusher
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true
});

// Middleware to parse JSON
app.use(express.json());

// Endpoint for the organizer to send notifications
app.post("/notify", (req, res) => {
    const { breed } = req.body;

    // Trigger a Pusher event
    pusher.trigger("table-time", "breed-notification", { breed });

    res.status(200).send("Notification sent!");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
