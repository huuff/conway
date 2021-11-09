import { Point } from "./point";
import { ArrayGrid } from "./array-grid";
import {Config} from "../config";
import { initializeGrid } from "./initialize-grid";
import { TwoDArrayGrid } from "./2darray-grid";
import { MapGrid } from "./map-grid";
import { SetGrid } from "./set-grid";

export type PointAndCellContent = { point: Point, cell: boolean }

export interface Grid {
  readonly rows: number;
  readonly cols: number;

  cell(p: Point): boolean;
  [Symbol.iterator](): Generator<PointAndCellContent, void, void>;
  withCellAlive(p: Point, alive: boolean): Grid;
  contains(p: Point): boolean;
  neighbors(p: Point): boolean[];
}

interface GridTypesMap {
  [key: string]: new (rowNumber: number, colNumber: number) => Grid;
}

const gridTypes: GridTypesMap = {
  array: ArrayGrid,
  "2d array": TwoDArrayGrid,
  map: MapGrid,
  set: SetGrid,
}

export function gridFromConfig(config: Config): Grid {
  return initializeGrid(new gridTypes[config.gridType]( config.rowNumber, config.colNumber), config.birthFactor);
}
