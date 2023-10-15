class DomEvent {
    /**
     * @constructor
     */
    constructor() {
        /**
        * This is used for touch Position
        * @type {BigInt}
        */
        this.xDown = null;

        /**
        * This is used for touch Position
        * @type {BigInt}
        */
        this.yDown = null;

        this.init();

    }

    /**
     * initiliazation function contains the event listner
     * @method
     */
    init() {
        /**
         * Start button click event
         * @event
         */
        startBtn.addEventListener('click', (event) => {
            overlay.classList.add('hide');
            gscreen = new Screen(canvas, sound);
            gscreen.init();
        });

        /**
                 *  Touch Start event for cellphone.
                 * @event
                 */
        document.addEventListener('touchstart', this.handleTouchStart, false);

        /**
         * Touch Move event for celphone.
         * @event 
         */
        document.addEventListener('touchmove', this.handleTouchMove, false);

        /**
         * Key Down event for Keyboard.
         * @event
         * 
         */
        document.addEventListener("keydown", (event) => {
            if (gscreen.isGameFinished) { return; }
            switch (event.key) {
                case "ArrowUp":
                    if (gscreen.snake.direction !== "down") gscreen.snake.direction = "up";
                    sound.direction()
                    break;
                case "ArrowDown":
                    if (gscreen.snake.direction !== "up") gscreen.snake.direction = "down";
                    sound.direction()
                    break;
                case "ArrowLeft":
                    if (gscreen.snake.direction !== "right") gscreen.snake.direction = "left";
                    sound.direction()
                    break;
                case "ArrowRight":
                    if (gscreen.snake.direction !== "left") gscreen.snake.direction = "right";
                    sound.direction()
                    break;
            }
        });
    }

    /**
    * 
    * @param {any} evt- Takes event. 
    */
    handleTouchStart(evt) {
        //browser APIs
        let touches = evt.touches || evt.originalEvent.touches;
        const firstTouch = touches[0];
        this.xDown = firstTouch.clientX;
        this.yDown = firstTouch.clientY;
    };

    /**
     * This function checkes which direction user has touched.
     * @function
     * @param {any} evt- Takes event. 
     */
    handleTouchMove(evt) {
        if (gscreen.isGameFinished || !this.xDown || !this.yDown) {
            return;
        }
        let xUp = evt.touches[0].clientX;
        let yUp = evt.touches[0].clientY;

        let xDiff = this.xDown - xUp;
        let yDiff = this.yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                if (gscreen.snake.direction !== "left") gscreen.snake.direction = "right";
                sound.direction()
            } else {
                if (gscreen.snake.direction !== "right") gscreen.snake.direction = "left";
                sound.direction()
            }
        } else {
            if (yDiff > 0) {
                if (gscreen.snake.direction !== "up") gscreen.snake.direction = "down";
                sound.direction()
            } else {
                if (gscreen.snake.direction !== "down") gscreen.snake.direction = "up";
                sound.direction()
            }
        }
        /* reset values so that new direction can be made */
        this.xDown = null;
        this.yDown = null;
    }
}