'use strict';

// проверка localStorage

let isStorageSupport = true;
try {
  localStorage.setItem('tst', 'tst');
  localStorage.removeItem('tst');
} catch (err) {
  isStorageSupport = false;
};

// Pop-up

const showPopup = (popupElement, popupCloseButton, popupShowCssClass = 'popup--show') => {

  const closePopup = () => {
    popupCloseButton.removeEventListener('click', closeButtonHandler);
    document.removeEventListener('keydown', escKeydownHandler);
    popupElement.classList.remove(popupShowCssClass);
  };

  const escKeydownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closePopup();
    }
  };

  const closeButtonHandler = (evt) => {
    evt.preventDefault();
    closePopup();
  };

  popupElement.classList.add(popupShowCssClass);
  popupCloseButton.addEventListener('click', closeButtonHandler);
  document.addEventListener('keydown', escKeydownHandler);
};

// Обратная связь

const popupWriteUs = document.querySelector('.popup--write-us');
const buttonWriteUs = document.querySelector('.contacts__link');

if (buttonWriteUs && popupWriteUs) {
  const popupWriteUsClose = popupWriteUs.querySelector('.popup-close');
  const popupWriteUsForm = popupWriteUs.querySelector('.popup__form');
  const popupWriteUsNameField = popupWriteUs.querySelector('[name=message-name]');
  const popupWriteUsEmailField = popupWriteUs.querySelector('[name=message-email]');
  const popupWriteUsMessage = popupWriteUs.querySelector('[name=message]');

  const onWriteUsClick = (evt) => {
    evt.preventDefault();
    showPopup(popupWriteUs, popupWriteUsClose);
    if (isStorageSupport) {
      popupWriteUsNameField.value = localStorage.getItem('popupWriteUsNameField');
      popupWriteUsEmailField.focus();
    } else {
      popupWriteUsNameField.focus();
    }
  };

  const flashWriteUsInput = (element, cssClas = 'popup--write-us-required') => {
    element.classList.remove(cssClas);
    element.focus();
    element.classList.add(cssClas);
  };

  const onWriteUsFormSubmit = (evt) => {
    if (!popupWriteUsNameField.value) {
      evt.preventDefault();
      flashWriteUsInput(popupWriteUsNameField);
    } else if (!popupWriteUsEmailField.value) {
      evt.preventDefault();
      flashWriteUsInput(popupWriteUsEmailField);
    } else if (!popupWriteUsMessage.value) {
      evt.preventDefault();
      flashWriteUsInput(popupWriteUsMessage);
    } else {
      if (isStorageSupport) {
        localStorage.setItem('popupWriteUsNameField', popupWriteUsNameField.value);
      }
    }
  };

  popupWriteUsMessage.removeAttribute('required');
  popupWriteUsNameField.removeAttribute('required');
  popupWriteUsEmailField.removeAttribute('required');
  buttonWriteUs.addEventListener('click', onWriteUsClick);
  popupWriteUsForm.addEventListener('submit', onWriteUsFormSubmit);
};

// Карта

const popupMap = document.querySelector('.popup--map');
const buttonMap = document.querySelector('.contacts__map');

if (buttonMap && popupMap) {
  const popupMapClose = popupMap.querySelector('.popup-close');

  const onbuttonMapClick = (evt) => {
    evt.preventDefault();
    showPopup(popupMap, popupMapClose);
  }

  buttonMap.addEventListener('click', onbuttonMapClick);
};

// Корзина и закладки

const popupAddToCart = document.querySelector('.popup--cart');
const productsList = document.querySelector('.products__list');
const markerCart = document.querySelector('.header__button-cart');
const counterCart = document.querySelector('.header__button-cart span');
const counterBookmarks = document.querySelector('.header__button-bookmarks span');
const popupAddToCartClose = document.querySelector('.popup--cart .popup-close');
let bookmarkedProducts = [];

const isBookmarked = (productItem) => {
  return bookmarkedProducts.includes(productItem);
};

const onProductButtonsClick = (evt) => {
  const productItem = evt.target.closest('.product');
  const productButtonBuy = evt.target.closest('.product__button--buy');
  const productButtonBookmark = evt.target.closest('.product__button--bookmark');

  if (productButtonBuy) {
    evt.preventDefault();
    showPopup(popupAddToCart, popupAddToCartClose);
    if (isStorageSupport) {
      let boughtCount = +localStorage.getItem('boughtProductsCount');
      localStorage.setItem('boughtProductsCount', ++boughtCount);
      counterCart.textContent = boughtCount;
    } else {
      counterCart.textContent ++;
    }
    markerCart.classList.add('header__button--red');
    return;
  }

  if (productButtonBookmark) {
    evt.preventDefault();
    if (isBookmarked(productItem)) {
      return;
    }
    bookmarkedProducts.push(productItem);
    if (isStorageSupport) {
      let bookmarkedCount = +localStorage.getItem('bookmarkedProductsCount');
      localStorage.setItem('bookmarkedProductsCount', ++bookmarkedCount);
      counterBookmarks.textContent = bookmarkedCount;
    } else {
      counterBookmarks.textContent++;
    }
    return;
  }
};

if (popupAddToCart && markerCart) {
  productsList.addEventListener('click', onProductButtonsClick);

  if (isStorageSupport) {
    const boughtCount = +localStorage.getItem('boughtProductsCount');
    const bookmarkedCount = +localStorage.getItem('bookmarkedProductsCount');
    if (bookmarkedCount) {
      counterBookmarks.textContent = bookmarkedCount;
    }
    if (boughtCount) {
      counterCart.textContent = boughtCount;
      markerCart.classList.add('header__button--red');
    }
  }
}

