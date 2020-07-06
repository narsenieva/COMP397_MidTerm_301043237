module objects {
    export class Label extends createjs.Text {
        // Variables
        // Constructor
        constructor(labelString: string, fontSize: string,
                    fontFamily: string, fontColor: string, x:number = 0,
                    y:number = 0, isCentered:boolean = false) 
            {
                // Pass parameters to the super class
                super(labelString, fontSize + " " + fontFamily, fontColor);

                // Set the registrarion point
                if(isCentered) {
                    this.regX = this.getMeasuredWidth() * 0.5;
                    this.regY = this.getMeasuredLineHeight() * 0.5;
                }
                
                // Set the initial position
                this.x = x;
                this.y = y;
            }
        // Methods
    }
}