import { Display, displayFromConfig } from "./display/display";
import { gridFromConfig, Grid } from "./grid/grid";
import { update } from "./update";
import { Config } from "./config";

export class Game {
  private intervalId: number;
  private currentConfig!: Config;
  public grid!: Grid;

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
    if (!this.currentConfig || this.currentConfig.gridDifferentTo(config)) {
      this.grid = gridFromConfig(config);
    }

    if (this.currentConfig && (this.currentConfig.speed != config.speed)) {
      this.stop();
      this.currentConfig = config;
      this.intervalId = this.start();
    } else {
      this.currentConfig = config;
    }
    this.display().render(this.grid);
  }

  public stop(): void {
    window.clearInterval(this.intervalId);
  }

  private display(): Display {
    return displayFromConfig(this.currentConfig);
  }
}
