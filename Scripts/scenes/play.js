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
            // -- TIMER --
            _this.timer = 60;
            _this.Start();
            return _this;
        }
        PlayScene.prototype.Start = function () {
            // Inintialize our variables
            this.scoreBoard = new objects.ScoreTable();
            objects.Game.scoretable = this.scoreBoard;
            this.background = new objects.Background(this.assetManager, "background");
            this.nextButton = new objects.Button(this.assetManager, "nextButton", 500, 30);
            this.backButton = new objects.Button(this.assetManager, "backButton", 30, 30);
            this.backButton.scaleX -= 0.8;
            this.backButton.scaleY -= 0.8;
            this.nextButton.scaleX -= 0.8;
            this.nextButton.scaleY -= 0.8;
            this.Main();
        };
        PlayScene.prototype.Update = function () {
            var average = this.sum / objects.Game.scoretable.Count;
            objects.Game.scoretable.Average = average * 0.001;
            if (objects.Game.scoretable.Count >= 20) {
                clearInterval(this.interval);
                this.timer = 0;
                objects.Game.currentScene = config.Scene.OVER;
            }
        };
        PlayScene.prototype.Main = function () {
            this.Timer();
            this.addChild(this.background);
            this.addChild(this.scoreBoard.timeLabel);
            this.addChild(this.scoreBoard.countLabel);
            this.addChild(this.nextButton);
            this.addChild(this.backButton);
            this.addFactory();
            // Register for click events
            this.nextButton.on("click", this.nextButtonClick);
            this.backButton.on("click", this.backButtonClick);
        };
        PlayScene.prototype.nextButtonClick = function () {
            clearInterval(this.interval);
            this.timer = 0;
            objects.Game.currentScene = config.Scene.OVER;
        };
        PlayScene.prototype.backButtonClick = function () {
            location.reload();
            objects.Game.currentScene = config.Scene.START;
        };
        PlayScene.prototype.addFactory = function () {
            this.player = new objects.Button(this.assetManager, "player", this.Random(0, 500), this.Random(50, 450));
            this.addChild(this.player);
            this.startTime = new Date().getTime();
            this.player.on("click", this.onFactoryClick.bind(this));
        };
        PlayScene.prototype.onFactoryClick = function () {
            objects.Game.scoretable.Count++;
            this.popSound = createjs.Sound.play("pop");
            this.popSound.volume = 0.01;
            this.scoreBoard.countLabel.text = this.scoreBoard.Count + "/20";
            this.removeChild(this.player);
            this.endTime = new Date().getTime();
            var result = this.endTime - this.startTime;
            this.sum += result;
            this.addFactory();
        };
        // Generate and return random number
        PlayScene.prototype.Random = function (min, max) {
            return Math.random() * (max - min) + min;
        };
        PlayScene.prototype.Timer = function () {
            var _this = this;
            this.interval = setInterval(function () {
                _this.timer = _this.timer - 1; // Decrease timer by 1
                // Timer formatting
                if (_this.timer % 60 < 10)
                    _this.scoreBoard.Time = Math.floor(_this.timer / 60) + ":0" + _this.timer % 60;
                else
                    _this.scoreBoard.Time = Math.floor(_this.timer / 60) + ":" + _this.timer % 60;
                _this.scoreBoard.timeLabel.text = _this.scoreBoard.Time; // Assign value to the label
                if (_this.timer == 0) { // End game
                    clearInterval(_this.interval);
                    _this.timer = 0;
                    // Assign 60 seconds to Time variable
                    _this.scoreBoard.Time = "60";
                    objects.Game.scoretable.Time = "60";
                    // Calculate average
                    objects.Game.scoretable.Average = (_this.sum / objects.Game.scoretable.Count) * 0.001;
                    objects.Game.currentScene = config.Scene.OVER; // Go to GameOver scene
                }
            }, 1000);
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map