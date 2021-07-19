function toggle() {
  const imgWrapper = document.querySelector(".media__imgWrapper");
  const activeClass = "media__imgWrapper--active";

  if(imgWrapper.classList.contains(activeClass)) {
    imgWrapper.classList.remove(activeClass);
  } else {
    imgWrapper.classList.add(activeClass);
  }
}