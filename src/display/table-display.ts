import { Grid } from "../grid/grid";
import { Display } from "./display";
import { GAME_CONTAINER } from "../constants";
import { Point } from "../grid/point";
import { rowsIterator } from "../grid/rows-iterator";

export class TableDisplay implements Display {

  constructor(
    private readonly cellSize: number,
    private readonly highlighted: Point[],
  ) {}

  public render(grid: Grid<any>): void {
    GAME_CONTAINER.firstElementChild?.remove();

    const contents = document.createElement("table");
    for (let {y, row} of rowsIterator(grid)) {
      let rowElement = document.createElement("tr");
      
      for (let [x, column] of row.entries()) {
        let columnElement = document.createElement("td");
        columnElement.style.width = `${this.cellSize}px`;
        columnElement.style.height = `${this.cellSize}px`;
        columnElement.id = `(${x}, ${y})`;
        const cellPoint = new Point(x, y);
        const isHighlighted: boolean = cellPoint.in(this.highlighted);
        if (column) {
          columnElement.style.backgroundColor = isHighlighted ? "darkred" : "black";
        } else if (isHighlighted) {
          columnElement.style.backgroundColor = "red";
        }
        rowElement.appendChild(columnElement);
      }
      contents.appendChild(rowElement);
    }
    GAME_CONTAINER.appendChild(contents);
  }
}
