
(function () {
    let canvas = document.getElementById("canvas");
    let stage:createjs.Stage;
    let helloLabel: createjs.Text;

    function Init() {
        console.log("Initializing Start");
        let x: number = 10;
        let y: string = "Nataiia";
        Start();
    }

    function Start() {
        console.log("Starting Application...");

        // Initialize CreateJS
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20);

        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", Update);

        Main();
    }
    function Update() {
        stage.update();
        helloLabel.scaleX += 0.001;
        helloLabel.scaleY += 0.001;
    }


    function Main() {
        console.log("Game Start");
        helloLabel = new createjs.Text("Hello World!", "40px Consolas", "#000000");
        helloLabel.x = 100;
        helloLabel.y = 100;

        stage.addChild(helloLabel);
    }
    window.onload = Init;
})();