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
            _this.Start();
            return _this;
        }
        // Method
        GameOverScene.prototype.Start = function () {
            // Initialize our variables
            this.background = new objects.Background(this.assetManager);
            //this.scoreTable = new objects.ScoreTable();
            var time = 60 - parseInt(objects.Game.scoretable.Time.slice(-2));
            this.gameOverLabel = new objects.Label("You did it! ", "40px", "Consolas", "#000000", 300, 100, true);
            this.resultLabel = new objects.Label(objects.Game.scoretable.Count + "/20 for "
                + time + " seconds!", "20px", "Consolas", "#000000", 300, 200, true);
            this.averageLabel = new objects.Label("Your average responce rate is: "
                + objects.Game.scoretable.Average.toFixed(2) + " seconds!", "20px", "Consolas", "#000000", 300, 300, true);
            this.backButton = new objects.Button(this.assetManager, "backButton", 250, 500);
            this.Main();
        };
        GameOverScene.prototype.Update = function () { };
        GameOverScene.prototype.Main = function () {
            this.addChild(this.background);
            this.addChild(this.gameOverLabel);
            this.addChild(this.resultLabel);
            this.addChild(this.averageLabel);
            this.addChild(this.backButton);
            this.backButton.on("click", this.backButtonClick);
        };
        GameOverScene.prototype.backButtonClick = function () {
            objects.Game.scoretable.Average = 0;
            objects.Game.scoretable.Count = 0;
            objects.Game.scoretable.Time = "";
            location.reload();
            //objects.Game.currentScene = config.Scene.START;
        };
        return GameOverScene;
    }(objects.Scene));
    scenes.GameOverScene = GameOverScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=gameover.js.map