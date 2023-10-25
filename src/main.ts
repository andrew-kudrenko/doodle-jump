import { AirResistanceEffect } from "./engine/effects/air-resistance.effect";
import { GravityEffect } from "./engine/effects/gravity.effect";
import { JumpEffect } from "./engine/effects/jump.effect";
import { GameLoop } from "./engine/game-loop";
import { Canvas } from "./engine/render/canvas";
import { ImageFactory } from "./engine/render/image-factory";
import { Collider } from "./engine/utils/collider";
import { KeyboardListener } from "./engine/utils/keyboard-listener";
import { randomInt } from "./engine/utils/random";
import { Doodler } from "./entities/doodler.entity";
import { Platform } from "./entities/platform.entity";

import "./style.css";

const doodlerCanvas = new Canvas(document.getElementById("doodler-canvas") as HTMLCanvasElement);
const envCanvas = new Canvas(document.getElementById("env-canvas") as HTMLCanvasElement);

const imageFactory = new ImageFactory();
const doodler = await createDoodler();
doodler.velocity.setLimit("x", "min", -2);
doodler.velocity.setLimit("x", "max", 2);
doodler.velocity.setLimit("y", "min", -20);
doodler.velocity.setLimit("y", "max", 2);

const platforms: Platform[] = [];

for (let i = 0; i < 10; i++) {
  const platform = await createPlatform();

  platform.coords.set(randomInt(20, 470), randomInt(30, 550));

  platforms.push(platform);
}

console.log(platforms);

const keyboard = new KeyboardListener();

keyboard.listen();

const loop = new GameLoop();

const velocityShift = 0.25;

const collider = new Collider();

platforms.forEach((p) => collider.add(p));

const gravity = new GravityEffect(0.15);
const airResistance = new AirResistanceEffect({ x: 0.1, y: 0.1 });
const jump = new JumpEffect(6);

keyboard.on("a", () => doodler.velocity.add(-velocityShift, 0));
keyboard.on("d", () => doodler.velocity.add(velocityShift, 0));

loop.on("cleanup", () => {
  platforms.forEach((p) => envCanvas.clear(p));
  doodlerCanvas.clear(doodler);
});
loop.on("update", () => {
  keyboard.update();

  airResistance.effect(doodler);
  gravity.effect(doodler);

  doodler.coords.addV(doodler.velocity);

  if (doodler.isFalling() && collider.hasBottomToTopCollisions(doodler)) {
    jump.effect(doodler);
  }

  if (doodler.coords.y > 500) {
    jump.effect(doodler);
  }
});
loop.on("render", () => {
  platforms.forEach((p) => envCanvas.draw(p));
  doodlerCanvas.draw(doodler);
});

await loop.run();

async function createPlatform() {
  const image = await imageFactory.create("/assets/doodle-jump-platforms.png", 220, 134);
  const platform = new Platform(image);

  const width = 50;
  const height = 14;

  platform.sprite.coords.set(78, 48);
  platform.sprite.size.set(width, height);

  const scale = 1.5;
  platform.size.set(width * scale, height * scale);
  platform.collisionFrame.width = platform.size.x;
  platform.collisionFrame.height = platform.size.y;

  return platform;
}

async function createDoodler() {
  const doodlerImage = await imageFactory.create("/assets/doodler-bunny.png", 310, 306);
  const doodler = new Doodler(doodlerImage);

  doodler.size.set(100, 100);
  doodler.sprite.size.set(310, 306);

  doodler.collisionFrame.x = 40;
  doodler.collisionFrame.width = doodler.size.x - doodler.collisionFrame.x * 2;

  return doodler;
}
