export interface RectLike {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class Rect {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public width: number = 0,
    public height: number = 0
  ) {}

  public setCoords(x: number, y: number) {
    this.x = x;
    this.y = y;

    return this;
  }

  public setSize(width: number, height: number) {
    this.width = width;
    this.height = height;

    return this;
  }
}
