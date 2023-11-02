import { BaseEntity } from "../engine/entities/base.entity";

export class ScoresCounter {
  private scores = 0;

  constructor(private entity: BaseEntity) {}

  public update() {
    this.scores = Math.floor(Math.abs(this.entity.coords.y));
  }

  public get() {
    return this.scores;
  }
}
