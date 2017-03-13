var clone = (function() {

  function render() {
    var all_attackMelee = sheet.getCharacter().offense.attack.melee;
    var all_attackRanged = sheet.getCharacter().offense.attack.ranged;
    var all_consumable = sheet.getCharacter().equipment.consumable;
    var all_noteCharacter = sheet.getCharacter().notes.character;
    var all_noteStory = sheet.getCharacter().notes.story;

    _render_clone(all_attackMelee.length, "attack-melee");
    _render_clone(all_attackRanged.length, "attack-ranged");
    _render_clone(all_consumable.length, "consumable");
    _render_clone(all_noteCharacter.length, "note-character");
    _render_clone(all_noteStory.length, "note-story");

    _update_cloneInput(all_attackMelee, "attack-melee");
    _update_cloneInput(all_attackRanged, "attack-ranged");
    _update_cloneInput(all_consumable, "consumable");
    _update_cloneTextarea(all_noteCharacter, "note-character");
    _update_cloneTextarea(all_noteStory, "note-story");

    _updateCloneAttackMelee();
    _updateCloneAttackRanged();
    _updateCloneConsumable();
  };

  function _newConsumable(index) {
    var cloneString =
      '<div class="m-clone-block-content">' +
      '  <div class="row">' +
      '    <div class="col-xs-12">' +
      '      <div class="js-total-block">' +
      '        <div class="row no-gutter">' +
      '          <div class="col-xs-6">' +
      '            <div class="m-input-block js-input-block">' +
      '              <label class="m-input-block-label js-input-block-label" for="consumable-item-' + index + '">Item</label>' +
      '              <input id="consumable-item-' + index + '" class="m-input-block-field u-full-width js-input-block-field js-clone-consumable-item" type="text" tabindex="3">' +
      '            </div>' +
      '          </div>' +
      '          <div class="col-xs-2">' +
      '            <p class="u-text-center u-no-margin u-inline-with-input u-underline-with-input js-total-block-total js-clone-consumable-current">0</p>' +
      '          </div>' +
      '          <div class="col-xs-2">' +
      '            <div class="m-input-block js-input-block">' +
      '              <label class="m-input-block-label js-input-block-label" for="consumable-total-' + index + '">Total</label>' +
      '              <input id="consumable-total-' + index + '" class="m-input-block-field u-full-width js-input-block-field js-clone-consumable-total" data-total="addition" type="text" tabindex="3">' +
      '            </div>' +
      '          </div>' +
      '          <div class="col-xs-2">' +
      '            <div class="m-input-block js-input-block">' +
      '              <label class="m-input-block-label js-input-block-label" for="consumable-used-' + index + '">Used</label>' +
      '              <input id="consumable-used-' + index + '" class="m-input-block-field u-full-width js-input-block-field js-clone-consumable-used" data-total="subtract" type="text" tabindex="3">' +
      '            </div>' +
      '          </div>' +
      '        </div>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '</div>' +
      '<div class="m-clone-block-delete-controls">' +
      '  <button class="button button-meidum button-primary js-clone-block-delete" tabindex="3"><span class="icon-close"></span></button>' +
      '</div>';
    return cloneString;
  };

  function _newAttackMelee(index) {
    var cloneString =
      '<div class="m-clone-block-content">' +
      '  <div class="row">' +
      '    <div class="col-xs-12">' +
      '      <div class="row no-gutter">' +
      '        <div class="col-xs-5 col-md-4">' +
      '          <div class="m-input-block js-input-block">' +
      '            <label class="m-input-block-label js-input-block-label" for="attack-melee-weapon-' + index + '">Weapon</label>' +
      '            <input id="attack-melee-weapon-' + index + '" class="m-input-block-field u-full-width js-input-block-field js-clone-attack-melee-weapon" type="text" tabindex="3">' +
      '          </div>' +
      '        </div>' +
      '        <div class="col-xs-2 col-md-2">' +
      '          <div class="m-input-block js-input-block">' +
      '            <label class="m-input-block-label js-input-block-label" for="attack-melee-attack-' + index + '">Attack</label>' +
      '            <input id="attack-melee-attack-' + index + '" class="m-input-block-field u-full-width js-input-block-field js-clone-attack-melee-attack" type="text" tabindex="3">' +
      '          </div>' +
      '        </div>' +
      '        <div class="col-xs-3 col-md-3">' +
      '          <div class="m-input-block js-input-block">' +
      '            <label class="m-input-block-label js-input-block-label" for="attack-melee-damage-' + index + '">Damage</label>' +
      '            <input id="attack-melee-damage-' + index + '" class="m-input-block-field u-full-width js-input-block-field js-clone-attack-melee-damage" type="text" tabindex="3">' +
      '          </div>' +
      '        </div>' +
      '        <div class="col-xs-2 col-md-3">' +
      '          <div class="m-input-block js-input-block">' +
      '            <label class="m-input-block-label js-input-block-label" for="attack-melee-critical-' + index + '">Critical</label>' +
      '            <input id="attack-melee-critical-' + index + '" class="m-input-block-field u-full-width js-input-block-field js-clone-attack-melee-critical" type="text" tabindex="3">' +
      '          </div>' +
      '        </div>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '</div>' +
      '<div class="m-clone-block-delete-controls">' +
      '  <button class="button button-meidum button-primary js-clone-block-delete" tabindex="3"><span class="icon-close"></span></button>' +
      '</div>';
    return cloneString;
  };

  function _newAttackRanged(index) {
    var cloneString =
      '<div class="m-clone-block-content">' +
      '  <div class="row">' +
      '    <div class="col-xs-12">' +
      '      <div class="row no-gutter">' +
      '        <div class="col-xs-6 col-xl-4">' +
      '          <div class="m-input-block js-input-block">' +
      '            <label class="m-input-block-label js-input-block-label" for="attack-ranged-weapon-' + index + '">Weapon</label>' +
      '            <input id="attack-ranged-weapon-' + index + '" class="m-input-block-field u-full-width js-input-block-field js-clone-attack-ranged-weapon" type="text" tabindex="3">' +
      '          </div>' +
      '        </div>' +
      '        <div class="col-xs-3 col-xl-2">' +
      '          <div class="m-input-block js-input-block">' +
      '            <label class="m-input-block-label js-input-block-label" for="attack-ranged-attack-' + index + '">Attack</label>' +
      '            <input id="attack-ranged-attack-' + index + '" class="m-input-block-field u-full-width js-input-block-field js-clone-attack-ranged-attack" type="text" tabindex="3">' +
      '          </div>' +
      '        </div>' +
      '        <div class="col-xs-3 col-xl-2">' +
      '          <div class="m-input-block js-input-block">' +
      '            <label class="m-input-block-label js-input-block-label" for="attack-ranged-damage-' + index + '">Damage</label>' +
      '            <input id="attack-ranged-damage-' + index + '" class="m-input-block-field u-full-width js-input-block-field js-clone-attack-ranged-damage" type="text" tabindex="3">' +
      '          </div>' +
      '        </div>' +
      '        <div class="col-xs-3 col-xs-offset-3 col-xl-2 col-xl-offset-0">' +
      '          <div class="m-input-block js-input-block">' +
      '            <label class="m-input-block-label js-input-block-label" for="attack-ranged-critical-' + index + '">Critical</label>' +
      '            <input id="attack-ranged-critical-' + index + '" class="m-input-block-field u-full-width js-input-block-field js-clone-attack-ranged-critical" type="text" tabindex="3">' +
      '          </div>' +
      '        </div>' +
      '        <div class="col-xs-3 col-xl-1">' +
      '          <div class="m-input-block js-input-block">' +
      '            <label class="m-input-block-label js-input-block-label" for="attack-ranged-range-' + index + '">Range</label>' +
      '            <input id="attack-ranged-range-' + index + '" class="m-input-block-field u-full-width js-input-block-field js-clone-attack-ranged-range" type="text" tabindex="3">' +
      '          </div>' +
      '        </div>' +
      '        <div class="col-xs-3 col-xl-1">' +
      '          <div class="m-input-block js-input-block">' +
      '            <label class="m-input-block-label js-input-block-label" for="attack-ranged-ammo-' + index + '">Ammo</label>' +
      '            <input id="attack-ranged-ammo-' + index + '" class="m-input-block-field u-full-width js-input-block-field js-clone-attack-ranged-ammo" type="text" tabindex="3">' +
      '          </div>' +
      '        </div>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '</div>' +
      '<div class="m-clone-block-delete-controls">' +
      '  <button class="button button-meidum button-primary js-clone-block-delete" tabindex="3"><span class="icon-close"></span></button>' +
      '</div>';
    return cloneString;
  };

  function _newNoteCharacter(index) {
    var cloneString =
      '<div class="m-clone-block-content">' +
      '  <div class="row">' +
      '    <div class="col-xs-12">' +
      '      <div class="m-textarea-block js-textarea-block">' +
      '        <label class="m-textarea-block-label js-textarea-block-label" for="note-character-' + index + '">Note</label>' +
      '        <div id="note-character-' + index + '" class="m-textarea-block-field textarea textarea-large u-full-width js-textarea-block-field" contentEditable="true" tabindex="3"></div>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '</div>' +
      '<div class="m-clone-block-delete-controls">' +
      '  <button class="button button-meidum button-primary js-clone-block-delete" tabindex="3"><span class="icon-close"></span></button>' +
      '</div>';
    return cloneString;
  };

  function _newNoteStory(index) {
    var cloneString =
      '<div class="m-clone-block-content">' +
      '  <div class="row">' +
      '    <div class="col-xs-12">' +
      '      <div class="m-textarea-block js-textarea-block">' +
      '        <label class="m-textarea-block-label js-textarea-block-label" for="note-story-' + index + '">Note</label>' +
      '        <div id="note-story-' + index + '" class="m-textarea-block-field textarea textarea-large u-full-width js-textarea-block-field" contentEditable="true" tabindex="3"></div>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '</div>' +
      '<div class="m-clone-block-delete-controls">' +
      '  <button class="button button-meidum button-primary js-clone-block-delete" tabindex="3"><span class="icon-close"></span></button>' +
      '</div>';
    return cloneString;
  };

  function _minMaxCountLimit(input) {
    if (input.value <= 0) {
      input.value = "";
    } else if (input.value >= 100) {
      input.value = 100;
    };
  };

  function _smoothScrollToClones(cloneBlock) {
    var targetTop = helper.e(cloneBlock).getBoundingClientRect().top;
    var windowBottom = window.innerHeight;
    var quickNavHeight = parseInt(getComputedStyle(document.querySelector(".js-quick-nav")).height, 10);
    var subHeaderHeight = parseInt(getComputedStyle(document.querySelector(".js-section-heading")).height, 10);
    if (targetTop > (windowBottom - (windowBottom / 2))) {
      var options = {
        offset: quickNavHeight + subHeaderHeight + 30
      };
      if (body.dataset.displayMode == "false" || !body.dataset.displayMode) {
        smoothScroll.animateScroll(null, cloneBlock, options);
      };
    };
  };

  function bind() {
    var cloneBlockConsumable = helper.e(".js-clone-block-consumable");
    var cloneBlockAttack = helper.e(".js-clone-block-attack");
    var cloneBlockNote = helper.e(".js-clone-block-note");

    var cloneAddConsumable = cloneBlockConsumable.querySelector(".js-clone-add-consumable");
    var cloneRemoveConsumable = cloneBlockConsumable.querySelector(".js-clone-remove");

    var cloneAddAttackMelee = cloneBlockAttack.querySelector(".js-clone-add-melee");
    var cloneAddAttackRanged = cloneBlockAttack.querySelector(".js-clone-add-ranged");
    var cloneRemoveAttack = cloneBlockAttack.querySelector(".js-clone-remove");

    var cloneAddCharacterNote = cloneBlockNote.querySelector(".js-clone-add-character-note");
    var cloneAddStoryNote = cloneBlockNote.querySelector(".js-clone-add-story-note");
    var cloneRemoveNote = cloneBlockNote.querySelector(".js-clone-remove");

    cloneAddConsumable.addEventListener("click", function() {
      _render_clone(1, "consumable");
      _updateCloneConsumable();
      _smoothScrollToClones("#equipment-consumables");
      sheet.storeCharacters();
      if (_getCloneCount("consumable") <= 99) {
        snack.render("Consumable added.");
      } else {
        snack.render("Too many consumables, (max 100)");
      };
    }, false);

    cloneRemoveConsumable.addEventListener("click", function() {
      _changeCloneState("consumable");
    }, false);

    cloneAddAttackMelee.addEventListener("click", function() {
      _render_clone(1, "attack-melee");
      _updateCloneAttackMelee();
      _smoothScrollToClones("#offense-attacks");
      sheet.storeCharacters();
      if (_getCloneCount("attack-melee") <= 99) {
        snack.render("Melee attack added.");
      } else {
        snack.render("Too many melee attacks, (max 100)");
      };
    }, false);

    cloneAddAttackRanged.addEventListener("click", function() {
      _render_clone(1, "attack-ranged");
      _updateCloneAttackRanged();
      _smoothScrollToClones("#offense-attacks");
      sheet.storeCharacters();
      if (_getCloneCount("attack-ranged") <= 99) {
        snack.render("Ranged attack added.");
      } else {
        snack.render("Too many ranged attacks, (max 100)");
      };
    }, false);

    cloneRemoveAttack.addEventListener("click", function() {
      _changeCloneState("attack");
    }, false);

    cloneAddCharacterNote.addEventListener("click", function() {
      _render_clone(1, "note-character");
      _updateCloneNoteCharacter();
      _smoothScrollToClones("#notes-character");
      sheet.storeCharacters();
      if (_getCloneCount("note-character") <= 99) {
        snack.render("Character note added.");
      } else {
        snack.render("Too many character notes, (max 100)");
      };
    }, false);

    cloneAddStoryNote.addEventListener("click", function() {
      _render_clone(1, "note-story");
      _updateCloneNoteStory();
      _smoothScrollToClones("#notes-character");
      sheet.storeCharacters();
      if (_getCloneCount("note-story") <= 99) {
        snack.render("Story note added.");
      } else {
        snack.render("Too many story notes, (max 100)");
      };
    }, false);

    cloneRemoveNote.addEventListener("click", function() {
      _changeCloneState("note");
    }, false);

  };

  function _render_clone(numberOfClones, cloneType) {
    var cloneBlock;
    var cloneTarget;
    if (cloneType == "attack-melee") {
      cloneBlock = helper.e(".js-clone-block-attack");
      cloneTarget = cloneBlock.querySelector(".js-clone-block-target-attack-melee");
    };
    if (cloneType == "attack-ranged") {
      cloneBlock = helper.e(".js-clone-block-attack");
      cloneTarget = cloneBlock.querySelector(".js-clone-block-target-attack-ranged");
    };
    if (cloneType == "consumable") {
      cloneBlock = helper.e(".js-clone-block-consumable");
      cloneTarget = cloneBlock.querySelector(".js-clone-block-target-consumable");
    };
    if (cloneType == "note-character") {
      cloneBlock = helper.e(".js-clone-block-note");
      cloneTarget = cloneBlock.querySelector(".js-clone-block-target-note-character");
    };
    if (cloneType == "note-story") {
      cloneBlock = helper.e(".js-clone-block-note");
      cloneTarget = cloneBlock.querySelector(".js-clone-block-target-note-story");
    };
    for (var i = 0; i < numberOfClones; i++) {
      var cloneCount = cloneTarget.querySelectorAll(".js-clone").length;
      var cloneString;
      var index = i;
      // check if adding new node or adding to clone target with already existing clones
      if (index < cloneCount) {
        index = cloneCount;
      };
      // make new clone node
      var newClone = document.createElement("div");
      newClone.setAttribute("class", "m-clone js-clone");
      newClone.setAttribute("data-clone-count", index);
      var newCloneFlash = document.createElement("span");
      newCloneFlash.setAttribute("class", "m-clone-flash");
      newCloneFlash.addEventListener("animationend", function(event, elapsed) {
        this.remove();
      }.bind(newCloneFlash), false);
      // newClone.setAttribute("data-attack-type", cloneType);
      if (cloneType == "consumable") {
        cloneString = _newConsumable(index);
      };
      if (cloneType == "attack-melee") {
        cloneString = _newAttackMelee(index);
      };
      if (cloneType == "attack-ranged") {
        cloneString = _newAttackRanged(index);
      };
      if (cloneType == "note-character") {
        cloneString = _newNoteCharacter(index);
      };
      if (cloneType == "note-story") {
        cloneString = _newNoteStory(index);
      };
      // add content
      newClone.innerHTML = cloneString;
      if (cloneBlock.dataset.deleteCloneState == "false" || !cloneBlock.dataset.deleteCloneState) {
        newClone.appendChild(newCloneFlash);
      };
      // max of 100 clones
      if (cloneCount <= 99) {
        // append new clone
        cloneTarget.appendChild(newClone);
        // bind listeners
        if (cloneType == "consumable") {
          _bind_cloneConsumableInput(newClone.querySelectorAll(".js-input-block"));
        };
        if (cloneType == "attack-melee") {
          _bind_cloneAttackMeleeInput(newClone.querySelectorAll(".js-input-block"));
        };
        if (cloneType == "attack-ranged") {
          _bind_cloneAttackRangedInput(newClone.querySelectorAll(".js-input-block"));
        };
        if (cloneType == "note-character") {
          _bind_cloneNoteCharacterTextarea(newClone.querySelector(".js-textarea-block"));
        };
        if (cloneType == "note-story") {
          _bind_cloneNoteStoryTextarea(newClone.querySelector(".js-textarea-block"));
        };
        _bind_cloneRemoveButton(newClone.querySelector(".js-clone-block-delete"), cloneType);
      };
    };
  };

  function _update_cloneInput(array, cloneType) {
    var cloneBlock;
    var cloneTarget;
    if (cloneType == "attack-melee") {
      cloneBlock = helper.e(".js-clone-block-attack");
      cloneTarget = cloneBlock.querySelector(".js-clone-block-target-attack-melee");
    };
    if (cloneType == "attack-ranged") {
      cloneBlock = helper.e(".js-clone-block-attack");
      cloneTarget = cloneBlock.querySelector(".js-clone-block-target-attack-ranged");
    };
    if (cloneType == "consumable") {
      cloneBlock = helper.e(".js-clone-block-consumable");
      cloneTarget = cloneBlock.querySelector(".js-clone-block-target-consumable");
    };
    for (var i = 0; i < array.length; i++) {
      for (var j in array[i]) {
        var input;
        if (cloneType == "consumable") {
          input = cloneTarget.querySelector("#consumable-" + j.replace(/_/g, "-") + "-" + i);
        };
        if (cloneType == "attack-melee") {
          input = cloneTarget.querySelector("#attack-melee-" + j.replace(/_/g, "-") + "-" + i);
        };
        if (cloneType == "attack-ranged") {
          input = cloneTarget.querySelector("#attack-ranged-" + j.replace(/_/g, "-") + "-" + i);
        };
        if (input) {
          input.value = array[i][j];
          inputBlock.update(input);
        };
      };
      totalBlock.update();
    };
  };

  function _update_cloneTextarea(array, cloneType) {
    var cloneBlock;
    var cloneTarget;
    if (cloneType == "note-character") {
      cloneBlock = helper.e(".js-clone-block-note");
      cloneTarget = cloneBlock.querySelector(".js-clone-block-target-note-character");
    };
    if (cloneType == "note-story") {
      cloneBlock = helper.e(".js-clone-block-note");
      cloneTarget = cloneBlock.querySelector(".js-clone-block-target-note-story");
    };
    for (var i = 0; i < array.length; i++) {
      for (var j in array[i]) {
        var textarea;
        if (cloneType == "note-character") {
          textarea = cloneTarget.querySelector("#note-character-" + i);
        };
        if (cloneType == "note-story") {
          textarea = cloneTarget.querySelector("#note-story-" + i);
        };
        if (textarea) {
          textarea.innerHTML = array[i][j];
          textareaBlock.update(textarea);
        };
      };
      totalBlock.update();
    };
  };

  function _getCloneCount(cloneType) {
    var cloneTarget;
    var cloneCount;
    if (cloneType == "attack-melee") {
      cloneTarget = helper.e(".js-clone-block-target-attack-melee");
      cloneCount = cloneTarget.querySelectorAll(".js-clone").length;
    };
    if (cloneType == "attack-ranged") {
      cloneTarget = helper.e(".js-clone-block-target-attack-ranged");
      cloneCount = cloneTarget.querySelectorAll(".js-clone").length;
    };
    if (cloneType == "consumable") {
      cloneTarget = helper.e(".js-clone-block-target-consumable");
      cloneCount = cloneTarget.querySelectorAll(".js-clone").length;
    };
    if (cloneType == "note-character") {
      cloneTarget = helper.e(".js-clone-block-target-note-character");
      cloneCount = cloneTarget.querySelectorAll(".js-clone").length;
    };
    if (cloneType == "note-story") {
      cloneTarget = helper.e(".js-clone-block-target-note-story");
      cloneCount = cloneTarget.querySelectorAll(".js-clone").length;
    };
    return cloneCount;
  };

  function _checkCloneState(cloneType) {
    var cloneBlock;
    var cloneTarget;
    if (cloneType == "consumable") {
      cloneBlock = helper.e(".js-clone-block-consumable");
      cloneTarget = cloneBlock.querySelector(".js-clone-block-target-consumable");
    };
    if (cloneType == "attack-melee") {
      cloneBlock = helper.e(".js-clone-block-attack");
      cloneTarget = cloneBlock.querySelector(".js-clone-block-target-attack-melee");
    };
    if (cloneType == "attack-ranged") {
      cloneBlock = helper.e(".js-clone-block-attack");
      cloneTarget = cloneBlock.querySelector(".js-clone-block-target-attack-ranged");
    };
    if (cloneType == "note-character") {
      cloneBlock = helper.e(".js-clone-block-note");
      cloneTarget = cloneBlock.querySelector(".js-clone-block-target-note-character");
    };
    if (cloneType == "note-story") {
      cloneBlock = helper.e(".js-clone-block-note");
      cloneTarget = cloneBlock.querySelector(".js-clone-block-target-note-story");
    };
    var cloneCount = cloneBlock.querySelectorAll(".js-clone");
    var cloneControls = cloneBlock.querySelector(".js-clone-controls");
    var cloneRemoveButton = cloneControls.querySelector(".js-clone-remove");
    if (cloneCount.length == 0) {
      cloneBlock.dataset.deleteCloneState = "false";
      helper.removeClass(cloneBlock, "is-delete-state");
      helper.removeClass(cloneRemoveButton, "is-active");
    };
  };

  function _bind_cloneRemoveButton(button, cloneType) {
    button.addEventListener("click", function() {
      _storeLastRemovedClone(this, cloneType);
      _update_clones(this, cloneType);
      sheet.storeCharacters();
    }, false);
  };

  function _update_clones(button, cloneType) {
    var cloneIndex = parseInt(helper.getClosest(button, ".js-clone").dataset.cloneCount, 10);
    var cloneTarget = helper.getClosest(button, ".js-clone-block-target");

    _removeCloneObject(cloneType, cloneIndex);
    _destroy_allClones(cloneType);

    if (cloneType == "consumable") {
      _render_clone(sheet.getCharacter().equipment.consumable.length, cloneType);
      _update_cloneInput(sheet.getCharacter().equipment.consumable, cloneType);
      snack.render("Consumable removed.", "Undo", _restoreLastRemovedClone, 6000);
    };
    if (cloneType == "attack-melee") {
      _render_clone(sheet.getCharacter().offense.attack.melee.length, cloneType);
      _update_cloneInput(sheet.getCharacter().offense.attack.melee, cloneType);
      snack.render("Melee attack removed.", "Undo", _restoreLastRemovedClone, 6000);
    };
    if (cloneType == "attack-ranged") {
      _render_clone(sheet.getCharacter().offense.attack.ranged.length, cloneType);
      _update_cloneInput(sheet.getCharacter().offense.attack.ranged, cloneType);
      snack.render("Ranged attack removed.", "Undo", _restoreLastRemovedClone, 6000);
    };
    if (cloneType == "note-character") {
      _render_clone(sheet.getCharacter().notes.character.length, cloneType);
      _update_cloneTextarea(sheet.getCharacter().notes.character, cloneType);
      snack.render("Character note removed.", "Undo", _restoreLastRemovedClone, 6000);
    };
    if (cloneType == "note-story") {
      _render_clone(sheet.getCharacter().notes.story.length, cloneType);
      _update_cloneTextarea(sheet.getCharacter().notes.story, cloneType);
      snack.render("Story note removed.", "Undo", _restoreLastRemovedClone, 6000);
    };

    _checkCloneState(cloneType);

  };

  function _restoreLastRemovedClone() {
    var undoData = JSON.parse(helper.read("lastRemovedClone"));

    _restoreCloneObject(undoData.cloneType, undoData.index, undoData.clone);
    _destroy_allClones(undoData.cloneType);

    if (undoData.cloneType == "consumable") {
      _render_clone(sheet.getCharacter().equipment.consumable.length, undoData.cloneType);
      _update_cloneInput(sheet.getCharacter().equipment.consumable, undoData.cloneType);
    };
    if (undoData.cloneType == "attack-melee") {
      _render_clone(sheet.getCharacter().offense.attack.melee.length, undoData.cloneType);
      _update_cloneInput(sheet.getCharacter().offense.attack.melee, undoData.cloneType);
    };
    if (undoData.cloneType == "attack-ranged") {
      _render_clone(sheet.getCharacter().offense.attack.ranged.length, undoData.cloneType);
      _update_cloneInput(sheet.getCharacter().offense.attack.ranged, undoData.cloneType);
    };
    if (undoData.cloneType == "note-character") {
      _render_clone(sheet.getCharacter().notes.character.length, undoData.cloneType);
      _update_cloneTextarea(sheet.getCharacter().notes.character, undoData.cloneType);
    };
    if (undoData.cloneType == "note-story") {
      _render_clone(sheet.getCharacter().notes.story.length, undoData.cloneType);
      _update_cloneTextarea(sheet.getCharacter().notes.story, undoData.cloneType);
    };

    _checkCloneState(undoData.cloneType);
    _removeLastRemovedClone();
  };

  function _storeLastRemovedClone(button, cloneType) {
    var cloneIndex = parseInt(helper.getClosest(button, ".js-clone").dataset.cloneCount, 10);
    var object = {
      cloneType: cloneType,
      index: cloneIndex,
      clone: {}
    };
    if (cloneType == "consumable") {
      object.clone = sheet.getCharacter().equipment.consumable[cloneIndex];
    };
    if (cloneType == "attack-melee") {
      object.clone = sheet.getCharacter().offense.attack.melee[cloneIndex];
    };
    if (cloneType == "attack-ranged") {
      object.clone = sheet.getCharacter().offense.attack.ranged[cloneIndex];
    };
    if (cloneType == "note-character") {
      object.clone = sheet.getCharacter().notes.character[cloneIndex];
    };
    if (cloneType == "note-story") {
      object.clone = sheet.getCharacter().notes.story[cloneIndex];
    };
    helper.store("lastRemovedClone", JSON.stringify(object));
  };

  function _removeLastRemovedClone() {
    helper.remove("lastRemovedClone");
  };

  function _removeCloneObject(cloneType, index) {
    if (cloneType == "consumable") {
      sheet.getCharacter().equipment.consumable.splice(index, 1);
    };
    if (cloneType == "attack-melee") {
      sheet.getCharacter().offense.attack.melee.splice(index, 1);
    };
    if (cloneType == "attack-ranged") {
      sheet.getCharacter().offense.attack.ranged.splice(index, 1);
    };
    if (cloneType == "note-character") {
      sheet.getCharacter().notes.character.splice(index, 1);
    };
    if (cloneType == "note-story") {
      sheet.getCharacter().notes.story.splice(index, 1);
    };
  };

  function _restoreCloneObject(cloneType, index, clone) {
    if (cloneType == "consumable") {
      sheet.getCharacter().equipment.consumable.splice(index, 0, clone);
    };
    if (cloneType == "attack-melee") {
      sheet.getCharacter().offense.attack.melee.splice(index, 0, clone);
    };
    if (cloneType == "attack-ranged") {
      sheet.getCharacter().offense.attack.ranged.splice(index, 0, clone);
    };
    if (cloneType == "note-character") {
      sheet.getCharacter().notes.character.splice(index, 0, clone);
    };
    if (cloneType == "note-story") {
      sheet.getCharacter().notes.story.splice(index, 0, clone);
    };
  };

  var storeInputTimer = null;
  var storeBlurTimer = null;

  function delayUpdate(type) {
    if (type == "attack-melee") {
      _updateCloneAttackMelee();
    };
    if (type == "attack-ranged") {
      _updateCloneAttackRanged();
    };
    if (type == "consumable") {
      _updateCloneConsumable();
    };
    if (type == "note-character") {
      _updateCloneNoteCharacter();
    };
    if (type == "note-story") {
      _updateCloneNoteStory();
    };
    totalBlock.update();
    sheet.storeCharacters();
    if (body.dataset.displayMode == "true") {
      display.clear();
      display.render();
    };
  };

  function _bind_cloneConsumableInput(array) {
    for (var i = 0; i < array.length; i++) {
      var input = array[i].querySelector(".js-input-block-field");
      if (input.classList.contains("js-clone-consumable-used") || input.classList.contains("js-clone-consumable-total")) {
        input.addEventListener("input", function() {
          _minMaxCountLimit(this);
        }, false);
      };
      input.addEventListener("input", function() {
        clearTimeout(storeInputTimer);
        storeInputTimer = setTimeout(delayUpdate, 1000, "consumable");
      }, false);
      input.addEventListener("focus", function() {
        inputBlock.focus(this);
      }, false);
      input.addEventListener("blur", function() {
        clearTimeout(storeInputTimer);
        storeInputTimer = setTimeout(delayUpdate, 1000, "consumable");
        inputBlock.focus(this);
      }, false);
    };
  };

  function _bind_cloneAttackMeleeInput(array) {
    for (var i = 0; i < array.length; i++) {
      var input = array[i].querySelector(".js-input-block-field");
      input.addEventListener("input", function() {
        clearTimeout(storeInputTimer);
        storeInputTimer = setTimeout(delayUpdate, 1000, "attack-melee");
      }, false);
      input.addEventListener("focus", function() {
        inputBlock.focus(this);
      }, false);
      input.addEventListener("blur", function() {
        clearTimeout(storeInputTimer);
        storeBlurTimer = setTimeout(delayUpdate, 1000, "attack-melee");
        inputBlock.focus(this);
      }, false);
    };
  };

  function _bind_cloneAttackRangedInput(array) {
    for (var i = 0; i < array.length; i++) {
      var input = array[i].querySelector(".js-input-block-field");
      input.addEventListener("input", function() {
        clearTimeout(storeInputTimer);
        storeInputTimer = setTimeout(delayUpdate, 1000, "attack-ranged");
      }, false);
      input.addEventListener("focus", function() {
        inputBlock.focus(this);
      }, false);
      input.addEventListener("blur", function() {
        clearTimeout(storeInputTimer);
        storeBlurTimer = setTimeout(delayUpdate, 1000, "attack-ranged");
        inputBlock.focus(this);
      }, false);
    };
  };

  function _bind_cloneNoteCharacterTextarea(element) {
    var textareaBlockField = element.querySelector(".js-textarea-block-field");
    var textareaBlockLabel = element.querySelector(".js-textarea-block-label");
    if (textareaBlockField) {
      textareaBlockField.addEventListener("input", function() {
        clearTimeout(storeInputTimer);
        storeInputTimer = setTimeout(delayUpdate, 1000, "note-character");
      }, false);
      textareaBlockField.addEventListener("focus", function() {
        textareaBlock.focus(this);
      }, false);
      textareaBlockField.addEventListener("blur", function() {
        storeInputTimer = setTimeout(delayUpdate, 1000, "note-character");
        textareaBlock.focus(this);
      }, false);
      textareaBlockField.addEventListener("paste", function(event) {
        helper.pasteStrip(event);
      });
    };
    if (textareaBlockLabel) {
      textareaBlockLabel.addEventListener("click", function() {
        textareaBlock.focusLabel(this);
      }, false);
    };
  };

  function _bind_cloneNoteStoryTextarea(element) {
    var textareaBlockField = element.querySelector(".js-textarea-block-field");
    var textareaBlockLabel = element.querySelector(".js-textarea-block-label");
    if (textareaBlockField) {
      textareaBlockField.addEventListener("input", function() {
        clearTimeout(storeInputTimer);
        storeInputTimer = setTimeout(delayUpdate, 1000, "note-story");
      }, false);
      textareaBlockField.addEventListener("focus", function() {
        textareaBlock.focus(this);
      }, false);
      textareaBlockField.addEventListener("blur", function() {
        storeInputTimer = setTimeout(delayUpdate, 1000, "note-story");
        textareaBlock.focus(this);
      }, false);
      textareaBlockField.addEventListener("paste", function(event) {
        helper.pasteStrip(event);
      });
    };
    if (textareaBlockLabel) {
      textareaBlockLabel.addEventListener("click", function() {
        textareaBlock.focusLabel(this);
      }, false);
    };
  };

  function _changeCloneState(cloneType) {
    var cloneBlock = helper.e(".js-clone-block-" + cloneType);
    var cloneControls = cloneBlock.querySelector(".js-clone-controls");
    var cloneRemoveButton = cloneControls.querySelector(".js-clone-remove");
    var cloneCount = cloneBlock.querySelectorAll(".js-clone").length;
    // change clone remove button
    helper.toggleClass(cloneRemoveButton, "is-active");
    // change clone block state
    if (cloneBlock.dataset.deleteCloneState == "false" || !cloneBlock.dataset.deleteCloneState) {
      helper.addClass(cloneBlock, "is-delete-state");
      cloneBlock.dataset.deleteCloneState = "true";
    } else {
      helper.removeClass(cloneBlock, "is-delete-state");
      cloneBlock.dataset.deleteCloneState = "false";
    };
    // if clone count us 0 remove restore all classes to normal
    if (cloneCount == 0) {
      helper.removeClass(cloneBlock, "is-delete-state");
      cloneBlock.dataset.deleteCloneState = "false";
      helper.removeClass(cloneRemoveButton, "is-active");
    };
  };

  function _destroy_allClones(cloneType) {
    var cloneTarget;
    if (cloneType == "attack-melee") {
      cloneTarget = helper.e(".js-clone-block-target-attack-melee");
    };
    if (cloneType == "attack-ranged") {
      cloneTarget = helper.e(".js-clone-block-target-attack-ranged");
    };
    if (cloneType == "consumable") {
      cloneTarget = helper.e(".js-clone-block-target-consumable");
    };
    if (cloneType == "note-character") {
      cloneTarget = helper.e(".js-clone-block-target-note-character");
    };
    if (cloneType == "note-story") {
      cloneTarget = helper.e(".js-clone-block-target-note-story");
    };
    while (cloneTarget.lastChild) {
      cloneTarget.removeChild(cloneTarget.lastChild);
    };
  };

  function _createAttackMeleeObject(weapon, attack, damage, critical) {
    return {
      weapon: this.weapon = weapon,
      attack: this.attack = attack,
      damage: this.damage = damage,
      critical: this.critical = critical
    };
  };

  function _createAttackRangedObject(weapon, attack, damage, critical, range, ammo) {
    return {
      weapon: this.weapon = weapon,
      attack: this.attack = attack,
      damage: this.damage = damage,
      critical: this.critical = critical,
      range: this.range = range,
      ammo: this.ammo = ammo,
    };
  };

  function _createConsumableObject(item, current, total, used) {
    return {
      item: this.item = item,
      current: this.current = current,
      total: this.total = total,
      used: this.used = used
    };
  };

  function _createNoteCharacter(data) {
    return {
      note: this.data = data
    };
  };

  function _createNoteStory(data) {
    return {
      note: this.data = data
    };
  };

  function _updateCloneAttackMelee() {
    var cloneTarget = helper.e(".js-clone-block-target-attack-melee");
    var all_clone = cloneTarget.querySelectorAll(".js-clone");
    var cloneAttack = [];
    for (var i = 0; i < all_clone.length; i++) {
      var weapon = all_clone[i].querySelector(".js-clone-attack-melee-weapon").value || "";
      var attack = all_clone[i].querySelector(".js-clone-attack-melee-attack").value || "";
      var damage = all_clone[i].querySelector(".js-clone-attack-melee-damage").value || "";
      var critical = all_clone[i].querySelector(".js-clone-attack-melee-critical").value || "";
      var newAttackMelee = new _createAttackMeleeObject(weapon, attack, damage, critical);
      cloneAttack.push(newAttackMelee);
    };
    sheet.getCharacter().offense.attack.melee = cloneAttack;
  };

  function _updateCloneAttackRanged() {
    var cloneTarget = helper.e(".js-clone-block-target-attack-ranged");
    var all_clone = cloneTarget.querySelectorAll(".js-clone");
    var cloneAttack = [];
    for (var i = 0; i < all_clone.length; i++) {
      var weapon = all_clone[i].querySelector(".js-clone-attack-ranged-weapon").value || "";
      var attack = all_clone[i].querySelector(".js-clone-attack-ranged-attack").value || "";
      var damage = all_clone[i].querySelector(".js-clone-attack-ranged-damage").value || "";
      var critical = all_clone[i].querySelector(".js-clone-attack-ranged-critical").value || "";
      var range = all_clone[i].querySelector(".js-clone-attack-ranged-range").value || "";
      var ammo = all_clone[i].querySelector(".js-clone-attack-ranged-ammo").value || "";
      var newAttackRanged = new _createAttackRangedObject(weapon, attack, damage, critical, range, ammo);
      cloneAttack.push(newAttackRanged);
    };
    sheet.getCharacter().offense.attack.ranged = cloneAttack;
  };

  function _updateCloneConsumable() {
    var cloneTarget = helper.e(".js-clone-block-target-consumable");
    var all_clone = cloneTarget.querySelectorAll(".js-clone");
    var cloneConsumable = [];
    for (var i = 0; i < all_clone.length; i++) {
      var item = all_clone[i].querySelector(".js-clone-consumable-item").value || "";
      var current = all_clone[i].querySelector(".js-clone-consumable-current").innerHTML || "";
      var total = all_clone[i].querySelector(".js-clone-consumable-total").value || "";
      var used = all_clone[i].querySelector(".js-clone-consumable-used").value || "";
      var newConsumable = new _createConsumableObject(item, current, total, used);
      cloneConsumable.push(newConsumable);
    };
    sheet.getCharacter().equipment.consumable = cloneConsumable;
  };

  function _updateCloneNoteCharacter() {
    var cloneTarget = helper.e(".js-clone-block-target-note-character");
    var all_clone = cloneTarget.querySelectorAll(".js-clone");
    var cloneNote = [];
    for (var i = 0; i < all_clone.length; i++) {
      var textarea = all_clone[i].querySelector(".js-textarea-block-field").innerHTML || "";
      var newNote = new _createNoteCharacter(textarea);
      cloneNote.push(newNote);
    };
    sheet.getCharacter().notes.character = cloneNote;
  };

  function _updateCloneNoteStory() {
    var cloneTarget = helper.e(".js-clone-block-target-note-story");
    var all_clone = cloneTarget.querySelectorAll(".js-clone");
    var cloneNote = [];
    for (var i = 0; i < all_clone.length; i++) {
      var textarea = all_clone[i].querySelector(".js-textarea-block-field").innerHTML || "";
      var newNote = new _createNoteStory(textarea);
      cloneNote.push(newNote);
    };
    sheet.getCharacter().notes.story = cloneNote;
  };

  function clear() {
    // console.log("--- clone clear fired ---");
    // not sure why clear is firing twice on character change, must investigate
    var all_cloneTarget = helper.eA(".js-clone-block-target");
    for (var i = 0; i < all_cloneTarget.length; i++) {
      // console.log("\t for running on " + all_cloneTarget[i].classList[2]);
      while (all_cloneTarget[i].lastChild) {
        all_cloneTarget[i].removeChild(all_cloneTarget[i].lastChild);
      };
    };
  };

  // exposed methods
  return {
    bind: bind,
    clear: clear,
    render: render
  };

})();
