var tabs = (function() {

  function bind() {
    var all_tabGroups = helper.eA(".js-tab-group");
    for (var i = 0; i < all_tabGroups.length; i++) {
      var all_tabItem = all_tabGroups[i].querySelectorAll(".js-tab-item");
      for (var j = 0; j < all_tabItem.length; j++) {
        all_tabItem[j].addEventListener("click", function() {
          _switchTab(this);
        }, false);
      };
    };
  };

  function _switchTab(tab) {
    var tabTarget = helper.e("." + tab.dataset.tabTarget);
    var tabGroup = helper.getClosest(tab, ".js-tab-group");
    var all_tabItem = tabGroup.querySelectorAll(".js-tab-item");
    for (var i = 0; i < all_tabItem.length; i++) {
      helper.removeClass(all_tabItem[i], "is-active");
      helper.addClass(helper.e("." + all_tabItem[i].dataset.tabTarget), "is-hidden");
    };
    helper.addClass(tab, "is-active");
    helper.removeClass(tabTarget, "is-hidden");
  };

  // exposed methods
  return {
    bind: bind
  };

})();
