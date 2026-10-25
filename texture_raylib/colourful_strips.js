const r = require("raylib");

function setup() {
  const screen = {
    width: 500,
    height: 400,
    fps: 60,
  };

  r.InitWindow(screen.width, screen.height, "strips");
  r.SetTargetFPS(screen.fps);
  const target = r.LoadRenderTexture(screen.width, 50);

  const source = {
    x: 0,
    y: 0,
    width: screen.width,
    height: 50,
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

function skyBlue(x) {
  return {
    a: 255,
    r: x - x * 0.22 + 57,
    g: x - x * 0.47 + 122,
    b: x - x * 0.85 + 217,
  };
}

function purple(x) {
  return { a: 255, r: x, g: 20, b: 100 };
}

function red(x) {
  return { a: 255, r: x, g: 0, b: x / 2 };
}

function drawTexture(target, screen) {
  r.BeginTextureMode(target);
  r.ClearBackground(r.BLACK);

  for (let i = 0; i < 500; i += 1) {
    const noise = Math.random() * 255;
    const fraction = (i / screen.width) * 255;
    // console.log(screen.width);

    const signal = 0.8 * fraction + 0.2 * noise;
    // const colour = { a: 255, r: x, g: x, b: x };

    r.DrawRectangle(i, 0, 5, 50, skyBlue(signal));
  }

  r.EndTextureMode();
}

function draw(target, source, screen) {
  drawTexture(target, screen);
  r.BeginDrawing();
  r.ClearBackground(r.WHITE);
  r.DrawTextureRec(target.texture, source, { x: 0, y: 0 }, r.WHITE);

  //   r.DrawTextureRec(target.texture, source, { x: 0, y: 200 }, r.WHITE);

  r.EndDrawing();
}

function loop(target, source, screen) {
  while (!r.WindowShouldClose()) {
    draw(target, source, screen);
    // drawTexture(target, screen);
  }
}

function teardown() {
  r.CloseWindow();
}

function main() {
  const world = setup();
  loop(world.target, world.source, world.screen);
  teardown();
}

main();
