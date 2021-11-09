import { Grid, PointAndCellContent } from "./grid";
import { Point } from "./point";
import {
  contains as gridContains, 
  neighbors as gridNeighbors,
  gridIterator
} from "./grid-utils";
import { checkBounds } from "./decorators";

export class TwoDArrayGrid implements Grid {
  private readonly internalGrid: ReadonlyArray<ReadonlyArray<boolean>>

  constructor(
    readonly rows: number,
    readonly cols: number,
    initialGrid?: boolean[][]
  ) {
    if (initialGrid) {
      this.internalGrid = initialGrid;
    } else {
      let grid = new Array(rows);
      
      for (let i = 0; i < cols; i++) {
        grid[i] = new Array(cols).fill(false);
      }

      this.internalGrid = grid;
    }
  }

  public contains = (p: Point) => gridContains(this, p);
  public neighbors = (p: Point) => gridNeighbors(this, p);
  public [Symbol.iterator] = () => gridIterator(this);

  @checkBounds
  public cell(p: Point): boolean {
    return this.internalGrid[p.y][p.x];
  }

  @checkBounds
  public withCellAlive(p: Point, alive: boolean): TwoDArrayGrid {
    let newGrid: boolean[][] = [];
    this.internalGrid.forEach(row => newGrid.push([...row]));
    newGrid[p.y][p.x] = alive;

    return new TwoDArrayGrid(this.rows, this.cols, newGrid);
  }

}
