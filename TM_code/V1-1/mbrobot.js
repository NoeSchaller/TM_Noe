_axe = 0.097;

function w(d1, d2, s1, s2) {
  sim.robots[0].i2c.write(0x10, [0, d1, s1]);
  sim.robots[0].i2c.write(0x10, [2, d2, s2]);
}
function setSpeed(speed) {
  if (speed < 20) {
    _v = speed + 5;
  } else {
    _v = speed;
  }
}
function forward() {
  w(1, 1, _v, _v);
}
function backward() {
  w(2, 2, _v, _v);
}
function stop() {
  w(0, 0, 0, 0);
}
function right() {
  let d1 = 2, d2 = 1;
  if (_v > 0) { d1 = 1, d2 = 2; }
  w(d1, d2, Math.round(_v * 0.9), Math.round(_v * 0.9));
}

function left() {
  let d1 = 1,
    d2 = 2;
  if (_v > 0) {
    d1 = 2;
    d2 = 1;
  }
  w(d1, d2, Math.round(_v * 0.9), Math.round(_v * 0.9));
}

function rightArc(r) {
  let v1, f;
  v = Math.abs(_v);

  if (r < _axe) {
    v1 = 0;
  } else {
    f = ((r - _axe) / (r + _axe)) * (1 - (v * v) / 20000);
    v1 = Math.round(f * v);
  }
  if (_v > 0) {
    w(1, 1, v, v1);
  } else {
    w(2, 2, v1, v);
  }
}

function leftArc(r) {
  let v1, f;
  v = Math.abs(_v);

  if (r < _axe) {
    v1 = 0;
  } else {
    f = ((r - _axe) / (r + _axe)) * (1 - (v * v) / 20000);
    v1 = Math.round(f * v);
  }
  if (_v > 0) {
    w(1, 1, v1, v);
  } else {
    w(2, 2, v, v1);
  }
}

function getDistance() {
  return sim.robots[0].getDistance();
}

function setLED(on) {
  sim.robots[0].pin8.write_digital(on);
  sim.robots[0].pin12.write_digital(on);
}

function setMbrobot() {
  _v = 50;
  irLeft = sim.robots[0].pin13;
  irRight = sim.robots[0].pin14;
  ledLeft = sim.robots[0].pin8;
  ledRight = sim.robots[0].pin12;
}
