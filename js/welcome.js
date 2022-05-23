// Section Welcome
const swiper = new Swiper('.swiper.welcome-slider', {
  slidesPerView: 1,
  speed: 800,
  spaceBetween: 10,
  direction: 'horizontal',
  loop: true,
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  pagination: {
    el: '.pagination-fraction',
    type: "fraction",
  },
  pagination: {
    el: '.pagination-square',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const paginationFraction = document.querySelector('.swiper.welcome-slider .swiper-pagination-fraction');
const paginationSquares = document.querySelectorAll('.swiper.welcome-slider .swiper-pagination-bullet');

swiper.on('slideChange', function () {
  paginationFraction.innerText = `0${swiper.realIndex+1}  |  05`;
});

paginationSquares.forEach((el, index) => {
  el.addEventListener('click',() => {
    paginationFraction.innerText = `0${index+1}  |  05`;
  })
})