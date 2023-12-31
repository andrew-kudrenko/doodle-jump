import { BaseEntity } from "../entities/base.entity";

export class Collider {
  private entities = new Set<BaseEntity>();

  public add(entity: BaseEntity) {
    this.entities.add(entity);
  }

  public remove(entity: BaseEntity) {
    this.entities.delete(entity);
  }

  public hasAnyCollision(a: BaseEntity) {
    for (const b of this.entities) {
      if (
        Collider.isInsideLeftBottomCorner(a, b) ||
        Collider.isInsideRightBottomCorner(a, b) ||
        Collider.isInsideLeftTopCorner(a, b) ||
        Collider.isInsideRightTopCorner(a, b) ||
        Collider.isInsideLeftTopCorner(b, a) ||
        Collider.isInsideRightTopCorner(b, a) ||
        Collider.isInsideLeftTopCorner(b, a) ||
        Collider.isInsideRightTopCorner(b, a)
      ) {
        return true;
      }
    }

    return false;
  }

  public hasBottomToTopCollisions(a: BaseEntity) {
    for (const b of this.entities) {
      if (
        Collider.isInsideLeftBottomCorner(a, b) ||
        Collider.isInsideRightBottomCorner(a, b) ||
        Collider.isInsideLeftTopCorner(b, a) ||
        Collider.isInsideRightTopCorner(b, a)
      ) {
        return true;
      }
    }

    return false;
  }

  private static isInsideLeftTopCorner(a: BaseEntity, b: BaseEntity) {
    return this.isInsideByX(b, a.coords.x) && this.isInsideByY(b, a.coords.y);
  }

  private static isInsideLeftBottomCorner(a: BaseEntity, b: BaseEntity) {
    return this.isInsideByX(b, a.coords.x) && this.isInsideByY(b, a.coords.y + a.size.y);
  }

  private static isInsideRightTopCorner(a: BaseEntity, b: BaseEntity) {
    return this.isInsideByX(b, a.coords.x + a.size.x) && this.isInsideByY(b, a.coords.y);
  }

  private static isInsideRightBottomCorner(a: BaseEntity, b: BaseEntity) {
    return this.isInsideByX(b, a.coords.x + a.size.x) && this.isInsideByY(b, a.coords.y + a.size.y);
  }

  private static isInsideByX(entity: BaseEntity, x: number) {
    const start = entity.coords.x + entity.collisionFrame.x;

    return x >= start && x <= start + entity.collisionFrame.width;
  }

  private static isInsideByY(entity: BaseEntity, y: number) {
    const start = entity.coords.y + entity.collisionFrame.y;

    return y >= start && y <= start + entity.collisionFrame.height;
  }
}
