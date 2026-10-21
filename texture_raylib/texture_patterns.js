const r = require("raylib");

function setup() {
  screen = {
    width: 500,
    height: 400,
    fps: 60,
  };

  const triangle = {
    pointA: { x: 0, y: 30 },
    pointB: { x: 30, y: 30 },
    pointC: { x: 30, y: 0 },
  };

  const source = {
    x: 0,
    y: 0,
    width: 30,
    height: 30,
  };

  const flippedsource = {
    x: 0,
    y: 0,
    width: -30,
    height: -30,
  };

  r.InitWindow(screen.width, screen.height, "circles");
  r.SetTargetFPS(screen.fps);
  const target = r.LoadRenderTexture(30, 30);

  return {
    target,
    source,
    flippedsource,
    triangle,
  };
}

function drawTexture(target, triangle) {
  r.BeginTextureMode(target);
  r.ClearBackground(r.DARKBLUE);

  r.DrawTriangle(triangle.pointA, triangle.pointB, triangle.pointC, r.WHITE);

  r.EndTextureMode();
}

function draw(target, source, flippedsource) {
  r.BeginDrawing();
  r.ClearBackground(r.DARKBLUE);

  for (let b = 0; b < 350; b += 60) {
    for (let a = 0; a < 480; a += 30) {
      r.DrawTextureRec(
        target.texture,
        source,
        { x: 10 + a, y: 10 + b },
        r.WHITE,
      );
      r.DrawTextureRec(
        target.texture,
        flippedsource,
        { x: 10 + a, y: 40 + b },
        r.WHITE,
      );
    }
  }

  r.EndDrawing();
}

function loop(target, source, flippedsource, triangle) {
  while (!r.WindowShouldClose()) {
    draw(target, source, flippedsource);
    drawTexture(target, triangle);
  }
}

function teardown() {
  r.CloseWindow();
}

function main() {
  const world = setup();
  loop(world.target, world.source, world.flippedsource, world.triangle);
  teardown();
}

main();
