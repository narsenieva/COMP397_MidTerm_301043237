module scenes {
    export class StartScene extends objects.Scene {
        // Variables
        private background: objects.Background;
        private startButton: objects.Button;
        private instructions: objects.Background;
        //private creditsLabel : objects.Label;

        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager);
            this.Start();
        }
        // Methods
        public Start():void {
            super.Start();
            // Initialize our objects for this scene
            this.background = new objects.Background(this.assetManager, "background");
            this.instructions = new objects.Background(this.assetManager, "instructions");
            
            // NOTE: PreloadJS manifest id
            this.startButton = new objects.Button(this.assetManager, "startButton", 180, 450);
            this.startButton.scaleX -= 0.5;
            this.startButton.scaleY -= 0.5;

            //this.creditsLabel = new objects.Label("By Nataliia Arsenieva - 301043237 - COMP397_S2020 - Midterm",
            //"15px", "Consolas", "#FFFFFF", 300, 550, true);
            this.Main();
        }

        public Update():void {}

        public Main():void {
            // Add items to the scen
            this.addChild(this.background);
            this.addChild(this.instructions);
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