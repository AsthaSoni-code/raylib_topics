const r = require("raylib");

function setup() {
  const width = 800;
  const height = 400;
  const fps = 60;

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(width, height, "random");
  r.SetTargetFPS(fps);

  const numberOfValues = 100;

  randomValues = getRandomPoints(numberOfValues, height, width);

  return { randomValues, numberOfValues, height, width };
}

function random(x1, x2) {
  return x1 + Math.random() * (x2 - x1);
}

function getRandomPoints(numberOfValues, height, width) {
  const values = [];

  for (let a = 0; a < numberOfValues; a++) {
    const yAxis = random(0, height);
    const xAxis = random(0, width);
    values.push({ x: xAxis, y: yAxis });
  }
  return values;
}

function drawCircle(world) {
  const colour = r.ColorAlpha(r.WHITE, 0.6);

  for (let key = 0; key < world.numberOfValues; key++) {
    r.DrawCircle(
      world.randomValues[key].x,
      world.randomValues[key].y,
      10,
      colour,
    );
  }
}

function draw(world) {
  r.BeginDrawing();
  r.ClearBackground(r.DARKBLUE);

  drawCircle(world);

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
