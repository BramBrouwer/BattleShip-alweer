function ShipController(input) {

    var self = this;
    var selectedShip;
    var alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    var orientation = "horizontal";
    var placedShips = [];
    var currentGameID;



    /*
    Update list to show ships for setting up game
    */
    self.updateShipList = function (ships, game) {

        currentGameID = game.gameID;


        $("#gamelist").empty();  //Empty the list 

        //Add list header and divider
        var listBrand = $('<li>');
        listBrand.addClass("sidebarHeader");
        listBrand.addClass("sidebar-brand");
        listBrand.text("Ships");
        var divider = $('<li>');
        divider.addClass("divider");
        $("#gamelist").append(listBrand);
        $("#gamelist").append(divider);

        //Add ships to list
        $(ships).each(function (index) {
            var listItem = $('<li>');
            var anchor = $('<a>');
            listItem.append(anchor);
            anchor.text(this.name + " - " + this.length);
            anchor.css("font-weight", "bold");
            listItem.game = this;
            $("#gamelist").append(listItem);
            var ship = this;

            //add onclick to listitems
            listItem.click(function (e) {
                selectedShip = ship;
            });
        });
    }


    /*
    Validate ship placement on mouse click
    */
    self.onMouseClick = function (cell) {

        var data = cell.data('field');
        var retShip = selectedShip;
        if(selectedShip == null){
             mainController.viewController.showError("Please select a ship before trying to place one.");
            return;
        }
        
        // check if ship is fully within field
        if (orientation == "vertical") {
            if (data.y + selectedShip.length > 11) {
                mainController.viewController.showError("Please place ship fully within field.");
                return;
            }
        } else {
            var xIndex = self.getAlphaIndex(data.x);
            if (xIndex + selectedShip.length >= 11) {
                mainController.viewController.showError("Please place ship fully within field.");
                return;
            }
        }
        //More validation
        self.addPlacedShip(data);

    }

    self.addPlacedShip = function (cell) {

        //Check if shiplist is full 
        if (placedShips.length == 5) {
            mainController.viewController.showError("All ships have been placed.");
            return false;
        }

        //check if ship has been placed already/collides with another ship
        if (!self.checkifPlaced() || !self.checkCollision(cell)) {
            return false;
        }

        //set ship orientation
        var retShip = selectedShip;
        if (orientation == "vertical") {
            retShip.isVertical = true;
        } else { retShip.isVertical = false; }

        //Add startcell to ship
        retShip.startCell = { "x": cell.x, "y": cell.y }

        //Update css to permanently show placed ship;
        self.showPlacedShip(cell);

        //add ship to array of placed ships
        placedShips[placedShips.length] = retShip;
        selectedShip = null;
    }



    self.postShips = function () {

        if (placedShips.length != 5) {
            mainController.viewController.showError("Not all ships have been placed.");
            return false;
        }
        mainController.apiController.postGameboard(currentGameID, placedShips);
    }




    //---------------Utility

    self.checkCollision = function (cell) {
        //i know this looks bad but it needs to be performed before placing the ship
        //if we check it while placing and we find out the 3rd cell overlaps
        //the first 2 cells will still be coloured otherwise
        if (orientation == "vertical") {
            for (var i = 0; i < selectedShip.length; i++) {

                var currentCell = $("#" + cell.x + (cell.y + i));
                var currentCellData = currentCell.data('field');
                if (currentCellData.state != "free") {
                    mainController.viewController.showError("This ship overlaps with another ship.");
                    return false;
                }
            }
        } else {
            var xIndex = self.getAlphaIndex(cell.x);
            for (var i = 0; i < selectedShip.length; i++) {
                var currentCell = $("#" + alpha[xIndex + i] + cell.y);
                var currentCellData = currentCell.data('field');
                if (currentCellData.state != "free") {
                    mainController.viewController.showError("This ship overlaps with another ship.");
                    return false;
                }
            }
        }
        return true;
    }

    self.checkifPlaced = function () {
        //Chec if ship has already been placed
        for (var i = 0; i < 5; i++) {

            var currentShip = placedShips[i];

            if (currentShip != null) {

                if (currentShip.name == selectedShip.name) {
                    mainController.viewController.showError("You already placed this ship.");
                    return false;
                }
            }
        }
        return true;
    }

    self.showPlacedShip = function (cell) {
        //Update css to permanently show placed ship;
        if (orientation == "vertical") {
            for (var i = 0; i < selectedShip.length; i++) {
                var currentCell = $("#" + cell.x + (cell.y + i));
                var currentCellData = currentCell.data('field');
                currentCellData.state = "occupied";
                currentCell.css("background-color", "DarkCyan");
            }
        } else {
            var xIndex = self.getAlphaIndex(cell.x);
            for (var i = 0; i < selectedShip.length; i++) {
                var currentCell = $("#" + alpha[xIndex + i] + cell.y);
                var currentCellData = currentCell.data('field');
                currentCellData.state = "occupied";
                currentCell.css("background-color", "DarkCyan");
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

    self.getOrientation = function () {
        return orientation;
    }
    self.setOrientation = function (input) {
        orientation = input;
    }
    self.getSelectedShip = function (input) {
        return selectedShip;
    }
    self.clearPlacedShips = function () {
        placedShips = [];
    }
    //------------END Utility


}

