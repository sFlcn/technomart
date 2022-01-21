'use strict';

// проверка localStorage

let isStorageSupport = true;
try {
  localStorage.setItem('tst', 'tst');
  localStorage.removeItem('tst');
} catch (err) {
  isStorageSupport = false;
};

// полифил для Element.closest()

function isMatches(element, css) {
  if (!Element.prototype.matches) {
	  return element.msMatchesSelector(css);
  }
  return element.matches(css);
}

function getClosest(element, css) {
  if (Element.prototype.closest) {
    return element.closest(css)
  } else {
	let closestElement = element;

    while (closestElement) {
      if (isMatches(closestElement, css)) {
        return closestElement;
      } else {
        closestElement = closestElement.parentElement;
      }
    }
    return null;
  }
}

// Pop-up

function showPopup(popupElement, popupCloseButton, popupShowCssClass) {
  popupShowCssClass = popupShowCssClass || 'popup--show';

  function closePopup() {
    popupCloseButton.removeEventListener('click', closeButtonHandler);
    document.removeEventListener('keydown', escKeydownHandler);
    popupElement.classList.remove(popupShowCssClass);
  };

  function escKeydownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closePopup();
    }
  };

  function closeButtonHandler(evt) {
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

  function onWriteUsClick(evt) {
    evt.preventDefault();
    showPopup(popupWriteUs, popupWriteUsClose);
    if (isStorageSupport) {
      popupWriteUsNameField.value = localStorage.getItem('popupWriteUsNameField');
      popupWriteUsEmailField.focus();
    } else {
      popupWriteUsNameField.focus();
    }
  };

  function flashWriteUsInput(element, cssClas) {
    cssClas = cssClas || 'popup--write-us-required';

    element.classList.remove(cssClas);
    element.focus();
    element.classList.add(cssClas);
  };

  function onWriteUsFormSubmit(evt) {
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

  function onbuttonMapClick(evt) {
    evt.preventDefault();
    showPopup(popupMap, popupMapClose);
  }

  buttonMap.addEventListener('click', onbuttonMapClick);
};

// Корзина и закладки

const popupAddToCart = document.querySelector('.popup--cart');
const popupAddToCartClose = document.querySelector('.popup--cart .popup-close');
const productsList = document.querySelector('.products__list');
const markerCart = document.querySelector('.header__button-cart');
const counterCart = document.querySelector('.header__button-cart span');
const counterBookmarks = document.querySelector('.header__button-bookmarks span');

if (popupAddToCart && markerCart) {
  let bookmarkedProducts = [];

  function isBookmarked(productItem) {
    for (let i = 0; i < bookmarkedProducts.length; i++) {
      if (bookmarkedProducts[i] === productItem) {
        return true;
      }
    }
    return false;
  };

  function onProductButtonsClick(evt) {
    const productItem = getClosest(evt.target, '.product');
    const productButtonBuy = getClosest(evt.target, '.product__button--buy');
    const productButtonBookmark = getClosest(evt.target, '.product__button--bookmark');

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

  productsList.addEventListener('click', onProductButtonsClick);
}

// Логин

const loginPanelEnter = document.querySelector('.login-panel__enter-link');
const loginPanelExit = document.querySelector('.login-panel__user-logout a');

if (loginPanelEnter && loginPanelExit) {
  const loginButtonsLists = document.querySelectorAll('.login-panel__list');

  function onLoginPanelClick(evt) {
    evt.preventDefault();
    for (let i = 0; i < loginButtonsLists.length; i++) {
      loginButtonsLists[i].classList.toggle('login-panel__list--hidden');
    }
  }

  loginPanelEnter.addEventListener('click', onLoginPanelClick);
  loginPanelExit.addEventListener('click', onLoginPanelClick);
}

// Слайдер сервисов

const sliderService = document.querySelector('.serv-slider');

if (sliderService) {
  const serviceButtons = sliderService.querySelectorAll('.serv-slider__button');
  const servicesSlides = sliderService.querySelectorAll('.service-slide');

  function onServiceButtonCLick(evt) {
    evt.preventDefault();
    const selectedServise = evt.target.dataset.type;
    let selectedServiseSlide;
    let selectedServiseButton;

    for (let i = 0; i < serviceButtons.length; i++) {
      serviceButtons[i].classList.remove('serv-slider__button--active')
      servicesSlides[i].classList.remove('service-slide--active')

      if (servicesSlides[i].dataset.type === selectedServise) {
        selectedServiseSlide = servicesSlides[i];
      }

      if (serviceButtons[i].dataset.type === selectedServise) {
        selectedServiseButton = serviceButtons[i];
      }
    }

    selectedServiseSlide.classList.add('service-slide--active');
    selectedServiseButton.classList.add('serv-slider__button--active');
    document.activeElement.blur();
  }

  for (let i = 0; i < serviceButtons.length; i++) {
    serviceButtons[i].addEventListener('click', onServiceButtonCLick);
  }

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

  function updateMarkers(currentSlideIndex) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].classList.remove('pr-slider__markers-item--current');
    }
    markers[currentSlideIndex].classList.add('pr-slider__markers-item--current');
  }

  function onMarkerClick(evt) {
    const marker = getClosest(evt.target, '.pr-slider__markers-item');
    if (!marker || marker.classList.contains('pr-slider__markers-item--current')) {
      return;
    }

    evt.preventDefault();
    currentSlideIndex = +marker.dataset['markern'];
    updateMarkers(currentSlideIndex);
    showSlide(currentSlideIndex);
  }

  function onNextClick(evt) {
    evt.preventDefault();
    if (currentSlideIndex >= slides.length - 1) {
      currentSlideIndex = 0;
    } else {
      currentSlideIndex++;
    }
    updateMarkers(currentSlideIndex);
    showSlide(currentSlideIndex);
  }

  function onPrevClick(evt) {
    evt.preventDefault();
    if (currentSlideIndex <= 0) {
      currentSlideIndex = slides.length - 1;
    } else {
      currentSlideIndex--;
    }
    updateMarkers(currentSlideIndex);
    showSlide(currentSlideIndex);
  }

  function showSlide(currentSlideIndex) {
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove('pr-slide--show');
    }
    slides[currentSlideIndex].classList.add('pr-slide--show');
  }

  next.addEventListener('click', onNextClick);
  previous.addEventListener('click', onPrevClick);
  markersList.addEventListener('click', onMarkerClick);
}
