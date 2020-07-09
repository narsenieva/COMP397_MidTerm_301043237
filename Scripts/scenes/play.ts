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

            // Inintialize our variables
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
           var average = this.sum / objects.Game.scoretable.Count;
           objects.Game.scoretable.Average = average * 0.001;

           if(objects.Game.scoretable.Count >= 10)
                this.scoreBoard.countLabel.x = 272;
           
            if(objects.Game.scoretable.Count >= 20) {
                clearInterval(this.interval);
                this.timer = 0;
                objects.Game.currentScene = config.Scene.OVER;
            }
        }

        public Main():void {
            this.Timer();
            this.addChild(this.background);
           
            this.addChild(this.nextButton);
            this.addChild(this.backButton);

            this.addFactory();

            this.addChild(this.timerImage);
            this.addChild(this.scoreBoard.timeLabel);
            this.addChild(this.scoreBoard.countLabel);
            // Register for click events
            this.nextButton.on("click", this.nextButtonClick);
            this.backButton.on("click", this.backButtonClick);           
        }

        private nextButtonClick():void {
            clearInterval(this.interval);
            this.timer = 0;
            objects.Game.currentScene = config.Scene.OVER;
        }
        private backButtonClick():void { 
            location.reload(); 
            objects.Game.currentScene = config.Scene.START; 
        }

        public addFactory() {
            this.player = new objects.Button(this.assetManager, "player", this.Random(0, 500), this.Random(50, 450));
            this.addChild(this.player);
            this.startTime = new Date().getTime();
            this.player.on("click", this.onFactoryClick.bind(this));
        }

        public onFactoryClick() : void {
            objects.Game.scoretable.Count++;
            this.popSound = createjs.Sound.play("pop");
            this.popSound.volume = 0.01;
            this.scoreBoard.countLabel.text = this.scoreBoard.Count + "/20";
            this.removeChild(this.player);
            this.endTime = new Date().getTime();
            var result = this.endTime - this.startTime;
            objects.Game.scoretable.ResultArrray.push(result);
            this.sum += result;
            this.addFactory();
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