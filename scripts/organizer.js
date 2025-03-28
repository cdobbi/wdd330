document.addEventListener("DOMContentLoaded", function () {
    const saveShowButton = document.getElementById("save-show");
    const beginShowButton = document.getElementById("begin-show");
    const rabbitList = document.getElementById("rabbit-list");

    // Fetch Rabbit Breeds from data/data.json
    fetch("data/data.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch rabbit breeds.");
            }
            return response.json();
        })
        .then((data) => {
            const entries = data.entries; // Access the "entries" key
            rabbitList.innerHTML = ""; // Clear placeholder rabbits

            // Populate the rabbit list dynamically as buttons
            entries.forEach((entry) => {
                const button = document.createElement("button");
                // Use Bootstrap button classes with a small size and margin
                button.className = "btn btn-outline-secondary btn-sm m-1 breed-button";
                button.dataset.breed = entry.breed;
                button.textContent = entry.breed;
                // Toggle selection when clicked
                button.addEventListener("click", function () {
                    this.classList.toggle("active");
                    console.log(
                        `Breed ${this.dataset.breed} is now ${this.classList.contains("active") ? "selected" : "deselected"}`
                    );
                });
                rabbitList.appendChild(button);
            });
        })
        .catch((error) => {
            console.error("Error fetching rabbit breeds:", error);
            rabbitList.innerHTML = "<div class='text-danger'>Failed to load rabbit breeds.</div>";
        });

    // Save Show: Gather category, table, and selected breeds (from active buttons)
    if (saveShowButton) {
        saveShowButton.addEventListener("click", async () => {
            const category = document.getElementById("category").value;
            const table = document.getElementById("table").value;
            // Retrieve selected breeds from buttons that have the "active" class
            const selectedBreeds = Array.from(document.querySelectorAll(".breed-button.active")).map(
                (btn) => btn.dataset.breed
            );

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
                alert(
                    `Show saved successfully!\nCategory: ${category}\nTable: ${table}\nBreeds: ${selectedBreeds.join(", ")}`
                );
            } catch (error) {
                console.error("Error saving show:", error);
                alert("An error occurred while saving the show. Please try again.");
            }
        });
    }

    // Begin Show: Redirect to the lineup page
    if (beginShowButton) {
        beginShowButton.addEventListener("click", () => {
            window.location.href = "lineup.html";
        });
    }
});
