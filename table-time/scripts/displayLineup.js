document.addEventListener("DOMContentLoaded", function () {
  const lineupContainer = document.getElementById("lineup-container");
  const nextBreedButton = document.getElementById("next-breed");

  // Retrieve the lineup data from localStorage
  const showLineups = JSON.parse(localStorage.getItem("showLineups")) || {};

  // Function to display the lineup
  function displayLineup() {
    lineupContainer.innerHTML = "";
    Object.keys(showLineups).forEach((show) => {
      const lineup = showLineups[show];
      const showDiv = document.createElement("div");
      showDiv.classList.add("col-12", "mb-4");

      const showTitle = document.createElement("h3");
      showTitle.textContent = `Show: ${show} - Category: ${lineup.category}`;
      showDiv.appendChild(showTitle);

      const breedList = document.createElement("ul");
      lineup.breeds.forEach((breed, index) => {
        const breedItem = document.createElement("li");
        breedItem.classList.add("form-check");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("form-check-input");
        checkbox.id = `breed-${show}-${index}`;

        const label = document.createElement("label");
        label.classList.add("form-check-label");
        label.htmlFor = checkbox.id;
        label.textContent = breed;

        breedItem.appendChild(checkbox);
        breedItem.appendChild(label);
        breedList.appendChild(breedItem);
      });

      showDiv.appendChild(breedList);
      lineupContainer.appendChild(showDiv);
    });
  }

  // Display the lineup on page load
  displayLineup();

  // Event listener for the "Next Breed" button
  nextBreedButton.addEventListener("click", function () {
    // Logic for handling the next breed action
    alert("Next breed action triggered.");
  });
});
