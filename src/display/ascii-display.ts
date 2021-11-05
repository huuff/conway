import { Grid } from "../grid";
import { Display } from "./display";
import { GAME_CONTAINER } from "../constants";
import { Point } from "../point";

export class AsciiDisplay implements Display {
  
  constructor(
    private readonly cellSize: number,
    private readonly highlighted: Point[],
  ) {}

  public render(grid: Grid) {
    GAME_CONTAINER.firstElementChild?.remove();

    const contents = document.createElement("p");
    contents.style.fontFamily = "mono";
    contents.style.fontSize = `${this.cellSize}px`

    for (let {y, row} of grid.rowsIterator()) {
      for (let [x, cell] of row.entries()) {
          const nextChar = cell ? "#" : ".";
          if (new Point(x, y).in(this.highlighted)) {
            contents.innerHTML += `<span style='color: red;'>${nextChar}</span>`;
          } else {
            contents.innerHTML += nextChar;
          }
        }
      contents.innerHTML += "<br>";
    }

    GAME_CONTAINER.appendChild(contents);
  }
}
