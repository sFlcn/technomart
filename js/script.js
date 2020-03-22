// Обратная связь

var popupWriteUs = document.querySelector(".popup--write-us");
if (popupWriteUs) {
  var buttonWriteUs = document.querySelector(".contacts__link");
  var popupWriteUsClose = popupWriteUs.querySelector(".popup-close");
  var formWriteUs = popupWriteUs.querySelector(".popup__form");
  var messageNameWriteUs = popupWriteUs.querySelector("[name=message-name]");
  var messageEmailWriteUs = popupWriteUs.querySelector("[name=message-email]");
  var messageWriteUs = popupWriteUs.querySelector("[name=message]");

  var isStorageSupport = true;
  var storage = "";
    try {
      storage = localStorage.getItem("messageNameWriteUs");
    } catch (err) {
      isStorageSupport = false;
    }

  messageWriteUs.removeAttribute("required");
  messageNameWriteUs.removeAttribute("required");
  messageEmailWriteUs.removeAttribute("required");

  buttonWriteUs.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupWriteUs.removeAttribute("hidden");
    popupWriteUs.classList.add("popup-show");
    if (storage) {
      messageNameWriteUs.value = storage;
      messageEmailWriteUs.focus();
    } else {
      messageNameWriteUs.focus();
    }
  });

  popupWriteUsClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupWriteUs.setAttribute("hidden","");
    popupWriteUs.classList.remove("popup-show");
  });

  formWriteUs.addEventListener("submit", function (evt) {
    if (!messageWriteUs.value || !messageNameWriteUs.value || !messageEmailWriteUs.value) {
      evt.preventDefault();
      messageWriteUs.classList.remove("popup--write-us-required");
      messageNameWriteUs.classList.remove("popup--write-us-required");
      messageEmailWriteUs.classList.remove("popup--write-us-required");
      messageWriteUs.offsetWidth = messageWriteUs.offsetWidth;
      messageWriteUs.focus();
      messageWriteUs.classList.add("popup--write-us-required");
      messageNameWriteUs.classList.add("popup--write-us-required");
      messageEmailWriteUs.classList.add("popup--write-us-required");
    } else {
      if (isStorageSupport) {
        localStorage.setItem("messageNameWriteUs", messageNameWriteUs.value);
      }
    }
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (!(popupWriteUs.hasAttribute("hidden"))) {
        popupWriteUs.setAttribute("hidden","");
        popupWriteUs.classList.remove("popup-show");
      }
    }
  });
}

// Карта

var popupMap = document.querySelector(".popup--map");
if (popupMap) {
  var buttonMap = document.querySelector(".contacts__map");
  var popupMapClose = popupMap.querySelector(".popup-close");

  buttonMap.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupMap.removeAttribute("hidden");
    popupMap.classList.add("popup-show");
  });

  popupMapClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupMap.setAttribute("hidden","");
    popupMap.classList.remove("popup-show");
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (!(popupMap.hasAttribute("hidden"))) {
        popupMap.setAttribute("hidden","");
        popupMap.classList.remove("popup-show");
      }
    }
  });
}

// Корзина

var popupAddToCart = document.querySelector(".popup--cart");
if (popupAddToCart) {
  var buttonsAddToCart = document.querySelectorAll(".product__button--buy");
  var popupAddToCartClose = popupAddToCart.querySelector(".popup-close");
  var popupAddToCartContinue = popupAddToCart.querySelector(".cart-continue");
  var markerCart = document.querySelector(".header__button-cart");
  var counterCart = document.querySelector(".header__button-cart span");
  var buttonsAddBookmark = document.querySelectorAll(".product__button--bookmark");
  var counterBookmarks = document.querySelector(".header__button-bookmarks span");

  for (var i = 0; i < buttonsAddToCart.length; i++) {
    buttonsAddToCart[i].addEventListener("click", function (evt) {
      evt.preventDefault();
      popupAddToCart.removeAttribute("hidden");
      popupAddToCart.classList.add("popup-show");
      markerCart.classList.add("header__button--red");
      counterCart.textContent = 1;
    });
  }

  for (var i = 0; i < buttonsAddBookmark.length; i++) {
    buttonsAddBookmark[i].addEventListener("click", function (evt) {
      evt.preventDefault();
      counterBookmarks.textContent = 1;
    });
  }

  popupAddToCartClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupAddToCart.setAttribute("hidden","");
    popupAddToCart.classList.remove("popup-show");
  });

  popupAddToCartContinue.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupAddToCart.setAttribute("hidden","");
    popupAddToCart.classList.remove("popup-show");
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (!(popupAddToCart.hasAttribute("hidden"))) {
        popupAddToCart.setAttribute("hidden","");
        popupAddToCart.classList.remove("popup-show");
      }
    }
  });
}

