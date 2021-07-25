// 스크롤 영역 height 도출 메서드
function getScrollHeight() {
  const motionAreaElement = document.querySelector(".motion__area");
  const motionAreaHeight = getComputedStyle(motionAreaElement).height.replace("px", "");

  const screenHeight = window.innerHeight;

  return motionAreaHeight - screenHeight;
}

// 스크롤 위치 Percent 계산 메서드
function calcScrollPercent() {
  const scrollHeight = getScrollHeight();
  const scrollY = window.scrollY;

  return scrollY / scrollHeight * 100;
}

// 모든 배경 삭제 메서드
function clearBg() {
  const $motionBgList = document.querySelectorAll(".motionBg");
  $motionBgList.forEach($motionBg => {
    $motionBg.classList.remove("motionBg--active");
  });
}

// 배경 렌더링 메서드
function renderBg(scrollPercent) {
  let $targetBgElement;

  clearBg();

  if(scrollPercent > 75) {
    $targetBgElement = document.querySelector(".motionBg--four");
  } else if(scrollPercent > 50) {
    $targetBgElement = document.querySelector(".motionBg--three");
  } else if(scrollPercent > 25) {
    $targetBgElement = document.querySelector(".motionBg--two");
  } else {
    $targetBgElement = document.querySelector(".motionBg--one");
  }

  $targetBgElement.classList.add("motionBg--active");
}

const CHARACTER_MAX_DISTANCE = 500;

// 캐릭터 렌더링 메서드
function renderCharacter(scrollPercent) {
  const $character = document.querySelector(".motionCharacter");
  $character.style.cssText = `
    transform: translateY(${CHARACTER_MAX_DISTANCE * (scrollPercent / 100)}px);
  `;
}

// 달 렌더링 메서드
function renderMoon(scrollPercent) {
  const $motionMoonImg = document.querySelector(".motionMoon__img");

  if(scrollPercent > 75) {
    $motionMoonImg.classList.add("motionMoon__img--active");
  } else {
    $motionMoonImg.classList.remove("motionMoon__img--active");
  }
}

// 초기화 메서드
function initScroll() {
  const scrollPercent = calcScrollPercent();
  renderBg(scrollPercent);

  window.addEventListener("scroll", () => {
    const scrollPercent = calcScrollPercent();

    renderBg(scrollPercent);
    renderCharacter(scrollPercent);
    renderMoon(scrollPercent);
  });
}
initScroll();