import { Config } from "../config";
import { Grid } from "../grid/grid";
import { AsciiDisplay } from "./ascii-display";
import { TableDisplay } from "./table-display";
import { CanvasDisplay } from "./canvas-display";
import { Point } from "../grid/point";

export interface Display {
  render(grid: Grid<any>): void;
}

interface DisplayTypesMap {
  [key: string]: new (cellSize: number, hightlights: Point[]) => Display;
}

const displayTypes: DisplayTypesMap = {
  table: TableDisplay,
  ascii: AsciiDisplay,
  canvas: CanvasDisplay,
};

export function displayFromConfig(config: Config): Display {
  return new displayTypes[config.displayType](
    config.cellSize,
    config.analyzedCell?.neighbors() ?? []
  );
}
