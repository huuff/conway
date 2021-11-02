import { Grid } from "./grid";

export interface Display {
  render(grid: Grid): void;
}
