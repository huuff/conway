import { Point } from "./point";
import { Grid } from "./grid";
import { 
  contains as gridContains,
  neighbors as gridNeighbors,
  gridIterator,
} 
  from "./grid-utils";
import { checkBounds } from "./decorators";


export class ArrayGrid implements Grid {
  private readonly internalGrid: ReadonlyArray<boolean>;

  constructor(
    readonly rows: number,
    readonly cols: number,
    initialGrid?: boolean[],
  ) {
    if (initialGrid) {
      this.internalGrid = initialGrid as ReadonlyArray<boolean>;
    } else {
      this.internalGrid = new Array(cols * rows).fill(false);
    }
  }

  public contains = (p: Point) => gridContains(this, p);
  public neighbors = (p: Point) => gridNeighbors(this, p);

  @checkBounds
  public cell(p: Point): boolean {
    return this.internalGrid[this.pointToIndex(p)];
  }


  @checkBounds
  public withCellAlive(p: Point, alive: boolean): ArrayGrid {
    const modifiedGrid = this.internalGrid.slice();
    modifiedGrid[this.pointToIndex(p)] = alive;
    return new ArrayGrid(this.rows, this.cols, modifiedGrid);
  }

  public [Symbol.iterator] = () => gridIterator(this);

  private pointToIndex(p: Point): number {
    return (p.y * this.rows) + p.x;
  }

}
