import { Vector } from "../utils/vector";

export class Sprite {
  public size = new Vector();
  public coords = new Vector();

  constructor(public source: HTMLImageElement) {}
}
