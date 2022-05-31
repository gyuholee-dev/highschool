// 이미지슬라이드
export class ImgSlide {

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