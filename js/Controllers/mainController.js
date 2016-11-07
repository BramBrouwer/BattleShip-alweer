//maincontroller
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
	this.initialize = function () {
		self.apiController.getUserGames();

	}


}