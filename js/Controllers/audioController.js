function AudioController() {
    var self = this;
    
    var au_boom = new Audio('audio/explosion.wav');
    var au_splash = new Audio('audio/splash.wav');
    var au_victory = new Audio('audio/victory.ogg');
    

    self.splash = function () {
        au_splash.play();
    }

    self.boom = function () {
        au_boom.play();
    }

    self.victory = function () {
        au_victory.play();
    }
}