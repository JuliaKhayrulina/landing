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

    function handlerMenu() {
      menu.classList.toggle('active-menu');
    }

    document.addEventListener('click', (e) => {
      const target = e.target;

      if (target.closest('.menu')) handlerMenu();
      if (target.closest('.close-btn') || target.closest('li')) handlerMenu();
      if (!target.closest('.active-menu') && !target.closest('.menu')) {
        document.querySelector('menu').classList.remove('active-menu');
      }
    });
  };

  toggleMenu();
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

  const togglePopup = () => {
    document.addEventListener('click', (e) => {
      const target = e.target;

      if (target.closest('.popup-btn')) openPopup();
      if (target.closest('.popup-close')) closePopup();
      if (target.matches('.popup')) closePopup();
    });
  };
  togglePopup();

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
  //==========Плавный скролл=========//

  const smoothScroll = () => {
    const scrollIn = (target) => {
      const linkId = target.getAttribute('href').substr(1);
      const it = document.getElementById(linkId);
      it.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    document.addEventListener('click', (e) => {
      let target = e.target;
      if (target.closest('li>a[href*="#"]')) {
        e.preventDefault();
        scrollIn(target);
      } else if (target.parentNode.closest('a[href="#service-block"]')) {
        e.preventDefault();
        scrollIn(target.parentNode);
      }
    });
  };
  smoothScroll();

  //=========Табы=================//

  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', (e) => {
      let target = e.target;
      target = target.closest('.service-header-tab');

      if (target) {
        tab.forEach((item, index) => {
          if (item === target) {
            toggleTabContent(index);
          }
        });
      }
    });
  };
  tabs();

  //============Слайдер=========//

  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      dotsList = document.querySelector('.portfolio-dots'),
      slider = document.querySelector('.portfolio-content');

    const createDots = () => {
      let i = 0;
      while (i++ < slide.length) {
        const li = document.createElement('li');
        li.classList.add('dot');
        dotsList.appendChild(li);
      }
    };
    createDots();

    const dot = document.querySelectorAll('.dot');
    let currentSlide = 0,
      interval;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };
    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) currentSlide++;
      else if (target.matches('#arrow-left')) currentSlide--;
      else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (e) => {
      if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {
        stopSlide();
      }
    });
    slider.addEventListener('mouseout', (e) => {
      if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {
        startSlide();
      }
    });

    startSlide(1500);
  };
  slider();
});
