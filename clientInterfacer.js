/* Talks to clients by ID */

const faker = require( 'faker' )
const id = require( 'uniqid' )
var colors = require('colors');

var gameManager = require('./gameManager')

module.exports.clientJoin = (socket, io) => {

    var clientId = id()
    var name = '';

    /* Init */

    console.log('New Client, set clientId ' + clientId.yellow );
    socket.emit( 'setId',  {'id' : clientId} )

    socket.on( 'setName', data => {
        if (data && data.name){
            
            console.log('Client', clientId.yellow, 'updated name to', data.name.yellow)
            name = data.name;
            gameManager.playerJoin( socket, clientId, data.name)
            
    }})
    
    
    /* Input Data */

    socket.on( 'startAction', data => {
        if ( data && data.action )
            gameManager.startAction( clientId, data.action)
    })

    socket.on( 'stopAction', data => {
        if ( data && data.action )
            gameManager.stopAction( clientId, data.action)
    })

    socket.on( 'doAction', data => {
        if ( data && data.action )
            gameManager.doAction( clientId, data.action)
    })

    /* Chat messages */

    socket.on( 'sendChat', d => {
        
        console.log( 'Client', name.yellow, 'says', d.chat.yellow )
        io.emit('recieveChat', {'chat': name + ':  ' + d.chat })

    })


}


module.exports.gameUpdate = gameManager.update;
