var log = (function() {

  var previousLog = null;

  function bind() {
    window.addEventListener("keydown", function(event) {
      if (event.keyCode == 27) {
        destroy();
      };
    }, false);
  };

  function destroy() {
    var log = helper.e(".js-log");
    var logWrapper = helper.e(".js-log-wrapper");
    if (log) {
      getComputedStyle(log).opacity;
      helper.removeClass(logWrapper, "is-unrotate-in");
      helper.addClass(logWrapper, "is-dropped-out");
      helper.removeClass(log, "is-opaque");
      helper.addClass(log, "is-transparent");
    };
  };

  function _render_logMessage(heading, logBodyContent, actionText, action) {

    prompt.destroy();
    modal.destroy();
    var body = helper.e("body");

    var logWrapper = document.createElement("div");
    logWrapper.setAttribute("class", "m-log-wrapper js-log-wrapper is-unrotate-out");

    var log = document.createElement("div");
    log.setAttribute("class", "m-log js-log");
    log.destroy = function() {
      helper.removeClass(logWrapper, "is-unrotate-in");
      helper.addClass(logWrapper, "is-dropped-out");
      helper.removeClass(log, "is-opaque");
      helper.addClass(log, "is-transparent");
    };

    var logHeading = document.createElement("h1");
    logHeading.setAttribute("tabindex", "3");
    logHeading.setAttribute("class", "m-log-heading");
    logHeading.textContent = heading;

    var logBody = document.createElement("div");
    logBody.setAttribute("class", "m-log-body u-clearfix");

    var logControls = document.createElement("div");
    logControls.setAttribute("class", "m-log-controls");

    var actionButton = document.createElement("a");
    actionButton.setAttribute("href", "javascript:void(0)");
    actionButton.setAttribute("tabindex", "3");
    actionButton.setAttribute("class", "button button-primary button-block button-large");
    actionButton.textContent = actionText || "Ok";

    logControls.appendChild(actionButton);

    if (heading != false) {
      logBody.appendChild(logHeading);
    };

    if (logBodyContent) {
      if (typeof logBodyContent == "string") {
        var container = document.createElement("div");
        container.setAttribute("class", "container");
        var para = document.createElement("p");
        para.textContent = logBodyContent;
        container.appendChild(para);
        logBody.appendChild(container);
      } else {
        logBody.appendChild(logBodyContent);
      };
    };

    logWrapper.appendChild(logBody);
    logWrapper.appendChild(logControls);
    log.appendChild(logWrapper);

    log.addEventListener("transitionend", function(event, elapsed) {
      if (event.propertyName === "opacity" && getComputedStyle(this).opacity == 0) {
        this.parentElement.removeChild(this);
      };
    }.bind(log), false);

    actionButton.addEventListener("click", function(event) {
      event.stopPropagation();
      event.preventDefault();
      destroy();
    }, false);
    if (action) {
      actionButton.addEventListener("click", function(event) {
        event.stopPropagation();
        event.preventDefault();
        action();
      }, false);
    };

    if (previousLog) {
      previousLog.destroy();
    };

    previousLog = log;

    body.appendChild(log);

    getComputedStyle(log).opacity;
    helper.removeClass(log, "is-transparent");
    helper.addClass(log, "is-opaque");
    helper.removeClass(logWrapper, "is-unrotate-out");
    helper.addClass(logWrapper, "is-unrotate-in");
    logHeading.focus(this);

  };

  function _create_fullChangeLogModal() {
    var container = document.createElement("div");
    container.setAttribute("class", "container");
    var row = document.createElement("div");
    row.setAttribute("class", "row");
    var col = document.createElement("div");
    col.setAttribute("class", "col-xs-12");
    for (var i = 0; i < update.history.length; i++) {
      var version = document.createElement("p");
      var versionNumber = document.createElement("strong");
      versionNumber.textContent = update.history[i].version;
      var list = document.createElement("ul");
      list.setAttribute("class", "m-log-list");
      for (var j = 0; j < update.history[i].list.length; j++) {
        var asterisk = "*";
        var listItem = document.createElement("li");
        listItem.setAttribute("class", "m-log-list-item");
        if (update.history[i].list[j].indexOf(asterisk) != -1) {
          helper.addClass(listItem, "m-log-list-item-alert");
          var listItemIcon = document.createElement("span");
          listItemIcon.setAttribute("class", "m-log-list-item-alert-icon icon-error-outline");
          listItem.textContent = update.history[i].list[j].substr(1);
          listItem.appendChild(listItemIcon);
        } else {
          listItem.textContent = update.history[i].list[j];
        };
        list.appendChild(listItem);
      };
      version.appendChild(versionNumber);
      col.appendChild(version);
      col.appendChild(list);
    };
    row.appendChild(col);
    container.appendChild(row);
    return container;
  };

  function _create_fullChangeLog() {
    modal.render("Change Log", _create_fullChangeLogModal(), "Close");
  };

  function render() {
    if (helper.read("latestVersionUpdate") != update.history[0].version) {
      var container = document.createElement("div");
      container.setAttribute("class", "container");
      var row = document.createElement("div");
      row.setAttribute("class", "row");
      var col = document.createElement("div");
      col.setAttribute("class", "col-xs-12");
      var list = document.createElement("ul");
      list.setAttribute("class", "m-log-list m-log-list-short u-list-unstyled");
      for (var i = 0; i < update.history[0].list.length; i++) {
        var asterisk = "*";
        var listItem = document.createElement("li");
        listItem.setAttribute("class", "m-log-list-item");
        if (update.history[0].list[i].indexOf(asterisk) != -1) {
          helper.addClass(listItem, "m-log-list-item-alert");
          var listItemIcon = document.createElement("span");
          listItemIcon.setAttribute("class", "m-log-list-item-alert-icon icon-error-outline");
          listItem.textContent = update.history[0].list[i].substr(1);
          listItem.appendChild(listItemIcon);
        } else {
          listItem.textContent = update.history[0].list[i];
        };
        list.appendChild(listItem);
      };
      var seeAll = document.createElement("button");
      seeAll.setAttribute("class", "button button-medium button-tertiary-link u-no-margin");
      seeAll.textContent = "See complete Change Log"
      seeAll.addEventListener("click", function(event) {
        _create_fullChangeLog();
        destroy();
      }, false);
      col.appendChild(list);
      col.appendChild(seeAll);
      row.appendChild(col);
      container.appendChild(row);
      var heading = "Change Log";
      _render_logMessage(heading, container, "Don't show this again", _store_confirmation);
    };
  };

  function _store_confirmation() {
    helper.remove("latestVersionUpdate");
    helper.store("latestVersionUpdate", update.history[0].version);
  };

  // exposed methods
  return {
    changeLog: _create_fullChangeLog,
    render: render,
    bind: bind
  };

})();
