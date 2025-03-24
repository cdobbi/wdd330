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

// Endpoint to expose Pusher key and cluster
app.get("/pusher-config", (req, res) => {
    res.json({
        key: process.env.PUSHER_KEY,
        cluster: process.env.PUSHER_CLUSTER
    });
});

// Notify endpoint
app.post("/notify", (req, res) => {
    const { breed } = req.body;

    if (!breed) {
        return res.status(400).send("Breed is required.");
    }

    try {
        pusher.trigger("table-time", "breed-notification", { breed });
        res.status(200).send("Notification sent!");
    } catch (error) {
        console.error("Error triggering Pusher event:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.post("/verify-code", (req, res) => {
    const { code } = req.body;

    // Replace "12345" with your actual verification logic
    if (code === "12345") {
        res.json({ valid: true });
    } else {
        res.json({ valid: false });
    }
});