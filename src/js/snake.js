/**
 * Snake Class
 * @class
 */
class Snake{
    /**
     * 
     * @param {int} width 
     * @param {any} ctx 
     */
    constructor(width,ctx){
        this.width=width;
        this.ctx=ctx;
        this.snakeAr = [];
        this.direction = "right";
        /**
         * Snake Head Object which contains cordinates for tounge and eye.
         * @type {Object}
         */
        this.snakeHead = {
            tongueX: 0, tongueY: 0,
            eye1StartX: 0, eye1StartY: 0,
            eye2StartX: 0, eye2StartY: 0,
            eye1EndX: 0, eye1EndY: 0,
            eye2EndX: 0, eye2EndY: 0,
        }


        this.snakeBorderColor = "blue";

        /**
         * @type {string}
         * @constant
         */
        this.snakeBackgroundColor = "white";
    }
    init(border,height){
        for (let i = 4; i >= 1; i--) {
            this.snakeAr.push({ x: border + i * this.width, y: Math.round((height / 2) / this.width) * this.width });

        }
    }


    /**
     * Drawing Segment of Snake. Just like small rectange drawing.
     * @function
     * @param {BigInt} x - The cordinate of X.
     * @param {BigInt} y - The cordinate of Y.
     * @param {string} stroke - Default value is blue.
     * @param {string} style - Default value is white.
     */
    drawSnakeSegment(x, y, stroke = this.snakeBorderColor, style = this.snakeBackgroundColor) {
        this.ctx.strokeStyle = stroke;
        this.ctx.fillStyle = style;
        this.ctx.lineWidth = this.width/ 5;
        this.ctx.fillRect(x, y, this.width, this.width);
        this.ctx.strokeRect(x, y, this.width, this.width);
    }

    /**
     * This function decorates head of the snake.
     * @function
     * @param {BigInt} x - Position of X cordinate.
     * @param {BigInt} y - Position of Y cordinate.
     */
    decorateHead(x, y) {
        const tongue = { x: x + this.width/ 2, y: y + this.width/ 2 }
        this.ctx.beginPath();
        this.ctx.strokeStyle = "white";
        this.ctx.moveTo(x + this.width/ 2, y + this.width/ 2);
        this.ctx.lineTo(tongue.x + this.snakeHead.tongueX, tongue.y + this.snakeHead.tongueY);
        this.ctx.stroke();

        //up
        this.ctx.beginPath();
        this.ctx.moveTo(x + this.width / 5, y + this.width / 3);
        this.ctx.lineTo(x + this.width / 5, y + this.width / 3 - this.width/ 5);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(x + this.width- this.width/ 5, y + this.width/ 3);
        this.ctx.lineTo(x + this.width- this.width/ 5, y + this.width/ 3 - this.width/ 5);
        this.ctx.stroke();

        // this.ctx.beginPath();
        // this.ctx.moveTo(x + this.snakeHead.eye1StartX, y + this.snakeHead.eye1StartY);
        // this.ctx.lineTo(x + this.snakeHead.eye1EndX, y + this.snakeHead.eye1EndY);
        // this.ctx.stroke();
        // this.ctx.beginPath();
        // this.ctx.moveTo(x + this.snakeHead.eye2StartX, y + this.snakeHead.eye2StartY);
        // this.ctx.lineTo(x + this.snakeHead.eye2EndX, y + this.snakeHead.eye2EndY);
        // this.ctx.stroke();

        // //right
        // this.ctx.beginPath();
        // this.ctx.moveTo(x+this.this.width/3,y+this.this.width/5);
        // this.ctx.lineTo(x+this.this.width/3+this.this.width/5,y+this.this.width/5);
        // this.ctx.stroke();
        // this.ctx.beginPath();
        // this.ctx.moveTo(x+this.this.width/3,y+this.this.width-this.this.width/5);
        // this.ctx.lineTo(x+this.this.width/3+this.this.width/5,y+this.this.width-this.this.width/5);
        // this.ctx.stroke();

        // //left
        // this.ctx.beginPath();
        // this.ctx.moveTo(x+this.this.width,y+this.this.width/5);
        // this.ctx.lineTo(x+this.this.width-this.this.width/3,y+this.this.width/5);
        // this.ctx.stroke();
        // this.ctx.beginPath();
        // this.ctx.moveTo(x+this.this.width,y+this.this.width-this.this.width/5);
        // this.ctx.lineTo(x+this.this.width-this.this.width/3,y+this.this.width-this.this.width/5);
        // this.ctx.stroke();




        // //down
        // this.ctx.beginPath();
        // this.ctx.moveTo(x+this.this.width/5,y+this.this.width/3);
        // this.ctx.lineTo(x+this.this.width/5,y+this.this.width/3+this.this.width/5);
        // this.ctx.stroke();
        // this.ctx.beginPath();
        // this.ctx.moveTo(x+this.this.width-this.this.width/5,y+this.this.width/3);
        // this.ctx.lineTo(x+this.this.width-this.this.width/5,y+this.this.width/3+this.this.width/5);
        // this.ctx.stroke();
    }

    /**
     * It takes arrays of coordinates of to draw snake.
     * @function
     */
    draw() {
        this.snakeAr.forEach((segment, i) => {
            if (i == 0) {
                this.drawSnakeSegment(segment.x, segment.y, '#666633', '#994d00');
                this.decorateHead(segment.x, segment.y);
            } else {
                this.drawSnakeSegment(segment.x, segment.y)
            }
        });
    }

    /**
     * It make sure which direction to move.
     * @function
     */
    move() {
        let newHead = { ...this.snakeAr[0] };
        this.snakeHead.tongueX = 0;
        this.snakeHead.tongueY = 0;
        switch (this.direction) {
            case "up":
                newHead.y -= this.width;
                this.snakeHead.tongueY = -this.width;
                break;
            case "down":
                newHead.y += this.width;
                this.snakeHead.tongueY = this.width;
                break;
            case "left":
                newHead.x -= this.width;
                this.snakeHead.tongueX = -this.width;
                break;
            case "right":
                newHead.x += this.width;
                this.snakeHead.tongueX = this.width;
                break;
        }
        this.snakeAr.unshift(newHead);
    }
}