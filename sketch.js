let wSize = [0,0];
let fps = 20;
let header;
let currencies = [];
let gui;
let descTime = 0;
let investing = false;
let capture;

function preload(){
  degrees(radians);
  // put preload code here
}
function resetFC() {
  frameCount = 0;
  descTime = 0;
  header.style("top","-100px");
  window.history.pushState('home', 'SDSTREF', '?');
}
function setup() {
  wSize = [windowWidth,windowHeight];
  createCanvas(wSize[0],wSize[1]);
  frameRate(fps);
  textFont("Exo2");
  header = createElement("div","");
  header.addClass("headClass");
  header.style("display","none");
  header.mouseOver(onHeader);
  header.mouseOut(offHeader);
  title = createElement("div","SDSTREF");
  title.addClass("titleClass");
  title.mouseClicked(resetFC);
  invest = createElement("div","invest");
  invest.addClass("menuChoice left");
  invest.mouseOver(invOut);
  header.child(invest);
  header.child(title);
  contacts = createElement("div","about us");
  contacts.addClass("menuChoice right");
  contacts.mouseOver(descOut);
  header.child(contacts);

  capture = createCapture(VIDEO);
  capture.hide();
}

function windowResized() {
  wSize = [windowWidth,windowHeight];
  resizeCanvas(wSize[0],wSize[1]);
}

function draw() {
  let params = getURLParams();
  background(0);
  // put drawing code here

  if (random(0,1) < 0.25) {
    currencies.push(new moneyFalling());
  }
  if(params.p != "invest") {
    investing = false;
    if (random(0,1) < 0.25) {
      currencies.push(new moneyFalling());
    }
  }
  else {
    investing = true;
    image(capture,(wSize[0]-wSize[1]*capture.width/capture.height)/2,0,wSize[1]*capture.width/capture.height,wSize[1]);
    typeText(["invest in yourself"],min(wSize[0]/20,wSize[1]/18,80),[wSize[0]/2,wSize[1]-100],frameCount/fps,0,[CENTER,CENTER],false);
  }

  for (var ic = 0; ic < currencies.length; ic++) {
    if(currencies[ic].tickit()) {
      currencies.splice(ic,1);
      ic--;
    }
  }

  if(typeText(["Submartingale", "Dynamic", "Short-Term", "Renewable", "Equity", "Fund"],min(wSize[0]/15,wSize[1]/12,80),[wSize[0]/2,wSize[1]/2],frameCount/fps,0,[CENTER,CENTER])) {
    if (header.style("display") == "none") {
      header.style("display","block");
      document.title = "SDSTREF";
    }
    else {
      header.style("top","0");
    }
    let pulseperiod = 4;
    let pulse = (3+sin(2*PI*frameCount/fps/pulseperiod))/3;
    let fontmax = min(wSize[0]/20,60);
    header.style("font-size",str(pulse*fontmax)+"px");
    pulse = 1-pulse;
    header.style("color","rgb("+str(pulse*30)+","+str(pulse*60)+","+str(pulse*30)+")");
    if (params.p == "aboutus") {
      typeText(["A trustworthy renewable hedge fund at your service.",
                "Stop wasting opportunities and join us: we constantly",
                "outperform the market with 80% annual returns.",
                "Learn more and avoid losing your savings to inflation","",
                "LET                 MONEY                 RAIN"],min(wSize[0]/30,wSize[1]/24,80),[40,wSize[1]/3],frameCount/fps,descTime,[LEFT,TOP],false);
    }
  }


}
