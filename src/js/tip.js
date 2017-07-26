var tip = (function() {

  function bind(tip) {
    if (tip) {
      _bind_tip(tip);
    } else {
      var all_tip = helper.eA(".js-tip");
      for (var i = 0; i < all_tip.length; i++) {
        if (all_tip[i].dataset.clone != "true") {
          if (all_tip[i].dataset.clone != "true") {
            _bind_tip(all_tip[i]);
          };
        };
      };
    };
  };

  function _bind_tip(tip) {
    tip.addEventListener("focus", function() {
      render(tip);
    }, false);
    tip.addEventListener("blur", function() {
      destroy();
    }, false);
  };

  function destroy() {
    var all_tipBox = helper.eA(".js-tip-box");
    for (var i = 0; i < all_tipBox.length; i++) {
      all_tipBox[i].destroy();
    };
  };

  function render(tip) {
    // console.log(tip.getBoundingClientRect());
    var body = helper.e("body");
    var tipWrapper = document.createElement("div");
    tipWrapper.setAttribute("class", "m-tip js-tip-box is-transparent");
    var tipArrow = document.createElement("span");
    tipArrow.setAttribute("class", "m-tip-arrow");
    tipWrapper.setAttribute("class", "m-tip js-tip-box is-transparent");
    var tipMessage = document.createElement("p");
    tipMessage.setAttribute("class", "m-tip-message");
    tipMessage.textContent = tip.dataset.tip;
    tipWrapper.destroy = function() {
      helper.removeClass(tipWrapper, "is-opaque");
      helper.addClass(tipWrapper, "is-transparent");
    };
    tipWrapper.addEventListener("transitionend", function(event, elapsed) {
      if (event.propertyName === "opacity" && getComputedStyle(this).opacity == 0) {
        this.parentElement.removeChild(this);
      };
    }.bind(tipWrapper), false);

    tipWrapper.appendChild(tipMessage);
    tipWrapper.appendChild(tipArrow);
    body.appendChild(tipWrapper);
    tipWrapper.setAttribute("style", "width: " + parseInt(tipWrapper.getBoundingClientRect().width + 2, 10) + "px;");

    var width = parseInt(tipWrapper.getBoundingClientRect().width + 2);
    var top =
      parseInt(tip.getBoundingClientRect().top, 10) +
      parseInt(pageYOffset, 10) -
      parseInt(tipWrapper.getBoundingClientRect().height, 10) -
      parseInt(getComputedStyle(tipWrapper).marginTop, 10) -
      parseInt(getComputedStyle(tipWrapper).marginBottom, 10);
    var left =
      parseInt(tip.getBoundingClientRect().left, 10) +
      parseInt((tip.getBoundingClientRect().width / 2), 10) -
      parseInt(((width + parseInt(getComputedStyle(tipWrapper).marginLeft, 10) + parseInt(getComputedStyle(tipWrapper).marginRight, 10) + 2) / 2), 10);

    tipWrapper.setAttribute("style", "width: " + width + "px; top: " + top + "px; left: " + left + "px");

    if (!helper.inViewport(tipWrapper)) {
      // console.log(!helper.inViewport(tipWrapper), "outside viewport");

      if (tipWrapper.getBoundingClientRect().left < 10) {
        // console.log("too far left");
        var style = {
          top: tipWrapper.style.top,
          width: tipWrapper.style.width
        };
        tipWrapper.setAttribute("style", "width: " + style.width + "; top: " + style.top + "; left: " + 0 + "px;");
        tipArrow.setAttribute("style", "left: " +
          (
            parseInt(tip.getBoundingClientRect().left, 10) +
            parseInt((tip.getBoundingClientRect().width / 2), 10) -
            parseInt(getComputedStyle(tipWrapper).marginLeft, 10)
          ) +
          "px;");
      } else if (tipWrapper.getBoundingClientRect().right > document.documentElement.clientWidth) {
        // console.log("too far right");
        var style = {
          top: tipWrapper.style.top,
          width: tipWrapper.style.width
        };
        tipWrapper.setAttribute("style", "width: " + style.width + "; top: " + style.top + "; left: " +
          (
            document.documentElement.clientWidth - parseInt((parseInt(tipWrapper.getBoundingClientRect().width, 10) + parseInt(getComputedStyle(tipWrapper).marginLeft, 10) + parseInt(getComputedStyle(tipWrapper).marginRight, 10)), 10)
          ) +
          "px;");
        tipArrow.setAttribute("style", "left: " +
          (-parseInt(tipWrapper.getBoundingClientRect().left, 10) +
            parseInt(tip.getBoundingClientRect().left, 10) +
            (parseInt((tip.getBoundingClientRect().width), 10) / 2)
          ) +
          "px;");
      };
    };

    getComputedStyle(tipWrapper).opacity;
    helper.removeClass(tipWrapper, "is-transparent");
    helper.addClass(tipWrapper, "is-opaque");
  };

  // exposed methods
  return {
    bind: bind
  };

})();
