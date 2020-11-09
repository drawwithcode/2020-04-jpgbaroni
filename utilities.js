function typeText(linesList,size,pos,time) {
  let secperchar = 0.07;
  let maxChar = time/secperchar;
  let endTypeTime = linesList.join("").length*secperchar;
  let outTime = 2;
  if (time < endTypeTime+outTime) {
    fill(255,255,255,255);
    stroke(0);
    textAlign(CENTER,CENTER);
    textSize(size);
    if (time > endTypeTime) {
      fill(255,255,255,255-255*(time-endTypeTime)/outTime);
    }
    let ichar = 0;
    let toType = "";
    for (let iline = 0; iline < linesList.length && ichar<maxChar; iline++) {
      let icl
      for (icl = 0; icl < linesList[iline].length && ichar<maxChar; icl++) {
        toType += linesList[iline][icl];
        ichar++;
      }
      if (iline < linesList.length-1) {
        toType += "\n";
      }
    }
    text(toType, pos[0], pos[1]);
    return false
  }
  return true
}

class moneyFalling {
  constructor() {
    this.pos = [random(0,wSize[0]),0];
    this.symbol = random(["$","€","$","€","$","€","£","₿","₽","¥"]);
    this.size = random(20,60);
    this.rotate = random(0,2*PI);
    this.speed = random(40/fps,240/fps);
    this.opacity = random(50,150);
  }
  tickit() {
    if (this.pos[1]<wSize[1]) {
      this.pos[1] += this.speed;
      this.rotate += (PI-this.rotate)*this.speed/fps/20;
      push();
      fill(50,255,50,this.opacity);
      noStroke();
      textAlign(CENTER,CENTER);
      textSize(this.size);
      translate(this.pos[0],this.pos[1]);
      rotate(-PI+this.rotate);
      text(this.symbol, 0, 0);
      pop();
      return false;
    }
    return true;
  }
}

function onHeader() {
  header.style("background-color","rgba(200,200,200,1)");
}
function offHeader() {
  header.style("background-color","rgba(200,200,200,0.5)");
}
