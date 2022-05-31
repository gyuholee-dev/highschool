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

  // 이미지슬라이드
  class ImgSlide {

    constructor(imgslide, imgWidth=1240, margin=20, delay=2500) {
      this.imgslide = imgslide;
      this.imgWidth = imgWidth;
      this.margin = margin;
      this.delay = delay;
      // this.imgs = imgslide.querySelectorAll('.imgs>.item');
      // this.imgCnt = imgs.length;

      
      // this.repeat;
      // this.ci = Math.floor(Math.random() * imgCnt - 1); // 현재 가운데 이미지 랜덤

      // this.navs = imgslide.querySelectorAll('.buttons.nav>button');
      // this.play = imgslide.querySelectorAll('.buttons.page>button.play');
      // this.dots = imgslide.querySelectorAll('.buttons.page>button.dot');
    }

    test() {
      console.log(imgslide);
    }
    /* 
    // 슬라이드
    slide() {
      for (let i = 0; i < imgCnt; i++) {
        let img = imgs[i];
        let d = i - ci;
        if (d < 0 - Math.floor(imgCnt / 2)) {
          d += imgCnt;
        } else if (d > Math.floor(imgCnt / 2)) {
          d -= imgCnt;
        }
        let pos = (d * imgWidth) + (d * margin);
        img.css({
          'transform': `translateX(${pos}px)`,
          'z-index': (0 - Math.abs(d)) + 2
        });
      }
      $($dots[ci]).addClass('active');
      $($dots[ci]).siblings().removeClass('active');
    }

    // 시작
    play(to = true) {
      if (to == true) {
        $play.removeClass('stop');
        clearInterval(repeat);
        repeat = setInterval(()=>{
          ci++;
          if (ci >= imgCnt) {
            ci = 0;
          }
          slide();
        }, delay);
      } else {
        $play.addClass('stop');
        clearInterval(repeat);
      }
    }

    // 재시작
    replay() {
      play(false);
      slide();
      setTimeout(() => {
        play(true);
      }, delay);
    }

    // 이전
    prev() {
      ci--;
      if (ci < 0) {
        ci = imgCnt - 1;
      }
      replay();
    }

    // 다음
    next() {
      ci++;
      if (ci >= imgCnt) {
        ci = 0;
      }
      replay();
    }
   */
    // -------------------------------------------------------

  }

  window.HS = {};
  Object.assign(HS, functions);
  Object.assign(HS, ui);
  HS.ImgSlide = ImgSlide;

  const DOMLoaded = async()=>{
    // console.log("DOM LOADED");
    
    // 이미지슬라이드
    const imgslide = document.querySelector('#imgslide');
    const ImgSlide = new HS.ImgSlide(imgslide);
    ImgSlide.test();

  };
  const WindowLoaded = async()=>{
    // console.log("WINDOW LOADED");

  };

  document.addEventListener("DOMContentLoaded", DOMLoaded);
  window.addEventListener("load", WindowLoaded);

})();
