const apiUrl = "http://localhost:3000/api/animals"; // Backend server URL

// Add event listener for the Search button
document.getElementById('fetch-animal').addEventListener('click', handleSearch);

// Add event listener for the Enter key
document.getElementById('animal-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission behavior
        handleSearch();
    }
});

async function handleSearch() {
    const input = document.getElementById('animal-input').value.trim().toLowerCase();
    if (!input) {
        alert('Please enter an animal name!');
        return;
    }

    try {
        // Fetch data from the backend server
        const response = await fetch(`${apiUrl}?animal=${input}`);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Animal not found in the API. Please try a different animal.');
            }
            throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const data = await response.json();
        if (!data || data.length === 0) {
            throw new Error('Animal not found in the API.');
        }

        // Display the animal data
        displayAnimalData(data[0]); // Assuming the API returns an array
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('animal-info').classList.add('d-none');
        document.getElementById('error-message').classList.remove('d-none');
        document.getElementById('error-message').textContent = error.message;
    }
}

function displayAnimalData(data) {
    document.getElementById('animal-name').textContent = data.Animal || 'Unknown Animal';
    document.getElementById('animal-details').innerHTML = `
        <strong>Habitat:</strong> ${data.Habitat || 'Unknown'}<br>
        <strong>Diet:</strong> ${data.Diet || 'Unknown'}<br>
        <strong>Conservation Status:</strong> ${data['Conservation Status'] || 'Unknown'}<br>
        <strong>Average Speed:</strong> ${data['Average Speed (km/h)'] || 'Unknown'} km/h<br>
        <strong>Color:</strong> ${data.Color || 'Unknown'}<br>
        <strong>Countries Found:</strong> ${data['Countries Found'] || 'Unknown'}<br>
        <strong>Family:</strong> ${data.Family || 'Unknown'}<br>
        <strong>Gestation Period:</strong> ${data['Gestation Period (days)'] || 'Unknown'} days<br>
        <strong>Height:</strong> ${data['Height (cm)'] || 'Unknown'} cm<br>
        <strong>Lifespan:</strong> ${data['Lifespan (years)'] || 'Unknown'} years<br>
        <strong>Offspring per Birth:</strong> ${data['Offspring per Birth'] || 'Unknown'}<br>
        <strong>Predators:</strong> ${data.Predators || 'Unknown'}<br>
        <strong>Social Structure:</strong> ${data['Social Structure'] || 'Unknown'}<br>
        <strong>Top Speed:</strong> ${data['Top Speed (km/h)'] || 'Unknown'} km/h<br>
        <strong>Weight:</strong> ${data['Weight (kg)'] || 'Unknown'} kg
    `;
    document.getElementById('animal-info').classList.remove('d-none');
    document.getElementById('error-message').classList.add('d-none');
}

async function fetchSupportedAnimals() {
    try {
        const response = await fetch('http://localhost:3000/api/supported-animals'); // Example endpoint
        const animals = await response.json();
        const list = document.querySelector('#supported-animals-list');
        list.innerHTML = animals.map(animal => `<li>${animal}</li>`).join('');
    } catch (error) {
        console.error('Error fetching supported animals:', error);
    }
}

// Call the function to fetch and display supported animals
fetchSupportedAnimals();