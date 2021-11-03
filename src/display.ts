import { Config } from "./config";
import { Grid } from "./grid";
import { AsciiDisplay } from "./ascii-display";
import { TableDisplay } from "./table-display";
import { CanvasDisplay } from "./canvas-display";

export interface Display {
  render(grid: Grid): void;
}

// TODO: typing here?
const displayTypes = {
  table: TableDisplay,
  ascii: AsciiDisplay,
  canvas: CanvasDisplay,
};

export function displayFromConfig(config: Config): Display {
  return new displayTypes[config.displayType](config.cellSize);
}
