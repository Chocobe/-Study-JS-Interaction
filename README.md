##### top
# 인터렉션 웹페이지 스터디 정리

## 01-01. 이동거리 백분율 원리

스크롤의 현재 위치에 대한 백분율 값을 구하면, 스크롤에 따른 인터랙션을 구현한 수 있습니다.

<img src="./readmeAssets/01%20무한%20스크롤%20원리.png" width="700px" alt="이미지: 01 무한 스크롤 원리"><br/>

백분율을 구하려면, ``기준 높이``가 필요 합니다.

``기준 높이``는 실제 컨텐츠의 높이가 되는데, 이는 ``getComputedStyle(대상요소)``를 사용하여 ``실제 높이``를 구할 수 있고, ``기준 높이``가 됩니다.

즉, 화면을 벗어난 부분을 모두 포함한 ``실제 높이`` 입니다.

```javascript
const wrapElement = document.querySelector(".wrap");
const wrapHeight = getComputedStyle(wrapElement).height;

console.log("기준 높이: ", wrapHeight);
```

<br/>

주의할 점은 ``px``단위가 분은 ``String`` 타입이기 때문에, ``정규식``을 사용하여, ``Number``로 변환해야 연산에 사용할 수 있습니다.

그리고 스크롤 위치값이 0 이라면, 현재 화면 크기만큼은 화면에 보이는 상태이므로, ``"기준 높이" - "화면 높이"``를 해야 ``스크롤 위치값``과 비율을 구할 수 있습니다. (스크롤 높이)

```javascript
const wrapElement = document.querySelector(".wrap");
const originWrapHeight = getComputedStyle(wrapElement).height;

const heightRegEx = /\d+\.?\d*/g;

const wrapHeight = Number(originWrapHeight.match(heightRegEx)[0]);

const screenHeight = window.innerHeight;
const scrollHeight = wrapHeight - screenHeight;

console.log("스크롤 높이: ", scrollHeight);
```

<br/>

이제 ``스크롤 위치``값을 구하면, ``현재 스크롤 백분율``을 구할 수 있습니다.

주의할 점은 ``HTMLElement``에서의 ``스크롤 위치값``과 ``window``에서의 ``스크롤 위치값``의 속성명이 다른 점 입니다.

* ``HTMLElement``의 스크롤값: ``HTMLElement.scrollTop``
* ``window``의 스크롤값: ``window.scrollY``

<br/>

이제 스크롤 백분율을 구할 준비가 되었습니다.

* ``기준 높이``
* ``현재 스크롤 위치``

<br/>

```html
<body>
  <div class="wrap">
    <section class="sec">
      화면을 벗어나는 Height를 가진 요소
    </section>
  </div>

  <script>
    function getScrollHeight() {
      const heightRegEx = /\d+\.?\d*/g;

      const secElement = document.querySelector(".sec");
      const originSecHeight = getComputedStyle(secElement).height;
      const secHeight = Number(originSecHeight.match(heightRegEx));

      const screenHeight = window.innerHeight;

      return secHeight - screenHeight;
    }

    function render() {
      const scrollHeight = getScrollHeight();
      const scrollY = window.scrollY;
      
      const scrollPercent = (scrollY / scrollHeight) * 100;
      console.log("스크롤 위치 백분율: ", scrollPercent);
    }
  </script>
</body>
```



<br/>

