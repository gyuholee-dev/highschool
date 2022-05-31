// 이미지슬라이드
export class ImgSlide {

  constructor(imgslide, imgWidth=1240, margin=20, delay=2500) {
    this.imgslide = imgslide;
    this.imgWidth = imgWidth;
    this.margin = margin;
    this.delay = delay;
    this.imgs = imgslide.querySelectorAll('.imgs>.item');
    this.imgCnt = this.imgs.length;

    this.state = 'stop';
    this.repeat;
    this.ci = Math.floor(Math.random() * this.imgCnt); // 현재 가운데 이미지 랜덤

    this.btnPrev = imgslide.querySelector('.buttons.nav>button.prev');
    this.btnNext = imgslide.querySelector('.buttons.nav>button.next');
    this.btnPlay = imgslide.querySelector('.buttons.page>button.play');
    this.btnDots = imgslide.querySelectorAll('.buttons.page>button.dot');
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
    const btnPlay = this.btnPlay;
    const delay = this.delay;
    if (to == true) {
      btnPlay.classList.remove('stop');
      clearInterval(this.repeat);
      this.repeat = setInterval(()=>{
        this.ci++;
        if (this.ci >= imgCnt) {
          this.ci = 0;
        }
        this.slide();
      }, delay);
    } else {
      btnPlay.classList.add('stop');
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
    await HS.timeout(300);
    this.imgslide.classList.add('active');
    this.play(true);
    this.setBtnEvent();
  }

  // -------------------------------------------------------
  // 컨트롤

  setBtnEvent() {
    // 버튼 이전
    this.btnPrev.addEventListener('click', ()=>this.prev());
    // 버튼 다음
    this.btnNext.addEventListener('click', ()=>this.next());

    // 버튼 재생 정지
    this.btnPlay.addEventListener('click', ()=>{
      if (this.btnPlay.classList.contains('stop')) {
        this.play(true);
        this.imgslide.addEventListener('mouseenter', stopEvent);
        this.imgslide.addEventListener('mouseleave', playEvent);
      } else {
        this.play(false);
        this.imgslide.removeEventListener('mouseenter', stopEvent);
        this.imgslide.removeEventListener('mouseleave', playEvent);
      }
    });

    // 버튼 도트
    this.btnDots.forEach((btn, i)=>{
      btn.addEventListener('click', ()=>{
        this.ci = i;
        this.replay();
      });
    });

    // imgslide 호버
    let playEvent = ()=>this.play(true);
    let stopEvent = ()=>this.play(false);
    this.imgslide.addEventListener('mouseenter', stopEvent);
    this.imgslide.addEventListener('mouseleave', playEvent);
  }
}