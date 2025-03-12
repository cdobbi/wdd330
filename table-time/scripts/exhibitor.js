document.addEventListener("DOMContentLoaded", function () {
  const breedOptionsContainer = document.getElementById("breed-options");
  const saveEntriesButton = document.getElementById("save-entries");

  // Fetch the data from the JSON file
  fetch("data/data.json")
    .then((response) => response.json())
    .then((data) => {
      // Populate breed options
      function populateBreedOptions() {
        // Clear existing breed options
        breedOptionsContainer.innerHTML = "";

        // Filter and display breeds
        data.entries.forEach((entry) => {
          const breedOption = document.createElement("div");
          breedOption.className = "form-check form-check-inline";

          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.className = "form-check-input";
          checkbox.id = entry.breed;
          checkbox.value = entry.breed;

          const label = document.createElement("label");
          label.className = "form-check-label";
          label.htmlFor = entry.breed;
          label.textContent = entry.breed;

          breedOption.appendChild(checkbox);
          breedOption.appendChild(label);
          breedOptionsContainer.appendChild(breedOption);
        });
      }

      // Initial population of breed options
      populateBreedOptions();
    })
    .catch((error) => console.error("Error fetching data:", error));

  // Event listener for the "Start Application" button
  saveEntriesButton.addEventListener("click", function () {
    const selectedBreeds = [];
    const checkboxes = breedOptionsContainer.querySelectorAll(
      "input[type=checkbox]"
    );
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selectedBreeds.push(checkbox.value);
      }
    });

    const entries = {
      breeds: selectedBreeds,
    };

    // Save entries to localStorage
    localStorage.setItem("exhibitorEntries", JSON.stringify(entries));

    // Show alert box
    alert(
      "Your entries have been saved and the application has started. You will be notified when you need to bring a rabbit to the judge's table."
    );
  });
});
