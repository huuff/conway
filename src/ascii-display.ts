import { Grid } from "./grid";
import { Display } from "./display";

export class AsciiDisplay implements Display {
  
  constructor(
    private readonly container: HTMLDivElement,
    private readonly cellSize: number,
  ) {}

  public render(grid: Grid) {
    this.container.firstElementChild?.remove();

    const contents = document.createElement("p");
    contents.style.fontFamily = "mono";
    contents.style.fontSize = `${this.cellSize}px`
    for (let { row } of grid.rowsIterator()) {
      contents.innerHTML += row.map<string>(c => c ? "#" : ".").reduce((a, x) => a + x, "");
      contents.innerHTML += "<br>";
    }

    this.container.appendChild(contents);
  }
}
