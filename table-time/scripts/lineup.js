// lineup.js
const lineups = JSON.parse(localStorage.getItem('lineups')) || [];

// Render lineups on the page
const renderLineups = () => {
  const lineupList = document.getElementById('lineupList');
  lineupList.innerHTML = ''; // Clear previous entries

  lineups.forEach((lineup, index) => {
    const div = document.createElement('div');
    div.className = 'col-12 col-md-6 mb-4';

    const card = document.createElement('div');
    card.className = 'card shadow-sm';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = `Lineup ${index + 1}`;

    const text = document.createElement('p');
    text.className = 'card-text';
    text.innerHTML = `
      <strong>Category:</strong> ${lineup.category}<br>
      <strong>Table:</strong> ${lineup.table}<br>
      <strong>Breeds:</strong> ${lineup.breeds.join(', ')}
    `;

    cardBody.appendChild(title);
    cardBody.appendChild(text);
    card.appendChild(cardBody);
    div.appendChild(card);
    lineupList.appendChild(div);
  });
};

// Modify lineups
document.getElementById('modifyLineupBtn').addEventListener('click', () => {
  window.location.href = 'organizer.html'; // Redirect to organizer page
});

// Print lineups
document.getElementById('printLineupBtn').addEventListener('click', () => {
  window.print(); // Prints the page
});

// Begin Show
document.getElementById('beginShowBtn').addEventListener('click', () => {
  alert('The rabbit show is starting! Good luck to all exhibitors!');
});

renderLineups();
