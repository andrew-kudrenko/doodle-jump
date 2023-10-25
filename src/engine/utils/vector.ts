import { Point } from "./point.types";

export class Vector implements Point {
  constructor(public x: number = 0, public y: number = 0) {}

  public addV(value: Vector): Vector {
    return this.add(value.x, value.y);
  }

  public subV(value: Vector): Vector {
    return this.sub(value.x, value.y);
  }

  public divV(value: Vector): Vector {
    return this.div(value.x, value.y);
  }

  public mulV(value: Vector): Vector {
    return this.mul(value.x, value.y);
  }

  public add(x: number, y: number): Vector {
    this.x += x;
    this.y += y;

    return this;
  }

  public sub(x: number, y: number): Vector {
    this.x -= x;
    this.y -= y;

    return this;
  }

  public div(x: number, y: number): Vector {
    this.x /= x;
    this.y /= y;

    return this;
  }

  public mul(x: number, y: number): Vector {
    this.x *= x;
    this.y *= y;

    return this;
  }

  public set(x: number, y: number): Vector {
    this.x = x;
    this.y = y;

    return this;
  }

  public static fromPoint(point: Point): Vector {
    return new Vector(point.x, point.y);
  }
}
