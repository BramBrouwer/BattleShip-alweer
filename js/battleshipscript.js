
//!! onlick etc nit allemaal in deze document ready, sommige dingen zoals tablecells worden later pas gegenereerd (reden dat je global shit ook niet werkte?)
//TODO new model for fieldcell especially for setup field?
//NICE TO HAVE update ship lsit after placing a ship
//TODO aan het einde nog ff alles doorlopen en kijken welke code schonr kan
//wss door een boardcontroller ofzo toe te voegen
//of er dingen dubbel worden gedaan in viewcontroller, of ze beter verdeeld kunnen worden in andere klassen, etc
//problemen met lisrteners kan je oplossen door listeners te initializen in methodes van de controllers zelf. 
//Check alle listeners en iniialize ze op de juiste plek met hulp methods
var baseurl = "https://zeeslagavans.herokuapp.com/";
var accesstoken = "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImIuYnJvdXdlckBzdHVkZW50LmF2YW5zLm5sIg.Je0wnMvxSEHa1v_NJCGjivIBJ4OrOujaWKcHjsStSa8";
var mainController = new MainController();
mainController.initialize();





$(document).ready(function () {

    ////LISTENERS
    $("#newAIGame").click(function () {
        mainController.apiController.newAIGame();
    });

    $("#refresh").click(function () {
        mainController.apiController.getUserGames();
        mainController.viewController.showInfo("Games loaded.");
    });

    $("#deleteGames").click(function () {
        if (confirm('Are you sure you want to delete your games?')) {
            mainController.apiController.deleteGames();
        }
    });
    $("#newGame").click(function () {
        mainController.apiController.newGame();
    });

    $("#backButton").click(function () {
        mainController.shipController.clearPlacedShips();
        mainController.viewController.drawHomeScreen();
    });

    $("#gs_backButton").click(function () {
        mainController.viewController.drawHomeScreen();
    });

    $("#gs_confirmButton").click(function () {
        mainController.boardController.postShot();
    });


    $("#orientationButton").click(function () {
        currentOr = mainController.shipController.getOrientation();
        if (currentOr == "horizontal") {
            mainController.shipController.setOrientation("vertical");
            $("#orientationButton").text("vertical");
            return;
        }
        if (currentOr == "vertical") {
            mainController.shipController.setOrientation("horizontal");
            $("#orientationButton").text("horizontal");
            return;
        }
    });

    $("#confirmButton").click(function () {
        mainController.shipController.postShips();
    });

    $("#continueButton").click(function () {
        mainController.viewController.drawHomeScreen();
    });






});