var checkUrl = (function() {

  function checkHttps() {
    var host = "the-data-is-a-lie.github.io"
    if (window.location.host == host && window.location.protocol != "https:") {
      window.location.protocol = "https:"
    };
  };

  function render() {
    if (helper.getUrlParameter("sheet")) {
      _reset();
    };
    if (helper.getUrlParameter("character")) {
      _loadCharacter();
    };
  };

  function _reset() {
    if (helper.getUrlParameter("sheet") == "restore") {
      sheet.restore();
    } else if (helper.getUrlParameter("sheet") == "all") {
      sheet.all();
    } else if (helper.getUrlParameter("sheet") == "destroy") {
      sheet.destroy();
    };
  };

  function _loadCharacter() {
    var index;
    var characterParameter = helper.getUrlParameter("character");
    var all_characters = sheet.get({
      length: true
    });
    for (var i = 0; i < all_characters.length; i++) {
      if (characterParameter == all_characters[i].basics.name.toLowerCase().split(" ")[0]) {
        index = i;
      };
    };
    if (typeof index !== "undefined") {
      sheet.switcher(index);
    } else {
      if (hardCodedCharacters.single()[characterParameter]) {
        sheet.add(hardCodedCharacters.single()[characterParameter]);
      } else {
        snack.render({
          message: "No character with that name."
        });
      };
    };
  }

  // exposed methods
  return {
    render: render,
    checkHttps: checkHttps,
  };

})();
