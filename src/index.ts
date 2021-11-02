import { Grid } from "./grid";
import { AsciiDisplay } from "./ascii-display";
import { Game } from "./game";

const gameContainer = document.getElementById("main") as HTMLDivElement;

const grid = new Grid(15, 15, 0.20);
const display = new AsciiDisplay(grid);
const game = new Game(grid);

setInterval(() => {
  game.update();
  display.render(gameContainer)
}, 1000)

