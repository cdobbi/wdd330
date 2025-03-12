document.addEventListener("DOMContentLoaded", function () {
  const showSelect = document.getElementById("show");
  const lineupDiv = document.getElementById("lineup");

  // Fetch the data from the JSON file
  fetch("data/data.json")
    .then((response) => response.json())
    .then((data) => {
      // Populate the lineup based on the selected show
      showSelect.addEventListener("change", function () {
        const selectedShow = showSelect.value;
        const showData = data.shows.find((show) => show.name === selectedShow);

        // Clear the current lineup
        lineupDiv.innerHTML = "";

        if (showData) {
          showData.entries.forEach((entry) => {
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
            input.value = entry.breedClass;
            input.id = entry.breedClass.toLowerCase().replace(/ /g, "-");

            const label = document.createElement("label");
            label.className = "form-check-label";
            label.htmlFor = input.id;
            label.textContent = entry.breedClass;

            formCheckDiv.appendChild(input);
            formCheckDiv.appendChild(label);
            cardBodyDiv.appendChild(formCheckDiv);

            cardDiv.appendChild(cardBodyDiv);
            colDiv.appendChild(cardDiv);
            lineupDiv.appendChild(colDiv);
          });
        }
      });

      // Trigger change event to load initial show entries
      showSelect.dispatchEvent(new Event("change"));
    })
    .catch((error) => console.error("Error fetching show data:", error));
});
