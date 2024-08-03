let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGame = document.querySelector("#new-btn");
let msgContainer = document.querySelector("#msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerHTML = "O";
            turnO = false;
        } else {
            box.innerHTML = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerHTML = "";
    });
};

const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
};

const showWinner = (winner) => {
    msg.innerHTML = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let pos1 = boxes[a].innerHTML;
        let pos2 = boxes[b].innerHTML;
        let pos3 = boxes[c].innerHTML;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return;
        }
    }

    if ([...boxes].every(box => box.innerHTML !== "")) {
        msg.innerHTML = "It's a Draw!";
        msgContainer.classList.remove("hide");
    }
};

newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
