const r = require("raylib");

function setup() {
  const width = 800;
  const height = 800;
  const fps = 60;

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(width, height, "random");
  r.SetTargetFPS(fps);

  const numberOfValues = 1000;

  const startXValue = 200;
  const endXValue = width - 500;
  const x1 = startXValue;
  const x2 = endXValue - startXValue;

  const startYValue = 200;
  const endYValue = height - 500;
  const y1 = startYValue;
  const y2 = endYValue - startYValue;

  const xAxis = random(numberOfValues, x1, x2);
  const yAxis = random(numberOfValues, y1, y2);

  return { xAxis, yAxis, numberOfValues, height };
}

function random(numberOfValues, x1, x2) {
  const values = [];
  for (let a = 0; a < numberOfValues; a++) {
    // values.push(x1 + (Math.random() + Math.random()) * x2);
    // values.push(x1 + (Math.random() - Math.random()) * x2);
    values.push(x1 + (Math.random() / Math.random()) * x2);
    // values.push(
    //   x1 + ((Math.random() + Math.random() + Math.random()) / 3) * x2);
  }
  return values;
}

function drawCircle(world) {
  const colour = r.ColorAlpha(r.WHITE, 0.6);

  for (let key = 0; key < world.numberOfValues; key++) {
    r.DrawCircle(world.xAxis[key], world.yAxis[key], 10, colour);
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
