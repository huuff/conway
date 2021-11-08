import { InvalidArgumentError } from "../errors";
import { Grid } from "./grid";

export function initializeGrid<T extends Grid<T>>(grid: T, birthFactor: number): T {
  if (birthFactor < 0 || birthFactor > 1) {
    throw new InvalidArgumentError(`birthFactor must be between 0 and 1, current value: ${birthFactor}`)
  }

  console.log("Initializing grid");

  for (let { point } of grid) {
    if (Math.random() < birthFactor) {
      grid = grid.withCellAlive(point, true)
    } 
  }

  return grid;
}
