function typeText(linesList,size,pos,time,starttime,alignList,timeout = true, outTime=1) {
  time = time-starttime;
  let secperchar = 0.05;
  let maxChar = time/secperchar;
  let endTypeTime = linesList.join("").length*secperchar;
  if (time < endTypeTime+outTime || !timeout) {
    fill(255,255,255,255);
    stroke(0);
    textAlign(alignList[0],alignList[1]);
    textSize(size);
    if (time > endTypeTime && timeout) {
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
    this.startspeed = random(40/fps,240/fps);
    this.speed = this.startspeed;
    this.opacity = random(50,150);
  }
  tickit() {
    if (this.pos[1]<wSize[1]) {
      if (dist(mouseX,mouseY,this.pos[0],this.pos[1])<120) {
        this.speed = max(this.speed/1.5,10/fps);
        this.opacity += 1;
      }
      else {
        this.speed += (this.startspeed-this.speed)/1.5;
      }
      this.pos[1] += this.speed;
      this.rotate += (PI-this.rotate)*this.speed/fps/20;
      //this.size *= (1.00+this.speed/(140/fps)/100);
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
  header.style("background-color","rgba(200,200,200,0)");
}
function descOut() {
  if (descTime == 0) descTime = frameCount/fps;
  window.history.pushState('aboutus', 'SDSTREF - About us', '?p=aboutus');
}
function invOut() {
  window.history.pushState('invest', 'SDSTREF - Invest', '?p=invest');
}
