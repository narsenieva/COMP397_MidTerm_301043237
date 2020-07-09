module scenes {
    export class GameOverScene extends objects.Scene {
        // Variables
       
        private backButton: objects.Button;
        private background: objects.Background;

        private gameOverLabel: objects.Label;
        private resultLabel: objects.Label;
        private averageLabel : objects.Label;

        private resultsArrayLabel : objects.Label;

        private scoreTable : objects.ScoreTable;

        private length : number = 0;
        private count : number = 1;

        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager);
            this.Start();
        }

        // Method
        public Start():void {
            // Initialize our variables
            this.background = new objects.Background(this.assetManager, "background");
            //this.scoreTable = new objects.ScoreTable();
            var time = 60 - parseInt(objects.Game.scoretable.Time.slice(-2));
            this.gameOverLabel = new objects.Label(
                "You did it! ", "40px", "Consolas", "#000000", 300, 70, true);
            this.resultLabel = new objects.Label(
                objects.Game.scoretable.Count + "/20 for "
                + time + " seconds!",
                "20px", "Consolas", "#000000", 300, 120, true
            );

            this.averageLabel = new objects.Label(
               "Your average responce rate is: "
                + objects.Game.scoretable.Average.toFixed(2) + " seconds!",
                "20px", "Consolas", "#000000", 300, 180, true
            );

            this.resultsArrayLabel = new objects.Label(
                "--- TOP RESULTS ---", "20px", "Consolas", "#000000", 300, 220, true
            );
                this.backButton = new objects.Button(this.assetManager, "backButton", 250, 400);
                this.backButton.scaleX -= 0.65;
                this.backButton.scaleY -= 0.65;

                objects.Game.scoretable.ResultArrray.sort((a, b) => a - b);

                console.log("Count: " + objects.Game.scoretable.Count);
                if(objects.Game.scoretable.Count < 5 && objects.Game.scoretable.Count > 0) 
                    length = objects.Game.scoretable.Count;
                 else 
                    length = 5;
    
                console.log("Length: " + length);
                for (let i = 0; i < length; i++) {
                    this.resultsArrayLabel.text += "\n\n     #" + this.count + " - " + (objects.Game.scoretable.ResultArrray[i] * 0.001).toFixed(2);
                    console.log("Value [" + i + "] is: " + objects.Game.scoretable.ResultArrray[i].toFixed(2));
                    this.count++
                }
            this.Main();
        }

        public Update():void {}

        public Main():void {
            this.addChild(this.background);
            this.addChild(this.gameOverLabel);
            this.addChild(this.resultLabel);
            this.addChild(this.averageLabel);
            this.addChild(this.backButton);
            this.addChild(this.resultsArrayLabel);

            

            this.backButton.on("click", this.backButtonClick);
        }

        private backButtonClick():void {
            objects.Game.scoretable.Average = 0;
            objects.Game.scoretable.Count = 0;
            objects.Game.scoretable.Time = "";
            location.reload();
            //objects.Game.currentScene = config.Scene.START;
        }
    }
} 