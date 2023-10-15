class Sound {
    /**
     * Initilizing all the sound
     * @constructor
     */
    constructor() {
        /**@type {Audio}*/
        this.audioPlay = document.getElementById("gamePlay");

        /**@type {Audio}*/
        this.audioDirection = document.getElementById("changeDirection");

        /**@type {Audio}*/
        this.audioEatFood = document.getElementById("eatFood");

        /**@type {Audio}*/
        this.audioGameOver = document.getElementById("gameOver");

        this.audioPlay.volume = 0.4;

    }

    /**
     * plays the sound when direction of snake is changed
     * @function
     */
    direction() {
        this.audioDirection.currentTime = 0;
        this.audioDirection.play();
    }
    /**
     * pause the sound of direction
     * @function
     */
    directionPause() {
        this.audioDirection.pause();
    }

    /**
     * Plays the sound when snake eats the food.
     * @function
     */
    eatFood() {
        this.audioEatFood.play();
    }

    /**
     * Pause the eating food sound
     */
    eatFoodPause() {
        this.audioEatFood.pause();
    }
    /**
     * Play the sound of game.
     * @function
     */
    game() {

        this.audioPlay.play();
    }

    /**
     * Pause the sound in game.
     * @function
     */
    gamePause() {
        this.audioPlay.pause();
        this.gameOver();
    }

    /**
     * Play the game over sound
     * @function
     */
    gameOver() {
        this.audioGameOver.play();
    }

    /**
     * Pause the game over sound
     * @function
     */
    gameOverPause() {
        this.audioGameOver.pause();
    }
}