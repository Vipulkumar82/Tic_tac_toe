let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn")
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg");
let line = document.getElementById("line");


let trun0 = true;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () =>{
    trun0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    line.style.display = "none"; 
    line.style.width = "0"; 

}

boxes.forEach( (box) =>{
    box.addEventListener("click", () => {
        if (trun0){
            box.innerText = '💔';
            trun0= false
        }else{
            box.innerText = '❤️';
            trun0 = true;
        }
        box.disabled = true;
        checkWinner();
    })
})

//Finding Winner
let checkWinner = () =>{
    for (let pattern of winPatterns){
        let value1 = boxes[pattern[0]].innerText;
        let value2 = boxes[pattern[1]].innerText;
        let value3 = boxes[pattern[2]].innerText;
        
        if (value1 !="" && value2 !="" && value3 !=""){
            if(value1 == value2 && value2 == value3){
                drawLine(pattern);
                showWinner(value1);
                return;
            }
        }
    }
}

const drawLine = (pattern) => {
    let box1 = boxes[pattern[0]];
    let box2 = boxes[pattern[2]];

    let rect1 = box1.getBoundingClientRect();
    let rect2 = box2.getBoundingClientRect();
    let boardRect = document.querySelector(".game").getBoundingClientRect(); // ✅ Fix

    let x1 = rect1.left + rect1.width / 2 - boardRect.left;
    let y1 = rect1.top + rect1.height / 2 - boardRect.top;
    let x2 = rect2.left + rect2.width / 2 - boardRect.left;
    let y2 = rect2.top + rect2.height / 2 - boardRect.top;

    let length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    let angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

    line.style.width = `${length}px`;
    line.style.left = `${x1}px`;
    line.style.top = `${y1 - 2.5}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.display = "block";
    line.style.setProperty("--arrow-rotation", `${angle}deg`);

};

//when winner is found then print who is winner
let showWinner = (winner) => {
    msg.innerHTML = `Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

//when any user is winner then all boxes should be disabled
const disableBoxes = () =>{
    for (let box of boxes){
        box.disabled = true;
    }
};

//when we click on reset and new Game 
const enableBoxes = () =>{
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};


newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
