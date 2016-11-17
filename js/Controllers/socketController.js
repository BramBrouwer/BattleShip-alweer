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
            var gameId = turn.gameId // Bijvoorbeeld 10
            var turn = turn.turn // Bijvoorbeeld ssmulder@avans.nl
        });

    }

    self.onUpdate = function (update) {
        //Check if we are in the home screen, if we are we can update the gamelist
        if (update.gameId != mainController.boardController.getCurrentGame()._id) {

            if (mainController.state == "HOME") {
                mainController.apiController.getUsergames();
                mainController.viewController.showInfo("A game has just been updated : " + update.gameId + " - " + update.status);
            } else {
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
                } else {
                    mainController.apiController.getGameByID(shot.gameId);
                }
            }


        }
    }
}