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
var objects;
(function (objects) {
    var Scene = /** @class */ (function (_super) {
        __extends(Scene, _super);
        // Constructor
        function Scene(assetManager) {
            var _this = _super.call(this) || this;
            _this.musicPlaying = false;
            _this.assetManager = assetManager;
            return _this;
        }
        // Methods
        Scene.prototype.Start = function () {
            this.backgroundMusic = createjs.Sound.play("music");
            this.backgroundMusic.loop = -1; // Looping forever
            this.backgroundMusic.volume = 0.0;
        };
        Scene.prototype.Update = function () { };
        Scene.prototype.Main = function () { };
        return Scene;
    }(createjs.Container));
    objects.Scene = Scene;
})(objects || (objects = {}));
//# sourceMappingURL=scene.js.map