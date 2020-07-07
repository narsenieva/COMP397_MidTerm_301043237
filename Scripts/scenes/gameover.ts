module scenes {
    export class GameOverScene extends objects.Scene {
        // Variables
       
        private backButton: objects.Button;
        private background: objects.Background;

        private gameOverLabel: objects.Label;
        private resultLabel: objects.Label;
        private averageLabel : objects.Label;

        private scoreTable : objects.ScoreTable;

        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager);
            this.Start();
        }

        // Method
        public Start():void {
            // Initialize our variables
            this.background = new objects.Background(this.assetManager);
            //this.scoreTable = new objects.ScoreTable();
            this.gameOverLabel = new objects.Label(
                "You did it! ", "40px", "Consolas", "#000000", 300, 100, true);
            this.resultLabel = new objects.Label(
                objects.Game.scoretable.Count + "/10 for "
                + objects.Game.scoretable.Time + " seconds!",
                "20px", "Consolas", "#000000", 300, 200, true
            );

            this.averageLabel = new objects.Label(
               "Your average responce rate is: "
                + objects.Game.scoretable.Average.toFixed(2) + " seconds!",
                "20px", "Consolas", "#000000", 300, 300, true
            );
                this.backButton = new objects.Button(this.assetManager, "backButton", 250, 500);
            this.Main();
        }

        public Update():void {}

        public Main():void {
            this.addChild(this.background);
            this.addChild(this.gameOverLabel);
            this.addChild(this.resultLabel);
            this.addChild(this.averageLabel);
            this.addChild(this.backButton);

            this.backButton.on("click", this.backButtonClick);
        }

        private backButtonClick():void {
            objects.Game.currentScene = config.Scene.START;
        }
    }
} 