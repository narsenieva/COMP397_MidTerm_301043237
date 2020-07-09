var objects;
(function (objects) {
    var ScoreTable = /** @class */ (function () {
        function ScoreTable() {
            this.Init();
        }
        Object.defineProperty(ScoreTable.prototype, "Average", {
            get: function () { return this.average; },
            set: function (newAverage) { this.average = newAverage; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ScoreTable.prototype, "Time", {
            get: function () { return this.time; },
            set: function (newTime) { this.time = newTime; this.timeLabel.text = "1:00"; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ScoreTable.prototype, "Count", {
            get: function () { return this.count; },
            set: function (newCount) { this.count = newCount; this.countLabel.text = this.count + "/20"; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ScoreTable.prototype, "ResultArrray", {
            get: function () { return this.resultArray; },
            set: function (newArray) { this.resultArray = newArray; },
            enumerable: false,
            configurable: true
        });
        ScoreTable.prototype.Init = function () {
            this.timeLabel = new objects.Label("", "20px", "Consolas", "#000000", 300, 60, true);
            this.countLabel = new objects.Label("", "20px", "Consolas", "#000000", 400, 60, true);
            this.Count = 0;
            this.Average = 0;
            this.Time = "";
            this.ResultArrray = new Array(20);
        };
        return ScoreTable;
    }());
    objects.ScoreTable = ScoreTable;
})(objects || (objects = {}));
//# sourceMappingURL=scoretable.js.map