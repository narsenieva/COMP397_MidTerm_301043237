
(function () {
    let canvas = document.getElementById("canvas");
    let stage:createjs.Stage;
    let helloLabel: createjs.Text;

    function Init() {
        console.log("Initializing Start");
        let x: number = 10;
        let y: string = "Nataiia";
    }

    function Start() {
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20);

    }
    window.onload = Init;
})();