document.addEventListener("DOMContentLoaded", function () {
    const lineupContainer = document.getElementById("lineup-container");
    if (!lineupContainer) {
        console.error("Error: lineup-container element not found in the DOM.");
        return; // Exit the script if the element is missing
    }

    const printButton = document.getElementById("print");

    // Check if localStorage is available
    if (typeof localStorage === "undefined") {
        console.error("localStorage is not available.");
        return;
    }

    // Retrieve the lineup data from localStorage
    const showLineups = JSON.parse(localStorage.getItem("showLineups")) || {};

    // Function to display the lineup
    function displayLineup() {
        lineupContainer.innerHTML = "";
        Object.keys(showLineups).forEach((category) => {
            Object.keys(showLineups[category]).forEach((show) => {
                const lineup = showLineups[category][show];
                const showDiv = document.createElement("div");
                showDiv.classList.add("col-12", "mb-4");

                const showTitle = document.createElement("h3");
                showTitle.textContent = `Category: ${category} - Show: ${show}`;
                showDiv.appendChild(showTitle);

                const breedList = document.createElement("ul");

                lineup.breeds.forEach((breed, index) => {
                    const breedItem = document.createElement("li");
                    breedItem.classList.add("form-check");

                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.classList.add("form-check-input");
                    checkbox.id = `breed-${category}-${show}-${index}`;
                    checkbox.setAttribute("aria-label", `Send alert for ${breed}`);

                    // Add event listener to the checkbox
                    checkbox.addEventListener("click", function () {
                        const confirmMessage = `Are you sure you want to send an alert for:\nCategory: ${category}\nShow: ${show}\nBreed: ${breed}?`;
                        if (confirm(confirmMessage)) {
                            alert(`Alert sent for:\nCategory: ${category}\nShow: ${show}\nBreed: ${breed}`);
                            console.log(`Notification sent for breed: ${breed}`);
                        } else {
                            checkbox.checked = false; // Uncheck the checkbox if the user cancels
                        }
                    });

                    const label = document.createElement("label");
                    label.classList.add("form-check-label");
                    label.htmlFor = checkbox.id;
                    label.textContent = breed;

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

    // Print button functionality
    printButton.addEventListener("click", function () {
        window.print();
    });
});