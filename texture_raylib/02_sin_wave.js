const r = require("raylib");

function setup() {
  r.InitWindow(800, 400, "circles");
  r.SetTargetFPS(10);
  const target = r.LoadRenderTexture(600, 300);
  let x = 10;
  let y = 100;

  return {
    target,
    x,
    y,
  };
}

function drawTexture(world) {
  r.BeginTextureMode(world.target);
  // r.ClearBackground(r.DARKGRAY);

  world.x += 10;
  world.y = Math.sin(world.x * (Math.PI / 250)) * 100;

  r.DrawCircle(world.x, world.y + 150, 5, r.WHITE);

  r.EndTextureMode();
}

function draw(target) {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  r.DrawTexture(target.texture, 30, 30, r.WHITE);

  r.EndDrawing();
}

function loop(world) {
  while (!r.WindowShouldClose()) {
    draw(world.target);
    drawTexture(world);
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
