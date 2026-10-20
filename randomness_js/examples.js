const r = require("raylib");

function setup() {
  const width = 600;
  const height = 400;
  const fps = 60;

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(width, height, "random");
  r.SetTargetFPS(fps);

  const numberOfValues = 50;
  const x = random(numberOfValues);

  return { x, numberOfValues, height };
}

function random(numberOfValues) {
  const values = [];
  for (let a = 0; a < numberOfValues; a++) {
    values.push(Math.random() * 600);
  }
  return values;
}

function drawLines(world) {
  for (let key = 0; key < world.numberOfValues; key++) {
    r.DrawLine(world.x[key], 0, world.x[key], world.height, r.WHITE);
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
