let startBtn = document.querySelector(".start");

startBtn.onclick = () => {
  startBtn.parentElement.remove();
};

// Getting the name from the user
let yourName = window.prompt("Please, Enter your name: ");

// Inserting the name in the heading
document.querySelector(".name").innerHTML = yourName || "Unknown";
