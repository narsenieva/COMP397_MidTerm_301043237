module objects {
    export class Score {
        public countLabel : objects.Label;
        public timeLabel : objects.Label;
        public averageLabel : objects.Label;

        private count : number;
        private time : string;
        private score : number;

        get Score():number { return this.score; }
        set Score(newScore : number) { this.score = newScore; }

        get Time() : string { return this.time; } 
        set Time(newTime : string) { this.time = newTime; }

        get Count() : number { return this.count; }
        set Count(newCount : number) { this.count = newCount; }

        constructor() {
            this.Init();
        }

        private Init() : void {
            this.Count = 0;
            this.Score = 0;
            this.Time = "0:00";
        }
    }
}