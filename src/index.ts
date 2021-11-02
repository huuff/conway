import { Grid } from "./grid";
import { AsciiDisplay } from "./ascii-display";
import { Game } from "./game";

const gameContainer = document.getElementById("main") as HTMLDivElement;

const grid = new Grid(15, 15, 0.20);
const display = new AsciiDisplay(gameContainer);

const game = new Game(grid, display);
game.start();
