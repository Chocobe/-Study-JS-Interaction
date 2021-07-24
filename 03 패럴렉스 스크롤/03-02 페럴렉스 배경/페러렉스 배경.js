// 스크롤 영역 height 계산
function getScrollHeight() {
  const $motionArea = document.querySelector(".motion__area");
  const motionAreaHeight = getComputedStyle($motionArea).height.replace("px", "");

  const screenHeight = window.innerHeight;

  return motionAreaHeight - screenHeight;
}

// 배경 초기화 메서드
function clearBg() {
  const bgList = document.querySelectorAll(".bg");

  bgList.forEach(bgElement => {
    bgElement.classList.remove("bg--active");
  });
}

function clearMoon() {
  const moonElement = document.querySelector(".motion__moonWrapper");
  moonElement.classList.remove("moon--active");
}

// 스크롤 위치 퍼센트 계산
function calcScrollPercent() {
  const scrollHeight = getScrollHeight();
  const scrollY = window.scrollY;

  return scrollY / scrollHeight * 100;
}

// 출력
function render() {
  const percent = calcScrollPercent();
  let targetElement;

  clearBg();
  clearMoon();

  if(percent < 25) {
    targetElement = document.querySelector(".one");
  } else if(percent < 50) {
    targetElement = document.querySelector(".two");
  } else if(percent < 75) {
    targetElement = document.querySelector(".three");
  } else {
    targetElement = document.querySelector(".four");
    document.querySelector(".motion__moonWrapper").classList.add("moon--active");
  }

  targetElement.classList.add("bg--active");
}

// 스크롤 기능 초기화
function initScroll() {
  render();

  window.addEventListener("scroll", render);
}
initScroll();