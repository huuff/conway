import { Display } from "./display";
import { Grid } from "./grid";
import { update } from "./update";
import { Config } from "./config";

export class Game {
  private readonly intervalId: number;
  public grid: Grid;
  public display: Display;
  public speed: number;

  constructor(config: Config) {
    this.updateConfig(config);
    this.intervalId = this.start();
  }

  public start(): number {
    this.display.render(this.grid);
    return window.setInterval(() => {
      this.grid = update(this.grid);
      this.display.render(this.grid);
    }, 5000 / this.speed); 
  }

  public updateConfig(config: Config): void {
    this.grid = Grid.fromConfig(config);
    this.display = config.display;
    this.speed = config.speed;
  }

  public stop(): void {
    window.clearInterval(this.intervalId);
  }
}
