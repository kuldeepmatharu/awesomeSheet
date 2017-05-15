var display = (function() {

  function bind() {
    _bind_fab();
    _bind_quickEdit();
    _bind_quickControl();
  };

  function _bind_fab() {
    var fabButton = helper.e(".js-fab-button");
    fabButton.addEventListener("click", toggle, false);
  };

  function _bind_quickEdit() {
    var displayBlockQuickEdit = helper.eA(".js-display-block-quick-edit");
    for (var i = 0; i < displayBlockQuickEdit.length; i++) {
      displayBlockQuickEdit[i].addEventListener("click", function(event) {
        event.stopPropagation();
        event.preventDefault();
        _toggle_quickEdit(this);
        totalBlock.update();
        if (body.dataset.displayMode == "true") {
          clear();
          render();
        };
      }, false);
    };
  };

  function _bind_quickControl() {
    var displayBlockQuickControlItem = helper.eA(".js-display-block-quick-control-item");
    for (var i = 0; i < displayBlockQuickControlItem.length; i++) {
      displayBlockQuickControlItem[i].addEventListener("click", function(event) {
        event.stopPropagation();
        event.preventDefault();
        _quickConctrolAction(this);
        totalBlock.update();
        clear();
        render();
      }, false);
    };
  };

  function _quickConctrolAction(element) {
    var controlAction = element.dataset.displayControl;
    var path = element.dataset.path;
    var target = helper.e("#" + element.dataset.editTarget);
    var content = parseInt(helper.getObject(sheet.getCharacter(), path), 10) || 0;
    if (controlAction == "addition") {
      content = content + 1;
    };
    if (controlAction == "subtract") {
      content = content - 1;
    };
    if (controlAction == "addition-5") {
      content = content + 5;
    };
    if (controlAction == "subtract-5") {
      content = content - 5;
    };
    if (controlAction == "clear") {
      content = "";
    };
    if (content == "0") {
      target.value = "";
      _store(element, "");
    } else {
      target.value = content;
      _store(element, content);
    };
    inputBlock.update(target);
  };

  function _store(element, value) {
    var path = element.dataset.path;
    helper.setObject(sheet.getCharacter(), path, value);
    sheet.storeCharacters();
  };

  function _toggle_quickEdit(element) {
    var body = helper.e("body");
    var node = helper.e(".js-" + element.dataset.miniView);
    var all_sectionEdit = helper.eA(".js-section-edit");
    helper.toggleClass(node, "is-collapsed");
    helper.toggleClass(node, "is-expanded");
  };

  var scrollTopEdit = 0;
  var scrollTopDisplay = 0;

  function toggle() {
    var body = helper.e("body");
    var fabIcon = helper.e(".js-fab-icon");
    var quickNav = helper.e(".js-quick-nav");
    var hamburger = helper.e(".js-hamburger");
    var all_quickNavLink = helper.eA(".js-quick-nav-link");
    var all_sectionEdit = helper.eA(".js-section-edit");
    var all_sectionDisplay = helper.eA(".js-section-display");

    function _displayOn() {
      // record scroll top var
      scrollTopEdit = window.scrollY;
      helper.addClass(body, "is-display-mode");
      // iterate over all quick nav links and hide
      for (var i = 0; i < all_quickNavLink.length; i++) {
        helper.addClass(all_quickNavLink[i], "is-invisible");
      };
      // iterate over all edit secrions
      for (var i = 0; i < all_sectionEdit.length; i++) {
        // if edit section is basics
        if (all_sectionEdit[i].classList.contains("js-basics")) {
          // remove dark class
          helper.removeClass(all_sectionEdit[i], "l-section-dark");
          // find all input blocks
          var all_inputBlock = all_sectionEdit[i].querySelectorAll(".js-input-block");
          // iterate over all input blocks
          for (var j = 0; j < all_inputBlock.length; j++) {
            // fine label and input for this input block
            var label = all_inputBlock[j].querySelector(".js-input-block-label");
            var input = all_inputBlock[j].querySelector(".js-input-block-field");
            // remove dark class
            helper.removeClass(label, "m-input-block-label-dark");
            helper.removeClass(input, "m-input-block-field-dark");
          };
        };
        // remove any inline styles
        all_sectionEdit[i].removeAttribute("style");
        // collapse section
        helper.addClass(all_sectionEdit[i], "is-collapsed");
        // add edit class to section
        helper.addClass(all_sectionEdit[i], "m-quick-edit");
        // remove any pinned header classes
        helper.removeClass(all_sectionEdit[i], "is-pinned");
        // remove any previously expanded section classes
        helper.removeClass(all_sectionEdit[i], "is-expanded");
        // find all section headings
        var sectionHeading = all_sectionEdit[i].querySelector(".js-section-heading");
        // if section heading found
        if (sectionHeading) {
          // remove any pinned header classes
          helper.removeClass(sectionHeading, "is-pinned");
          helper.removeClass(sectionHeading, "is-faded");
          // find section heading title
          var sectionHeadingTitle = sectionHeading.querySelector(".js-section-title");
          // find section controls
          var sectionHeadingControls = sectionHeading.querySelector(".js-section-controls");
          // if section controls not found
          if (!sectionHeadingControls) {
            // hide section heading
            helper.addClass(sectionHeading, "is-hidden");
          };
          // if section controls found
          if (sectionHeadingControls) {
            // make it full width
            helper.removeClass(sectionHeadingControls.parentNode, "col-xs-10");
            helper.addClass(sectionHeadingControls.parentNode, "col-xs-12");
          };
          // if section heading title found
          if (sectionHeadingTitle) {
            // hide section heading
            helper.addClass(sectionHeadingTitle.parentNode, "is-hidden");
          };
        };
      };
      // iterate over all display sections
      for (var i = 0; i < all_sectionDisplay.length; i++) {
        // make them visable
        helper.removeClass(all_sectionDisplay[i], "is-hidden");
      };
      // change fab icon
      helper.addClass(fabIcon, "icon-edit");
      helper.removeClass(fabIcon, "icon-reader-mode");
      // scroll to
      window.scrollTo(0, scrollTopDisplay);
      // if body is in display state
    };

    function _displayOff() {
      // record scroll top var
      scrollTopDisplay = window.scrollY;
      helper.removeClass(body, "is-display-mode");
      // iterate over quick nav links
      for (var i = 0; i < all_quickNavLink.length; i++) {
        // make visable
        helper.removeClass(all_quickNavLink[i], "is-invisible");
      };
      // iterate over all edit secrions
      for (var i = 0; i < all_sectionEdit.length; i++) {
        // if edit section is basics
        if (all_sectionEdit[i].classList.contains("js-basics")) {
          // remove dark class
          helper.addClass(all_sectionEdit[i], "l-section-dark");
          // find all input blocks
          var all_inputBlock = all_sectionEdit[i].querySelectorAll(".js-input-block");
          // iterate over all input blocks
          for (var j = 0; j < all_inputBlock.length; j++) {
            // fine label and input for this input block
            var label = all_inputBlock[j].querySelector(".js-input-block-label");
            var input = all_inputBlock[j].querySelector(".js-input-block-field");
            // remove dark class
            helper.addClass(label, "m-input-block-label-dark");
            helper.addClass(input, "m-input-block-field-dark");
          };
        };
        // expand section
        helper.removeClass(all_sectionEdit[i], "is-collapsed");
        // remove edit class to section
        helper.removeClass(all_sectionEdit[i], "m-quick-edit");
        // remove any previously expanded section classes
        helper.removeClass(all_sectionEdit[i], "is-expanded");
        // find all section headings
        var sectionHeading = all_sectionEdit[i].querySelector(".js-section-heading");
        // if section heading found
        if (sectionHeading) {
          // find section heading title
          var sectionHeadingTitle = sectionHeading.querySelector(".js-section-title");
          // find section controls
          var sectionHeadingControls = sectionHeading.querySelector(".js-section-controls");
          // section heading controls not found
          if (!sectionHeadingControls) {
            // unhide section heading
            helper.removeClass(sectionHeading, "is-hidden");
          };
          // if section heading controls found
          if (sectionHeadingControls) {
            // make 10 cols
            helper.addClass(sectionHeadingControls.parentNode, "col-xs-10");
            helper.removeClass(sectionHeadingControls.parentNode, "col-xs-12");
          };
          // if section heading title found
          if (sectionHeadingTitle) {
            // iunhide it
            helper.removeClass(sectionHeadingTitle.parentNode, "is-hidden");
          };
        };
      };
      // iterate over all display sections
      for (var i = 0; i < all_sectionDisplay.length; i++) {
        // hide display section
        helper.addClass(all_sectionDisplay[i], "is-hidden");
      };
      // change fab icon
      helper.removeClass(fabIcon, "icon-edit");
      helper.addClass(fabIcon, "icon-reader-mode");
      // scroll to
      window.scrollTo(0, scrollTopEdit);
    };

    if (body.dataset.displayMode == "true") {
      body.dataset.displayMode = "false";
      _displayOff();
    } else if (body.dataset.displayMode == "false" || !body.dataset.displayMode) {
      body.dataset.displayMode = "true";
      _displayOn();
    };

    totalBlock.update();
    clear();
    render();
  };

  function clear___xxxx() {
    var all_displayItem = helper.eA(".js-display-block");
    var displaySpell = helper.e(".js-display-block-spell").querySelector(".js-display-block-target");
    var displaySkills = helper.e(".js-display-block-skills").querySelector(".js-display-block-target");
    var displayAttack = helper.e(".js-display-block-attack").querySelector(".js-display-block-target");
    var displayNote = helper.e(".js-display-block-note").querySelector(".js-display-block-target");
    var displayConsumable = helper.e(".js-display-block-consumable").querySelector(".js-display-block-target");

    function _removeAllChildren(parent) {
      while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
      };
    };

    for (var i = 0; i < all_displayItem.length; i++) {
      var target = all_displayItem[i].querySelector(".js-display-block-target");
      _removeAllChildren(target);
    };

    _removeAllChildren(displaySpell);
    _removeAllChildren(displaySkills);
    _removeAllChildren(displayAttack);
    _removeAllChildren(displayNote);
    _removeAllChildren(displayConsumable);
  };

  function clear() {
    var all_displayBlock = helper.eA(".js-display-block");
    var _removeAllChildren = function(parent) {
      while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
      };
    };
    for (var i = 0; i < all_displayBlock.length; i++) {
      var target;
      var displayType = all_displayBlock[i].dataset.displayType;
      if (displayType == "stat" || displayType == "modifier" || displayType == "text-snippet" || displayType == "text-block") {
        target = all_displayBlock[i].querySelector(".js-display-block-target");
      } else if (displayType == "list" || displayType == "clone" || displayType == "skill") {
        target = all_displayBlock[i];
      };
      _removeAllChildren(target);
    };
  };

  function _get_stat(path, target) {
    var data;
    if (path == "statistics.stats.str.score" && sheet.getCharacter().statistics.stats.str.temp_score) {
      data = sheet.getCharacter().statistics.stats.str.temp_score;
    } else if (path == "statistics.stats.dex.score" && sheet.getCharacter().statistics.stats.dex.temp_score) {
      data = sheet.getCharacter().statistics.stats.dex.temp_score;
    } else if (path == "statistics.stats.con.score" && sheet.getCharacter().statistics.stats.con.temp_score) {
      data = sheet.getCharacter().statistics.stats.con.temp_score;
    } else if (path == "statistics.stats.int.score" && sheet.getCharacter().statistics.stats.int.temp_score) {
      data = sheet.getCharacter().statistics.stats.int.temp_score;
    } else if (path == "statistics.stats.wis.score" && sheet.getCharacter().statistics.stats.wis.temp_score) {
      data = sheet.getCharacter().statistics.stats.wis.temp_score;
    } else if (path == "statistics.stats.cha.score" && sheet.getCharacter().statistics.stats.cha.temp_score) {
      data = sheet.getCharacter().statistics.stats.cha.temp_score;
    } else if (path == "statistics.stats.str.modifier" && sheet.getCharacter().statistics.stats.str.temp_score) {
      data = sheet.getCharacter().statistics.stats.str.temp_modifier;
    } else if (path == "statistics.stats.dex.modifier" && sheet.getCharacter().statistics.stats.dex.temp_score) {
      data = sheet.getCharacter().statistics.stats.dex.temp_modifier;
    } else if (path == "statistics.stats.con.modifier" && sheet.getCharacter().statistics.stats.con.temp_score) {
      data = sheet.getCharacter().statistics.stats.con.temp_modifier;
    } else if (path == "statistics.stats.int.modifier" && sheet.getCharacter().statistics.stats.int.temp_score) {
      data = sheet.getCharacter().statistics.stats.int.temp_modifier;
    } else if (path == "statistics.stats.wis.modifier" && sheet.getCharacter().statistics.stats.wis.temp_score) {
      data = sheet.getCharacter().statistics.stats.wis.temp_modifier;
    } else if (path == "statistics.stats.cha.modifier" && sheet.getCharacter().statistics.stats.cha.temp_score) {
      data = sheet.getCharacter().statistics.stats.cha.temp_modifier;
    } else {
      data = helper.getObject(sheet.getCharacter(), path);
    };
    if (typeof data == "undefined" || data == "") {
      data = 0;
    };
    var span = document.createElement("span");
    span.setAttribute("class", "m-display-item");
    span.textContent = data;
    target.appendChild(span);
  };

  function _get_modifier(path, target) {
    var data;
    if (path == "statistics.stats.str.modifier" && sheet.getCharacter().statistics.stats.str.temp_score) {
      data = sheet.getCharacter().statistics.stats.str.temp_modifier;
    } else if (path == "statistics.stats.dex.modifier" && sheet.getCharacter().statistics.stats.dex.temp_score) {
      data = sheet.getCharacter().statistics.stats.dex.temp_modifier;
    } else if (path == "statistics.stats.con.modifier" && sheet.getCharacter().statistics.stats.con.temp_score) {
      data = sheet.getCharacter().statistics.stats.con.temp_modifier;
    } else if (path == "statistics.stats.int.modifier" && sheet.getCharacter().statistics.stats.int.temp_score) {
      data = sheet.getCharacter().statistics.stats.int.temp_modifier;
    } else if (path == "statistics.stats.wis.modifier" && sheet.getCharacter().statistics.stats.wis.temp_score) {
      data = sheet.getCharacter().statistics.stats.wis.temp_modifier;
    } else if (path == "statistics.stats.cha.modifier" && sheet.getCharacter().statistics.stats.cha.temp_score) {
      data = sheet.getCharacter().statistics.stats.cha.temp_modifier;
    } else {
      data = helper.getObject(sheet.getCharacter(), path);
    };
    if (typeof data == "undefined" || data == "" || data == 0) {
      data = "0";
    } else if (parseInt(data, 10) > 0) {
      data = "+" + data;
    };
    var span = document.createElement("span");
    span.setAttribute("class", "m-display-item");
    span.textContent = data;
    target.appendChild(span);
  };

  function _get_textSnippet(path, target, title, prefix, suffix) {
    var data = helper.getObject(sheet.getCharacter(), path);
    if (typeof data != "undefined" && data != "") {
      var displayItem = document.createElement("span");
      displayItem.setAttribute("class", "m-display-item m-display-item-snippet");
      var spanData = document.createElement("span");
      spanData.setAttribute("class", "m-display-item-value");
      spanData.innerHTML = data;
      if (title) {
        var spanTitle = document.createElement("span");
        spanTitle.setAttribute("class", "m-display-item-title");
        spanTitle.textContent = title;
        displayItem.appendChild(spanTitle);
      };
      if (prefix) {
        var spanPrefix = document.createElement("span");
        spanPrefix.setAttribute("class", "m-display-item-prefix");
        spanPrefix.textContent = prefix;
        displayItem.appendChild(spanPrefix);
      };
      displayItem.appendChild(spanData);
      if (suffix) {
        var spanSuffix = document.createElement("span");
        spanSuffix.setAttribute("class", "m-display-item-suffix");
        spanSuffix.textContent = suffix;
        displayItem.appendChild(spanSuffix);
      };
      target.appendChild(displayItem);
    };
  };

  function _get_textBlock(path, target) {
    var data = helper.getObject(sheet.getCharacter(), path);
    if (typeof data != "undefined" && data != "") {
      var displayItem = document.createElement("span");
      displayItem.setAttribute("class", "m-display-item m-display-item-block");
      var value = document.createElement("span");
      value.setAttribute("class", "m-display-item-value");
      value.innerHTML = data;
      displayItem.appendChild(value);
      target.appendChild(displayItem);
    };
  };

  function _get_list(path, target, prefix, suffix) {
    var data = helper.getObject(sheet.getCharacter(), path);
    if (typeof data != "undefined" && data != "") {
      var li = document.createElement("li");
      li.setAttribute("class", "m-display-col");
      var div = document.createElement("div");
      div.setAttribute("class", "m-display-item m-display-item-list");
      var value = document.createElement("span");
      value.setAttribute("class", "m-display-item-value");
      value.innerHTML = data;
      if (prefix) {
        var spanPrefix = document.createElement("span");
        spanPrefix.setAttribute("class", "m-display-item-prefix");
        spanPrefix.textContent = prefix;
        div.appendChild(spanPrefix);
      };
      div.appendChild(value);
      if (suffix) {
        var spanSuffix = document.createElement("span");
        spanSuffix.setAttribute("class", "m-display-item-suffix");
        spanSuffix.textContent = suffix;
        div.appendChild(spanSuffix);
      };
      li.appendChild(div);
      target.appendChild(li);
    };
  };

  function _get_skill(path, target, prefix, suffix) {
    var object = helper.getObject(sheet.getCharacter(), path);
    if (typeof object != "undefined" && object != "") {

      if (object.ranks != "undefined" && object.ranks != "") {
        var li = document.createElement("li");
        li.setAttribute("class", "m-display-col");
        var div = document.createElement("div");
        div.setAttribute("class", "m-display-item m-display-item-col");
        var value = document.createElement("span");
        value.setAttribute("class", "m-display-item-value");
        value.textContent = object.current;


        if (prefix || object["name"] || object["variant_name"]) {
          var spanPrefix = document.createElement("span");
          spanPrefix.setAttribute("class", "m-display-item-prefix");
          if (object["name"]) {
            spanPrefix.textContent = object["name"] + " ";
          } else if (object["variant_name"]) {
            spanPrefix.textContent = object["variant_name"] + " ";
          } else {
            spanPrefix.textContent = prefix;
          };
          div.appendChild(spanPrefix);
        };

        div.appendChild(value);

        if (suffix) {
          var spanSuffix = document.createElement("span");
          spanSuffix.setAttribute("class", "m-display-item-suffix");
          spanSuffix.textContent = suffix;
          div.appendChild(spanSuffix);
        };
        li.appendChild(div);
        target.appendChild(li);
      };

    };
  };

  function _get_spell(path, target) {
    var object = helper.getObject(sheet.getCharacter(), path);
    console.log(object);
  };

  function _get_clone(path, target) {

    var _render_displayClone = function(object, target, cloneType) {
      var li = document.createElement("li");
      li.setAttribute("class", "m-display-col");
      var displayItem = document.createElement("div");
      if (cloneType == "consumable") {
        displayItem.setAttribute("class", "m-display-item m-display-item-col");
      } else if (cloneType == "attack-melee") {
        displayItem.setAttribute("class", "m-display-item m-display-item-list");
      } else if (cloneType == "attack-ranged") {
        displayItem.setAttribute("class", "m-display-item m-display-item-list");
      } else if (cloneType == "note-character") {
        displayItem.setAttribute("class", "m-display-item m-display-item-list");
      } else if (cloneType == "note-story") {
        displayItem.setAttribute("class", "m-display-item m-display-item-list");
      };

      if (cloneType == "consumable") {
        for (var i in object) {

          if (i == "item") {
            var data = object[i];
            if (typeof data != "undefined" && data != "") {
              var span = document.createElement("span");
              span.setAttribute("class", "m-display-item-prefix");
              span.textContent = data;
              displayItem.appendChild(span);
            };
          } else if (i == "current") {
            var data = object[i];
            if (typeof data != "undefined" && data != "" || data == 0) {
              var span = document.createElement("span");
              span.setAttribute("class", "m-display-item-value");
              span.textContent = data;
              displayItem.appendChild(span);
            };
          };

        };

        li.appendChild(displayItem);
        target.appendChild(li);
      };

      if (cloneType == "attack-melee" || cloneType == "attack-ranged") {
        var div = document.createElement("div");
        div.setAttribute("class", "m-display-" + cloneType + "-item");
        for (var i in object) {

          if (i == "weapon" || i == "attack" || i == "damage" || i == "critical" || i == "range" || i == "ammo") {
            var data = object[i];
            if (typeof data != "undefined" && data != "") {
              var span = document.createElement("span");
              span.setAttribute("class", "m-display-" + cloneType + "-item-" + i);
              span.textContent = data;
              div.appendChild(span);
            };
          };

        };

        displayItem.appendChild(div);
        li.appendChild(displayItem);
        target.appendChild(li);
      };

      if (cloneType == "note-character" || cloneType == "note-story") {
        for (var i in object) {

          var data = object[i];
          if (typeof data != "undefined" && data != "") {
            displayItem.innerHTML = data;
          };

        };

        li.appendChild(displayItem);
        target.appendChild(li);
      };

    };

    var cloneType;
    if (path == "equipment.consumable") {
      cloneType = "consumable";
    };
    if (path == "offense.attack.melee") {
      cloneType = "attack-melee";
    };
    if (path == "offense.attack.ranged") {
      cloneType = "attack-ranged";
    };
    if (path == "notes.character") {
      cloneType = "note-character";
    };
    if (path == "notes.story") {
      cloneType = "note-story";
    };

    var all_clones = helper.getObject(sheet.getCharacter(), path);
    for (var i in all_clones) {
      _render_displayClone(all_clones[i], target, cloneType);
    };

  };

  function _render_stat(itemsToDisplay, target) {
    for (var i = 0; i < itemsToDisplay.length; i++) {
      var path = itemsToDisplay[i];
      var data = _get_stat(path, target);
    };
  };

  function _render_modifier(itemsToDisplay, target) {
    for (var i = 0; i < itemsToDisplay.length; i++) {
      var path = itemsToDisplay[i];
      var data = _get_modifier(path, target);
    };
  };

  function _render_textSnippet(itemsToDisplay, target, displayTitle, displayPrefix, displaySuffix) {
    for (var i = 0; i < itemsToDisplay.length; i++) {
      var path = itemsToDisplay[i];
      var title = displayTitle[i];
      var prefix = displayPrefix[i];
      var suffix = displaySuffix[i];
      var data = _get_textSnippet(path, target, title, prefix, suffix);
    };
  };

  function _render_textBlock(itemsToDisplay, target) {
    for (var i = 0; i < itemsToDisplay.length; i++) {
      var path = itemsToDisplay[i];
      var data = _get_textBlock(path, target);
    };
  };

  function _render_list(itemsToDisplay, target, displayPrefix, displaySuffix) {
    for (var i = 0; i < itemsToDisplay.length; i++) {
      var path = itemsToDisplay[i];
      var prefix = displayPrefix[i];
      var suffix = displaySuffix[i];
      var data = _get_list(path, target, prefix, suffix);
    };
  };

  function _render_skill(itemsToDisplay, target, displayPrefix, displaySuffix) {
    for (var i = 0; i < itemsToDisplay.length; i++) {
      var path = itemsToDisplay[i];
      var prefix = displayPrefix[i];
      var suffix = displaySuffix[i];
      var data = _get_skill(path, target, prefix, suffix);
    };
  };

  function _render_clone(itemsToDisplay, target) {
    for (var i = 0; i < itemsToDisplay.length; i++) {
      var path = itemsToDisplay[i];
      var data = _get_clone(path, target);
    };
  };

  function _render_spell(itemsToDisplay, target) {
    for (var i = 0; i < itemsToDisplay.length; i++) {
      var path = itemsToDisplay[i];
      var data = _get_spell(path, target);
    };
  };


  function render() {
    var all_displayBlock = helper.eA(".js-display-block");

    for (var i = 0; i < all_displayBlock.length; i++) {
      var target = all_displayBlock[i].querySelector(".js-display-block-target");
      var itemsToDisplay;
      var displayType;
      var displayTitle;
      var displayPrefix;
      var displaySuffix;
      if (all_displayBlock[i].dataset.display) {
        itemsToDisplay = all_displayBlock[i].dataset.display.split(",");
        displayType = all_displayBlock[i].dataset.displayType;
        if (all_displayBlock[i].dataset.displayTitle) {
          displayTitle = all_displayBlock[i].dataset.displayTitle.split(",");
        } else {
          displayTitle = false;
        };
        if (all_displayBlock[i].dataset.displayPrefix) {
          displayPrefix = all_displayBlock[i].dataset.displayPrefix.split(",");
        } else {
          displayPrefix = false;
        };
        if (all_displayBlock[i].dataset.displaySuffix) {
          displaySuffix = all_displayBlock[i].dataset.displaySuffix.split(",");
        } else {
          displaySuffix = false;
        };
        // console.log(itemsToDisplay);
        // console.log(displayType);
        // console.log(displayPrefix);
        // console.log(displaySuffix);
      };
      if (displayType == "stat") {
        _render_stat(itemsToDisplay, target);
      } else if (displayType == "modifier") {
        _render_modifier(itemsToDisplay, target);
      } else if (displayType == "text-snippet") {
        _render_textSnippet(itemsToDisplay, target, displayTitle, displayPrefix, displaySuffix);
      } else if (displayType == "text-block") {
        _render_textBlock(itemsToDisplay, target);
      } else if (displayType == "list") {
        _render_list(itemsToDisplay, all_displayBlock[i], displayPrefix, displaySuffix);
      } else if (displayType == "skill") {
        _render_skill(itemsToDisplay, all_displayBlock[i], displayPrefix, displaySuffix);
      } else if (displayType == "clone") {
        _render_clone(itemsToDisplay, all_displayBlock[i]);
      } else if (displayType == "spell") {
        _render_spell(itemsToDisplay, all_displayBlock[i]);
      };
    };
  };

  function render____xxxx() {

    function _displayItem() {
      var all_displayBlock = helper.eA(".js-display-block");
      for (var i = 0; i < all_displayBlock.length; i++) {
        var target = all_displayBlock[i].querySelector(".js-display-block-target");
        if (all_displayBlock[i].dataset.display) {
          var itemsToDisplay = all_displayBlock[i].dataset.display.split(',');
        };
        for (var j = 0; j < itemsToDisplay.length; j++) {
          var path = itemsToDisplay[j];
          var data = helper.getObject(sheet.getCharacter(), path);

          var makeDisplayItem = function(addressToCompare, beforeString, afterString) {
            if (typeof data != "undefined" && data != "" && itemsToDisplay[j] == addressToCompare) {
              data = beforeString + data + afterString;
              return data;
            } else {
              return data;
            };
          };

          var hp = function(addressToCompare) {
            if (typeof data != "undefined" && data != "" && itemsToDisplay[j] == addressToCompare || data == 0 && itemsToDisplay[j] == addressToCompare) {
              data = "<strong>HP " + data + "</strong> / " + helper.getObject(sheet.getCharacter(), "defense.hp.total");
              return data;
            };
          };

          var customSkillName = function(data) {
            if (typeof data != "undefined" && data != "") {
              return data;
            } else {
              return "Custom skill";
            };
          };

          var skillVariantName = function(data) {
            if (typeof data != "undefined" && data != "") {
              return " (" + data + ") ";
            } else {
              return "";
            };
          };

          makeDisplayItem("basics.speed", "Speed ", "");
          makeDisplayItem("basics.initiative", "Initiative ", "");
          makeDisplayItem("basics.xp", "", " xp");
          makeDisplayItem("basics.age", "", " years old");
          makeDisplayItem("basics.hero_points", "", " hero point");
          makeDisplayItem("basics.luck_points", "", " luck point");

          makeDisplayItem("statistics.stats.str.score", "<strong>Str</strong> ", "");
          makeDisplayItem("statistics.stats.str.temp_score", "<strong>Str temp</strong> ", "");
          makeDisplayItem("statistics.stats.dex.score", "<strong>Dex</strong> ", "");
          makeDisplayItem("statistics.stats.dex.temp_score", "<strong>Dex temp</strong> ", "");
          makeDisplayItem("statistics.stats.con.score", "<strong>Con</strong> ", "");
          makeDisplayItem("statistics.stats.con.temp_score", "<strong>Con temp</strong> ", "");
          makeDisplayItem("statistics.stats.int.score", "<strong>Int</strong> ", "");
          makeDisplayItem("statistics.stats.int.temp_score", "<strong>Int temp</strong> ", "");
          makeDisplayItem("statistics.stats.wis.score", "<strong>Wis</strong> ", "");
          makeDisplayItem("statistics.stats.wis.temp_score", "<strong>Wis temp</strong> ", "");
          makeDisplayItem("statistics.stats.cha.score", "<strong>Cha</strong> ", "");
          makeDisplayItem("statistics.stats.cha.temp_score", "<strong>Cha temp</strong> ", "");
          makeDisplayItem("statistics.feats", "<strong>Feats</strong> ", "");
          makeDisplayItem("statistics.traits", "<strong>Traits</strong> ", "");
          makeDisplayItem("statistics.special_abilities", "<strong>Special Abilities</strong> ", "");
          makeDisplayItem("statistics.languages", "<strong>Languages</strong> ", "");

          makeDisplayItem("equipment.gear", "<strong>Gear</strong> ", "");
          makeDisplayItem("equipment.magic_gear", "<strong>Magic Gear</strong> ", "");
          makeDisplayItem("equipment.body_slots.armor", "<strong>Armor</strong> ", "");
          makeDisplayItem("equipment.body_slots.belts", "<strong>Belts</strong> ", "");
          makeDisplayItem("equipment.body_slots.body", "<strong>Body</strong> ", "");
          makeDisplayItem("equipment.body_slots.chest", "<strong>Chest</strong> ", "");
          makeDisplayItem("equipment.body_slots.eyes", "<strong>Eyes</strong> ", "");
          makeDisplayItem("equipment.body_slots.feet", "<strong>Feet</strong> ", "");
          makeDisplayItem("equipment.body_slots.hands", "<strong>Hands</strong> ", "");
          makeDisplayItem("equipment.body_slots.head", "<strong>Head</strong> ", "");
          makeDisplayItem("equipment.body_slots.headband", "<strong>Headband</strong> ", "");
          makeDisplayItem("equipment.body_slots.neck", "<strong>Neck</strong> ", "");
          makeDisplayItem("equipment.body_slots.ring_left_hand", "<strong>Ring (Left Hand)</strong> ", "");
          makeDisplayItem("equipment.body_slots.ring_right_hand", "<strong>Ring (Right Hand)</strong> ", "");
          makeDisplayItem("equipment.body_slots.shield", "<strong>Shield</strong> ", "");
          makeDisplayItem("equipment.body_slots.shoulders", "<strong>Shoulders</strong> ", "");
          makeDisplayItem("equipment.body_slots.wrist", "<strong>Wrist</strong> ", "");
          makeDisplayItem("equipment.wealth.platinum", "<strong>PP</strong> ", "");
          makeDisplayItem("equipment.wealth.gold", "<strong>GP</strong> ", "");
          makeDisplayItem("equipment.wealth.silver", "<strong>SP</strong> ", "");
          makeDisplayItem("equipment.wealth.copper", "<strong>CP</strong> ", "");

          hp("defense.hp.current");
          makeDisplayItem("defense.hp.temp", "", "");
          makeDisplayItem("defense.hp.non_lethal_damage", "<strong>Nonlethal Damage</strong> ", "");
          makeDisplayItem("defense.ac.current", "<strong>AC</strong> ", "");
          makeDisplayItem("defense.ac_notes", "<strong>Notes</strong><br> ", "");
          makeDisplayItem("defense.flat_footed.current", "<strong>Flat Footed</strong> ", "");
          makeDisplayItem("defense.touch.current", "<strong>Touch</strong> ", "");
          makeDisplayItem("defense.fortitude.current", "<strong>Fortitude</strong> ", "");
          makeDisplayItem("defense.reflex.current", "<strong>Reflex</strong> ", "");
          makeDisplayItem("defense.will.current", "<strong>Will</strong> ", "");
          makeDisplayItem("defense.save_notes", "<strong>Notes</strong><br> ", "");

          makeDisplayItem("offense.base_attack", "<strong>BAB</strong> ", "");
          makeDisplayItem("spells.concentration.current", "<strong>Concentration</strong> ", "");
          makeDisplayItem("offense.cmb.current", "<strong>CMB</strong> ", "");
          makeDisplayItem("offense.cmd.current", "<strong>CMD</strong> ", "");
          makeDisplayItem("offense.melee_attack.current", "<strong>Melee</strong> ", "");
          makeDisplayItem("offense.ranged_attack.current", "<strong>Ranged</strong> ", "");
          makeDisplayItem("offense.attack_notes", "<strong>Notes</strong><br> ", "");

          if (typeof data != "undefined" && data != "") {
            var text = document.createElement("span");
            text.setAttribute("class", "m-display-item");
            text.innerHTML = data;
            target.appendChild(text);
          };
        };
      };
    };

    function _makeSkillName(key) {
      if (key == "acrobatics") {
        return "Acrobatics";
      };
      if (key == "appraise") {
        return "Appraise";
      };
      if (key == "bluff") {
        return "Bluff";
      };
      if (key == "climb") {
        return "Climb";
      };
      if (key == "craft_1" || key == "craft_2") {
        return "Craft";
      };
      if (key == "diplomacy") {
        return "Diplomacy";
      };
      if (key == "disable_device") {
        return "Disable Device";
      };
      if (key == "disguise") {
        return "Disguise";
      };
      if (key == "escape_artist") {
        return "Escape Artist";
      };
      if (key == "fly") {
        return "Fly";
      };
      if (key == "handle_animal") {
        return "Handle Animal";
      };
      if (key == "heal") {
        return "Heal";
      };
      if (key == "intimidate") {
        return "Intimidate";
      };
      if (key == "knowledge_arcana") {
        return "Knowledge Arcana";
      };
      if (key == "knowledge_dungeoneering") {
        return "Knowledge (Dungeoneering)";
      };
      if (key == "knowledge_engineering") {
        return "Knowledge (Engineering)";
      };
      if (key == "knowledge_geography") {
        return "Knowledge (Geography)";
      };
      if (key == "knowledge_history") {
        return "Knowledge (History)";
      };
      if (key == "knowledge_local") {
        return "Knowledge (Local)";
      };
      if (key == "knowledge_nature") {
        return "Knowledge (Nature)";
      };
      if (key == "knowledge_nobility") {
        return "Knowledge (Nobility)";
      };
      if (key == "knowledge_planes") {
        return "Knowledge (Planes)";
      };
      if (key == "knowledge_religion") {
        return "Knowledge (Religion)";
      };
      if (key == "linguistics") {
        return "Linguistics";
      };
      if (key == "perception") {
        return "Perception";
      };
      if (key == "perform_1" || key == "perform_2") {
        return "Perform";
      };
      if (key == "profession_1" || key == "profession_2") {
        return "Profession";
      };
      if (key == "ride") {
        return "Ride";
      };
      if (key == "sense_motive") {
        return "Sense Motive";
      };
      if (key == "sleight_of_hand") {
        return "Sleight Of Hand";
      };
      if (key == "spellcraft") {
        return "Spellcraft";
      };
      if (key == "stealth") {
        return "Stealth";
      };
      if (key == "survival") {
        return "Survival";
      };
      if (key == "swim") {
        return "Swim";
      };
      if (key == "use_magic_device") {
        return "Use Magic Device";
      };
      if (key == "custom_1" || key == "custom_2" || key == "custom_3" || key == "custom_4" || key == "custom_5" || key == "custom_6" || key == "custom_7" || key == "custom_8") {
        return "Custom Skill";
      };
    };

    function _createSkillSpan(data) {
      var span = document.createElement("span");
      span.setAttribute("class", "m-display-skills");
      span.innerHTML = data;
      return span;
    };

    function _displaySkills() {
      var displayBlockSkills = helper.e(".js-display-block-skills").querySelector(".js-display-block-target");
      var para = document.createElement("p");
      para.setAttribute("class", "m-display-block");
      var all_skills = sheet.getCharacter().skills;
      for (var key in all_skills) {
        // filter out keys which are not a skill
        if (key != "spent_ranks") {
          var data;
          if (all_skills[key].ranks != "") {
            if (all_skills[key].name) {
              data = all_skills[key].name + " <strong>" + all_skills[key].current + "</strong>";
              para.appendChild(_createSkillSpan(data));
            } else if (all_skills[key].variant_name) {
              data = _makeSkillName(key) + " (" + all_skills[key].variant_name + ") <strong>" + all_skills[key].current + "</strong>";
              para.appendChild(_createSkillSpan(data));
            } else if (!all_skills[key].name || all_skills[key].variant_name) {
              data = _makeSkillName(key) + " <strong>" + all_skills[key].current + "</strong>";
              para.appendChild(_createSkillSpan(data));
            };
          };
        };
      };
      displayBlockSkills.appendChild(para);
    };

    function _displaySpell() {
      // build an array of spell objects
      var spellsToRender;
      // iterate over all objects keys to find spells
      if (sheet.getCharacter().spells.book) {
        for (var i in sheet.getCharacter().spells.book) {
          for (var j in sheet.getCharacter().spells.book[i]) {
            spellsToRender = sheet.getCharacter().spells.book[i][j];
            _render_displaySpell(spellsToRender, i);
          };
        };
      };
    };

    function _displayAttackMelee() {
      if (sheet.getCharacter().offense.attack.melee) {
        for (var i in sheet.getCharacter().offense.attack.melee) {
          _render_displayClone("attack-melee", sheet.getCharacter().offense.attack.melee[i], helper.e(".js-display-block-attack").querySelector(".js-display-block-target"));
        };
      };
    };

    function _displayAttackRanged() {
      if (sheet.getCharacter().offense.attack.ranged) {
        for (var i in sheet.getCharacter().offense.attack.ranged) {
          _render_displayClone("attack-ranged", sheet.getCharacter().offense.attack.ranged[i], helper.e(".js-display-block-attack").querySelector(".js-display-block-target"));
        };
      };
    };

    function _displayConsumable() {
      if (sheet.getCharacter().equipment.consumable) {
        for (var i in sheet.getCharacter().equipment.consumable) {
          _render_displayClone("consumable", sheet.getCharacter().equipment.consumable[i], helper.e(".js-display-block-consumable").querySelector(".js-display-block-target"));
        };
      };
    };

    function _displayNoteCharacter() {
      if (sheet.getCharacter().notes.character) {
        for (var i in sheet.getCharacter().notes.character) {
          _render_displayClone("note-character", sheet.getCharacter().notes.character[i], helper.e(".js-display-block-note").querySelector(".js-display-block-target"));
        };
      };
    };

    function _displayNoteStory() {
      if (sheet.getCharacter().notes.story) {
        for (var i in sheet.getCharacter().notes.story) {
          _render_displayClone("note-story", sheet.getCharacter().notes.story[i], helper.e(".js-display-block-note").querySelector(".js-display-block-target"));
        };
      };
    };

    function _render_displaySpell(array, level) {
      var displaySpell = helper.e(".js-display-block-spell").querySelector(".js-display-block-target");
      // read spells and add them to spell lists
      var spellDc = sheet.getCharacter().spells.dc["level_" + level];
      var perDay = sheet.getCharacter().spells.per_day["level_" + level];
      var known = sheet.getCharacter().spells.known["level_" + level];
      for (var i = 0; i < array.length; i++) {
        var spellObject = array[i];
        // find spell list to add too
        var spellPara;
        if (helper.e(".js-display-spell-level-" + level)) {
          spellPara = helper.e(".js-display-spell-level-" + level);
        } else {
          spellPara = document.createElement("p");
          spellPara.setAttribute("class", "m-display-block m-display-block-tab js-display-spell-level-" + level);
          var spellLevelPara = document.createElement("p");
          spellLevelPara.setAttribute("class", "m-display-block");
          var spellLevelParaStrong = document.createElement("strong");
          spellLevelParaStrong.innerHTML = "Level " + level;
          spellLevelPara.appendChild(spellLevelParaStrong);
          displaySpell.appendChild(spellLevelPara);
          if (known != "" || known == "undefined" || perDay != "" || perDay == "undefined" || spellDc != "" || spellDc == "undefined") {
            var spellKnownDailyDcPara = document.createElement("p");
            spellKnownDailyDcPara.setAttribute("class", "m-display-block m-display-block-tab m-display-block-sub");
            if (known != "" || known == "undefined") {
              var span1 = document.createElement("span");
              if (spellKnownDailyDcPara.children.length > 0) {
                span1.innerHTML = ", Known " + known + " ";
              } else {
                span1.innerHTML = "Known " + known;
              };
              spellKnownDailyDcPara.appendChild(span1);
            };
            if (perDay != "" || perDay == "undefined") {
              var span2 = document.createElement("span");
              if (spellKnownDailyDcPara.children.length > 0) {
                span2.innerHTML = ", Per day " + perDay + " ";
              } else {
                span2.innerHTML = "Per day " + perDay;
              };
              spellKnownDailyDcPara.appendChild(span2);
            };
            if (spellDc != "" || spellDc == "undefined") {
              var span3 = document.createElement("span");
              if (spellKnownDailyDcPara.children.length > 0) {
                span3.innerHTML = ", DC " + spellDc + " ";
              } else {
                span3.innerHTML = "DC " + spellDc;
              };
              spellKnownDailyDcPara.appendChild(span3);
            };
            if (spellKnownDailyDcPara) {
              displaySpell.appendChild(spellKnownDailyDcPara);
            };
          };
          displaySpell.appendChild(spellPara);
        };
        // make spell
        var spell = document.createElement("span");
        spell.setAttribute("class", "m-display-spell");
        var name = document.createElement("span");
        name.setAttribute("class", "m-display-spell-name");
        name.innerHTML = spellObject.name;
        spell.appendChild(name);
        // add spell marks
        if (spellObject.prepared > 0) {
          var marks = document.createElement("span");
          marks.setAttribute("class", "m-display-spell-marks js-display-spell-marks");
          spell.appendChild(marks);
          var spellMarks = spell.querySelector(".js-display-spell-marks");
          for (var j = 0; j < spellObject.prepared; j++) {
            var preparedIcon = document.createElement("span");
            preparedIcon.setAttribute("class", "icon-radio-button-checked");
            spellMarks.insertBefore(preparedIcon, spellMarks.firstChild);
          };
        };
        // cast spells if cast > 0
        if (spellObject.cast > 0) {
          var all_check = spellMarks.querySelectorAll(".icon-radio-button-checked");
          for (var j = 0; j < spellObject.cast; j++) {
            if (all_check[j]) {
              helper.toggleClass(all_check[j], "icon-radio-button-checked");
              helper.toggleClass(all_check[j], "icon-radio-button-unchecked");
              helper.toggleClass(all_check[j], "js-display-spell-mark-checked");
              helper.toggleClass(all_check[j], "js-display-spell-mark-unchecked");
            };
          };
          if (spellObject.cast >= spellObject.prepared) {
            helper.removeClass(spell, "button-primary");
          };
        };
        // if spell is active
        if (spellObject.active) {
          var active = document.createElement("span");
          active.setAttribute("class", "m-display-spell-active js-display-spell-active");
          spell.insertBefore(active, spell.firstChild);
          var spellActive = spell.querySelector(".js-display-spell-active");
          var activeIcon = document.createElement("span");
          activeIcon.setAttribute("class", "icon-play-arrow");
          if (spellObject.prepared > 0) {
            if (spellActive.children.length > 0) {
              spellActive.firstChild.remove();
            } else {
              spellActive.appendChild(activeIcon);
            };
          };
        };
        spellPara.appendChild(spell);
      };
    };

    function _render_displayClone(cloneType, object, displayTarget) {
      // console.log(cloneType);
      // console.log(object);
      // console.log(displayTarget);
      var para = document.createElement("p");
      para.setAttribute("class", "m-display-block");
      for (var i in object) {
        // filter the object keys
        if (i != "used" && i != "total") {
          var data = object[i];

          var makeDisplayItem = function(addressToCompare, beforeString, afterString) {
            if (typeof data != "undefined" && data != "" && i == addressToCompare) {
              return data = beforeString + data + afterString;
            } else {
              return data;
            };
          };

          makeDisplayItem("weapon", "<strong>", "</strong>");
          makeDisplayItem("attack", "<strong>", "</strong>");
          makeDisplayItem("damage", "", "");
          makeDisplayItem("critical", "Critical ", "");
          makeDisplayItem("range", "Range ", "");
          makeDisplayItem("ammo", "Ammo ", "");
          makeDisplayItem("item", "<strong>", "</strong>");
          makeDisplayItem("current", "<strong>", "</strong>");
          makeDisplayItem("used", "Used ", "");
          makeDisplayItem("total", "Total ", "");

          var span = document.createElement("span");
          span.setAttribute("class", "m-display-item");
          span.innerHTML = data;

          if (typeof data != "undefined" && data != "") {
            para.appendChild(span);
          };
        };

      };
      displayTarget.appendChild(para);
    };

    _displayItem();
    _displaySkills();
    _displaySpell();
    _displayAttackMelee();
    _displayAttackRanged();
    _displayConsumable();
    _displayNoteCharacter();
    _displayNoteStory();

  };

  // exposed methods
  return {
    toggle: toggle,
    bind: bind,
    render: render,
    clear: clear
  };

})();
