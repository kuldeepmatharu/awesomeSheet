var textBlock = (function() {

  function clear() {
    var all_textBlock = helper.eA(".js-text-block");
    for (var i = 0; i < all_textBlock.length; i++) {
      all_textBlock[i].textContent = "";
    };
  };

  function _render_textBlock(textBlock) {
    var options = helper.makeObject(textBlock.dataset.textBlockOptions);
    var data;
    if (options.path) {
      data = helper.getObject({
        object: sheet.getCharacter(),
        path: options.path
      });
    };
    if (options.type) {
      if (options.type == "currency") {
        if (data != "") {
          data = parseFloat(data).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }) + " GP";
        };
      } else if (options.type == "number") {
        if (data != "") {
          data = parseFloat(data).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          });
        } else {
          data = 0;
        };
      } else if (options.type == "bonus") {
        if (data != "" && data > 0) {
          data = "+" + data;
        };
      };
    };
    textBlock.textContent = data;
  };

  function render(textBlock) {
    if (textBlock) {
      _render_textBlock(textBlock);
    } else {
      var all_textBlock = helper.eA(".js-text-block");
      for (var i = 0; i < all_textBlock.length; i++) {
        _render_textBlock(all_textBlock[i]);
      };
    };
  };

  // exposed methods
  return {
    render: render,
    clear: clear
  };

})();
