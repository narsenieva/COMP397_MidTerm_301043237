module scenes {
    export class PlayScene extends objects.Scene {
        // Variables

        // -- LABELS --
        public timeLabel: objects.Label;
        public countLabel: objects.Label;
        // -- BUTTONS --
        private nextButton: objects.Button;
        private backButton: objects.Button;
        // -- GAME OBJECTS --
        private background: objects.Background;
        private timerImage: objects.Background;
        private player: objects.Button;
        // -- SCOREBOARD
        private scoreBoard : objects.ScoreTable;
        private sum : number = 0;
        private startTime : any;
        private endTime : any;
        // -- TIMER --
        private timer : number = 60;
        private interval : any;
        // -- SOUNDS --
        private popSound:createjs.AbstractSoundInstance

        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager);

            this.Start();
        }

        public Start():void {

            // Inintialize variables
            this.scoreBoard = new objects.ScoreTable();
            objects.Game.scoretable = this.scoreBoard;
            this.background = new objects.Background(this.assetManager, "background");
            this.nextButton = new objects.Button(this.assetManager, "nextButton", 500, 520);
            this.backButton = new objects.Button(this.assetManager, "backButton", 30, 520);
            this.timerImage = new objects.Background(this.assetManager, "timer");

            // Labels and Images formatting
            this.timerImage.x = 243; this.timerImage.y = 30;

            this.scoreBoard.countLabel.x = 277; this.scoreBoard.countLabel.y = 100;
            this.scoreBoard.timeLabel.x = 280; this.scoreBoard.timeLabel.y = 53;

            this.scoreBoard.countLabel.color = "#ae1111"; 
            this.scoreBoard.timeLabel.color = "#0cff00";

            this.scoreBoard.countLabel.scaleX += 0.25; this.scoreBoard.countLabel.scaleY += 0.25;
            this.scoreBoard.timeLabel.scaleX += 0.25; this.scoreBoard.timeLabel.scaleY += 0.25;

            this.backButton.scaleX -= 0.8; this.backButton.scaleY -= 0.8;
            this.nextButton.scaleX -= 0.8; this.nextButton.scaleY -= 0.8;

            this.Main();
        }

        public Update():void {
           // Calculating average
           var average = this.sum / objects.Game.scoretable.Count;
           objects.Game.scoretable.Average = average * 0.001;
           // Modifying the timer display
           if(objects.Game.scoretable.Count >= 10)
                this.scoreBoard.countLabel.x = 272;
            // Checking for the winning condition
            if(objects.Game.scoretable.Count >= 20) {
                clearInterval(this.interval);
                this.timer = 0;
                objects.Game.currentScene = config.Scene.OVER;
            }
        }

        public Main():void {
            this.Timer(); // Start the timer
            this.addChild(this.background);
            this.addChild(this.nextButton);
            this.addChild(this.backButton);

            this.addFactory(); // Adding a factory button

            this.addChild(this.timerImage);
            this.addChild(this.scoreBoard.timeLabel);
            this.addChild(this.scoreBoard.countLabel);
            // Register for click events
            this.nextButton.on("click", this.nextButtonClick);
            this.backButton.on("click", this.backButtonClick);           
        }

        private nextButtonClick():void { // Next Button Click Event
            clearInterval(this.interval);
            this.timer = 0;
            objects.Game.currentScene = config.Scene.OVER;
        }
        private backButtonClick():void { // Back Button Click Event
            location.reload(); 
            objects.Game.currentScene = config.Scene.START; 
        }

        // Adds factory to the stage
        public addFactory() {
            this.player = new objects.Button(this.assetManager, "player", this.Random(0, 500), this.Random(60, 450));
            this.addChild(this.player);
            this.startTime = new Date().getTime(); // Setting the start time
            this.player.on("click", this.onFactoryClick.bind(this));
        }

        // Click Factory event
        public onFactoryClick() : void {
            objects.Game.scoretable.Count++; // Increase the count of factories
            this.popSound = createjs.Sound.play("pop"); // Play sound
            this.popSound.volume = 0.01;
            this.scoreBoard.countLabel.text = this.scoreBoard.Count + "/20"; // Display the updated value
            this.removeChild(this.player); // Remove child
            this.endTime = new Date().getTime(); // Setting the end time
            var result = this.endTime - this.startTime; // Calculating the result
            objects.Game.scoretable.ResultArrray.push(result); // Pushing it to the array of results
            this.sum += result; // Incresing the overall sum
            this.addFactory(); // Run the method again
        }
        // Generate and return random number
        private Random(min, max) : number {
            return Math.random() * (max - min) + min;
        }

        private Timer() : void {
            this.interval = setInterval(() => {
            this.timer = this.timer - 1; // Decrease timer by 1

            // Timer formatting
            if (this.timer % 60 < 10) 
                this.scoreBoard.Time = Math.floor(this.timer / 60) + ":0" + this.timer % 60; 
            else 
                this.scoreBoard.Time = Math.floor(this.timer / 60) + ":" + this.timer % 60; 
               
            this.scoreBoard.timeLabel.text = this.scoreBoard.Time; // Assign value to the label
               
            if (this.timer == 0) { // End game
                clearInterval(this.interval);
                this.timer = 0;
                // Assign 60 seconds to Time variable
                this.scoreBoard.Time = "60";
                objects.Game.scoretable.Time = "60";
                // Calculate average
                objects.Game.scoretable.Average = (this.sum / objects.Game.scoretable.Count) * 0.001;
                objects.Game.currentScene = config.Scene.OVER; // Go to GameOver scene
            } }, 1000)
        }
    }
} 