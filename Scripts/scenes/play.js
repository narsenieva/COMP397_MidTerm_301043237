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
            _this.sum = 0;
            _this.count = 0;
            _this.timer = 0;
            _this.Start();
            return _this;
        }
        PlayScene.prototype.Start = function () {
            // Inintialize our variables
            this.background = new objects.Background(this.assetManager);
            this.playLabel = new objects.Label("GO!", "20px", "Consolas", "#000000", 300, 60, true);
            this.nextButton = new objects.Button(this.assetManager, "nextButton", 500, 500);
            this.backButton = new objects.Button(this.assetManager, "backButton", 0, 500);
            this.scoreBoard = new objects.Score;
            objects.Game.score = this.scoreBoard;
            this.Main();
        };
        PlayScene.prototype.Update = function () {
            // console.log("LEVEL SCORE IS: " + this.scoreBoard.Count);
            //console.log("Sum: " + this.sum);
            if (this.scoreBoard.Count >= 10) {
                var average = this.sum / 10;
                this.scoreBoard.Score = average * 0.001;
                console.log("Final: " + this.scoreBoard.Score);
                objects.Game.currentScene = config.Scene.OVER;
            }
        };
        PlayScene.prototype.Main = function () {
            this.Timer();
            this.addChild(this.background);
            this.addChild(this.playLabel);
            this.addChild(this.nextButton);
            this.addChild(this.backButton);
            this.AddButton();
            // Register for click events
            this.nextButton.on("click", this.nextButtonClick);
            this.backButton.on("click", this.backButtonClick);
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
            this.startTime = new Date().getTime();
            this.player.on("click", this.playerClick.bind(this));
        };
        PlayScene.prototype.playerClick = function () {
            this.scoreBoard.Count++;
            this.removeChild(this.player);
            this.endTime = new Date().getTime();
            //console.log("Start: " + this.startTime + " " + "End: " + this.endTime)
            var result = this.endTime - this.startTime;
            this.sum += result;
            this.AddButton();
        };
        PlayScene.prototype.Random = function (min, max) {
            return Math.random() * (max - min) + min;
        };
        PlayScene.prototype.Timer = function () {
            var _this = this;
            var intervalId = setInterval(function () {
                _this.timer = _this.timer + 1;
                if (_this.timer < 10) {
                    _this.scoreBoard.Time = "0:0" + _this.timer.toString();
                    _this.playLabel.text = _this.scoreBoard.Time;
                }
                else if (_this.timer >= 10 && _this.timer <= 59) {
                    _this.scoreBoard.Time = "0:" + _this.timer.toString();
                    _this.playLabel.text = _this.scoreBoard.Time;
                }
                else if (_this.timer >= 60) {
                    _this.scoreBoard.Time = "1:00";
                    _this.playLabel.text = _this.scoreBoard.Time;
                    _this.scoreBoard.Score = (_this.sum / _this.scoreBoard.Count) * 0.001;
                    objects.Game.currentScene = config.Scene.OVER;
                }
            }, 1000);
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map