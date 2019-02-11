import { SVG_NS } from "../settings";
export default class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  render(svg) {
    //the board background
    let rect = document.createElementNS(SVG_NS, "rect");
    rect.setAttributeNS(null, "width", this.width);
    rect.setAttributeNS(null, "height", this.height);
    rect.setAttributeNS(null, "color", "#353535");
    // this.gameElement.appendChild(rect);

    // dashed dividing line
    let line = document.createElementNS(SVG_NS, "line");
    line.setAttributeNS(null, "stroke-dasharray", "20, 10");
    line.setAttributeNS(null, "x1", this.width / 2);
    line.setAttributeNS(null, "y1", this.height);
    line.setAttributeNS(null, "x2", this.width / 2);
    line.setAttributeNS(null, "y2", 0);
    line.setAttributeNS(null, "stroke", "white");
    line.setAttributeNS(null, "stroke-width", 3);
    // this.gameElement.appendChild(line);

    svg.appendChild(rect);
    svg.appendChild(line);
  }
}
