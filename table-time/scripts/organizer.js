document.addEventListener("DOMContentLoaded", function () {
  const categorySelect = document.getElementById("category");
  const showSelect = document.getElementById("show");
  const breedOptionsContainer = document.getElementById("breed-options");

  // Fetch the data from the JSON file
  fetch("data/data.json")
    .then((response) => response.json())
    .then((data) => {
      // Populate breed options based on selected category and show
      function populateBreedOptions() {
        const selectedCategory = categorySelect.value;
        const selectedShow = showSelect.value;

        // Retain the current state of checkboxes
        const currentBreeds = {};
        const checkboxes = breedOptionsContainer.querySelectorAll(
          "input[type=checkbox]"
        );
        checkboxes.forEach((checkbox) => {
          currentBreeds[checkbox.id] = checkbox.checked;
        });

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

          // Retain the checkbox state
          if (currentBreeds[checkbox.id]) {
            checkbox.checked = true;
          }

          const label = document.createElement("label");
          label.className = "form-check-label";
          label.htmlFor = entry.breed;
          label.textContent = entry.breed;

          breedOption.appendChild(checkbox);
          breedOption.appendChild(label);
          breedOptionsContainer.appendChild(breedOption);
        });
      }

      // Event listeners for category and show selection
      categorySelect.addEventListener("change", populateBreedOptions);
      showSelect.addEventListener("change", populateBreedOptions);

      // Initial population of breed options
      populateBreedOptions();
    })
    .catch((error) => console.error("Error fetching data:", error));
  // Add this event listener to each checkbox
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      localStorage.setItem("currentBreed", entry.breed);
    }
  });
});
