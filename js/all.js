import menu from "./data.js";
import { renderList, renderType } from "./render.js";
import saveData from "./setting.js";

const saveButton = document.querySelector("#saveButton");

saveButton.addEventListener("click", (e) => saveData(e));

const init = () => {
  renderList(menu);
  renderType(menu);
};

init();

window.onresize = () => {
  if (window.innerWidth < 440) return;
  init();
}