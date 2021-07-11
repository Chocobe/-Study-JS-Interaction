const limitCount = 10;
let curCount = 0;

// 전체 스크롤 영역 높이 반환 메서드
function getTotalScrollHeight() {
  // 문서의 전체 height
  const wrapElement = document.querySelector(".wrap");
  const originWrapHeight = getComputedStyle(wrapElement).height;
  const wrapHeight = Number(originWrapHeight.replace("px", ""));

  // 화면 height
  const screenHeight = window.innerHeight;

  // 푸터 height
  const footerElement = document.querySelector(".footer");
  const originFooterHeight = getComputedStyle(footerElement).height;
  const footerHeight = Number(originFooterHeight.replace("px", ""));

  // 문서 height - (화면 height + 푸터 height)
  // 화면에 footer가 보이는 순간부터 "음수값"
  return wrapHeight - (screenHeight + footerHeight);
}

// 스크롤이 문서 하단에 도착했는지 검사 메서드
function isScrollBottom() {
  const totalScrollHeight = getTotalScrollHeight();
  const scrollY = window.scrollY;

  return scrollY > totalScrollHeight || totalScrollHeight < 0;
}

// 데이터 조회 메서드
function getDataList() {
  const dataList = [];

  if(curCount < limitCount) {
    curCount++;

    for(let i = 0; i < 4; i++) {
      dataList.push({
        src: `./images/${i + 1}.jpg`,
        name: `${i + 1}`,
      });
    }
  }

  return dataList;
}

// 이미지 ItemElement 생성 메서드
function createItemElement(imgData) {
  const liElement = document.createElement("li");
  liElement.classList.add("infiniteGallery__item");

  const figureElement = document.createElement("figure");
  figureElement.classList.add("imgWrapper");

  const imgElement = document.createElement("img");
  imgElement.classList.add("img");
  imgElement.src = imgData.src;
  imgElement.alt = `이미지: ${imgData.alt}`;

  figureElement.appendChild(imgElement);
  liElement.appendChild(figureElement);

  return liElement;
}

// 렌더링 메서드
function renderList() {
  // 스크롤 위치가 최하단에 도착했다면,
  if(isScrollBottom()) {
    const dataList = getDataList();

    if(dataList.length === 0) return;

    const listElement = document.querySelector(".infiniteGallery__list");

    dataList.forEach(imgData => {
      const itemElement = createItemElement(imgData);
      listElement.append(itemElement);
    });

    renderList();
  }
}

renderList();

window.addEventListener("scroll", () => {
  renderList();
});