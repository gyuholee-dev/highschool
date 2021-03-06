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

  // 탭 선택
  function changeTab(elem, id) {
    const tabs = elem.querySelectorAll('.tab');
    const items = elem.querySelectorAll('.item');
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('active');
      items[i].classList.remove('active');
    }
    elem.querySelector('#tab_'+id).classList.add('active');
    elem.querySelector('#item_'+id).classList.add('active');
  }

  var ui = /*#__PURE__*/Object.freeze({
    __proto__: null,
    toggleDimm: toggleDimm,
    toggleActive: toggleActive,
    toggleMenu: toggleMenu,
    toggleSubMenu: toggleSubMenu,
    changeTab: changeTab
  });

  // 이미지슬라이드
  class ImgSlide {

    constructor(slider, imgWidth=1240, margin=20, delay=2500) {
      this.slider = slider;
      this.imgWidth = imgWidth;
      this.margin = margin;
      this.delay = delay;
      this.imgs = slider.querySelectorAll('.imgs>.item');
      this.imgCnt = this.imgs.length;

      this.state = 'stop';
      this.repeat;
      this.ci = Math.floor(Math.random() * this.imgCnt); // 현재 가운데 이미지 랜덤

      this.btnPrev = slider.querySelector('.buttons.nav>button.prev');
      this.btnNext = slider.querySelector('.buttons.nav>button.next');
      this.btnPlay = slider.querySelector('.buttons.page>button.play');
      this.btnDots = slider.querySelectorAll('.buttons.page>button.dot');
    }

    test() {
      console.log(this);
    }
    
    // 슬라이드
    slide() {
      const imgCnt = this.imgCnt;
      const imgs = this.imgs;
      const ci = this.ci;
      const imgWidth = this.imgWidth;
      const margin = this.margin;
      const btnDots = this.btnDots;
      for (let i = 0; i < imgCnt; i++) {
        let img = imgs[i];
        let d = i - ci;
        if (d < 0 - Math.floor(imgCnt / 2)) {
          d += imgCnt;
        } else if (d > Math.floor(imgCnt / 2)) {
          d -= imgCnt;
        }
        let pos = (d * imgWidth) + (d * margin);
        img.style.transform = `translateX(${pos}px)`;
        img.style.zIndex = (0 - Math.abs(d)) + 2;
      }
      btnDots.forEach((btn, i)=>{
        btn.classList.remove('active');
      });
      btnDots[ci].classList.add('active');
    }

    // 시작
    play(to = true) {
      const imgCnt = this.imgCnt;
      const delay = this.delay;
      if (to == true) {
        clearInterval(this.repeat);
        this.repeat = setInterval(()=>{
          this.ci++;
          if (this.ci >= imgCnt) {
            this.ci = 0;
          }
          this.slide();
        }, delay);
      } else {
        clearInterval(this.repeat);
      }
    }

    // 재시작
    replay() {
      this.play(false);
      this.slide();
      setTimeout(() => {
        this.play(true);
      }, this.delay);
    }

    // 이전
    prev() {
      const imgCnt = this.imgCnt;
      this.ci--;
      if (this.ci < 0) {
        this.ci = imgCnt - 1;
      }
      this.replay();
    }

    // 다음
    next() {
      const imgCnt = this.imgCnt;
      this.ci++;
      if (this.ci >= imgCnt) {
        this.ci = 0;
      }
      this.replay();
    }

    // 슬라이드 시작
    async start() {
      this.state = 'play';
      this.slide();
      await timeout(300);
      this.slider.classList.add('active');
      this.play(true);
      this.setEvent();
    }

    // -------------------------------------------------------
    // 컨트롤

    setEvent() {
      // 버튼 이전
      this.btnPrev.addEventListener('click', ()=>this.prev());
      // 버튼 다음
      this.btnNext.addEventListener('click', ()=>this.next());

      // 버튼 재생 정지
      this.btnPlay.addEventListener('click', ()=>{
        if (this.state == 'stop') {
          this.btnPlay.classList.remove('stop');
          this.state = 'play';
          this.play(true);
          this.slider.addEventListener('mouseenter', stopEvent);
          this.slider.addEventListener('mouseleave', playEvent);
        } else if (this.state == 'play') {
          this.btnPlay.classList.add('stop');
          this.state = 'stop';
          this.play(false);
          this.slider.removeEventListener('mouseenter', stopEvent);
          this.slider.removeEventListener('mouseleave', playEvent);
        }
      });

      // 버튼 도트
      this.btnDots.forEach((btn, i)=>{
        btn.addEventListener('click', ()=>{
          this.ci = i;
          this.replay();
        });
      });

      // slider 호버
      let playEvent = ()=>this.play(true);
      let stopEvent = ()=>this.play(false);
      this.slider.addEventListener('mouseenter', stopEvent);
      this.slider.addEventListener('mouseleave', playEvent);
    }
  }

  // 이미지슬라이드
  class NewsSlide {
    constructor(caster, newsHeight=50, margin=0, delay=2500) {
      this.caster = caster;
      this.newsHeight = newsHeight;
      this.margin = margin;
      this.delay = delay;
      this.news = caster.querySelectorAll('.items>.item');
      this.newsCnt = this.news.length;

      this.state = 'stop';
      this.repeat;
      this.ci = 0; // 현재 뉴스 인덱스
    }

    test() {
      console.log(this);
    }

    // 슬라이드
    slide() {
      const newsCnt = this.newsCnt;
      const news = this.news;
      const ci = this.ci;
      const newsHeight = this.newsHeight;
      const margin = this.margin;
      for (let i = 0; i < newsCnt; i++) {
        let t = news[i];
        let d = i - ci;
        if (d < 0 - Math.floor(newsCnt / 2)) {
          d += newsCnt;
        } else if (d > Math.floor(newsCnt / 2)) {
          d -= newsCnt;
        }
        let pos = (d * newsHeight) + (d * margin);
        t.style.transform = `translateY(${pos}px)`;
        t.style.zIndex = (0 - Math.abs(d)) + 2;
      }
    }

    // 시작
    play(to = true) {
      const newsCnt = this.newsCnt;
      const delay = this.delay;
      if (to == true) {
        clearInterval(this.repeat);
        this.repeat = setInterval(()=>{
          this.ci++;
          if (this.ci >= newsCnt) {
            this.ci = 0;
          }
          this.slide();
        }, delay);
      } else {
        clearInterval(this.repeat);
      }
    }

    // 재시작
    replay() {
      this.play(false);
      this.slide();
      setTimeout(() => {
        this.play(true);
      }, this.delay);
    }

    // 이전
    prev() {
      const newsCnt = this.newsCnt;
      this.ci--;
      if (this.ci < 0) {
        this.ci = newsCnt - 1;
      }
      this.replay();
    }

    // 다음
    next() {
      const newsCnt = this.newsCnt;
      this.ci++;
      if (this.ci >= newsCnt) {
        this.ci = 0;
      }
      this.replay();
    }

    // 슬라이드 시작
    async start() {
      this.state = 'play';
      this.slide();
      await timeout(300);
      this.caster.classList.add('active');
      this.play(true);
      this.setEvent();
    }


    setEvent() {
      // caster 호버
      let playEvent = ()=>this.play(true);
      let stopEvent = ()=>this.play(false);
      this.caster.addEventListener('mouseenter', stopEvent);
      this.caster.addEventListener('mouseleave', playEvent);
    }

  }

  window.HS = {};
  Object.assign(HS, functions);
  Object.assign(HS, ui);
  HS.ImgSlide = ImgSlide;
  HS.NewsSlide = NewsSlide;

  const DOMLoaded = async()=>{
    // console.log("DOM LOADED");
    
    // 이미지슬라이드
    const slider = document.querySelector('#slider');
    const ImgSlide = new HS.ImgSlide(slider, 810, 20, 2500);
    ImgSlide.start();

    // 뉴스슬라이드
    const caster = document.querySelector('#caster');
    const NewsSlide = new HS.NewsSlide(caster, 50, 0, 3500);
    NewsSlide.start();

    // 노티스슬라이드
    const notice = document.querySelector('#notice');
    const NoticeSlide = new HS.NewsSlide(notice, 210, 0, 3500);
    NoticeSlide.start();

  };
  const WindowLoaded = async()=>{
    // console.log("WINDOW LOADED");

  };

  document.addEventListener("DOMContentLoaded", DOMLoaded);
  window.addEventListener("load", WindowLoaded);

})();
