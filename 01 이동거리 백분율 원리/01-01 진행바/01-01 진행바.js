// scroll 의 이동 거리값 계산 함수
function getScrollHeight() {
  const screenHeight = window.innerHeight;

  const heightRegEx = /\d+\.?\d*/g;

  const sec01Element = document.querySelector(".sec01");
  const originSec01Height = getComputedStyle(sec01Element).height;
  const sec01Height = Number(originSec01Height.match(heightRegEx)[0]);

  return sec01Height - screenHeight;
}

// 현재 스크롤값 퍼센트값 계산 함수
function getPercent() {
  const scrollHeight = getScrollHeight();
  const scrollTop = window.scrollY;

  return (scrollTop / scrollHeight) * 100;

}

// 화면에 적용 시키는 함수
function render() {
  const percent = Number(getPercent());

  const barElement = document.querySelector(".bar");
  const txtElement = document.querySelector(".txt");

  barElement.style.width = `${percent}%`;
  txtElement.innerHTML = Math.floor(percent) + "%";
}

window.addEventListener("scroll", render);