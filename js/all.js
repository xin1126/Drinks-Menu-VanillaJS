import menu from "./data.js";
import { renderList, renderType } from "./render.js";
import saveData from "./setting.js";

const saveButton = document.querySelector("#saveButton");

saveButton.addEventListener("click", (e) => saveData(e));

renderList(menu);
renderType(menu);