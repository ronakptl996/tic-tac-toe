let socket = io();
document.getElementById("startbtn").addEventListener("click", () => {
  startGame();
});

let sign = "X";
let tableId;
let playerName;
let userId;
let box = document.getElementsByClassName("box");
let storagenUserId = sessionStorage.getItem("userId");
let storagetableId = sessionStorage.getItem("tableId");
let setIntervalId;
let moveSuggestionId;

function startGame() {
  do {
    playerName = prompt("Enter Your Name", "Joe");
    if (playerName) socket.emit("SIGNUP", { playerName });
  } while (!playerName);
}

function joinGame(data) {
  console.log("joinGame data :: >>", data);
  document.getElementById("startbtn").style.display = "none";
  sessionStorage.setItem("tableId", data.tableId);

  tableId = data.tableId;

  if (data.playerInfo.length == 1) {
    document.getElementById("gameuser1").innerHTML = data.playerInfo[0].name;
    document.getElementById("gameuser2").innerHTML =
      "Waiting for an Opponent to Join!";
  } else if (data.playerInfo.length == 2) {
    document.getElementById("gameuser1").innerHTML = data.playerInfo[0].name;
    document.getElementById("gameuser2").innerHTML = data.playerInfo[1].name;
  }
  let board = data.board;
  console.log("joingame board :: >>", board);
  setBoard(board);
}

function movePieces(data) {
  let board = data.data.board;
  setBoard(board);
}

function setBoard(data) {
  document.querySelectorAll(".box").forEach((element, index) => {
    if (data[index] === null) {
      element.innerHTML = "";
      element.disabled = false;
    } else {
      element.innerHTML = data[index];
      element.disabled = true;
    }
  });
}

function Start(data) {
  console.log("Start data :: >>", data);
  let delaytimer = 5;
  tableId = data.data.tableId;
  let roundTimerInterval = setInterval(function () {
    var counter = delaytimer--;
    document.getElementById("roundTimer").innerHTML = counter;
    if (counter === 0) {
      clearInterval(roundTimerInterval);
      document.getElementById("roundTimer").innerHTML = "GAME STARTED";
    }
  }, 1000);
  setTimeout(() => {
    document.getElementById("roundTimer").innerHTML = "";
  }, 8000);
}

eventHandler(socket);

function userTurnStarted(data) {
  console.log("userTurnStarted data :: >>", data);
  let userId = sessionStorage.getItem("userId");
  console.log("join vvvvvv userId :: >>", userId);
  console.log("####data.userId == userId", data.userId);
  if (data.userId == userId) {
    document.getElementById("turn").innerHTML = "Your Turn!";
    document.getElementById("gameBoard").style.pointerEvents = "";
  } else {
    document.getElementById("turn").innerHTML = "Your Opponent Turn!";
    document.getElementById("gameBoard").style.pointerEvents = "none";
  }
}

function signUpGame(data) {
  let userId = data.userId;
  sessionStorage.setItem("userId", userId);
  userId = sessionStorage.getItem("userId");
  console.log("userId :: >>", userId);
}

document.querySelectorAll(".box").forEach((element) => {
  element.addEventListener("click", () => {
    console.log("box clicked", element.id);
    console.log("playerName", playerName);
    element.disabled = true;
    let data = {
      eventName: "MOVE",
      data: {
        name: playerName,
        id: element.id,
        tableId: tableId,
      },
    };
    socket.emit("MOVE_PIECES", data);
  });
});

document.querySelectorAll(".box").forEach((element) => {
  element.addEventListener("mouseover", () => {
    // if (setIntervalId) clearInterval(setIntervalId);
    console.log("hover button", element.id);
    // alert(element.id);
    socket.emit("MOVE_SUGGESTION", {
      tableId: sessionStorage.getItem("tableId"),
    });
  });
  element.addEventListener("mouseout", () => {
    if (setIntervalId) clearInterval(setIntervalId);
    if (document.getElementById(moveSuggestionId).classList.contains("redBg")) {
      document.getElementById(moveSuggestionId).classList.remove("redBg");
    }
  });
});

function alertMessage(type, msg) {
  let poUp = `<div class='${type}-alert alertMsg'>
    <h3>${msg}</h3>
    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
    </div>`;
  let alertBox = document.querySelector(".alertBox");
  alertBox.innerHTML = poUp;
  setTimeout(() => {
    location.reload();
  }, 5000);
}

function moveSuggestion(id) {
  if (id == "Anull") return;
  if (id == "AX") return;
  var myBox = document.getElementById(id);
  moveSuggestionId = id;

  console.log("myBox", myBox);
  setIntervalId = setInterval(() => {
    myBox.classList.toggle("redBg");
  }, 500);
}

function disconnectUser(data) {
  alertMessage("lose", `${data.leftUserDetails.name} has left the game!!`);
}

function checkWinnner(data) {
  console.log(data);
  let userId = sessionStorage.getItem("userId");
  let piece = data.data;

  if (piece == "tie") {
    alertMessage("lose", "Match Tie!!");
  } else if (userId == data.currentTurn) {
    alertMessage("win", "You win the game!!");
  } else {
    alertMessage("lose", "You lose the game!!");
  }
  setTimeout(() => {
    sessionStorage.clear();
  }, 10000);
}

function eventHandler(socket) {
  socket.onAny((eventName, data) => {
    switch (eventName) {
      case "SIGNUP":
        console.log("SignUp Data", data);
        signUpGame(data.data);
        break;

      case "START":
        console.log("game started event called..");
        Start(data);
        break;

      case "MOVE_PIECES":
        movePieces(data.data);
        break;

      case "USER_TURN_STARTED":
        console.log("USER_TURN_STARTED", data);
        userTurnStarted(data.data);
        break;

      case "JOIN":
        console.log("joinGame evenHandler data", data);
        joinGame(data.data);
        break;

      case "WINNER":
        checkWinnner(data.data);
        break;

      case "MOVE_SUGGESTION":
        console.log("MOVE_SUGGESTION", data);
        moveSuggestion(data.id);
        break;

      case "DISCONNECT_USER":
        disconnectUser(data.data);
    }
  });
}
