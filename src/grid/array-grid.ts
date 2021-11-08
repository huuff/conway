import { Point } from "./point";
import { InvalidArgumentError } from "../errors";
import { Grid, RowNumberAndContent, PointAndCellContent } from "./grid";


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

  public cell(p: Point): boolean {
    if (!this.contains(p)) {
      throw new InvalidArgumentError(`Point ${JSON.stringify(p)} is not in the grid of ${this.rowNumber}x${this.colNumber}`)
    }

    return this.internalGrid[this.pointToIndex(p)];
  }

  public neighbors(p: Point): boolean[] {
    return p.neighbors().filter(n => this.contains(n)).map(n => this.cell(n));
  }

  public withCellAlive(p: Point, alive: boolean): ArrayGrid {
    const modifiedGrid = this.internalGrid.slice();
    modifiedGrid[this.pointToIndex(p)] = alive;
    return new ArrayGrid(this.rowNumber, this.colNumber, modifiedGrid);
  }

  public *rowsIterator(): Generator<RowNumberAndContent, void, void> {
    for (let i = 0; i < this.rowNumber; i++) {
      const rowBeginning = i * this.colNumber;
      yield {y: i, row: this.internalGrid.slice(rowBeginning, rowBeginning + this.colNumber)};
    }
  }

  public *gridIterator(): Generator<PointAndCellContent, void, void> {
    for (let x = 0; x < this.colNumber; x++) {
      for (let y = 0; y < this.rowNumber; y++) {
        const point = new Point(x, y);
        yield { point: point, cell: this.cell(point) }
      }
    }
  }

  public contains(p: Point): boolean {
    return p.x >= 0 && p.y >= 0 && p.x < this.colNumber && p.y < this.rowNumber;
  }

  private pointToIndex(p: Point): number {
    return (p.y * this.rowNumber) + p.x;
  }

}
