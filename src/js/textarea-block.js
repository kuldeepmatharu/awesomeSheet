var textareaBlock = (function() {

  function _store(element) {
    var textareaBlock = helper.getClosest(element, ".js-textarea-block");
    var textareaBlockField = textareaBlock.querySelector(".js-textarea-block-field");
    var path = textareaBlockField.dataset.path;
    var type = textareaBlockField.dataset.type;
    var data = element.innerHTML;
    if (path) {
      if (textareaBlock.dataset.clone == "true") {
        var pathCloneKey = textareaBlockField.dataset.pathCloneKey;
        var cloneCount = textareaBlock.dataset.cloneCount;
        var object = helper.getObject(sheet.getCharacter(), path, cloneCount);
        object[pathCloneKey] = data;
      } else {
        helper.setObject(sheet.getCharacter(), path, data);
      };
    };
  };

  var storeInputTimer = null;

  function delayUpdate(element) {
    _store(element);
    sheet.storeCharacters();
    totalBlock.render();
    if (body.dataset.displayMode == "true") {
      display.clear();
      display.render();
    };
  };

  function _focus(element) {
    var textareaBlock = helper.getClosest(element, ".js-textarea-block");
    if (element == document.activeElement) {
      helper.addClass(textareaBlock, "is-focus");
    } else {
      helper.removeClass(textareaBlock, "is-focus");
    };
  };

  function clear() {
    var all_textareaBlock = helper.eA(".js-textarea-block");
    for (var i = 0; i < all_textareaBlock.length; i++) {
      all_textareaBlock[i].querySelector(".js-textarea-block-field").innerHTML = "";
    };
  };

  function bind(textareaBlock) {
    if (textareaBlock) {
      _bind_textareaBlock(textareaBlock);
    } else {
      var all_textareaBlock = helper.eA(".js-textarea-block");
      for (var i = 0; i < all_textareaBlock.length; i++) {
        if (all_textareaBlock[i].dataset.clone != "true") {
          _bind_textareaBlock(all_textareaBlock[i]);
        };
      };
    };
  };

  function _bind_textareaBlock(textareaBlock) {
    var field = textareaBlock.querySelector(".js-textarea-block-field");
    if (field) {
      field.addEventListener("input", function() {
        clearTimeout(storeInputTimer);
        storeInputTimer = setTimeout(delayUpdate, 400, this);
        sheet.storeCharacters();
      }, false);
      field.addEventListener("focus", function() {
        _focus(this);
      }, false);
      field.addEventListener("blur", function() {
        _store(this);
        _focus(this);
        sheet.storeCharacters();
      }, false);
      field.addEventListener("paste", function(event) {
        helper.pasteStrip(event);
      });
    };
  };

  function render() {
    var all_textareaBlock = helper.eA(".js-textarea-block");
    for (var i = 0; i < all_textareaBlock.length; i++) {
      var all_textareaBlockField = all_textareaBlock[i].querySelector(".js-textarea-block-field");
      var path = all_textareaBlockField.dataset.path;
      if (path) {
        if (all_textareaBlock[i].dataset.clone == "true") {
          var pathCloneKey = all_textareaBlockField.dataset.pathCloneKey;
          var cloneCount = all_textareaBlock[i].dataset.cloneCount;
          var object = helper.getObject(sheet.getCharacter(), path, cloneCount);
          all_textareaBlockField.innerHTML = object[pathCloneKey];
          // console.log("found clone input", path, pathCloneKey, all_textareaBlock[i].dataset.cloneCount, all_textareaBlock[i]);
        } else {
          var content = helper.getObject(sheet.getCharacter(), path);
          all_textareaBlockField.innerHTML = content;
        };
      };
    };
  };

  // exposed methods
  return {
    render: render,
    bind: bind,
    clear: clear
  };

})();
