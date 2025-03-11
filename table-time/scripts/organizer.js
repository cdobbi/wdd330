document.addEventListener("DOMContentLoaded", function () {
  const showSelect = document.getElementById("show");
  const lineupDiv = document.getElementById("lineup");
  const breakButton = document.getElementById("break");
  const lunchButton = document.getElementById("lunch");
  const saveLineupButton = document.getElementById("save-lineup");

  showSelect.addEventListener("change", function () {
    const selectedShow = showSelect.value;
    // Logic to load entries for the selected show
    lineupDiv.innerHTML = `<h2>${selectedShow} Entries</h2><p>List of entries for ${selectedShow} will be displayed here.</p>`;
  });

  breakButton.addEventListener("click", function () {
    // Logic to handle break
    alert("Break time!");
  });

  lunchButton.addEventListener("click", function () {
    // Logic to handle lunch
    alert("Lunch time!");
  });

  saveLineupButton.addEventListener("click", function () {
    // Logic to save lineup
    alert("Lineup saved successfully!");
  });
});
