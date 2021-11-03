import { Grid } from "./grid";
import { Display } from "./display";
import { GAME_CONTAINER } from "./constants";

export class TableDisplay implements Display {

  constructor(
    private readonly cellSize: number,
  ) {}

  public render(grid: Grid): void {
    GAME_CONTAINER.firstElementChild?.remove();

    const contents = document.createElement("table");
    for (let {y, row} of grid.rowsIterator()) {
      let rowElement = document.createElement("tr");
      
      for (let [x, column] of row.entries()) {
        let columnElement = document.createElement("td");
        columnElement.style.width = `${this.cellSize}px`;
        columnElement.style.height = `${this.cellSize}px`;
        columnElement.id = `(${x}, ${y})`;
        if (column) {
          columnElement.style.backgroundColor = "black";
        }
        rowElement.appendChild(columnElement);
      }
      contents.appendChild(rowElement);
    }
    GAME_CONTAINER.appendChild(contents);
  }
}
