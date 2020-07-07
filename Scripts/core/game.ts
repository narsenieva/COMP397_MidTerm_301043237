
(function () {
    let canvas = document.getElementById("canvas");
    let stage:createjs.Stage;

    let assetManager:createjs.LoadQueue;
    let assetManifest: any[];

    let currentScene: objects.Scene;
    let currentState: number;

    assetManifest = [
        {id:"startButton", src:"./Assets/startButton.png"},
        {id:"nextButton", src:"./Assets/nextButton.png"},
        {id:"backButton", src:"./Assets/backButton.png"},
        {id:"background", src:"./Assets/background.png"},
        {id:"player", src:"./Assets/player.png"}
    ];

    function Init() {
       // console.log("Initializing Start");

        assetManager = new createjs.LoadQueue();
        assetManager.installPlugin(createjs.Sound);
        assetManager.loadManifest(assetManifest);
        assetManager.on("complete", Start, this);

        Start();
    }

    function Start() {
        //console.log("Starting Application...");

        // Initialize CreateJS
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20);

        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", Update);

        objects.Game.stage = stage;
        objects.Game.currentScene = config.Scene.START;
        currentState = config.Scene.START;
       
        Main();
    }
    function Update() {
        //console.log("TIME IS: " + objects.Game.scoretable.Time);

        if(currentState != objects.Game.currentScene) {
            //console.log("Changing scenes to " + objects.Game.currentScene);
            Main();
        }
        currentScene.Update();
        stage.update();
    }


    function Main() {
        //console.log("Game Start");
        // Finite State Machine
        switch(objects.Game.currentScene)
        {
            case config.Scene.START:
                stage.removeAllChildren();
                currentScene = new scenes.StartScene(assetManager);
                stage.addChild(currentScene);
            break;
            case config.Scene.GAME:
                stage.removeAllChildren();
                currentScene = new scenes.PlayScene(assetManager);
                stage.addChild(currentScene);
            break;
            case config.Scene.OVER:
                stage.removeAllChildren();
                currentScene = new scenes.GameOverScene(assetManager);
                stage.addChild(currentScene);
            break;
        }
        currentState = objects.Game.currentScene;
        
    }

    window.onload = Init;
})();