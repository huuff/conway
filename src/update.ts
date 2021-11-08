import { Grid } from "./grid/grid";

export function update<T extends Grid<T>>(grid: T): T {
  for (let { point, cell } of grid) {
    const neighborsAlive = grid.neighbors(point).filter(n => n).reduce((a, _) => a + 1, 0);
    if (cell) {
      if (neighborsAlive < 2 || neighborsAlive > 3) {
        grid = grid.withCellAlive(point, false);
      }
    } else {
      if (neighborsAlive === 3) {
        grid = grid.withCellAlive(point, true);
      }
    }
  }
  return grid;
}
