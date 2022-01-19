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

const loginPanel = document.querySelector('.login-panel');

const onLoginPanelClick = (evt) => {
  const loginButtonsLists = loginPanel.querySelectorAll('.login-panel__list');
  const loginButton = evt.target.closest('.login-panel__enter a');
  const logoutButton = evt.target.closest('.login-panel__user-logout a');

  if (loginButton || logoutButton) {
    evt.preventDefault();
    loginButtonsLists.forEach((element) => element.classList.toggle('login-panel__list--hidden'));
  }
}

if (loginPanel) {
  loginPanel.addEventListener('click', onLoginPanelClick);
}

// Слайдер сервисов

const sliderService = document.querySelector('.serv-slider');

const onServicesClick = (evt) => {
  const serviceSelectButtons = sliderService.querySelectorAll('.serv-slider__button');
  const servicesSlides = sliderService.querySelectorAll('.service-slide');
  const pressedServiseButton = evt.target.closest('.serv-slider__button');

  if (!pressedServiseButton) {
    return;
  }

  const selectedServise = pressedServiseButton.dataset.type;

  serviceSelectButtons.forEach((element) => element.classList.remove('serv-slider__button--active'));
  servicesSlides.forEach((element) => element.classList.remove('service-slide--active'));
  pressedServiseButton.classList.add('serv-slider__button--active');

  servicesSlides.forEach((element) => {
    if (element.dataset.type === selectedServise) {
      element.classList.add('service-slide--active');
    }
  });

  document.activeElement.blur();
}

if (sliderService) {
  sliderService.addEventListener('click', onServicesClick);
}

// Промо-слайдер

const slider = document.querySelector('.pr-slider');

if (slider) {
  const slides = slider.querySelectorAll('.pr-slide');
  const markersList = slider.querySelector('.pr-slider__markers-list');
  const markers = markersList.querySelectorAll('.pr-slider__markers-item');
  const next = slider.querySelector('.pr-slider__button--next');
  const previous = slider.querySelector('.pr-slider__button--previous');
  let currentSlideIndex = 1;

  const updateMarkers = (currentSlideIndex) => {
    markers.forEach(element => {
      element.classList.remove('pr-slider__markers-item--current');
    });
    markers[currentSlideIndex].classList.add('pr-slider__markers-item--current');
  }

  const onMarkerClick = (evt) => {
    const marker = evt.target.closest('.pr-slider__markers-item');
    if (!marker || marker.classList.contains('pr-slider__markers-item--current')) {
      return;
    }

    evt.preventDefault();
    currentSlideIndex = +marker.dataset['markern'];
    updateMarkers(currentSlideIndex);
    showSlide(currentSlideIndex);
  }

  const onNextClick = (evt) => {
    evt.preventDefault();
    if (currentSlideIndex >= slides.length - 1) {
      currentSlideIndex = 0;
    } else {
      currentSlideIndex++;
    }
    updateMarkers(currentSlideIndex);
    showSlide(currentSlideIndex);
  }

  const onPrevClick = (evt) => {
    evt.preventDefault();
    if (currentSlideIndex <= 0) {
      currentSlideIndex = slides.length - 1;
    } else {
      currentSlideIndex--;
    }
    updateMarkers(currentSlideIndex);
    showSlide(currentSlideIndex);
  }

  const showSlide = (currentSlideIndex) => {
    slides.forEach(element => {
      element.classList.remove('pr-slide--show');
    });
    slides[currentSlideIndex].classList.add('pr-slide--show');
  }

  next.addEventListener('click', onNextClick);
  previous.addEventListener('click', onPrevClick);
  markersList.addEventListener('click', onMarkerClick);
}
