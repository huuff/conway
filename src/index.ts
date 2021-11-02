import { Grid } from "./grid";
import { AsciiDisplay } from "./ascii-display";
import { TableDisplay } from "./table-display";
import { Game } from "./game";

const gameContainer = document.getElementById("main") as HTMLDivElement;

const grid = new Grid(15, 15, 0.20);
//const display = new AsciiDisplay(gameContainer);
const display = new TableDisplay(gameContainer);

let game = new Game(grid, display);
game.start();

document.getElementById("controls")!.addEventListener("change", () => {
  const colNumber = getInputNumber("colNumber");
  const rowNumber = getInputNumber("rowNumber");
  let newGrid = new Grid(rowNumber, colNumber, 0.20);
  game.stop();
  game = new Game(newGrid, display);
  game.start();
})

function getInputNumber(inputId: string): number {
  return +(document.getElementById(inputId)! as HTMLInputElement).value 
}