// Логин

if (document.querySelector('.login-panel')) {
  var buttonUserEnter = document.querySelector('.login-panel__enter');
  var buttonUserReg = document.querySelector('.login-panel__registration');
  var buttonUserName = document.querySelector('.login-panel__user-name');
  var buttonUserExit = document.querySelector('.login-panel__user-logout');
  var buttonUserOrders = document.querySelector('.login-panel__user-orders');
  var buttonUserProfile = document.querySelector('.login-panel__user-profile');

  buttonUserEnter.addEventListener('click', function (evt) {
    evt.preventDefault();
    buttonUserEnter.classList.add('login-panel__item--hidden');
    buttonUserReg.classList.add('login-panel__item--hidden');
    buttonUserName.classList.remove('login-panel__item--hidden');
    buttonUserExit.classList.remove('login-panel__item--hidden');
    buttonUserOrders.classList.remove('login-panel__item--hidden');
    buttonUserProfile.classList.remove('login-panel__item--hidden');
  });
  buttonUserExit.addEventListener('click', function (evt) {
    evt.preventDefault();
    buttonUserEnter.classList.remove('login-panel__item--hidden');
    buttonUserReg.classList.remove('login-panel__item--hidden');
    buttonUserName.classList.add('login-panel__item--hidden');
    buttonUserExit.classList.add('login-panel__item--hidden');
    buttonUserOrders.classList.add('login-panel__item--hidden');
    buttonUserProfile.classList.add('login-panel__item--hidden');
  });

}

// Слайдер сервисов

var sliderService = document.querySelector('.serv-slider');
if (sliderService) {
  var buttonServDelivery = sliderService.querySelector('[name=serv-slider__button--delivery]');
  var buttonServGuarantee = sliderService.querySelector('[name=serv-slider__button--guarantee]');
  var buttonServCredit = sliderService.querySelector('[name=serv-slider__button--credit]');
  var slideServDelivery = sliderService.querySelector('.service-slide--delivery');
  var slideServGuarantee = sliderService.querySelector('.service-slide--guarantee');
  var slideServCredit = sliderService.querySelector('.service-slide--credit');

  buttonServDelivery.addEventListener('click', function (evt) {
    evt.preventDefault();
    buttonServDelivery.classList.add('serv-slider__button--active');
    slideServDelivery.classList.add('service-slide--active');
    buttonServGuarantee.classList.remove('serv-slider__button--active');
    slideServGuarantee.classList.remove('service-slide--active');
    buttonServCredit.classList.remove('serv-slider__button--active');
    slideServCredit.classList.remove('service-slide--active');
    document.activeElement.blur()
  });

  buttonServGuarantee.addEventListener('click', function (evt) {
    evt.preventDefault();
    buttonServGuarantee.classList.add('serv-slider__button--active');
    slideServGuarantee.classList.add('service-slide--active');
    buttonServDelivery.classList.remove('serv-slider__button--active');
    slideServDelivery.classList.remove('service-slide--active');
    buttonServCredit.classList.remove('serv-slider__button--active');
    slideServCredit.classList.remove('service-slide--active');
    document.activeElement.blur()
  });

  buttonServCredit.addEventListener('click', function (evt) {
    evt.preventDefault();
    buttonServCredit.classList.add('serv-slider__button--active');
    slideServCredit.classList.add('service-slide--active');
    buttonServDelivery.classList.remove('serv-slider__button--active');
    slideServDelivery.classList.remove('service-slide--active');
    buttonServGuarantee.classList.remove('serv-slider__button--active');
    slideServGuarantee.classList.remove('service-slide--active');
    document.activeElement.blur()
  });
}


// Промо-слайдер

var slider = document.querySelector('.pr-slider');
if (slider) {
  var slides = slider.querySelectorAll('.pr-slide');
  var marker = slider.querySelectorAll('.pr-slider__markers-item');
  var next = slider.querySelector('.pr-slider__button--next');
  var previous = slider.querySelector('.pr-slider__button--previous');
  var currentSlideIndex = 1;

  next.addEventListener('click', function (evt) {
    evt.preventDefault();
    nextSlide();
  });

  previous.addEventListener('click', function (evt) {
    evt.preventDefault();
    previousSlide();
  });

  for (var index = 0; index < marker.length; index++) {
    marker[index].addEventListener('click', clickHandler.bind(null, index));
  }

  function clickHandler(index, evt) {
    evt.preventDefault();
    var isCurrent = evt.target.classList.contains('pr-slider__markers-item--current');
    if (isCurrent) {
      return false;
    }

    var currentMarker = slider.querySelector('.pr-slider__markers-item--current');
    currentMarker.classList.remove('pr-slider__markers-item--current');
    evt.target.classList.add('pr-slider__markers-item--current');
    getSlide(index);
  }

  function getSlide(slideIndex) {
    try {
      slider.querySelector('.pr-slide--show').classList.remove('pr-slide--show');
      slides[slideIndex].classList.add('pr-slide--show');

      slider.querySelector('.pr-slider__markers-item--current').classList.remove('pr-slider__markers-item--current');
      marker[slideIndex].classList.add('pr-slider__markers-item--current');
      currentSlideIndex = slideIndex;
    }
    catch (e) {
      console.log(e);
    }
  }

  function nextSlide() {
    if (currentSlideIndex < slides.length - 1) {
      currentSlideIndex++;
    }
    else {
      currentSlideIndex = 0;
    }

    getSlide(currentSlideIndex);
  }

  function previous_slide() {
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
    }
    else {
      currentSlideIndex = slides.length - 1;
    }

    get_slide(currentSlideIndex);
  }
}
