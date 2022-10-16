import menu from "./data.js";
import { renderList, renderType, selectValue, selectDom, inputTypeStatus } from "./render.js";

const list = document.querySelector("#list");
const form = document.querySelector("#form");
const inputItemTitle = document.querySelector("#inputItemTitle");
const inputItemTitleEn = document.querySelector("#inputItemTitleEn");
const inputTypeTitle = document.querySelector("#inputTypeTitle");
const inputTypeTitleEn = document.querySelector("#inputTypeTitleEn");
const inputMidPrice = document.querySelector("#inputMidPrice");
const inputBigPrice = document.querySelector("#inputBigPrice");
const settingType = document.querySelector("#settingType");
const radio = document.querySelectorAll("input[type='radio']");
const checkbox = document.querySelectorAll("input[type='checkbox']");
const checkboxError = document.querySelector("#checkboxError");

let checkboxData = [];
let radioStatus;
let targetType = 0;
let targetitem = 0;

const setInputValue = () => {
  inputTypeTitle.value = menu[targetType].title;
  inputTypeTitleEn.value = menu[targetType].titleEn;
  inputItemTitle.value = menu[targetType].item[targetitem].title;
  inputItemTitleEn.value = menu[targetType].item[targetitem].titleEn;
  inputBigPrice.value = menu[targetType].item[targetitem].bigPrice;
  inputMidPrice.value = menu[targetType].item[targetitem].midPrice;
}

const setCheckbox = () => {
  if (menu[targetType].item[targetitem].type.length === 2) {
    checkbox.forEach((item) => {
      item.checked = true;
      checkboxData.push(item.value);
    })
  } else {
    checkbox.forEach((item) => {
      item.checked = item.value.includes(menu[targetType].item[targetitem].type[0]);
    })
    checkboxData.push(menu[targetType].item[targetitem].type[0]);
  }
}

const resetValue = () => {
  form.reset();
  menu[targetType].item.forEach((item) => {
    item.edit = false;
  });
  targetType = 0;
  targetitem = 0;
  checkboxData.length = 0;
  radioStatus = "add";
  settingType.classList.remove("hidden");
  selectDom.setAttribute("required", "required");
  inputTypeStatus(false);
};

radio.forEach((item) => item.addEventListener("change", (e) => {
  radioStatus = e.target.value;
  if (radioStatus === "edit") {
    settingType.classList.add("hidden");
    selectDom.removeAttribute("required");
    inputTypeStatus(true);

    setInputValue();
    setCheckbox();

    menu[0].item[0].edit = true;
    menu[0].edit = true;
  } else {
    resetValue();
  }
  renderList(menu, e.target.value);
}));

checkbox.forEach((item) => item.addEventListener("change", () => {
  checkbox.forEach((item) => {
    if (item.checked) {
      if (!checkboxData.includes(item.value)) checkboxData.push(item.value);
    } else {
      checkboxData = checkboxData.filter((data) => item.value !== data);
    }
  })
  if (checkboxData.length) checkboxError.classList.add("hidden");
}));

list.addEventListener("click", (e) => {
  if (e.target.nodeName !== "I") return;

  targetType = e.target.getAttribute("data-type");
  targetitem = e.target.getAttribute("data-item");
  const title = menu[targetType].item[targetitem].title;
  if (e.target.classList.contains("fa-trash")) {
    const deleteStatus = confirm(`你確定要刪除${title}?`);
    if (!deleteStatus) return;
    menu[targetType].item.splice(targetitem, 1);
    if (!menu[targetType].item.length) menu.splice(targetType, 1);
    resetValue();
    renderList(menu);
    renderType(menu);
    setTimeout(() => alert(`刪除${title}成功!`), 0);
    return;
  }

  menu.forEach((item, index) => {
    item.edit = index === +targetType;
  });
  menu[targetType].item.forEach((item, index) => {
    item.edit = index === +targetitem;
  });

  renderList(menu, "edit");

  setInputValue();
  checkboxData.length = 0;
  setCheckbox();
})

export default (e) => {
  if (!inputItemTitle.value || !inputItemTitleEn.value || !inputMidPrice.value || !inputBigPrice.value) return;

  if (!checkboxData.length) return checkboxError.classList.remove("hidden");

  const obj = {
    title: inputItemTitle.value,
    titleEn: inputItemTitleEn.value,
    type: [...checkboxData],
    bigPrice: inputBigPrice.value,
    midPrice: inputMidPrice.value
  };

  if (radioStatus === "edit") {
    menu[targetType].title = inputTypeTitle.value;
    menu[targetType].titleEn = inputTypeTitleEn.value;
    menu[targetType].item[targetitem] = obj;
  } else {
    if (selectValue === "add") {
      menu.push({
        title: inputTypeTitle.value,
        titleEn: inputTypeTitleEn.value,
        item: [obj]
      });
      renderType(menu);
    } else {
      const key = menu.findIndex((item) => item.title === selectValue);
      menu[key].item.push(obj);
    }
  }

  renderList(menu);
  e.preventDefault();
  setTimeout(() => {
    alert(`${radioStatus === "edit" ? `編輯${menu[targetType].item[targetitem].title}` : "新增"}成功!`);
    resetValue();
  }, 0);
};