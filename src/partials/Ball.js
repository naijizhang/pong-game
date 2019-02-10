import { SVG_NS } from "../settings";
export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.ping = new Audio("public/sounds/pong-01.wav");
    //this.yesSound = new Audio("public/sounds/yes-1.wav");
    this.tailLength = 15;
    this.reset();
  }
  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
    this.xlist = [];
    this.ylist = [];
    for (let i = 0; i < this.tailLength; i++) {
      this.enqueue(this.x, this.y);
    }
    //generate a random number between -5 and 5
    this.vy = Math.floor(Math.random() * 10 - 5);
    while (!this.vy) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }
    //setting a number between -5 and 5 depends on vy
    this.vx = this.direction * (6 - Math.abs(this.vy));

    if (this.direction === 1) {
      this.vx = Math.abs(this.vx);
    } else {
      this.vx = -Math.abs(this.vx);
    }
  }
  enqueue(x, y) {
    this.xlist.unshift(x);
    this.ylist.unshift(y);
  }
  dequeue() {
    this.xlist.pop();
    this.ylist.pop();
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
        this.ping.play();
      }

      //edge detection top and bottom
      if (this.x >= leftX && this.y >= topY && this.y <= bottomY) {
        this.vy *= -1;
        this.ping.play();
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
        this.ping.play();
      }

      //edge detection top and bottom
      if (this.x <= rightX && this.y >= topY && this.y <= bottomY) {
        this.vy *= -1;
        this.ping.play();
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
    this.x += this.vx;
    this.y += this.vy;
    this.enqueue(this.x, this.y);
    this.dequeue();
    this.paddleCollision(player1, player2);
    this.wallCollision();
    let tailRadius = this.radius;
    let tailOpacity = 1;
    this.xlist.forEach((item, index) => {
      let circle = document.createElementNS(SVG_NS, "circle");
      if(index!=0&&index%2===0){
        return;
      }
      if(index>5){
        tailRadius--;
      }
      circle.setAttributeNS(null, "r", tailRadius);
      circle.setAttributeNS(null, "cx", item);
      circle.setAttributeNS(null, "cy", this.ylist[index]);
      circle.setAttributeNS(null, "fill", "red");
      tailOpacity -= 0.1;
      circle.setAttributeNS(null, "fill-opacity", tailOpacity);
      svg.appendChild(circle);
    });
    // let circle = document.createElementNS(SVG_NS, "circle");
    // circle.setAttributeNS(null, "r", this.radius);
    // circle.setAttributeNS(null, "cx", this.x);
    // circle.setAttributeNS(null, "cy", this.y);
    // circle.setAttributeNS(null, "fill", "white");
    // svg.appendChild(circle);

    //detect goal
    const leftGoal = this.x + this.radius >= this.boardWidth;
    const rightGoal = this.x - this.radius <= 0;
    if (rightGoal) {
      this.direction = -1;
      this.goal(player2);
    }
    if (leftGoal) {
      this.direction = 1;
      this.goal(player1);
    }
  }
}
