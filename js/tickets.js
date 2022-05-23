// Popup
const coverElem = document.querySelector('#cover');
const buttonByu = document.querySelector('.btn-buy');
const popupContainer = document.querySelector('#booking-tickets-popup');
const popupElem = document.querySelector('#booking-tickets');
const closeIcon = document.querySelector('.close-icon');


function showPopup() {
  coverElem.classList.remove('hidden');
  popupContainer.classList.remove('hidden');
  popupElem.classList.remove('hidden');
  coverElem.addEventListener('click', closePopup);
  closeIcon.addEventListener('click', closePopup);
}

function closePopup() {
  document.querySelector('.booking-tickets-form').reset();
  coverElem.removeEventListener('click', closePopup);
  closeIcon.removeEventListener('click', closePopup);
  coverElem.classList.add('hidden');
  popupElem.classList.add('hidden');
  popupContainer.classList.add('hidden');
}

buttonByu.addEventListener('click', showPopup);

// Calculation ticket`s price
const ticketsTypeInputs = document.getElementsByName('radio');
const btnsMinus = document.getElementsByClassName('button-minus');
const btnsPlus = document.getElementsByClassName('button-plus');
const numberInputs = document.getElementsByClassName('number');
const ticketTypeSelect = document.querySelector('.ticket-type-select');
const ticketsTypeOptions = document.getElementsByClassName('ticket-type-option');
const countTicketsButton = document.querySelectorAll('.count-tickets button');
const seniorPriceEl = document.querySelector('.price .senior');
const basicPriceEl = document.querySelector('.price .basic');

let ticketTypePrice = 20;
let ticketType = '';
let basicTicketsCount = 1;
let seniorTicketsCount = 1;
let basicTicketPrice = 20;
let seniorTicketPrice = 10;
let totalPrice = 0;

window.onload = function(){
  if(localStorage.getItem("ticketTypeChecked")){
    let index = localStorage.getItem("ticketTypeChecked");
    ticketsTypeInputs[index].setAttribute('checked', 'checked');
    ticketsTypeOptions[index].selected = true;
  } else {
    localStorage.setItem('ticketTypeChecked', 0);
    ticketsTypeOptions[0].selected = true;
  } 

  if(localStorage.getItem("ticketType")) {
    ticketType = localStorage.getItem("ticketType");
    document.querySelector('.type-ticket').innerHTML = ticketType;
  } else {
    localStorage.setItem('ticketType', 'Permanent exhibition');
    document.querySelector('.type-ticket').innerHTML = 'Permanent exhibition';
  }

  if(localStorage.getItem("basicTicketsCount")){
    basicTicketsCount = localStorage.getItem("basicTicketsCount");
    basicTicketPrice = localStorage.getItem("basicTicketPrice");
    numberInputs[0].setAttribute("value", basicTicketsCount);
    numberInputs[2].setAttribute("value", basicTicketsCount);
    countTicketsButton[0].innerHTML = basicTicketsCount;
    basicPriceEl.innerHTML = `${basicTicketPrice * basicTicketsCount} €`;

  } else {
    localStorage.setItem('basicTicketsCount', basicTicketsCount);
    localStorage.setItem('basicTicketPrice', basicTicketPrice);
    numberInputs[0].setAttribute("value", basicTicketsCount);
    numberInputs[2].setAttribute("value", basicTicketsCount);
    countTicketsButton[0].innerHTML = basicTicketsCount;
    basicPriceEl.innerHTML = `${basicTicketPrice * basicTicketsCount} €`;
  }

  if(localStorage.getItem("seniorTicketsCount")){
    seniorTicketsCount = localStorage.getItem("seniorTicketsCount");
    seniorTicketPrice = localStorage.getItem("seniorTicketPrice");
    numberInputs[1].setAttribute("value", seniorTicketsCount);
    numberInputs[3].setAttribute("value", seniorTicketsCount);
    countTicketsButton[1].innerHTML = seniorTicketsCount;
    seniorPriceEl.innerHTML = `${seniorTicketPrice * seniorTicketsCount} €`;
  } else {
    localStorage.setItem('seniorTicketPrice', seniorTicketPrice);
    localStorage.setItem('seniorTicketsCount', seniorTicketsCount);
    numberInputs[1].setAttribute("value", seniorTicketsCount);
    numberInputs[3].setAttribute("value", seniorTicketsCount);
    countTicketsButton[1].innerHTML = seniorTicketsCount;
    seniorPriceEl.innerHTML = `${seniorTicketPrice * seniorTicketsCount} €`;
  }

  if(localStorage.getItem("totalPrice")){
    totalPrice = localStorage.getItem("totalPrice");
    document.querySelector('.price').innerHTML = `Total €${totalPrice}`;
    document.querySelector('.total-price').innerHTML = `${totalPrice} €`;
  } else {
    totalPrice = ticketTypePrice * basicTicketsCount + (ticketTypePrice * seniorTicketsCount) / 2;
    document.querySelector('.price').innerHTML = `Total €${totalPrice}`;
    document.querySelector('.total-price').innerHTML = `${totalPrice} €`;
    localStorage.setItem('totalPrice', totalPrice);
  }
}

