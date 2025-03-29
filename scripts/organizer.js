document.addEventListener("DOMContentLoaded", function () {
    // --- Top-level elements ---
    const saveShowButton = document.getElementById("save-show");
    const beginShowButton = document.getElementById("begin-show");
    const rabbitList = document.getElementById("rabbit-list");

    // --- Fetch and Render Rabbit Breed Buttons ---
    fetch("data/data.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch rabbit breeds.");
            }
            return response.json();
        })
        .then((data) => {
            const entries = data.entries; // Access the "entries" key
            rabbitList.innerHTML = ""; // Clear any placeholder text

            // Populate the rabbit list dynamically as buttons using Bootstrap styling
            entries.forEach((entry) => {
                const button = document.createElement("button");
                // Use Bootstrap's button classes and spacing utilities.
                button.className = "btn btn-outline-secondary btn-sm mx-1 my-1 breed-button";
                button.dataset.breed = entry.breed;
                button.textContent = entry.breed;
                // Toggle selection on click by toggling the "active" class
                button.addEventListener("click", function () {
                    this.classList.toggle("active");
                    console.log(
                        `Breed ${this.dataset.breed} is now ${this.classList.contains("active") ? "selected" : "deselected"}.`
                    );
                });
                rabbitList.appendChild(button);
            });
        })
        .catch((error) => {
            console.error("Error fetching rabbit breeds:", error);
            rabbitList.innerHTML = "<div class='text-danger'>Failed to load rabbit breeds.</div>";
        });

    // --- Bottom Action Buttons Functionality ---
    const saveLineupButton = document.getElementById("save-lineup");
    const printLineupButton = document.getElementById("print-lineup");
    const clearLineupButton = document.getElementById("clear-lineup");
    const finishedButton = document.getElementById("finished");

    // Save Lineup: Collect selected breeds and other info, then save and alert details.
    if (saveLineupButton) {
        saveLineupButton.addEventListener("click", () => {
            // Assuming your page has select elements with IDs "category" and "show"
            const categoryEl = document.getElementById("category");
            const showEl = document.getElementById("show");
            const category = categoryEl ? categoryEl.value : "Unknown";
            const show = showEl ? showEl.value : "Unknown";

            // Gather selected breeds from buttons that have the "active" class.
            const selectedBreeds = Array.from(document.querySelectorAll(".breed-button.active")).map(
                (btn) => btn.dataset.breed
            );

            if (!category || !show || selectedBreeds.length === 0) {
                alert("Please select a category, show, and at least one breed.");
                return;
            }
            
            // Optionally, save this lineup into localStorage so it can be used on lineup.html
            let savedLineups = JSON.parse(localStorage.getItem("showLineups")) || [];
            const lineup = { category, show, breeds: selectedBreeds };
            savedLineups.push(lineup);
            localStorage.setItem("showLineups", JSON.stringify(savedLineups));

            alert(`Lineup saved!\nCategory: ${category}\nShow: ${show}\nBreeds: ${selectedBreeds.join(
                ", "
            )}\n\nChoose your next lineup or click Finished/Print.`);

            // Clear the current selections for a fresh start.
            document.querySelectorAll(".breed-button.active").forEach((btn) => btn.classList.remove("active"));
        });
    }

    // Print Lineup: Trigger the browser's print dialog.
    if (printLineupButton) {
        printLineupButton.addEventListener("click", () => {
            window.print();
        });
    }

    // Clear Lineup: Remove the active state from all selected breed buttons.
    if (clearLineupButton) {
        clearLineupButton.addEventListener("click", () => {
            document.querySelectorAll(".breed-button.active").forEach((btn) => btn.classList.remove("active"));
            alert("Lineup cleared.");
        });
    }

    // Finished: Redirect to lineup.html where all saved lineups will be displayed.
    if (finishedButton) {
        finishedButton.addEventListener("click", () => {
            window.location.href = "lineup.html";
        });
    }

    // --- Existing Save Show and Begin Show Functionality (if still needed) ---
    // These might be used for a different submission process.
    if (saveShowButton) {
        saveShowButton.addEventListener("click", async () => {
            const category = document.getElementById("category").value;
            const table = document.getElementById("table").value;
            // Get selected breeds as those buttons that have the "active" class.
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
                console.log("Response data:", data);
                alert(`Show saved successfully!\nCategory: ${category}\nTable: ${table}\nBreeds: ${selectedBreeds.join(", ")}`);
                
            } catch (error) {
                console.error("Error saving show:", error);
                alert("An error occurred while saving the show. Please try again.");
            }
        });
    }

    if (beginShowButton) {
        beginShowButton.addEventListener("click", () => {
            window.location.href = "lineup.html";
        });
    }
});
