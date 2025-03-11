let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn")
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg");

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
}

boxes.forEach( (box) =>{
    box.addEventListener("click", () => {
        if (trun0){
            box.innerText = 'X';
            trun0= false
        }else{
            box.innerText = 'O';
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
                showWinner(value1);
            }
        }
    }
}

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
