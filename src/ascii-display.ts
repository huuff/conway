import { Grid } from "./grid";

export class AsciiDisplay {
  
  constructor(
    private readonly grid: Grid
  ) {}

  public render(containerElement: HTMLDivElement) {
    containerElement.firstElementChild?.remove();

    const contents = document.createElement("p");
    contents.style.fontFamily = "mono";
    for (let row of this.grid.rowsIterator()) {
      contents.innerHTML += row.map<string>(c => c ? "#" : ".").reduce((a, x) => a + x, "");
      contents.innerHTML += "<br>";
    }

    containerElement.appendChild(contents);
  }
}
