import { SVG_NS } from "../settings";
import { SPEED } from "../settings";
export default class Paddle {
  constructor(boardHeight, width, height, x, y, upKey, downKey) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = SPEED;
    this.score = 0;

    document.addEventListener("keydown", event => {
      switch (event.key) {
        case upKey:
          this.up();
          break;
        case downKey:
          this.down();
          break;
      }
    });
  }
//   coordinates(x, y, width, height) {
//     let leftX = x;
//     let rightX = x + width;
//     let topY = y;
//     let bottomY = y + height;
//     return [leftX, rightX, topY, bottomY];
//   }
  
  up() {
    this.y -= this.speed;
    this.y = Math.max(0, this.y);
  }
  down() {
    this.y += this.speed;
    this.y = Math.min(this.boardHeight - this.height, this.y);
  }
  render(svg) {
    let paddle = document.createElementNS(SVG_NS, "rect");
    paddle.setAttributeNS(null, "width", this.width);
    paddle.setAttributeNS(null, "height", this.height);
    paddle.setAttributeNS(null, "x", this.x);
    paddle.setAttributeNS(null, "y", this.y);
    paddle.setAttributeNS(null, "fill", "white");
    svg.appendChild(paddle);
  }
}
