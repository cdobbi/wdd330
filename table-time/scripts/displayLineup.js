const authKey = "YOUR_PUSHER_KEY"; // Replace with your actual Pusher key

document.addEventListener("DOMContentLoaded", function () {
  const lineupContainer = document.getElementById("lineup-container");
  const printButton = document.getElementById("print");

  // Display initial alert message
  const alertMessage = document.createElement("div");
  alertMessage.className = "alert alert-info text-center";
  alertMessage.style.position = "fixed";
  alertMessage.style.top = "50%";
  alertMessage.style.left = "50%";
  alertMessage.style.transform = "translate(-50%, -50%)";
  alertMessage.style.zIndex = "1000";
  alertMessage.innerHTML = `
    <h4 class="alert-heading">Attention Writer!</h4>
    <p>When you're ready, click on the breed that is up next to send an alert to the exhibitor. Such as, when the judge is choosing best of breed.</p>
    <button id="close-alert" class="btn btn-primary">Close</button>
  `;
  document.body.appendChild(alertMessage);

  // Close initial alert message
  document.getElementById("close-alert").addEventListener("click", function () {
    alertMessage.style.display = "none";

    // Display second alert message
    const secondAlertMessage = document.createElement("div");
    secondAlertMessage.className = "alert alert-warning text-center";
    secondAlertMessage.style.position = "fixed";
    secondAlertMessage.style.top = "50%";
    secondAlertMessage.style.left = "50%";
    secondAlertMessage.style.transform = "translate(-50%, -50%)";
    secondAlertMessage.style.zIndex = "1000";
    secondAlertMessage.innerHTML = `
      <h4 class="alert-heading">Next Step!</h4>
      <p>If you accidentally click a box, it will send an alert to the exhibitor. Do not check a box until it's time.</p>
      <button id="close-second-alert" class="btn btn-primary">Close</button>
    `;
    document.body.appendChild(secondAlertMessage);

    // Close second alert message
    document
      .getElementById("close-second-alert")
      .addEventListener("click", function () {
        secondAlertMessage.style.display = "none";
      });
  });

  // Retrieve the lineup data from localStorage
  const showLineups = JSON.parse(localStorage.getItem("showLineups")) || {};

  // Function to display the lineup
  function displayLineup() {
    lineupContainer.innerHTML = "";
    Object.keys(showLineups).forEach((category) => {
      Object.keys(showLineups[category]).forEach((show) => {
        const lineup = showLineups[category][show];
        const showDiv = document.createElement("div");
        showDiv.classList.add("col-12", "mb-4");
        const showTitle = document.createElement("h3");
        showTitle.textContent = `Category: ${category} - Show: ${show}`;
        showDiv.appendChild(showTitle);
        const breedList = document.createElement("ul");

        lineup.breeds.forEach((breed, index) => {
          const breedItem = document.createElement("li");
          breedItem.classList.add("form-check");
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.classList.add("form-check-input");
          checkbox.id = `breed-${category}-${show}-${index}`;
          // Add event listener to the checkbox
          checkbox.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent the default checkbox behavior
            checkbox.checked = true; // Check the checkbox
            const confirmMessage = `Are you sure you want to send an alert for:\nCategory: ${category}\nShow: ${show}\nBreed: ${breed}?`;
            if (confirm(confirmMessage)) {
              alert(
                `Alert sent for:\nCategory: ${category}\nShow: ${show}\nBreed: ${breed}`
              );

              // Send event to Pusher
              const eventData = {
                name: "my-event",
                channel: "my-channel",
                data: JSON.stringify({
                  message: `Take your ${breed} to the show table!`,
                }),
              };

              fetch("https://api.pusherapp.com/apps/1957068/events", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-Pusher-Key": authKey,
                  "X-Pusher-Signature": authSignature,
                  "X-Pusher-Timestamp": authTimestamp,
                  "X-Pusher-Version": authVersion,
                },
                body: JSON.stringify(eventData),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log("Event sent successfully:", data);
                })
                .catch((error) => {
                  console.error("Error sending event:", error);
                });
            } else {
              checkbox.checked = false; // Uncheck the checkbox if the user cancels
            }
          });
          const label = document.createElement("label");
          label.classList.add("form-check-label");
          label.htmlFor = checkbox.id;
          label.textContent = breed;
          breedItem.appendChild(checkbox);
          breedItem.appendChild(label);
          breedList.appendChild(breedItem);
        });
        showDiv.appendChild(breedList);
        lineupContainer.appendChild(showDiv);
      });
    });
  }

  // Display the lineup on page load
  displayLineup();

  // Print button functionality
  printButton.addEventListener("click", function () {
    window.print();
  });

  // Display publish date
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
});

// document.addEventListener("DOMContentLoaded", function () {
//   const lineupContainer = document.getElementById("lineup-container");

