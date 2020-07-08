module scenes {
    export class StartScene extends objects.Scene {
        // Variables
        private background: objects.Background;
        private welcomeLabel: objects.Label;
        private welcomeLabelDouble: objects.Label;
        private startButton: objects.Button;

        private creditsLabel : objects.Label;

        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager);
            this.Start();
        }
        // Methods
        public Start():void {
            // Initialize our objects for this scene
            this.background = new objects.Background(this.assetManager);

            this.welcomeLabelDouble =  new objects.Label("Main Menu", "60px", "Notable", "#6f0000", 300, 103, true);
            this.welcomeLabel = new objects.Label("Main Menu", "60px", "Notable", "#9a0b0b", 300, 100, true);
            
            // NOTE: PreloadJS manifest id
            this.startButton = new objects.Button(this.assetManager, "startButton", 180, 300);
            this.startButton.scaleX -= 0.5;
            this.startButton.scaleY -= 0.5;
            this.creditsLabel = new objects.Label("By Nataliia Arsenieva - 301043237 - COMP397_S2020 - Midterm",
            "15px", "Consolas", "#FFFFFF", 300, 550, true);
            this.Main();
        }

        public Update():void {}

        public Main():void {
            // Add items to the scen
            this.addChild(this.background);
            this.addChild(this.welcomeLabelDouble);
            this.addChild(this.welcomeLabel);
            this.addChild(this.startButton);
            //this.addChild(this.creditsLabel);
            this.startButton.on("click", this.startButtonClick);
        }

        private startButtonClick():void {
            // Change from START to GAME scene
            objects.Game.currentScene = config.Scene.GAME;
        }
    }
} 