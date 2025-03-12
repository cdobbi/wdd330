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
  
      // Save the lineup for the selected show
      showLineups[selectedShow] = {
        category: selectedCategory,
        breeds: [...selectedBreeds]
      };
  
      // Clear the selected breeds for the next show
      selectedBreeds = [];
      const checkboxes = breedOptionsContainer.querySelectorAll("input[type=checkbox]");
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
  
      alert(`Lineup for Show ${selectedShow} saved. You can now select the next show.`);
    });
  
    // Save all lineups to a text file and clear the lineups
    finishedButton.addEventListener("click", function () {
      const lineupData = Object.keys(showLineups).map(show => {
        const lineup = showLineups[show];
        return `Show: ${show}\nCategory: ${lineup.category}\nBreeds:\n${lineup.breeds
          .map((breed, index) => `${index + 1}. ${breed}`)
          .join("\n")}`;
      }).join("\n\n");
  
      const blob = new Blob([lineupData], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "lineup.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  
      // Clear the lineups after saving
      showLineups = {};
      alert("All lineups saved and cleared.");
    });
  
    // Print all lineups and clear the lineups
    printLineupButton.addEventListener("click", function () {
      const lineupData = Object.keys(showLineups).map(show => {
        const lineup = showLineups[show];
        return `Show: ${show}\nCategory: ${lineup.category}\nBreeds:\n${lineup.breeds
          .map((breed, index) => `${index + 1}. ${breed}`)
          .join("\n")}`;
      }).join("\n\n");
  
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
      const checkboxes = breedOptionsContainer.querySelectorAll("input[type=checkbox]");
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
      alert("All lineups cleared.");
    });
  });