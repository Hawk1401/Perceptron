let dotsX = [];
let dotsY = [];
let w0;
let w1;
let w2;
let m;
let b;
let errSum = 0;
let resting = false;

function setup() {
  rectMode(CENTER);
  createCanvas(1300, 700);
  setDots(700);
  w0 = random(-1, 1);
  w1 = random(-1, 1);
  w2 = random(-1, 1);
  m = random(-0.8, 0.8);
  b = random(-0.8 + m, 0.8 - m);
  frameRate(20);
}

function draw() {
  background(220);

  for (let i = 0; i < dotsX.length; i++) {
    train(dotsX[i], dotsY[i]);
  }
  for (let i = 0; i < dotsX.length; i++) {
    guess(dotsX[i], dotsY[i], i);
  }
  if (errSum === 0 && !resting) {
    console.log("done");
    resting = true;
    setTimeout(function() {
      reset();
      resting = false;
    }, 1000);
  }
  errSum = 0;
  guessLine();
}

function reset() {
  setDots(700);
  w0 = random(-1, 1);
  w1 = random(-1, 1);
  w2 = random(-1, 1);
  m = random(-0.8, 0.8);
  b = random(-0.8 + m, 0.8 - m);
}

function guessLine() {
  stroke("#222");
  line(0, map(f(-1), -1, 1, height, 0), width, map(f(1), -1, 1, height, 0));

  let start = -(w0 * -1 + w2) / w1;
  let end = -(w0 * 1 + w2) / w1;
  let x1_ = map(start, -1, 1, height, 0);
  let x2_ = map(end, -1, 1, height, 0);
  stroke("#ff0000");
  line(0, x1_, width, x2_);
}

function setDots(n) {
  for (let i = 0; i < n; i++) {
    dotsX[i] = random(-1, 1);
    dotsY[i] = random(-1, 1);
  }
}

function drawDot(i) {
  let x_ = map(dotsX[i], -1, 1, 0, width);
  let y_ = map(dotsY[i], -1, 1, height, 0);
  if (label(dotsX[i], dotsY[i]) === 1) {
    stroke(0);
    rect(x_, y_, 10, 10);
  } else {
    stroke(0);
    ellipse(x_, y_, 10);
  }
}

function guess(x0, x1, i) {
  h0 = x0 * w0 + x1 * w1 + w2;
  if (activation(h0) > 0) {
    fill("#0000ff");
    drawDot(i);
  } else {
    fill("#ff0000");
    drawDot(i);
  }
  return activation(h0);
}

function activation(x) {
  if (x <= 0) {
    return -1;
  }
  return 1;
}

function label(x, y) {
  if (f(x) <= y) {
    return -1;
  }
  return 1;
}
function f(x) {
  return m * x + b;
}

function train(x0, x1) {
  let Guess = guess(x0, x1);
  let err = label(x0, x1) - Guess;
  w0 += err * x0 * 0.00005;
  w1 += err * x1 * 0.00005;
  w2 += err * 0.00005;

  if (err < 0) {
    errSum -= err;
  } else {
    errSum += err;
  }
}
