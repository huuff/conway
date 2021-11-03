import { Point } from "./point";
import { InvalidArgumentError } from "./errors";
import { initializeGrid } from "./initialize";
import { Config } from "./config";

type RowNumberAndContent = { y: number, row: boolean[], }
type PointAndCellContent = { point: Point, cell: boolean }

export class Grid {
  private readonly internalGrid: ReadonlyArray<boolean>;

  constructor(
    private readonly rowNumber: number,
    private readonly colNumber: number,
    initialGrid: boolean[],
  ) {
    this.internalGrid = initialGrid as ReadonlyArray<boolean>;
  }

  static fromConfig(config: Config) {
    return new Grid(config.rowNumber, config.colNumber, initializeGrid(new Array(config.rowNumber * config.colNumber), config.birthFactor));
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

  public setAlive(p: Point, alive: boolean): Grid {
    const modifiedGrid = this.internalGrid.slice();
    modifiedGrid[this.pointToIndex(p)] = alive;
    return new Grid(this.rowNumber, this.colNumber, modifiedGrid);
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

  private isInGrid(p: Point): boolean {
    return p.x >= 0 && p.y >= 0 && p.x < this.colNumber && p.y < this.rowNumber;
  }

  private pointToIndex(p: Point): number {
    return (p.y * this.rowNumber) + p.x;
  }

}
