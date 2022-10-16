const list = document.querySelector("#list");
const selectType = document.querySelector("#selectType");
const inputType = document.querySelector("#inputType");
const inputTypeEn = document.querySelector("#inputTypeEn");
const inputTypeTitle = document.querySelector("#inputTypeTitle");
const inputTypeTitleEn = document.querySelector("#inputTypeTitleEn");

export const renderList = (menu, status = "add") => {
  let str = "";
  menu.forEach((data, index) => {
    str += `
      <div class="flex justify-between border-b-[6px] border-line pb-[14px] mb-[20px] ${index !== 0 ? "mt-[32px]" : ""}">
        <div class="md:text-[32px] text-[24px]">
          <h2>${data.title}</h2>
          <p>${data.titleEn}</p>
        </div>
        <div class="sm:flex items-end hidden">
          <div class="mr-[36px]">
            <p class="md:text-[28px] text-[20px] text-center">中杯</p>
            <p class="md:text-[26px] text-[18px]">REGULAR</p>
          </div>
          <div>
            <p class="md:text-[28px] text-[20px] text-center">大杯</p>
            <p class="md:text-[26px] text-[18px]">UPSIZE</p>
          </div>
        </div>
      </div>
    `
    data.item.forEach((item, key) => {
      str += `
        <ul>
          <li class="sm:flex items-center relative ${item.edit && data.edit ? "opacity-50" : ""} ${status === "edit" ? "md:mb-[20px] mb-[40px]" : "mb-[20px]"}">
            <div class="basis-[50%] sm:mb-0 mb-1">
              <h2 class="md:text-[32px] text-[24px]">${item.title}</h2>
              <p class="md:text-[26px] text-[18px]">${item.titleEn}</p>
            </div>
            <span class="text-secondary md:text-[24px] text-[16px] basis-[30%] 2sm:text-center sm:mr-0 mr-5 2sm:inline block text-start">${item.type.join("/")}</span>
            <p class="md:text-[28px] text-[20px] basis-[25%] text-center inline sm:mr-0 mr-3">
              <span class="sm:hidden inline">中杯:</span>${item.midPrice}
            </p>
            <p class="md:text-[28px] text-[20px] basis-[20%] pl-4 inline ${status === "add" ? "text-center" : "text-start"}">
              <span class="sm:hidden inline">大杯:</span>${item.bigPrice}
            </p>
            <div class="${status === "add" ? "hidden" : "left-[0] md:left-auto sm:bottom-[-32px] md:bottom-auto"} absolute right-[-20px]">
              <i data-type="${index}" data-item="${key}" class="fa-solid fa-pen-to-square mr-5 text-2xl text-emerald-700 hover:text-emerald-400 cursor-pointer"></i>
              <i data-type="${index}" data-item="${key}" class="fa-sharp fa-solid fa-trash text-2xl text-rose-700 hover:text-rose-400 cursor-pointer"></i>
            </div>
          </li>
        </ul>
      `
    })
  });

  list.innerHTML = str;
};

export let selectValue;

export let selectDom;

export const inputTypeStatus = (status) => {
  if (status) {
    inputType.classList.remove("hidden");
    inputTypeEn.classList.remove("hidden");
    inputTypeTitle.setAttribute("required", "required");
    inputTypeTitleEn.setAttribute("required", "required");
  } else {
    inputType.classList.add("hidden");
    inputTypeEn.classList.add("hidden");
    inputTypeTitle.removeAttribute("required");
    inputTypeTitleEn.removeAttribute("required");
  }
}

export const renderType = (menu) => {
  const type = menu.map((item) => item.title);
  let str = "";
  type.forEach((item) => {
    str += `<option value=${item}>${item}</option>`
  });

  const view = `
    <select
        class="block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 pr-8 
        rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="select" required>
        <option selected disabled value="">請選擇</option>
        <option value="add">新增類別</option>
        ${str}
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
  `

  selectType.innerHTML = view;

  const select = document.querySelector("#select");
  select.addEventListener("change", (e) => {
    if (e.target.value === "add") {
      inputTypeStatus(true);
    } else {
      inputTypeStatus(false);
    };
    selectValue = e.target.value;
  })
  selectDom = select;
}