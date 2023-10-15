/**
 * this is food class for snake.
 * @class
 */
class Food{
    /**
     * 
     * @param {BigInt} width -This is width for food.
     * @param {any} ctx -This is canvas context;
     */
    constructor(width,ctx){
        this.x=null;
        this.y=null;
        this.ctx=ctx;
        this.width=width;
        /**
         * @type {string}
         * @constant
         */
        this.foodBorderColor = "red";

        /**
         * @type {string}
         * @constant
         */
        this.foodBackgroundColor = "blue";
    }

    /**
     * 
     * @param {BigInt} border 
     * @param {BigInt} screenWidht 
     * @param {BigInt} screenHeight 
     */
    init(border,screenWidht,screenHeight){
        this.x = this.random(border, screenWidht - this.width - this.width / 2);
        this.y = this.random(border, screenHeight - this.width - this.width / 2);
    }

     /**
     * It gives random number within screen. 
     * So that snake and food is drawn inside frame.
     * @function
     * @param {BigInt} min- The minimum Number
     * @param {BigInt} max- The maximum Number
     * @returns {BigInt}
     */
     random(min, max) {
        const rtn = Math.round((Math.random() * (max - min) + min) / this.width) * this.width;
        return rtn;
    }


     /**
     * It is Draws food in circle shape with stroke.
     * @function
     */
     draw() {
        this.ctx.fillStyle = this.foodBorderColor;
        this.ctx.strokeStyle = this.foodBackgroundColor;
        this.ctx.lineWidth = this.width / 5;
        this.ctx.beginPath();
        const half = this.width / 2;
        this.ctx.arc(this.x + half, this.y + half, half, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
        /**
         * below code is for squre food
         */

        // this.ctx.fillRect(this.food.x, this.food.y, this.width, this.width);
        // this.ctx.strokeRect(this.food.x, this.food.y, this.width, this.width);
    }

}