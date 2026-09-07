function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


// Fisher-Yates. En sort() med tilfeldig komparator gir ikke uniform
// fordeling, og noen piksler ville tent i omtrent samme rekkefølge hver gang.
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomInt(0, i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
}


window.addEventListener("DOMContentLoaded", function() {
  const elements = document.querySelectorAll(".mp__magiske-piksler span");
  let pixels = [];

  elements.forEach(element => {
    pixels.push(element);
  })


  shuffle(pixels);

  const duration = 400;
  const interval = duration / pixels.length;

  let time = 0;
  pixels.forEach(pixel => {
    time = time + interval;
    setTimeout(() => {
      pixel.style.opacity = getRandomInt(45,90)/100;
    }, time);
  });


}, false);