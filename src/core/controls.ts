import { KeyboardListener } from "../engine/utils/keyboard-listener";
import { World } from "./world";

export class Controls {
  private readonly keyboard = new KeyboardListener();

  constructor(private world: World) {}

  public init() {
    this.keyboard.listen();

    this.keyboard.on("a", () => this.world.doodler.velocity.add(-0.25, 0));
    this.keyboard.on("d", () => this.world.doodler.velocity.add(0.25, 0));
  }

  public update() {
    this.keyboard.update();
  }
}
