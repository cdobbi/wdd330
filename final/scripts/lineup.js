document.addEventListener("DOMContentLoaded", function () {
    const saveLineupButton = document.getElementById("save-lineup");
    const printLineupButton = document.getElementById("print-lineup");
    const clearLineupButton = document.getElementById("clear-lineup");
    const finishedButton = document.getElementById("finished");
  
    let showLineups = JSON.parse(localStorage.getItem("showLineups")) || {};
  
    // Save Lineup
    saveLineupButton.addEventListener("click", function () {
      const selectedBreeds = Array.from(
        document.querySelectorAll("#breed-options input[type=checkbox]:checked")
      ).map((checkbox) => checkbox.value);
  
      const selectedCategory = document.getElementById("category").value;
      const selectedShow = document.getElementById("show").value;
  
      if (!selectedCategory || !selectedShow || selectedBreeds.length === 0) {
        alert("Please select a category, show, and at least one breed.");
        return;
      }
  
      if (!showLineups[selectedCategory]) {
        showLineups[selectedCategory] = {};
      }
  
      showLineups[selectedCategory][selectedShow] = {
        category: selectedCategory,
        breeds: selectedBreeds,
      };
  
      localStorage.setItem("showLineups", JSON.stringify(showLineups));
      alert(
        `Lineup for Show ${selectedShow} in ${selectedCategory} category saved.`
      );
    });
  
    // Print Lineups
    printLineupButton.addEventListener("click", function () {
      const lineupData = Object.keys(showLineups)
        .map((category) =>
          Object.keys(showLineups[category])
            .map((show) => {
              const lineup = showLineups[category][show];
              return `Category: ${category}\nShow: ${show}\nBreeds:\n${lineup.breeds
                .map((breed, index) => `${index + 1}. ${breed}`)
                .join("\n")}`;
            })
            .join("\n\n")
        )
        .join("\n\n");
  
      const newWindow = window.open("", "", "width=600,height=400");
      newWindow.document.write(`<pre>${lineupData}</pre>`);
      newWindow.print();
      newWindow.close();
    });
  
    // Clear Lineups
    clearLineupButton.addEventListener("click", function () {
      showLineups = {};
      localStorage.removeItem("showLineups");
      alert("All lineups cleared.");
    });
  
    // Finished Button
    finishedButton.addEventListener("click", function () {
      localStorage.setItem("showLineups", JSON.stringify(showLineups));
      alert("All lineups saved. Redirecting to lineup page.");
      window.location.href = "lineup.html";
    });
  });