// Логин

if (document.querySelector(".login-panel")) {
  var buttonUserEnter = document.querySelector(".login-panel__enter");
  var buttonUserReg = document.querySelector(".login-panel__registration");
  var buttonUserName = document.querySelector(".login-panel__user-name");
  var buttonUserExit = document.querySelector(".login-panel__user-logout");
  var buttonUserOrders = document.querySelector(".login-panel__user-orders");
  var buttonUserProfile = document.querySelector(".login-panel__user-profile");

  buttonUserEnter.addEventListener("click", function (evt) {
    evt.preventDefault();
    buttonUserEnter.classList.add("login-panel__item--hidden");
    buttonUserReg.classList.add("login-panel__item--hidden");
    buttonUserName.classList.remove("login-panel__item--hidden");
    buttonUserExit.classList.remove("login-panel__item--hidden");
    buttonUserOrders.classList.remove("login-panel__item--hidden");
    buttonUserProfile.classList.remove("login-panel__item--hidden");
  });
  buttonUserExit.addEventListener("click", function (evt) {
    evt.preventDefault();
    buttonUserEnter.classList.remove("login-panel__item--hidden");
    buttonUserReg.classList.remove("login-panel__item--hidden");
    buttonUserName.classList.add("login-panel__item--hidden");
    buttonUserExit.classList.add("login-panel__item--hidden");
    buttonUserOrders.classList.add("login-panel__item--hidden");
    buttonUserProfile.classList.add("login-panel__item--hidden");
  });

}

// Слайдер сервисов

var sliderService = document.querySelector(".serv-slider");
if (sliderService) {
  var buttonServDelivery = sliderService.querySelector("[name=serv-slider__button--delivery]");
  var buttonServGuarantee = sliderService.querySelector("[name=serv-slider__button--guarantee]");
  var buttonServCredit = sliderService.querySelector("[name=serv-slider__button--credit]");
  var slideServDelivery = sliderService.querySelector(".service-slide--delivery");
  var slideServGuarantee = sliderService.querySelector(".service-slide--guarantee");
  var slideServCredit = sliderService.querySelector(".service-slide--credit");

  buttonServDelivery.addEventListener("click", function (evt) {
    evt.preventDefault();
    buttonServDelivery.classList.add("serv-slider__button--active");
    slideServDelivery.classList.add("service-slide--active");
    buttonServGuarantee.classList.remove("serv-slider__button--active");
    slideServGuarantee.classList.remove("service-slide--active");
    buttonServCredit.classList.remove("serv-slider__button--active");
    slideServCredit.classList.remove("service-slide--active");
    document.activeElement.blur()
  });

  buttonServGuarantee.addEventListener("click", function (evt) {
    evt.preventDefault();
    buttonServGuarantee.classList.add("serv-slider__button--active");
    slideServGuarantee.classList.add("service-slide--active");
    buttonServDelivery.classList.remove("serv-slider__button--active");
    slideServDelivery.classList.remove("service-slide--active");
    buttonServCredit.classList.remove("serv-slider__button--active");
    slideServCredit.classList.remove("service-slide--active");
    document.activeElement.blur()
  });

  buttonServCredit.addEventListener("click", function (evt) {
    evt.preventDefault();
    buttonServCredit.classList.add("serv-slider__button--active");
    slideServCredit.classList.add("service-slide--active");
    buttonServDelivery.classList.remove("serv-slider__button--active");
    slideServDelivery.classList.remove("service-slide--active");
    buttonServGuarantee.classList.remove("serv-slider__button--active");
    slideServGuarantee.classList.remove("service-slide--active");
    document.activeElement.blur()
  });
}
