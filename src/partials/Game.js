import { SVG_NS } from "../settings";
import { KEYS } from "../settings";
import { GAP } from "../settings";
import { PADDLE_HEIGHT } from "../settings";
import { BALL_RADIUS } from "../settings";
import Board from "./Board";
import Paddle from "./Paddle";
import Ball from "./Ball";
import Score from "./Score";
export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    //for paddle starting positions
    this.paddleWidth = 8; //8
    this.paddleHeight = PADDLE_HEIGHT;
    this.boardGap = GAP;

    //for ball
    this.ballRadius = BALL_RADIUS;

    //Score
    this.player1_score = new Score(this.width / 2 - 50, 30, 30);
    this.player2_score = new Score(this.width / 2 + 25, 30, 30);

    this.gameElement = document.getElementById(this.element);
    this.board = new Board(this.width, this.height);
    this.ball = [];
    this.addBall();
    this.player1 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      (this.height - this.paddleHeight) / 2,
      KEYS.a,
      KEYS.z
    );
    this.player2 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.width - this.paddleWidth - this.boardGap,
      (this.height - this.paddleHeight) / 2,
      KEYS.up,
      KEYS.down
    );
    document.addEventListener("keydown", event => {
      if (event.key === KEYS.spaceBar) {
        this.pause = !this.pause;
      }
      if (event.key === "i") {
        this.addBall();
      }
    });
  }
  addBall() {
    this.ball.push(new Ball(this.ballRadius, this.width, this.height));
  }

  render() {
    //pause game
    if (this.pause) {
      return;
    }
    this.gameElement.innerHTML = "";
    let svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
    this.gameElement.appendChild(svg);

    // rendering all elements inside SVG
    this.board.render(svg);
    this.player1_score.render(svg, this.player1.score);
    this.player2_score.render(svg, this.player2.score);
    for (let eachBall of this.ball) {
      eachBall.render(svg, this.player1, this.player2);
    }

    this.player1.render(svg);
    this.player2.render(svg);
  }
}
