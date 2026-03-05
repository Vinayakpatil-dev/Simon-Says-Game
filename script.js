//VARIABLES
let h3=document.querySelector('h3');
let lv=0;
let start=false;
let gameSeq=[];
let userSeq=[];
let btns=['r','g','b','p'];
let tiles=document.querySelectorAll('.tiles');
let score=document.querySelector('.score');
let highscore=0;
let startbtn=document.querySelector('#start');

//GAME STARTER
startbtn.addEventListener('click',()=>{
    if(start==false){
        start=true;
        startbtn.style.display="none";
        levelUp();
    }
});

//USER BUTTON PRESS EVENT
function btnPress(){
    userFlash(this);
    if(start==false){return;}
    userSeq.push(this.getAttribute("id"));
    checkAns(userSeq.length-1);
}
for(let tile of tiles){
    tile.addEventListener('click',btnPress);
}

//FLASH EFFECT
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(()=>{btn.classList.remove('flash')},500);
}
function userFlash(btn){
    btn.classList.add("flash");
    setTimeout(()=>{btn.classList.remove('flash')},200);
}

//LEVEL CONTROL
function levelUp(){
    lv++;
    score.innerText=`Score: ${lv-1}`;
    userSeq=[];
    h3.innerText=`Level ${lv}`;
    let nextTile=Math.floor(Math.random()*4);
    let nextCol=btns[nextTile];
    gameSeq.push(nextCol);
    let btn=document.querySelector(`#${nextCol}`);
    gameFlash(btn);
}

//SEQUENCE VERIFIER
function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){setTimeout(levelUp,1000);}
    }
    else{
        h3.classList.add("gameOver");
        setTimeout(()=>{h3.classList.remove("gameOver")},300);
        gameReset();
    }
}

//RESET GAME
function gameReset(){
    if(highscore<lv-1){highscore=lv-1;}
    h3.innerText=`Game over!\nYour score: ${lv-1} | Highscore: ${highscore}\nPress START to start again.`;
    lv=0;
    start=false;
    startbtn.style.display="inline-block";
    gameSeq=[];
    userSeq=[];
    score.innerText="";
}