function AudioController() {
    var self = this;
    
    var au_boom = new Audio('audio/explosion.wav');
    var au_splash = new Audio('audio/splash.wav');
    var au_victory = new Audio('audio/victory.ogg');
    var au_defeat = new Audio('audio/defeat.mp3');

    self.splash = function () {
        au_splash.play();
    }

    self.boom = function () {
        au_boom.play();
    }

    self.victory = function () {
        setTimeout(function(){ au_victory.play();}, 2000);
    }
    
    self.defeat = function(){
       setTimeout(function(){ au_defeat.play();}, 2000);
    }
}