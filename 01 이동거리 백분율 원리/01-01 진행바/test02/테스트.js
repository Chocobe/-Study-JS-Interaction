class MyScrollSingleton {
  static #instance;

  #wrapperElement;
  #barElement;
  #percentElement;

  constructor() {
    if(MyScrollSingleton.#instance) return MyScrollSingleton.#instance;

    this.#wrapperElement = document.querySelector(".wrapper");
    this.#barElement = document.querySelector(".progress__bar");
    this.#percentElement = document.querySelector(".progress__percent");

    MyScrollSingleton.#instance = this;
  }

  // 스크롤 Height 추출 메서드
  #getScrollHeight() {
    const originWrapperHeight = getComputedStyle(this.#wrapperElement).height;
    const wrapperHeight = Number(originWrapperHeight.replace("px", ""));
    const screenHeight = window.innerHeight;

    return wrapperHeight - screenHeight;
  }

  // 스크롤 퍼센트 계산 메서드
  #calcScrollPercent() {
    const scrollHeight = this.#getScrollHeight();
    const scrollY = window.scrollY;

    return scrollY / scrollHeight * 100;
  }

  // 스크롤 렌더러
  #renderScroll(percent) {
    this.#barElement.style.width = `${percent}%`;
    this.#percentElement.style.left = `${percent}%`;
    this.#percentElement.innerHTML = `${Math.ceil(percent)}%`
  }

  // 배경색 렌더러
  #renderBgColor(percent) {
    this.#wrapperElement.style.backgroundColor = `rgba(${Math.ceil(percent / 100 * 255)}, 255, 147, 0.5`;
  }

  // 렌더러
  #render() {
    const percent = this.#calcScrollPercent();
    this.#renderScroll(percent);
    this.#renderBgColor(percent);
  }

  init() {
    window.addEventListener("scroll", () => {
      this.#render();
    });
  }
}

const myScroll = new MyScrollSingleton();
myScroll.init();

const two = new MyScrollSingleton();

console.log("비교: ", two === myScroll);
