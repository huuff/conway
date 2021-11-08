import { Grid } from "./grid";
import { Point } from "./point";

export type RowNumberAndContent = { y: number, row: boolean[], }

export function *rowsIterator<T extends Grid<T>>(grid: T): Generator<RowNumberAndContent, void, void> {
  for (let y = 0; y < grid.rows; y++) {
    let row: boolean[] = [];
    for (let x = 0; x < grid.cols; x++) {
      row.push(grid.cell(new Point(x, y)))
    }
    yield { y, row };
  }
}
