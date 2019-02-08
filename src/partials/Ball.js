import { SVG_NS } from "../settings";
export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.vy = Math.floor(Math.random() * 10 - 5);
    this.vx = this.direction * (6 - Math.abs(this.vy));
  }
  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
  }
  render(svg) {
    //<circle r="8" cx="256" cy="128" fill="white" />
    let circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttributeNS(null, "r", this.radius);
    circle.setAttributeNS(null, "cx", this.boardWidth / 2);
    circle.setAttributeNS(null, "cy", this.boardHeight / 2);
    circle.setAttributeNS(null, "fill", "white");
    svg.appendChild(circle);
  }
}