ticketsTypeInputs.forEach((el, index) => {
  el.addEventListener('click', () => {
    isChecked(el, index);
  });
});

function isChecked(el, index) {
  if(el.checked) {
    switch(index) {
      case 0: 
        basicTicketPrice = 20;
        seniorTicketPrice = 10;
        ticketType = 'Permanent exhibition';
        break;
      case 1: 
        basicTicketPrice = 25;
        seniorTicketPrice = 12.5;
        ticketType = 'Temporary exhibition';
        break;
      case 2: 
        basicTicketPrice = 40;
        seniorTicketPrice = 20;
        ticketType = 'Combined exhibition';
        break;
    }
    localStorage.setItem('ticketTypeChecked', index);
    localStorage.setItem('ticketType', ticketType);
    ticketsTypeOptions[index].selected = true;
    document.querySelector('.type-ticket').innerHTML = ticketType;
    calculateTotalPrice();
  }
}

Array.from(btnsMinus).forEach((el, i) => {
  el.addEventListener('click', () => {
    el.nextElementSibling.stepDown();
    if (i == 0 || i == 2) {
      basicTicketsCount = btnsMinus[i].nextElementSibling.value;
      btnsMinus[0].nextElementSibling.setAttribute("value", basicTicketsCount);
      btnsMinus[2].nextElementSibling.setAttribute("value", basicTicketsCount);
      countTicketsButton[0].innerHTML = basicTicketsCount;
      basicPriceEl.innerHTML = `${basicTicketPrice * basicTicketsCount} €`;
    } else {
      seniorTicketsCount = btnsMinus[i].nextElementSibling.value;
      btnsMinus[1].nextElementSibling.setAttribute("value", seniorTicketsCount);
      btnsMinus[3].nextElementSibling.setAttribute("value", seniorTicketsCount);
      countTicketsButton[1].innerHTML = seniorTicketsCount;
      seniorPriceEl.innerHTML = `${seniorTicketPrice * seniorTicketsCount} €`;
    }
    calculateTotalPrice();
  });
});

Array.from(btnsPlus).forEach((el, i) => {
  el.addEventListener('click', () => {
    el.previousElementSibling.stepUp();
    if (i == 0 || i == 2) {
      basicTicketsCount = btnsPlus[i].previousElementSibling.value;
      btnsPlus[0].previousElementSibling.setAttribute("value", basicTicketsCount);
      btnsPlus[2].previousElementSibling.setAttribute("value", basicTicketsCount);
      countTicketsButton[0].innerHTML = basicTicketsCount;
      basicPriceEl.innerHTML = `${basicTicketPrice * basicTicketsCount} €`;
    } else {
      seniorTicketsCount = btnsPlus[i].previousElementSibling.value;
      btnsPlus[1].previousElementSibling.setAttribute("value", seniorTicketsCount);
      btnsPlus[3].previousElementSibling.setAttribute("value", seniorTicketsCount);
      countTicketsButton[1].innerHTML = seniorTicketsCount;
      seniorPriceEl.innerHTML = `${seniorTicketPrice * seniorTicketsCount} €`;
    }
    calculateTotalPrice();
  });
});

