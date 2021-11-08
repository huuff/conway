import { Grid } from "./grid";
import { Point } from "./point";

export function contains<T extends Grid<T>>(grid: T, p: Point): boolean {
  return p.x >= 0 &&
    p.y >= 0 &&
    p.x < grid.colNumber &&
    p.y < grid.rowNumber
    ;
}

export function neighbors<T extends Grid<T>>(grid: T, p: Point): boolean[] {
  return p.neighbors().filter(n => contains(grid, n)).map(n => grid.cell(n));
}
