// The score div that we will use to append the score of each one from the localstorage
let mainScoreDiv = document.querySelector(".scores");

// Function of creating sub-divs that has the name and successes after how many tries
function creatingDiv(userName, userTries) {
  // Creating the main div that will hold the name and the score
  let scoreDiv = document.createElement("div");
  scoreDiv.className = "score";

  // Creating the h3 that will hold the user name
  let name = document.createElement("h3");
  name.appendChild(document.createTextNode(`Hello: ${userName}`));

  // The paragraph that will hold the number of tries of each user name
  let myPTries = document.createElement("p");
  myPTries.appendChild(document.createTextNode("Succeeded after: "));

  // The span that will hold the number of the tries
  let myTriesSpan = document.createElement("span");
  myTriesSpan.className = "score-tries";
  myTriesSpan.appendChild(document.createTextNode(`${userTries} tries`));

  // Appending all the elements inside the main div
  myPTries.appendChild(myTriesSpan);

  scoreDiv.appendChild(name);
  scoreDiv.appendChild(myPTries);

  mainScoreDiv.appendChild(scoreDiv);
}
// Here we declare the duration that the cards will consume while its faces up before turning back again
let duration = 1000;

// Getting the name from the user
let yourName = window.prompt("Please, Enter your name: ");

// Inserting the name in the heading
document.querySelector(".name").innerHTML = yourName || "Unknown";

// Getting an array from the photos div
let cards = Array.from(document.querySelectorAll(".card"));

// Selecting the start button
let startBtn = document.querySelector(".start");

// Once we click on the button, the overlay will be removed
startBtn.onclick = () => {
  startBtn.parentElement.remove();

  creatingDiv();
};

// Here it is an empty array to store the indexes inside
let indexArray = [];
// A dynamic loop to insert all the indexes inside the array
for (let i = 0; i < cards.length; i++) {
  indexArray.push(i);
}

// A function to shuffle the number inside the array because we are going to use this shuffles array to rearrange the photos
function shuffleArray(arr) {
  // Current equal array.length and it will decrement every time by one, like this it will get all the indexes in the array
  let current = arr.length,
    random;

  // a loop to go through all the element inside the array but our last element
  while (current > 0) {
    // Here we get a random number that we will use it as a index to swap it with another number
    random = Math.floor(Math.random() * current);

    current--;

    // Here we use the destructuring method to sway the arr[current] which is each element from the last to the beginning with the arr[random] which is a random element from the array
    [arr[current], arr[random]] = [arr[random], arr[current]];
  }
}

// We are shuffling the array of the indexes so that we set the order in "CSS" to change the positions of the photos in our page
shuffleArray(indexArray);

// We declare i=0 because we will use it in defining the order "CSS" for each element
let i = 0;

let restartBtn = document.querySelector(".restart");

let userData = [
  {
    userName: yourName,
    numOfTries: document.querySelector(".tries").innerHTML,
  },
];

cards.forEach((element) => {
  // each element will take an order according from the shuffled array which is indexArray
  element.style.order = indexArray[i];
  // Here we increment the i so that we go through the whole indexArray
  i++;
  // Here we attach an event of clicking on the element
  element.onclick = () => {
    element.classList.add("is-shown");

    // Filtering all the element that has the class 'is-shown'
    let allShown = cards.filter((element) =>
      element.classList.contains("is-shown")
    );

    // If the filtered elements are two, means that there are two cards that are shown to the user
    if (allShown.length === 2) {
      // Using the function of checkMatch where we give two paramaters and we compare there dataset to see if they are equal or not
      checkMatch(allShown[0], allShown[1]);

      // stopClicking function that stops us from clicking on any other element when the two cards are flipped
      stopClicking();

      // Here we set a variable that is equal to zero and we make this simply to define if all the elements are flipped and matched or not, because if there are all flipped and matched, we will show the restart button to restart the game
      let matched = 0;
      for (let i = 0; i < cards.length; i++) {
        // Here we go through all the cards list, if the cards has a class "matched" means that is flipped and matched, we add increment the matched value
        if (cards[i].classList.contains("matched")) {
          matched++;
        }

        // If matched is equal 20, means that all the cards are flipped and matched, so we will appear the div that has the restart button and everything else with it
        if (matched === 20) {
          document.querySelector(".overlay-restart ").style.display = "block";

          restartBtn.onclick = () => {
            window.location.reload();
          };
        }
      }
    }
  };
});

// Here the function checkMatch that we give to it two parameters to check the dataset and in case if they are equal, means that the photos are the same, else, the two flipped photos are not matched and that we will need to flip them back
function checkMatch(firstBlock, secondBlock) {
  if (firstBlock.dataset.id !== secondBlock.dataset.id) {
    // In this case if they are not the same, means that the wrong tries will increase by one.
    document.querySelector(".tries").innerHTML++;
    setTimeout(() => {
      firstBlock.classList.remove("is-shown");
      secondBlock.classList.remove("is-shown");
    }, duration);
  } else {
    // Here we add the class matched that has the same function sa class is-shown, so why did we add another class that does the same function, it is because up in the code we are filtering elements based on class "is-shown" and we don't want to filter those that are matched already, that is why we even remove the class is-shown after
    firstBlock.classList.add("matched");
    secondBlock.classList.add("matched");

    // Here we add the class no-clicking that makes the pointer event none so that the user can not click on the matched photos any more
    firstBlock.classList.add("no-clicking");
    secondBlock.classList.add("no-clicking");

    firstBlock.classList.remove("is-shown");
    secondBlock.classList.remove("is-shown");
  }
}

// This function is to add the no-clicking in css class that adds pointer-event:none and this to prevent the user from clicking on the elements
function stopClicking() {
  document.querySelector(".memory-container").classList.add("no-clicking");

  // After the same duration that will show the two flipped cards, we will remove the class no-clicking so that user can click again of the photos
  setTimeout(() => {
    document.querySelector(".memory-container").classList.remove("no-clicking");
  }, duration);
}
