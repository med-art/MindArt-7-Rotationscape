let leaf = [];

let tempwinMouseX = 0;
let tempwinMouseY = 0;
let tempwinMouseX2 = 0;
let tempwinMouseY2 = 0;
let leafLayer, permaLine;
let dotSize = 4;
let dotQty = 20;
let ringQty = 0;
let hueDrift, brightDrift, satDrift;
let throughDotCount = 0;
let longEdge, shortEdge, circleRad, lmax, wmax, hmax;
let primaryArray = [360, 60, 240];
let colHue = 360,
  colSat = 100,
  colBri = 100;
let stage = 0;
let dotsCount = 0;
let hueCapture = 0;
let verifyX = 0;
let verifyY = 0;

let rot = 0
let rotStart = 0;
let rotEnd = 0;


let drawState = 0;

let colTemp;

let getCol = "#EF3340";

let leafSelector = 0;

function preload() {
  bg = loadImage('assets/paper.jpg');
  audio = loadSound('assets/audio.mp3');
  for (i = 0; i < 14; i++) {
    leaf[i] = loadImage('assets/leaf' + [i] + '.png')
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1); // Ignores retina displays
  leafLayer = createGraphics(width, height);
  drawLayer = createGraphics(width, height);
  uiLayer = createGraphics(width, height);
  textLayer = createGraphics(width, height);
  colorMode(HSB, 360, 100, 100, 100);
  leafLayer.colorMode(HSB, 360, 100, 100, 100);
  drawLayer.colorMode(RGB, 255, 255, 255, 100);
  //drawLayer.blendMode(REPLACE);
  dimensionCalc();
  //showIntro();
  slideShow();
}

function dimensionCalc() {
  wmax = width / 100;
  hmax = height / 100;
  if (width > height) {
    longEdge = width;
    shortEdge = height;
    circleRad = shortEdge * 0.45;
    lmax = width / 100;
  } else {
    longEdge = height;
    shortEdge = width;
    lmax = height / 100;
    circleRad = shortEdge * 0.45;
  }

}

function mousePressed() {


  if (introState === 0) {

    slide = 1;
    slideShow();
    introState = 1;

  } else if (introState === 2) {
      audio.loop(7);
    textLayer.clear();
    introState = 3;
    writeTextUI();
    makeSwatch();
    noTint();
    image(bg, 0, 0, width, height);
    rot = 0;
    touchMoved();
  } else if (introState === 3) {

    drawLayer.stroke(0, 0, 0, 0);
    rotStart = atan2(mouseY - height / 2, mouseX - width / 2);

    if (width <= height && mouseY > (height - rectWidth / 2)) {
      getCol = uiLayer.get(winMouseX, winMouseY);
    }

    if (width > height && mouseX < rectWidth / 2) {
      getCol = uiLayer.get(winMouseX, winMouseY);
    }


  }



  //  return false;
}


function touchMoved() {

  if (drawState === 0) {

    leafLayer.push();
    leafLayer.clear();
    leafLayer.imageMode(CENTER);
    leafLayer.translate(width / 2, height / 2);
    rotEnd = atan2(mouseY - height / 2, mouseX - width / 2);
    rot = rot + (rotEnd - rotStart);
    rotStart = rotEnd;

    leafLayer.rotate(rot);
    leafLayer.translate(0, -height / 10);
    leafLayer.tint(255, 10);
    leafLayer.image(leaf[leafSelector], 0, 0, longEdge / 1.75, longEdge / 1.75);
    leafLayer.pop();



  } else if (drawState === 1) {
    makeDrawing(winMouseX, winMouseY, pwinMouseX, pwinMouseY);

  } else if (drawState === 2) {
    wetDrawing(winMouseX, winMouseY, pwinMouseX, pwinMouseY);
  }



  return false;
}


function makeDrawing(_x, _y, pX, pY) {
  drawLayer.strokeWeight(constrain(abs((_y + _x) - (pX + pY)), 5, 10)); // for line work
  drawLayer.stroke(getCol);
  drawLayer.line(_x, _y, pX, pY);
}

function wetDrawing(_x, _y, pX, pY) {
  //  colTemp = drawLayer.get(_x, _y);
  let _r, _g, _b, _a;

  let off = (winMouseY * width + winMouseX) * 1 * 4;

    _r = drawLayer.pixels[off];
    _g = drawLayer.pixels[off + 1];
    _b = drawLayer.pixels[off + 2];
    _a = drawLayer.pixels[off + 3] * 0.2;

  drawLayer.stroke(_r, _g, _b, _a);
  drawLayer.strokeWeight(25); // for line work
  drawLayer.line(_x, _y, pX, pY);
  drawLayer.loadPixels(); // relocated here in effor to optimise


}


function draw() {

  if (introState === 3) {
    image(bg, 0, 0, width, height);
    image(leafLayer, 0, 0, width, height);
    image(drawLayer, 0, 0, width, height);
    image(uiLayer, 0, 0, width, height);
  }

}
