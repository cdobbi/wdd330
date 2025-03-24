document.addEventListener("DOMContentLoaded", () => {
    const organizerButton = document.getElementById("organizer-button");
    const exhibitorButton = document.getElementById("exhibitor-button");
    const verifyCodeButton = document.getElementById("verify-code");

    organizerButton.addEventListener("click", () => {
        // Show the modal for code verification
        $("#organizerModal").modal("show");
    });

    verifyCodeButton.addEventListener("click", async () => {
        const code = document.getElementById("organizer-code").value;

        try {
            const response = await fetch("/verify-code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code }),
            });

            if (!response.ok) {
                throw new Error("Failed to verify code.");
            }

            const result = await response.json();

            if (result.valid) {
                $("#organizerModal").modal("hide");
                alert("Code verified successfully.");
                window.location.href = "organizer.html";
            } else {
                alert("Incorrect code. Please try again.");
            }
        } catch (error) {
            console.error("Error verifying code:", error);
            alert("An error occurred while verifying the code. Please try again.");
        }
    });

    exhibitorButton.addEventListener("click", () => {
        // Redirect to exhibitor page or perform any action
        window.location.href = "exhibitor.html";
    });
});

// document.addEventListener("DOMContentLoaded", () => {
//   const organizerButton = document.getElementById("organizer-button");
//   const exhibitorButton = document.getElementById("exhibitor-button");
//   const verifyCodeButton = document.getElementById("verify-code");

//   organizerButton.addEventListener("click", () => {
//     // Show the modal for code verification
//     $("#organizerModal").modal("show");
//   });

//   verifyCodeButton.addEventListener("click", () => {
//     const code = document.getElementById("organizer-code").value;
//     if (code === "12345") {
//       // Replace '12345' with the actual code
//       $("#organizerModal").modal("hide");
//       alert("Code verified successfully.");
//       window.location.href = "organizer.html";
//     } else {
//       alert("Incorrect code. Please try again.");
//     }
//   });

//   exhibitorButton.addEventListener("click", () => {
//     // Redirect to exhibitor page or perform any action
//     window.location.href = "exhibitor.html";
//   });
// });
