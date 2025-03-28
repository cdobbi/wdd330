import dotenv from 'dotenv';
dotenv.config();

import express, { json } from "express";
import Pusher from "pusher";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

// Create __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize the Express app and set the port
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

// API Route: Notifications
app.get("/api/notifications", (req, res) => {
    const notifications = [
        { breed: "Holland Lop" },
        { breed: "Netherland Dwarf" },
        { breed: "Flemish Giant" },
    ];
    res.json(notifications);
});

// Serve Static Files from the Project Root
// Because server.js is in /scripts, we serve files from one level up.
app.use(express.static(path.join(__dirname, '..')));

// GET "/" Route: Explicitly serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Start the Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
