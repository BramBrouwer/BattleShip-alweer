function BoardController() {

    var self = this;
    var selectedTarget;
    var game = 0;
    var au_boom = new Audio('audio/explosion.wav');
    var au_splash = new Audio('audio/splash.wav');
   

    /*
    Update buttons on enemytd hover
    */
    self.enemytdHover = function (td) {
        var data = td.data('field');
        self.showPlaceShotButton(data);
    }

    /*
    Lock in cell for shot posting
    */
    self.enemytdClick = function (td) {
        var data = td.data('field');
        selectedTarget = data;

        var shotvalid = true;
        if (selectedTarget.state == "touched") {
            $("#gs_confirmButton").text("cell was shot already!");
            return;
        }
        $("#gs_confirmButton").text("Confirm : " + data.x + "," + data.y)
        self.showConfirmButton();
    }

    /*
    If possible, post shot to API
     */
    self.postShot = function () {
        selectedTarget.state = "touched";
        $("#gs_confirmButton").hide();
        var x = selectedTarget.x;
        var y = selectedTarget.y;
        mainController.apiController.postShot(game._id, x, y);

    }

    /*
    Listen to the api's response after firing a shot
    */
    self.shotFired = function (input, x, y) {
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
                mainController.viewController.showSuccess("Victory!");
                mainController.audioController.victory();
                break;
            default:
            //something went wrong
        }
    }



    //Utility methods
    //Om een referentie naar de current game te hebben in de socketcontroller zodat we weten of we het veld kunnen updaten
    self.setCurrentGame = function (input) {
        game = input;
    }
    self.getCurrentGame = function () {
        return game;
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