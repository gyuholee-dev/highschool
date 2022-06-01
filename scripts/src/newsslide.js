import { timeout } from './functions.js';

// 이미지슬라이드
export class NewsSlide {
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