// Explore Section
var separator = document.querySelector(".separator");
var originalPhoto = document.querySelector(".background-img");
var filteredPhoto = document.querySelector(".foreground-img");
var imageComparison = document.querySelector(".image-comparison");
var flag = false;

const mousedownSeparator = (ev) => {
  ev.preventDefault();
  flag = true;
}
separator.addEventListener("mousedown", mousedownSeparator,false);

document.addEventListener("mouseup", function () {
    flag = false;
  },
  false
);

imageComparison.addEventListener(
  "mousemove",
  function (evt) {
    var res = evt.pageX - this.offsetLeft;

    if (flag && res > 0 && res < filteredPhoto.offsetWidth) {
      separator.style.left = res + "px";
      originalPhoto.style.width = res + "px";
    }
  },
  false
);