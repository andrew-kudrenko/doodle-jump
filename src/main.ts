import { Controls } from "./core/controls";
import { ScoresCounter } from "./core/scores-counter";
import { GameLoop } from "./engine/game-loop";
import { Collider } from "./engine/utils/collider";
import { createWorld } from "./factories/world.factory";

import "./style.css";

const collider = new Collider();
const world = await createWorld();
const controls = new Controls(world);
const scores = new ScoresCounter(world.doodler);

world.platforms.forEach((p) => collider.add(p));
controls.init();

const loop = new GameLoop();

loop.on("cleanup", () => {
  world.platforms.forEach((p) => world.canvases.environment.clear(p));
  world.canvases.doodler.clear(world.doodler);
});

loop.on("update", () => {
  controls.update();
  scores.update();

  world.airResistance.effect(world.doodler);
  world.gravity.effect(world.doodler);
  world.doodler.move();
  world.followCamera.effect();

  if (world.doodler.isFalling() && collider.hasBottomToTopCollisions(world.doodler)) {
    world.jump.effect(world.doodler);
  }
});

loop.on("render", () => {
  world.platforms.forEach((p) => world.canvases.environment.draw(p));
  world.canvases.doodler.draw(world.doodler);
});

await loop.run();
