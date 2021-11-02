import { Point } from "./point";

export class InvalidArgumentError extends Error {};

type RowNumberAndContent = { y: number, row: boolean[], }

export class Grid {
  // MUT: Wrap in a readonly generic type
  private readonly internalGrid: boolean[];

  constructor(
    private readonly rowNumber: number,
    private readonly colNumber: number,
    birthFactor: number,
  ) {
    if (birthFactor < 0 || birthFactor > 1) {
      throw new InvalidArgumentError(`birthFactor must be between 0 and 1, current value: ${birthFactor}`)
    }

    this.internalGrid = new Array(this.internalGridSize());
    for (let i = 0; i <= this.internalGridSize(); i++) {
      if (Math.random() < birthFactor) {
        this.internalGrid[i] = true;
      } else {
        this.internalGrid[i] = false;
      }
    }
  }

  public cell(p: Point): boolean {
    if (!this.isInGrid(p)) {
      throw new InvalidArgumentError(`Point ${JSON.stringify(p)} is not in the grid of ${this.colNumber}x${this.rowNumber}`)
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

  public *gridIterator(): Generator<Point, void, void> {
    for (let x = 0; x < this.rowNumber; x++) {
      for (let y = 0; y < this.colNumber; y++) {
        yield new Point(x, y);
      }
    }
  }

  private internalGridSize() {
    return this.rowNumber * this.colNumber;
  }

  private isInGrid(p: Point): boolean {
    return p.x >= 0 && p.y >= 0 && p.x < this.colNumber && p.y < this.rowNumber;
  }

  private pointToIndex(p: Point): number {
    return (p.y * this.rowNumber) + p.x;
  }

}
