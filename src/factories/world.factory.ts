import { PlatformGenerator } from "../core/platform-generator";
import { World } from "../core/world";
import { Rect } from "../engine/utils/rect";
import { createDoodler } from "./doodler.factory";

export async function createWorld() {
  const world = new World();

  world.size.set(800, 600);
  world.doodler = await createDoodler();

  world.platforms = Array(50);

  const platformGenerator = new PlatformGenerator(new Rect(0, -3000, 500, 4500));

  for (let i = 0; i < 100; i++) {
    world.platforms[i] = await platformGenerator.generate();
  }

  return world;
}
