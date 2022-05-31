(function () {
  'use strict';

  // 쿠키 저장
  function setCookie(key, value, maxAge=3600) {
    document.cookie = `${key}=${value}; path=/; max-age=${maxAge};`;
  }
  // 쿠키 삭제
  function delCookie(key) {
    document.cookie = `${key}=; path=/; max-age=0;`;
  }
  // 쿠키 불러오기
  function getCookie(key) {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].split('=');
      if (cookie[0].trim() === key) {
        return cookie[1];
      }
    }
    return null;
  }

  // 비동기 지연
  // https://coder-question-ko.com/cq-ko-blog/81552
  // await timeout(1000);
  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 윈도우 스크롤탑
  function scrollToTop(speed = 'smooth') {
    window.scroll({top: 0, behavior: speed});
  }

  function test() {
    console.log('test');
  }

  var functions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    setCookie: setCookie,
    delCookie: delCookie,
    getCookie: getCookie,
    timeout: timeout,
    scrollToTop: scrollToTop,
    test: test
  });

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

  var ui = /*#__PURE__*/Object.freeze({
    __proto__: null,
    toggleDimm: toggleDimm,
    toggleActive: toggleActive,
    toggleMenu: toggleMenu,
    toggleSubMenu: toggleSubMenu
  });

  window.HS = {};
  Object.assign(HS, functions);
  Object.assign(HS, ui);

  const DOMLoaded = async()=>{
    // console.log("DOM LOADED");
    // HS.toggleMenu();
    // BLOG.UI.toggleMenu();

  };
  const WindowLoaded = async()=>{
    // console.log("WINDOW LOADED");

  };

  document.addEventListener("DOMContentLoaded", DOMLoaded);
  window.addEventListener("load", WindowLoaded);

})();
