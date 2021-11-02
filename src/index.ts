import { Config } from "./config";
import { Game } from "./game";

const gameContainer = document.getElementById("main") as HTMLDivElement;

let game: Game = new Config(gameContainer).game;
game.start();

document.getElementById("controls")!.addEventListener("change", () => {
  game.stop();
  game = new Config(gameContainer).game;
  game.start();
})

