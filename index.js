function createDiv(classname){
    let div=document.createElement("div");
    div.className=classname;
    return div;
}
function createCell(){
    let temp=["cell","cell","cell","cell"];
    let i =Math.floor(Math.random()*4);
    temp[i]="cell black";
    return temp;
}


function createRow(){
    let con=$("con");
    let row = createDiv("row");
    let arr = createCell();

    con.appendChild(row);
    for(let i=0;i<4;i++){
        row.appendChild(createDiv(arr[i]));
    }
    if(con.firstChild==null){
        con.appendChild(row);
    }else{
        con.insertBefore(row,con.firstChild);
    }
}

function delRow(){
    let con=$("con");
    if(con.childNodes.length==6){
        con.removeChild(con.lastChild);
    }
}

function move(){
    let con=$('con');
    let top = parseInt(window.getComputedStyle(con,null)["top"]);

    if(speed + top>0){
        top=0;
    }else{
        top+=speed;
    }

    con.style.top=top+"px";
    over();
    if(top==0){
        createRow();
        con.style.top="-102px";
        delRow();
    }
}

function over(){
    let rows=con.childNodes;
    if(rows.length ==5 && rows[rows.length-1].pass!==1){
        fail();
    }
    for(let i=0;i<rows.length;i++){
        if(rows[i].pass1==1){
            fail();
        }
    }
}

function fail(){
    clearInterval(clock);
    flag =false;
    confirm("your final score is " +parseInt($("score").innerHTML));
    let con=$("con");
    con.innerHTML="";
    $("score").innerHTML=0;
    con.style.top="-408px";
}

function $(id){
    return document.getElementById(id);
}

let clock=null;
let state=0;
let speed=4;
let flag=false;

//start
function start(){
    if(!flag){
        init();
    }else{
        alert("game has start,no more click!")
    }
}

function init(){
    flag=true;
    for(let i=0;i<4;i++){
        createRow();
    }
    //onclick
    $("main").onclick = function (ev) {
        ev = ev || event;
        judge(ev);
    }

    clock = window.setInterval("move()", 30);
}



function judge(e){
    if(e.target.className.indexOf("black")==-1 &&e.target.className.indexOf("cell")!==-1){
        e.target.parentNode.pass1=1;
    }

    if (e.target.className.indexOf("black")!==-1){
        e.target.className="cell";
        e.target.parentNode.pass=1;
        score();
    }
}

function score(){
    let newscore = parseInt($("score").innerHTML)+1;
    $("score").innerHTML=newscore;
    if(newscore %10==0){
        speedup();
    }
}

function speedup(){
    speed+=2;
    if(speed==20){
        alert("you are super man!")
    }
}