import { BaseEntity } from "../entities/base.entity";

export class GravityEffect {
  constructor(private acceleration: number) {}

  public effect(entity: BaseEntity) {
    entity.velocity.add(0, this.acceleration);
  }
}
