// organizer.js
let lineups = JSON.parse(localStorage.getItem('lineups')) || [];

document.getElementById('randomizeBtn').addEventListener('click', () => {
  const breeds = Array.from(document.getElementById('breeds').options)
    .map(option => option.value);
  const randomizedBreeds = breeds.sort(() => Math.random() - 0.5); // Shuffle breeds
  alert('Randomized Lineup: ' + randomizedBreeds.join(', '));
});

document.getElementById('saveLineupBtn').addEventListener('click', () => {
  const category = document.getElementById('category').value;
  const table = document.getElementById('table').value;
  const breeds = Array.from(document.getElementById('breeds').selectedOptions)
    .map(option => option.value);
  
  const lineup = { category, table, breeds };
  lineups.push(lineup);
  localStorage.setItem('lineups', JSON.stringify(lineups));
  
  const alert = document.getElementById('alert');
  alert.textContent = "Lineup saved successfully!";
  alert.classList.remove('d-none'); // Show the alert
  setTimeout(() => alert.classList.add('d-none'), 3000); // Hide it after 3 seconds
});

document.getElementById('showLineupsBtn').addEventListener('click', () => {
  window.location.href = 'lineup.html'; // Redirect to lineup page
});
