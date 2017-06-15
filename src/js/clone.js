var clone = (function() {

  function render() {
    var all_attackMelee = sheet.getCharacter().offense.attack.melee;
    var all_attackRanged = sheet.getCharacter().offense.attack.ranged;
    var all_consumable = sheet.getCharacter().equipment.consumable;
    var all_noteCharacter = sheet.getCharacter().notes.character;
    var all_noteStory = sheet.getCharacter().notes.story;

    _render_all_clones("attack-melee");
    _render_all_clones("attack-ranged");
    _render_all_clones("consumable");
    _render_all_clones("note-character");
    _render_all_clones("note-story");

    _upddate_consumableTotals();

    _update_cloneInput(_get_cloneObjects("attack-melee"), "attack-melee");
    _update_cloneInput(_get_cloneObjects("attack-ranged"), "attack-ranged");
    _update_cloneInput(_get_cloneObjects("consumable"), "consumable");
    _update_cloneTextarea(_get_cloneObjects("note-character"), "note-character");
    _update_cloneTextarea(_get_cloneObjects("note-story"), "note-story");

    _update_clonePlaceholder("attack-melee");
    _update_clonePlaceholder("attack-ranged");
    _update_clonePlaceholder("consumable");
    _update_clonePlaceholder("note-character");
    _update_clonePlaceholder("note-story");
  };

  function _upddate_consumableTotals() {
    var all_consumable = _get_cloneObjects("consumable");
    for (var i = 0; i < all_consumable.length; i++) {
      var newCurrent = (parseInt(all_consumable[i].total, 10) || 0) - (parseInt(all_consumable[i].used, 10) || 0);
      sheet.getCharacter().equipment.consumable[i].current = newCurrent;
    };
  };

  function _smoothScrollToClones(cloneType) {
    var cloneTarget = _get_cloneTarget(cloneType);
    var targetTop = cloneTarget.lastChild.getBoundingClientRect().top;
    var targetBottom = cloneTarget.lastChild.getBoundingClientRect().bottom;
    var windowHeight = window.innerHeight;
    var quickNavHeight;
    // if nav is on the left after 900px wide viewport
    if (document.documentElement.clientWidth >= 900) {
      quickNavHeight = 0;
    } else {
      quickNavHeight = parseInt(getComputedStyle(document.querySelector(".js-quick-nav")).height, 10);
    };
    if (body.dataset.displayMode == "false" || !body.dataset.displayMode) {
      if (targetTop > (windowHeight - (windowHeight / 6)) || targetBottom <= 0) {
        var offset = (windowHeight - (windowHeight / 2));
        var options = {
          speed: 300,
          offset: offset
        };
        smoothScroll.animateScroll(null, "#" + cloneTarget.lastChild.id, options);
      };
    };
  };

  function _newConsumable(index) {
    var cloneString =
      '<div class="m-clone-block-content js-clone-block-content">' +
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
      '            <p class="u-text-center u-margin-with-input u-background-with-input u-inline-with-input u-underline-with-input m-total-block-total js-total-block-total js-clone-consumable-current">0</p>' +
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
      '<div class="m-clone-block-content m-clone-block-content-box js-clone-block-content">' +
      '  <div class="row">' +
      '    <div class="col-xs-12">' +
      '      <div class="row no-gutter">' +
      '        <div class="col-xs-6">' +
      '          <div class="m-input-block js-input-block">' +
      '            <label class="m-input-block-label js-input-block-label" for="attack-melee-weapon-' + index + '">Weapon</label>' +
      '            <input id="attack-melee-weapon-' + index + '" class="m-input-block-field u-full-width js-input-block-field js-clone-attack-melee-weapon" type="text" tabindex="3">' +
      '          </div>' +
      '        </div>' +
      '        <div class="col-xs-6">' +
      '          <div class="m-input-block js-input-block">' +
      '            <label class="m-input-block-label js-input-block-label" for="attack-melee-attack-' + index + '">Attack</label>' +
      '            <input id="attack-melee-attack-' + index + '" class="m-input-block-field u-full-width js-input-block-field js-clone-attack-melee-attack" type="text" tabindex="3">' +
      '          </div>' +
      '        </div>' +
      '        <div class="col-xs-6">' +
      '          <div class="m-input-block js-input-block">' +
      '            <label class="m-input-block-label js-input-block-label" for="attack-melee-damage-' + index + '">Damage</label>' +
      '            <input id="attack-melee-damage-' + index + '" class="m-input-block-field u-full-width js-input-block-field js-clone-attack-melee-damage" type="text" tabindex="3">' +
      '          </div>' +
      '        </div>' +
      '        <div class="col-xs-6">' +
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
      '<div class="m-clone-block-content m-clone-block-content-box js-clone-block-content">' +
      '  <div class="row">' +
      '    <div class="col-xs-12">' +
      '      <div class="row no-gutter">' +
      '        <div class="col-xs-6">' +
      '          <div class="m-input-block js-input-block">' +
      '            <label class="m-input-block-label js-input-block-label" for="attack-ranged-weapon-' + index + '">Weapon</label>' +
      '            <input id="attack-ranged-weapon-' + index + '" class="m-input-block-field u-full-width js-input-block-field js-clone-attack-ranged-weapon" type="text" tabindex="3">' +
      '          </div>' +
      '        </div>' +
      '        <div class="col-xs-6">' +
      '          <div class="m-input-block js-input-block">' +
      '            <label class="m-input-block-label js-input-block-label" for="attack-ranged-attack-' + index + '">Attack</label>' +
      '            <input id="attack-ranged-attack-' + index + '" class="m-input-block-field u-full-width js-input-block-field js-clone-attack-ranged-attack" type="text" tabindex="3">' +
      '          </div>' +
      '        </div>' +
      '        <div class="col-xs-6">' +
      '          <div class="m-input-block js-input-block">' +
      '            <label class="m-input-block-label js-input-block-label" for="attack-ranged-damage-' + index + '">Damage</label>' +
      '            <input id="attack-ranged-damage-' + index + '" class="m-input-block-field u-full-width js-input-block-field js-clone-attack-ranged-damage" type="text" tabindex="3">' +
      '          </div>' +
      '        </div>' +
      '        <div class="col-xs-6">' +
      '          <div class="m-input-block js-input-block">' +
      '            <label class="m-input-block-label js-input-block-label" for="attack-ranged-critical-' + index + '">Critical</label>' +
      '            <input id="attack-ranged-critical-' + index + '" class="m-input-block-field u-full-width js-input-block-field js-clone-attack-ranged-critical" type="text" tabindex="3">' +
      '          </div>' +
      '        </div>' +
      '        <div class="col-xs-6">' +
      '          <div class="m-input-block js-input-block">' +
      '            <label class="m-input-block-label js-input-block-label" for="attack-ranged-range-' + index + '">Range</label>' +
      '            <input id="attack-ranged-range-' + index + '" class="m-input-block-field u-full-width js-input-block-field js-clone-attack-ranged-range" type="text" tabindex="3">' +
      '          </div>' +
      '        </div>' +
      '        <div class="col-xs-6">' +
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
      '<div class="m-clone-block-content js-clone-block-content">' +
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
      '<div class="m-clone-block-content js-clone-block-content">' +
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

  function _get_cloneObjects(cloneType) {
    var object;
    if (cloneType == "consumable") {
      object = sheet.getCharacter().equipment.consumable;
    };
    if (cloneType == "attack-melee") {
      object = sheet.getCharacter().offense.attack.melee;
    };
    if (cloneType == "attack-ranged") {
      object = sheet.getCharacter().offense.attack.ranged;
    };
    if (cloneType == "note-character") {
      object = sheet.getCharacter().notes.character;
    };
    if (cloneType == "note-story") {
      object = sheet.getCharacter().notes.story;
    };
    return object;
  };

  function _get_cloneString(cloneType, cloneIndex) {
    var cloneString;
    if (cloneType == "consumable") {
      cloneString = _newConsumable(cloneIndex);
    };
    if (cloneType == "attack-melee") {
      cloneString = _newAttackMelee(cloneIndex);
    };
    if (cloneType == "attack-ranged") {
      cloneString = _newAttackRanged(cloneIndex);
    };
    if (cloneType == "note-character") {
      cloneString = _newNoteCharacter(cloneIndex);
    };
    if (cloneType == "note-story") {
      cloneString = _newNoteStory(cloneIndex);
    };
    return cloneString;
  };

  function _get_cloneBlock(cloneType) {
    var cloneBlock;
    if (cloneType == "attack-melee") {
      cloneBlock = helper.e(".js-clone-block-attack");
    };
    if (cloneType == "attack-ranged") {
      cloneBlock = helper.e(".js-clone-block-attack");
    };
    if (cloneType == "consumable") {
      cloneBlock = helper.e(".js-clone-block-consumable");
    };
    if (cloneType == "note-character") {
      cloneBlock = helper.e(".js-clone-block-note");
    };
    if (cloneType == "note-story") {
      cloneBlock = helper.e(".js-clone-block-note");
    };
    return cloneBlock;
  };

  function _get_cloneTarget(cloneType) {
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
    return cloneTarget;
  };

  function _get_cloneCount(cloneType, mixed) {
    var cloneCount;
    if (cloneType == "attack-melee") {
      cloneCount = sheet.getCharacter().offense.attack.melee.length;
    };
    if (cloneType == "attack-ranged") {
      cloneCount = sheet.getCharacter().offense.attack.ranged.length;
    };
    if (cloneType == "consumable") {
      cloneCount = sheet.getCharacter().equipment.consumable.length;
    };
    if (cloneType == "note-character") {
      cloneCount = sheet.getCharacter().notes.character.length;
    };
    if (cloneType == "note-story") {
      cloneCount = sheet.getCharacter().notes.story.length;
    };
    if (cloneType == "note" || cloneType == "note-character" && mixed || cloneType == "note-story" && mixed) {
      cloneCount = sheet.getCharacter().notes.story.length + sheet.getCharacter().notes.character.length;
    };
    if (cloneType == "attack" || cloneType == "attack-melee" && mixed || cloneType == "attack-ranged" && mixed) {
      cloneCount = sheet.getCharacter().offense.attack.melee.length + sheet.getCharacter().offense.attack.ranged.length;
    };
    return cloneCount;
  };

  function _get_placeholderClone(cloneType) {
    var clonePlaceholder;
    if (cloneType == "attack-melee") {
      clonePlaceholder = helper.e(".js-placeholder-clone-attack-melee");
    };
    if (cloneType == "attack-ranged") {
      clonePlaceholder = helper.e(".js-placeholder-clone-attack-ranged");
    };
    if (cloneType == "consumable") {
      clonePlaceholder = helper.e(".js-placeholder-clone-consumable");
    };
    if (cloneType == "note-character") {
      clonePlaceholder = helper.e(".js-placeholder-clone-note-character");
    };
    if (cloneType == "note-story") {
      clonePlaceholder = helper.e(".js-placeholder-clone-note-story");
    };
    return clonePlaceholder;
  };

  function _get_maxCloneMessage(cloneType) {
    var message = "Max 100, do you need that many";
    if (cloneType == "attack-melee") {
      message = message + " Melee Attacks?";
    };
    if (cloneType == "attack-ranged") {
      message = message + " Ranged Attacks?";
    };
    if (cloneType == "consumable") {
      message = message + " Consumables?";
    };
    if (cloneType == "note-character") {
      message = message + " Character Notes?";
    };
    if (cloneType == "note-story") {
      message = message + " Story Notes?";
    };
    return message;
  };

  function _get_undoRemoveCloneMessage(cloneType) {
    var message = "removed.";
    if (cloneType == "attack-melee") {
      message = "Melee attack " + message;
    };
    if (cloneType == "attack-ranged") {
      message = "Ranged attack " + message;
    };
    if (cloneType == "consumable") {
      message = "Consumable " + message;
    };
    if (cloneType == "note-character") {
      message = "Character note " + message;
    };
    if (cloneType == "note-story") {
      message = "Story note " + message;
    };
    return message;
  };

  function _bind_clone(cloneType, newClone) {
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
  };

  function _bind_cloneRemoveButton(button, cloneType) {
    button.addEventListener("click", function() {
      _store_lastRemovedClone(this, cloneType);
      _update_clones(this, cloneType);
      _checkCloneState(cloneType, true);
      _update_clonePlaceholder(cloneType);
      sheet.storeCharacters();
    }, false);
  };

  function _bind_cloneControls() {
    var cloneBlockConsumable = helper.e(".js-clone-block-consumable");
    var cloneBlockAttack = helper.e(".js-clone-block-attack");
    var cloneBlockNote = helper.e(".js-clone-block-note");

    var cloneAddConsumable = cloneBlockConsumable.querySelector(".js-clone-add-consumable");
    var cloneRemoveConsumable = cloneBlockConsumable.querySelector(".js-clone-remove");
    // var cloneAddConsumablePlaceholder = cloneBlockConsumable.querySelector(".js-clone-add-consumable-placeholder");

    var cloneAddAttackMelee = cloneBlockAttack.querySelector(".js-clone-add-melee");
    var cloneAddAttackRanged = cloneBlockAttack.querySelector(".js-clone-add-ranged");
    var cloneRemoveAttack = cloneBlockAttack.querySelector(".js-clone-remove");
    // var cloneAddAttackMeleePlaceholder = cloneBlockAttack.querySelector(".js-clone-add-melee-placeholder");
    // var cloneAddAttackRangedPlaceholder = cloneBlockAttack.querySelector(".js-clone-add-ranged-placeholder");

    var cloneAddCharacterNote = cloneBlockNote.querySelector(".js-clone-add-character-note");
    var cloneAddStoryNote = cloneBlockNote.querySelector(".js-clone-add-story-note");
    var cloneRemoveNote = cloneBlockNote.querySelector(".js-clone-remove");
    // var cloneAddCharacterNotePlaceholder = cloneBlockNote.querySelector(".js-clone-add-character-note-placeholder");
    // var cloneAddStoryNotePlaceholder = cloneBlockNote.querySelector(".js-clone-add-story-note-placeholder");

    cloneAddConsumable.addEventListener("click", function() {
      _addNewClone("consumable");
      sheet.storeCharacters();
    }, false);

    // cloneAddConsumablePlaceholder.addEventListener("click", function() {
    //   _addNewClone("consumable");
    //   sheet.storeCharacters();
    // }, false);

    cloneAddAttackMelee.addEventListener("click", function() {
      _addNewClone("attack-melee");
      sheet.storeCharacters();
    }, false);

    cloneAddAttackRanged.addEventListener("click", function() {
      _addNewClone("attack-ranged");
      sheet.storeCharacters();
    }, false);

    // cloneAddAttackMeleePlaceholder.addEventListener("click", function() {
    //   _addNewClone("attack-melee");
    //   sheet.storeCharacters();
    // }, false);

    // cloneAddAttackRangedPlaceholder.addEventListener("click", function() {
    //   _addNewClone("attack-ranged");
    //   sheet.storeCharacters();
    // }, false);

    cloneAddCharacterNote.addEventListener("click", function() {
      _addNewClone("note-character");
      sheet.storeCharacters();
    }, false);

    cloneAddStoryNote.addEventListener("click", function() {
      _addNewClone("note-story");
      sheet.storeCharacters();
    }, false);

    // cloneAddCharacterNotePlaceholder.addEventListener("click", function() {
    //   _addNewClone("note-character");
    //   sheet.storeCharacters();
    // }, false);

    // cloneAddStoryNotePlaceholder.addEventListener("click", function() {
    //   _addNewClone("note-story");
    //   sheet.storeCharacters();
    // }, false);

    cloneRemoveAttack.addEventListener("click", function() {
      _change_cloneState("attack");
    }, false);

    cloneRemoveConsumable.addEventListener("click", function() {
      _change_cloneState("consumable");
    }, false);

    cloneRemoveNote.addEventListener("click", function() {
      _change_cloneState("note");
    }, false);
  };

  function bind() {
    _bind_cloneControls();
  };

  function _addNewClone(cloneType) {
    if (_get_cloneCount(cloneType) <= 99) {
      _add_cloneObject(cloneType);
      _render_clone(cloneType);
      _update_clonePlaceholder(cloneType);
      _smoothScrollToClones(cloneType);
    } else {
      _render_maxClonesSnack(cloneType);
    };
  };

  function _render_maxClonesSnack(cloneType) {
    snack.render(_get_maxCloneMessage(cloneType));
  };

  function _render_clone(cloneType) {
    var cloneTarget = _get_cloneTarget(cloneType);
    var cloneLength = _get_cloneCount(cloneType);
    var cloneIndex = cloneLength - 1;
    var cloneString = _get_cloneString(cloneType, cloneIndex);
    // make new clone node
    var newClone = document.createElement("div");
    newClone.setAttribute("id", "clone-" + cloneType + "-" + cloneIndex);
    newClone.setAttribute("class", "m-clone js-clone");
    newClone.setAttribute("data-clone-count", cloneIndex);
    // add content
    newClone.innerHTML = cloneString;
    var newCloneFlash = document.createElement("span");
    newCloneFlash.setAttribute("class", "m-clone-flash");
    newCloneFlash.addEventListener("animationend", function(event, elapsed) {
      this.remove();
    }.bind(newCloneFlash), false);
    var cloneBlockDelete = newClone.querySelector(".js-clone-block-delete");
    var cloneBlockContent = newClone.querySelector(".js-clone-block-content");
    helper.addClass(cloneBlockContent, "is-small");
    cloneBlockContent.appendChild(newCloneFlash);
    // append new clone
    cloneTarget.appendChild(newClone);
    getComputedStyle(cloneBlockContent).transform;
    helper.removeClass(cloneBlockContent, "is-small");
    // bind listeners
    _bind_clone(cloneType, newClone);
    _bind_cloneRemoveButton(cloneBlockDelete, cloneType);
  };

  function _render_all_clones(cloneType) {
    var cloneTarget = _get_cloneTarget(cloneType);
    var cloneLength = _get_cloneCount(cloneType);
    for (var i = 0; i < cloneLength; i++) {
      var cloneIndex = i;
      // make new clone node
      var cloneString = _get_cloneString(cloneType, cloneIndex);
      var newClone = document.createElement("div");
      newClone.setAttribute("id", "clone-" + cloneType + "-" + cloneIndex);
      newClone.setAttribute("class", "m-clone js-clone");
      newClone.setAttribute("data-clone-count", cloneIndex);
      // add content
      newClone.innerHTML = cloneString;
      // append new clone
      cloneTarget.appendChild(newClone);
      // bind listeners
      _bind_clone(cloneType, newClone);
      _bind_cloneRemoveButton(newClone.querySelector(".js-clone-block-delete"), cloneType);
    };
  };

  function _update_cloneInput(array, cloneType) {
    var cloneBlock = _get_cloneBlock(cloneType);
    var cloneTarget = _get_cloneTarget(cloneType);
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
    };
    // totalBlock.update();
  };

  function _update_cloneTextarea(array, cloneType) {
    var cloneBlock = _get_cloneBlock(cloneType);
    var cloneTarget = _get_cloneTarget(cloneType);
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
    };
    // totalBlock.update();
  };

  function _checkCloneState(cloneType) {
    var cloneBlock = _get_cloneBlock(cloneType);
    var cloneTarget = _get_cloneTarget(cloneType);
    var cloneCount = _get_cloneCount(cloneType, true);
    var cloneControls = cloneBlock.querySelector(".js-clone-controls");
    var cloneRemoveButton = cloneControls.querySelector(".js-clone-remove");
    if (cloneCount == 0) {
      cloneBlock.dataset.deleteCloneState = "false";
      helper.removeClass(cloneBlock, "is-delete-state");
      helper.removeClass(cloneRemoveButton, "is-active");
    };
  };

  function _update_clones(button, cloneType) {
    var cloneIndex = parseInt(helper.getClosest(button, ".js-clone").dataset.cloneCount, 10);
    var undoMessage = _get_undoRemoveCloneMessage(cloneType);

    _remove_cloneObject(cloneType, cloneIndex);
    _destroy_allClones(cloneType);
    _render_all_clones(cloneType);

    _update_cloneInput(_get_cloneObjects(cloneType), cloneType);
    _update_cloneInput(_get_cloneObjects(cloneType), cloneType);
    _update_cloneInput(_get_cloneObjects(cloneType), cloneType);
    _update_cloneTextarea(_get_cloneObjects(cloneType), cloneType);
    _update_cloneTextarea(_get_cloneObjects(cloneType), cloneType);

    snack.render(_get_undoRemoveCloneMessage(cloneType), "Undo", _restoreLastRemovedClone, 6000);
    totalBlock.update();
  };

  function _restoreLastRemovedClone() {
    var undoData = JSON.parse(helper.read("lastRemovedClone"));

    _restoreCloneObject(undoData.cloneType, undoData.index, undoData.clone);
    _destroy_allClones(undoData.cloneType);
    _render_all_clones(undoData.cloneType);

    _update_cloneInput(_get_cloneObjects(undoData.cloneType), undoData.cloneType);
    _update_cloneInput(_get_cloneObjects(undoData.cloneType), undoData.cloneType);
    _update_cloneInput(_get_cloneObjects(undoData.cloneType), undoData.cloneType);
    _update_cloneTextarea(_get_cloneObjects(undoData.cloneType), undoData.cloneType);
    _update_cloneTextarea(_get_cloneObjects(undoData.cloneType), undoData.cloneType);

    _update_clonePlaceholder(undoData.cloneType);
    _remove_lastRemovedClone();
    totalBlock.update();
  };

  function _store_lastRemovedClone(button, cloneType) {
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

  function _remove_lastRemovedClone() {
    helper.remove("lastRemovedClone");
  };

  function _remove_cloneObject(cloneType, index) {
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

  function _restoreCloneObject(cloneType, index, cloneObject) {
    if (cloneType == "consumable") {
      sheet.getCharacter().equipment.consumable.splice(index, 0, cloneObject);
    };
    if (cloneType == "attack-melee") {
      sheet.getCharacter().offense.attack.melee.splice(index, 0, cloneObject);
    };
    if (cloneType == "attack-ranged") {
      sheet.getCharacter().offense.attack.ranged.splice(index, 0, cloneObject);
    };
    if (cloneType == "note-character") {
      sheet.getCharacter().notes.character.splice(index, 0, cloneObject);
    };
    if (cloneType == "note-story") {
      sheet.getCharacter().notes.story.splice(index, 0, cloneObject);
    };
  };

  var storeInputTimer = null;
  var storeBlurTimer = null;

  function delayUpdate(cloneType, element) {
    var clone = helper.getClosest(element, ".js-clone");
    var cloneIndex = parseInt(clone.dataset.cloneCount, 10);
    _update_cloneObject(cloneType, cloneIndex, clone);
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
        storeInputTimer = setTimeout(delayUpdate, 1000, "consumable", this);
      }, false);
      input.addEventListener("focus", function() {
        inputBlock.focus(this);
      }, false);
      input.addEventListener("blur", function() {
        clearTimeout(storeInputTimer);
        storeInputTimer = setTimeout(delayUpdate, 1000, "consumable", this);
        inputBlock.focus(this);
      }, false);
    };
  };

  function _bind_cloneAttackMeleeInput(array) {
    for (var i = 0; i < array.length; i++) {
      var input = array[i].querySelector(".js-input-block-field");
      input.addEventListener("input", function() {
        clearTimeout(storeInputTimer);
        storeInputTimer = setTimeout(delayUpdate, 1000, "attack-melee", this);
      }, false);
      input.addEventListener("focus", function() {
        inputBlock.focus(this);
      }, false);
      input.addEventListener("blur", function() {
        clearTimeout(storeInputTimer);
        storeBlurTimer = setTimeout(delayUpdate, 1000, "attack-melee", this);
        inputBlock.focus(this);
      }, false);
    };
  };

  function _bind_cloneAttackRangedInput(array) {
    for (var i = 0; i < array.length; i++) {
      var input = array[i].querySelector(".js-input-block-field");
      input.addEventListener("input", function() {
        clearTimeout(storeInputTimer);
        storeInputTimer = setTimeout(delayUpdate, 1000, "attack-ranged", this);
      }, false);
      input.addEventListener("focus", function() {
        inputBlock.focus(this);
      }, false);
      input.addEventListener("blur", function() {
        clearTimeout(storeInputTimer);
        storeBlurTimer = setTimeout(delayUpdate, 1000, "attack-ranged", this);
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
        storeInputTimer = setTimeout(delayUpdate, 1000, "note-character", this);
      }, false);
      textareaBlockField.addEventListener("focus", function() {
        textareaBlock.focus(this);
      }, false);
      textareaBlockField.addEventListener("blur", function() {
        storeInputTimer = setTimeout(delayUpdate, 1000, "note-character", this);
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
        storeInputTimer = setTimeout(delayUpdate, 1000, "note-story", this);
      }, false);
      textareaBlockField.addEventListener("focus", function() {
        textareaBlock.focus(this);
      }, false);
      textareaBlockField.addEventListener("blur", function() {
        storeInputTimer = setTimeout(delayUpdate, 1000, "note-story", this);
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

  function _change_cloneState(cloneType) {
    var cloneBlock = helper.e(".js-clone-block-" + cloneType);
    var cloneControls = cloneBlock.querySelector(".js-clone-controls");
    var cloneRemoveButton = cloneControls.querySelector(".js-clone-remove");
    var cloneCount = _get_cloneCount(cloneType);
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
    // if clone count is 0 restore all classes to normal
    if (cloneCount == 0) {
      helper.removeClass(cloneBlock, "is-delete-state");
      cloneBlock.dataset.deleteCloneState = "false";
      helper.removeClass(cloneRemoveButton, "is-active");
    };
  };

  function _destroy_allClones(cloneType) {
    var cloneTarget = _get_cloneTarget(cloneType);
    while (cloneTarget.lastChild) {
      cloneTarget.removeChild(cloneTarget.lastChild);
    };
  };

  function _create_attackMeleeObject(weapon, attack, damage, critical) {
    return {
      weapon: this.weapon = weapon || "",
      attack: this.attack = attack || "",
      damage: this.damage = damage || "",
      critical: this.critical = critical || ""
    };
  };

  function _create_attackRangedObject(weapon, attack, damage, critical, range, ammo) {
    return {
      weapon: this.weapon = weapon || "",
      attack: this.attack = attack || "",
      damage: this.damage = damage || "",
      critical: this.critical = critical || "",
      range: this.range = range || "",
      ammo: this.ammo = ammo || ""
    };
  };

  function _create_consumableObject(item, current, total, used) {
    return {
      item: this.item = item || "",
      current: this.current = current || "",
      total: this.total = total || "",
      used: this.used = used || ""
    };
  };

  function _create_noteCharacter(data) {
    return {
      note: this.data = data || ""
    };
  };

  function _create_noteStory(data) {
    return {
      note: this.data = data || ""
    };
  };

  function _add_cloneObject(cloneType) {
    var newClone;
    if (sheet.getCharacter().offense.attack.melee.length <= 99) {
      if (cloneType == "attack-melee") {
        newClone = new _create_attackMeleeObject();
        sheet.getCharacter().offense.attack.melee.push(newClone);
      };
    };
    if (sheet.getCharacter().offense.attack.ranged.length <= 99) {
      if (cloneType == "attack-ranged") {
        newClone = new _create_attackRangedObject();
        sheet.getCharacter().offense.attack.ranged.push(newClone);
      };
    };
    if (sheet.getCharacter().equipment.consumable.length <= 99) {
      if (cloneType == "consumable") {
        newClone = new _create_consumableObject();
        sheet.getCharacter().equipment.consumable.push(newClone);
      };
    };
    if (sheet.getCharacter().notes.character.length <= 99) {
      if (cloneType == "note-character") {
        newClone = new _create_noteCharacter();
        sheet.getCharacter().notes.character.push(newClone);
      };
    };
    if (sheet.getCharacter().notes.story.length <= 99) {
      if (cloneType == "note-story") {
        newClone = new _create_noteStory();
        sheet.getCharacter().notes.story.push(newClone);
      };
    };
  };

  function _update_cloneObject(cloneType, cloneIndex, clone) {
    if (cloneType == "attack-melee") {
      var weapon = clone.querySelector(".js-clone-attack-melee-weapon").value;
      var attack = clone.querySelector(".js-clone-attack-melee-attack").value;
      var damage = clone.querySelector(".js-clone-attack-melee-damage").value;
      var critical = clone.querySelector(".js-clone-attack-melee-critical").value;
      var newAttackMelee = new _create_attackMeleeObject(weapon, attack, damage, critical);
      sheet.getCharacter().offense.attack.melee[cloneIndex] = newAttackMelee;
    };
    if (cloneType == "attack-ranged") {
      var weapon = clone.querySelector(".js-clone-attack-ranged-weapon").value;
      var attack = clone.querySelector(".js-clone-attack-ranged-attack").value;
      var damage = clone.querySelector(".js-clone-attack-ranged-damage").value;
      var critical = clone.querySelector(".js-clone-attack-ranged-critical").value;
      var range = clone.querySelector(".js-clone-attack-ranged-range").value;
      var ammo = clone.querySelector(".js-clone-attack-ranged-ammo").value;
      var newAttackRanged = new _create_attackRangedObject(weapon, attack, damage, critical, range, ammo);
      sheet.getCharacter().offense.attack.ranged[cloneIndex] = newAttackRanged;
    };
    if (cloneType == "consumable") {
      var item = clone.querySelector(".js-clone-consumable-item").value;
      var current = clone.querySelector(".js-clone-consumable-current").innerHTML;
      var total = clone.querySelector(".js-clone-consumable-total").value;
      var used = clone.querySelector(".js-clone-consumable-used").value;
      var newConsumable = new _create_consumableObject(item, current, total, used);
      sheet.getCharacter().equipment.consumable[cloneIndex] = newConsumable;
    };
    if (cloneType == "note-character") {
      var textarea = clone.querySelector(".js-textarea-block-field").innerHTML;
      var newCharacterNote = new _create_noteCharacter(textarea);
      sheet.getCharacter().notes.character[cloneIndex] = newCharacterNote;
    };
    if (cloneType == "note-story") {
      var textarea = clone.querySelector(".js-textarea-block-field").innerHTML;
      var newStoryNote = new _create_noteStory(textarea);
      sheet.getCharacter().notes.story[cloneIndex] = newStoryNote;
    };
  };

  function _update_clonePlaceholder(cloneType) {
    var clonePlaceholder = _get_placeholderClone(cloneType);
    if (_get_cloneCount(cloneType) == 0) {
      helper.removeClass(clonePlaceholder, "is-hidden");
    } else {
      helper.addClass(clonePlaceholder, "is-hidden");
    };
  };

  function clear() {
    var all_cloneTarget = helper.eA(".js-clone-block-target");
    for (var i = 0; i < all_cloneTarget.length; i++) {
      // console.log(all_cloneTarget[i].classList[2], "cleared");
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
