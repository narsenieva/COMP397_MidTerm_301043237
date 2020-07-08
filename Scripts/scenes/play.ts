module scenes {
    export class PlayScene extends objects.Scene {
        // Variables
        public timeLabel: objects.Label;
        public countLabel: objects.Label;

        private nextButton: objects.Button;
        private backButton: objects.Button;

        private player: objects.Button;

        private background: objects.Background;


        private scoreBoard : objects.ScoreTable;
        private sum : number = 0;

        private startTime : any;
        private endTime : any;
        private timer : number = 60;

        private interval : any;

        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager);

            this.Start();
        }

        public Start():void {
            // Inintialize our variables
            this.scoreBoard = new objects.ScoreTable();
            objects.Game.scoretable = this.scoreBoard;

            this.background = new objects.Background(this.assetManager);
            this.nextButton = new objects.Button(this.assetManager, "nextButton", 500, 500);
            this.backButton = new objects.Button(this.assetManager, "backButton", 0, 500);

            this.Main();
        }

        public Update():void {
           
           // console.log("LEVEL SCORE IS: " + this.scoreBoard.Count);
           //console.log("Sum: " + this.sum);
            if(objects.Game.scoretable.Count >= 20) {
                var average = this.sum / 10;
                clearInterval(this.interval);
                //this.scoreBoard.Time = "";
                this.timer = 0;
                //objects.Game.scoretable.Time = "";
                objects.Game.scoretable.Average = average * 0.001;
                objects.Game.currentScene = config.Scene.OVER;
            }
        }

        public Main():void {
            this.Timer();
            this.addChild(this.background);
            this.addChild(this.scoreBoard.timeLabel);
            this.addChild(this.scoreBoard.countLabel);
            this.addChild(this.nextButton);
            this.addChild(this.backButton);
            this.AddButton();
            // Register for click events
            this.nextButton.on("click", this.nextButtonClick);
            this.backButton.on("click", this.backButtonClick);           
        }

        private nextButtonClick():void { objects.Game.currentScene = config.Scene.OVER; }
        private backButtonClick():void { objects.Game.currentScene = config.Scene.START; }

        public AddButton() {
            this.player = new objects.Button(this.assetManager, "player", this.Random(0, 500), this.Random(50, 450));
            this.addChild(this.player);
            this.startTime = new Date().getTime();
            this.player.on("click", this.playerClick.bind(this));
        }

        public playerClick() : void {
            objects.Game.scoretable.Count++;
            this.scoreBoard.countLabel.text = this.scoreBoard.Count + "/20";
            this.removeChild(this.player);
            this.endTime = new Date().getTime();
            var result = this.endTime - this.startTime;
            this.sum += result;
            this.AddButton();
        }

        private Random(min, max) : number {
            return Math.random() * (max - min) + min;
        }

        private Timer() : void {
            this.interval = setInterval(() => {
               this.timer = this.timer - 1;
               if (this.timer % 60 < 10) {
                this.scoreBoard.Time = Math.floor(this.timer / 60) + ":0" + this.timer % 60; 
               } else {
                this.scoreBoard.Time = Math.floor(this.timer / 60) + ":" + this.timer % 60; 
               } 
               this.scoreBoard.timeLabel.text = this.scoreBoard.Time;
               if (this.timer == 0) {
                clearInterval(this.interval);
                this.scoreBoard.Time = "60";
                this.timer = 0;
                objects.Game.scoretable.Time = "60";
                objects.Game.scoretable.Average = (this.sum / objects.Game.scoretable.Count) * 0.001;
                objects.Game.currentScene = config.Scene.OVER;
            }
            }, 1000)
        }
    }
} 