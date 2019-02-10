import { SVG_NS } from "../settings";
import { SVG_XLINK } from "../settings";
export default class Bonus {
  constructor(boardWidth, boardHeight) {
    //size
    this.width = 20;
    this.height = 20;
    //shot position
    this.y = Math.floor(Math.random() * (boardHeight - this.height));
    this.x = boardWidth / 2;
    this.direction = Math.random() < 0.5 ? -1 : 1;
    //random speed from 2 to 5
    this.speed = this.direction * Math.floor(Math.random() * 3 + 2);

    //effect to paddles
    this.type = Math.floor(Math.random() * 3);
    switch (this.type) {
      case 0: //paddle length
        //length: -5 to 5
        this.length = Math.floor(Math.random() * 20 + 10);
        this.img = "../../public/images/increase-size-option.svg";
        break;
      case 1: //score increase
        this.score = 2;
        this.img = "../../public/images/doughnut.svg";
        break;
      case 2: //score decrease
        this.score = -2;
        this.img = "../../public/images/bomb.svg";
        break;
    }
    this.whatSound = new Audio("public/sounds/what-1.wav");
    this.yeshahaSound = new Audio("public/sounds/yes-hahahaa.wav");
    this.bombSound = new Audio("public/sounds/pong-04.wav");
    this.visable = true;
    this.passed = false;
  }
  paddleCollision(player1, player2) {
    if (this.direction > 0) {
      //detect player2 collision
      let { leftX, rightX, topY, bottomY } = player2.coordinates();
      if (this.x > rightX) {
        this.passed = true;
      }
      if (
        this.x + this.width >= leftX &&
        this.y + this.height >= topY &&
        this.y <= bottomY
      ) {
        this.goal(player2);
        this.visable = false;
        return true;
      }
    } else {
      //detect player1 collision
      let { leftX, rightX, topY, bottomY } = player1.coordinates();
      if (this.x < leftX) {
        this.passed = true;
      }
      if (
        this.x <= rightX &&
        this.y + this.height >= topY &&
        this.y <= bottomY
      ) {
        this.goal(player1);
        this.visable = false;
        return true;
      }
    }
  }
  goal(player) {
    switch (this.type) {
      case 0: //paddle length
        player.height += this.length;
        this.whatSound.play();
        break;
      case 1: //score increase
        player.score += this.score;
        this.yeshahaSound.play();
        break;
      case 2: //score decrease
        player.score += this.score;
        this.bombSound.play();
        break;
    }
  }

  render(svg, player1, player2) {
    if ((!this.passed)&&this.visable) {
      if (!this.paddleCollision(player1, player2)) {
        this.x += this.speed;
        let image = document.createElementNS(SVG_NS, "image");
        image.setAttributeNS(null, "x", this.x);
        image.setAttributeNS(null, "y", this.y);
        image.setAttributeNS(null, "width", this.width);
        image.setAttributeNS(null, "height", this.height);
        image.setAttributeNS(SVG_XLINK, "href", this.img);
        svg.appendChild(image);
      }
    }
  }
}

//setAttributeNS(, 'href', url);
