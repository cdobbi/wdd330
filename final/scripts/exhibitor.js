
import "./pusherNotifications.js";

document.addEventListener("DOMContentLoaded", function () {
    const breedOptionsContainer = document.getElementById("breed-options");
    const saveEntriesButton = document.getElementById("save-entries");
    const returnToLoginButton = document.getElementById("return-to-login");

    // Fetch the data from the JSON file
    fetch("data/data.json")
        .then((response) => response.json())
        .then((data) => {
            // Populate breed options as buttons
            data.entries.forEach((entry) => {
                const breedButton = document.createElement("button");
                breedButton.className = "breed-button";
                breedButton.textContent = entry.breed;

                // Add click event to toggle selection
                breedButton.addEventListener("click", function (event) {
                    event.preventDefault(); // Prevent page reload
                    breedButton.classList.toggle("selected"); // Toggle the selected class
                });

                breedOptionsContainer.appendChild(breedButton);
            });
        })
        .catch((error) => console.error("Error fetching data:", error));

    // Event listener for the "Start Application" button
    saveEntriesButton.addEventListener("click", function () {
        const selectedBreeds = [];
        const selectedButtons = breedOptionsContainer.querySelectorAll(".breed-button.selected");

        selectedButtons.forEach((button) => {
            selectedBreeds.push(button.textContent);
        });

        if (selectedBreeds.length === 0) {
            alert("Please select at least one breed to start the application.");
        } else {
            const entries = { breeds: selectedBreeds };
            localStorage.setItem("exhibitorEntries", JSON.stringify(entries));
            alert("Your entries have been saved. You will be notified when your breed is called.");
        }
    });

    async function checkForNotifications() {
        try {
            // Mocked notifications data
            const notifications = [
                { breed: "Holland Lop" },
                { breed: "Netherland Dwarf" }
            ];
    
            // Retrieve exhibitor entries from localStorage
            const exhibitorEntries = JSON.parse(localStorage.getItem("exhibitorEntries"));
    
            // Check if any notification matches the selected breeds
            notifications.forEach((notification) => {
                if (exhibitorEntries && exhibitorEntries.breeds.includes(notification.breed)) {
                    alert(`Your breed (${notification.breed}) is up next!`);
                    const notificationSound = new Audio("sounds/alert.mp3");
                    notificationSound.play();
                }
            });
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    }

    // Poll every 5 seconds
    setInterval(checkForNotifications, 5000);
});

const pusher = new Pusher("your_key", {
    cluster: "your_cluster"
});

const channel = pusher.subscribe("table-time");
channel.bind("breed-notification", (data) => {
    alert(`Your breed (${data.breed}) is up next!`);
    const notificationSound = new Audio("sounds/alert.mp3");
    notificationSound.play();
});