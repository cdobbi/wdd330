document.addEventListener("DOMContentLoaded", function () {
  const nextButton = document.getElementById("next");
  const finishedButton = document.getElementById("finished");
  const printLineupButton = document.getElementById("print-lineup");
  const clearLineupButton = document.getElementById("clear-lineup");
  const categorySelect = document.getElementById("category");
  const showSelect = document.getElementById("show");
  const breedOptionsContainer = document.getElementById("breed-options");

  let selectedBreeds = [];
  let showLineups = {};

  // Function to update the selected breeds array
  function updateSelectedBreeds(breed, isChecked) {
    if (isChecked) {
      selectedBreeds.push(breed);
    } else {
      selectedBreeds = selectedBreeds.filter((b) => b !== breed);
    }
  }

  // Event listener for breed checkboxes
  breedOptionsContainer.addEventListener("change", function (event) {
    if (event.target.type === "checkbox") {
      updateSelectedBreeds(event.target.value, event.target.checked);
    }
  });

  // Save the lineup for the current show and move to the next show
  nextButton.addEventListener("click", function () {
    const selectedCategory = categorySelect.value;
    const selectedShow = showSelect.value;

    // Initialize the category in showLineups if it doesn't exist
    if (!showLineups[selectedCategory]) {
      showLineups[selectedCategory] = {};
    }

    // Save the lineup for the selected show under the selected category
    showLineups[selectedCategory][selectedShow] = {
      category: selectedCategory,
      breeds: [...selectedBreeds],
    };

    // Clear the selected breeds for the next show
    selectedBreeds = [];
    const checkboxes = breedOptionsContainer.querySelectorAll(
      "input[type=checkbox]"
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    alert(
      `Lineup for Show ${selectedShow} in ${selectedCategory} category saved. You can now select the next show.`
    );
  });

  // Save all lineups to localStorage and clear the lineups
  finishedButton.addEventListener("click", function () {
    localStorage.setItem("showLineups", JSON.stringify(showLineups));

    // Clear the lineups after saving
    showLineups = {};
    alert("All lineups saved and cleared. Redirecting to lineup page.");
    window.location.href = "lineup.html"; // Redirect to the lineup page
  });

  // Print all lineups and clear the lineups
  printLineupButton.addEventListener("click", function () {
    const lineupData = Object.keys(showLineups)
      .map((category) => {
        return Object.keys(showLineups[category])
          .map((show) => {
            const lineup = showLineups[category][show];
            return `Category: ${category}\nShow: ${show}\nBreeds:\n${lineup.breeds
              .map((breed, index) => `${index + 1}. ${breed}`)
              .join("\n")}`;
          })
          .join("\n\n");
      })
      .join("\n\n");

    const newWindow = window.open("", "", "width=600,height=400");
    newWindow.document.write(`<pre>${lineupData}</pre>`);
    newWindow.print();
    newWindow.close();

    // Clear the lineups after printing
    showLineups = {};
    alert("All lineups printed and cleared.");
  });

  // Clear lineup and reset selections
  clearLineupButton.addEventListener("click", function () {
    selectedBreeds = [];
    showLineups = {};
    const checkboxes = breedOptionsContainer.querySelectorAll(
      "input[type=checkbox]"
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    alert("All lineups cleared.");
  });
});
