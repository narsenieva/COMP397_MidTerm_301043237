var objects;
(function (objects) {
    var Score = /** @class */ (function () {
        function Score() {
            this.Init();
        }
        Object.defineProperty(Score.prototype, "Score", {
            get: function () { return this.score; },
            set: function (newScore) { this.score = newScore; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Score.prototype, "Time", {
            get: function () { return this.time; },
            set: function (newTime) { this.time = newTime; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Score.prototype, "Count", {
            get: function () { return this.count; },
            set: function (newCount) { this.count = newCount; },
            enumerable: false,
            configurable: true
        });
        Score.prototype.Init = function () {
            this.Count = 0;
            this.Score = 0;
            this.Time = "0:00";
        };
        return Score;
    }());
    objects.Score = Score;
})(objects || (objects = {}));
//# sourceMappingURL=score.js.map