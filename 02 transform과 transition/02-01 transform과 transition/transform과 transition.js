function getSampleContentList() {
  return Array.from(document.querySelectorAll(".sample__content"));
}

function start() {
  const sampleContentList = getSampleContentList();
  sampleContentList.forEach(sampleContent => {
    const content = sampleContent.innerHTML.toLowerCase();
    const imgWrapper = sampleContent.parentElement.querySelector(".imgWrapper");

    switch(content) {
      case "rotate": {
        imgWrapper.classList.add("imgWrapper--rotate");
        break;
      }

      case "scale": {
        imgWrapper.classList.add("imgWrapper--scale");
        break;
      }

      case "skew": {
        imgWrapper.classList.add("imgWrapper--skew");
        break;
      }

      case "translate": {
        imgWrapper.classList.add("imgWrapper--translate");
        break;
      }
    }
  });
}

function end() {
  const imgWrapperList = Array.from(document.querySelectorAll(".imgWrapper"));
  imgWrapperList.forEach(imgWrapper => {
    const actionStyleClass = imgWrapper.classList[1];

    if(actionStyleClass) {
      imgWrapper.classList.remove(actionStyleClass);
    }
  });
}


