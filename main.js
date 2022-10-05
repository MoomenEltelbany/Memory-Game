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

cards.forEach((element) => {
    // each element will take an order according from the shuffled array which is indexArray
    element.style.order = indexArray[i];
    // Here we increment the i so that we go through the whole indexArray
    i++;
    element.onclick = () => {
        element.classList.add("is-shown");

        let allShown = cards.filter((element) =>
            element.classList.contains("is-shown")
        );

        if (allShown.length === 2) {
            checkMatch(allShown[0], allShown[1]);

            stopClicking();

            let matched = 0;
            for (let i = 0; i < cards.length; i++) {
                if (cards[i].classList.contains("matched")) {
                    matched++;
                }

                if (matched === 20) {
                    restartBtn.style.display = "block";

                    restartBtn.onclick = () => {
                        window.location.reload();
                    };
                }
            }
        }
    };
});

function checkMatch(firstBlock, secondBlock) {
    if (firstBlock.dataset.id !== secondBlock.dataset.id) {
        document.querySelector(".tries").innerHTML++;
        setTimeout(() => {
            firstBlock.classList.remove("is-shown");
            secondBlock.classList.remove("is-shown");
        }, 1000);
    } else {
        firstBlock.classList.add("matched");
        secondBlock.classList.add("matched");

        firstBlock.classList.remove("is-shown");
        secondBlock.classList.remove("is-shown");
    }
}

function stopClicking() {
    document.querySelector(".memory-container").classList.add("no-clicking");
}
