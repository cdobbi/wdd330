document.addEventListener("DOMContentLoaded", function () {
    const lineupContainer = document.getElementById("lineup-container");

    // Check if lineupContainer exists
    if (!lineupContainer) {
        console.error("Error: lineup-container element not found in the DOM.");
        return;
    }

    // Retrieve the lineup data from localStorage
    const showLineups = JSON.parse(localStorage.getItem("showLineups")) || {};

    // Function to display the lineup
    function displayLineup() {
        lineupContainer.innerHTML = ""; // Clear the container

        // Iterate through categories and shows
        Object.keys(showLineups).forEach((category) => {
            Object.keys(showLineups[category]).forEach((show) => {
                const lineup = showLineups[category][show];
                const showDiv = document.createElement("div");
                showDiv.classList.add("col-12", "mb-4");

                const showTitle = document.createElement("h3");
                showTitle.textContent = `Category: ${category} - Show: ${show}`;
                showDiv.appendChild(showTitle);

                const breedList = document.createElement("ul");
                breedList.style.listStyleType = "none"; // Remove default list styling

                lineup.breeds.forEach((breed, index) => {
                    const breedItem = document.createElement("li");
                    breedItem.classList.add("form-check", "d-flex", "align-items-center", "mb-2");

                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.classList.add("form-check-input");
                    checkbox.id = `breed-${category}-${show}-${index}`;
                    checkbox.setAttribute("aria-label", `Send alert for ${breed}`);
                    // Inline style to make the checkbox larger
                    checkbox.style.width = "44px";
                    checkbox.style.height = "44px";
                    checkbox.style.marginRight = "15px";

                    // Add event listener to the checkbox
                    checkbox.addEventListener("click", async function () {
                        if (checkbox.checked) {
                            const confirmMessage = `Are you sure you want to send an alert for:\nCategory: ${category}\nShow: ${show}\nBreed: ${breed}?`;
                            if (confirm(confirmMessage)) {
                                try {
                                    const response = await fetch("showLineups", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ breed }),
                                    });
                                    const data = await response.json();
                                    alert(`Notification sent for breed: ${breed}`);
                                    console.log(`Notification sent for breed: ${breed}`);
                                } catch (error) {
                                    console.error("Error sending notification:", error);
                                    alert("An error occurred while sending the notification. Please try again.");
                                }
                            } else {
                                checkbox.checked = false; // Uncheck the checkbox if the user cancels
                            }
                        }
                    });

                    const label = document.createElement("label");
                    label.classList.add("form-check-label");
                    label.htmlFor = checkbox.id;
                    label.textContent = breed;
                    label.style.fontSize = "20px"; // Larger font for better visibility

                    breedItem.appendChild(checkbox);
                    breedItem.appendChild(label);
                    breedList.appendChild(breedItem);
                });

                showDiv.appendChild(breedList);
                lineupContainer.appendChild(showDiv);
            });
        });
    }

    // Display the lineup on page load
    displayLineup();
});
