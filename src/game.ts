import { Display } from "./display";
import { Grid } from "./grid";

export class Game {
  private intervalID: number;

  constructor(
    private readonly grid: Grid,
    private readonly display: Display,
  ) {}


  public start(): void {
    this.display.render(this.grid);
    this.intervalID = window.setInterval(() => {
      this.update();
      this.display.render(this.grid);
    }, 1000) 
  }

  public stop(): void {
    window.clearInterval(this.intervalID);
  }

  private update(): void {
    for (let p of this.grid.gridIterator()) {
      const cell = this.grid.cell(p);
      const neighborsAlive = this.grid.neighbors(p).filter(n => n).reduce((a, _) => a + 1, 0);
      if (cell) {
        if (neighborsAlive < 2 || neighborsAlive > 3) {
          this.grid.setAlive(p, false); 
        }
      } else {
        if (neighborsAlive === 3) {
          this.grid.setAlive(p, true);
        }
      }
    }
  }
}
