const txtNameField = document.getElementById('txtName');
const compWpnField = document.getElementById('compWpn');
const userWpnField = document.getElementById('usrWpn');
const winnerField = document.getElementById('winner');
const playerScoreField = document.getElementById('plrScr');
const playerNameScores = document.getElementById('playerNameScores');
const compScoreField = document.getElementById('cmpScr');

let compScore=0;
let userScore=0;

const popoverEnterName = new bootstrap.Popover(txtNameField, {
    placement:'left',
    content:'You should first enter your name here',
    trigger:'manual',
});

const btnPlay = document.getElementById('btnPlay');
btnPlay.addEventListener('click',btnPlayClick);
const btnRock = document.getElementById('btnRock');
const btnPaper = document.getElementById('btnPaper');
const btnScissors = document.getElementById('btnScissors');
btnRock.addEventListener('click',btnWpnClick);
btnPaper.addEventListener('click',btnWpnClick);
btnScissors.addEventListener('click',btnWpnClick);

function btnPlayClick(){
    if (txtNameField.value!==""){
        txtNameField.setAttribute("disabled","disabled");
        btnPlay.setAttribute("disabled","disabled");
        playerNameScores.innerText = txtNameField.value + ": ";
        startGame();
    }
    else popoverEnterName.show();
}

function startGame(){
    btnRock.removeAttribute("disabled");
    btnPaper.removeAttribute("disabled");
    btnScissors.removeAttribute("disabled");
}

function compMakesMove() {
    let rand = Math.floor(Math.random()*3);
    console.log("Computer thows", rand);
    return rand === 0 ? "Rock" : rand===1 ? "Paper" : "Scissors"
}

function btnWpnClick(button) {
    const btnClickedID = button.target.tagName==="BUTTON" ? button.target.id : button.target.tagName==="I" ? button.target.parentElement.id : 0;
    if (btnClickedID===0) return /* In case of some other ID return with nothing */
    
    const userWpn = btnClickedID === "btnRock" ? "Rock" : btnClickedID === "btnPaper" ? "Paper" : "Scissors"; 

    const compWpn = compMakesMove(); /* Lets make computer show his weapon first */
    console.log("Computer chose: ", compWpn);
    console.log("You chose: ", userWpn);

    userWpnField.innerText = userWpn;
    compWpnField.innerText=compWpn;
    const winner = whoWins(userWpn, compWpn);
    winnerField.innerText = winner;
    
    if (winner==="Computer")
    {
        compScore++;
        winnerField.classList.add("text-danger");
        winnerField.classList.remove("text-success");
    }
    else if (winner==txtNameField.value) 
    {
        userScore++;
        winnerField.classList.add("text-success");
        winnerField.classList.remove("text-danger");
    }else{ /* (winner==="Same weapons - a tie!") */
        winnerField.classList.add("text-primary");
        winnerField.classList.remove("text-danger");
        winnerField.classList.remove("text-success");
    }
    updateScores();
}

function updateScores() {
    playerScoreField.innerText=userScore;
    compScoreField.innerText=compScore;
}

function whoWins(userWpn, compWpn) {
    if (userWpn===compWpn) return "Same weapons - a tie!"
    if (userWpn==="Rock"){
        if (compWpn==="Paper") return "Computer"
        else return txtNameField.value
    }else if(userWpn==="Paper"){
        if (compWpn==="Scissors") return "Computer"
        else return txtNameField.value
    }
    /* if user has no rock and no paper then we assume he has scissors */
    if (compWpn==="Rock") return "Computer"
        else return txtNameField.value
}