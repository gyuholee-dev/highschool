import { timeout } from './functions.js';
export { 
  toggleDimm,
  toggleActive,
  toggleMenu,
  toggleSubMenu,
};

// 딤 토글
async function toggleDimm(dimm) {
  if (dimm.classList.contains('dimm')) {
    dimm.classList.remove('dimm');
    await timeout(250);
    dimm.classList.remove('show');
  } else {
    dimm.classList.add('show');
    await timeout(50);
    dimm.classList.add('dimm');
  }
}

// 액티브 클래스 토글
function toggleActive(elem) {
  elem.classList.toggle('active');
}

// 메인메뉴 토글
async function toggleMenu(menu, button) {
  const dimm = document.querySelector('#navdimm');
  toggleDimm(dimm);
  toggleActive(button);
  if (menu.classList.contains('open')) {
    menu.classList.remove('open');
    await timeout(250);
    menu.classList.remove('show');
  } else {
    menu.classList.add('show');
    await timeout(50);
    menu.classList.add('open');
  }
}

// 서브메뉴 클로즈
function closeAllSubMenu() {
  const subMenus = document.querySelectorAll('.submenu');
  for (let i = 0; i < subMenus.length; i++) {
    subMenus[i].classList.remove('open');
  }
}

// 메뉴 디액티브
function deactivateMenu() {
  const menus = document.querySelectorAll('#mainmenu>.item');
  for (let i = 0; i < menus.length; i++) {
    menus[i].classList.remove('active');
  }
}

// 서브메뉴 토글
async function toggleSubMenu(menu) {
  if (window.innerWidth >= 800) {
    return false;
  }
  if (menu.classList.contains('active')) {
    deactivateMenu();
    closeAllSubMenu();
  } else {
    deactivateMenu();
    closeAllSubMenu();
    toggleActive(menu);
    const targetMenu = menu.querySelector('.submenu');
    targetMenu.classList.toggle('open');
  }
}