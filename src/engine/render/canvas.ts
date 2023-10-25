import { BaseEntity } from "../entities/base.entity";

export class Canvas {
  private ctx: CanvasRenderingContext2D;

  constructor(element: HTMLCanvasElement) {
    this.ctx = element.getContext("2d")!;
  }

  public draw(entity: BaseEntity) {
    this.ctx.drawImage(
      entity.sprite.source,
      entity.sprite.coords.x,
      entity.sprite.coords.y,
      entity.sprite.size.x,
      entity.sprite.size.y,
      entity.coords.x,
      entity.coords.y,
      entity.size.x,
      entity.size.y
    );
  }

  public clear(entity: BaseEntity) {
    this.ctx.clearRect(entity.coords.x, entity.coords.y, entity.size.x, entity.size.y);
  }

  public save() {
    this.ctx.save();
  }

  public restore() {
    this.ctx.restore();
  }

  public translate(x: number, y: number) {
    this.ctx.translate(x, y);
  }
}
