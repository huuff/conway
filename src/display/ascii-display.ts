import { Grid } from "../grid/grid";
import { Display } from "./display";
import { GAME_CONTAINER } from "../constants";
import { Point } from "../grid/point";
import { rowsIterator } from "../grid/rows-iterator";

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

    for (let {y, row} of rowsIterator(grid)) {
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
