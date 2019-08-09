const utils = require('./util')
const actions = require('./playerActions')
const gameMap = require('./gameMap')
var colors = require('colors');

var players = {}

var gameInfo = {
    'width' : 800,
    
    'speed' : 1,
    'jump' : 40,
    'gravity' : 2,
    'friction' : 0.9,
}

var map = new gameMap()

/* External access */

module.exports.getPlayer = id => {
    return players[id];
}

module.exports.playerJoin = (socket, id, name) => {

    players[id] = { 
        'name' : name,
        'actions' : new actions(),
        'position' : new utils.vector(400, 600),
        'momentum' : new utils.vector()
    }

    console.log('Sent map data to player', name.yellow)
    map.exportMap( socket );

}

module.exports.sync = io => {

    var updateData = {}

    for( var id in players)
        updateData[id] = {
            'name' : players[id].name,
            'x' : players[id].position.x,
            'y' : players[id].position.y,
            'actionList' : players[id].actions.getActionList()
        }

    io.emit('updateState', updateData)
}

/* Movement Actions */

module.exports.startAction = (id, action) => {
    players[id].actions.startAction( action )
}

module.exports.stopAction = (id, action) => {
    players[id].actions.stopAction( action )
}

module.exports.doAction = (id, action) => {
    players[id].actions.doAction( action )
}

/* Do full game update */

module.exports.update = io => {

    this.sync( io )
    
    for ( var key in players)
        movePlayer( key )


}

var movePlayer = id => {

    var p = players[id];

    /* Movement */

    if ( p.actions.getAction('moveL') )
        p.momentum.add( new utils.vector(- gameInfo.speed, 0) )
    if ( p.actions.getAction('moveR') )
        p.momentum.add( new utils.vector( gameInfo.speed, 0) )

    if ( p.actions.getAction('jump') ) {
        p.momentum.add( new utils.vector( 0, - gameInfo.jump ) )
    }

    /* Gravity */

    p.momentum.add( new utils.vector( 0, gameInfo.gravity ) );

    /* Friction */
    
    p.momentum.scale( gameInfo.friction )

    /* Move player */

    map.restrictPlayer( p.position, p.momentum )

}