//   // Retrieve the lineup data from localStorage
//   const showLineups = JSON.parse(localStorage.getItem("showLineups")) || {};
//   // Function to display the lineup
//   function displayLineup() {
//     lineupContainer.innerHTML = "";
//     Object.keys(showLineups).forEach((category) => {
//       Object.keys(showLineups[category]).forEach((show) => {
//         const lineup = showLineups[category][show];
//         const showDiv = document.createElement("div");
//         showDiv.classList.add("col-12", "mb-4");
//         const showTitle = document.createElement("h3");
//         showTitle.textContent = `Category: ${category} - Show: ${show}`;
//         showDiv.appendChild(showTitle);
//         const breedList = document.createElement("ul");

//         lineup.breeds.forEach((breed, index) => {
//           const breedItem = document.createElement("li");
//           breedItem.classList.add("form-check");
//           const checkbox = document.createElement("input");
//           checkbox.type = "checkbox";
//           checkbox.classList.add("form-check-input");
//           checkbox.id = `breed-${category}-${show}-${index}`;
//           // Add event listener to the checkbox
//           // Add event listener to the checkbox
//           checkbox.addEventListener("click", function (event) {
//             event.preventDefault(); // Prevent the default checkbox behavior
//             checkbox.checked = true; // Check the checkbox
//             const confirmMessage = `Are you sure you want to send an alert for:\nCategory: ${category}\nShow: ${show}\nBreed: ${breed}?`;
//             if (confirm(confirmMessage)) {
//               alert(
//                 `Alert sent for:\nCategory: ${category}\nShow: ${show}\nBreed: ${breed}`
//               );

//               // Send event to Pusher
//               const eventData = {
//                 name: "my-event",
//                 channel: "my-channel",
//                 data: JSON.stringify({
//                   message: `Take your ${breed} to the show table!`,
//                 }),
//               };

//               fetch("https://api.pusherapp.com/apps/1957068/events", {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                   "X-Pusher-Key": authKey,
//                   "X-Pusher-Signature": authSignature,
//                   "X-Pusher-Timestamp": authTimestamp,
//                   "X-Pusher-Version": authVersion,
//                 },
//                 body: JSON.stringify(eventData),
//               })
//                 .then((response) => response.json())
//                 .then((data) => {
//                   console.log("Event sent successfully:", data);
//                 })
//                 .catch((error) => {
//                   console.error("Error sending event:", error);
//                 });
//             } else {
//               checkbox.checked = false; // Uncheck the checkbox if the user cancels
//             }
//           });
//           const label = document.createElement("label");
//           label.classList.add("form-check-label");
//           label.htmlFor = checkbox.id;
//           label.textContent = breed;
//           breedItem.appendChild(checkbox);
//           breedItem.appendChild(label);
//           breedList.appendChild(breedItem);
//         });
//         showDiv.appendChild(breedList);
//         lineupContainer.appendChild(showDiv);
//       });
//     });
//   }
//   // Display the lineup on page load
//   displayLineup();
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const printButton = document.getElementById("print");

//   // Display alert message
//   const alertMessage = document.createElement("div");
//   alertMessage.className = "alert alert-info text-center";
//   alertMessage.style.position = "fixed";
//   alertMessage.style.top = "50%";
//   alertMessage.style.left = "50%";
//   alertMessage.style.transform = "translate(-50%, -50%)";
//   alertMessage.style.zIndex = "1000";
//   alertMessage.innerHTML = `
//         <h4 class="alert-heading">Attention Writer!</h4>
//         <p>When you're ready, click on the breed that is up next to send an alert to the exhibitor. Such as, when the judge is choosing best of breed.</p>
//         <button id="close-alert" class="btn btn-primary">Close</button>
//     `;
//   document.body.appendChild(alertMessage);

//   // Close alert message
//   document.getElementById("close-alert").addEventListener("click", function () {
//     alertMessage.style.display = "none";

//     // Display second alert message
//     const secondAlertMessage = document.createElement("div");
//     secondAlertMessage.className = "alert alert-warning text-center";
//     secondAlertMessage.style.position = "fixed";
//     secondAlertMessage.style.top = "50%";
//     secondAlertMessage.style.left = "50%";
//     secondAlertMessage.style.transform = "translate(-50%, -50%)";
//     secondAlertMessage.style.zIndex = "1000";
//     secondAlertMessage.innerHTML = `
//             <h4 class="alert-heading">Next Step!</h4>
//             <p>If you accidentally click a box, it will send an alert to the exhibitor. Do not check a box until it's time.</p>
//             <button id="close-second-alert" class="btn btn-primary">Close</button>
//         `;
//     document.body.appendChild(secondAlertMessage);

//     // Close second alert message
//     document
//       .getElementById("close-second-alert")
//       .addEventListener("click", function () {
//         secondAlertMessage.style.display = "none";
//       });
//   });

//   // Print button functionality
//   printButton.addEventListener("click", function () {
//     window.print();
//   });

//   // Display publish date
//   const publishDateElement = document.getElementById("publish-date");
//   const now = new Date();
//   const options = {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   };
//   publishDateElement.textContent = now.toLocaleDateString("en-US", options);
// });
