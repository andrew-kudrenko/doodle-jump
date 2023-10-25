import { BaseEntity } from "../entities/base.entity";

export class JumpEffect {
  constructor(private ratio: number) {}

  public effect(entity: BaseEntity) {
    entity.velocity.set(entity.velocity.x, -(entity.velocity.y * this.ratio));
  }
}
