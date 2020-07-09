module objects {
    export class Scene extends createjs.Container {
        // Variables
        public assetManager: createjs.LoadQueue;
        public backgroundMusic:createjs.AbstractSoundInstance;
        public musicButton: objects.Button;
        public musicPlaying : boolean = false;
        // Constructor
        constructor(assetManager:createjs.LoadQueue)
        {
            super();

            this.assetManager = assetManager;
        }
        // Methods
        public Start():void {
            this.backgroundMusic = createjs.Sound.play("music"); 
            this.backgroundMusic.loop = -1; // Looping forever
            this.backgroundMusic.volume = 0.005;
        }
        public Update():void {}
        public Main():void {}
       
    }
}