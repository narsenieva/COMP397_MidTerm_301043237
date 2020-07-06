
(function () {
    let canvas = document.getElementById("canvas");
    let stage:createjs.Stage;
    let helloLabel: objects.Label;
    let button: objects.Button;

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
    }


    function Main() {
        console.log("Game Start");
        
        // Instantiate Label
        helloLabel = new objects.Label("Hello World", "40px", "Consolas", "#000000", 320, 240, true);

        // Instantiate Button
        button = new objects.Button("./Assets/startButton.png", 320, 340);
        button.regY = 24.5;
        button.regX = 95;
        button.on("click", clickMeButtonClicked);

        stage.addChild(helloLabel);
        stage.addChild(button);
    }

    function clickMeButtonClicked():void {
        helloLabel.text = "Clicked";
        console.log("I am clicked!");
    }


    window.onload = Init;
})();