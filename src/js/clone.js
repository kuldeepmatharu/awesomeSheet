var clone = (function() {

  function render() {
    _render_all_clones("class");
    _render_all_clones("attack-melee");
    _render_all_clones("attack-ranged");
    _render_all_clones("consumable");
    _render_all_clones("item");
    _render_all_clones("skill");
    _render_all_clones("note-character");
    _render_all_clones("note-story");
    _update_clonePlaceholder("class");
    _update_clonePlaceholder("attack-melee");
    _update_clonePlaceholder("attack-ranged");
    _update_clonePlaceholder("consumable");
    _update_clonePlaceholder("item");
    _update_clonePlaceholder("skill");
    _update_clonePlaceholder("note-character");
    _update_clonePlaceholder("note-story");
    _update_clonePrefix("item");
    _update_clonePrefix("consumable");
    _update_cloneSuffix("item");
  };

  function _get_cloneObjects(cloneType) {
    var object;
    if (cloneType == "class") {
      object = sheet.getCharacter().basics.classes;
    };
    if (cloneType == "consumable") {
      object = sheet.getCharacter().equipment.consumable;
    };
    if (cloneType == "item") {
      object = sheet.getCharacter().equipment.item;
    };
    if (cloneType == "skill") {
      object = sheet.getCharacter().skills.custom;
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
    if (cloneType == "class") {
      cloneString =
        '<div class="m-clone-block-content js-clone-block-content">' +
        '  <div class="m-edit-box-content m-edit-box-content-outline m-edit-box-content-margin-large">' +
        '    <div class="m-edit-box-item-max m-edit-box-group">' +
        '      <div class="m-edit-box-item-large">' +
        '        <div class="m-input-block js-input-block js-basics-class-level" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <label class="m-input-block-label js-input-block-label" for="class-classname-' + cloneIndex + '">Classname</label>' +
        '          <input id="class-classname-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field" data-path="basics.classes" data-path-clone-key="classname" type="text" tabindex="1">' +
        '        </div>' +
        '      </div>' +
        '      <div class="m-edit-box-item-small">' +
        '        <div class="m-input-block js-input-block js-basics-class-level" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <label class="m-input-block-label js-input-block-label" for="class-level-' + cloneIndex + '">Levels</label>' +
        '          <input id="class-level-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field js-tip" data-path="basics.classes" data-path-clone-key="level" data-type="integer" data-clone="true" data-tip="Total number of Levels in this Class." type="text" tabindex="1">' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '    <div class="m-edit-box-item-max m-edit-box-group">' +
        '      <div class="m-edit-box-item-medium">' +
        '        <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <label class="m-input-block-label js-input-block-label" for="class-hp-' + cloneIndex + '">HP</label>' +
        '          <input id="class-hp-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field js-tip" data-path="basics.classes" data-path-clone-key="hp" data-type="integer" data-clone="true" data-tip="HP for all Levels in this Class, (CON bonuses will be automatically added)." type="text" tabindex="1">' +
        '        </div>' +
        '      </div>' +
        '      <div class="m-edit-box-item-medium">' +
        '        <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <label class="m-input-block-label js-input-block-label" for="class-bab-' + cloneIndex + '">BAB</label>' +
        '          <input id="class-bab-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field js-tip" data-path="basics.classes" data-path-clone-key="bab" data-type="integer" data-clone="true" data-tip="The highest BAB for this Class (additional attacks will be automatically added)." type="text" tabindex="1">' +
        '        </div>' +
        '      </div>' +
        '      <div class="m-edit-box-item-medium">' +
        '        <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <label class="m-input-block-label js-input-block-label" for="class-ranks-' + cloneIndex + '">Ranks</label>' +
        '          <input id="class-ranks-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field js-tip" data-path="basics.classes" data-path-clone-key="ranks" data-type="integer" data-clone="true" data-tip="Skill Ranks for all Levels in this Class, (INT bonuses will be automatically added)." type="text" tabindex="1">' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '    <div class="m-edit-box-item-max m-edit-box-group">' +
        '      <div class="m-edit-box-item-medium">' +
        '        <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <label class="m-input-block-label js-input-block-label" for="class-fortitude-' + cloneIndex + '">Base Fortitude</label>' +
        '          <input id="class-fortitude-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field" data-path="basics.classes" data-path-clone-key="fortitude" data-type="integer" type="text" tabindex="1">' +
        '        </div>' +
        '      </div>' +
        '      <div class="m-edit-box-item-medium">' +
        '        <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <label class="m-input-block-label js-input-block-label" for="class-reflex-' + cloneIndex + '">Base Reflex</label>' +
        '          <input id="class-reflex-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field" data-path="basics.classes" data-path-clone-key="reflex" data-type="integer" type="text" tabindex="1">' +
        '        </div>' +
        '      </div>' +
        '      <div class="m-edit-box-item-medium">' +
        '        <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <label class="m-input-block-label js-input-block-label" for="class-will-' + cloneIndex + '">Base Will</label>' +
        '          <input id="class-will-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field" data-path="basics.classes" data-path-clone-key="will" data-type="integer" type="text" tabindex="1">' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>' +
        '<div class="m-clone-block-delete-controls">' +
        '  <button class="button button-icon button-large button-primary js-clone-block-delete" tabindex="-1"><span class="icon-close"></span></button>' +
        '</div>';
    };
    if (cloneType == "consumable") {
      cloneString =
        '<div class="m-clone-block-content js-clone-block-content">' +
        '  <div class="js-total-block" data-total-path="equipment.consumable" data-total-path-addition="total" data-total-path-subtraction="used" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '  <div class="m-edit-box-content m-edit-box-content-margin-small">' +
        '    <div class="m-edit-box-item-max m-edit-box-group">' +
        '        <div class="m-edit-box-item-large">' +
        '          <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '            <input id="consumable-item-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field" data-path="equipment.consumable" data-path-clone-key="item" type="text" tabindex="1">' +
        '          </div>' +
        '        </div>' +

        '        <div class="m-edit-box-item-total">' +
        '          <p class="m-edit-box-total js-total-block-total">0</p>' +
        '        </div>' +

        '        <div class="m-edit-box-item-small">' +
        '          <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '            <input id="consumable-total-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field" data-path="equipment.consumable" data-path-clone-key="total" data-type="integer" type="text" tabindex="1">' +
        '          </div>' +
        '        </div>' +

        '        <div class="m-edit-box-item-small">' +
        '          <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '            <input id="consumable-used-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field" data-total="subtract" data-path="equipment.consumable" data-path-clone-key="used" data-type="integer" type="text" tabindex="1">' +
        '          </div>' +
        '        </div>' +

        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>' +
        '<div class="m-clone-block-delete-controls">' +
        '  <button class="button button-icon button-large button-primary js-clone-block-delete" tabindex="-1"><span class="icon-close"></span></button>' +
        '</div>';
    };
    if (cloneType == "item") {
      cloneString =
        '<div class="m-clone-block-content js-clone-block-content">' +
        '  <div class="m-edit-box-content m-edit-box-content-margin-small">' +
        '    <div class="m-edit-box-item-max m-edit-box-group">' +
        '      <div class="m-edit-box-item-large">' +
        '        <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <input id="item-name-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field" data-path="equipment.item" data-path-clone-key="name" type="text" tabindex="1">' +
        '        </div>' +
        '      </div>' +
        '      <div class="m-edit-box-item-small">' +
        '        <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <input id="item-quantity-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field" data-path="equipment.item" data-path-clone-key="quantity" data-type="integer" type="text" tabindex="1">' +
        '        </div>' +
        '      </div>' +
        '      <div class="m-edit-box-item-small">' +
        '        <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <input id="item-weight-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field" data-path="equipment.item" data-path-clone-key="weight" data-type="float" type="text" tabindex="1">' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>' +
        '<div class="m-clone-block-delete-controls">' +
        '  <button class="button button-icon button-large button-primary js-clone-block-delete" tabindex="-1"><span class="icon-close"></span></button>' +
        '</div>';
    };
    if (cloneType == "skill") {
      cloneString =
        '<div class="m-clone-block-content js-clone-block-content">' +
        '  <div class="m-skill js-total-block" data-total-path="skills.custom" data-total-path-addition="ranks,misc" data-total-bonuses="true" data-total-bonuses="true" data-total-bonuses-include="str_bonus,dex_bonus,con_bonus,int_bonus,wis_bonus,cha_bonus,level,half_level,check_penalty" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '    <div class="m-edit-box m-edit-box-head-large m-edit-box-guides">' +
        '      <div class="m-edit-box-head">' +
        '        <div class="m-skill-name m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <input class="m-input-block-field u-full-width u-no-margin js-input-block-field" data-path="skills.custom" data-path-clone-key="name" type="text" tabindex="1" placeholder="Custom skill">' +
        '        </div>' +
        '      </div>' +
        '      <div class="m-edit-box-body">' +
        '        <div class="m-edit-box-content">' +
        '          <div class="m-edit-box-item-max m-edit-box-group">' +
        '            <div class="m-edit-box-item-total">' +
        '              <p class="m-edit-box-total js-total-block-total">0</p>' +
        '            </div>' +
        '            <div class="m-edit-box-item-medium">' +
        '              <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '                <input class="m-input-block-field u-full-width u-text-center js-input-block-field js-input-block-field-ranks" data-path="skills.custom" data-path-clone-key="ranks" data-type="integer" type="text" tabindex="1">' +
        '              </div>' +
        '            </div>' +
        '            <div class="m-edit-box-item-medium">' +
        '              <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '                <input class="m-input-block-field u-full-width u-text-center js-input-block-field" data-path="skills.custom" data-path-clone-key="misc" data-type="integer" type="text" tabindex="1">' +
        '              </div>' +
        '            </div>' +
        '            <div class="m-edit-box-item-check">' +
        '              <div class="m-check-block">' +
        '                <input class="m-check-block-check js-total-block-bonus-check" data-path="skills.custom" data-path-array="true" data-bonus-type="class-skill" type="checkbox" tabindex="1">' +
        '                <span class="m-check-block-check-icon"></span>' +
        '              </div>' +
        '            </div>' +
        '            <div class="m-edit-box-item-button-small">' +
        '              <a href="javascript:void(0)" class="u-inline-with-input u-no-margin button button-secondary button-large button-icon js-total-block-bonuses" data-clone="true" data-modal-heading="Custom Skill bonuses" tabindex="1"><span class="icon-more-vertical"></span></a>' +
        '            </div>' +
        '          </div>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>' +
        '<div class="m-clone-block-delete-controls m-clone-block-delete-controls-skill">' +
        '  <button class="button button-icon button-large button-primary js-clone-block-delete" tabindex="-1"><span class="icon-close"></span></button>' +
        '</div>';
    };
    if (cloneType == "attack-melee") {
      cloneString =
        '<div class="m-clone-block-content js-clone-block-content">' +
        '  <div class="m-edit-box-content m-edit-box-content-outline m-edit-box-content-margin-large">' +
        '    <div class="m-edit-box-item-max">' +
        '      <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '        <label class="m-input-block-label js-input-block-label" for="attack-melee-weapon-' + cloneIndex + '">Weapon</label>' +
        '        <input id="attack-melee-weapon-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field" data-path="offense.attack.melee" data-path-clone-key="weapon" type="text" tabindex="1">' +
        '      </div>' +
        '    </div>' +
        '    <div class="m-edit-box-item-max m-edit-box-group">' +
        '      <div class="m-edit-box-item-medium">' +
        '        <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <label class="m-input-block-label js-input-block-label" for="attack-melee-attack-' + cloneIndex + '">Attack</label>' +
        '          <input id="attack-melee-attack-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field" data-path="offense.attack.melee" data-path-clone-key="attack" type="text" tabindex="1">' +
        '        </div>' +
        '      </div>' +
        '      <div class="m-edit-box-item-medium">' +
        '        <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <label class="m-input-block-label js-input-block-label" for="attack-melee-damage-' + cloneIndex + '">Damage</label>' +
        '          <input id="attack-melee-damage-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field" data-path="offense.attack.melee" data-path-clone-key="damage" type="text" tabindex="1">' +
        '        </div>' +
        '      </div>' +
        '      <div class="m-edit-box-item-medium">' +
        '        <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <label class="m-input-block-label js-input-block-label" for="attack-melee-critical-' + cloneIndex + '">Critical</label>' +
        '          <input id="attack-melee-critical-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field" data-path="offense.attack.melee" data-path-clone-key="critical" type="text" tabindex="1">' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>' +
        '<div class="m-clone-block-delete-controls">' +
        '  <button class="button button-icon button-large button-primary js-clone-block-delete" tabindex="-1"><span class="icon-close"></span></button>' +
        '</div>';
    };
    if (cloneType == "attack-ranged") {
      cloneString =
        '<div class="m-clone-block-content js-clone-block-content">' +
        '  <div class="m-edit-box-content m-edit-box-content-outline m-edit-box-content-margin-large">' +
        '    <div class="m-edit-box-item-max">' +
        '      <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '        <label class="m-input-block-label js-input-block-label" for="attack-ranged-weapon-' + cloneIndex + '">Weapon</label>' +
        '        <input id="attack-ranged-weapon-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field" data-path="offense.attack.ranged" data-path-clone-key="weapon" type="text" tabindex="1">' +
        '      </div>' +
        '    </div>' +
        '    <div class="m-edit-box-item-max m-edit-box-group">' +
        '      <div class="m-edit-box-item-medium">' +
        '        <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <label class="m-input-block-label js-input-block-label" for="attack-ranged-attack-' + cloneIndex + '">Attack</label>' +
        '          <input id="attack-ranged-attack-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field" data-path="offense.attack.ranged" data-path-clone-key="attack" type="text" tabindex="1">' +
        '        </div>' +
        '      </div>' +
        '      <div class="m-edit-box-item-medium">' +
        '        <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <label class="m-input-block-label js-input-block-label" for="attack-ranged-damage-' + cloneIndex + '">Damage</label>' +
        '          <input id="attack-ranged-damage-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field" data-path="offense.attack.ranged" data-path-clone-key="damage" type="text" tabindex="1">' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '    <div class="m-edit-box-item-max m-edit-box-group">' +
        '      <div class="m-edit-box-item-medium">' +
        '        <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <label class="m-input-block-label js-input-block-label" for="attack-ranged-critical-' + cloneIndex + '">Critical</label>' +
        '          <input id="attack-ranged-critical-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field" data-path="offense.attack.ranged" data-path-clone-key="critical" type="text" tabindex="1">' +
        '        </div>' +
        '      </div>' +
        '      <div class="m-edit-box-item-medium">' +
        '        <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <label class="m-input-block-label js-input-block-label" for="attack-ranged-range-' + cloneIndex + '">Range</label>' +
        '          <input id="attack-ranged-range-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field" data-path="offense.attack.ranged" data-path-clone-key="range" type="text" tabindex="1">' +
        '        </div>' +
        '      </div>' +
        '      <div class="m-edit-box-item-medium">' +
        '        <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <label class="m-input-block-label js-input-block-label" for="attack-ranged-ammo-' + cloneIndex + '">Ammo</label>' +
        '          <input id="attack-ranged-ammo-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field" data-path="offense.attack.ranged" data-path-clone-key="ammo" type="text" tabindex="1">' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>' +
        '<div class="m-clone-block-delete-controls">' +
        '  <button class="button button-icon button-large button-primary js-clone-block-delete" tabindex="-1"><span class="icon-close"></span></button>' +
        '</div>';
    };
    if (cloneType == "note-character") {
      cloneString =
        '<div class="m-clone-block-content js-clone-block-content">' +
        '  <div class="m-edit-box-content m-edit-box-content-margin-large">' +
        '    <div class="m-edit-box-item-max">' +
        '      <div class="m-textarea-block js-textarea-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '        <label class="m-textarea-block-label js-textarea-block-label" for="note-character-' + cloneIndex + '">Note</label>' +
        '        <div id="note-character-' + cloneIndex + '" class="m-textarea-block-field textarea textarea-large u-full-width js-textarea-block-field" contentEditable="true" data-path="notes.character" data-path-clone-key="note" tabindex="1"></div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>' +
        '<div class="m-clone-block-delete-controls m-clone-block-delete-controls-note">' +
        '  <button class="button button-icon button-large button-primary js-clone-block-delete" tabindex="-1"><span class="icon-close"></span></button>' +
        '</div>';
    };
    if (cloneType == "note-story") {
      cloneString =
        '<div class="m-clone-block-content js-clone-block-content">' +
        '  <div class="m-edit-box-content m-edit-box-content-margin-large">' +
        '    <div class="m-edit-box-item-max">' +
        '      <div class="m-textarea-block js-textarea-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '        <label class="m-textarea-block-label js-textarea-block-label" for="note-story-' + cloneIndex + '">Note</label>' +
        '        <div id="note-story-' + cloneIndex + '" class="m-textarea-block-field textarea textarea-large u-full-width js-textarea-block-field" contentEditable="true" data-path="notes.story" data-path-clone-key="note" tabindex="1"></div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>' +
        '<div class="m-clone-block-delete-controls m-clone-block-delete-controls-note">' +
        '  <button class="button button-icon button-large button-primary js-clone-block-delete" tabindex="-1"><span class="icon-close"></span></button>' +
        '</div>';
    };
    return cloneString;
  };

  function _get_cloneBlock(cloneType) {
    var cloneBlock;
    if (cloneType == "class") {
      cloneBlock = helper.e(".js-clone-block-class");
    };
    if (cloneType == "attack-melee" || cloneType == "attack-ranged" || cloneType == "attack") {
      cloneBlock = helper.e(".js-clone-block-attack");
    };
    if (cloneType == "item") {
      cloneBlock = helper.e(".js-clone-block-item");
    };
    if (cloneType == "consumable") {
      cloneBlock = helper.e(".js-clone-block-consumable");
    };
    if (cloneType == "skill") {
      cloneBlock = helper.e(".js-clone-block-skill");
    };
    if (cloneType == "note-character" || cloneType == "note-story" || cloneType == "note") {
      cloneBlock = helper.e(".js-clone-block-note");
    };
    return cloneBlock;
  };

  function _get_cloneTarget(cloneType) {
    var cloneTarget;
    if (cloneType == "class") {
      cloneTarget = helper.e(".js-clone-block-target-class");
    };
    if (cloneType == "attack-melee") {
      cloneTarget = helper.e(".js-clone-block-target-attack-melee");
    };
    if (cloneType == "attack-ranged") {
      cloneTarget = helper.e(".js-clone-block-target-attack-ranged");
    };
    if (cloneType == "consumable") {
      cloneTarget = helper.e(".js-clone-block-target-consumable");
    };
    if (cloneType == "item") {
      cloneTarget = helper.e(".js-clone-block-target-item");
    };
    if (cloneType == "skill") {
      cloneTarget = helper.e(".js-clone-block-target-skills");
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
    if (cloneType == "class") {
      cloneCount = helper.getObject(sheet.getCharacter(), "basics.classes").length;
    };
    if (cloneType == "attack-melee") {
      cloneCount = helper.getObject(sheet.getCharacter(), "offense.attack.melee").length;
    };
    if (cloneType == "attack-ranged") {
      cloneCount = helper.getObject(sheet.getCharacter(), "offense.attack.ranged").length;
    };
    if (cloneType == "consumable") {
      cloneCount = helper.getObject(sheet.getCharacter(), "equipment.consumable").length;
    };
    if (cloneType == "item") {
      cloneCount = helper.getObject(sheet.getCharacter(), "equipment.item").length;
    };
    if (cloneType == "skill") {
      cloneCount = helper.getObject(sheet.getCharacter(), "skills.custom").length;
    };
    if (cloneType == "note-character") {
      cloneCount = helper.getObject(sheet.getCharacter(), "notes.character").length;
    };
    if (cloneType == "note-story") {
      cloneCount = helper.getObject(sheet.getCharacter(), "notes.story").length;
    };
    if (cloneType == "note" || cloneType == "note-character" && mixed || cloneType == "note-story" && mixed) {
      cloneCount = helper.getObject(sheet.getCharacter(), "notes.story").length + helper.getObject(sheet.getCharacter(), "notes.character").length;
    };
    if (cloneType == "attack" || cloneType == "attack-melee" && mixed || cloneType == "attack-ranged" && mixed) {
      cloneCount = helper.getObject(sheet.getCharacter(), "offense.attack.melee").length + helper.getObject(sheet.getCharacter(), "offense.attack.ranged").length;
    };
    return cloneCount;
  };

  function _get_placeholderClone(cloneType) {
    var clonePlaceholder;
    if (cloneType == "class") {
      clonePlaceholder = helper.e(".js-placeholder-clone-class");
    };
    if (cloneType == "attack-melee") {
      clonePlaceholder = helper.e(".js-placeholder-clone-attack-melee");
    };
    if (cloneType == "attack-ranged") {
      clonePlaceholder = helper.e(".js-placeholder-clone-attack-ranged");
    };
    if (cloneType == "consumable") {
      clonePlaceholder = helper.e(".js-placeholder-clone-consumable");
    };
    if (cloneType == "item") {
      clonePlaceholder = helper.e(".js-placeholder-clone-item");
    };
    if (cloneType == "skill") {
      clonePlaceholder = helper.e(".js-placeholder-clone-skill");
    };
    if (cloneType == "note-character") {
      clonePlaceholder = helper.e(".js-placeholder-clone-note-character");
    };
    if (cloneType == "note-story") {
      clonePlaceholder = helper.e(".js-placeholder-clone-note-story");
    };
    return clonePlaceholder;
  };

  function _get_clonePrefix(cloneType) {
    var clonePrefix;
    if (cloneType == "class") {
      clonePrefix = helper.e(".js-clone-block-prefix-class");
    };
    if (cloneType == "attack-melee") {
      clonePrefix = helper.e(".js-clone-block-prefix-attack-melee");
    };
    if (cloneType == "attack-ranged") {
      clonePrefix = helper.e(".js-clone-block-prefix-attack-ranged");
    };
    if (cloneType == "consumable") {
      clonePrefix = helper.e(".js-clone-block-prefix-consumable");
    };
    if (cloneType == "item") {
      clonePrefix = helper.e(".js-clone-block-prefix-item");
    };
    if (cloneType == "skill") {
      clonePrefix = helper.e(".js-clone-block-prefix-skill");
    };
    if (cloneType == "note-character") {
      clonePrefix = helper.e(".js-clone-block-prefix-note-character");
    };
    if (cloneType == "note-story") {
      clonePrefix = helper.e(".js-clone-block-prefix-note-story");
    };
    return clonePrefix;
  };

  function _get_cloneSuffix(cloneType) {
    var cloneSuffix;
    if (cloneType == "class") {
      cloneSuffix = helper.e(".js-clone-block-suffix-class");
    };
    if (cloneType == "attack-melee") {
      cloneSuffix = helper.e(".js-clone-block-suffix-attack-melee");
    };
    if (cloneType == "attack-ranged") {
      cloneSuffix = helper.e(".js-clone-block-suffix-attack-ranged");
    };
    if (cloneType == "consumable") {
      cloneSuffix = helper.e(".js-clone-block-suffix-consumable");
    };
    if (cloneType == "item") {
      cloneSuffix = helper.e(".js-clone-block-suffix-item");
    };
    if (cloneType == "skill") {
      cloneSuffix = helper.e(".js-clone-block-suffix-skill");
    };
    if (cloneType == "note-character") {
      cloneSuffix = helper.e(".js-clone-block-suffix-note-character");
    };
    if (cloneType == "note-story") {
      cloneSuffix = helper.e(".js-clone-block-suffix-note-story");
    };
    return cloneSuffix;
  };

  function _get_maxCloneMessage(cloneType) {
    var message = "Max 200, do you need that many";
    if (cloneType == "class") {
      message = message + " Classes?";
    };
    if (cloneType == "attack-melee") {
      message = message + " Melee Attacks?";
    };
    if (cloneType == "attack-ranged") {
      message = message + " Ranged Attacks?";
    };
    if (cloneType == "consumable") {
      message = message + " Consumables?";
    };
    if (cloneType == "item") {
      message = message + " Items?";
    };
    if (cloneType == "skill") {
      message = message + " Skills?";
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
    if (cloneType == "class") {
      message = "Class " + message;
    };
    if (cloneType == "attack-melee") {
      message = "Melee attack " + message;
    };
    if (cloneType == "attack-ranged") {
      message = "Ranged attack " + message;
    };
    if (cloneType == "consumable") {
      message = "Consumable " + message;
    };
    if (cloneType == "item") {
      message = "Item " + message;
    };
    if (cloneType == "skill") {
      message = "Skill " + message;
    };
    if (cloneType == "note-character") {
      message = "Character note " + message;
    };
    if (cloneType == "note-story") {
      message = "Story note " + message;
    };
    return message;
  };

  function _get_newCloneObject(cloneType) {
    var object;
    if (cloneType == "class") {
      object = {
        classname: "",
        level: "",
        hp: "",
        fortitude: "",
        reflex: "",
        will: "",
        ranks: "",
        bab: ""
      };
    };
    if (cloneType == "attack-melee") {
      object = {
        weapon: "",
        attack: "",
        damage: "",
        critical: ""
      };
    };
    if (cloneType == "attack-ranged") {
      object = {
        weapon: "",
        attack: "",
        damage: "",
        critical: "",
        range: "",
        ammo: ""
      };
    };
    if (cloneType == "consumable") {
      object = {
        item: "",
        current: "",
        total: "",
        used: ""
      };
    };
    if (cloneType == "item") {
      object = {
        name: "",
        quantity: "",
        weight: ""
      };
    };
    if (cloneType == "skill") {
      object = {
        name: "",
        ranks: "",
        misc: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          class_skill: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      };
    };
    if (cloneType == "note-character") {
      object = {
        note: ""
      };
    };
    if (cloneType == "note-story") {
      object = {
        note: ""
      };
    };
    return object;
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
      if (targetTop > (windowHeight - (windowHeight / 10)) || targetBottom <= 0) {
        var offset = (windowHeight - (windowHeight / 2));
        var options = {
          speed: 300,
          offset: offset
        };
        smoothScroll.animateScroll(null, "#" + cloneTarget.lastChild.id, options);
      };
    };
  };

  function bind() {
    _bind_cloneControls();
  };

  function _bind_cloneControls() {
    var cloneBlockClass = _get_cloneBlock("class");
    var cloneBlockConsumable = _get_cloneBlock("consumable");
    var cloneBlockSkill = _get_cloneBlock("skill");
    var cloneBlockItem = _get_cloneBlock("item");
    var cloneBlockAttack = _get_cloneBlock("attack");
    var cloneBlockNote = _get_cloneBlock("note");

    var cloneAddClass = cloneBlockClass.querySelector(".js-clone-add-class");
    var cloneRemoveClass = cloneBlockClass.querySelector(".js-clone-remove");

    var cloneAddConsumable = cloneBlockConsumable.querySelector(".js-clone-add-consumable");
    var cloneRemoveConsumable = cloneBlockConsumable.querySelector(".js-clone-remove");

    var cloneAddItem = cloneBlockItem.querySelector(".js-clone-add-item");
    var cloneRemoveItem = cloneBlockItem.querySelector(".js-clone-remove");

    var cloneAddSkill = cloneBlockSkill.querySelector(".js-clone-add-skill");
    var cloneRemoveSkill = cloneBlockSkill.querySelector(".js-clone-remove");

    var cloneAddAttackMelee = cloneBlockAttack.querySelector(".js-clone-add-melee");
    var cloneAddAttackRanged = cloneBlockAttack.querySelector(".js-clone-add-ranged");
    var cloneRemoveAttack = cloneBlockAttack.querySelector(".js-clone-remove");

    var cloneAddCharacterNote = cloneBlockNote.querySelector(".js-clone-add-character-note");
    var cloneAddStoryNote = cloneBlockNote.querySelector(".js-clone-add-story-note");
    var cloneRemoveNote = cloneBlockNote.querySelector(".js-clone-remove");

    cloneAddClass.addEventListener("click", function() {
      _addNewClone("class");
      sheet.storeCharacters();
    }, false);

    cloneAddConsumable.addEventListener("click", function() {
      _addNewClone("consumable");
      sheet.storeCharacters();
    }, false);

    cloneAddItem.addEventListener("click", function() {
      _addNewClone("item");
      sheet.storeCharacters();
    }, false);

    cloneAddSkill.addEventListener("click", function() {
      _addNewClone("skill");
      sheet.storeCharacters();
    }, false);

    cloneAddAttackMelee.addEventListener("click", function() {
      _addNewClone("attack-melee");
      sheet.storeCharacters();
    }, false);

    cloneAddAttackRanged.addEventListener("click", function() {
      _addNewClone("attack-ranged");
      sheet.storeCharacters();
    }, false);

    cloneAddCharacterNote.addEventListener("click", function() {
      _addNewClone("note-character");
      sheet.storeCharacters();
    }, false);

    cloneAddStoryNote.addEventListener("click", function() {
      _addNewClone("note-story");
      sheet.storeCharacters();
    }, false);

    cloneRemoveClass.addEventListener("click", function() {
      _change_cloneState("class");
      _update_removeButtonTab("class");
    }, false);

    cloneRemoveAttack.addEventListener("click", function() {
      _change_cloneState("attack");
      _update_removeButtonTab("attack");
    }, false);

    cloneRemoveConsumable.addEventListener("click", function() {
      _change_cloneState("consumable");
      _update_removeButtonTab("consumable");
    }, false);

    cloneRemoveItem.addEventListener("click", function() {
      _change_cloneState("item");
      _update_removeButtonTab("item");
    }, false);

    cloneRemoveSkill.addEventListener("click", function() {
      _change_cloneState("skill");
      _update_removeButtonTab("skill");
    }, false);

    cloneRemoveNote.addEventListener("click", function() {
      _change_cloneState("note");
      _update_removeButtonTab("note");
    }, false);
  };

  function _bind_cloneRemoveButton(button, cloneType) {
    button.addEventListener("click", function() {
      _store_lastRemovedClone(this, cloneType);
      _remove_clone(this, cloneType);
      _update_removeButtonTab(cloneType);
      sheet.storeCharacters();
    }, false);
  };

  function _bind_clone(cloneType, newClone) {
    if (cloneType == "class") {
      _bind_inputBlock(newClone.querySelectorAll(".js-input-block"));
      _bind_classesInputBlock(newClone.querySelectorAll(".js-input-block"));
      _bind_classLevelInputBlock(newClone.querySelectorAll(".js-basics-class-level"));
      _bind_tip(newClone.querySelectorAll(".js-tip"));
    };
    if (cloneType == "consumable" || cloneType == "skill") {
      _bind_totalBlock(newClone.querySelector(".js-total-block"));
    };
    if (cloneType == "consumable" || cloneType == "skill" || cloneType == "item" || cloneType == "attack-melee" || cloneType == "attack-ranged") {
      _bind_inputBlock(newClone.querySelectorAll(".js-input-block"));
    };
    if (cloneType == "note-character" || cloneType == "note-story") {
      _bind_textareaBlock(newClone.querySelectorAll(".js-textarea-block"));
    };
  };

  function _addNewClone(cloneType) {
    if (_get_cloneCount(cloneType) < 200) {
      _add_cloneObject(cloneType);
      _render_clone(cloneType);
      _update_clonePlaceholder(cloneType);
      _update_clonePrefix(cloneType);
      _update_cloneSuffix(cloneType);
      _smoothScrollToClones(cloneType);
    } else {
      _render_maxClonesSnack(cloneType);
    };
  };

  function _render_clone(cloneType) {
    var cloneTarget = _get_cloneTarget(cloneType);
    var cloneLength = _get_cloneCount(cloneType);
    var cloneIndex = cloneLength - 1;
    var cloneString = _get_cloneString(cloneType, cloneIndex);
    // make new clone node
    var newClone = document.createElement("div");
    // id needed for smooth scroll
    newClone.setAttribute("id", "clone-" + cloneType + "-" + cloneIndex);
    newClone.setAttribute("class", "m-clone js-clone");
    newClone.setAttribute("data-clone-count", cloneIndex);
    // add content
    newClone.innerHTML = cloneString;
    var newCloneFlash = document.createElement("span");
    newCloneFlash.setAttribute("class", "m-clone-flash m-clone-flash-" + cloneType.replace(/_+/g, "-"));
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

  function _render_all_clones(cloneType, bind) {
    var cloneTarget = _get_cloneTarget(cloneType);
    var cloneLength = _get_cloneCount(cloneType);
    for (var i = 0; i < cloneLength; i++) {
      var cloneIndex = i;
      // make new clone node
      var cloneString = _get_cloneString(cloneType, cloneIndex);
      var newClone = document.createElement("div");
      // id needed for smooth scroll
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

  function _render_maxClonesSnack(cloneType) {
    snack.render(_get_maxCloneMessage(cloneType));
  };

  function _update_cloneState(cloneType) {
    var cloneBlock = _get_cloneBlock(cloneType);
    var cloneTarget = _get_cloneTarget(cloneType);
    var cloneCount = _get_cloneCount(cloneType, true);
    var cloneControls = cloneBlock.querySelector(".js-clone-controls");
    var cloneRemoveButton = cloneControls.querySelector(".js-clone-remove");
    if (cloneCount == 0) {
      cloneBlock.dataset.deleteCloneState = "false";
      helper.removeClass(cloneBlock, "is-delete-state");
      // helper.removeClass(cloneRemoveButton, "is-active");
      helper.removeClass(cloneRemoveButton, "button-primary");
      helper.addClass(cloneRemoveButton, "button-secondary");
    };
  };

  function _remove_clone(button, cloneType) {
    var cloneIndex = parseInt(helper.getClosest(button, ".js-clone").dataset.cloneCount, 10);
    _remove_cloneObject(cloneType, cloneIndex);
    clear(cloneType);
    _render_all_clones(cloneType, true);
    inputBlock.clear();
    inputBlock.render();
    textareaBlock.clear();
    textareaBlock.render();
    if (cloneType == "class") {
      classes.render();
    };
    textBlock.render();
    totalBlock.render();
    _update_clonePlaceholder(cloneType);
    _update_clonePrefix(cloneType);
    _update_cloneSuffix(cloneType);
    _update_cloneState(cloneType);
    snack.render(_get_undoRemoveCloneMessage(cloneType), "Undo", _restore_lastRemovedClone, 8000);
  };

  function _restore_lastRemovedClone() {
    var undoData = JSON.parse(helper.read("lastRemovedClone"));
    _restore_cloneObject(undoData.cloneType, undoData.index, undoData.clone);
    clear(undoData.cloneType);
    _render_all_clones(undoData.cloneType);
    inputBlock.clear();
    inputBlock.render();
    textareaBlock.clear();
    textareaBlock.render();
    if (undoData.cloneType == "class") {
      classes.render();
    };
    textBlock.render();
    totalBlock.render();
    _update_clonePlaceholder(undoData.cloneType);
    _update_clonePrefix(undoData.cloneType);
    _update_cloneSuffix(undoData.cloneType);
    _update_cloneState(undoData.cloneType);
    _update_removeButtonTab(undoData.cloneType);
    _remove_lastRemovedClone();
    sheet.storeCharacters();
  };

  function _store_lastRemovedClone(button, cloneType) {
    var cloneIndex = parseInt(helper.getClosest(button, ".js-clone").dataset.cloneCount, 10);
    var removedCloneObject = {
      cloneType: cloneType,
      index: cloneIndex,
      clone: {}
    };
    removedCloneObject.clone = _get_cloneObjects(cloneType)[cloneIndex];
    helper.store("lastRemovedClone", JSON.stringify(removedCloneObject));
  };

  function _remove_lastRemovedClone() {
    helper.remove("lastRemovedClone");
  };

  function _remove_cloneObject(cloneType, index) {
    _get_cloneObjects(cloneType).splice(index, 1);
  };

  function _restore_cloneObject(cloneType, index, cloneObject) {
    _get_cloneObjects(cloneType).splice(index, 0, cloneObject);
  };

  function _bind_totalBlock(all_totalBlock) {
    totalBlock.bind(all_totalBlock);
  };

  function _bind_inputBlock(all_inputBlock) {
    for (var i = 0; i < all_inputBlock.length; i++) {
      inputBlock.bind(all_inputBlock[i]);
    };
  };

  function _bind_classesInputBlock(all_inputBlock) {
    for (var i = 0; i < all_inputBlock.length; i++) {
      classes.bind(all_inputBlock[i]);
    };
  };

  function _bind_classLevelInputBlock(all_inputBlock) {
    for (var i = 0; i < all_inputBlock.length; i++) {
      inputBlock.bind_classLevel(all_inputBlock[i]);
    };
  };

  function _bind_tip(all_tip) {
    for (var i = 0; i < all_tip.length; i++) {
      tip.bind(all_tip[i]);
    };
  };

  function _bind_textareaBlock(all_textareaBlock) {
    for (var i = 0; i < all_textareaBlock.length; i++) {
      textareaBlock.bind(all_textareaBlock[i]);
    };
  };

  function _change_cloneState(cloneType) {
    var cloneBlock = helper.e(".js-clone-block-" + cloneType);
    var cloneControls = cloneBlock.querySelector(".js-clone-controls");
    var cloneRemoveButton = cloneControls.querySelector(".js-clone-remove");
    var cloneTarget = _get_cloneTarget(cloneType);
    // change clone block state
    if (cloneBlock.dataset.deleteCloneState == "false" || !cloneBlock.dataset.deleteCloneState) {
      helper.addClass(cloneBlock, "is-delete-state");
      cloneBlock.dataset.deleteCloneState = "true";
      // change clone remove button
      // helper.toggleClass(cloneRemoveButton, "is-active");
      helper.addClass(cloneRemoveButton, "button-primary");
      helper.removeClass(cloneRemoveButton, "button-secondary");
    } else {
      helper.removeClass(cloneBlock, "is-delete-state");
      cloneBlock.dataset.deleteCloneState = "false";
      // change clone remove button
      // helper.removeClass(cloneRemoveButton, "is-active");
      helper.removeClass(cloneRemoveButton, "button-primary");
      helper.addClass(cloneRemoveButton, "button-secondary");
    };
    // if clone count is 0 restore all classes to normal
    if (_get_cloneCount(cloneType) == 0) {
      cloneBlock.dataset.deleteCloneState = "false";
      helper.removeClass(cloneBlock, "is-delete-state");
      // change clone remove button
      // helper.removeClass(cloneRemoveButton, "is-active");
      helper.removeClass(cloneRemoveButton, "button-primary");
      helper.addClass(cloneRemoveButton, "button-secondary");
    };
  };

  function _update_removeButtonTab(cloneType) {
    var cloneBlock = _get_cloneBlock(cloneType);
    var all_removeButtons = cloneBlock.querySelectorAll(".js-clone-block-delete");
    if (cloneBlock.dataset.deleteCloneState == "true") {
      for (var i = 0; i < all_removeButtons.length; i++) {
        all_removeButtons[i].setAttribute("tabindex", "1");
      };
    } else {
      for (var i = 0; i < all_removeButtons.length; i++) {
        all_removeButtons[i].setAttribute("tabindex", "-1");
      };
    };
  };

  function _add_cloneObject(cloneType) {
    if (_get_cloneCount(cloneType) < 200) {
      _get_cloneObjects(cloneType).push(new _get_newCloneObject(cloneType));
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

  function _update_clonePrefix(cloneType) {
    var clonePrefix = _get_clonePrefix(cloneType);
    if (clonePrefix) {
      if (_get_cloneCount(cloneType) <= 0) {
        helper.addClass(clonePrefix, "is-hidden");
      } else {
        helper.removeClass(clonePrefix, "is-hidden");
      };
    };
  };

  function _update_cloneSuffix(cloneType) {
    var cloneSuffix = _get_cloneSuffix(cloneType);
    if (cloneSuffix) {
      if (_get_cloneCount(cloneType) <= 0) {
        helper.addClass(cloneSuffix, "is-hidden");
      } else {
        helper.removeClass(cloneSuffix, "is-hidden");
      };
    };
  };

  function clear(cloneType) {
    if (cloneType) {
      _clear_cloneTarget(cloneType);
    } else {
      _clear_cloneTarget("class");
      _clear_cloneTarget("attack-melee");
      _clear_cloneTarget("attack-ranged");
      _clear_cloneTarget("consumable");
      _clear_cloneTarget("item");
      _clear_cloneTarget("skill");
      _clear_cloneTarget("note-character");
      _clear_cloneTarget("note-story");
    };
  };

  function _clear_cloneTarget(cloneType) {
    var cloneTarget = _get_cloneTarget(cloneType);
    while (cloneTarget.lastChild) {
      cloneTarget.removeChild(cloneTarget.lastChild);
    };
  };

  // exposed methods
  return {
    bind: bind,
    clear: clear,
    render: render
  };

})();