ticketTypeSelect.addEventListener('change', () => {
  ticketType = ticketTypeSelect.options[ticketTypeSelect.selectedIndex].value;
  localStorage.setItem('ticketTypeChecked', ticketTypeSelect.selectedIndex - 1);
  localStorage.setItem('ticketType', ticketType);
  document.querySelector('.type-ticket').innerHTML = ticketType;
  if(ticketType == 'Permanent exhibition') {
    basicTicketPrice = 20;
    seniorTicketPrice = 10;
  }
  if(ticketType == 'Temporary exhibition') {
    basicTicketPrice = 25;
    seniorTicketPrice = 12.5;
  }
  if(ticketType == 'Combined Admission') {
    basicTicketPrice = 40;
    seniorTicketPrice = 20;
  }
  calculateTotalPrice();
  document.querySelector('.ticket-basic-block p').innerHTML = `Basic 18+ (${basicTicketPrice} €)`;
  document.querySelector('.ticket-senior-block p').innerHTML = `Senior 65+ (${seniorTicketPrice} €)`;
  document.querySelector('.count-tickets .basic').innerHTML = `Basic (${basicTicketPrice} €)`;
  document.querySelector('.count-tickets .senior').innerHTML = `Senior (${seniorTicketPrice} €)`;
  basicPriceEl.innerHTML = `${basicTicketPrice * basicTicketsCount} €`;
  seniorPriceEl.innerHTML = `${seniorTicketPrice * seniorTicketsCount} €`;
  
});

function calculateTotalPrice() {
  localStorage.setItem('basicTicketPrice', basicTicketPrice);
  localStorage.setItem('seniorTicketPrice', seniorTicketPrice);
  localStorage.setItem('basicTicketsCount', basicTicketsCount);
  localStorage.setItem('seniorTicketsCount', seniorTicketsCount);
  totalPrice = basicTicketPrice * basicTicketsCount + seniorTicketPrice * seniorTicketsCount;
  localStorage.setItem('totalPrice', totalPrice);
  document.querySelector('.price').innerHTML = `Total €${totalPrice}`;
  document.querySelector('.total-price').innerHTML = `${totalPrice} €`;
}

// Input Date
const inputDate = document.querySelector('.date');
inputDate.addEventListener('click', () => {
  inputDate.setAttribute('min', new Date().toLocaleDateString().split('.').reverse().join('-'));
});

inputDate.addEventListener('input', () => {
  let options = { weekday: 'long', month: 'long', day: 'numeric' };
  inputDate.classList.add('valid');
  let ticketDate = new Date(inputDate.value).toLocaleDateString('en-En', options);
  document.querySelector('.ticket-date').innerHTML = ticketDate;
});

// Input Time
const inputTime = document.querySelector('.time');
inputTime.addEventListener('input', () => {
  document.querySelector('.ticket-time').innerHTML = inputTime.value;
  inputTime.classList.add('valid');
});

// Form validation
const inputs = document.querySelectorAll('.input');
let regExp = null;

inputs.forEach((el)=> {
  el.addEventListener('input', (event) => {
    if(el.classList.contains('client-name')) {
      regExp = /^[a-zA-Zа-яА-Я\s]{3,15}$/;
    };
    if(el.classList.contains('client-email')) {
      regExp = /^([a-zA-Z0-9_-\S][^~!@#$%^&*()?/\+]{3,15})@([a-z]{4,})(\.[a-z]{2,})$/;
    };
    if(el.classList.contains('client-phone')) {
      regExp = /^[0-9]{4,10}$/;
    };
    checkValidity(el);
  })
});

function checkValidity(el) {
  const clientInputBlock = el.parentNode;
  if(!regExp.test(el.value) || el.value == '') {
    el.classList.add('invalid');
    el.classList.remove('valid');
    clientInputBlock.childNodes[5].innerText = 'Введено неверное значение';
    clientInputBlock.childNodes[5].classList.add('active');
  } else {
    if(el.classList.contains('invalid')) {
      el.classList.remove('invalid');
    }
    if(clientInputBlock.childNodes[5].classList.contains('active')) {
      clientInputBlock.childNodes[5].classList.remove('active');
    }
    el.classList.add('valid');
  }
}
