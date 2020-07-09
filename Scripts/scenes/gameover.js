var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var GameOverScene = /** @class */ (function (_super) {
        __extends(GameOverScene, _super);
        // Constructor
        function GameOverScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            // Additional variables
            _this.length = 0;
            _this.count = 1;
            _this.time = 0;
            _this.average = 0;
            _this.Start();
            return _this;
        }
        // Method
        GameOverScene.prototype.Start = function () {
            // Initialize variables
            this.background = new objects.Background(this.assetManager, "background");
            this.scoreTableImage = new objects.Background(this.assetManager, "finalTable");
            // -- LABELS --
            this.resultLabel = new objects.Label(objects.Game.scoretable.Count + "/20 factories for ", "25px", "Patrick Hand", "#FFFFFF", 250, 120, true);
            this.averageLabel = new objects.Label("Your average responce rate is: ", "25px", "Patrick Hand", "#FFFFFF", 250, 180, true);
            this.resultsArrayLabel = new objects.Label("--- TOP RESULTS ---", "25px", "Patrick Hand", "#FFFFFF", 300, 220, true);
            // -- BUTTON --
            this.backButton = new objects.Button(this.assetManager, "backButton", 250, 440);
            this.backButton.scaleX -= 0.65;
            this.backButton.scaleY -= 0.65;
            // Formatting output
            // -- TIME --
            if (parseInt(objects.Game.scoretable.Time.slice(-2)) > 1 && parseInt(objects.Game.scoretable.Time.slice(-2)) <= 59) {
                this.time = 60 - parseInt(objects.Game.scoretable.Time.slice(-2));
                this.resultLabel.text += this.time + " seconds!";
            }
            else if (parseInt(objects.Game.scoretable.Time.slice(-2)) == 60) {
                this.resultLabel.text += "1 minute!";
            }
            // -- AVERAGE --
            if (parseFloat(objects.Game.scoretable.Average.toFixed(2)) >= 0) {
                this.average = parseFloat(objects.Game.scoretable.Average.toFixed(2));
                this.averageLabel.text += this.average + " seconds!";
            }
            else
                this.averageLabel.text += "0 seconds!";
            // -- TOP RESULTS TABLE --
            // Sorting from lowest to highest
            objects.Game.scoretable.ResultArrray.sort(function (a, b) { return a - b; });
            // Modifying the "length" variable to display only less than 5 results
            if (objects.Game.scoretable.Count < 5 && objects.Game.scoretable.Count >= 0)
                length = objects.Game.scoretable.Count;
            else
                length = 5;
            // Looping through the results of array
            for (var i = 0; i < length; i++) {
                this.resultsArrayLabel.text += "\n\n         #"
                    + this.count + " - " +
                    (objects.Game.scoretable.ResultArrray[i] * 0.001).toFixed(2);
                this.count++;
            }
            this.Main();
        };
        GameOverScene.prototype.Update = function () { };
        GameOverScene.prototype.Main = function () {
            // Adding children to the scene
            this.addChild(this.background);
            this.addChild(this.scoreTableImage);
            this.addChild(this.gameOverLabel);
            this.addChild(this.resultLabel);
            this.addChild(this.averageLabel);
            this.addChild(this.backButton);
            this.addChild(this.resultsArrayLabel);
            // Click event for button
            this.backButton.on("click", this.backButtonClick);
        };
        GameOverScene.prototype.backButtonClick = function () {
            // Cleaning the results
            objects.Game.scoretable.Average = 0;
            objects.Game.scoretable.Count = 0;
            objects.Game.scoretable.Time = "";
            location.reload(); // -- Reloading the application so that music does not overlap
            objects.Game.currentScene = config.Scene.START;
        };
        return GameOverScene;
    }(objects.Scene));
    scenes.GameOverScene = GameOverScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=gameover.js.map