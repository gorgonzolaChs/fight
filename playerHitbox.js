var hitbox = function( position ){

    this.position = position;
    this.hitbox = {
        'x' : position.x,
        'y' : position.y,
        'width' : 40,
        'height' : 80
    }

    this.doColide = rect => 
            rect.x < this.hitbox.x + this.hitbox.width &&
            rect.x + rect.width > this.hitbox.x &&
            rect.y < this.hitbox.y + this.hitbox.height &&
            rect.y + rect.height > this.hitbox.y
        
    
    this.moveX = momentum => 
        new hitbox( { 'x': momentum.x + position.x, 'y' : position.y} )

    this.moveY = momentum => 
        new hitbox( { 'x': position.x, 'y' : momentum.y + position.y} ) 
    

}

module.exports = hitbox;