import { Point } from "./point";
import { InvalidArgumentError } from "./errors";
import { initializeGrid } from "./initializer";

type RowNumberAndContent = { y: number, row: boolean[], }

export class Grid {
  // MUT: Wrap in a readonly generic type
  private readonly internalGrid: boolean[];

  constructor(
    private readonly rowNumber: number,
    private readonly colNumber: number,
    birthFactor: number,
  ) {
    this.internalGrid = initializeGrid(new Array(rowNumber * colNumber), birthFactor);
  }

  public cell(p: Point): boolean {
    if (!this.isInGrid(p)) {
      throw new InvalidArgumentError(`Point ${JSON.stringify(p)} is not in the grid of ${this.rowNumber}x${this.colNumber}`)
    }

    return this.internalGrid[this.pointToIndex(p)];
  }

  public neighbors(p: Point): boolean[] {
    return p.neighbors().filter(n => this.isInGrid(n)).map(n => this.cell(n));
  }

  // MUT: return a copy of the grid
  public setAlive(p: Point, alive: boolean): void {
    this.internalGrid[this.pointToIndex(p)] = alive;
  }

  public *rowsIterator(): Generator<RowNumberAndContent, void, void> {
    for (let i = 0; i < this.rowNumber; i++) {
      const rowBeginning = i * this.colNumber;
      yield {y: i, row: this.internalGrid.slice(rowBeginning, rowBeginning + this.colNumber)};
    }
  }

  // TODO: Return point and cell contents?
  public *gridIterator(): Generator<Point, void, void> {
    for (let x = 0; x < this.colNumber; x++) {
      for (let y = 0; y < this.rowNumber; y++) {
        yield new Point(x, y);
      }
    }
  }

  private isInGrid(p: Point): boolean {
    return p.x >= 0 && p.y >= 0 && p.x < this.colNumber && p.y < this.rowNumber;
  }

  private pointToIndex(p: Point): number {
    return (p.y * this.rowNumber) + p.x;
  }

}
