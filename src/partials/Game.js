import { SVG_NS } from "../settings";
import Board from "./Board"
import Paddle from "./Paddle";
export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;
    this.gameElement = document.getElementById(this.element);
    this.board=new Board(this.width,this.height);
    this.paddle1= new Paddle(this.height,8,56,484,100); 
    this.paddle2= new Paddle(this.height,8,56,20,100); 
  
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
    this.paddle1.render(svg);
    this.paddle2.render(svg);
  }
}
