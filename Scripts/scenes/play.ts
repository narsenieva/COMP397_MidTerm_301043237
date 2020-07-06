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
        }

        public Main():void {
            this.addChild(this.background);
            this.addChild(this.playLabel);
            this.addChild(this.nextButton);
            this.addChild(this.backButton);
            this.AddButton();
            // Register for click events
            this.nextButton.on("click", this.nextButtonClick);
            this.backButton.on("click", this.backButtonClick);
            //this.player.on("click", this.playerClick);
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
            this.player.on("click", this.playerClick.bind(this));
            this.startTime = new Date().getMilliseconds();
        }

        public playerClick() : void {
            this.removeChild(this.player);
            this.AddButton();
        }

        private Random(min, max) {
            return Math.random() * (max - min) + min;
          }
    }
} 