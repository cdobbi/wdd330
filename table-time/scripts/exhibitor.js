// exhibitor.js
let savedBreeds = [];

document.getElementById('saveBreedsBtn').addEventListener('click', () => {
  const breeds = Array.from(document.getElementById('breedSelect').selectedOptions)
    .map(option => option.value);
  if (breeds.length > 0) {
    savedBreeds = breeds;
    const saveAlert = document.getElementById('saveAlert');
    saveAlert.classList.remove('d-none'); // Show alert
    setTimeout(() => saveAlert.classList.add('d-none'), 3000); // Hide after 3 seconds
  } else {
    alert("Please select at least one breed.");
  }
});

document.getElementById('startAppBtn').addEventListener('click', () => {
  if (savedBreeds.length > 0) {
    alert("Application started. You'll be notified when it's your turn!");
  } else {
    alert("Please save your breeds first!");
  }
});

// Simulating alert from Organizer (This would typically be done with a server)
function triggerExhibitorAlert(breed) {
  if (savedBreeds.includes(breed)) {
    document.getElementById('alertBreed').textContent = breed;
    $('#alertModal').modal('show'); // Show Bootstrap modal
    // Play alert sound (Example: alert.mp3 in assets/sounds/)
    const alertSound = new Audio('assets/sounds/alert.mp3');
    alertSound.play();
  }
}
