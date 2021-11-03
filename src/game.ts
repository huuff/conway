import { Display, displayFromConfig } from "./display";
import { Grid } from "./grid";
import { update } from "./update";
import { Config } from "./config";

export class Game {
  private readonly intervalId: number;
  private currentConfig: Config;
  public grid: Grid;

  constructor(config: Config) {
    this.updateConfig(config); 
    this.intervalId = this.start();
  }

  public start(): number {
    this.display().render(this.grid);

    return window.setInterval(() => {
      this.grid = update(this.grid);
      this.display().render(this.grid);
    }, 5000 / this.currentConfig.speed); 
  }

  public updateConfig(config: Config): void {
    this.currentConfig = config;
    this.grid = Grid.fromConfig(config);
  }

  public stop(): void {
    window.clearInterval(this.intervalId);
  }

  private display(): Display {
    return displayFromConfig(this.currentConfig);
  }
}
