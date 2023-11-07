// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const savedUsernameSpan = document.getElementById("saved-username-span");
  const usernameInput = document.getElementById("username");
  const saveButton = document.getElementById("save-button");
  const deleteButton = document.getElementById("delete-button");
  const minutesSpan = document.getElementById("minutes");
  const secondsSpan = document.getElementById("seconds");
  const afterAMinuteSpan = document.getElementById("after-a-minute");

  // Load the saved username from localStorage
  const savedUsername = localStorage.getItem("username");
  if (savedUsername) {
    savedUsernameSpan.textContent = savedUsername;
    savedUsernameSpan.parentElement.classList.remove("invisible");
  }

  // Save the username to localStorage when the "Salva" button is clicked
  saveButton.addEventListener("click", function () {
    const username = usernameInput.value;
    localStorage.setItem("username", username);
    savedUsernameSpan.textContent = username;
    savedUsernameSpan.parentElement.classList.remove("invisible");
  });

  // Delete the saved username from localStorage when the "Elimina" button is clicked
  deleteButton.addEventListener("click", function () {
    localStorage.removeItem("username");
    savedUsernameSpan.textContent = "";
    savedUsernameSpan.parentElement.classList.add("invisible");
  });

  // Initialize and update the session timer using sessionStorage
  let startTime = sessionStorage.getItem("startTime");
  if (!startTime) {
    startTime = Date.now();
    sessionStorage.setItem("startTime", startTime);
  }
  function updateTimer() {
    const currentTime = Date.now();
    const elapsedMilliseconds = currentTime - startTime;
    const minutes = Math.floor(elapsedMilliseconds / 60000);
    const seconds = Math.floor((elapsedMilliseconds % 60000) / 1000);

    minutesSpan.textContent = minutes;
    secondsSpan.textContent = seconds;

    if (minutes > 0) {
      afterAMinuteSpan.classList.remove("d-none");
    }
  }

  setInterval(updateTimer, 1000);
  updateTimer();
});
