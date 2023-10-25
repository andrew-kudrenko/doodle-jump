import { BaseEntity } from "../engine/entities/base.entity";

export class Doodler extends BaseEntity {
  public isFalling() {
    return this.velocity.y > 0;
  }
}
