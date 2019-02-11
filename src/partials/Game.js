import { SVG_NS } from "../settings";
import { KEYS } from "../settings";
import { GAP } from "../settings";
import { PADDLE_HEIGHT } from "../settings";
import { BALL_RADIUS } from "../settings";
import Board from "./Board";
import Paddle from "./Paddle";
import Ball from "./Ball";
import Bonus from "./Bonus";
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

    this.mode = 0;

    this.gameElement = document.getElementById(this.element);
    this.board = new Board(this.width, this.height);
    this.ball = [];
    this.addBall();
    this.bonus = new Bonus(this.width, this.height);
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
  ai(player) {
    if (this.ball.length > 0) {
      if (this.ball[0].y < player.y) {
        player.up();
      }
      if (this.ball[0].y > player.y + player.height) {
        player.down();
      }
    }
  }
  showText(x, y, svg, content) {
    let text = document.createElementNS(SVG_NS, "text");
    text.setAttributeNS(null, "font-family", "Silkscreen Web");
    text.setAttributeNS(null, "font-size", 20);
    text.setAttributeNS(null, "x", x);
    text.setAttributeNS(null, "y", y);
    text.setAttributeNS(null, "fill", "white");
    text.textContent = content;
    svg.appendChild(text);
  }
  showModeSelect(svg) {
    let mode1 = "1 Player VS AI.";
    let mode2 = "1 Player VS 1 PLayer";
    let mode3 = "AI. VS AI.";
    let positionX = 90;
    let positionY = 100;
    this.showText(positionX, positionY, svg, "Press 1");
    this.showText(this.width / 2 - 30, positionY, svg, mode1);
    this.showText(positionX, positionY + 40, svg, "Press 2");
    this.showText(this.width / 2 - 30, positionY + 40, svg, mode2);
    this.showText(positionX, positionY + 80, svg, "Press 3");
    this.showText(this.width / 2 + 5, positionY + 80, svg, mode3);

    document.addEventListener("keydown", event => {
      if (event.key === "1") {
        this.mode = 1;
        return 1;
      }
      if (event.key === "2") {
        this.mode = 2;
        return 2;
      }
      if (event.key === "3") {
        this.mode = 3;
        return 3;
      }
    });
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
    //select mode
    if (this.mode === 0) {
      this.showModeSelect(svg);
      return;
    }

    this.player1_score.render(svg, this.player1.score);
    this.player2_score.render(svg, this.player2.score);

    this.bonus.render(svg, this.player1, this.player2);
    if (!this.bonus.visable) {
      this.bonus = new Bonus(this.width, this.height);
    }
    for (let eachBall of this.ball) {
      eachBall.render(svg, this.player1, this.player2);
    }

    if (this.mode === 1||this.mode===3) {
      if (
        this.ball.length > 0 &&
        this.ball[0].x > this.width / 2 &&
        this.ball[0].x % 40 === 0
      ) {
        this.ai(this.player2);
      }
      if (this.mode === 3) {
        if (
          this.ball.length > 0 &&
          this.ball[0].x < this.width / 2 &&
          this.ball[0].x % 40 === 0
        ) {
          this.ai(this.player1);
        }
      }
    }

    this.player1.render(svg);
    this.player2.render(svg);
  }
}
