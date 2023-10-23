'use strict';

document.addEventListener('DOMContentLoaded', function () {

  // ! ======================плавный скролл по якорям==================================

  document.querySelectorAll('a.yakor').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const href = this.getAttribute('href').substring(1)
      const scrollTarget = document.getElementById(href);
      const topOffset = 0;
      const elementPosition = scrollTarget.getBoundingClientRect().top;
      const offsetPosition = elementPosition - topOffset;

      if (menu.classList.contains('burger-menu--active')) {
        hideMenu();
      };

      window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });

  });

  // ! ==============================burger==================================

  const body = document.body;
  const menu = document.querySelector('.burger-menu');
  const burger = document.querySelector('.header__burger');
  const close = document.querySelector('.burger-menu__close');
  const mediaQuery = window.matchMedia('(max-width: 1024px)')


  burger.addEventListener('click', showMenu);
  close.addEventListener('click', hideMenu);

  let keys = {
    ESC: 27,
  };

  menu.inert = true;
  let previousActiveElement;

  function showMenu() {
    menu.classList.add('burger-menu--active');
    if (mediaQuery.matches) {
      body.style.overflow = 'hidden';
    }
    previousActiveElement = document.activeElement;


    Array.from(body.children).forEach((child) => {
      if (child !== menu) {
        child.inert = true;
      }
    });

    menu.inert = false;

    setTimeout(() => {
      close.focus();
    }, 100);

    document.addEventListener('keydown', (e) => {

      if (e.keyCode == keys.ESC) {
        hideMenu();
      }
    });
  }


  function hideMenu() {
    menu.classList.remove('burger-menu--active');
    body.style.overflow = 'initial';

    Array.from(body.children).forEach((child) => {
      if (child !== menu) {
        child.inert = false;
      }
    });

    menu.inert = true;
  };

  // ! =============================search==================================

  document.querySelector('.header__search-tablet').addEventListener('click', () => {
    document.querySelector('.header-form').classList.add('header-form-active');
  });

  document.querySelector('.header-form__closed').addEventListener('click', () => {
    document.querySelector('.header-form-active').classList.remove('header-form-active');
  });

  // ! =====================выпадающее меню в header==================================

  document.querySelectorAll(".header-menu__btn").forEach(item => {
    item.addEventListener("click", function () {
      let btn = this;
      let dropdown = this.parentElement.querySelector(".header-menu__sub-list");
      let headerBottom = document.querySelector(".header__bottom");

      document.querySelectorAll(".header-menu__btn").forEach(el => {

        if (el != btn) {
          el.classList.remove("active-btn");
        }
      });

      document.querySelectorAll(".header-menu__sub-list").forEach(el => {
        if (el != dropdown) {
          el.classList.remove("active-header-menu__sub-list");
        };
      });
      dropdown.classList.toggle("active-header-menu__sub-list");
      btn.classList.toggle("active-btn");
      headerBottom.classList.toggle("header__bottom-active");

      if (item.classList.contains('active-btn') == true) {
        headerBottom.classList.add('header__bottom-active');
      };
    });
  });

  document.addEventListener("click", function (e) {
    let target = e.target;
    if (!target.closest(".header-menu__list")) {
      document.querySelectorAll(".header-menu__sub-list").forEach(el => {
        el.classList.remove("active-header-menu__sub-list");
      });
      document.querySelectorAll(".header-menu__btn").forEach(el => {
        el.classList.remove("active-btn");
      });
      document.querySelectorAll(".header__bottom").forEach(el => {
        el.classList.remove("header__bottom-active");
      });
    };
  });

  // ! ============================SimpleBar (кастомный скролл)==================================

  document.querySelectorAll(".header-menu__sub-list").forEach(item => {
    new SimpleBar(item, {
      ariaLabel: 'Выпадающее меню'
    });
  });

  // ! ==================================селекты==================================

  const defaultSelect = () => {
    const element = document.querySelector('.gallery-select__select');
    const choices = new Choices(element, {
      searchEnabled: false,
    });

    let ariaLabel = element.getAttribute('aria-label');
    element.closest('.choices').setAttribute('aria-label', ariaLabel);
  };

  defaultSelect();

  // ! ==================================табы==================================

  let unknown = document.querySelectorAll('.catalog-artist-unknown-active');

  document.querySelectorAll('.catalog-accordion__btn').forEach(function (e) {
    e.addEventListener('click', function (event) {
      const path = event.currentTarget.dataset.path
      document.querySelectorAll('.catalog-artist', '.catalog-artist-unknown').forEach(function (catalogArtist) {
        catalogArtist.classList.remove('catalog-artist-active', 'catalog-artist-unknown-active');
      });
      document.querySelector(`[data-target="${path}"]`).classList.add('catalog-artist-active', 'catalog-artist-unknown-active');


      document.querySelectorAll('.catalog-accordion__btn').forEach(function (event) {
        event.classList.remove('catalog-accordion__btn-active');
      });
      event.currentTarget.classList.add('catalog-accordion__btn-active');
    });

  });

  // ! ======================плавный скролл по якорям в табах==================================

  document.querySelectorAll('a.yakor-catalog').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const href = this.getAttribute('href').substring(1)
      const scrollTarget = document.getElementById(href);
      const topOffset = 0;
      const elementPosition = scrollTarget.getBoundingClientRect().top;
      const offsetPosition = elementPosition - topOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });


  // ! ==================================popup==================================

  const popupLinks = document.querySelectorAll('.popup-link');
  const body2 = document.querySelector('body');
  const lockPadding = document.querySelectorAll('.lock-padding');

  let unlock = true;

  const timeout = 200;

  if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener('click', function (e) {
        const popupName = popupLink.getAttribute('href').replace('#', '');
        const curentPopup = document.getElementById(popupName);
        popupOpen(curentPopup);
        e.preventDefault();
      });
    }
  }

  const popupCloseIcon = document.querySelectorAll('.close-popup');
  if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener('click', function (e) {
        popupClose(el.closest('.popup'));
        e.preventDefault();
      });
    }
  }

  function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
      const popupActive = document.querySelector('.popup.open');
      if (popupActive) {
        popupClose(popupActive, false);
      } else {
        bodyLock();
      }

      curentPopup.classList.add('open');
      curentPopup.addEventListener('click', function (e) {
        if (!e.target.closest('.popup__wrap')) {
          popupClose(e.target.closest('.popup'));
        }
      });
    }
  }

  function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
      popupActive.classList.remove('open');

      if (doUnlock) {
        bodyUnLock();
      }
    }
  }

  function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.body.offsetWidth + 'px';

    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
    body2.style.paddingRight = lockPaddingValue;
    body.style.overflow = 'hidden';

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  function bodyUnLock() {
    setTimeout(function () {
      if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = '0px';
        }
      }
      body2.style.paddingRight = '0px';
      body.style.overflow = 'visible';
    }, timeout);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
      const popupActive = document.querySelector('.popup.open');
      popupClose(popupActive);
    }
  });

  (function () {
    // проверка IE11
    if (!Element.prototype.closest) {
      // реализация
      Element.prototype.closest = function (css) {
        var node = this;
        while (node) {
          if (node.matches(css)) return node;
          else node = node.parentElement;
        }
        return null;
      };
    }
  })();
  (function () {
    // проверка IE11
    if (!Element.prototype.matches) {
      // определяем свойства
      Element.prototype.matches = Element.prototype.MatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.msMatchesSelector
    }
  })();

  // !==================================маска+валидация==================================*/

  var tel = document.querySelector("input[type='tel']");

  var im = new Inputmask("+7(999) 999-99-99");
  im.mask(tel);

  new JustValidate('.contacts-form', {

    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 10,
      },
      tel: {
        required: true,
        function: (name, value) => {
          const phone = tel.inputmask.unmaskedvalue()
          return Number(phone) && phone.length === 10
        }
      },
    },

    colorWrong: '#ff5c00',

    messages: {
      name: {
        required: 'Как вас зовут?',
        minLength: 'Введите 3 и более символов',
        maxLength: 'Запрещено вводить более 15 символов'
      },
      tel: {
        required: 'Укажите ваш телефон',
        function: 'Здесь должно быть 10 символов без +7'
      },
    },

    submitHandler: function (form) {
      let formData = new FormData(form);

      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            alert('Спасибо! Ваша заявка отправлена');
          }
        }
      }

      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);

      form.reset();

    }
  });

  // ! ==================================карта==================================

  let flag = 0;

  window.addEventListener('scroll', function () {
    let scrollY = window.scrollY;

    let mapOffset = document.querySelector("#map").offsetTop;

    if ((scrollY >= mapOffset - 500) && (flag == 0)) {

      ymaps.ready(init);

      function init() {

        var map = new ymaps.Map("map", {
          center: [55.75846806898367, 37.60108849999989],
          // controls: ['zoomControl'],
          zoom: 14
        });

        // map.controls.remove('geolocationControl'); // удаляем геолокацию
        map.controls.remove('searchControl'); // удаляем поиск
        map.controls.remove('trafficControl'); // удаляем контроль трафика
        map.controls.remove('typeSelector'); // удаляем тип
        map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
        // map.controls.remove('zoomControl'); // удаляем контрол зуммирования
        map.controls.remove('rulerControl'); // удаляем контрол правил
        // map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)


        var myPlacemark = new ymaps.Placemark([55.75846806898367, 37.60108849999989], {}, {
          iconLayout: 'default#image',
          iconImageHref: '/img/icons-sprite/checkbox.svg',
          iconImageSize: [17, 17],
          iconImageOffset: [-9, -9]
          // iconImageOffset: [0, 0]
        });

        map.geoObjects.add(myPlacemark);
      }
      flag = 1;
    }
  });


  // ! ==================================lazyload плагин==================================

  var lazyLoadInstance = new LazyLoad({
  });

  // ! ==============================lazyload для background==================================

  var lazyloadImages;

  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(".lazy");
    var imageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    });

    lazyloadImages.forEach(function (image) {
      imageObserver.observe(image);
    });
  } else {
    var lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll(".lazy");

    function lazyload() {
      if (lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }

      lazyloadThrottleTimeout = setTimeout(function () {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function (img) {
          if (img.offsetTop < (window.innerHeight + scrollTop)) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
          }
        });
        if (lazyloadImages.length == 0) {
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }

  // ! ==================================accordion==================================

  $(function () {
    $("#accordion").accordion({
      heightStyle: "content"
    });
  });


  // ! =================================swiper-hero==================================

  var swiperHero = new Swiper('.hero-swiper__container', {
    loop: true,

    autoheight: true,
    autoplay: {
      delay: 3000,
    },
    effect: "fade",
    // Disable preloading of all images
    preloadImages: false,
    // Enable lazy loading
    lazy: {
      lazy: true,
      loadPrevNext: true,
    },
  });

  // ! =================================swiper-galllery==================================

  var swiperGallery = new Swiper('.gallery-swiper__container', {

    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },

      577: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 36,
      },

      769: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34,
      },

      1025: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 25,
      },

      1441: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
      },
    },


    pagination: {
      el: '.gallery-swiper__pagination',
      type: 'fraction',
    },

    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next'
    },

    autoheight: true,
    autoplay: {
      delay: 2000,
    },

    // Disable preloading of all images
    preloadImages: false,
    // Enable lazy loading
    lazy: {
      lazy: true,
      loadPrevNext: true,
    },

    a11y: {
      paginationBulletMessage: 'Слайд {{index}}',
      prevSlideMessage: 'Предыдущая группа из 3 слайдов',
      nextSlideMessage: 'Следующая группа из 3 слайдов',
      firstSlideMessage: 'Это первый слайд',
      lastSlideMessage: 'Это первый слайд',
      containerMessage: '',
    },
  });

  // ! =================================swiper-events==================================

  var swiperEvents = new Swiper('.events-swiper__container', {

    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0,
      },

      577: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 36,
      },

      769: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 36,
      },

      1025: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 25,
      },

      1441: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
      },
    },

    pagination: {
      el: '.events-swiper__pagination',
      // clickable: true,
      type: 'fraction',
    },

    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next'
    },

    autoheight: true,
    autoplay: {
      delay: 2000,
    },

    // Disable preloading of all images
    preloadImages: false,
    // Enable lazy loading
    lazy: {
      lazy: true,
      loadPrevNext: true,
    },

    a11y: {
      paginationBulletMessage: 'Слайд {{index}}',
      prevSlideMessage: 'Предыдущая группа из 3 слайдов',
      nextSlideMessage: 'Следующая группа из 3 слайдов',
      firstSlideMessage: 'Это первый слайд',
      lastSlideMessage: 'Это первый слайд',
      containerMessage: '',
    },
  });

  // ! =================================swiper-projects==================================

  var swiperProjects = new Swiper('.projects-swiper__container', {

    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },

      577: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34,
      },

      769: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 50,
      },

      1025: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
      },

      1441: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
      },
    },

    pagination: {
      el: '.projects-swiper__pagination',
      // clickable: true,
      type: 'fraction',
    },

    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next'
    },

    autoheight: true,
    autoplay: {
      delay: 2000,
    },

    // Disable preloading of all images
    preloadImages: false,
    // Enable lazy loading

    lazy: {
      lazy: true,
      loadPrevNext: true,
    },

    a11y: {
      paginationBulletMessage: 'Слайд {{index}}',
      prevSlideMessage: 'Предыдущая группа из 3 слайдов',
      nextSlideMessage: 'Следующая группа из 3 слайдов',
      firstSlideMessage: 'Это первый слайд',
      lastSlideMessage: 'Это первый слайд',
    },
  });


});