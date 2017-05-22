var card = (function() {

  function bind() {
    _bind_linkSelf();
    _bind_linkToggle();
  };

  function _bind_linkSelf() {
    var all_cardLinkSelf = helper.eA(".js-card-link-self");
    for (var i = 0; i < all_cardLinkSelf.length; i++) {
      all_cardLinkSelf[i].addEventListener("click", function(event) {
        event.stopPropagation();
        event.preventDefault();
        _linkSelf(this);
      }, false);
    };
  };

  function _bind_linkToggle() {
    var all_cardLinkToggle = helper.eA(".js-card-link-toggle");
    for (var i = 0; i < all_cardLinkToggle.length; i++) {
      all_cardLinkToggle[i].addEventListener("click", function(event) {
        event.stopPropagation();
        event.preventDefault();
        _linkToggle(this);
      }, false);
    };
  };

  function _linkSelf(element) {
    var id = "#" + helper.getClosest(element, ".js-section").id;
    var all_section = helper.eA(".js-section");
    var quickNav = helper.e(".js-quick-nav");
    var offset;
    // if nav is on the left after 900px wide viewport
    if (document.documentElement.clientWidth >= 900) {
      offset = parseInt(getComputedStyle(all_section[1]).marginTop, 10) - 10;
    } else {
      offset = parseInt(getComputedStyle(all_section[1]).marginTop, 10) + parseInt(getComputedStyle(quickNav).height, 10) - 10;
    };
    var options = {
      speed: 500,
      offset: offset
    };
    smoothScroll.animateScroll(null, id, options);
  };

  function _linkToggle(element) {
    display.toggle();
    _linkSelf(element);
    var all_cardLinkToggle = helper.eA(".js-card-link-toggle");
    for (var i = 0; i < all_cardLinkToggle.length; i++) {
      var icon = all_cardLinkToggle[i].querySelector(".js-card-link-toggle-icon");
      helper.toggleClass(icon, "icon-reader-mode");
      helper.toggleClass(icon, "icon-edit");
    };
  };

  // exposed methods
  return {
    bind: bind
  };

})();
