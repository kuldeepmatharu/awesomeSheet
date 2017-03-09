var spells = (function() {

  function bind() {
    var spellPrepareButton = helper.e(".js-spell-prepare");
    var spellUnprepareButton = helper.e(".js-spell-unprepare");
    var spellCastButton = helper.e(".js-spell-cast");
    var spellActiveButton = helper.e(".js-spell-active");
    var spellRemoveButton = helper.e(".js-spell-remove");
    var spellResetButton = helper.e(".js-spell-reset");
    var all_newSpellAdd = helper.eA(".js-new-spell-add");
    for (var i = 0; i < all_newSpellAdd.length; i++) {
      var newSpell = helper.getClosest(all_newSpellAdd[i], ".js-new-spell");
      var newSpellField = newSpell.querySelector(".js-new-spell-field");
      all_newSpellAdd[i].addEventListener("click", function() {
        _addNewSpell(helper.getClosest(this, ".js-new-spell").querySelector(".js-new-spell-field"));
        sheet.storeCharacters();
      }, false);
      newSpellField.addEventListener("keypress", function() {
        _addNewSpellOnEnter(this);
        sheet.storeCharacters();
      }, false);
    };
    spellPrepareButton.addEventListener("click", function() {
      _changeSpellState(this);
    }, false);
    spellUnprepareButton.addEventListener("click", function() {
      _changeSpellState(this);
    }, false);
    spellCastButton.addEventListener("click", function() {
      _changeSpellState(this);
    }, false);
    spellActiveButton.addEventListener("click", function() {
      _changeSpellState(this);
    }, false);
    spellRemoveButton.addEventListener("click", function() {
      _changeSpellState(this);
    }, false);
    spellResetButton.addEventListener("click", function() {
      _changeSpellState(this);
      _resetAllSpells();
    }, false);
  };

  function _addNewSpell(element) {
    var spellLevel = helper.getClosest(element, ".js-spell-book").dataset.spellLevel;
    var spellName = element.value;
    var newSpell = new _createSpellObject(spellName, 0, false, 0);
    // if input value is not empty
    if (spellName !== "") {
      //  if first character is not a number
      if (isNaN(spellName.charAt(0))) {
        // add spell to current character known spells
        sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel].push(newSpell);
        _destroy_spellBook(spellLevel);
        _render_spell(sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel], spellLevel);
        // clear input field
        element.value = "";
        snack.render(helper.truncate(spellName, 40, true) + " added to spell level " + spellLevel + ".");
      } else {
        // error if the name starts with a number
        snack.render("Name can't start with a space or number.");
      };
    };
    inputBlock.focus(element);
  };

  function _addNewSpellOnEnter(element) {
    var keystroke = event.keyCode || event.which;
    if (keystroke == 13) {
      _addNewSpell(element);
    };
  };

  function _resetAllSpells() {
    var all_spellLevels = helper.eA(".js-spell-book-known");
    var spellsFound = false;
    for (var i = 0; i < all_spellLevels.length; i++) {
      if (all_spellLevels[i].children.length > 0) {
        spellsFound = true;
      };
    };
    if (spellsFound) {
      var resetSpells = function() {
        if (sheet.getCharacter().spells.book) {
          for (var i in sheet.getCharacter().spells.book) {
            for (var j in sheet.getCharacter().spells.book[i]) {
              for (var k in sheet.getCharacter().spells.book[i][j]) {
                sheet.getCharacter().spells.book[i][j][k].prepared = 0;
                sheet.getCharacter().spells.book[i][j][k].cast = 0;
                sheet.getCharacter().spells.book[i][j][k].active = false;
                // console.log(sheet.getCharacter().spells.book[i][j][k]);
              };
            };
          };
        };
        clear();
        render();
        sheet.storeCharacters();
        snack.render("All spells reset.");
      };
      prompt.render("Reset all spells?", "All prepared, cast and active spells will be set to normal states.", "Reset", resetSpells, false, false, false);
    };
  };

  function _bind_spellKnownItem(element) {
    element.addEventListener("click", function() {
      clearTimeout(storeSpellTimer);
      storeSpellTimer = setTimeout(delayUpdate, 1000, this);
      _update_spellObject(this);
      _update_spellButton(this);
      _checkSpellState();
    }, false);
  };

  function _spellNoteModalContent(button) {
    var spellLevel = parseInt(button.dataset.spellLevel, 10);
    var spellCount = parseInt(button.dataset.spellCount, 10);
    var spellObject = sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount];
    var div = document.createElement("div");
    div.setAttribute("class", "m-spell-note");
    var textareaBlock = document.createElement("div");
    textareaBlock.setAttribute("class", "m-spell-note-textarea textarea u-full-width");
    textareaBlock.setAttribute("contenteditable", "true");
    textareaBlock.setAttribute("tabindex", "3");
    textareaBlock.setAttribute("placeholder", "Spell range, casting time or duration? Anything else?");
    textareaBlock.setAttribute("data-spell-level", spellLevel);
    textareaBlock.setAttribute("data-spell-count", spellCount);
    div.appendChild(textareaBlock);
    if (typeof spellObject.note != "undefined" && spellObject.note != "") {
      textareaBlock.innerHTML = spellObject.note;
    };
    textareaBlock.addEventListener("paste", function(event) {
      helper.pasteStrip(event);
    });
    modal.render(spellObject.name + " Notes", div, "Save", function() {
      return _storeSpellNote(textareaBlock);
    });
  };

  function _storeSpellNote(element) {
    var spellLevel = parseInt(element.dataset.spellLevel, 10);
    var spellCount = parseInt(element.dataset.spellCount, 10);
    var spellObject = sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount];
    spellObject.note = element.innerHTML;
    sheet.storeCharacters();
  };

  function _update_spellButton(button) {
    var spellRoot = helper.getClosest(button, ".js-spells");
    var spellMarks = button.querySelector(".js-spell-marks");
    var spellActive = button.querySelector(".js-spell-active");
    var spellState = spellRoot.dataset.spellState;
    var spellCol = helper.getClosest(button, ".js-spell-col");
    var spellLevel = parseInt(button.dataset.spellLevel, 10);
    var spellCount = parseInt(button.dataset.spellCount, 10);
    var spellObject = sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount];
    // state prepare
    if (spellState == "prepare") {
      var preparedIcon = document.createElement("span");
      preparedIcon.setAttribute("class", "icon-radio-button-checked js-spell-mark-checked");
      if (spellMarks.children.length <= 30) {
        spellMarks.appendChild(preparedIcon);
      };
      if (spellMarks.children.length > 0) {
        helper.addClass(button, "button-primary");
      };
    };
    // state unprepare
    if (spellState == "unprepare") {
      if (spellMarks.lastChild) {
        spellMarks.lastChild.remove();
      };
      if (spellMarks.children.length <= 0) {
        helper.removeClass(button, "button-primary");
      };
    };
    // state cast
    if (spellState == "cast") {
      var all_spellsMarks = spellMarks.children;
      var all_remainingPrepared = spellMarks.querySelectorAll(".js-spell-mark-checked").length;
      for (var i = 0; i < all_spellsMarks.length; i++) {
        if (all_spellsMarks[i].classList.contains("js-spell-mark-checked")) {
          helper.toggleClass(all_spellsMarks[i], "icon-radio-button-checked");
          helper.toggleClass(all_spellsMarks[i], "icon-radio-button-unchecked");
          helper.toggleClass(all_spellsMarks[i], "js-spell-mark-checked");
          helper.toggleClass(all_spellsMarks[i], "js-spell-mark-unchecked");
          break
        };
      };
      // if there are no spell marks add cast mark for spontaneous casters
      if (all_remainingPrepared <= 0) {
        if (spellMarks.children.length <= 30) {
          var castIcon = document.createElement("span");
          castIcon.setAttribute("class", "icon-radio-button-unchecked js-spell-mark-unchecked");
          spellMarks.appendChild(castIcon);
        };
      };
      if (spellMarks.children.length > 0) {
        helper.addClass(button, "button-primary");
      };
      // if no checked icons can be found change the var allSpellCast to true
      for (var i = 0; i < all_spellsMarks.length; i++) {
        if (all_spellsMarks[i].classList.contains("js-spell-mark-checked")) {
          all_remainingPrepared--;
        };
      };
    };
    // state active
    if (spellState == "active") {
      var activeIcon = document.createElement("span");
      activeIcon.setAttribute("class", "icon-play-arrow");
      if (spellActive.children.length > 0) {
        spellActive.firstChild.remove();
      } else {
        spellActive.appendChild(activeIcon);
      };
    };
    // state remove
    if (spellState == "remove") {
      _destroy_spellBook(spellLevel);
      _render_spell(sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel], spellLevel);
    };
  };

  function _update_spellObject(button) {
    var spellRoot = helper.getClosest(button, ".js-spells");
    var spellState = spellRoot.dataset.spellState;
    var spellLevel = parseInt(button.dataset.spellLevel, 10);
    var spellCount = parseInt(button.dataset.spellCount, 10);
    // state prepare
    if (spellState == "prepare") {
      if (sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].prepared < 30) {
        sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].prepared++
      };
      // console.log(sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount]);
    } else if (spellState == "unprepare") {
      if (sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].prepared > 0) {
        sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].prepared--
      };
      if (sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].prepared < sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].cast) {
        sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].cast = sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].prepared;
      };
      // console.log(sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount]);
    } else if (spellState == "cast") {
      if (sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].cast < 30) {
        sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].cast++
      };
      if (sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].cast > sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].prepared) {
        sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].prepared = sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].cast
      };
      // console.log(sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount]);
    } else if (spellState == "active") {
      if (sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].active) {
        sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].active = false;
      } else {
        sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].active = true;
      };
      // console.log(sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount]);
    } else if (spellState == "remove") {
      // console.log(sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount]);
      var spellName = sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].name;
      _storeLastRemovedSpell(spellLevel, spellCount, sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount]);
      sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel].splice(spellCount, 1);
      snack.render(helper.truncate(spellName, 40, true) + " removed.", "Undo", _restoreLastRemovedSpell, 6000);
    } else {
      _spellNoteModalContent(button);
    };
    sheet.storeCharacters();
  };

  function _storeLastRemovedSpell(spellLevel, spellCount, spell) {
    var object = {
      spellLevel: spellLevel,
      spellCount: spellCount,
      spell: spell
    };
    helper.store("lastRemovedSpell", JSON.stringify(object));
  };

  function _removeLastRemovedSpell() {
    helper.remove("lastRemovedSpell");
  };

  function _restoreLastRemovedSpell() {
    var undoData = JSON.parse(helper.read("lastRemovedSpell"));
    _restoreSpellObject(undoData.spellLevel, undoData.spellCount, undoData.spell);
    _removeLastRemovedSpell();
    _checkSpellState();
  };

  function _restoreSpellObject(spellLevel, spellCount, spell) {
    sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel].splice(spellCount, 0, spell);
    _destroy_spellBook(spellLevel);
    _render_spell(sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel], spellLevel);
    sheet.storeCharacters();
  };

  function _changeSpellState(button) {
    var all_spellLevels = helper.eA(".js-spell-book-known");
    var spellsFound = false;
    var spellRoot = helper.e(".js-spells");
    var spellPrepareButton = helper.e(".js-spell-prepare");
    var spellUnprepareButton = helper.e(".js-spell-unprepare");
    var spellCastButton = helper.e(".js-spell-cast");
    var spellActiveButton = helper.e(".js-spell-active");
    var spellRemoveButton = helper.e(".js-spell-remove");
    var all_spellStateControls = spellRoot.querySelectorAll(".js-spell-state-control");
    var all_spellBookItem = helper.eA(".js-spell");
    for (var i = 0; i < all_spellLevels.length; i++) {
      if (all_spellLevels[i].children.length > 0) {
        spellsFound = true;
      };
    };
    if (spellsFound) {
      // if this button is active
      if (spellRoot.dataset.spellState != button.dataset.state) {
        helper.removeClass(button, "is-active");
        helper.removeClass(spellRoot, "is-state-prepare");
        helper.removeClass(spellRoot, "is-state-unprepare");
        helper.removeClass(spellRoot, "is-state-cast");
        helper.removeClass(spellRoot, "is-state-active");
        helper.removeClass(spellRoot, "is-state-remove");
        helper.addClass(spellRoot, "is-state-" + button.dataset.state);
        spellRoot.dataset.spellState = button.dataset.state;
        for (var i = 0; i < all_spellStateControls.length; i++) {
          helper.removeClass(all_spellStateControls[i], "is-active");
        };
        if (!button.classList.contains("js-spell-reset")) {
          helper.addClass(button, "is-active");
        };
      } else {
        spellRoot.dataset.spellState = "false";
        helper.removeClass(button, "is-active");
        helper.removeClass(spellRoot, "is-state-prepare");
        helper.removeClass(spellRoot, "is-state-unprepare");
        helper.removeClass(spellRoot, "is-state-cast");
        helper.removeClass(spellRoot, "is-state-active");
        helper.removeClass(spellRoot, "is-state-remove");
      };
    } else {
      spellRoot.dataset.spellState = "false";
      helper.removeClass(button, "is-active");
      helper.removeClass(spellRoot, "is-state-prepare");
      helper.removeClass(spellRoot, "is-state-unprepare");
      helper.removeClass(spellRoot, "is-state-cast");
      helper.removeClass(spellRoot, "is-state-active");
      helper.removeClass(spellRoot, "is-state-remove");
    };
  };

  function _checkSpellState() {
    var spellRoot = helper.e(".js-spells");
    var all_spellStateControls = spellRoot.querySelectorAll(".js-spell-state-control");
    var all_spellBookItem = helper.eA(".js-spell");
    if (all_spellBookItem.length == 0) {
      helper.removeClass(spellRoot, "is-state-prepare");
      helper.removeClass(spellRoot, "is-state-unprepare");
      helper.removeClass(spellRoot, "is-state-cast");
      helper.removeClass(spellRoot, "is-state-active");
      helper.removeClass(spellRoot, "is-state-remove");
      for (var i = 0; i < all_spellStateControls.length; i++) {
        helper.removeClass(all_spellStateControls[i], "is-active");
      };
      spellRoot.dataset.spellState = "false";
    };
  };

  function _createSpellObject(spellName, spellPrepared, spellActive, spellCast, spellNote) {
    return {
      name: this.name = spellName,
      prepared: this.prepared = spellPrepared || 0,
      active: this.active = spellActive || false,
      cast: this.cast = spellCast || 0,
      note: this.note = spellNote || ""
    };
  };

  var storeSpellTimer = null;

  function delayUpdate() {
    var spellRoot = helper.e(".js-spells");
    var spellState = spellRoot.dataset.spellState;
    if (spellState == "prepare" || spellState == "unprepare" || spellState == "cast" || spellState == "active" || spellState == "remove") {
      sheet.storeCharacters();
    };
    if (body.dataset.displayMode == "true") {
      display.clear();
      display.render();
    };
  };

  function render() {
    // build an array of spell objects
    var spellsToRender;
    // iterate over all objects keys to find spells then push those values to spellsToRender
    if (sheet.getCharacter().spells.book) {
      for (var i in sheet.getCharacter().spells.book) {
        for (var j in sheet.getCharacter().spells.book[i]) {
          spellsToRender = sheet.getCharacter().spells.book[i][j];
          _render_spell(spellsToRender, i);
        };
      };
    };
  };

  function _render_spell(array, level) {
    // console.log(array, level);
    // read spells and add them to spell lists
    for (var i = 0; i < array.length; i++) {
      var spellObject = array[i];
      var spellButtonCol = document.createElement("div");
      spellButtonCol.setAttribute("class", "col-xs-12 col-md-6 js-spell-col");
      // find spell list to add too
      var knownListToSaveTo = helper.e(".js-spell-book-known-level-" + level);
      // append new spell to spell list
      var spellButton = _createSpellButton(spellObject, level, i);
      spellButtonCol.appendChild(spellButton);
      knownListToSaveTo.appendChild(spellButtonCol);
      _bind_spellKnownItem(spellButton);
    };
  };

  function _createSpellButton(spellObject, level, index) {
    var spellButton = document.createElement("button");
    spellButton.setAttribute("data-spell-level", level);
    spellButton.setAttribute("data-spell-count", index);
    spellButton.setAttribute("class", "m-spell button button-medium js-spell");
    spellButton.setAttribute("type", "button");
    spellButton.setAttribute("tabindex", "3");
    var spellActive = document.createElement("span");
    spellActive.setAttribute("class", "m-spell-active js-spell-active");
    spellButton.appendChild(spellActive);
    var spellNameSpan = document.createElement("span");
    spellNameSpan.setAttribute("class", "m-spell-name js-spell-name");
    spellNameSpan.textContent = spellObject.name;
    spellButton.appendChild(spellNameSpan);
    var spellMarks = document.createElement("span");
    spellMarks.setAttribute("class", "m-spell-marks js-spell-marks");
    spellButton.appendChild(spellMarks);
    if (spellObject.prepared > 0) {
      helper.addClass(spellButton, "button-primary");
      for (var i = 0; i < spellObject.prepared; i++) {
        var preparedIcon = document.createElement("span");
        preparedIcon.setAttribute("class", "icon-radio-button-checked js-spell-mark-checked");
        spellMarks.insertBefore(preparedIcon, spellMarks.firstChild);
      };
    };
    if (spellObject.cast > 0) {
      var all_check = spellMarks.querySelectorAll(".icon-radio-button-checked");
      for (var j = 0; j < spellObject.cast; j++) {
        if (all_check[j]) {
          helper.toggleClass(all_check[j], "icon-radio-button-checked");
          helper.toggleClass(all_check[j], "icon-radio-button-unchecked");
          helper.toggleClass(all_check[j], "js-spell-mark-checked");
          helper.toggleClass(all_check[j], "js-spell-mark-unchecked");
        };
      };
    };
    if (spellObject.active) {
      var activeIcon = document.createElement("span");
      activeIcon.setAttribute("class", "icon-play-arrow");
      if (spellActive.children.length > 0) {
        spellActive.firstChild.remove();
      } else {
        spellActive.appendChild(activeIcon);
      };
    };
    var spellRemove = document.createElement("span");
    spellRemove.setAttribute("class", "m-spell-remove js-spell-remove");
    spellButton.appendChild(spellRemove);
    var spellRemoveIcon = document.createElement("span");
    spellRemoveIcon.setAttribute("class", "icon-close");
    spellRemove.appendChild(spellRemoveIcon);
    return spellButton;
  };

  function _destroy_spellBook(level) {
    var spellBook = helper.e(".js-spell-book-known-level-" + level);
    while (spellBook.lastChild) {
      spellBook.removeChild(spellBook.lastChild);
    };
  };

  function clear() {
    var all_spellBookKnown = helper.eA(".js-spell-book-known");
    for (var i = 0; i < all_spellBookKnown.length; i++) {
      while (all_spellBookKnown[i].lastChild) {
        all_spellBookKnown[i].removeChild(all_spellBookKnown[i].lastChild);
      };
    };
  };

  // exposed methods
  return {
    clear: clear,
    bind: bind,
    render: render
  };

})();
