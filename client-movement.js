// Movement Control
function nameKey(thisKey){
    var sentK;
    switch(thisKey){
        case ("ArrowUp") :
            sentK = "jump";
            break;
        case ("ArrowDown") :
            sentK = "crouch";
            break;
        case ("ArrowLeft") :
            sentK = "moveL";
            //direction = "l";
            break;
        case ("ArrowRight") :
            sentK = "moveR";
            //direction = "r";
            break;
        case ("a") :
            sentK = "punch";
            break;
        case ("d") :
            sentK = "kick";
            break;
        case ("Escape") :
            sentK = "quit";
            break;
        case ("Enter") :
            sentK = "misc";
            testPlayer();
            break;
        default : break;
    }
    return sentK;
}

var pressed = [];
pressKey = event => {
    if(nameSubmitted){
        var controls = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'a', 'd', 'Escape', 'Enter'];
        var move = ['moveL', 'crouch', 'moveR'];
        if(controls.indexOf(event.key) !== -1){
            var sentKey = nameKey(event.key);
            
            // Start if Movement Control, else doAction
            if(pressed.indexOf(sentKey) === -1){
                pressed.push(sentKey);
                if (move.indexOf(sentKey) !== -1) socket.emit('startAction', {'action':sentKey});
                if (move.indexOf(sentKey) === -1) socket.emit('doAction', {'action':sentKey});
            } 
        }
    }
}
releaseKey = event => {
    if(nameSubmitted){
        var controls = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'a', 'd', 'Escape', 'Enter'];
        if(controls.indexOf(event.key) !== -1){
            //console.log(event.key);
            //var thisKey = event.key;
            var releasedKey = nameKey(event.key);
            
            if(pressed.indexOf(releasedKey) !== -1){
                //console.log(releasedKey);
                pressed.splice(pressed.indexOf(releasedKey), 1);
                socket.emit('stopAction', {'action':releasedKey});
                //console.log("Pressed[]" + pressed);
            } 
            
            //socket.emit('stopAction', {'stop':releasedKey});
        }
    }
}
document.onkeyup = releaseKey;
document.onkeydown = pressKey;