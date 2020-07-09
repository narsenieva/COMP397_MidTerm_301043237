module scenes {
    export class GameOverScene extends objects.Scene {
        // Variables
        // Buttons and Images
        private backButton: objects.Button;
        private background: objects.Background;
        private scoreTableImage : objects.Background;
        // Labels
        private gameOverLabel: objects.Label;
        private resultLabel: objects.Label;
        private averageLabel : objects.Label;
        private resultsArrayLabel : objects.Label;
        // Additional variables
        private length : number = 0;
        private count : number = 1;
        private time : number = 0;
        private average : number = 0;

        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager);
            this.Start();
        }

        // Method
        public Start():void {
            // Initialize variables
            this.background = new objects.Background(this.assetManager, "background");
            this.scoreTableImage = new objects.Background(this.assetManager, "finalTable");
            // -- LABELS --
            this.resultLabel = new objects.Label(objects.Game.scoretable.Count + "/20 factories for ", "25px", "Patrick Hand", "#FFFFFF", 250, 120, true);
            this.averageLabel = new objects.Label("Your average responce rate is: ", "25px", "Patrick Hand", "#FFFFFF", 250, 180, true);
            this.resultsArrayLabel = new objects.Label("--- TOP RESULTS ---", "25px", "Patrick Hand", "#FFFFFF", 300, 220, true);
            // -- BUTTON --
            this.backButton = new objects.Button(this.assetManager, "backButton", 250, 440);
                this.backButton.scaleX -= 0.65;
                this.backButton.scaleY -= 0.65;

            // Formatting output
            // -- TIME --
            if (parseInt(objects.Game.scoretable.Time.slice(-2)) > 1 && parseInt(objects.Game.scoretable.Time.slice(-2)) <= 59) {
                this.time = 60 - parseInt(objects.Game.scoretable.Time.slice(-2));
                this.resultLabel.text += this.time + " seconds!" }
            else if (parseInt(objects.Game.scoretable.Time.slice(-2)) == 60){
                this.resultLabel.text += "1 minute!";
            }
            // -- AVERAGE --
            if (parseFloat(objects.Game.scoretable.Average.toFixed(2)) >= 0) {
                this.average = parseFloat(objects.Game.scoretable.Average.toFixed(2));
                this.averageLabel.text += this.average + " seconds!"
            } else
                this.averageLabel.text += "0 seconds!";
            
            // -- TOP RESULTS TABLE --
            // Sorting from lowest to highest
            objects.Game.scoretable.ResultArrray.sort((a, b) => a - b);
            // Modifying the "length" variable to display only less than 5 results
            if(objects.Game.scoretable.Count < 5 && objects.Game.scoretable.Count >= 0) 
                length = objects.Game.scoretable.Count;
            else 
                length = 5;
    
            // Looping through the results of array
            for (let i = 0; i < length; i++) {
                this.resultsArrayLabel.text += "\n\n         #" 
                                                + this.count + " - " + 
                                                (objects.Game.scoretable.ResultArrray[i] * 0.001).toFixed(2);
                this.count++
            }
            this.Main();
        }

        public Update():void {}

        public Main():void {
            // Adding children to the scene
            this.addChild(this.background);
            this.addChild(this.scoreTableImage);
            this.addChild(this.gameOverLabel);
            this.addChild(this.resultLabel);
            this.addChild(this.averageLabel);
            this.addChild(this.backButton);
            this.addChild(this.resultsArrayLabel);
            // Click event for button
            this.backButton.on("click", this.backButtonClick);
        }

        private backButtonClick():void {
            // Cleaning the results
            objects.Game.scoretable.Average = 0;
            objects.Game.scoretable.Count = 0;
            objects.Game.scoretable.Time = "";
            location.reload(); // -- Reloading the application so that music does not overlap
            objects.Game.currentScene = config.Scene.START;
        }
    }
} 