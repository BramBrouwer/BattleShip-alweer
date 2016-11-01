function BoardController() {

    var self = this;
    var selectedTarget;
    var gameId;


    self.enemytdHover = function (td, yourTurn) {
        var data = td.data('field');
        if (!yourTurn) {
            self.notYourTurn();
        } else {
            self.showPlaceShotButton(data);
        }

    }

    self.enemytdClick = function (td, yourTurn) {
        var data = td.data('field');
        if (!yourTurn) {
            self.notYourTurn();
            return;
        }
        var shotvalid = true;
        if (shotvalid) {
            self.showConfirmButton();
            selectedTarget = data;
        }
    }

    self.postShot = function () {

        $("#gs_confirmButton").hide();
        var x = selectedTarget.x;
        var y = selectedTarget.y;
        mainController.apiController.postShot(gameId, x, y);

    }

    self.shotFired = function (input, x, y) {
        var currentCell = $("#e_" + x + y);
      console.log(input,currentCell);
        switch (input.responseText) {
            case "SPLASH":
            console.log("s");
                 currentCell.css("background-color", "Blue");
                break;
            case "BOOM":
            console.log("b");
                currentCell.css("background-color", "Red");
                break;
            case "WINNER":
            console.log('w');
                break;
            default:
            //something went wrong
        }
    }



    //Utility methods

    self.setCurrentGame = function (input) {
        gameId = input;
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