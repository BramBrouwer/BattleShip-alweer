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
            console.log(shot);
            var gameId = shot.gameId // Bijvoorbeeld 10
            var user = shot.user // Bijvoorbeeld ssmulder@avans.nl
            var field = shot.field // Dit is ook weer een JSON object die de properties x en y heeft
            var result = shot.result // BOOM | SPLASH | FAIL | WINNER
        });
        socket.on('turn', function (turn) {
            console.log(turn);
            var gameId = turn.gameId // Bijvoorbeeld 10
            var turn = turn.turn // Bijvoorbeeld ssmulder@avans.nl
        });

    }

    self.onUpdate = function (update) {
        //Check if we are in the home screen, if we are we can update the gamelist
        if (mainController.state == "HOME") {
            mainController.apiController.getUsergames();
            mainController.viewController.showInfo("A game has just been updated : " + update.gameId + " - " + update.status);
        } else {
            mainController.viewController.showInfo("A game has just been updated : " + update.gameId + " - " + update.status);
        }
    }

    self.onShot = function (shot) {
        if(mainController.state == "INGAME"){
            //call a "refresh" function here that redraws the allies field, we will call this if the user is actually in a game , hoping that the shot belongs to this game, if it doesnt, no harm done
            //orrr we can check the id and if its equal to this game tcetcetcerv
        }
    }


}