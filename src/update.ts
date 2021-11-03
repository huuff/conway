import { Grid } from "./grid";

export function update(grid: Grid): Grid {
  for (let p of grid.gridIterator()) {
    const cell = grid.cell(p);
    const neighborsAlive = grid.neighbors(p).filter(n => n).reduce((a, _) => a + 1, 0);
    if (cell) {
      if (neighborsAlive < 2 || neighborsAlive > 3) {
        grid = grid.setAlive(p, false);
      }
    } else {
      if (neighborsAlive === 3) {
        grid = grid.setAlive(p, true);
      }
    }
  }
  return grid;
}
