document.addEventListener("DOMContentLoaded", function () {
    const saveLineupButton = document.getElementById("save-lineup");
    const printLineupButton = document.getElementById("print-lineup");
    const clearLineupButton = document.getElementById("clear-lineup"); // Ensure this line is present
    const categorySelect = document.getElementById("category");
    const showSelect = document.getElementById("show");
    const breedOptionsContainer = document.getElementById("breed-options");
  
    let selectedBreeds = [];
  
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
  
    // Save lineup to a text file
    saveLineupButton.addEventListener("click", function () {
      const selectedCategory = categorySelect.value;
      const selectedShow = showSelect.value;
  
      const lineupData = `Category: ${selectedCategory}\nShow: ${selectedShow}\nBreeds:\n${selectedBreeds
        .map((breed, index) => `${index + 1}. ${breed}`)
        .join("\n")}`;
  
      const blob = new Blob([lineupData], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "lineup.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  
    // Print lineup
    printLineupButton.addEventListener("click", function () {
      const selectedCategory = categorySelect.value;
      const selectedShow = showSelect.value;
  
      const lineupData = `Category: ${selectedCategory}\nShow: ${selectedShow}\nBreeds:\n${selectedBreeds
        .map((breed, index) => `${index + 1}. ${breed}`)
        .join("\n")}`;
  
      const newWindow = window.open("", "", "width=600,height=400");
      newWindow.document.write(`<pre>${lineupData}</pre>`);
      newWindow.print();
      newWindow.close();
    });
  
    // Clear lineup and reset selections
    clearLineupButton.addEventListener("click", function () {
      selectedBreeds = [];
      const checkboxes = breedOptionsContainer.querySelectorAll("input[type=checkbox]");
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    });
  });