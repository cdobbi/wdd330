document.addEventListener("DOMContentLoaded", function () {
    const saveShowButton = document.getElementById("save-show");
    const beginShowButton = document.getElementById("begin-show");
    const rabbitList = document.getElementById("rabbit-list");
    const notificationSound = new Audio("final/sounds/alert.mp3"); // Ensure this file exists

    // Fetch Rabbit Breeds from data.json
    fetch("../final/data/data.json")
        .then((response) => {
            console.log("Fetch response:", response);
            if (!response.ok) {
                throw new Error("Failed to fetch rabbit breeds.");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Fetched data:", data);
            const entries = data.entries;document.addEventListener("DOMContentLoaded", function () {
                const saveShowButton = document.getElementById("save-show");
                const beginShowButton = document.getElementById("begin-show");
                const rabbitList = document.getElementById("rabbit-list");
                const notificationSound = new Audio("../sounds/alert.mp3"); // Corrected path
            
                // Fetch Rabbit Breeds from data.json
                fetch("../data/data.json") // Corrected path
                    .then((response) => {
                        console.log("Fetch response:", response);
                        if (!response.ok) {
                            throw new Error("Failed to fetch rabbit breeds.");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        console.log("Fetched data:", data);
                        const entries = data.entries;
                        rabbitList.innerHTML = ""; // Clear placeholder rabbits
            
                        // Populate the rabbit list dynamically
                        entries.forEach((entry) => {
                            const listItem = document.createElement("li");
                            listItem.className = "list-group-item breed-button";
                            listItem.dataset.breed = entry.breed;
                            listItem.textContent = entry.breed;
                            rabbitList.appendChild(listItem);
                        });
            
                        // Attach event listeners to dynamically created breed buttons
                        const dynamicBreedButtons = document.querySelectorAll(".breed-button");
                        dynamicBreedButtons.forEach((button) => {
                            button.addEventListener("click", async () => {
                                const breed = button.dataset.breed;
            
                                try {
                                    const response = await fetch("https://wdd330-owtb.onrender.com/api/notifications", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ breed }),
                                    });
                                    const data = await response.json();
                                    alert(`Notification sent for breed: ${breed}`);
                                    notificationSound.play(); // Play notification sound
                                } catch (error) {
                                    console.error("Error sending notification:", error);
                                    alert("An error occurred while sending the notification. Please try again.");
                                }
                            });
                        });
                    })
                    .catch((error) => {
                        console.error("Error fetching rabbit breeds:", error);
                        rabbitList.innerHTML = "<li class='list-group-item text-danger'>Failed to load rabbit breeds.</li>";
                    });
            
                // Save Show
                if (saveShowButton) {
                    saveShowButton.addEventListener("click", async () => {
                        const category = document.getElementById("category").value;
                        const table = document.getElementById("table").value;
                        const selectedBreeds = Array.from(
                            document.querySelectorAll(".breed-checkbox:checked")
                        ).map((checkbox) => checkbox.value);
            
                        if (!category || !table || selectedBreeds.length === 0) {
                            alert("Please select a category, table, and at least one breed.");
                            return;
                        }
            
                        try {
                            const response = await fetch("https://wdd330-owtb.onrender.com/api/save-show", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ category, table, breeds: selectedBreeds }),
                            });
                            const data = await response.json();
                            alert(`Show saved successfully!\nCategory: ${category}\nTable: ${table}\nBreeds: ${selectedBreeds.join(", ")}`);
                        } catch (error) {
                            console.error("Error saving show:", error);
                            alert("An error occurred while saving the show. Please try again.");
                        }
                    });
                }
            
                // Begin Show
                if (beginShowButton) {
                    beginShowButton.addEventListener("click", () => {
                        window.location.href = "lineup.html";
                    });
                }
            });
            rabbitList.innerHTML = ""; // Clear placeholder rabbits

            // Populate the rabbit list dynamically
            entries.forEach((entry) => {
                const listItem = document.createElement("li");
                listItem.className = "list-group-item breed-button";
                listItem.dataset.breed = entry.breed;
                listItem.textContent = entry.breed;
                rabbitList.appendChild(listItem);
            });

            // Attach event listeners to dynamically created breed buttons
            const dynamicBreedButtons = document.querySelectorAll(".breed-button");
            dynamicBreedButtons.forEach((button) => {
                button.addEventListener("click", async () => {
                    const breed = button.dataset.breed;

                    try {
                        const response = await fetch("https://wdd330-owtb.onrender.com/api/notifications", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ breed }),
                        });
                        const data = await response.json();
                        alert(`Notification sent for breed: ${breed}`);
                        notificationSound.play(); // Play notification sound
                    } catch (error) {
                        console.error("Error sending notification:", error);
                        alert("An error occurred while sending the notification. Please try again.");
                    }
                });
            });
        })
        .catch((error) => {
            console.error("Error fetching rabbit breeds:", error);
            rabbitList.innerHTML = "<li class='list-group-item text-danger'>Failed to load rabbit breeds.</li>";
        });

    // Save Show
    if (saveShowButton) {
        saveShowButton.addEventListener("click", async () => {
            const category = document.getElementById("category").value;
            const table = document.getElementById("table").value;
            const selectedBreeds = Array.from(
                document.querySelectorAll(".breed-checkbox:checked")
            ).map((checkbox) => checkbox.value);

            if (!category || !table || selectedBreeds.length === 0) {
                alert("Please select a category, table, and at least one breed.");
                return;
            }

            try {
                const response = await fetch("https://wdd330-owtb.onrender.com/api/save-show", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ category, table, breeds: selectedBreeds }),
                });
                const data = await response.json();
                alert(`Show saved successfully!\nCategory: ${category}\nTable: ${table}\nBreeds: ${selectedBreeds.join(", ")}`);
            } catch (error) {
                console.error("Error saving show:", error);
                alert("An error occurred while saving the show. Please try again.");
            }
        });
    }

    // Begin Show
    if (beginShowButton) {
        beginShowButton.addEventListener("click", () => {
            window.location.href = "lineup.html";
        });
    }
});