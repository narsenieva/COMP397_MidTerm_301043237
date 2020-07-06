module objects {
    export class Background extends createjs.Bitmap {
        // Variables
        // Constructor
        constructor(assetManager:createjs.LoadQueue)
        {
            super(assetManager.getResult("background"));
            console.log("Creating the background");
        }
    }
}