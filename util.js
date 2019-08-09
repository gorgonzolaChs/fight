
/* Bounding */

module.exports.restrictBounds =  (value, max) => {

    if ( value < 0 ) return 0;
    if ( value > max ) return max;
    return value;

}

module.exports.restrictBoundsArray = (values, max) => {

    return values.map( val => this.restrictBounds(val, max));

}


/* Objects */

module.exports.vector = function( x, y ){

    this.x = x;
    this.y = y;

    if ( x == undefined ){ this.x = 0; this.y = 0}

    this.randomize = max => {
        this.x = Math.random() * max;
        this.y = Math.random() * max;
        return this;
    }

    this.add = v => {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    this.scale = num => {
        this.x *= num;
        this.y *= num;
        return this;
    }

    this.restrict = (max, badX, badY) => {
        if ( this.x < 0 ) { badX(); this.x = 0; }
        if ( this.y < 0 ) { badY(); this.y = 0; }
        if ( this.x > max ) { badX(); this.x = max; }
        if ( this.y > max ) { badY(); this.y = max; }
    }

    this.voidX = () => {
        this.x = 0;
    }

    this.voidY = () => {
        this.y = 0;
    }

}