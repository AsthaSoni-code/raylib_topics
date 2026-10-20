const r = require("raylib");

function setup() {
  r.InitWindow(800, 400, "circles");
  r.SetTargetFPS(60);
  const target = r.LoadRenderTexture(200, 200);

  return target;
}

function drawTexture(target) {
  r.BeginTextureMode(target);
  r.ClearBackground(r.BLACK);

  r.DrawCircle(100, 100, 60, r.RED);
  r.DrawRectangle(75, 80, 50, 50, r.WHITE);
  r.DrawCircle(100, 100, 10, r.BLUE);

  r.EndTextureMode();
}

function draw(target) {
  r.BeginDrawing();
  r.ClearBackground(r.DARKGRAY);

  r.DrawTexture(target.texture, 50, 50, r.WHITE);
  r.DrawTexture(target.texture, 300, 50, r.WHITE);
  r.DrawTexture(target.texture, 550, 50, r.WHITE);

  r.EndDrawing();
}

function loop(target) {
  while (!r.WindowShouldClose()) {
    draw(target);
    drawTexture(target);
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
