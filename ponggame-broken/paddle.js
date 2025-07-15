const SIDE = { NONE: 0, LEFT: 1, RIGHT: 2 };

class Paddle {
    posx;
    posy;
    width;
    height;
    color;
    constructor(posx, posy, width, height, side, color) {
        this.posx = posx;
        this.posy = posy;
        this.width = width;
        this.height = height;
        this.color = color;
        this.side = side;
        this.vely = 0;
        this.velx = 0;
    }

    move(is_cpu, ball) {
        if (is_cpu) {
            // ball.y <- where the ball is
            // this.y <- where the paddle is
            // this.l <- how long the paddle is
            
            this.y = ball.y;
        } else {
            // control this.vy using ball
            // don't set this.y! (cheating)
            let desired = ball.posy - this.height / 2;
            let diff = desired - this.posy;
            // The original code used 'vel' which is undefined. It should be 'diff'.
            this.vely = Math.min(PADDLE_VELOCITY, Math.max(-PADDLE_VELOCITY, diff));
        }
        this.posy += this.vely;
        this.posx += this.velx;
    }

    bounce(ball) {
        let bounce_dir = Math.sign(BOARD_WIDTH / 2 - this.posx); // LEFT: 1, RIGHT: -1
        // try bounce ball
        if (ball.posy + BALL_RADIUS >= this.posy && ball.posy - BALL_RADIUS <= this.posy + this.height && // within y
            ball.posx - BALL_RADIUS <= this.posx + this.width && ball.posx + BALL_RADIUS >= this.posx &&  // within x (fixed || to &&)
            ball.velx * bounce_dir < 0 // ball going into paddle
        ) {
            ball.velx = bounce_dir * PADDLE_FORCE * Math.abs(ball.velx);

            // Add "spin" based on where the ball hits the paddle
            const paddleCenter = this.posy + this.height / 2;
            const hitOffset = (ball.posy - paddleCenter) / (this.height / 2); // Value from -1 (top) to 1 (bottom)
            ball.vely += hitOffset * 2; // Add some vertical velocity

            return SIDE.NONE;
        }

        return SIDE.NONE;
    }
}

function bounceRightPaddle(paddle) {
    if (this.posx + BALL_RADIUS < paddle.posx) return SIDE.NONE;
    if (this.posx + BALL_RADIUS > paddle.posx + paddle.width) return SIDE.LEFT; // Someone got a point...
    if (this.posy < paddle.posy) return SIDE.NONE;
    if (this.posy > paddle.posy + paddle.height) return SIDE.NONE;
    if (this.velx > 0) {
        this.velx = -PADDLE_FORCE * Math.abs(this.velx);
        // add other spin, etc.
        // add sound?
    }
    return SIDE.NONE;
}
