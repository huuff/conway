import { Grid } from "./grid";
import { Point } from "./point";
import {
  contains as gridContains,
  neighbors as gridNeighbors,
  gridIterator,
} from "./grid-utils";

type MapObject = { [key: string]: boolean };

export class MapGrid implements Grid<MapGrid> {
  private readonly internalGrid: MapObject;

  constructor(
    readonly rows: number,
    readonly cols: number,
    initialGrid?: MapObject,
  ) {
    if (initialGrid) {
      this.internalGrid = initialGrid;
    } else {
      this.internalGrid = {};
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          this.internalGrid[new Point(x, y).toString()] = false;
        }
      }
    }
  }

  public contains = (p: Point) => gridContains<MapGrid>(this, p);
  public neighbors = (p: Point) => gridNeighbors<MapGrid>(this, p);
  public [Symbol.iterator] = () => gridIterator<MapGrid>(this);

  public cell(p: Point): boolean {
    return this.internalGrid[p.toString()];
  }

  public withCellAlive(p: Point, alive: boolean): MapGrid {
    let newGrid = { ...this.internalGrid };
    newGrid[p.toString()] = alive;


    return new MapGrid(this.rows, this.cols, newGrid);
  }
}
