class InfiniteGallery {
  static #instance;

  #limitCount = 10;
  #curCount = 0;

  #wrapperElement;
  #footerElement;
  #listElement;

  constructor() {
    if(InfiniteGallery.#instance) return InfiniteGallery.#instance;

    this.#wrapperElement = document.querySelector(".wrapper");
    this.#footerElement = document.querySelector(".footer");
    this.#listElement = document.querySelector(".gallery__list");
  }

  // 스크롤 height 계산 메서드
  #calcScrollHeight() {
    // 문서 전체 Height
    const originWrapperHeight = getComputedStyle(this.#wrapperElement).height;
    const wrapperHeight = Number(originWrapperHeight.replace("px", ""));

    // 화면 Height
    const screenHeight = window.innerHeight;

    // 푸터 Height
    const originFooterHeight = getComputedStyle(this.#footerElement).height;
    const footerHeight = Number(originFooterHeight.replace("px", ""));

    return wrapperHeight - (screenHeight + footerHeight);
  }


  // 스크롤 위치가 Bottom인지 검사 메서드
  #isScrollAtBottom() {
    const scrollY = window.scrollY;
    const scrollHeight = this.#calcScrollHeight();

    return scrollY > scrollHeight;
  }

  // 데이터 조회 메서드
  #getDataList() {
    const dataList = [];

    if(this.#curCount >= this.#limitCount) return dataList;

    this.#curCount++;

    for(let i = 0; i < 4; i++) {
      dataList.push({
        src: `./images/${i + 1}.jpg`,
        name: `${i + 1}`,
      });
    }

    return dataList;
  }

  // 아이템 Element 생성 메서드
  #createItems() {
    if(!this.#isScrollAtBottom()) return;

    const dataList = this.#getDataList();
    dataList.forEach(imgData => {
      const liElement = document.createElement("li");
      liElement.classList.add("gallery__item");

      const figureElement = document.createElement("figure");
      figureElement.classList.add("imgWrapper");

      const imgElement = document.createElement("img");
      imgElement.classList.add("img");
      imgElement.src = imgData.src;
      imgElement.alt = `이미지: ${imgData.name}`;

      figureElement.appendChild(imgElement);
      liElement.appendChild(figureElement);

      this.#listElement.appendChild(liElement);
    });

    if(dataList.length) {
      this.#createItems();
    }
  }

  // 렌더링 메서드
  #render() {
    this.#createItems();
  }

  init() {
    this.#render();

    window.addEventListener("scroll", () => {
      this.#render();
    });
  }
}

const infiniteGallery = new InfiniteGallery();
infiniteGallery.init();
