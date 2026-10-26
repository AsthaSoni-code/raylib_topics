const r = require("raylib");

function setup() {
  const width = 600;
  const height = 400;
  const fps = 60;

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(width, height, "random");
  r.SetTargetFPS(fps);

  const numberOfValues = 50;

  randomValues = getRandomPoints(numberOfValues);

  return { randomValues, numberOfValues, height };
}

function random(x1, x2) {
  return x1 + Math.random() * (x2 - x1);
}

function getRandomPoints(numberOfValues) {
  const values = [];

  for (let a = 0; a < numberOfValues; a++) {
    const xAxis = random(200, 250);

    values.push(xAxis);
  }
  return values;
}

function drawLines(world) {
  for (let key = 0; key < world.numberOfValues; key++) {
    r.DrawLine(
      world.randomValues[key],
      0,
      world.randomValues[key],
      world.height,
      r.WHITE,
    );
  }
}

function draw(world) {
  r.BeginDrawing();
  r.ClearBackground(r.DARKBLUE);

  drawLines(world);

  r.EndDrawing();
}

function loop(world) {
  while (!r.WindowShouldClose()) {
    draw(world);
  }
}

function teardown() {
  r.CloseWindow();
}

function main() {
  const world = setup();
  loop(world);
  teardown();
}

main();
