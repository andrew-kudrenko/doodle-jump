import { Range } from "./range";
import { Point } from "./point.types";
import { Vector } from "./vector";

export type VectorLimit = Point<Range>;

export class LimitedVector extends Vector {
  private readonly limits: VectorLimit = {
    x: { min: -Infinity, max: Infinity },
    y: { min: -Infinity, max: Infinity },
  };

  public override add(x: number, y: number): Vector {
    super.add(x, y);
    this.ensureIsInsideBounds();

    return this;
  }

  public override sub(x: number, y: number): Vector {
    super.sub(x, y);
    this.ensureIsInsideBounds();

    return this;
  }

  public override div(x: number, y: number): Vector {
    super.div(x, y);
    this.ensureIsInsideBounds();

    return this;
  }

  public override mul(x: number, y: number): Vector {
    super.mul(x, y);
    this.ensureIsInsideBounds();

    return this;
  }

  public setLimit(kind: keyof Point, rangeKind: keyof Range, value: number) {
    this.limits[kind][rangeKind] = value;
    this.ensureIsInsideBounds();
  }

  private ensureIsInsideBounds() {
    if (this.x < this.limits.x.min) {
      this.x = this.limits.x.min;
    } else if (this.x > this.limits.x.max) {
      this.x = this.limits.x.max;
    }

    if (this.y < this.limits.y.min) {
      this.y = this.limits.y.min;
    } else if (this.y > this.limits.y.max) {
      this.y = this.limits.y.max;
    }
  }
}
