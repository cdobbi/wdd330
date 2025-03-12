document.addEventListener("DOMContentLoaded", function () {
  const publishDateElement = document.getElementById("publish-date");
  const now = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  publishDateElement.textContent = now.toLocaleDateString("en-US", options);

  // Fetch lineup data from localStorage or a JSON file
  const lineupContainer = document.getElementById("lineup-container");
  const lineupData = JSON.parse(localStorage.getItem("lineupData")) || [];

  // Populate lineup
  lineupData.forEach((entry) => {
    const breedDiv = document.createElement("div");
    breedDiv.className = "col-md-4 mb-3";
    breedDiv.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${entry.breed}</h5>
                    <button class="btn btn-primary alert-button">Send Alert</button>
                </div>
            </div>
        `;
    lineupContainer.appendChild(breedDiv);

    // Add event listener to the alert button
    breedDiv
      .querySelector(".alert-button")
      .addEventListener("click", function () {
        alert(`Alert sent to exhibitors for breed: ${entry.breed}`);
      });
  });
});
