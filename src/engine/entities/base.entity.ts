import { Sprite } from "../render/sprite";
import { LimitedVector } from "../utils/limited-vector";
import { Rect } from "../utils/rect";
import { Vector } from "../utils/vector";

export abstract class BaseEntity {
  public coords = new Vector();
  public size = new Vector();
  public velocity = new LimitedVector();
  public sprite: Sprite;
  public weight = 0;
  public collisionFrame: Rect = { x: 0, y: 0, width: 0, height: 0 };

  constructor(source: HTMLImageElement) {
    this.sprite = new Sprite(source);
  }
}
