import { Grid, PointAndCellContent } from "./grid";
import { Point } from "./point";

export function contains<T extends Grid<T>>(grid: T, p: Point): boolean {
  return p.x >= 0 &&
    p.y >= 0 &&
    p.x < grid.cols &&
    p.y < grid.rows
    ;
}

export function neighbors<T extends Grid<T>>(grid: T, p: Point): boolean[] {
  return p.neighbors().filter(n => contains(grid, n)).map(n => grid.cell(n));
}

export function *gridIterator<T extends Grid<T>>(grid: T): Generator<PointAndCellContent, void, void> {
  for (let x = 0; x < grid.cols; x++) {
    for (let y = 0; y < grid.rows; y++) {
      const point = new Point(x, y);
      yield { point, cell: grid.cell(point)};
    }
  } 
}
