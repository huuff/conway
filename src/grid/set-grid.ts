import { Grid } from "./grid";
import { Point } from "./point";
import {
  contains as gridContains,
  neighbors as gridNeighbors,
  gridIterator,
} from "./grid-utils";
import { checkBounds } from "./decorators";

export class SetGrid implements Grid {
  private readonly internalGrid: ReadonlySet<string>;

  constructor(
    readonly rows: number,
    readonly cols: number,
    initialGrid?: Set<string>,
  ) {
    if (initialGrid) {
      this.internalGrid = initialGrid;
    } else {
      this.internalGrid = new Set();
    }
  }

  public contains = (p: Point) => gridContains(this, p);
  public neighbors = (p: Point) => gridNeighbors(this, p);
  public [Symbol.iterator] = () => gridIterator(this);

  @checkBounds
  public cell(p: Point): boolean {
    return this.internalGrid.has(p.toString());
  }

  @checkBounds
  public withCellAlive(p: Point, alive: boolean): SetGrid {
    let newGrid = new Set(this.internalGrid);
    if (!alive) {
      newGrid.delete(p.toString());
    } else {
      newGrid.add(p.toString());
    }

    return new SetGrid(this.rows, this.cols, newGrid);
  }


}
