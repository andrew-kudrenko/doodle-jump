import { Collider } from "../engine/utils/collider";
import { randomInt } from "../engine/utils/random";
import { Rect } from "../engine/utils/rect";
import { Platform } from "../entities/platform.entity";
import { createPlatform } from "../factories/platform.factory";

export class PlatformGenerator {
  private collider = new Collider();

  constructor(private area: Rect) {}

  public async generate() {
    const platform = await createPlatform();

    do {
      this.setGeneratedCoords(platform);
    } while (this.collider.hasAnyCollision(platform));

    this.collider.add(platform);

    return platform;
  }

  public changeAreaCoords(x: number, y: number) {
    this.area.setCoords(x, y);
  }

  private setGeneratedCoords(platform: Platform) {
    platform.coords.x = this.generateCoordByX();
    platform.coords.y = this.generateCoordByY();
  }

  private generateCoordByX() {
    return randomInt(this.area.x, this.area.x + this.area.width);
  }

  private generateCoordByY() {
    return randomInt(this.area.y, this.area.y + this.area.height);
  }
}
