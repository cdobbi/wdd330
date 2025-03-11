document.addEventListener("DOMContentLoaded", function () {
    const checkboxContainer = document.getElementById("checkbox-container");
  
    // Fetch the data from the JSON file
    fetch("breeds.json")
      .then((response) => response.json())
      .then((breedsData) => {
        breedsData.breeds.forEach((breed) => {
          const colDiv = document.createElement("div");
          colDiv.className = "col-md-6 mb-3";
  
          const cardDiv = document.createElement("div");
          cardDiv.className = "card";
  
          const cardBodyDiv = document.createElement("div");
          cardBodyDiv.className = "card-body";
  
          const cardTitle = document.createElement("h5");
          cardTitle.className = "card-title";
          cardTitle.textContent = breed.name;
  
          cardBodyDiv.appendChild(cardTitle);
  
          breed.categories.forEach((category) => {
            const formCheckDiv = document.createElement("div");
            formCheckDiv.className = "form-check";
  
            const input = document.createElement("input");
            input.className = "form-check-input";
            input.type = "checkbox";
            input.value = `${breed.name}/${category}`;
            input.id = `${breed.name.toLowerCase()}-${category.toLowerCase()}`;
  
            const label = document.createElement("label");
            label.className = "form-check-label";
            label.htmlFor = input.id;
            label.textContent = `${breed.name} ${category}`;
  
            formCheckDiv.appendChild(input);
            formCheckDiv.appendChild(label);
            cardBodyDiv.appendChild(formCheckDiv);
          });
  
          cardDiv.appendChild(cardBodyDiv);
          colDiv.appendChild(cardDiv);
          checkboxContainer.appendChild(colDiv);
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