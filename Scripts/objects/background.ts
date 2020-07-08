module objects {
    export class Background extends createjs.Bitmap {
        // Variables
        // Constructor
        constructor(assetManager:createjs.LoadQueue, imageString : string)
        {
            super(assetManager.getResult(imageString));
            //console.log("Creating the background");
        }
    }
}