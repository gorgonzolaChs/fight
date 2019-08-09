module.exports = function(){

    var currentActions = {}


    /* action inputs */

    this.startAction = action => {
        currentActions[action] = true;
    }

    this.stopAction = action => {
        delete currentActions[action]
    }

    this.doAction = action => {
        currentActions[action] = false;
    }

    /* action outputs */

    this.getAction = action => {

        if (action in currentActions){

            if (currentActions[action])
                return true;

            this.stopAction(action)
            return true; 
            
        }
        return false;

    }

    this.getActionList = () => {

        if ( ! currentActions ) 
            return []
            
        return Object.keys( currentActions )
        
    }

}