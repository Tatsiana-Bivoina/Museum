const pictureInnerContainer = document.querySelector('.picture-inner-container');

let picturesUrl = ['galery1.jpg', 'galery2.jpg', 'galery3.jpg', 'galery4.jpg', 'galery5.jpg', 'galery6.jpg', 'galery7.jpg', 'galery8.jpg', 'galery9.jpg', 'galery10.jpg', 'galery11.jpg', 'galery12.jpg', 'galery13.jpg', 'galery14.jpg', 'galery15.jpg'];


function shuffle(picturesUrl) {
  for (let i = picturesUrl.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [picturesUrl[i], picturesUrl[j]] = [picturesUrl[j], picturesUrl[i]];
  }
}
shuffle(picturesUrl);

picturesUrl.forEach((el) => {
  const galleryImage = document.createElement('div');
  galleryImage.className = "gallery-image anim-item anim-no-hide";
  const img = `<img class="anim-show" src="assets/img/galery/${el}" alt="galery">`;

  galleryImage.innerHTML = img;

  pictureInnerContainer.appendChild(galleryImage);
})

function animOnScroll() {
  const animItems = document.querySelectorAll('.anim-item');

  for(let i = 0; i < animItems.length; i++) {
    const animItem = animItems[i];
    const animItemHeight = animItem.offsetHeight;
    const animItemOffset = offset(animItem).top;
    const animStart = 12;

    let animItemPoint = window.innerHeight - animItemHeight / animStart;
    if(animItemHeight > window.innerHeight) {
      animItemPoint = window.innerHeight - window.innerHeight / animStart;
    };

    if(window.pageYOffset > (animItemOffset - animItemPoint) && window.pageYOffset < (animItemOffset + animItemHeight)) {
      animItem.classList.add('active');
    } else {
      animItem.classList.remove('active');
    };
  }
}

function offset(el) {
  const rect = el.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}

window.addEventListener('scroll', animOnScroll);

animOnScroll();
