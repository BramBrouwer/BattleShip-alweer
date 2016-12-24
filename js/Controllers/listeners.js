function Listeners() {
    var self = this;


    self.initShotListeners = function () {
        console.log("Shot listeners initialized");
        $(".enemytd").click(function () {
            var td = $(this);
            mainController.boardController.enemytdClick(td);
        });

        $(".enemytd").hover(function () {
            var td = $(this);
            mainController.boardController.enemytdHover(td);
        });
    }


    self.initSetupListeners = function () {
        $(".setuptd").hover(function () {
            var td = $(this);
            mainController.viewController.drawSelectedShip(td);
        });

        $(".setuptd").mouseleave(function () {
            var td = $(this);
            mainController.viewController.redrawSelectedShip(td);
        });

        $(".setuptd").click(function () {
            var td = $(this);
            mainController.shipController.onMouseClick(td);
        });
    }

    //Listeners for elements that exist at startup
    $(document).ready(function () {




        $("#formSubmit").click(function () {

            var valid = false;
            var emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
            var email = $("#email").val();
            var accessTok = $("#at").val();
            
            var emailValid = emailRegex.test(email);
            
            if(!emailValid){
                mainController.viewController.showError("No valid email given!");
                return;
            }
            if(accessTok == ""){
                mainController.viewController.showError("No AccessToken given!");
                return;
            }
            
            if(emailValid && accessTok != ""){
               //Update reference to user and email. 
               user = email;
               accesstoken = "?token="+accessTok;
               mainController.viewController.drawHomeScreen();
            }
            
            
            console.log(emailValid);
        });

        $("#newAIGame").click(function () {
            console.log("x");
            mainController.apiController.newAIGame();
        });

        $("#refresh").click(function () {
            mainController.apiController.getUserGames();
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


}