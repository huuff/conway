import { Grid } from "./grid";
import { InvalidArgumentError } from "./errors";

export function initializeGrid(internalGrid: boolean[], birthFactor: number) {
  if (birthFactor < 0 || birthFactor > 1) {
    throw new InvalidArgumentError(`birthFactor must be between 0 and 1, current value: ${birthFactor}`)
  }

  for (let i = 0; i < internalGrid.length; i++) {
    if (Math.random() < birthFactor) {
      internalGrid[i] = true;
    } else {
      internalGrid[i] = false;
    }
  }

  return internalGrid;
}
