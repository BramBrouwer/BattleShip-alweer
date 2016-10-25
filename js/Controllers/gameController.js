
function GameController() {
    var self = this;

    /*
      Update list to show games 
       */
    self.updateGameList = function (games) {

        $("#gamelist").empty();//empty list 

        //Add list header and divider
        var listBrand = $('<li>');
        listBrand.addClass("sidebarHeader");
        listBrand.addClass("sidebar-brand");
        listBrand.text("Games");
        var divider = $('<li>');
        divider.addClass("divider");

        $("#gamelist").append(listBrand);
        $("#gamelist").append(divider);
        var gamesfound = false;
        
        $(games).each(function (index) {
            gamesfound = true;
            var listItem = $('<li>');
            var anchor = $('<a>');
            listItem.append(anchor);
            anchor.text("You VS. " + this.enemyName + " - " + this.gameStatus);
            anchor.css("font-weight", "bold");

            listItem.game = this;
            $("#gamelist").append(listItem);

            listItem.click(function (e) {
                if (listItem.game.gameStatus == "setup") {
                    mainController.apiController.getShips(listItem.game);
                }
                if(listItem.game.gameStatus == "started"){
                    
                }
            });

        });
        if (!gamesfound) {
            mainController.viewController.showInfo("No games found, request a new game vs AI or another player using the buttons above,");
        }

    }

}