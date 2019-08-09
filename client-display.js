var offsetX = 0;
var offsetY = 0
var currImg;
var testImg = new Image();
var CrouchingMan = new Image();
var JumpingMan = new Image();
var KickingMan = new Image();
var PunchingMan = new Image();
var RunningMan1 = new Image();
var RunningMan2 = new Image();
var RunningMan3 = new Image();
var StandingMan = new Image();
testImg.src = "images/TestMan.png";
CrouchingMan.src = "images/CrouchingMan.png";
JumpingMan.src = "images/JumpingMan.png";
KickingMan.src = "images/KickingMan.png";
PunchingMan.src = "images/PunchingMan.png";
RunningMan1.src = "images/RunningMan1.png";
RunningMan2.src = "images/RunningMan2.png";
RunningMan3.src = "images/RunningMan3.png";
StandingMan.src = "images/StandingMan.png";

function drawMap(d){                    // Draw Game Map
    var canvas = document.getElementById("arena");
    var ctxs = canvas.getContext("2d");

    ctxs.fillStyle = "Gray";
    ctxs.fillRect(d.x - offsetX, d.y - offsetY, d.width, d.height);

}
var direction = "r";
function drawPlayer(player, k){         // Draw Player States

    if(k === myPlayerID){

        offsetX = (offsetX * 20 + (player.x - 400) ) / 21;
        offsetY = (offsetY * 20 + (player.y - 400) ) / 21;
    }

    var canvas = document.getElementById("arena");
    var ctx = canvas.getContext("2d");
    
    img = getPlayerImage(player);
    if(direction == "r") 
        ctx.drawImage(img, player.x - offsetX, player.y - offsetY, 40, 80);

    if(direction == "l") {
        ctx.translate(player.x - offsetX + 40, player.y - offsetY);
        ctx.scale(-1,1);
        ctx.drawImage(img, 0, 0, 40, 80);
        ctx.setTransform(1,0,0,1,0,0);
    }

    ctx.fillStyle = "black";
    ctx.font = "15px Georgia";
    ctx.fillText(player.name, player.x - offsetX, player.y - offsetY);
}
function getPlayerImage(player){
    if(player.actionList[0] == null){
        return StandingMan;
    }
    if(player.actionList.includes("punch")){
        currImg = PunchingMan
    }
    else if(player.actionList.includes("kick")){
            currImg = KickingMan;
    }
    else if(player.actionList.includes("jump")){
        currImg = JumpingMan;
    }
    else if(player.actionList.includes("crouch")){
        currImg = CrouchingMan;
    }
    else if(player.actionList.includes("moveR") || player.actionList.includes("moveL")){
        if(player.actionList.includes("moveL")) direction = "l";
        if(player.actionList.includes("moveR")) direction = "r";
        if(interval == 1){
            currImg = RunningMan1;
            if(callCount()) {prevRun = 1; interval++;}
            return currImg;
        }
        if(interval == 2){
            currImg = RunningMan2;
            if(callCount()){
                if(prevRun == 1) interval++;
                if(prevRun == 3) interval--;
            }
            return currImg;
        }
        if(interval == 3){
            currImg = RunningMan3;
            if(callCount()) {prevRun = 3; interval--;}
            return currImg;
        }
    }
    else currImg = StandingMan;

    return currImg;
}
var callC = 5;
function callCount(){
    if(callC == 0) {
        callC = 5;
        return true;
    }
    else {callC--; return false;}
}
var interval = 1;
var prevRun = 0;
