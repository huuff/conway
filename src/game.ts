import { Grid } from "./grid";

export class Game {
  constructor(
    private readonly grid: Grid
  ) {}

  public update(): void {
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
