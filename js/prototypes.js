   
    function FieldCell(x,y,state)
    {
        this.x = x;
        this.y = y;
        this.state = state;
    }
    
    function Game(gameID,gameStatus,enemyID,enemyName){
        this.gameID = gameID;
        this.gameStatus = gameStatus;
        this.enemyID = enemyID;
        this.enemyName = enemyName;
    }
    
    function Ship(id,name,length){
        this._id = id;
        this.name = name;
        this.length = length;
        this.__v = 0;
    }
    
    