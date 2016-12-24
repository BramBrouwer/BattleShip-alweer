//maincontroller

//TODO is setstate necessary?

function MainController() {
	//variabelen
	var self = this;
	var state = "HOME";


	this.gameController = new GameController();
	this.shipController = new ShipController();
	this.viewController = new ViewController();
	this.apiController = new ApiController();
	this.boardController = new BoardController();
	this.socketController = new SocketController();
	this.audioController = new AudioController();
	this.listeners = new Listeners();
	
	this.initialize = function () {
		self.apiController.getUserGames();
	}

	self.getState = function(){
	return state;
	}


}