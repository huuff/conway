import { InvalidArgumentError } from "../errors";
import { Grid } from "./grid";

export function initializeGrid(grid: Grid, birthFactor: number): Grid {
  if (birthFactor < 0 || birthFactor > 1) {
    throw new InvalidArgumentError(`birthFactor must be between 0 and 1, current value: ${birthFactor}`)
  }

  for (let { point } of grid) {
    if (Math.random() < birthFactor) {
      grid = grid.withCellAlive(point, true)
    } 
  }

  return grid;
}
