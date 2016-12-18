function ApiController() {
    var self = this;
    var games = [];
    var ships = [];
    /*
    
    
    -----------------------Games--------------------
    */
    /*
    Via deze route krijg je een collectie van games waarin jij mee speelt.   
        */
    self.getUserGames = function () {
        $.ajax({
            url: baseurl + "users/me/games" + accesstoken,
            success: function (result) {
                //Empty existing array of games
                games = [];
                $(result).each(function (index) {
                    games[index] = new Game(this._id, this.status, this.enemyUD, this.enemyName);
                });
                mainController.gameController.updateGameList(games);
            }, error: function (error) {
                console.log(error.responseText);
            }
        });
    }

    /*
       Via deze route is het mogelijk alle games waar je deel aan neemt te verwijderen. De request hoeft verder geen body te hebben. 
       */
    self.deleteGames = function () {
        $.ajax({
            url: baseurl + "users/me/games" + accesstoken,
            type: 'DELETE',
            success: function (result) {
                //update list + UI
                self.getUserGames();
                mainController.viewController.showSuccess("Games deleted.")

            }, error: function (error) {
                console.log(error.responseText);
            }
        });
    }

    /*
      Via deze route kun je een nieuwe game opvragen met als tegenstander een computer.
      De game zal na het aanvragen meteen de status 'setup' krijgen. 
      */
    self.newAIGame = function () {
        $.ajax({
            url: baseurl + "games/AI" + accesstoken,
            success: function (result) {
                self.getUserGames();
                mainController.viewController.showSuccess("New AI game created. Open this game by clicking it in the list.")
            }, error: function (error) {
                console.log(error.responseText);
            }
        });
    }

    /*
   Via deze route kun je een nieuwe game opvragen met als tegenstander een andere student.
   Als er al een game op de server staat met maar 1 speler, dan zul je deze game joinen, en zal de status naar de game veranderen naar setup. 
   Als er geen game meer open staat, zal de server een nieuwe game voor je aanmaken en krijgt deze de status queue.
   Indien je al een game tegen een andere student hebt aangevraagd, zal de server een error terug geven
   */
    self.newGame = function () {
        $.ajax({
            url: baseurl + "games" + accesstoken,
            success: function (result) {
                if (result.error != null) {
                    mainController.viewController.showError("You already requested a game still in queue.");
                    return;
                }
                mainController.viewController.showSuccess("New game created. Open this game by clicking it in the list.")
                self.getUserGames();
            }, error: function (error) {
                console.log(error.responseText);
            }
        });
    }

    /*
Elke gebruiker heeft een collectie van games. Voor elke game kun je alle informatie opvragen doormiddel van het Id. 
Het is alleen mogelijk gegevens op te halen van een game waar je zelf aan deel neemt.
*/
    self.getGameByID = function (id) {
        $.ajax({
            url: baseurl + "games/" + id + accesstoken,
            success: function (result) {

                mainController.viewController.drawGameScreen(result);

            }, error: function (error) {

                console.log(error.responseText);
            }
        });
    }

    self.postShot = function (gameID, x, y) {
      
        $.ajax({
            url: baseurl + "games/" + gameID + "/shots" + accesstoken,
            success: function (result) {
               mainController.boardController.shotFired(result,x,y);
            }, error: function (error) {
               mainController.boardController.shotFired(error,x,y);
            },
            type: 'POST',
            data: {
                "x" : x,
                "y" : y
            },
            dataType: 'json'
        });

    }


    /*
    -----------------------END Games--------------------
    */


    /*
    -----------------------Ships--------------------
    */
    self.getShips = function (game) {
        $.ajax({
            url: baseurl + "ships" + accesstoken,
            success: function (result) {
                ships = [];
                $(result).each(function (index) {
                    ships[index] = new Ship(this._id, this.name, this.length);
                });
                mainController.viewController.drawSetup(ships, game);
            }, error: function (error) {
                console.log(error.responseText);
            }
        });
    }


    /*
    in de fase 'setup' moet je een gameboard naar de server posten. Indien je de eerste speler bent die een gameboard post, zal de fase van de game in 'setup' blijven. 
    Indien beide spelers een gameboard hebben gepost, zal de status van de game veranderen naar 'started'. (Als je tegen een AI speelt veranderd de status altijd meteen naar started).
    */
    //get game ID and check if ships object is correct for posting
    self.postGameboard = function (inputID, inputBoard) {
        $.ajax({
            url: baseurl + "games/" + inputID + "/gameboards" + accesstoken,
            success: function (result) {
                console.log(result);

                if (result.error != null) {
                    mainContoller.viewController.showError("Error: Something went wrong while posting ships to API, check console for more info.");
                    return false;
                }
                mainController.viewController.showSuccess("Ships succesfully placed, press continue.");
                $("#confirmButton").hide();
                $("#continueButton").show();
            }, error: function (error) {
                console.log(error.responseText);
            },
            type: 'POST',
            data: {

                "ships": [{

                    "_id": inputBoard[0]._id,
                    "length": inputBoard[0].length,
                    "name": inputBoard[0].name,
                    "startCell": inputBoard[0].startCell,
                    "isVertical": inputBoard[0].isVertical,
                    "__v": 0
                },
                    {
                        "_id": inputBoard[1]._id,
                        "length": inputBoard[1].length,
                        "name": inputBoard[1].name,
                        "startCell": inputBoard[1].startCell,
                        "isVertical": inputBoard[1].isVertical,
                        "__v": 0
                    },
                    {
                        "_id": inputBoard[2]._id,
                        "length": inputBoard[2].length,
                        "name": inputBoard[2].name,
                        "startCell": inputBoard[2].startCell,
                        "isVertical": inputBoard[2].isVertical,
                        "__v": 0
                    },
                    {
                        "_id": inputBoard[3]._id,
                        "length": inputBoard[3].length,
                        "name": inputBoard[3].name,
                        "startCell": inputBoard[3].startCell,
                        "isVertical": inputBoard[3].isVertical,
                        "__v": 0
                    },
                    {
                        "_id": inputBoard[4]._id,
                        "length": inputBoard[4].length,
                        "name": inputBoard[4].name,
                        "startCell": inputBoard[4].startCell,
                        "isVertical": inputBoard[4].isVertical,
                        "__v": 0
                    },

                ]


            },
            dataType: 'json'
        });

    }
    /*
       -----------------------END Ships--------------------
       */



}