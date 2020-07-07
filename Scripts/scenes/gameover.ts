module scenes {
    export class GameOverScene extends objects.Scene {
        // Variables
        private gameOverLabel: objects.Label;
        private backButton: objects.Button;
        private background: objects.Background;
        private resultsLabel: objects.Label;

        private playScene : scenes.PlayScene;
        private score : string;
        private time : string;

        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager);
            this.Start();
        }

        // Method
        public Start():void {

            this.playScene = new scenes.PlayScene(this.assetManager);
            this.score = this.playScene.count.toString();
            // Initialize our variables
            this.background = new objects.Background(this.assetManager);
            this.gameOverLabel = new objects.Label(
                "You did it!", "40px", "Consolas", "#000000", 300, 100, true);

            this.resultsLabel = new objects.Label(
                "You destroyed " + this.score + "/10 factories in " + "" + "seconds!",
                "20px", "Consolas", "#000000", 200, 300, true);
            this.backButton = new objects.Button(this.assetManager, "backButton", 250, 300);
            this.Main();
        }

        public Update():void {}

        public Main():void {
            this.addChild(this.background);
            this.addChild(this.gameOverLabel);
            this.addChild(this.backButton);
            this.addChild(this.resultsLabel);

            this.backButton.on("click", this.backButtonClick);
        }

        private backButtonClick():void {
            objects.Game.currentScene = config.Scene.START;
        }
    }
} 