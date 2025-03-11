document.addEventListener("DOMContentLoaded", function () {
    const formGroup = document.querySelector("#exhibitor-form .form-group");
  
    // Fetch the data from the JSON file
    fetch("breeds.json")
      .then((response) => response.json())
      .then((breedsData) => {
        breedsData.breeds.forEach((breed) => {
          breed.categories.forEach((category) => {
            const div = document.createElement("div");
            div.className = "form-check";
  
            const input = document.createElement("input");
            input.className = "form-check-input";
            input.type = "checkbox";
            input.value = `${breed.name}/${category}`;
            input.id = `${breed.name.toLowerCase()}-${category.toLowerCase()}`;
  
            const label = document.createElement("label");
            label.className = "form-check-label";
            label.htmlFor = input.id;
            label.textContent = `${breed.name}/${category}`;
  
            div.appendChild(input);
            div.appendChild(label);
            formGroup.appendChild(div);
          });
        });
      })
      .catch((error) => console.error("Error fetching breeds data:", error));
  
    const saveEntriesButton = document.getElementById("save-entries");
  
    saveEntriesButton.addEventListener("click", function () {
      const selectedEntries = [];
      const checkboxes = document.querySelectorAll(
        "#exhibitor-form .form-check-input"
      );
  
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          selectedEntries.push(checkbox.value);
        }
      });
  
      // Logic to save entries
      console.log("Selected Entries:", selectedEntries);
      alert("Entries saved successfully!");
    });
  });