let notifications = []; // Store notifications temporarily
let shows = []; // Store saved shows

// Endpoint to save a show
app.post("/api/save-show", (req, res) => {
  const { category, table, breeds } = req.body;
  if (!category || !table || !breeds || breeds.length === 0) {
    return res.status(400).json({ error: "Invalid show data." });
  }
  const newShow = { category, table, breeds };
  shows.push(newShow);
  res.json({ message: "Show saved successfully!", show: newShow });
});

// Endpoint to send a notification
app.post("/api/notifications", (req, res) => {
  const { breed } = req.body;
  if (!breed) {
    return res.status(400).json({ error: "Breed is required." });
  }
  notifications.push({ breed });
  res.json({ message: `Notification for ${breed} sent.` });
});

// Endpoint to get notifications
app.get("/api/notifications", (req, res) => {
  res.json(notifications);
});

// Endpoint to clear notifications
app.post("/api/clear-notifications", (req, res) => {
  notifications = [];
  res.json({ message: "Notifications cleared." });
});