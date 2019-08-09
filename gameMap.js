const id = require( 'uniqid' )
const hitbox = require( './playerHitbox')

module.exports = function(){

    var boxes = {}

    /* Init */

    var init = () => {

        boxes[ id() ] = {
            'x' : 50,
            'y' : 700,
            'width' : 700,
            'height' : 50
        }

    }


    /* Export */

    this.exportMap = socket => {
        socket.emit('loadMap', boxes)
    }

    this.restrictPlayer = (position, momentum) => {

        var player = new hitbox( position )
        var xMotion = player.moveX( momentum )
        var yMotion = player.moveY( momentum )

        for ( key in boxes)
            if (xMotion.doColide( boxes[key] )){
                
                if (momentum.x > 0)
                    position.x = boxes[key].x - 40;
                else
                    position.x = boxes[key].x + boxes[key].width

                momentum.x = 0;
                break;
                
            }

        for ( key in boxes){
            if (yMotion.doColide( boxes[key] )){
                
                if (momentum.y> 0)
                    position.y = boxes[key].y - 80;
                else
                    position.y = boxes[key].y + boxes[key].height

                momentum.y = 0;
                break;
                
            }
        }

        position.add( momentum )

    }


    init();
}



