/*
Contains methods used for drawing tables, alerts , etc. 
*/

function ViewController() {

    var self = this;
    var alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];



    //SCREENS

    /*
    Draw buttons and update list for setupscreen
    */
    self.drawSetup = function (ships, game) {

        mainController.state = "SETUP";
        var currentOr = mainController.shipController.getOrientation();
        $("#alertWrapper").hide();
        $("#homeScreenButtons").hide();
        $("#gamelist").empty();
        $("#alliedTable").empty();
        $("#setupScreenButtons").show();
        $("#setupScreenButtons").show();
        $("#orientationButton").text(currentOr);
        $("#alertWrapper").show();
        $("#setupWrapper").show();

        //show ships
        mainController.shipController.updateShipList(ships, game);

        //show gameField
        self.drawSetupField();
        self.showInfo("Ready for setup");
        self.setupListeners();
    }

    /*
    Draw button etc for homescreen
    */
    self.drawHomeScreen = function () {
        mainController.state = "HOME";

        //reset references used in board/shipController 
        mainController.boardController.setCurrentGame(0);
        mainController.shipController.clearPlacedShips();
        $("#alertWrapper").hide();
        $("#placeButton").hide();
        $("#setupWrapper").hide();
        $("#gameScreenButtons").hide();
        $("#setupScreenButtons").hide();
        $("#versusSymbol").hide();
        $("#alliedTable").empty();
        $("#enemyTable").empty();
        $("#setupTable").empty();
        $("#infoButton").show();
        $("#homeScreenButtons").show();
        $("#refresh").trigger("click");
    }

    /*
    Draw the game screen
    */
    self.drawGameScreen = function (game) {
        mainController.state = "INGAME";
        $("#alliedTable").empty();
        $("#enemyTable").empty();
        $("#gamelist").empty();
        $("#setupWrapper").hide();
        $("#homeScreenButtons").hide();
        $("#gameScreenButtons").show();
        $("#versusSymbol").show();

        self.drawAlliedField(game);
        self.drawEnemyField(game);
        self.drawEnemyfieldShots(game);
        self.drawAlliedfieldShots(game);
        self.gameListeners(game.yourTurn);
        mainController.boardController.setCurrentGame(game);

    }

    // END SCREENS



    //TABLES

    /*
    Draw enemy gamefield
    */

    self.drawEnemyField = function (game) {
        //draw table
        table = $("#enemyTable");
        for (outer = 1; outer < 11; outer++) {
            {
                var row = $('<tr>');  //create 10 rows
                for (inner = 0; inner < 10; inner++) {
                    var cell = $('<td>'); //add 10 td's
                    cell.attr("id", "e_" + alpha[inner] + outer);
                    cell.data("field", new FieldCell(alpha[inner], outer, "untouched"));
                    cell.addClass("enemytd");
                    row.append(cell);
                }
                table.append(row);
            }
        }
    };


    /*
Draw allied gamefield
 */
    self.drawAlliedField = function (game) {

        var ships = game.myGameboard.ships;
        //draw table
        table = $("#alliedTable");
        for (outer = 1; outer < 11; outer++) {
            {
                var row = $('<tr>');  //create 10 rows
                for (inner = 0; inner < 10; inner++) {
                    var cell = $('<td>'); //add 10 td's
                    cell.attr("id", alpha[inner] + outer);
                    cell.data("field", new FieldCell(alpha[inner], outer, "free"));
                    cell.addClass("alliedtd");
                    row.append(cell);
                }
                table.append(row);
            }
        }

        for (c = 0; c < 5; c++) {
            self.drawAlliedShip(ships[c]);
        }


    };


    /*
 Draw battlefield for placing ships
 */
    self.drawSetupField = function () {

        table = $("#setupTable");
        for (outer = 1; outer < 11; outer++) {
            {
                var row = $('<tr>');  //create 10 rows
                for (inner = 0; inner < 10; inner++) {
                    var cell = $('<td>'); //add 10 td's
                    cell.attr("id", alpha[inner] + outer);
                    cell.data("field", new FieldCell(alpha[inner], outer, "free"));
                    cell.addClass("setuptd");
                    row.append(cell);
                }
                table.append(row);
            }
        }
    };


    /*
    draw ship in allied field
    */
    self.drawAlliedShip = function (ship) {

        if (ship.isVertical) {

            //colour the cells (if not occupied or outside field)
            for (var i = 0; i < ship.length; i++) {
                var curCell = $("#" + ship.startCell.x + (ship.startCell.y + i));
                curCell.css("background-color", "Cyan");
                var data = curCell.data('field');
                data.state = "occupied";
            }
        } else {
            //get alpha index of x
            var xIndex = self.getAlphaIndex(ship.startCell.x);
            for (var i = 0; i < ship.length; i++) {
                var curCell = $("#" + alpha[xIndex + i] + (ship.startCell.y));
                curCell.css("background-color", "Cyan");
                var data = curCell.data('field');
                data.state = "occupied";
            }
        }
    }
    //END TABLES


    // SHOTS
    self.drawEnemyfieldShots = function (game) {
        var shots = game.enemyGameboard.shots;

        shots.forEach(function (shot) {
            if (shot.isHit) {
                $("#e_" + shot.x + shot.y).addClass("boomtd");
                var data = $("#e_" + shot.x + shot.y).data('field');
                data.state = "touched";
            } else {
                $("#e_" + shot.x + shot.y).addClass("splashtd");
                var data = $("#e_" + shot.x + shot.y).data('field');
                data.state = "touched";
            }
        });



    }

    self.drawAlliedfieldShots = function (game) {
        var shots = game.myGameboard.shots;

        shots.forEach(function (shot) {
            if (shot.isHit) {
                $("#" + shot.x + shot.y).addClass("boomtd");
            } else {
                $("#" + shot.x + shot.y).addClass("splashtd");
            }
        });
    }
    //END SHOTS







    //CELLS

    /*
    Update cells on mousehover to show currently selected ship
    */
    self.onHover = function (cell) {

        var data = cell.data('field');
        var selectedShip = mainController.shipController.getSelectedShip();
        var orientation = mainController.shipController.getOrientation();

        //has a ship been selected
        if (selectedShip == null) {
            return;
        }

        //which orientation?
        if (orientation == "vertical") {

            //colour the cells (if not occupied or outside field)
            for (var i = 0; i < selectedShip.length; i++) {
                var curCell = $("#" + data.x + (data.y + i));
                var curCellData = curCell.data('field');
                if (curCellData != null && curCellData.state != "occupied") {
                    curCell.css("background-color", "Cyan");
                } else {
                    curCell.css("background-color", "Red");
                }
            }
        } else {

            //get alpha index of x
            var xIndex = self.getAlphaIndex(data.x);
            for (var i = 0; i < selectedShip.length; i++) {

                var curCell = $("#" + alpha[xIndex + i] + (data.y));
                var curCellData = curCell.data('field');

                if (curCellData != null && curCellData.state != "occupied") {
                    curCell.css("background-color", "Cyan");
                } else {
                    curCell.css("background-color", "Red");
                }
            }
        }

    }

    /*
    Update cells on mouseleave
    */
    self.onMouseLeave = function (cell) {

        var data = cell.data('field');
        var selectedShip = mainController.shipController.getSelectedShip();
        var orientation = mainController.shipController.getOrientation();

        if (selectedShip == null) {
            return;
        }

        if (orientation == "vertical") {
            for (var i = 0; i < selectedShip.length; i++) {

                var curCell = $("#" + data.x + (data.y + i));
                var curCellData = curCell.data('field');

                if (curCellData != null && curCellData.state != "occupied") {
                    curCell.css("background-color", "White");
                } else {
                    curCell.css("background-color", "DarkCyan");
                }
            }

        } else {
            //get alpha index of x
            var xIndex = 0;

            for (var i = 0; i < alpha.length; i++) {
                if (alpha[i] == data.x) {
                    xIndex = i;
                    break;
                }
            }

            for (var i = 0; i < selectedShip.length; i++) {

                var curCell = $("#" + alpha[xIndex + i] + (data.y));
                var curCellData = curCell.data('field');

                if (curCellData != null && curCellData.state != "occupied") {
                    curCell.css("background-color", "white");
                } else {
                    curCell.css("background-color", "DarkCyan");
                }
            }
        }
    }

    //END CELLS


    //UTILITY

    self.setupListeners = function () {

        $(".setuptd").hover(function () {
            var td = $(this);
            self.onHover(td);
        });

        $(".setuptd").mouseleave(function () {
            var td = $(this);
            self.onMouseLeave(td);
        });

        $(".setuptd").click(function () {
            console.log("SetupCell Clicked");
            var td = $(this);
            mainController.shipController.onMouseClick(td);
        });
    }

    //add click listener to enemytd cells for placing shots
    self.gameListeners = function (yourTurn) {
        $(".enemytd").click(function () {
            var td = $(this);
            mainController.boardController.enemytdClick(td, yourTurn);
        });

        $(".enemytd").hover(function () {
            var td = $(this);
            mainController.boardController.enemytdHover(td, yourTurn);
        });
    };



    self.getAlphaIndex = function (x) {
        //get alpha index of x
        var xIndex = 0;

        for (var i = 0; i < alpha.length; i++) {
            if (alpha[i] == x) {
                xIndex = i;
                return xIndex;
            }
        }
    }

    /*
    Alerts
    */
    self.showError = function (text) {
        //remove succes class
        $("#alert").removeClass("alert-success");
        $("#alert").removeClass("alert-info");
        //add error class
        $("#alert").addClass("alert-danger");
        //clear text
        $("#alert").text(text);
        //update text
        $("#alertWrapper").show();
    }

    self.showInfo = function (text) {
        //remove succes class
        $("#alert").removeClass("alert-success");
        $("#alert").removeClass("alert-danger");
        //add error class
        $("#alert").addClass("alert-info");
        //clear text
        $("#alert").text(text);
        //update text
        $("#alertWrapper").show();
    }


    self.showSuccess = function (text) {
        //add error class
        $("#alert").removeClass("alert-danger");
        $("#alert").removeClass("alert-info");
        //remove succes class
        $("#alert").addClass("alert-success");
        //clear text
        $("#alert").text(text);
        //update text
        $("#alertWrapper").show();
    }

    //----------------END utility






}