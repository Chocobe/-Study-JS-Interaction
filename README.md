# 인터렉션 웹페이지 스터디 정리

## 01. 이동거리 백분율 원리

스크롤의 현재 위치에 대한 백분율 값을 구하면, 스크롤에 따른 인터랙션을 구현한 수 있습니다.

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