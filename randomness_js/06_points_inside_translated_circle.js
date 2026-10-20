const r = require("raylib");

function setup() {
  const width = 800;
  const height = 500;
  const fps = 60;

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(width, height, "random");
  r.SetTargetFPS(fps);

  const circle = {
    x: 400,
    y: 250,
    radius: 150,
  };

  const startXValue = 0;
  const endXValue = circle.radius;
  const x1 = startXValue;
  const x2 = endXValue - startXValue;

  const startYValue = 0;
  const endYValue = 360;
  const y1 = startYValue;
  const y2 = endYValue - startYValue;

  const numberOfValues = 100;

  const xAxis = random(numberOfValues, x1, x2);
  const yAxis = random(numberOfValues, y1, y2);

  return { xAxis, yAxis, numberOfValues, height, circle };
}

function random(numberOfValues, x1, x2) {
  const values = [];
  for (let a = 0; a < numberOfValues; a++) {
    values.push(x1 + Math.random() * x2);
  }
  return values;
}

function drawCircle(world) {
  const colour = r.ColorAlpha(r.WHITE, 0.6);

  for (let key = 0; key < world.numberOfValues; key++) {
    const distance =
      world.xAxis[key] * Math.cos(world.yAxis[key]) + world.circle.x;
    const angle =
      world.xAxis[key] * Math.sin(world.yAxis[key]) + world.circle.y;

    r.DrawCircle(distance, angle, 10, colour);
  }
}

function draw(world) {
  r.BeginDrawing();
  r.ClearBackground(r.DARKBLUE);

  drawCircle(world);
  r.DrawCircleLines(
    world.circle.x,
    world.circle.y,
    world.circle.radius,
    r.WHITE,
  );

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
