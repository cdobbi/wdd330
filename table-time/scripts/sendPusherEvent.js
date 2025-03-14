import { generateAuth } from "./generateAuth.js";

/**
 * Sends an event to Pusher.
 * @param {string} authKey - Your Pusher app key.
 * @param {string} secretKey - Your Pusher app secret.
 * @param {object} eventData - The event data to be sent to Pusher.
 */
export async function sendPusherEvent(authKey, secretKey, eventData) {
  try {
    // Generate authentication details
    const { authTimestamp, authSignature } = generateAuth(
      authKey,
      secretKey,
      eventData
    );

    // Send the event to Pusher
    const response = await fetch(
      "https://api.pusherapp.com/apps/1957068/events",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Pusher-Key": authKey,
          "X-Pusher-Signature": authSignature,
          "X-Pusher-Timestamp": authTimestamp,
          "X-Pusher-Version": "1.0",
        },
        body: JSON.stringify(eventData),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Event sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Error sending event:", error);
    throw error;
  }
}
