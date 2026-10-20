const r = require("raylib");

function setup() {
  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(900, 500, "texture");
  r.SetTargetFPS(60);
  const target = r.LoadRenderTexture(200, 200);

  return target;
}

function drawTexture(target) {
  r.BeginTextureMode(target);
  r.ClearBackground(r.RAYWHITE);

  r.DrawCircle(100, 100, 60, r.RED);
  r.DrawCircle(80, 80, 15, r.WHITE);

  r.EndTextureMode();
}

function draw(target) {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

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
