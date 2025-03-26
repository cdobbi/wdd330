import dotenv from 'dotenv';
dotenv.config();

import express, { json } from "express";
import Pusher from "pusher";
import cors from "cors";

const app = express();
const port = 3000;

// Configure Pusher
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true,
});

// Middleware
app.use(json());
app.use(cors());

// Verify Code Endpoint
app.post("/verify-code", (req, res) => {
    const { code } = req.body;

    // Replace "12345" with your actual verification logic
    if (code === "12345") {
        res.json({ valid: true });
    } else {
        res.json({ valid: false });
    }
});

// Notify Endpoint
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

// Add this route to handle GET requests to /api/notifications
app.get("/api/notifications", (req, res) => {
    const notifications = [
        { breed: "Holland Lop" },
        { breed: "Netherland Dwarf" },
        { breed: "Flemish Giant" },
    ];
    res.json(notifications);
});

app.use(express.static("c:/Users/UtahH/OneDrive - BYU-Idaho/School/wdd330"));
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Add this route to handle GET requests to the root URL
app.get("/", (req, res) => {
    res.send("Welcome to the Table Time API!");
});