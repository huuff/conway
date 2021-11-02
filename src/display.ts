import { Grid } from "./grid";
import { AsciiDisplay } from "./ascii-display";
import { TableDisplay } from "./table-display";

export interface Display {
  render(grid: Grid): void;
}

export const displayTypes = {
  table: TableDisplay,
  ascii: AsciiDisplay
};
