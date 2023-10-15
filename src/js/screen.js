

class Screen {
    /**
     * 
     * @param {Element} canvas - Game Canvas
     * @param {Object} sound -Sound Class
     */
    constructor(canvas, sound) {
        this.isGameFinished = false;
        this.score = 0;
        this.dot = 20
        this.screenBorder = 20;
        this.gameBoxWidth = canvas.width - this.screenBorder;
        this.gameBoxHeight = canvas.height - this.screenBorder;

        /**
        * @type {string}
        * @constant
        */
        this.screenBorderColor = "#5CBC43";

        /**
         * @type {string}
         * @constant
         */
        this.screenBackgroundColor = "orange";
        /**
        * @type {string}
        * @constant
        */
        this.sound = sound;
        /** @type {CanvasRenderingContext2D} */
        this.ctx = canvas.getContext("2d");
        this.snake=new Snake(this.dot,this.ctx);
        this.food = new Food(this.dot, this.ctx)

        this.speed = 207;

    }

    /**
     * Initial Function. It makes snake and food.
     * @function
     * 
     */
    init() {
        this.drawGameBox();
        
        this.snake.init(this.screenBorder,this.gameBoxHeight);
        this.food.init(this.screenBorder, this.gameBoxWidth, this.gameBoxHeight);
        this.loop();
        this.sound.game();
    }

    /**
     * Main Fuction - It is looping function. It checks everything that happens in game.
     * @function 
     */
    loop() {
        if (this.isGameFinished) {
            this.sound.gamePause();
            return;
        }
        this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        this.drawGameBox();
        this.snake.move();
        let me = this;
        if (this.checkHit()) {
            this.message(false);
            this.sound.gamePause();
            setTimeout(() => {
                overlay.classList.remove('hide');
            }, me.speed);

            return;
        } else {
            this.food.draw();
            this.snake.draw();
            this.message();
            this.eatFood(this.snake.snakeAr[0]);
            setTimeout(function () { me.loop() }, this.speed);
        }

    }

    /**
     * Checks weather it collide itself or collide in the wall.
     * @function
     * @returns {boolean} Either True or false
     */

    checkHit() {
        const head = this.snake.snakeAr[0];
        // Check hit with walls
        if (head.x < this.screenBorder || head.x >= this.gameBoxWidth - this.screenBorder || head.y < this.screenBorder || head.y >= this.gameBoxHeight - this.screenBorder) {
            this.isGameFinished = true;
            return true;
        }
        // Check hit with itself
        for (let i = 1; i < this.snake.snakeAr.length; i++) {
            if (this.snake.snakeAr[i].x === head.x && this.snake.snakeAr[i].y === head.y) {

                this.isGameFinished = true;
                return true;
            }
        }

        return false;
    }

    /**
     * It checks whether snake has eaten food or not.
     * @function
     */
    eatFood(head) {
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 5;
            //play sound
            this.sound.eatFood();
            // Generate new food position
            this.food.init(this.screenBorder, this.gameBoxWidth, this.gameBoxHeight);
        } else {
            this.snake.snakeAr.pop();
        }
    }

    /**
     * It draws screen and border of screen.
     * @function
     */
    drawGameBox() {
        this.ctx.strokeStyle = this.screenBorderColor;
        this.ctx.lineWidth = this.screenBorder;
        this.ctx.fillStyle = this.screenBackgroundColor;
        this.ctx.fillRect(this.screenBorder / 2, this.screenBorder / 2, this.gameBoxWidth, this.gameBoxHeight)
        this.ctx.strokeRect(this.screenBorder / 2, this.screenBorder / 2, this.gameBoxWidth, this.gameBoxHeight)
    }

    /**
     * It sends message for player.
     * @function
     * @param {boolean} flag True for Score and False for Game End.
     */
    message(flag = true) {
        this.ctx.font = `bold ${this.screenBorder / 2}px verdana, sans-serif`;
        this.ctx.fillStyle = flag ? "#fff" : "#A343BC";
        this.ctx.textAlign = "center";
        const msg = flag ? "Your Score: " + this.score : "You scored " + this.score + ". Game Over...";
        /**
         * If you want to know location of snake.
         */
        //const msg = flag ? "Your Score:" + this.score + ` snake x:${snake[0].x} y:${snake[0].y} food ${food.x} ${food.y}` : "You scored " + this.score + ". Game Over...";
        this.ctx.fillText(msg, (canvas.width / 2), this.screenBorder / 2 + this.screenBorder / 6);
    }

}
