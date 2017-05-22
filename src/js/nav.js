var nav = (function() {

  var previousNavShade = null;

  function _destroy_navShade() {
    var navShade = helper.e(".js-nav-shade");
    if (navShade) {
      getComputedStyle(navShade).opacity;
      helper.removeClass(navShade, "is-opaque");
      helper.addClass(navShade, "is-transparent");
    };
  };

  function _render_navShade() {

    var nav = helper.e(".js-nav");
    var body = helper.e("body");

    var navShade = document.createElement("div");
    navShade.setAttribute("class", "m-nav-shade js-nav-shade");
    navShade.destroy = function() {
      helper.removeClass(navShade, "is-opaque");
      helper.addClass(navShade, "is-transparent");
    };

    navShade.addEventListener("transitionend", function(event, elapsed) {
      if (event.propertyName === "opacity" && getComputedStyle(this).opacity == 0) {
        this.parentElement.removeChild(this);
      };
    }.bind(navShade), false);

    navShade.addEventListener("click", function() {
      navClose();
      _destroy_navShade();
    }, false);

    if (previousNavShade) {
      previousNavShade.destroy();
    };

    previousNavShade = navShade;

    body.insertBefore(navShade, nav);

    getComputedStyle(navShade).opacity;

    helper.removeClass(navShade, "is-transparent");
    helper.addClass(navShade, "is-opaque");

  };

  function _closeNavScrollToTop() {
    if (window.innerWidth < 550) {
      navClose();
      window.scrollTo(0, 0);
    };
  };

  function _bind_characterOption(characterLink) {
    var label = characterLink.querySelector(".js-nav-character-label");
    var input = characterLink.querySelector(".js-nav-character-input");
    input.addEventListener("change", function() {
      _switch_character(label);
      sheet.storeCharacters();
      smoothScroll.animateScroll(null, "#body");
    }, false);
  };

  function _switch_character(characterLink) {
    var newIndex = characterLink.dataset.characterIndex;
    sheet.setIndex(newIndex);
    sheet.clear();
    sheet.render();
    var name = sheet.getCharacter().basics.name;
    if (typeof name == "undefined" || name == "") {
      name = "New character";
    };
    snack.render(helper.truncate(name, 50, true) + " now in the game.", false);
    _closeNavScrollToTop();
  };

  function updateNavCharacters(input) {
    var inputType = input.dataset.characterNav;
    var inputValue = input.value;
    if (inputType == "name") {
      if (typeof inputValue == "undefined" || inputValue == "") {
        inputValue = "New character";
      };
      helper.e(".character-index-" + sheet.getIndex()).querySelector(".js-nav-characters-name").textContent = helper.truncate(inputValue, 30, true);
    } else if (inputType == "class") {
      if (typeof inputValue == "undefined" || inputValue == "") {
        inputValue = "Class";
      };
      helper.e(".character-index-" + sheet.getIndex()).querySelector(".js-nav-characters-class").textContent = helper.truncate(inputValue, 20, true) + " ";
    } else if (inputType == "level") {
      if (typeof inputValue == "undefined" || inputValue == "") {
        inputValue = "Level";
      };
      helper.e(".character-index-" + sheet.getIndex()).querySelector(".js-nav-characters-level").textContent = helper.truncate(inputValue, 10, false);
    };
  };

  function clear() {
    var all_navCharacters = helper.eA(".js-nav-characters");
    for (var i = 0; i < all_navCharacters.length; i++) {
      while (all_navCharacters[i].lastChild) {
        all_navCharacters[i].removeChild(all_navCharacters[i].lastChild);
      };
    };
  };

  function render() {
    _createAllCharacter();
    _render_quickNav();
  };

  function _render_quickNav() {
    var body = helper.e("body");
    window.onscroll = function() {

      var quickNav = helper.e(".js-quick-nav");
      var all_quickNavLinks = helper.eA(".js-quick-nav-link");
      var all_section = helper.eA(".js-section");
      var offset = parseInt(getComputedStyle(quickNav).height, 10);
      // if nav is on the left after 900px wide viewport
      if (document.documentElement.clientWidth >= 900) {
        offset = 0;
      };

      for (var i = 0; i < all_section.length; i++) {
        // console.log(all_section[i].id, "--- top", (all_section[i].getBoundingClientRect().top - parseInt(getComputedStyle(document.querySelector(".js-edit")).marginTop, 10)), "bottom", all_section[i].getBoundingClientRect().bottom);
        if ((all_section[i].getBoundingClientRect().top - parseInt(getComputedStyle(all_section[i]).marginTop, 10)) <= offset && (all_section[i].getBoundingClientRect().bottom + parseInt(getComputedStyle(all_section[i]).marginBottom, 10)) > offset) {
          for (var j = 0; j < all_quickNavLinks.length; j++) {
            helper.removeClass(all_quickNavLinks[j], "is-active");
          };
          helper.addClass(all_quickNavLinks[i], "is-active");
        } else {
          helper.removeClass(all_quickNavLinks[i], "is-active");
        };
      };

    };
  };

  function _createAllCharacter() {
    var characters = sheet.getAllCharacters();
    var navCharacters = helper.e(".js-nav-characters");
    for (var i in characters) {
      var characterAnchor = _createNavCharacterItem(characters[i].basics.name, characters[i].basics.class, characters[i].basics.level, i);
      navCharacters.appendChild(characterAnchor);
    };
    var all_navCharacterSelect = helper.eA(".js-nav-character-input");
    all_navCharacterSelect[sheet.getIndex()].checked = true;
  };

  function _createNavCharacterItem(characterName, characterClass, characterLevel, characterIndex) {
    if (typeof characterName == "undefined" || characterName == "") {
      characterName = "New character";
    };
    if (typeof characterClass == "undefined" || characterClass == "") {
      characterClass = "Class";
    };
    if (typeof characterLevel == "undefined" || characterLevel == "") {
      characterLevel = "Level";
    };

    // define elements
    var uniqueId = helper.randomId(10);

    var navCharacter = document.createElement("li");
    navCharacter.setAttribute("class", "m-nav-character");

    var input = document.createElement("input");
    input.setAttribute("id", characterName.replace(/\s+/g, "-").toLowerCase() + "-" + uniqueId);
    input.setAttribute("name", "js-nav-all-characters");
    input.setAttribute("class", "js-nav-character-input");
    input.setAttribute("type", "radio");
    input.setAttribute("tabindex", 10);

    var label = document.createElement("label");
    label.setAttribute("for", characterName.replace(/\s+/g, "-").toLowerCase() + "-" + uniqueId);
    label.setAttribute("class", "u-full-width js-nav-character-label character-index-" + characterIndex);
    label.setAttribute("data-character-index", characterIndex);

    var nameSpan = document.createElement("span");
    nameSpan.setAttribute("class", "m-nav-characters-name js-nav-characters-name");
    nameSpan.textContent = helper.truncate(characterName, 30, true);

    var classSpan = document.createElement("span");
    classSpan.setAttribute("class", "m-nav-characters-class js-nav-characters-class");
    classSpan.textContent = helper.truncate(characterClass, 20, true) + " ";

    var levelSpan = document.createElement("span");
    levelSpan.setAttribute("class", "m-nav-characters-level js-nav-characters-level");
    levelSpan.textContent = helper.truncate(characterLevel, 10);

    // build module
    label.appendChild(nameSpan);
    label.appendChild(classSpan);
    label.appendChild(levelSpan);
    navCharacter.appendChild(input);
    navCharacter.appendChild(label);

    // bind
    _bind_characterOption(navCharacter);
    return navCharacter;
  };

  function _checkBodyForOpenNav() {
    var body = helper.e("body");
    var nav = helper.e(".js-is-open");
    if (nav) {
      helper.addClass(body, "is-nav-open");
    } else {
      helper.removeClass(body, "is-nav-open");
    };
  };

  function navClose() {
    helper.removeClass(helper.e(".js-nav"), "is-open");
    helper.removeClass(helper.e(".js-nav"), "js-is-open");
    helper.removeClass(helper.e(".js-hamburger"), "is-open");
    _checkBodyForOpenNav();
    _destroy_navShade();
  };

  function navOpen() {
    helper.addClass(helper.e(".js-nav"), "is-open");
    helper.addClass(helper.e(".js-nav"), "js-is-open");
    helper.addClass(helper.e(".js-hamburger"), "is-open");
    _checkBodyForOpenNav();
    _render_navShade();
  };

  function toggle_nav() {
    var nav = helper.e(".js-nav");
    if (nav.classList.contains("is-open")) {
      helper.removeClass(helper.e(".js-nav"), "is-open");
      helper.removeClass(helper.e(".js-nav"), "js-is-open");
      helper.removeClass(helper.e(".js-hamburger"), "is-open");
      _checkBodyForOpenNav();
      _destroy_navShade();
    } else {
      helper.addClass(helper.e(".js-nav"), "is-open");
      helper.addClass(helper.e(".js-nav"), "js-is-open");
      helper.addClass(helper.e(".js-hamburger"), "is-open");
      _checkBodyForOpenNav();
      _render_navShade();
    };
  };

  // function _toggle_displayEdit(element) {
  //   display.toggle();
  //   var quickNavHeight = parseInt(getComputedStyle(document.querySelector(".js-quick-nav")).height, 10) + 40;
  //   var quickNavWidth = parseInt(getComputedStyle(document.querySelector(".js-quick-nav")).width, 10) + 40;
  //   var quickNavOffset;
  //   if (quickNavHeight < quickNavWidth) {
  //     quickNavOffset = quickNavHeight;
  //   } else {
  //     quickNavOffset = quickNavWidth;
  //   };
  //   var options = {
  //     offset: quickNavOffset
  //   };
  //   var target = "#" + element.dataset.editJump;
  //   smoothScroll.animateScroll(null, target, options);
  // };

  function _quickLinkSmoothScroll(element) {
    var id = element.dataset.link;
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

  function _bind_navLinks() {

    // var nav = helper.e(".js-nav");
    var navToggle = helper.e(".js-nav-toggle");
    var fullscreenModeToggle = helper.e(".js-fullscreen-mode");
    var nightModeToggle = helper.e(".js-night-mode");
    var clearAll = helper.e(".js-clear-all");
    var restoreDemoPcs = helper.e(".js-restore-demo-pcs");
    var characterAdd = helper.e(".js-character-add");
    var characterRemove = helper.e(".js-character-remove");
    var characterImport = helper.e(".js-character-import");
    var characterExport = helper.e(".js-character-export");

    navToggle.addEventListener("click", function(event) {
      event.stopPropagation();
      event.preventDefault();
      toggle_nav();
    }, false);

    fullscreenModeToggle.addEventListener("click", function(event) {
      event.stopPropagation();
      event.preventDefault();
      fullscreen.toggle();
    }, false);

    nightModeToggle.addEventListener("click", function(event) {
      event.stopPropagation();
      event.preventDefault();
      night.toggle();
    }, false);

    clearAll.addEventListener("click", function(event) {
      event.stopPropagation();
      event.preventDefault();
      prompt.render("Clear all characters?", "All characters will be removed. This can not be undone.", "Remove all", sheet.destroy);
      navClose();
    }, false);

    restoreDemoPcs.addEventListener("click", function(event) {
      event.stopPropagation();
      event.preventDefault();
      prompt.render("Restore demo PCs?", "All characters will be removed and the demo characters will be restored. Have you backed up your characters by Exporting?", "Restore", sheet.restore);
      navClose();
    }, false);

    characterImport.addEventListener("click", function(event) {
      event.stopPropagation();
      event.preventDefault();
      sheet.import();
      navClose();
    }, false);

    characterExport.addEventListener("click", function(event) {
      event.stopPropagation();
      event.preventDefault();
      sheet.export();
      navClose();
    }, false);

    characterAdd.addEventListener("click", function(event) {
      event.stopPropagation();
      event.preventDefault();
      sheet.addCharacter();
      snack.render("New character added.", false);
      _closeNavScrollToTop();
    }, false);

    characterRemove.addEventListener("click", function(event) {
      event.stopPropagation();
      event.preventDefault();
      sheet.removeCharacter();
      navClose();
    }, false);

  };

  function _bind_quickNavLinks() {
    var all_quickNavLink = helper.eA(".js-quick-nav-link");
    for (var i = 0; i < all_quickNavLink.length; i++) {
      all_quickNavLink[i].addEventListener("click", function(event) {
        event.stopPropagation();
        event.preventDefault();
        navClose();
        _quickLinkSmoothScroll(this);
      }, false);
    };
  };

  function _bind_shortcutKeys() {

    window.addEventListener("keydown", function(event) {
      // ctrl+alt+delete
      if (event.ctrlKey && event.altKey && event.keyCode == 8) {
        prompt.render("Clear all characters?", "All characters will be removed. This can not be undone.", "Delete all", sheet.destroy);
        navClose();
      };
      // ctrl+alt+i
      if (event.ctrlKey && event.altKey && event.keyCode == 73) {
        sheet.import();
        navClose();
      };
      // ctrl+alt+e
      if (event.ctrlKey && event.altKey && event.keyCode == 69) {
        sheet.export();
        navClose();
      };
      // ctrl+alt+m
      if (event.ctrlKey && event.altKey && event.keyCode == 77) {
        toggle_nav();
        helper.e(".js-nav-title").focus(this);
      };
      // ctrl+alt+d
      if (event.ctrlKey && event.altKey && event.keyCode == 68) {
        display.toggle();
      };
      // ctrl+alt+n
      if (event.ctrlKey && event.altKey && event.keyCode == 78) {
        night.toggle();
      };
      // esc
      if (event.keyCode == 27) {
        navClose();
      };
    }, false);

    // window.addEventListener('click', function(event) {
    //   if (event.target != nav && event.target != navToggle && helper.getClosest(event.target, ".js-nav") != nav && helper.getClosest(event.target, ".js-nav-toggle") != navToggle) {
    //     navClose();
    //   };
    // }, false);

    // key debugging
    // window.addEventListener("keydown", function(event) {
    //   console.log(event.keyCode);
    //   console.log(event.metaKey);
    //   console.log(event);
    // });

  };

  function bind() {
    _bind_navLinks();
    _bind_shortcutKeys();
    _bind_quickNavLinks();
  };

  // exposed methods
  return {
    bind: bind,
    clear: clear,
    render: render,
    update: updateNavCharacters,
    open: navOpen,
    close: navClose,
    toggle: toggle_nav
  }

})();
