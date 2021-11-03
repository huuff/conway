import { Display } from "./display";
import { Grid } from "./grid";
import { update } from "./update";
import { Config } from "./config";

export class Game {
  private intervalID: number;

  constructor(
    public grid: Grid,
    public display: Display,
    public speed: number,
  ) {
    this.start();
  }


  public start(): void {
    this.display.render(this.grid);
    this.intervalID = window.setInterval(() => {
      this.grid = update(this.grid);
      this.display.render(this.grid);
    }, 5000 / this.speed); 
  }

  public updateConfig(config: Config): void {
    this.grid = config.newGrid();
    this.display = config.display;
    this.speed = config.speed;
  }

  public stop(): void {
    window.clearInterval(this.intervalID);
  }
}
