const r = require("raylib");

function setup() {
  screen = {
    width: 500,
    height: 400,
    fps: 60,
  };

  r.InitWindow(screen.width, screen.height, "circles");
  r.SetTargetFPS(screen.fps);
  const target = r.LoadRenderTexture(30, 30);

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

  return {
    screen,
    target,
    source,
    flippedsource,
  };
}

function drawTexture(target, screen) {
  r.BeginTextureMode(target);
  r.ClearBackground(r.DARKBLUE);

  r.DrawRectangle(0, 0, screen.width, 100, r.WHITE);

  r.EndTextureMode();
}

function draw(target, source) {
  r.BeginDrawing();
  r.ClearBackground(r.DARKBLUE);

  r.DrawTextureRec(target.texture, source, { x: 0, y: 0 }, r.BLUE);

  r.EndDrawing();
}

function loop(target, source) {
  while (!r.WindowShouldClose()) {
    draw(target, source);
    drawTexture(target, screen);
  }
}

function teardown() {
  r.CloseWindow();
}

function main() {
  const world = setup();
  loop(world.target, world.source);
  teardown();
}

main();
