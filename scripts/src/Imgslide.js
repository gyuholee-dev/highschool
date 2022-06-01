import { timeout } from './functions.js';

// 이미지슬라이드
export class ImgSlide {

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