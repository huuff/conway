import { Point } from "./point";

export class InvalidArgumentError extends Error {};

export class Grid {
  private readonly internalGrid: boolean[];

  constructor(
    private readonly rowNumber: number,
    private readonly colNumber: number,
    aliveFactor: number,
  ) {
    if (aliveFactor < 0 || aliveFactor > 1) {
      throw new InvalidArgumentError(`aliveFactor must be between 0 and 1, current value: ${aliveFactor}`)
    }

    this.internalGrid = new Array(this.internalGridSize());
    for (let i = 0; i <= this.internalGridSize(); i++) {
      if (Math.random() < aliveFactor) {
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

  public *rowsIterator(): Generator<boolean[], void, void> {
    for (let i = 0; i < this.internalGridSize(); i += this.colNumber) {
      yield this.internalGrid.slice(i, i + this.colNumber );
    }
  }

  private internalGridSize() {
    return this.rowNumber * this.colNumber;
  }

  private isInGrid(p: Point): boolean {
    let index = this.pointToIndex(p); 
    return index > 0 && index <= this.internalGridSize();
  }

  private pointToIndex(p: Point): number {
    return (p.x * this.rowNumber) + p.y;
  }

}
