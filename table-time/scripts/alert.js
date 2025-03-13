document.addEventListener("DOMContentLoaded", function () {
  const lineupContainer = document.getElementById("lineup-container");

  // Function to send an alert using Pusher
  function sendAlert(breed) {
    const eventData = {
      name: "my-event",
      channel: "my-channel",
      data: JSON.stringify({
        message: `Take your ${breed} to the show table!`,
      }),
    };

    fetch("https://api.pusherapp.com/apps/1957068/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Pusher-Key": "your-pusher-key",
        "X-Pusher-Signature": "your-pusher-signature",
        "X-Pusher-Timestamp": "your-pusher-timestamp",
        "X-Pusher-Version": "your-pusher-version",
      },
      body: JSON.stringify(eventData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Event sent successfully:", data);
      })
      .catch((error) => {
        console.error("Error sending event:", error);
      });
  }

  // Add event listener to the lineup container to handle breed clicks
  lineupContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("breed-item")) {
      const breed = event.target.textContent;
      sendAlert(breed);
    }
  });
});
