import Menu from "./components/menu/menu";
import Filter from "./components/filter/filter";
import Board from "./components/board/board";
import BoardController from "./controllers/board-controller";

import {generateTasks} from "./mock/task";
import {render} from "./util/dom-util";

const TASK_COUNT = 15;

const mainElement = document.querySelector(`.main`);
const menuContainer = document.querySelector(`.main__control`);

const tasks = generateTasks(TASK_COUNT);

const menu = new Menu();
const filter = new Filter();
const board = new Board();
const boardController = new BoardController(board);

render(menuContainer, menu);
render(mainElement, filter);
render(mainElement, board);
boardController.render(tasks);


