const r = require("raylib");

function setup() {
  const width = 800;
  const height = 800;
  const fps = 60;

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(width, height, "random");
  r.SetTargetFPS(fps);

  const circle = {
    x: 350,
    y: 350,
    radius: 150,
  };

  const rectangle = {
    x: 200,
    y: 200,
    width: 300,
    height: 300,
  };

  const numberOfPoints = 1000;

  const randomValues = getRandomPoints(numberOfPoints, rectangle);

  return { randomValues, circle, rectangle, numberOfPoints, height };
}

function random(x1, x2) {
  return x1 + Math.random() * (x2 - x1);
}

function getRandomPoints(numberOfPoints, rectangle) {
  const values = [];

  for (let a = 0; a < numberOfPoints; a++) {
    const xAxis = random(rectangle.x, rectangle.x + rectangle.width);
    const yAxis = random(rectangle.y, rectangle.y + rectangle.height);

    values.push({ x: xAxis, y: yAxis });
  }
  return values;
}

function drawCircle(world) {
  const colour = r.ColorAlpha(r.WHITE, 0.6);

  for (let key = 0; key < world.numberOfPoints; key++) {
    r.DrawCircle(
      world.randomValues[key].x,
      world.randomValues[key].y,
      10,
      colour,
    );
  }
}

function distance(x1, y1, x2, y2) {
  const x = x2 - x1;
  const y = y2 - y1;

  return Math.sqrt(x ** 2 + y ** 2);
}

function calcDistance(world) {
  const pointInside = [];

  for (let key = 0; key < world.numberOfPoints; key++) {
    const x1 = world.randomValues[key].x;
    const y1 = world.randomValues[key].y;
    const x2 = world.circle.x;
    const y2 = world.circle.y;

    const isInsideCircle = distance(x1, y1, x2, y2) <= world.circle.radius;
    pointInside.push(isInsideCircle);
  }
  return pointInside;
}

function count(array) {
  let sum = 0;

  for (let key = 0; key < array.length; key++) {
    if (array[key]) {
      sum++;
    }
  }
  return sum;
}

function percentage(world) {
  const numberOfPointsInCircle = count(calcDistance(world));

  return numberOfPointsInCircle / world.numberOfPoints;
}

function areaOfCircle(world) {
  return percentage(world) * Math.pow(world.rectangle.width, 2);
}

function draw(world) {
  r.BeginDrawing();
  r.ClearBackground(r.DARKBLUE);

  drawCircle(world);

  console.log(areaOfCircle(world));

  r.DrawRectangleLinesEx(world.rectangle, 2, r.MAROON);

  r.DrawCircleLines(
    world.circle.x,
    world.circle.y,
    world.circle.radius,
    r.MAROON,
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
