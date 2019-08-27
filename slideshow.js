let introText = ["Touch", "Listen", "Look"];
let slide = 0;
let delayTime = 700;
let introState = 0; // 3 way state. State 0 is intro begun, state 1 is intro over and waiting for input, state 2 is active painting
let c1, c2;

function slideShow() {


  if (slide === introText.length) {
      textLayer.clear();
      introState = 3;
      writeTextUI();
      noTint();
      image(bg, 0, 0, width, height);
      rot = 0;
      touchMoved();
      restart();
      makeSwatch();
      console.log(getCol);

  }

  if (slide < introText.length) {
    textLayer.blendMode(BLEND);
    textLayer.clear();
    c2 = color("#FA6122");
    c1 = color("#FA6122");
    //setGradient(c1, c2);
    textLayer.fill("#FA6122");
    textLayer.rectMode(CORNER);
    textLayer.rect(0,0,width,height);
    textLayer.fill(color("WHITE"));
    textLayer.textSize(lmax * 5);
    textLayer.textAlign(CENTER, CENTER);
    textLayer.rectMode(CENTER);
    textLayer.text(introText[slide], width / 2, hmax * 50, width * 0.8, height);
    blendMode(BLEND);
      image(bg, 0, 0, width, height);
    image(textLayer, 0, 0, width, height);

     if (slide > 0){
    slide++;
    setTimeout(slideShow, delayTime);
    }

  }
}

function setGradient(c1, c2) {
  textLayer.noFill();
  for (var y = 0; y < height; y++) {
    var inter = map(y, 0, height, 0, 1);
    var c = lerpColor(c1, c2, inter);
    textLayer.stroke(c);
    textLayer.line(0, y, width, y);
  }
}
