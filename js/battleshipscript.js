
//TODO aan het einde nog ff alles doorlopen en kijken welke code schonr kan
//of er dingen dubbel worden gedaan in viewcontroller, of ze beter verdeeld kunnen worden in andere klassen, etc
//TODO test met iemand anders game wat er gebeurd als je een game joined waar het niet jouw beurt is.
//waarschijnlijk moet je nog implementeren dat als de socket een update geeft voor de huidige game je opnieuw checkt of het jouw beurt is . 


//PROBLEEM: omdat de socket na de victory nog een turn update binnen krijgt wordt het bordt nog een keer geupdate.
//En dus wordt ook een vicroty icon weggehaald als de game opnieuw getekent wordt.
//Als je in de boardcontroller luistert naar reactio van de api om te kijken of je gewonnen hebt komt
//dit trager dan de socket, dus zelfs dan wordt de game nog geupdate en opnieuw getekend
var baseurl = "https://zeeslagavans.herokuapp.com/";
var accesstoken = "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImIuYnJvdXdlckBzdHVkZW50LmF2YW5zLm5sIg.Je0wnMvxSEHa1v_NJCGjivIBJ4OrOujaWKcHjsStSa8";
var user = 'b.brouwer@student.avans.nl';
var mainController = new MainController();
mainController.socketController.initialize();


$(document).ready(function () {

    $("#dialog-confirm").dialog({
        closeOnEscape: false,
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        open: function (event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
        },
        buttons: {
            "Yes": function () {
                $(this).dialog("close");
                mainController.initialize();
            },
            "No": function () {
                $(this).dialog("close");
                mainController.viewController.drawUserChange();
            }
        }


    });


});
