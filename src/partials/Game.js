import { SVG_NS } from "../settings";
import { KEYS } from "../settings";
import { GAP } from "../settings";
import { PADDLE_HEIGHT } from "../settings";
import { BALL_RADIUS } from "../settings";
import Board from "./Board";
import Paddle from "./Paddle";
import Ball from "./Ball";
export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    //for paddle starting positions
    this.paddleWidth = 8;
    this.paddleHeight = PADDLE_HEIGHT;
    this.boardGap = GAP;

    //for ball
    this.ballRadius=BALL_RADIUS;

    this.gameElement = document.getElementById(this.element);
    this.board = new Board(this.width, this.height);
    this.ball=new Ball(this.ballRadius,this.width,this.height);
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
  }

  render() {
    this.gameElement.innerHTML = "";
    let svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
    this.gameElement.appendChild(svg);

    // rendering all elements inside SVG
    this.board.render(svg);
    this.ball.render(svg);
    this.player1.render(svg);
    this.player2.render(svg);
  }
}
