const r = require("raylib");

function setup() {
  const width = 800;
  const height = 500;
  const fps = 60;

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(width, height, "random");
  r.SetTargetFPS(fps);

  const line = { x1: 200, y1: 150, x2: 500, y2: 150 };

  const parallelogram = { angle: 110, height: 100 };

  const numberOfValues = 100;

  const offSet = calcOffSet(parallelogram);

  const randomValues = getRandomPoints(
    numberOfValues,
    line,
    parallelogram,
    offSet,
  );

  return { randomValues, parallelogram, numberOfValues, height, line, offSet };
}

function random(x1, x2) {
  return x1 + Math.random() * (x2 - x1);
}

function getRandomPoints(numberOfValues, line, parallelogram, offSet) {
  const values = [];

  for (let a = 0; a < numberOfValues; a++) {
    const yAxis = line.y1 + random(0, 1) * parallelogram.height;
    const shift = ((yAxis - line.y1) / parallelogram.height) * offSet;
    const xAxis = random(200 - shift, 500 - shift);

    values.push({ x: xAxis, y: yAxis });
  }
  return values;
}

function drawCircle(world) {
  const colour = r.ColorAlpha(r.WHITE, 0.6);

  for (let key = 0; key < world.numberOfValues; key++) {
    r.DrawCircleV(world.randomValues[key], 10, colour);
  }
}

function calcAngle(parallelogram) {
  return Math.floor((360 - parallelogram.angle * 2) / 2);
}

function calcOffSet(parallelogram) {
  return Math.floor(parallelogram.height / Math.tan(calcAngle(parallelogram)));
}

function drawParallelogram(parallelogram, line, offSet) {
  const height = 150 + parallelogram.height;

  r.DrawLine(line.x1, line.y1, line.x2, line.y2, r.WHITE);
  r.DrawLine(line.x1, line.y1, line.x1 - offSet, height, r.WHITE);
  r.DrawLine(line.x1 - offSet, height, line.x2 - offSet, height, r.WHITE);
  r.DrawLine(line.x2, line.y2, line.x2 - offSet, height, r.WHITE);
}

function draw(world) {
  r.BeginDrawing();
  r.ClearBackground(r.DARKBLUE);

  drawCircle(world);
  drawParallelogram(world.parallelogram, world.line, world.offSet);

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
