function SocketController() {
    var self = this;
    
    self.initialize = function () {

        var server = 'https://zeeslagavans.herokuapp.com/';
        var options = {
            query: "token=" + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImIuYnJvdXdlckBzdHVkZW50LmF2YW5zLm5sIg.Je0wnMvxSEHa1v_NJCGjivIBJ4OrOujaWKcHjsStSa8"
        };

        var socket = io.connect(server, options);

        socket.on('update', function (update) {
            self.onUpdate(update);
        });

        socket.on('shot', function (shot) {
            self.onShot(shot);
        });

        socket.on('turn', function (turn) {
            self.onTurn(turn);
        });

    }

    self.onUpdate = function (update) {
        //Blijkbaar komt er geen update binnen als een ai game van setup naar started gaan (best logisch eigenlijk)
        if (mainController.getState() == "HOME") {
            mainController.apiController.getUserGames();
            mainController.viewController.showInfo("A game has just been updated : " + update.gameId + " - " + update.status);
        } else {
            if (update.gameId != mainController.boardController.getCurrentGame()._id) {
                mainController.viewController.showInfo("A game has just been updated : " + update.gameId + " - " + update.status);
            }
        }

    }

    self.onShot = function (shot) {
        if (mainController.state == "INGAME") {
            //Check if shot was placed in currently open game/not placed by the player himself 
            if (shot.gameId == mainController.boardController.getCurrentGame()._id && shot.user != "b.brouwer@student.avans.nl") {

                if (shot.result == "WINNER") {
                    mainController.apiController.getGameByID(shot.gameId);
                    mainController.viewController.showError("Defeat !");
                    mainController.audioController.defeat();
                    alert("Defeat !");
                } else {
                    mainController.apiController.getGameByID(shot.gameId);
                }
            }
        }

        self.onTurn = function (turn) {
            
            //Check if there is a current game
            if (mainController.boardController.getCurrentGame() != 0) {
                
                //is the turn update not in this current and is it not the enemies turn? then message the player regarding the turn
                if (mainController.boardController.getCurrentGame()._id == turn.gameId) {
                    if (turn.turn == "b.brouwer@student.avans.nl") {
                        mainController.viewController.showSuccess("Turn: Yours.")
                    } else {
                        mainController.viewController.showError("Turn: " + turn.turn);
                    }
                }

            }
        }
    }
}