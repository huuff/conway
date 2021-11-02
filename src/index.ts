import { Grid } from "./grid";
import { AsciiDisplay } from "./ascii-display";

const grid = new Grid(10, 10, 0.35);

new AsciiDisplay(grid).render(document.getElementById("main") as HTMLDivElement);
