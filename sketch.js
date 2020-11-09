let wSize = [0,0];
let fps = 20;
let header;
let currencies = [];

function preload(){
  degrees(radians);
  // put preload code here
}
function resetFC() {
  frameCount = 0;
  header.style("top","-100px");
}
function setup() {
  wSize = [windowWidth,windowHeight];
  createCanvas(wSize[0],wSize[1]);
  frameRate(fps);
  textFont("Exo2");
  header = createElement("div","SDSTREF");
  header.addClass("headClass");
  header.style("display","none");
  header.mouseClicked(resetFC);
  header.mouseOver(onHeader);
  header.mouseOut(offHeader);
  currencies.push(new moneyFalling());
  // put setup code here
}

function windowResized() {
  wSize = [windowWidth,windowHeight];
  resizeCanvas(wSize[0],wSize[1]);
}

function draw() {
  background(0);
  // put drawing code here

  if(random(0,1) < 0.5)
    currencies.push(new moneyFalling());
  currencies.forEach((c, ic) => {
    if(c.tickit())
      currencies.splice(ic,1);
  });

  if(typeText(["Submartingale", "Dynamic", "Short-Term", "Renewable", "Equity", "Fund"],min(wSize[0]/15,wSize[1]/12,80),[wSize[0]/2,wSize[1]/2],frameCount/fps)) {
    if (header.style("display") == "none") {
      header.style("display","block");
    }
    else {
      header.style("top","0");
    }
    let pulseperiod = 4;
    let pulse = (3+sin(2*PI*frameCount/fps/pulseperiod))/3;
    header.style("font-size",str(pulse*64)+"px");
    pulse = 1-pulse;
    header.style("color","rgb("+str(pulse*30)+","+str(pulse*60)+","+str(pulse*30)+")");
  }

}
