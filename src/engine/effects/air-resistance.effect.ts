import { BaseEntity } from "../entities/base.entity";
import { Point } from "../utils/point.types";

export class AirResistanceEffect {
  constructor(private resistanceRatio: Point) {}

  public effect(entity: BaseEntity) {
    if (entity.velocity.x > 0) {
      entity.velocity.sub(this.resistanceRatio.x, 0);
    } else if (entity.velocity.x < 0) {
      entity.velocity.add(this.resistanceRatio.x, 0);
    }

    if (entity.velocity.y > 0) {
      entity.velocity.sub(0, this.resistanceRatio.y);
    } else if (entity.velocity.y < 0) {
      entity.velocity.add(0, this.resistanceRatio.y);
    }
  }
}
