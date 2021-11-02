import 'bootstrap/dist/css/bootstrap.min.css';
import { Config } from "./config";
import { Game } from "./game";

const gameContainer = document.getElementById("main") as HTMLDivElement;

let currentConfig = new Config(gameContainer);
let game: Game = currentConfig.newGame();
game.start();

document.getElementById("controls")!.addEventListener("change", () => {
  game.stop();
  currentConfig = new Config(gameContainer);
  game = currentConfig.newGame();
  game.start();
});

// TODO: Currently broken
//document.getElementById("analyze")!.addEventListener("click", (e) => {
  //console.log("asdf");
  //e.preventDefault();

  //const analyzeX = +(document.getElementById("analyzeX")! as HTMLInputElement).value;
  //const analyzeY = +(document.getElementById("analyzeY")! as HTMLInputElement).value;
  //const p = new Point(analyzeX, analyzeY);
  //console.log(`Analyzing ${JSON.stringify(p)}`);
  //console.log(`Neighbors: `)
  //for (let neighbor of p.neighbors()) {
    //console.log(`${JSON.stringify(neighbor)}: ${game.grid.cell(neighbor)}`) 
  //}
//});

