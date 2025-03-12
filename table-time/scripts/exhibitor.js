document.addEventListener("DOMContentLoaded", function () {
  const checkboxContainer = document.getElementById("checkbox-container");

  // Fetch the data from the JSON file
  fetch("data/data.json")
    .then((response) => response.json())
    .then((data) => {
      data.breeds.forEach((breed) => {
        const colDiv = document.createElement("div");
        colDiv.className = "col-md-6 mb-3";

        const cardDiv = document.createElement("div");
        cardDiv.className = "card";

        const cardBodyDiv = document.createElement("div");
        cardBodyDiv.className = "card-body";

        const formCheckDiv = document.createElement("div");
        formCheckDiv.className = "form-check";

        const input = document.createElement("input");
        input.className = "form-check-input";
        input.type = "checkbox";
        input.value = breed;
        input.id = breed.toLowerCase().replace(/ /g, "-");

        const label = document.createElement("label");
        label.className = "form-check-label";
        label.htmlFor = input.id;
        label.textContent = breed;

        formCheckDiv.appendChild(input);
        formCheckDiv.appendChild(label);
        cardBodyDiv.appendChild(formCheckDiv);

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
