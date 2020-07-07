module objects {
    export class ScoreTable {
        public countLabel : objects.Label;
        public timeLabel : objects.Label;
        public averageLabel : objects.Label;

        private count : number;
        private time : string;
        private average : number;

        get Average():number { return this.average; }
        set Average(newAverage : number) { this.average = newAverage;}

        get Time() : string { return this.time; } 
        set Time(newTime : string) { this.time = newTime; this.timeLabel.text = this.time; }

        get Count() : number { return this.count; }
        set Count(newCount : number) { this.count = newCount; this.countLabel.text = this.count + "/10";}

        constructor() {
            this.Init();
        }

        private Init() : void {

            this.timeLabel = new objects.Label("", "20px", "Consolas", "#000000", 300, 60, true);
            this.countLabel = new objects.Label( "", "20px", "Consolas", "#000000", 400, 60);
            this.Count = 0;
            this.Average = 0;
            this.Time = "";
        }
    }
}