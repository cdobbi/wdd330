// Initialize Pusher
const pusher = new Pusher("your_key", {
    cluster: "your_cluster"
});

// Subscribe to the "table-time" channel
const channel = pusher.subscribe("table-time");

// Listen for "breed-notification" events
channel.bind("breed-notification", (data) => {
    alert(`Your breed (${data.breed}) is up next!`);
    const notificationSound = new Audio("sounds/alert.mp3");
    notificationSound.play();
});

// Export Pusher instance and channel for potential reuse
export { pusher, channel };