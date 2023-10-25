export type GameLoopPhase = "cleanup" | "update" | "render";

export interface GameLoopPhaseAction {
  callback: VoidFunction;
  once?: boolean;
}

type GameLoopPhaseActionOptions = Omit<GameLoopPhaseAction, "callback">;

export class GameLoop {
  public isRunning = false;
  private readonly actions: Record<GameLoopPhase, GameLoopPhaseAction[]> = {
    cleanup: [],
    update: [],
    render: [],
  };
  private intervalId?: number;

  public run() {
    this.isRunning = true;

    return new Promise<void>((ok, fail) => {
      try {
        this.intervalId = setInterval(() => {
          if (!this.isRunning) {
            clearInterval(this.intervalId);
            ok();
          }

          requestAnimationFrame(this.runPhases.bind(this));
        });
      } catch (e) {
        fail(e);
      }
    });
  }

  public finish() {
    this.isRunning = false;
  }

  public on(phase: GameLoopPhase, callback: VoidFunction, options?: GameLoopPhaseActionOptions) {
    this.actions[phase].push({ callback, ...options });
  }

  private runPhases() {
    this.runPhase("cleanup");
    this.runPhase("update");
    this.runPhase("render");
  }

  private runPhase(kind: GameLoopPhase) {
    for (let idx = 0; idx < this.actions[kind].length; idx++) {
      this.actions[kind][idx].callback();

      if (this.actions[kind][idx].once) {
        this.actions[kind].splice(idx, 1);
      }
    }
  }
}
