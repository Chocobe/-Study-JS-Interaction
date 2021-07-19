function start() {
  const aniSampleWrapper = document.querySelector(".aniSample__modelWrapper");
  aniSampleWrapper.classList.add("aniSample__modelWrapper--play");
}

function pause() {
  const aniSampleWrapper = document.querySelector(".aniSample__modelWrapper");
  aniSampleWrapper.classList.remove("aniSample__modelWrapper--play");
}