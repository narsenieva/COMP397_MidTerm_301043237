module scenes {
    export class PlayScene extends objects.Scene {
        // Variables
        private playLabel: objects.Label;
        private nextButton: objects.Button;
        private backButton: objects.Button;
        private background: objects.Background;
        private player: objects.Button;

        private startTime : any;
        private endTime : any;
        private finalTime : any;

        private count: number = 0;

        private counter : number = 0;
        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager);

            this.Start();
        }

        public Start():void {
            console.log("Play scene start");
            // Inintialize our variables
            this.background = new objects.Background(this.assetManager);
            this.playLabel = new objects.Label( "GO!", "20px", "Consolas", "#000000", 300, 60, true);
            this.nextButton = new objects.Button(this.assetManager, "nextButton", 500, 500);
            this.backButton = new objects.Button(this.assetManager, "backButton", 0, 500);
            
            this.Main();
        }

        public Update():void {
            //console.log("Final: " + this.finalTime);
            if(this.count >= 10) {
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
            this.count++;
            this.removeChild(this.player);
            this.endTime = new Date().getTime();
            //console.log("Start: " + this.startTime + " " + "End: " + this.endTime)
            this.finalTime = this.endTime - this.startTime;
            this.AddButton();
        }

        private Random(min, max) : number {
            return Math.random() * (max - min) + min;
        }

        private Timer() : void {
            let intervalId = setInterval(() => {
               this.counter = this.counter + 1;
               if(this.counter < 10) {
                    this.playLabel.text = "0:0" + this.counter.toString();
                } else if (this.counter >= 10 && this.counter <= 59) {
                    this.playLabel.text = "0:" + this.counter.toString();  
                }
            }, 1000)
        }
    }
} 