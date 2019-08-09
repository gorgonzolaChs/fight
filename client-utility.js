function getRanColor(){
    var c;
    var colors = ["aqua", "Blue", "Red" , "Coral" , "Green" , "Pink" , "Purple" , "Orange" , "Gold" , "GreenYellow"];
    var num = Math.floor(Math.random() * 10); // 0-9
    return colors[num];
}
var spawnedP = [];
var spawnedC = [];
function getPlayerColor(p){
    if(spawnedP.indexOf(p) === -1){
        spawnedP.push(p);
        spawnedC[spawnedP.indexOf(p)] = getRanColor();
        return spawnedC[spawnedP.indexOf(p)];
    } else return spawnedC[spawnedP.indexOf(p)];
}