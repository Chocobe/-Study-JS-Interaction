class Scroll {
  constructor() {
    this.wrapperElement = document.querySelector(".wrapper");
    this.barElement = document.querySelector(".progress__bar");
    this.percentElement = document.querySelector(".progress__percent");
  }

  getScrollHeight() {
    const originWrapperHeight = getComputedStyle(this.wrapperElement).height;
    const wrapperHeight = Number(originWrapperHeight.replace("px", ""));

    const screenHeight = window.innerHeight;

    return wrapperHeight - screenHeight;
  }

  getPercent() {
    const scrollY = window.scrollY;
    const screenHeight = this.getScrollHeight();

    return scrollY / screenHeight * 100;
  }

  render() {
    const percent = this.getPercent();

    this.barElement.style.width = `${percent}%`;
    this.percentElement.innerHTML = `${Math.ceil(percent)}%`;
  }

  init() {
    window.addEventListener("scroll", () => this.render());
  }
}

const sc = new Scroll();
sc.init();

// window.addEventListener("load", () => {
// const scroll = new Scroll();
// scroll.init();
// })

// // 스크롤 높이 계산 함수
// function getScrollHeight() {
//   const heightRegEx = /\d*(\.?\d+)?/g;
//
//   const wrapperElement = document.querySelector(".wrapper");
//   const originWrapperHeight = getComputedStyle(wrapperElement).height;
//   const wrapperHeight = Number(originWrapperHeight.match(heightRegEx)[0]);
//
//   const screenHeight = window.innerHeight;
//
//   return wrapperHeight - screenHeight;
// }
//
// // 스크롤 퍼센트 계산 함수
// function getScrollPercent() {
//   const scrollY = window.scrollY;
//   const scrollHeight = getScrollHeight();
//
//   return scrollY / scrollHeight * 100;
// }
//
// // 렌더링 함수
// function render() {
//   const percent = getScrollPercent();
//
//   const barElement = document.querySelector(".progress__bar");
//   const percentElement = document.querySelector(".progress__percent");
//
//   barElement.style.width = `${percent}%`;
//   percentElement.innerHTML = `${Math.ceil(percent)}%`;
// }
//
// function initScroll() {
//   render();
//   window.addEventListener("scroll", render);
// }
//
// initScroll();