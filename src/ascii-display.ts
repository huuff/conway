import { Grid } from "./grid";
import { Display } from "./display";
import { GAME_CONTAINER } from "./constants";

export class AsciiDisplay implements Display {
  
  constructor(
    private readonly cellSize: number,
  ) {}

  public render(grid: Grid) {
    GAME_CONTAINER.firstElementChild?.remove();

    const contents = document.createElement("p");
    contents.style.fontFamily = "mono";
    contents.style.fontSize = `${this.cellSize}px`
    for (let { row } of grid.rowsIterator()) {
      contents.innerHTML += row.map<string>(c => c ? "#" : ".").reduce((a, x) => a + x, "");
      contents.innerHTML += "<br>";
    }

    GAME_CONTAINER.appendChild(contents);
  }
}
