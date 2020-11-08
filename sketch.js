let wSize = [0,0];
let fps = 20;
let header;

function preload(){
  // put preload code here
}

function setup() {
  wSize = [windowWidth,windowHeight];
  createCanvas(wSize[0],wSize[1]);
  frameRate(fps);
  textFont("Exo2");
  header = createElement("div");
  header.addClass("headClass");
  header.style("display","none");
  header.style("opacity","0");
  // put setup code here
}

function windowResized() {
  wSize = [windowWidth,windowHeight];
  resizeCanvas(wSize[0],wSize[1]);
}

function draw() {
  // put drawing code here
  background(0);
  if(typeText(["Submartingale", "Dynamic", "Short-Term", "Renewable", "Equity", "Fund"],min(wSize[0]/15,wSize[1]/12,80),[wSize[0]/2,wSize[1]/2],frameCount/fps)) {
    header.style("display","block");
    header.style("opacity",str(min(1,0.5/fps+float(header.style("opacity")))));
  }

}
