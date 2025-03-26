// Fetch Pusher configuration from the server
async function initializePusher() {
    try {
        const response = await fetch("/pusher-config");
        if (!response.ok) {
            throw new Error("Failed to fetch Pusher configuration.");
        }

        const pusherConfig = await response.json();

        // Initialize Pusher using the fetched configuration
        const pusher = new Pusher(pusherConfig.key, {
            cluster: pusherConfig.cluster
        });

        // Subscribe to the "table-time" channel
        const channel = pusher.subscribe("table-time");

        // Listen for "breed-notification" events
        channel.bind("breed-notification", (data) => {
            alert(`Your breed (${data.breed}) is up next!`);
            const notificationSound = new Audio("sounds/alert.mp3");
            notificationSound.play();
        });

        return { pusher, channel };
    } catch (error) {
        console.error("Error initializing Pusher:", error);
        return null;
    }
}

// Export the initialization function
export { initializePusher };