function keyPressedDown() {
  if (event.key === "Enter") {
    input();
  }
}

const inputElem = document.querySelector(".js-name");
const paraElem = document.querySelector(".js-para");
const ageElem = document.querySelector(".js-num");
function input() {
  const innerElem = inputElem.value;

  // paraElem.innerHTML = `Hello 👋 ${innerElem} Welcome to my exercise`;

  if (ageElem.value <= 10) {
    paraElem.innerHTML = `I'm sorry 😔 ${innerElem} , you are still ${ageElem.value} years old. You are not Qualified.`;
  } else if (ageElem.value > 10 && ageElem.value <= 15) {
    paraElem.innerHTML = `${innerElem} 😄 you're almost there. Be Patience!.`;
  } else if (ageElem.value >= 18) {
    paraElem.innerHTML = `Congratulations 🎉 ${innerElem} .   You are capable of viewin' my Exercise`;
  }
  setTimeout(function () {
    paraElem.innerHTML = "";
  }, 10000);
}

const moves = {
  wins: "Heads",
  tie: "Tails",
};
let scores = {
  wins: 0,
  losses: 0,
};

function playGame() {
  let computerMove = "";
  const randomNumber = Math.random();

  randomNumber < 0.5 ? (computerMove = moves.wins) : (computerMove = moves.tie);

  return computerMove;
}

let result = "";

function playerGame(playerMove) {
  const computerMove = playGame();

  if (playerMove === "Heads") {
    if (computerMove === moves.wins) {
      result = "You won!";
      scores.wins += 1;
    } else {
      result = "You lose";
      scores.losses += 1;
    }
  } else if (playerMove === "Tails") {
    if (computerMove === moves.tie) {
      result = "You won!";
      scores.wins += 1;
    } else {
      result = "You lose";
      scores.losses += 1;
    }
  }

  document.querySelector(".js-score").innerHTML =
    `Wins: ${scores.wins}, losses: ${scores.losses}`;

  const play = document.querySelector(".js-tail");

  result === "You won!"
    ? (play.innerHTML = `${result} `)
    : (play.innerHTML = `Computer ${computerMove}`);
}

let autoPlayin = false;
let intervalId;

function autoPlay() {
  if (!autoPlayin) {
    intervalId = setInterval(function () {
      const playerMove = playGame();
      playerGame(playerMove);
    }, 1000);
    autoPlayin = true;
  } else {
    clearInterval(intervalId);
    autoPlayin = false;
  }
}

const myArray = [
  {
    name: "socks",
    price: "$12.45",
  },
  {
    name: "sandals",
    price: "$34.34",
  },
];

renderTodoList();

function renderTodoList() {
  todoHtml = "";
  myArray.forEach(function (todoObject, index) {
    const { name, price } = todoObject;

    let html = `<div>${name}</div><div>${price}</div>
    <button onclick="
    myArray.splice(${index}, 1)
    renderTodoList()
    "class="js-button">Delete</button>`;

    todoHtml += html;
  });

  document.querySelector(".js-list").innerHTML = todoHtml;
}

function addList() {
  const namin = document.querySelector(".js-names");
  const pricin = document.querySelector(".js-price");
  let name = namin.value;
  let price = pricin.value;

  myArray.push({ name, price });
  renderTodoList();
  console.log(myArray);
  namin.value = "";
  pricin.value = "";

  document.querySelector(".css-button").innerHTML = "Added";

  setTimeout(function () {
    document.querySelector(".css-button").innerHTML = "Add";
  }, 2000);
}

let key = function () {
  if (event.key === "Enter") {
    addList();
  }
};

