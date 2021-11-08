import { Display } from "./display";
import {Grid} from "../grid/grid";
import { GAME_CONTAINER } from "../constants";
import { Point } from "../grid/point";

export class CanvasDisplay implements Display {
  constructor(
    private readonly cellSize: number,
    private readonly highlighted: Point[],
  ) {}

  render(grid: Grid<any>): void {
    const canvas = this.getOrCreateCanvas();
    canvas.width = grid.colNumber * this.cellSize;
    canvas.height = grid.rowNumber * this.cellSize;

    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    
    ctx.beginPath();
    ctx.fillStyle = "black";
    for (let {point, cell} of grid.gridIterator()) {
      if (cell) {
        this.drawCell(ctx, point);
      }
    }
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
    for (let { point } of grid.gridIterator()) {
      if (point.in(this.highlighted)) {
        this.drawCell(ctx, point);
      }
    }
    ctx.fill();
  }

  private drawCell(ctx: CanvasRenderingContext2D, point: Point): void {
    ctx.rect(point.x * this.cellSize, point.y * this.cellSize, this.cellSize, this.cellSize);
  }

  // Mild repetition
  private getOrCreateCanvas() {
    const mainElementContent = GAME_CONTAINER.firstElementChild;
    if (!mainElementContent) {
      const canvas = document.createElement("canvas");
      GAME_CONTAINER.appendChild(canvas);
      return canvas;
    } else if (!(mainElementContent instanceof HTMLCanvasElement)) {
      mainElementContent.remove();
      const canvas = document.createElement("canvas");
      GAME_CONTAINER.appendChild(canvas);
      return canvas;
    } else {
      return mainElementContent;
    }
  }

}
