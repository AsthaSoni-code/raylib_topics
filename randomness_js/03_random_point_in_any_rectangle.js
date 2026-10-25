const r = require("raylib");

function setup() {
  const width = 800;
  const height = 500;
  const fps = 60;

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(width, height, "random");
  r.SetTargetFPS(fps);

  const rectangle = {
    x: 200,
    y: 100,
    width: 400,
    height: 250,
  };

  const numberOfValues = 100;

  const randomValue = getRandomPoints(numberOfValues, rectangle);

  return { randomValue, numberOfValues, height, rectangle };
}

function random(x1, x2) {
  return x1 + Math.random() * (x2 - x1);
}

function getRandomPoints(numberOfValues, rectangle) {
  const values = [];
  for (let a = 0; a < numberOfValues; a++) {
    const xAxis = random(rectangle.x, rectangle.x + rectangle.width);
    const yAxis = random(rectangle.y, rectangle.y + rectangle.height);
    values.push({ x: xAxis, y: yAxis });
  }
  return values;
}

function drawCircle(world) {
  const colour = r.ColorAlpha(r.WHITE, 0.6);

  for (let key = 0; key < world.numberOfValues; key++) {
    r.DrawCircleV(world.randomValue[key], 10, colour);
  }
}

function draw(world) {
  r.BeginDrawing();
  r.ClearBackground(r.DARKBLUE);

  drawCircle(world);
  r.DrawRectangleLinesEx(world.rectangle, 2, r.WHITE);

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
