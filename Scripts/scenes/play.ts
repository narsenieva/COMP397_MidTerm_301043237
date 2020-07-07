module scenes {
    export class PlayScene extends objects.Scene {
        // Variables
        public playLabel: objects.Label;
        private nextButton: objects.Button;
        private backButton: objects.Button;
        private background: objects.Background;
        private player: objects.Button;

        private scoreBoard : objects.Score;
        private sum : number = 0;

        private startTime : any;
        private endTime : any;

        public count: number = 0;
        private timer : number = 0;
        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager);

            this.Start();
        }

        public Start():void {
            // Inintialize our variables
            this.background = new objects.Background(this.assetManager);
            this.playLabel = new objects.Label("GO!", "20px", "Consolas", "#000000", 300, 60, true);
            this.nextButton = new objects.Button(this.assetManager, "nextButton", 500, 500);
            this.backButton = new objects.Button(this.assetManager, "backButton", 0, 500);
            
            this.scoreBoard = new objects.Score;
            objects.Game.score = this.scoreBoard;
            this.Main();
        }

        public Update():void {
           
           // console.log("LEVEL SCORE IS: " + this.scoreBoard.Count);
           //console.log("Sum: " + this.sum);
            if(this.scoreBoard.Count >= 10) {
                var average = this.sum / 10;
                this.scoreBoard.Score = average * 0.001;
                console.log("Final: " + this.scoreBoard.Score);
                objects.Game.currentScene = config.Scene.OVER;
            }
        }

        public Main():void {
            this.Timer();
            this.addChild(this.background);
            this.addChild(this.playLabel);
            this.addChild(this.nextButton);
            this.addChild(this.backButton);
            this.AddButton();
            // Register for click events
            this.nextButton.on("click", this.nextButtonClick);
            this.backButton.on("click", this.backButtonClick);           
        }

        private nextButtonClick():void {
            objects.Game.currentScene = config.Scene.OVER;
        }

        private backButtonClick():void {
            objects.Game.currentScene = config.Scene.START;
        }

        public AddButton() {
            this.player = new objects.Button(this.assetManager, "player", this.Random(0, 500), this.Random(50, 450));
            this.addChild(this.player);
            this.startTime = new Date().getTime();
            this.player.on("click", this.playerClick.bind(this));
        }

        public playerClick() : void {
            this.scoreBoard.Count++;
            this.removeChild(this.player);
            this.endTime = new Date().getTime();
            //console.log("Start: " + this.startTime + " " + "End: " + this.endTime)
            var result = this.endTime - this.startTime;
            this.sum += result;
            this.AddButton();
        }

        private Random(min, max) : number {
            return Math.random() * (max - min) + min;
        }

        private Timer() : void {
            let intervalId = setInterval(() => {
               this.timer = this.timer + 1;
               if(this.timer < 10) {
                    this.scoreBoard.Time = "0:0" + this.timer.toString();
                    this.playLabel.text = this.scoreBoard.Time;
                } else if (this.timer >= 10 && this.timer <= 59) {
                    this.scoreBoard.Time = "0:" + this.timer.toString();
                    this.playLabel.text = this.scoreBoard.Time;  
                } else if (this.timer >= 60) {
                    this.scoreBoard.Time = "1:00";  
                    this.playLabel.text = this.scoreBoard.Time;
                    this.scoreBoard.Score = (this.sum / this.scoreBoard.Count) * 0.001;
                    objects.Game.currentScene = config.Scene.OVER;
                }
            }, 1000)
        }
    }
} 