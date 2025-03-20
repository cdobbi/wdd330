// index.js
document.getElementById('organizerBtn').addEventListener('click', () => {
    $('#organizerModal').modal('show'); // Open modal using Bootstrap
  });
  
  document.getElementById('proceedBtn').addEventListener('click', () => {
    const key = document.getElementById('organizerKey').value;
    if (key === "Mad Hatter") {
      window.location.href = "organizer.html"; // Redirect to Organizer page
    } else {
      alert("Invalid Key!");
    }
  });
  
  document.getElementById('exhibitorBtn').addEventListener('click', () => {
    window.location.href = "exhibitor.html"; // Redirect to Exhibitor page
  });
  