[🔺 Top](#top)

<hr/><br/>



## 01-02 무한스크롤

무한스크롤 역시, 스크롤의 이동거리를 사용하여 구현할 수 있습니다.

무한스크롤의 원리는, 스크롤이 화면의 Bottom에 도착했을 때 ``데이터 조회`` 및 ``화면 출력``의 과정의 반복 입니다.

<br/>

무한스크롤을 구현하기 위해, 다음과 같은 요소가 필요 합니다.

* 전체 ``문서의 현재`` height
* 현재 ``스크롤``의 위치

<br/>

그리고 중요한 것은, ``스크롤``의 이동가능한 ``height``를 계산하는 것입니다.

이것은 ``01-01. 이동거리 백분율 원리``에서 구했던 ``스크롤 height``와 동일한 방법으로 구할 수 있습니다.

``스크롤 height`` = ``문서 전체 height`` - ``화면 height``

만약 컨텐츠 하단에 추가적인 요소가 있다면 (예: ``footer``) 해당 요소의 height까지 빼주어야 정상적으로 동작됩니다.

<br/>

다음은 무한스크롤에 대한 예시 코드 입니다.

```javascript
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
```

<br/>

그리고, 무한스크롤을 사용했을 때는 ``상세 페이지 이동`` 또는 ``새로고침``에 대한 추가적인 처리가 필요 합니다.

만약, 10번의 무한스크롤 동작이 된 후, ``상세 페이지 이동``을 하였습니다.

이동 후 뒤로가기를 했을 때는 ``10번의 무한스크롤 동작`` 상태가 아닌, 초기 상태가 되므로, 마지막 위치를 보기위해서 다시 스크롤을 해야 합니다.

``새로고침``역시 동일한 문제를 가지고 있습니다.

<br/>

Google에서 사용중인 무한스크롤에는 ``상세 페이지``를 바로 열지 않고, 사이드 요소에 간략한 정보를 보여주고, ``상세페이지`` 이동 시, ``새창 열기``로 해결하였습니다.



<br/>

[🔺 Top](#top)

<hr/><br/>



## 02-01. CSS의 ``transform``과 ``transition``

``transform``은 용소의 ``전환``을 말합니다.

종류는 다음과 같습닌다.

* ``rotate``: 회전
* ``scale``: 줌인, 줌아웃
* ``skew``: 기울기
* ``translate``: 이동

<br/>

``transition``을 사용하면 요소의 전환을 Animation 으로 나타냅니다.



<br/>

[🔺 Top](#top)

<hr/><br/>



## 02-01. 벤더프리픽스

``벤더프리픽스``는 각 브라우저별 ``CSS 기능``을 정상적으로 적용시키기 위한 방법 입니다.

브라우저별의 버전에 따라서도 ``벤더프리픽스``가 필요할 수 있는데, 이러한 정보는 [https://caniuse.com/](https://caniuse.com/) 에서 확인 할 수 있습니다.

<br/>

아래 이미지는 ``transition``을 검색한 결과 입니다.

<img src="./readmeAssets/02%2001%20벤더프리픽스%2001.png" alt="02-01. 벤더프리픽스" width="1200px"><br/>

<br/>

검색한 결과에서 알게된 ``벤더프리픽스``는 다음과 같습니다.

* ``chrome 4-25 이하`` 버전에서는 ``transition`` 사용 시, ``-webkit-`` 벤더프리픽스가 있어야 합니다.

<br/>

벤더프리픽스를 사용하면 다음과 같습니다.

```css
.myBox {
  transition: transform 1s;
  -webkit-transition: transform 1s;
}
```



<br/>

[🔺 Top](#top)

<hr/><br/>



## 02-02. keyframes

CSS의 ``animation`` 속성은, 동작을 정의하는 기능인 ``keyframes``를 사용합니다.

``keyframes``는 요소의 변화에 대해 ``to ~ from`` 또는 ``0% ~ 100%`` 형식으로 정의할 수 있습니다.

```css
@keyframes myAnim {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
```

<br/>

```css
@keyframes myAnim {
  0% {
    opacity: 1;
  }

  25% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  75% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
```

<br/>

이제 ``keyframes``을 설정하는 ``animation`` 속성에 대해 알아보겠습니다.

``animation`` 속성은 총 ``8가지`` 설정을 할 수 있습니다.

다음 코드는 ``animation`` 속성의 ``8가지`` 속성을 개별로 설정한 방식입니다.

```css
.myModel {
  /* animation 으로 동작시킬 keyframes명 */
  animation-name: myAnim;

  /* animation의 1주기가 동작할 시간: 3초에 걸쳐 keyframes 동작 */
  animation-duration: 3s;

  /* animation이 동작하기 전, 대기할 시간: 2초 대기 후 동작 */
  animation-delay: 2s;

  /* animation 반복 횟수: 무한반복 */
  animation-iteration-count: infinite;

  /* animation의 동작 방향: 역방향 */
  animation-direction: reverse;

  /* animation 가속도: 등가속 */
  animation-timing-function: linear;

  /* animation 경계의 스타일 처리방식 설정: 시작과 끝의 스타일을 유지 */
  animation-fill-mode: both;

  /* animation의 "Run" 또는 "Pause" 설정 */
  animation-play-state: running;
}
```



<br/>

[🔺 Top](#top)

<hr/><br/>
