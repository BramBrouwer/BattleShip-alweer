function BoardController() {

    var self = this;
    var selectedTarget;
    var gameId;
    var au_boom = new Audio('audio/explosion.wav');
    var au_splash = new Audio('audio/splash.wav');


    
    /*
    Update buttons on enemytd hover
    */
    self.enemytdHover = function (td, yourTurn) {
        var data = td.data('field');
        if (!yourTurn) {
            self.notYourTurn();
        } else {
            self.showPlaceShotButton(data);
        }

    }

    /*
    Lock in cell for shot posting
    */
    self.enemytdClick = function (td, yourTurn) {
        var data = td.data('field');
        if (!yourTurn) {
            self.notYourTurn();
            return;
        }
        var shotvalid = true;
        if (shotvalid) {
            $("#gs_confirmButton").text("Confirm : " + data.x + "," + data.y)
            self.showConfirmButton();
            selectedTarget = data;
        }
    }

    /*
    If possible, post shot to API
     */
    self.postShot = function () {
        console.log(selectedTarget);
        $("#gs_confirmButton").hide();
        var x = selectedTarget.x;
        var y = selectedTarget.y;
        mainController.apiController.postShot(gameId, x, y);

    }
    
    /*
    Listen to the api's response after firing a shot
    */
    self.shotFired = function (input, x, y) {
        console.log(input.responseText);
        var currentCell = $("#e_" + x + y);
        switch (input.responseText) {
            case "SPLASH":
                currentCell.addClass("splashtd");
               mainController.audioController.splash();
                break;
            case "BOOM":
                currentCell.addClass("boomtd");
                mainController.audioController.boom();
                break;
            case "WINNER":
                currentCell.addClass("boomtd");
                mainController.viewController.drawVictory();
                break;
            default:
            //something went wrong
        }
    }



    //Utility methods

    self.setCurrentGame = function (input) {
        gameId = input;
    }
    self.getCurrentGame = function(){
        return gameId;
    }

    self.showConfirmButton = function () {
        $("#gs_confirmButton").show();
    }


    self.showPlaceShotButton = function (data) {
        $("#infoButton").hide();
        $("#placeButton").show();
        $("#placeButton").text("Click to place shot at : " + data.x + "," + data.y)
    }

    self.showShotInvalid = function () {
        $("#placeButton").hide();
        $("#infoButton").show();
        $("#infoButton").text("Cannot place shot here");
    }

    self.notYourTurn = function () {
        $("#placeButton").hide();
        $("#infoButton").show();
        $("#infoButton").text("It's not your turn.");
    }



}