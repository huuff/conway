import { Point } from "./point";
import { ArrayGrid } from "./array-grid";
import {Config} from "../config";
import { initializeGrid } from "./initialize-grid";

export type RowNumberAndContent = { y: number, row: boolean[], }
export type PointAndCellContent = { point: Point, cell: boolean }

export interface Grid<T extends Grid<T>> {
    // TODO: Remove the "number" postfix from the names
    readonly rowNumber: number;
    readonly colNumber: number;

    cell(p: Point): boolean;
    rowsIterator(): Generator<RowNumberAndContent, void, void>;
    gridIterator(): Generator<PointAndCellContent, void, void>;
    withCellAlive(p: Point, alive: boolean): T;
    contains(p: Point): boolean;
    neighbors(p: Point): boolean[];
}

// TODO: Remove that any
interface GridTypesMap {
  [key: string]: new (rowNumber: number, colNumber: number) => Grid<any>;
}

const gridTypes: GridTypesMap = {
  array: ArrayGrid,
}

export function gridFromConfig<T extends Grid<T>>(config: Config): Grid<T> {
  return initializeGrid(new gridTypes[config.gridType]( config.rowNumber, config.colNumber), config.birthFactor);
}
