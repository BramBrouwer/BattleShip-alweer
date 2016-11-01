//maincontroller
function MainController()
{
	//variabelen
	var self = this;
	
	
	
	this.gameController = new GameController();
	this.shipController = new ShipController();
	this.viewController = new ViewController();
	this.apiController = new ApiController();
	this.boardController = new BoardController();
	this.initialize = function()
	{
		self.apiController.getUserGames();
	}
	
	
}