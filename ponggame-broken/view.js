const canvas = document.getElementById("gameboard");
const ctx = canvas.getContext("2d");
const cpucheck = document.getElementById("cpucheck");
const scoreboard = document.getElementById("scoreboard");

function updateScore(model) {
    scoreboard.innerHTML = `${model.scoreL} : ${model.scoreR}`;
}

function draw_game(model) {
    ctx.fillStyle = "Black";
    ctx.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

    // Draw the border
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.strokeRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

    // Draw the dotted line in the middle
    ctx.beginPath();
    ctx.setLineDash([10, 15]);
    ctx.moveTo(BOARD_WIDTH / 2, 0);
    ctx.lineTo(BOARD_WIDTH / 2, BOARD_HEIGHT);
    ctx.stroke();
    ctx.closePath();
    ctx.setLineDash([]); // Reset to solid line for other drawings

    draw_ball(ctx, model.ball);
    draw_paddle(ctx, model.paddleL);
    draw_paddle(ctx, model.paddleR);
}

function draw_ball(ctx, ball) {
    ctx.fillStyle = "white";

    ctx.beginPath();
    ctx.arc(ball.posx, ball.posy, BALL_RADIUS, 0, 2 * Math.PI); 
    ctx.fill();
    ctx.closePath();
}

function draw_paddle(ctx, paddle) {

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.rect(paddle.posx, paddle.posy, paddle.width, paddle.height);
    ctx.fillStyle = paddle.color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

}