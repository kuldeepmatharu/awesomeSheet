(function() {

  if (document.querySelector(".js-quick-nav")) {
    var quickNavHeight = parseInt(getComputedStyle(document.querySelector(".js-quick-nav")).height, 10) + 30;
  };

  smoothScroll.init({
    speed: 500,
    offset: quickNavHeight
  });

})();
