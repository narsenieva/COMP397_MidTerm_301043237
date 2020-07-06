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
    var PlayScene = /** @class */ (function (_super) {
        __extends(PlayScene, _super);
        // Constructor
        function PlayScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        PlayScene.prototype.Start = function () {
            console.log("Play scene start");
            // Inintialize our variables
            this.background = new objects.Background(this.assetManager);
            this.playLabel = new objects.Label("GO!", "20px", "Consolas", "#000000", 300, 60, true);
            this.nextButton = new objects.Button(this.assetManager, "nextButton", 500, 500);
            this.backButton = new objects.Button(this.assetManager, "backButton", 0, 500);
            this.Main();
        };
        PlayScene.prototype.Update = function () {
        };
        PlayScene.prototype.Main = function () {
            this.addChild(this.background);
            this.addChild(this.playLabel);
            this.addChild(this.nextButton);
            this.addChild(this.backButton);
            this.AddButton();
            // Register for click events
            this.nextButton.on("click", this.nextButtonClick);
            this.backButton.on("click", this.backButtonClick);
            //this.player.on("click", this.playerClick);
        };
        PlayScene.prototype.nextButtonClick = function () {
            objects.Game.currentScene = config.Scene.OVER;
        };
        PlayScene.prototype.backButtonClick = function () {
            objects.Game.currentScene = config.Scene.START;
        };
        PlayScene.prototype.AddButton = function () {
            this.player = new objects.Button(this.assetManager, "player", this.Random(0, 500), this.Random(50, 450));
            this.addChild(this.player);
            this.player.on("click", this.playerClick.bind(this));
            this.startTime = new Date().getMilliseconds();
        };
        PlayScene.prototype.playerClick = function () {
            this.removeChild(this.player);
            this.AddButton();
        };
        PlayScene.prototype.Random = function (min, max) {
            return Math.random() * (max - min) + min;
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map