document.addEventListener("DOMContentLoaded", function () {
    const lineupContainer = document.getElementById("lineup-container");

    // Check if lineupContainer exists
    if (!lineupContainer) {
        console.error("Error: lineup-container element not found in the DOM.");
        return;
    }

    // Retrieve the lineup data from localStorage (flat array structure)
    const showLineups = JSON.parse(localStorage.getItem("showLineups")) || [];

    // Function to display the lineup
    function displayLineup() {
        lineupContainer.innerHTML = ""; // Clear the container

        if (showLineups.length === 0) {
            lineupContainer.innerHTML = "<p class='text-muted'>No lineups saved.</p>";
            return;
        }

        // Iterate through saved lineups and render each one
        showLineups.forEach((lineup, index) => {
            const showDiv = document.createElement("div");
            showDiv.classList.add("col-12", "mb-4");

            // Display the lineup title (category and show)
            const showTitle = document.createElement("h3");
            showTitle.textContent = `Lineup ${index + 1}: Category: ${lineup.category} - Show: ${lineup.show}`;
            showDiv.appendChild(showTitle);

            // Create a breed list
            const breedList = document.createElement("ul");
            breedList.style.listStyleType = "none";

            lineup.breeds.forEach((breed, breedIndex) => {
                const breedItem = document.createElement("li");
                breedItem.classList.add("form-check", "d-flex", "align-items-center", "mb-2");

                // Checkbox for each breed
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.classList.add("form-check-input");
                checkbox.id = `breed-${index}-${breedIndex}`;
                checkbox.style.width = "44px";
                checkbox.style.height = "44px";
                checkbox.style.marginRight = "15px";

                // Notification when checkbox is clicked
                checkbox.addEventListener("click", () => {
                    if (checkbox.checked) {
                        alert(`Take your ${breed} to the judges table. Good luck!`);
                    }
                });

                // Breed label
                const label = document.createElement("label");
                label.classList.add("form-check-label");
                label.htmlFor = checkbox.id;
                label.textContent = breed;
                label.style.fontSize = "20px";

                breedItem.appendChild(checkbox);
                breedItem.appendChild(label);
                breedList.appendChild(breedItem);
            });

            showDiv.appendChild(breedList);
            lineupContainer.appendChild(showDiv);
        });
    }

    // Display the lineup on page load
    displayLineup();
});
