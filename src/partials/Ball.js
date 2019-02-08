import { SVG_NS } from "../settings";
export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;

    this.reset();
    this.vy = Math.floor(Math.random() * 10 - 5);
    while (!this.vy) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }
    this.vx = this.direction * (6 - Math.abs(this.vy));
  }
  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
  }
  wallCollision() {
    //top   or  bottom
    if (this.y - this.radius < 0 || this.y + this.radius > this.boardHeight) {
      this.vy *= -1;
    }
    // left or right

    if (this.x - this.radius < 0 || this.x + this.radius > this.boardWidth) {
      this.vx *= -1;
    }

    //left
  }
  render(svg) {
    this.wallCollision();
    let circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttributeNS(null, "r", this.radius);
    circle.setAttributeNS(null, "cx", (this.x += this.direction * this.vx));
    circle.setAttributeNS(null, "cy", (this.y += this.direction * this.vy));
    circle.setAttributeNS(null, "fill", "white");
    svg.appendChild(circle);
  }
}
