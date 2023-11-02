import { Platform } from "../entities/platform.entity";
import { getImageFactory } from "./image.factory";

export async function createPlatform() {
  const image = await getImageFactory().create("/assets/doodle-jump-platforms.png", 220, 134);
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
