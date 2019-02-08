import { SVG_NS } from "../settings";
export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;

    this.reset();
  }
  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
    //generate a random number between -5 and 5
    this.vy = Math.floor(Math.random() * 10 - 5);
    while (!this.vy) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }
    //setting a number between -5 and 5 depends on vy
    this.vx = this.direction * (6 - Math.abs(this.vy));
  }
  wallCollision() {
    const hitTop = this.y - this.radius < 0;
    const hitBottom = this.y + this.radius > this.boardHeight;
    const hitLeft = this.x - this.radius < 0;
    const hitRight = this.x + this.radius > this.boardWidth;
    //top   or  bottom
    if (hitTop || hitBottom) {
      this.vy *= -1;
    }
    // left or right
    if (hitLeft || hitRight) {
      this.vx *= -1;
    }
  }
  paddleCollision(player1, player2) {
    if (this.vx > 0) {
      //detect player2 collision
      let { leftX, rightX, topY, bottomY } = player2.coordinates();
      if (
        this.x + this.radius >= leftX &&
        this.y >= topY &&
        this.y <= bottomY
      ) {
        this.vx *= -1;
      }

      //edge detection top and bottom
      if (this.x >= leftX && this.y >= topY && this.y <= bottomY) {
        this.vy *= -1;
      }
    } else {
      //detect player1 collision
      let { leftX, rightX, topY, bottomY } = player1.coordinates();
      if (
        this.x - this.radius <= rightX &&
        this.y >= topY &&
        this.y <= bottomY
      ) {
        this.vx *= -1;
      }

      //edge detection top and bottom
      if (this.x <= rightX && this.y >= topY && this.y <= bottomY) {
        this.vy *= -1;
      }
    }
  }
  goal(player) {
    //increase score
    player.score++;
    //reset the ball
    this.reset();
  }

  render(svg, player1, player2) {
    this.x += this.direction * this.vx;
    this.y += this.direction * this.vy;
    this.paddleCollision(player1, player2);
    this.wallCollision();
    let circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttributeNS(null, "r", this.radius);
    circle.setAttributeNS(null, "cx", this.x);
    circle.setAttributeNS(null, "cy", this.y);
    circle.setAttributeNS(null, "fill", "white");
    svg.appendChild(circle);

    //detect goal
    const rightGoal = this.x + this.radius >= this.boardWidth;
    const leftGoal = this.x - this.radius <= 0;
    if (rightGoal) {
      this.goal(player2);
      this.direction = 1;
    }
    if (leftGoal) {
      this.goal(player1);
      this.direction = -1;
    }
  }
}
