var header = (function() {

  var previousPosition = window.pageYOffset;
  var targetUp = null;
  var targetDown = null;

  function scroll() {
    var body = helper.e("body");
    var header = helper.e(".js-header");
    var nav = helper.e(".js-nav");
    var currentPosition = window.pageYOffset;
    if (previousPosition > currentPosition) {
      targetDown = null;
      if (targetUp == null) {
        if (body.dataset.headerPinned == "true") {
          targetUp = window.pageYOffset - 29;
        };
      } else if (currentPosition == targetUp || currentPosition <= targetUp || currentPosition <= 0) {
        // console.log("unpin");
        helper.removeClass(body, "is-header-pinned");
        helper.removeClass(header, "is-pinned");
        if (document.documentElement.clientWidth < 900) {
          helper.removeClass(nav, "is-pinned");
        };
        body.dataset.headerPinned = false;
        targetUp = null;
        targetDown = null;
      };
    } else {
      targetUp = null;
      if (targetDown == null) {
        if (body.dataset.headerPinned == "false" || !body.dataset.headerPinned) {
          targetDown = window.pageYOffset + 99;
        };
      } else if (currentPosition == targetDown || currentPosition >= targetDown) {
        // console.log("pin");
        helper.addClass(body, "is-header-pinned");
        helper.addClass(header, "is-pinned");
        if (document.documentElement.clientWidth < 900) {
          helper.addClass(nav, "is-pinned");
        };
        body.dataset.headerPinned = true;
        targetDown = null;
      };
    };
    previousPosition = currentPosition;
    // console.log("previous", previousPosition, "targetDown", targetDown, "targetUp", targetUp);
  };

  function unpin() {
    var body = helper.e("body");
    var header = helper.e(".js-header");
    var nav = helper.e(".js-nav");
    if (body.dataset.headerPinned == "true") {
      helper.removeClass(body, "is-header-pinned");
      helper.removeClass(header, "is-pinned");
      if (document.documentElement.clientWidth < 900) {
        helper.removeClass(nav, "is-pinned");
      };
      body.dataset.headerPinned = false;
    };
  };

  function pin() {
    var body = helper.e("body");
    var header = helper.e(".js-header");
    var nav = helper.e(".js-nav");
    if (body.dataset.headerPinned == "false" || !body.dataset.headerPinned) {
      helper.addClass(body, "is-header-pinned");
      helper.addClass(header, "is-pinned");
      if (document.documentElement.clientWidth < 900) {
        helper.addClass(nav, "is-pinned");
      };
      body.dataset.headerPinned = true;
    };
  };

  // exposed methods
  return {
    pin: pin,
    unpin: unpin,
    scroll: scroll
  };

})();
