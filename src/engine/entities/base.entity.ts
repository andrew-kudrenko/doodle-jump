import { Sprite } from "../render/sprite";
import { LimitedVector } from "../utils/limited-vector";
import { RectLike } from "../utils/rect";
import { Vector } from "../utils/vector";

export abstract class BaseEntity {
  public readonly coords = new Vector();
  public readonly size = new Vector();
  public readonly velocity = new LimitedVector();
  public readonly sprite: Sprite;
  public weight = 0;
  public readonly collisionFrame: RectLike = { x: 0, y: 0, width: 0, height: 0 };

  constructor(source: HTMLImageElement) {
    this.sprite = new Sprite(source);
  }

  public move() {
    this.coords.addV(this.velocity);
  }
}
