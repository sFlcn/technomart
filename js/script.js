var popupWriteUs = document.querySelector(".popup--write-us");
var writeUsCall = document.querySelector(".contacts__link");
var writeUsClose = document.querySelector(".popup--write-us .popup-close");
var popupMap = document.querySelector(".popup--map");
var mapCall = document.querySelector(".contacts__map");
var mapClose = document.querySelector(".popup--map .popup-close");

writeUsCall.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupWriteUs.removeAttribute("hidden");
});

writeUsClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupWriteUs.setAttribute("hidden","");
});



mapCall.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupMap.removeAttribute("hidden");
});

mapClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupMap.setAttribute("hidden","");
});
