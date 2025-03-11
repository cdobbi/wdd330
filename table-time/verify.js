document.addEventListener("DOMContentLoaded", () => {
    const organizerButton = document.getElementById("organizer-button");
    const exhibitorButton = document.getElementById("exhibitor-button");
    const verifyCodeButton = document.getElementById("verify-code");
  
    organizerButton.addEventListener("click", () => {
      // Show the modal for code verification
      $('#organizerModal').modal('show');
    });
  
    verifyCodeButton.addEventListener("click", () => {
      const code = document.getElementById("organizer-code").value;
      if (code === "your-code-here") { // Replace 'your-code-here' with the actual code
        window.location.href = "organizer.html";
      } else {
        alert("Incorrect code. Please try again.");
      }
    });
  
    exhibitorButton.addEventListener("click", () => {
      // Redirect to exhibitor page or perform any action
      window.location.href = "exhibitor.html";
    });
  });