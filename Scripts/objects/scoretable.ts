module objects {
    export class ScoreTable {
        // Global variables
        // Labels
        public countLabel : objects.Label;
        public timeLabel : objects.Label;
        public averageLabel : objects.Label;

        // Values
        private count : number;
        private time : string;
        private average : number;
        private resultArray: number[];

        // Getters and setters
        get Average():number { return this.average; }
        set Average(newAverage : number) { this.average = newAverage;}

        get Time() : string { return this.time; } 
        set Time(newTime : string) { this.time = newTime; this.timeLabel.text = "1:00"; }

        get Count() : number { return this.count; }
        set Count(newCount : number) { this.count = newCount; this.countLabel.text = this.count + "/20";}

        get ResultArrray():number[] { return this.resultArray; }
        set  ResultArrray(newArray : number[]) {this.resultArray = newArray;}

        constructor() {
            this.Init();
        }

        private Init() : void {
            // Initializing the default labels and values
            this.timeLabel = new objects.Label("", "20px", "Consolas", "#000000", 300, 60, true);
            this.countLabel = new objects.Label( "", "20px", "Consolas", "#000000", 400, 60, true);
            this.Count = 0;
            this.Average = 0;
            this.Time = "";
            this.ResultArrray = new Array<number>(20);
        }
    }
}