// URL and options for the Animals API
// const url = 'https://animals7.p.rapidapi.com/api/animals?animal=Tiger';
// const options = {
//     method: 'GET',
//     headers: {
//         'x-rapidapi-key': '53a3ecce41mshc77b38129830b7cp178931jsne7d280cb9f34', // Replace with your own key
//         'x-rapidapi-host': 'animals7.p.rapidapi.com'
//     }
// };

async function fetchAnimal(animal) {
    const response = await fetch("animals.json");

    // Validate response
    if (!response.ok) {
        throw new Error("Error fetching data");
    }

    const data = await response.json();

    // Ensure data is an array
    if (!Array.isArray(data)) {
        throw new Error("Data is not an array");
    }

    // Search for the animal (case-insensitive, trimmed)
    const result = data.find(a => a.Animal.toLowerCase().trim() === animal.toLowerCase().trim());
    if (!result) {
        alert("Animal not found. Please check your spelling or try another animal.");
        throw new Error("Animal not found");
    }

    return result;
}


// Debugging: Example of data logging
console.log("Data successfully fetched");

// Add event listener for the "Search" button
document.getElementById("fetch-animal").addEventListener("click", async () => {
    console.log("Search button clicked!"); // Debugging
    const animalName = document.getElementById("animal-input").value; // Get input value
    console.log(`Animal entered: ${animalName}`); // Debugging user input
    const animalCard = document.getElementById("animal-info");
    const errorMessage = document.getElementById("error-message");

    // Hide previous results or errors
    animalCard.classList.add("d-none");
    errorMessage.classList.add("d-none");

    try {
        // Fetch the animal data
        const data = await fetchAnimal(animalName);
        console.log("Fetched data: ", data); // Debugging fetched data

        // Populate animal details into the card
        document.getElementById("animal-name").innerText = data.Animal;
        document.getElementById("animal-details").innerText = `
            Average Speed: ${data["Average Speed (km/h)"]}
            Color: ${data.Color}
            Conservation Status: ${data["Conservation Status"]}
            Habitat: ${data.Habitat}
            Diet: ${data.Diet}
            Lifespan: ${data["Lifespan (years)"]}
            Social Structure: ${data["Social Structure"]}
        `;
        animalCard.classList.remove("d-none"); // Show the card with animal details
    } catch (error) {
        console.error(error); // Log the error for debugging
        errorMessage.classList.remove("d-none"); // Show error message on the UI
    }
});
