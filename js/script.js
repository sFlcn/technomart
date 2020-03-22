// Обратная связь

var popupWriteUs = document.querySelector(".popup--write-us");
if (popupWriteUs) {
  var buttonWriteUs = document.querySelector(".contacts__link");
  var popupWriteUsClose = popupWriteUs.querySelector(".popup-close");
  buttonWriteUs.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupWriteUs.removeAttribute("hidden");
  });
  popupWriteUsClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupWriteUs.setAttribute("hidden","");
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
  });

  popupMapClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupMap.setAttribute("hidden","");
  });
}

// Корзина

var popupAddToCart = document.querySelector(".popup--cart");
if (popupAddToCart) {
  var buttonsAddToCart = document.querySelectorAll(".product__button--buy");
  var popupAddToCartClose = popupAddToCart.querySelector(".popup-close");
  var popupAddToCartContinue = popupAddToCart.querySelector(".cart-continue");
  for (var i = 0; i < buttonsAddToCart.length; i++) {
    buttonsAddToCart[i].addEventListener("click", function (evt) {
      evt.preventDefault();
      popupAddToCart.removeAttribute("hidden");
    });
  }
  popupAddToCartClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupAddToCart.setAttribute("hidden","");
  });

  popupAddToCartContinue.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupAddToCart.setAttribute("hidden","");
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
