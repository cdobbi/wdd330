document.addEventListener("DOMContentLoaded", function () {
    const verifyButton = document.getElementById("verify-code");

    if (verifyButton) {
        verifyButton.addEventListener("click", async function () {
            const organizerCode = document.getElementById("organizer-code").value;

            try {
                // Send the organizer code to the server for verification
                const response = await fetch("http://localhost:3000/verify-code", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code: organizerCode }),
                });

                const result = await response.json();

                if (result.valid) {
                    // Redirect to lineup.html if the code is valid
                    window.location.href = "lineup.html";
                } else {
                    // Show an error message if the code is invalid
                    alert("Invalid code. Please try again.");
                }
            } catch (error) {
                console.error("Error verifying code:", error);
                alert("An error occurred while verifying the code. Please try again.");
            }
        });
    } else {
        console.warn("Verify button not found in the DOM.");
    }
});