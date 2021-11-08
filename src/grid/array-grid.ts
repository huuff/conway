import { Point } from "./point";
import { InvalidArgumentError } from "../errors";
import { Grid, PointAndCellContent } from "./grid";
import { contains as gridContains, neighbors as gridNeighbors } from "./grid-utils";


export class ArrayGrid implements Grid<ArrayGrid> {
  private readonly internalGrid: ReadonlyArray<boolean>;

  constructor(
    readonly rowNumber: number,
    readonly colNumber: number,
    initialGrid?: boolean[],
  ) {
    if (initialGrid) {
      this.internalGrid = initialGrid as ReadonlyArray<boolean>;
    } else {
      this.internalGrid = new Array(colNumber * rowNumber).fill(false);
    }
  }

  public contains = (p: Point) => gridContains<ArrayGrid>(this, p);
  public neighbors = (p: Point) => gridNeighbors<ArrayGrid>(this, p);

  public cell(p: Point): boolean {
    if (!this.contains(p)) {
      throw new InvalidArgumentError(`Point ${JSON.stringify(p)} is not in the grid of ${this.rowNumber}x${this.colNumber}`)
    }

    return this.internalGrid[this.pointToIndex(p)];
  }


  public withCellAlive(p: Point, alive: boolean): ArrayGrid {
    const modifiedGrid = this.internalGrid.slice();
    modifiedGrid[this.pointToIndex(p)] = alive;
    return new ArrayGrid(this.rowNumber, this.colNumber, modifiedGrid);
  }

  *[Symbol.iterator](): Generator<PointAndCellContent, void, void> {
    for (let x = 0; x < this.colNumber; x++) {
      for (let y = 0; y < this.rowNumber; y++) {
        const point = new Point(x, y);
        yield { point: point, cell: this.cell(point) }
      }
    }
  }

  private pointToIndex(p: Point): number {
    return (p.y * this.rowNumber) + p.x;
  }

}
