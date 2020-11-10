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
  constructor(pos = [random(0,wSize[0]),0],size = random(20,60), opac = random(50,150),startspeed = random(40/fps,240/fps)) {
    this.pos = pos;
    this.symbol = random(["$","€","$","€","$","€","£","₿","₽","¥"]);
    this.size = size;
    this.rotate = random(0,2*PI);
    this.startspeed = startspeed;
    this.speed = this.startspeed;
    this.opacity = opac;
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
function makePixelPhoto() {
  let leftMarginPh = (wSize[0]-wSize[1]*capture.width/capture.height)/2;
  let widthPh = wSize[1]*capture.width/capture.height;
  let sizeSample = [64,48];
  let col;
  capture.loadPixels();
  for (let x = 0; x < sizeSample[0]; x++) {
    for (let y = 0; y < sizeSample[1]; y++) {
      //col = get(round(x*capture.width/sizeSample[0]), round(y*capture.height/sizeSample[1]));
      col = (capture.pixels[(x*capture.width/sizeSample[0]+y*capture.height/sizeSample[1]*capture.width)*4]+
            capture.pixels[(x*capture.width/sizeSample[0]+y*capture.height/sizeSample[1]*capture.width)*4+1]+
            capture.pixels[(x*capture.width/sizeSample[0]+y*capture.height/sizeSample[1]*capture.width)*4+2])/3/255;
      push();
      fill(50,255,50,col*255);
      noStroke();
      textAlign(CENTER,CENTER);
      textSize(20);
      text("€", (x+0.5)*widthPh/sizeSample[0]+leftMarginPh, y*wSize[1]/sizeSample[1]);
      pop();
    }
  }
  capture.updatePixels();
  let valuespersec = 80;
  for (let i = 0; i < valuespersec/fps; i++) {
    stocksPerformance.push(stocksPerformance[stocksPerformance.length-1]*exp(randomGaussian(0.8/widthPh, 0.01)));
    stocksTime ++;
  }
  while (stocksPerformance.length > widthPh) {
    stocksPerformance.shift();
  }
  let average = stocksPerformance.reduce((a, b) => a + b) / stocksPerformance.length;
  push();
  strokeWeight(2);
  stroke(255);
  let yscale = 1;
  for (var x = 1; x < stocksPerformance.length; x++) {
    yscale = wSize[1]/(0.01+abs(stocksPerformance[stocksPerformance.length-1]-stocksPerformance[0]));
    if (stocksPerformance[x]>stocksPerformance[x-1]) {
      stroke(100,255,100,255);
    }
    else {
      stroke(255,100,100,255);
    }
    line(x-1+leftMarginPh,wSize[1]/2+(average-stocksPerformance[x-1])*yscale,x+leftMarginPh,wSize[1]/2+(average-stocksPerformance[x])*yscale);
  }
  pop();
  push();
  fill(255);
  noStroke();
  textAlign(CENTER,CENTER);
  textSize(20);
  text(round(stocksPerformance[stocksPerformance.length-1],2)+"€", wSize[0]/2, wSize[1]*0.9);
  text(round(stocksTime/widthPh,1)+" years", wSize[0]/2, wSize[1]*0.9-32);
  pop();
}
