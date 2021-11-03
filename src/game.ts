import { Display } from "./display";
import { Grid } from "./grid";
import { update } from "./update";

export class Game {
  private intervalID: number;

  constructor(
    private grid: Grid,
    private readonly display: Display,
    private readonly speed: number,
  ) {}


  public start(): void {
    this.display.render(this.grid);
    this.intervalID = window.setInterval(() => {
      this.grid = update(this.grid);
      this.display.render(this.grid);
    }, 5000 / this.speed); 
  }

  public stop(): void {
    window.clearInterval(this.intervalID);
  }
}
