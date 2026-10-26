const r = require("raylib");

function setup() {
  const width = 800;
  const height = 500;
  const fps = 60;

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(width, height, "random");
  r.SetTargetFPS(fps);

  const circle = {
    x: 0,
    y: 0,
    radius: 400,
  };

  const numberOfValues = 1000;

  const randomValues = getRandomPoints(numberOfValues, circle);

  return { numberOfValues, circle, randomValues };
}

function random(x1, x2) {
  return x1 + Math.random() * (x2 - x1);
}

function getRandomPoints(numberOfValues, circle) {
  const values = [];

  for (let a = 0; a < numberOfValues; a++) {
    const yAxis = random(circle.y, 360);
    const xAxis = random(circle.x, circle.radius);
    values.push({ x: xAxis, y: yAxis });
  }
  return values;
}

function drawCircle(world) {
  const colour = r.ColorAlpha(r.WHITE, 0.6);

  for (let key = 0; key < world.numberOfValues; key++) {
    const distance =
      world.randomValues[key].x * Math.cos(world.randomValues[key].y);
    const angle =
      world.randomValues[key].x * Math.sin(world.randomValues[key].y);

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
