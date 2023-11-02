import { World } from "../core/world";

export class FollowEffect {
  private maxHeight: number = Infinity;

  constructor(private world: World) {}

  public effect() {
    if (this.world.doodler.coords.y < this.maxHeight) {
      const diff = this.maxHeight - this.world.doodler.coords.y;

      this.maxHeight = this.world.doodler.coords.y;

      this.world.canvases.doodler.translate(0, diff);
      this.world.canvases.environment.translate(0, diff);
    }
  }
}
