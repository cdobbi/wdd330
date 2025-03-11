document.addEventListener("DOMContentLoaded", () => {
  const showSelector = document.getElementById("show");
  const lineup = document.getElementById("lineup");
  const saveButton = document.getElementById("save-lineup");

  fetch("data.json") // Ensure this path matches your JSON file location
    .then((response) => response.json())
    .then((data) => {
      showSelector.addEventListener("change", () => {
        const selectedShow = showSelector.value;
        displayEntries(data.shows.find((show) => show.name === selectedShow));
      });

      // Display default show (Show A)
      displayEntries(data.shows.find((show) => show.name === "Show A"));

        saveButton.addEventListener("click", () => {
            const selectedShow = showSelector.value;
            const show = data.shows.find((show) => show.name === selectedShow);
            show.entries.forEach((entry) => {
                entry.selected = document.getElementById(entry.breedClass).checked;
            });
            console.log(data);
            // You can save the updated data to a server or local storage here
            alert("Lineup saved successfully!");
        });
    });

  function displayEntries(show) {
    lineup.innerHTML = ""; // Clear previous entries
    show.entries.forEach((entry) => {
      const entryDiv = document.createElement("div");
      entryDiv.className = "entry col-md-4";

      const label = document.createElement("label");
      label.textContent = entry.breedClass;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = entry.breedClass;
      checkbox.checked = entry.selected;

      entryDiv.appendChild(label);
      entryDiv.appendChild(checkbox);
      lineup.appendChild(entryDiv);
    });
  }
});
