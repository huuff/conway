import { Display } from "./display";
import {Grid} from "./grid";
import { GAME_CONTAINER } from "./constants";

export class CanvasDisplay implements Display {
  constructor(
    private readonly cellSize: number
  ) {}

  render(grid: Grid): void {
    const canvas = this.getOrCreateCanvas();
    canvas.width = grid.colNumber * this.cellSize;
    canvas.height = grid.rowNumber * this.cellSize;

    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.fillStyle = "black";
    
    for (let {point, cell} of grid.gridIterator()) {
      if (cell) {
        ctx.rect(point.x * this.cellSize, point.y * this.cellSize, this.cellSize, this.cellSize);
      }
    }
    ctx.fill();
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