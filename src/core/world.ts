import { FollowEffect } from "../effects/follow.effect";
import { AirResistanceEffect } from "../engine/effects/air-resistance.effect";
import { GravityEffect } from "../engine/effects/gravity.effect";
import { JumpEffect } from "../engine/effects/jump.effect";
import { Canvas } from "../engine/render/canvas";
import { Vector } from "../engine/utils/vector";
import { Doodler } from "../entities/doodler.entity";
import { Platform } from "../entities/platform.entity";

export class World {
  public readonly gravity = new GravityEffect(0.15);
  public readonly airResistance = new AirResistanceEffect({ x: 0.1, y: 0.1 });
  public readonly followCamera = new FollowEffect(this);
  public readonly jump = new JumpEffect(6);

  public readonly canvases = {
    doodler: new Canvas(document.getElementById("doodler-canvas") as HTMLCanvasElement),
    environment: new Canvas(document.getElementById("env-canvas") as HTMLCanvasElement),
  } as const;
  public readonly size = new Vector();

  public doodler!: Doodler;
  public platforms!: Platform[];
}
