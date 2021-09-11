window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  //==========таймер==============//

  const countTimer = (deadline) => {
    let timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    const getTimeRemaining = () => {
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000, //получаем разницу в мс / 1000 => в секунды
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);

      return { dateStop, dateNow, hours, minutes, seconds };
    };

    const upDateClock = () => {
      let timer = getTimeRemaining();

      timerHours.textContent = ('0' + timer.hours).slice(-2);
      timerMinutes.textContent = ('0' + timer.minutes).slice(-2);
      timerSeconds.textContent = ('0' + timer.seconds).slice(-2);

      if (timer.dateStop < timer.dateNow) {
        clearInterval(idSetInterval);
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
    };
    upDateClock();
  };
  let idSetInterval = setInterval(countTimer, 1000, '12 sept 2021');
  countTimer('12 sept 2021');

  //===========Меню===============//

  const toggleMenu = () => {
    const menu = document.querySelector('menu');
    menu.classList.toggle('active-menu');
  };

  //===========Popup===========//

  const openPopup = () => {
    const popup = document.querySelector('.popup');
    popup.style.display = 'block';
    if (document.body.clientWidth > 768) {
      window.requestAnimationFrame(step);
    }
  };
  const closePopup = () => {
    const popup = document.querySelector('.popup'),
      popupContent = document.querySelector('.popup-content');

    popup.style.display = 'none';
    popupContent.classList.remove('.popup-animate');
    timer = 1;
  };

  //=====Анимация popup===========//
  let timer = 1;

  function step() {
    const popupContent = document.querySelector('.popup-content'),
      popupStyle = window.getComputedStyle(popupContent, null),
      popupWidth = parseInt(popupStyle.getPropertyValue('width')),
      stop = document.body.clientWidth / 2 - popupWidth / 2;

    popupContent.classList.add('popup-animate');

    timer++;
    let progress = timer * 30;
    if (progress < stop) {
      document.querySelector('.popup-animate').style.left = progress + 'px';
      document.querySelector('.popup-animate').style.opacity = progress / stop;
      window.requestAnimationFrame(step);
    }
  }

  //=========Обработчик===========//
  const eventListeners = () => {
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (target.closest('.menu')) toggleMenu();
      if (target.closest('.close-btn') || target.closest('li')) toggleMenu();
      if (target.closest('.popup-btn')) openPopup();
      if (target.closest('.popup-close')) closePopup();
    });
  };
  eventListeners();
});
