// lineup.js
const lineups = JSON.parse(localStorage.getItem('lineups')) || [];
const breedList = document.getElementById('breedList');
const dropZone = document.getElementById('dropZone');

// Populate the breed list dynamically
const populateBreeds = () => {
  breedList.innerHTML = ''; // Clear existing breeds
  lineups.forEach(lineup => {
    lineup.breeds.forEach(breed => {
      const li = document.createElement('li');
      li.className = 'list-group-item draggable';
      li.textContent = breed;
      li.setAttribute('draggable', true);
      breedList.appendChild(li);
    });
  });

  setUpDragEvents();
};

// Set up drag-and-drop events
const setUpDragEvents = () => {
  const draggables = document.querySelectorAll('.draggable');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', e.target.textContent);
    });
  });

  dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.classList.add('bg-success', 'text-white'); // Visual feedback
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('bg-success', 'text-white');
  });

  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('bg-success', 'text-white');

    const breed = e.dataTransfer.getData('text/plain');
    triggerExhibitorAlert(breed); // Simulate sending alert to exhibitor
  });
};

// Simulate sending an alert to the exhibitor
const triggerExhibitorAlert = breed => {
  alert(`Alert sent: It's time for ${breed} to go to the judges' table!`);
  // Play alert sound (ensure the file path is correct)
  const alertSound = new Audio('assets/sounds/alert.mp3');
  alertSound.play();
};

// Modify lineups
document.getElementById('modifyLineupBtn').addEventListener('click', () => {
  window.location.href = 'organizer.html'; // Redirect to organizer page
});

// Print lineups
document.getElementById('printLineupBtn').addEventListener('click', () => {
  window.print(); // Prints the page
});

// Begin show
document.getElementById('beginShowBtn').addEventListener('click', () => {
  alert('The rabbit show is starting! Good luck to all exhibitors!');
});

// Initial population of breeds
populateBreeds();
