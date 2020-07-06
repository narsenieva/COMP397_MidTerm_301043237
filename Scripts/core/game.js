(function () {
    var canvas = document.getElementById("canvas");
    var stage;
    var helloLabel;
    function Init() {
        console.log("Initializing Start");
        var x = 10;
        var y = "Nataiia";
    }
    function Start() {
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20);
    }
    window.onload = Init;
})();
//# sourceMappingURL=game.js.map