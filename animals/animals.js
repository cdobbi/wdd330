const apiUrl = "http://localhost:3000/api/animals"; // Backend server URL

// Fetch and display animals when the page loads
document.addEventListener("DOMContentLoaded", fetchAndDisplayAnimals);

async function fetchAndDisplayAnimals() {
    console.log("DOM fully loaded. Starting fetchAndDisplayAnimals..."); // Debug log
    const errorMessage = document.getElementById('error-message');
    console.log("Error message element:", errorMessage); // Debug log

    try {
        console.log("Fetching data from API:", apiUrl); // Debug log
        const response = await fetch(apiUrl);
        console.log("API response received:", response); // Debug log

        if (!response.ok) {
            console.error("API request failed with status:", response.status); // Debug log
            throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const animals = await response.json();
        console.log("Fetched Animals:", animals); // Debug log

        if (!animals || !Array.isArray(animals) || animals.length === 0) {
            console.error("No animals found in the API response."); // Debug log
            throw new Error('No animals found in the API.');
        }

        console.log("Calling displayAnimalCards with animals:", animals); // Debug log
        displayAnimalCards(animals);
    } catch (error) {
        console.error("Error occurred in fetchAndDisplayAnimals:", error); // Debug log
        errorMessage.classList.remove('d-none'); // Show error message
        errorMessage.textContent = error.message;
    }
}

function displayAnimalCards(animals) {
    console.log("Starting displayAnimalCards..."); // Debug log
    const container = document.getElementById('animal-cards-container');
    console.log("Animal Cards Container:", container); // Debug log

    if (!container) {
        console.error("Animal cards container not found in the DOM."); // Debug log
        return;
    }

    container.innerHTML = ""; // Clear any existing content
    console.log("Cleared existing content in the container."); // Debug log

    animals.forEach((animal, index) => {
        console.log(`Processing animal at index ${index}:`, animal); // Debug log
        const card = document.createElement('div');
        card.className = "col-md-4"; // Bootstrap grid column for responsive layout

        card.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${animal.Animal || "Unknown Animal"}</h5>
                    <p class="card-text"><strong>Habitat:</strong> ${animal.Habitat || "Unknown"}</p>
                    <p class="card-text"><strong>Lifespan:</strong> ${animal["Lifespan (years)"] || "Unknown"} years</p>
                    <p class="card-text"><strong>Diet:</strong> ${animal.Diet || "Unknown"}</p>
                    <p class="card-text"><strong>Top Speed:</strong> ${animal["Top Speed (km/h)"] || "Unknown"} km/h</p>
                </div>
            </div>
        `;

        console.log("Generated card HTML:", card.innerHTML); // Debug log
        container.appendChild(card);
        console.log("Appended card to container."); // Debug log
    });

    console.log("Finished displayAnimalCards."); // Debug log
}