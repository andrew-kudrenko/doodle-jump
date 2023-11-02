import { Doodler } from "../entities/doodler.entity";
import { getImageFactory } from "./image.factory";

export async function createDoodler() {
  const doodlerImage = await getImageFactory().create("/assets/doodler-bunny.png", 310, 306);
  const doodler = new Doodler(doodlerImage);

  doodler.size.set(100, 100);
  doodler.sprite.size.set(310, 306);

  doodler.velocity.setLimit("x", "min", -2);
  doodler.velocity.setLimit("x", "max", 2);
  doodler.velocity.setLimit("y", "min", -20);
  doodler.velocity.setLimit("y", "max", 2);

  doodler.collisionFrame.x = 0;
  doodler.collisionFrame.width = doodler.size.x;
  doodler.collisionFrame.height = doodler.size.y;

  return doodler;
}
