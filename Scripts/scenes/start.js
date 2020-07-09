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
    var StartScene = /** @class */ (function (_super) {
        __extends(StartScene, _super);
        //private creditsLabel : objects.Label;
        // Constructor
        function StartScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Methods
        StartScene.prototype.Start = function () {
            _super.prototype.Start.call(this);
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
        };
        StartScene.prototype.Update = function () { };
        StartScene.prototype.Main = function () {
            // Add items to the scen
            this.addChild(this.background);
            this.addChild(this.instructions);
            this.addChild(this.startButton);
            //this.addChild(this.creditsLabel);
            this.startButton.on("click", this.startButtonClick);
        };
        StartScene.prototype.startButtonClick = function () {
            // Change from START to GAME scene
            objects.Game.currentScene = config.Scene.GAME;
        };
        return StartScene;
    }(objects.Scene));
    scenes.StartScene = StartScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=start.js.map