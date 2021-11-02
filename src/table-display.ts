import { Grid } from "./grid";
import { Display } from "./display";

export class TableDisplay implements Display {

  constructor(private readonly container: HTMLDivElement) {}

  public render(grid: Grid): void {
    this.container.firstElementChild?.remove();

    const contents = document.createElement("table");
    for (let row of grid.rowsIterator()) {
      let rowElement = document.createElement("tr");
      
      for (let column of row) {
        let columnElement = document.createElement("td");
        columnElement.style.width = "20px";
        columnElement.style.height = "20px";
        if (column) {
          columnElement.style.backgroundColor = "black";
        }
        rowElement.appendChild(columnElement);
      }
      contents.appendChild(rowElement);
    }
    this.container.appendChild(contents);
  }
}
