//TODO maybe draw setuptable on start andh hide to now worrie abou tlisteners?

/*
Contains methods used for drawing tables, alerts , etc. 
*/

function ViewController() {

    var self = this;
    var alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

    /*
    Draw buttons and update list for setupscreen
    */
    self.drawSetup = function (ships, game) {

        var currentOr = mainController.shipController.getOrientation();
        //update buttons
        $("#alertWrapper").hide();
        $("#homeScreenButtons").hide();
        $("#setupScreenButtons").show();
        $("#setupScreenButtons").show();
        $("#orientationButton").text(currentOr);
        $("#gamelist").empty();

        //show ships
        mainController.shipController.updateShipList(ships, game);

        //show gameField
        self.drawSetupField();
    }

    /*
    Draw button etc for homescreen
    */
    self.drawHomeScreen = function () {
        mainController.shipController.clearPlacedShips();
        $("#alertWrapper").hide();
        $("#setupScreenButtons").hide();
        $("#homeScreenButtons").show();
        $("#setupTable").empty();
        $("#refresh").trigger("click");
    }

    /*
    Draw the game screen
    */
    self.drawGameScreen = function(){
        //Retrieve the allies board, retrieve the enemies board
        //Draw both boards
        //draw ships on boards 
        //Set all occupied cells states
        
    }


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

        /*
  TODO : Draw allied gamefield
         */
        self.drawAlliedField = function () {

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
            
            //set ships
            



        };

        //-------------- Listeners/Utility (for visually showing ships in the setuptable)
        //Setup Cell listeners
        $(".setuptd").hover(function () {
            var td = $(this);
            self.onHover(td);
        });

        $(".setuptd").mouseleave(function () {
            var td = $(this);
            self.onMouseLeave(td);
        });

        $(".setuptd").click(function () {
            var td = $(this);
            mainController.shipController.onMouseClick(td);
        });
    }


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


    //----------------END listeners/utility






}