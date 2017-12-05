"use strict";

var helper = (function() {

  // methods on this object
  function e(selector) {
    return document.querySelector(selector);
  };

  function eA(selector) {
    return document.querySelectorAll(selector);
  };

  function toggleClass(element, theClassName) {
    element.classList.toggle(theClassName);
  };

  function addClass(element, theClassName) {
    element.classList.add(theClassName);
  };

  function removeClass(element, theClassName) {
    element.classList.remove(theClassName);
  };

  function delayFunction(functionToDelay, time) {
    window.setTimeout(functionToDelay, time);
  };

  function isJsonString(string) {
    try {
      JSON.parse(string);
    } catch (e) {
      return false;
    }
    return true;
  };

  function selectText(element) {
    var node = helper.e(element);
    if (document.selection) {
      var range = document.body.createTextRange();
      range.moveToElementText(node);
      range.select();
    } else if (window.getSelection) {
      var range = document.createRange();
      range.selectNodeContents(node);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
    }
  };

  function truncateString(string, length, dotDotDot) {
    if (dotDotDot) {
      dotDotDot = "...";
    } else {
      dotDotDot = "";
    };
    if (string.length > length) {
      var newString = string.substring(0, length) + dotDotDot;
      return newString;
    };
    return string;
  };

  function setDropdown(dropdown, value) {
    for (var i = 0; i < dropdown.options.length; i++) {
      if (dropdown.options[i].text == value) {
        dropdown.selectedIndex = i;
        dropdown.options[i].selected = true;
        // console.log(dropdown, value, dropdown.options, dropdown.selectedIndex);
        return;
      };
    };
  };

  function setObject(object, path, newValue) {
    var address = path.split(".");
    while (address.length > 1) {
      var currentKey = address.shift();
      var parentObject = object;
      object = object[currentKey];
      if (!object) {
        object = parentObject;
        object = object[currentKey] = {};
      };
    };
    object[address.shift()] = newValue;
  };

  function getObject(object, path, arrayIndex) {
    // split path into array items
    var address = path.split(".");
    // while array has more than 1 item
    while (address.length > 1) {
      // shift off and store the first key
      var currentKey = address.shift();
      // copy the object
      var parentObject = object;
      // drill down the object with the first key
      object = object[currentKey];
      // if there is not object there make one
      if (!object || typeof object != "object") {
        object = parentObject;
        // object = object[currentKey] = {};
        object[currentKey] = {};
      };
    };
    var finalKey = address.shift();
    if (finalKey in object) {
      if (arrayIndex !== undefined && typeof arrayIndex == "number") {
        // if arrayIndex return index of array
        // console.log("returning array", 1);
        return object[finalKey][arrayIndex];
      } else {
        // return value
        // console.log("returning value", 2);
        return object[finalKey];
      };
    } else {
      // if nothing found set empty value and then return
      // console.log("set value and returning value", 3);
      object[finalKey] = "";
      return object[finalKey];
    };
  };

  function getClosest(element, selector) {
    var firstChar = selector.charAt(0);
    // Get closest match
    for (; element && element !== document; element = element.parentNode) {
      // If selector is a class
      if (firstChar === ".") {
        if (element.classList.contains(selector.substr(1))) {
          return element;
        };
      };
      // If selector is an ID
      if (firstChar === "#") {
        if (element.id === selector.substr(1)) {
          return element;
        };
      };
      // If selector is a data attribute
      if (firstChar === "[") {
        if (element.hasAttribute(selector.substr(1, selector.length - 2))) {
          return element;
        };
      };
      // If selector is a tag
      if (element.tagName.toLowerCase() === selector) {
        return element;
      };
    };
    return false;
  };

  function randomId(stringLength) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < stringLength; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  };

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  function store(key, data) {
    if (localStorage.getItem) {
      localStorage.setItem(key, data);
    };
  };

  function remove(key) {
    if (localStorage.getItem) {
      localStorage.removeItem(key);
    };
  };

  function read(key) {
    if (localStorage.getItem(key) == "") {
      localStorage.removeItem(key);
    } else if (localStorage.getItem(key)) {
      return localStorage.getItem(key);
    };
  };

  function getRadioValue(form, radioGroupName) {
    var selectedDice;
    // get list of radio buttons with specified name
    var radios = form[radioGroupName];
    // radios can also be expressed with
    // console.log(e(".dice-form")["dice-select"]);
    // loop through list of radio buttons
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) { // radio checked?
        selectedDice = radios[i]; // if so, hold its value in selectedDice
      };
    };
    return selectedDice;
  };

  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  function pasteStrip(event) {
    if (event.clipboardData) {
      event.preventDefault();
      var text = event.clipboardData.getData("text/plain");
      document.execCommand("insertText", false, text);
    } else {
      return true;
    };
  };

  function inViewport(element) {
    var rectangle = element.getBoundingClientRect();
    return (
      rectangle.top >= 0 && rectangle.left >= 0 && rectangle.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rectangle.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  function sortObject(object, key) {
    object.sort(function(a, b) {
      // console.log(a);
      // console.log(b);
      var textA = a[key].toUpperCase();
      var textB = b[key].toUpperCase();
      if (textA < textB) {
        return -1;
      } else if (textA > textB) {
        return 1;
      } else {
        return 0;
      };
      // return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    return object;
  };

  function getDateTime() {
    var dateStamp = new Date();
    var object = {
      // string: dateStamp.constructor(),
      // time: dateStamp.getTime()
      date: dateStamp.getDate(),
      day: dateStamp.getDay(),
      year: dateStamp.getFullYear(),
      hours: dateStamp.getHours(),
      milliseconds: dateStamp.getMilliseconds(),
      minutes: dateStamp.getMinutes(),
      month: dateStamp.getMonth(),
      seconds: dateStamp.getSeconds()
    }
    return object;
  };

  function getAverageColor(imageBase64) {
    // var imageUrl = elementWithBackgroundImage.style.backgroundImage.slice(4, -1).replace(/"/g, "");
    var tempImage = new Image;
    tempImage.src = imageBase64;
    var blockSize = 5, // only visit every 5 pixels
      defaultRGB = {
        r: 0,
        g: 0,
        b: 0
      }, // for non-supporting envs
      canvas = document.createElement('canvas'),
      context = canvas.getContext && canvas.getContext('2d'),
      data, width, height,
      i = -4,
      length,
      rgb = {
        r: 0,
        g: 0,
        b: 0
      },
      count = 0;
    if (!context) {
      return defaultRGB;
    };
    canvas.height = tempImage.naturalHeight || tempImage.offsetHeight || tempImage.height;
    canvas.width = tempImage.naturalWidth || tempImage.offsetWidth || tempImage.width;
    height = canvas.height;
    width = canvas.width;
    context.drawImage(tempImage, 0, 0);
    data = context.getImageData(0, 0, width, height);
    length = data.data.length;
    while ((i += blockSize * 4) < length) {
      ++count;
      rgb.r += data.data[i];
      rgb.g += data.data[i + 1];
      rgb.b += data.data[i + 2];
    };
    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);
    return rgb;
  };

  // exposed methods
  return {
    store: store,
    remove: remove,
    read: read,
    e: e,
    eA: eA,
    toggleClass: toggleClass,
    addClass: addClass,
    removeClass: removeClass,
    isJsonString: isJsonString,
    getClosest: getClosest,
    selectText: selectText,
    delayFunction: delayFunction,
    setObject: setObject,
    getObject: getObject,
    truncate: truncateString,
    setDropdown: setDropdown,
    randomId: randomId,
    randomNumber: randomNumber,
    getRadioValue: getRadioValue,
    getUrlParameter: getUrlParameter,
    pasteStrip: pasteStrip,
    inViewport: inViewport,
    sortObject: sortObject,
    getDateTime: getDateTime,
    getAverageColor: getAverageColor
  };

})();

var card = (function() {

  function bind() {
    _bind_cardTitle();
    _bind_toggle();
    _bind_minimise();
  };

  function _bind_cardTitle() {
    var all_cardTitle = helper.eA(".js-card-title");
    for (var i = 0; i < all_cardTitle.length; i++) {
      all_cardTitle[i].addEventListener("click", function(event) {
        event.stopPropagation();
        event.preventDefault();
        _linkSelf(this);
      }, false);
    };
  };

  function _bind_minimise() {
    var all_cardMinimise = helper.eA(".js-card-minimise");
    for (var i = 0; i < all_cardMinimise.length; i++) {
      all_cardMinimise[i].addEventListener("click", function(event) {
        event.stopPropagation();
        event.preventDefault();
        _minimise(this);
      }, false);
    };
  };

  function _bind_toggle() {
    var all_cardDisplayToggle = helper.eA(".js-card-toggle");
    for (var i = 0; i < all_cardDisplayToggle.length; i++) {
      all_cardDisplayToggle[i].addEventListener("click", function(event) {
        event.stopPropagation();
        event.preventDefault();
        _toggle(this);
        // _unminimise(this);
      }, false);
    };
  };

  function _linkSelf(element) {
    var id = "#" + helper.getClosest(element, ".js-section").id;
    var all_section = helper.eA(".js-section");
    var quickNav = helper.e(".js-quick-nav");
    var offset;
    var options;
    // if nav is on the left after 900px wide viewport
    if (document.documentElement.clientWidth >= 900) {
      offset = parseInt(getComputedStyle(all_section[1]).marginTop, 10);
    } else {
      offset = parseInt(getComputedStyle(all_section[1]).marginTop, 10) + parseInt(getComputedStyle(quickNav).height, 10);
    };
    if (window.innerWidth < 550) {
      options = {
        speed: 150,
        offset: offset
      };
    } else {
      options = {
        speed: 300,
        offset: offset
      };
    };
    smoothScroll.animateScroll(null, id, options);
  };

  function _toggle(element) {
    var section = helper.getClosest(element, ".js-section");
    display.clear(section);
    display.render(section);
    display.toggle(section);
    display.update();
    themeColor.update();
  };

  // function _unminimise(element) {
  //   var section = helper.getClosest(element, ".js-section");
  //   var display = (section.dataset.displayMode == "true");
  //   var minimise = (section.dataset.minimise == "true");
  //   if (minimise && display) {
  //     _minimise(element);
  //   };
  // };

  function _minimise(element) {
    var section = helper.getClosest(element, ".js-section");
    var icon = section.querySelector(".js-card-minimise-icon");
    var cardTabs = section.querySelector(".js-card-tabs");
    var display = (section.dataset.displayMode == "true");

    var _minimise = function() {
      section.dataset.minimise = "true";
      helper.addClass(section, "is-minimise");
      helper.addClass(icon, "icon-unfold-more");
      helper.removeClass(icon, "icon-unfold-less");
      if (cardTabs && !display) {
        helper.addClass(cardTabs, "is-hidden");
      };
    };

    var _maximise = function() {
      section.dataset.minimise = "false";
      helper.removeClass(section, "is-minimise");
      helper.removeClass(icon, "icon-unfold-more");
      helper.addClass(icon, "icon-unfold-less");
      if (cardTabs && !display) {
        helper.removeClass(cardTabs, "is-hidden");
      };
    };

    if (section.dataset.minimise == "true") {
      _maximise();
    } else if (section.dataset.minimise == "false" || !section.dataset.minimise) {
      _minimise();
    };
  };

  // exposed methods
  return {
    bind: bind
  };

})();

var blank = (function() {

  var data = {
    awesomeSheet: true,
    basics: {
      name: "",
      race: "",
      level: "",
      classes: [{
        classname: "",
        level: "",
        hp: "",
        fortitude: "",
        reflex: "",
        will: "",
        ranks: "",
        bab: ""
      }],
      size: {
        category: "",
        size_modifier: 0,
        special_size_modifier: 0,
        size_modifier_fly: 0,
        size_modifier_stealth: 0
      },
      alignment: "",
      deity: "",
      height: "",
      weight: "",
      age: "",
      gender: "",
      speed: {
        land: "",
        fly: "",
        maneuverability: "",
        swim: "",
        climb: "",
        burrow: ""
      },
      hero_points: "",
      character_description: "",
      initiative: {
        misc: "",
        temp: "",
        feat: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      xp: {
        total: "",
        advancement_speed: "",
        next_level: "",
        needed: ""
      },
      character_image: {
        background: "",
        color: {
          r: "",
          g: "",
          b: ""
        },
        contain: "",
        cover: "",
        orientation: "",
        position: {
          x: "",
          y: ""
        },
        scale: "",
        image: ""
      }
    },
    statistics: {
      stats: {
        str: {
          current: "",
          modifier: "",
          base: "",
          enhancement: "",
          misc: "",
          racial: "",
          temp: ""
        },
        dex: {
          current: "",
          modifier: "",
          base: "",
          enhancement: "",
          misc: "",
          racial: "",
          temp: ""
        },
        con: {
          current: "",
          modifier: "",
          base: "",
          enhancement: "",
          misc: "",
          racial: "",
          temp: ""
        },
        int: {
          current: "",
          modifier: "",
          base: "",
          enhancement: "",
          misc: "",
          racial: "",
          temp: ""
        },
        wis: {
          current: "",
          modifier: "",
          base: "",
          enhancement: "",
          misc: "",
          racial: "",
          temp: ""
        },
        cha: {
          current: "",
          modifier: "",
          base: "",
          enhancement: "",
          misc: "",
          racial: "",
          temp: ""
        }
      },
      feats: "",
      traits: "",
      languages: "",
      special_abilities: ""
    },
    equipment: {
      gear: "",
      magic_gear: "",
      item: [],
      encumbrance: {
        encumbrance_str: "",
        carry_move: {
          light: "",
          medium: "",
          heavy: "",
          lift: "",
          drag: ""
        }
      },
      armor: {
        armor: "",
        check_penalty: "",
        max_dex: "",
        shield: ""
      },
      body_slots: {
        belts: "",
        body: "",
        chest: "",
        eyes: "",
        feet: "",
        hands: "",
        head: "",
        headband: "",
        neck: "",
        ring_left_hand: "",
        ring_right_hand: "",
        shoulders: "",
        wrist: ""
      },
      wealth: {
        platinum: "",
        gold: "",
        silver: "",
        copper: "",
        total: ""
      },
      consumable: []
    },
    defense: {
      hp: {
        total: "",
        temp: "",
        damage: "",
        non_lethal_damage: "",
        current: ""
      },
      ac: {
        misc: "",
        temp: "",
        armor: "",
        shield: "",
        deflect: "",
        dodge: "",
        natural: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          plus_ten: true,
          ac_armor: true,
          ac_shield: true,
          ac_deflect: true,
          ac_dodge: true,
          ac_natural: true,
          size: true,
          max_dex: true
        }
      },
      flat_footed: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          plus_ten: true,
          ac_armor: true,
          ac_shield: true,
          ac_deflect: true,
          ac_natural: true,
          size: true
        }
      },
      touch: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          plus_ten: true,
          ac_deflect: true,
          ac_dodge: true,
          size: true,
          max_dex: true
        }
      },
      ac_notes: "",
      fortitude: {
        base: "",
        resistance: "",
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: true,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      reflex: {
        base: "",
        resistance: "",
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      will: {
        base: "",
        resistance: "",
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      save_notes: "",
      dr: {
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        overcome: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      sr: {
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      resist_notes: ""
    },
    offense: {
      base_attack: "",
      base_attack_bonuses: "",
      cmb: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          special_size: true,
          level: false,
          half_level: false
        }
      },
      cmd: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: true,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          special_size: true,
          level: false,
          half_level: false,
          plus_ten: true
        }
      },
      melee_attack: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          size: true,
          level: false,
          half_level: false
        }
      },
      ranged_attack: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          size: true,
          level: false,
          half_level: false
        }
      },
      attack: {
        melee: [],
        ranged: []
      },
      attack_notes: ""
    },
    skills: {
      ranks: {
        total: "",
        spent: {
          include_custom: false,
          current: ""
        }
      },
      custom: [],
      acrobatics: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          class_skill: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      appraise: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      bluff: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      climb: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      craft_1: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      craft_2: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      diplomacy: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      disable_device: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      disguise: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      escape_artist: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      fly: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true,
          size_modifier_fly: true
        }
      },
      handle_animal: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      heal: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      intimidate: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_arcana: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_dungeoneering: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_engineering: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_geography: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_history: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_local: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_nature: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_nobility: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_planes: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_religion: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      linguistics: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      perception: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      perform_1: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      perform_2: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      profession_1: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      profession_2: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      ride: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      sense_motive: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      sleight_of_hand: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      spellcraft: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      stealth: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true,
          size_modifier_stealth: true
        }
      },
      survival: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      swim: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      use_magic_device: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      }
    },
    spells: {
      concentration: {
        current: "",
        misc: "",
        temp: "",
        feat: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      caster_level_check: {
        current: "",
        misc: "",
        temp: "",
        feat: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      spell_notes: "",
      per_day: {
        level_0: "",
        level_1: "",
        level_2: "",
        level_3: "",
        level_4: "",
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      dc: {
        level_0: "",
        level_1: "",
        level_2: "",
        level_3: "",
        level_4: "",
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      known: {
        level_0: "",
        level_1: "",
        level_2: "",
        level_3: "",
        level_4: "",
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      book: [{
        level_0: []
      }, {
        level_1: []
      }, {
        level_2: []
      }, {
        level_3: []
      }, {
        level_4: []
      }, {
        level_5: []
      }, {
        level_6: []
      }, {
        level_7: []
      }, {
        level_8: []
      }, {
        level_9: []
      }]
    },
    notes: {
      character: [],
      story: []
    },
    events: []
  };

  // exposed methods
  return {
    data: data
  };

})();

var izlara = (function() {

  var data = {
    "awesomeSheet": true,
    "basics": {
      "name": "Morin Mightyspark",
      "race": "Dwarf",
      "class": "Cleric",
      "level": "7",
      "size": "M",
      "alignment": "NG",
      "xp": "",
      "height": "",
      "weight": "",
      "age": "40",
      "gender": "M",
      "speed": "20 feet",
      "initiative": "+2",
      "hero_points": "1",
      "luck_points": "0"
    },
    "statistics": {
      "stats": {
        "str": {
          "score": "13",
          "temp": "",
          "modifier": 1,
          "temp_modifier": "",
          "temp_score": ""
        },
        "dex": {
          "score": "14",
          "temp": "",
          "modifier": 2,
          "temp_modifier": "",
          "temp_score": ""
        },
        "con": {
          "score": "11",
          "temp": "",
          "modifier": 0,
          "temp_modifier": "",
          "temp_score": ""
        },
        "int": {
          "score": "15",
          "temp": "",
          "modifier": 2,
          "temp_modifier": "",
          "temp_score": ""
        },
        "wis": {
          "score": "18",
          "temp": "",
          "modifier": 4,
          "temp_modifier": "",
          "temp_score": ""
        },
        "cha": {
          "score": "11",
          "temp": "",
          "modifier": 0,
          "temp_modifier": "",
          "temp_score": ""
        }
      },
      "feats": "Extra Channel, Weapon Focus (Morningstar), Craft Wand, Scribe Scroll",
      "traits": "See Dwarven Traits",
      "languages": "Common, Dwarven",
      "special_abilities": "Aura, Channel Energy"
    },
    "equipment": {
      "gear": "Large Steel Shield",
      "magic_gear": "Chainmail +1<div>Ring of Protection +1<div>Ring of the Whispering Way</div></div>",
      "encumbrance": {
        "light": "",
        "medium": "",
        "heavy": ""
      },
      "body_slots": {
        "armor": "Chain Mail +1",
        "belts": "",
        "body": "",
        "chest": "",
        "eyes": "",
        "feet": "",
        "hands": "",
        "head": "",
        "headband": "",
        "neck": "",
        "ring_left_hand": "Ring of Protection +1",
        "ring_right_hand": "",
        "shield": "Large Steel Shield",
        "shoulders": "",
        "wrist": ""
      },
      "wealth": {
        "platinum": "",
        "gold": "3344",
        "silver": "",
        "copper": ""
      },
      "consumable": [{
        "item": "Wand of Cure Light Wounds",
        "current": 43,
        "total": "50",
        "used": "7"
      }, {
        "item": "Scroll of Bull's Strength ",
        "current": 1,
        "total": "1",
        "used": ""
      }, {
        "item": "Potion of Cure Light Wounds",
        "current": 1,
        "total": "1",
        "used": ""
      }, {
        "item": "Scroll of Air Walk",
        "current": 1,
        "total": "1",
        "used": ""
      }]
    },
    "defense": {
      "hp": {
        "total": 52,
        "temp": "",
        "damage": 41,
        "non_lethal_damage": "",
        "current": 11
      },
      "ac": {
        "misc": "",
        "temp": "",
        "armor": "7",
        "shield": "2",
        "deflect": 1,
        "dodge": "",
        "natural": "",
        "size_bonus": "",
        "current": 22,
        "bonuses": {
          "str_bonus": false,
          "dex_bonus": true,
          "con_bonus": false,
          "int_bonus": false,
          "wis_bonus": false,
          "cha_bonus": false,
          "plus_ten": true,
          "ac_armor": true,
          "ac_shield": true,
          "ac_deflect": true,
          "ac_dodge": true,
          "ac_natural": true,
          "size": true
        },
        "check_penalty": -5,
        "max_dex": 2
      },
      "flat_footed": {
        "misc": "",
        "temp": "",
        "current": 20,
        "bonuses": {
          "str_bonus": false,
          "dex_bonus": false,
          "con_bonus": false,
          "int_bonus": false,
          "wis_bonus": false,
          "cha_bonus": false,
          "plus_ten": true,
          "ac_armor": true,
          "ac_shield": true,
          "ac_deflect": true,
          "ac_natural": true,
          "size": true
        }
      },
      "touch": {
        "misc": "",
        "temp": "",
        "current": 13,
        "bonuses": {
          "str_bonus": false,
          "dex_bonus": true,
          "con_bonus": false,
          "int_bonus": false,
          "wis_bonus": false,
          "cha_bonus": false,
          "plus_ten": true,
          "ac_deflect": true,
          "ac_dodge": true,
          "size": true
        }
      },
      "ac_notes": "",
      "fortitude": {
        "base": 5,
        "racial": "",
        "resistance": "",
        "misc": "",
        "temp": "",
        "current": 5,
        "bonuses": {
          "str_bonus": false,
          "dex_bonus": false,
          "con_bonus": true,
          "int_bonus": false,
          "wis_bonus": false,
          "cha_bonus": false
        }
      },
      "reflex": {
        "base": 2,
        "racial": "",
        "resistance": "",
        "misc": "",
        "temp": "",
        "current": 4,
        "bonuses": {
          "str_bonus": false,
          "dex_bonus": true,
          "con_bonus": false,
          "int_bonus": false,
          "wis_bonus": false,
          "cha_bonus": false
        }
      },
      "will": {
        "base": 5,
        "racial": "",
        "resistance": "",
        "misc": "",
        "temp": "",
        "current": 9,
        "bonuses": {
          "str_bonus": false,
          "dex_bonus": false,
          "con_bonus": false,
          "int_bonus": false,
          "wis_bonus": true,
          "cha_bonus": false
        }
      },
      "save_notes": "+2 vs poison, spells, and spell like abilities"
    },
    "offense": {
      "base_attack": "5",
      "concentration": "",
      "cmb": {
        "misc": "",
        "temp": "",
        "size": "",
        "current": 6,
        "bonuses": {
          "str_bonus": true,
          "dex_bonus": false,
          "con_bonus": false,
          "int_bonus": false,
          "wis_bonus": false,
          "cha_bonus": false,
          "bab": true,
          "level": false,
          "half_level": false
        }
      },
      "cmd": {
        "misc": "",
        "temp": "",
        "size": "",
        "current": 18,
        "bonuses": {
          "str_bonus": true,
          "dex_bonus": true,
          "con_bonus": false,
          "int_bonus": false,
          "wis_bonus": false,
          "cha_bonus": false,
          "bab": true,
          "level": false,
          "half_level": false,
          "plus_ten": true
        }
      },
      "melee_attack": {
        "misc": "",
        "temp": "",
        "size": "",
        "current": 6,
        "bonuses": {
          "str_bonus": true,
          "dex_bonus": false,
          "con_bonus": false,
          "int_bonus": false,
          "wis_bonus": false,
          "cha_bonus": false,
          "bab": true,
          "level": false,
          "half_level": false
        }
      },
      "ranged_attack": {
        "misc": "",
        "temp": "",
        "size": "",
        "current": 7,
        "bonuses": {
          "str_bonus": false,
          "dex_bonus": true,
          "con_bonus": false,
          "int_bonus": false,
          "wis_bonus": false,
          "cha_bonus": false,
          "bab": true,
          "level": false,
          "half_level": false
        }
      },
      "attack": {
        "melee": [{
          "weapon": "Morningstar",
          "attack": "7",
          "damage": "+2",
          "critical": "20 x2"
        }, {
          "weapon": "Scimitar",
          "attack": "5",
          "damage": "+1",
          "critical": "18-20 x2"
        }],
        "ranged": []
      },
      "attack_notes": "+1 Morningstar with Weapon Focus"
    },
    "skills": {
      "acrobatics": {
        "ranks": "",
        "misc": "",
        "current": 2,
        "bonuses": {
          "class_skill": false,
          "dex_bonus": true
        }
      },
      "appraise": {
        "ranks": "",
        "misc": "",
        "current": 2,
        "bonuses": {
          "class_skill": true,
          "int_bonus": true
        }
      },
      "bluff": {
        "ranks": "",
        "misc": "",
        "current": 0,
        "bonuses": {
          "class_skill": false,
          "cha_bonus": true
        }
      },
      "climb": {
        "ranks": "",
        "misc": "",
        "current": 1,
        "bonuses": {
          "class_skill": false,
          "str_bonus": true
        }
      },
      "craft_1": {
        "variant_name": "",
        "ranks": "",
        "misc": "",
        "current": 2,
        "bonuses": {
          "class_skill": true,
          "int_bonus": true
        }
      },
      "craft_2": {
        "variant_name": "",
        "ranks": "",
        "misc": "",
        "current": 2,
        "bonuses": {
          "class_skill": false,
          "int_bonus": true
        }
      },
      "diplomacy": {
        "ranks": "3",
        "misc": "",
        "current": 6,
        "bonuses": {
          "class_skill": true,
          "cha_bonus": true
        }
      },
      "disable_device": {
        "ranks": "",
        "misc": "",
        "current": 2,
        "bonuses": {
          "class_skill": false,
          "dex_bonus": true
        }
      },
      "disguise": {
        "ranks": "",
        "misc": "",
        "current": 0,
        "bonuses": {
          "class_skill": false,
          "cha_bonus": true
        }
      },
      "escape_artist": {
        "ranks": "",
        "misc": "",
        "current": 2,
        "bonuses": {
          "class_skill": false,
          "dex_bonus": true
        }
      },
      "fly": {
        "ranks": "",
        "misc": "",
        "current": 2,
        "bonuses": {
          "class_skill": false,
          "dex_bonus": true
        }
      },
      "handle_animal": {
        "ranks": "",
        "misc": "",
        "current": 0,
        "bonuses": {
          "class_skill": false,
          "cha_bonus": true
        }
      },
      "heal": {
        "ranks": 4,
        "misc": "",
        "current": 11,
        "bonuses": {
          "class_skill": true,
          "wis_bonus": true
        }
      },
      "intimidate": {
        "ranks": "",
        "misc": "",
        "current": 0,
        "bonuses": {
          "class_skill": false,
          "cha_bonus": true
        }
      },
      "knowledge_arcana": {
        "ranks": "",
        "misc": "",
        "current": 2,
        "bonuses": {
          "class_skill": true,
          "int_bonus": true
        }
      },
      "knowledge_dungeoneering": {
        "ranks": "",
        "misc": "",
        "current": 2,
        "bonuses": {
          "class_skill": false,
          "int_bonus": true
        }
      },
      "knowledge_engineering": {
        "ranks": "",
        "misc": "",
        "current": 2,
        "bonuses": {
          "class_skill": false,
          "int_bonus": true
        }
      },
      "knowledge_geography": {
        "ranks": "",
        "misc": "",
        "current": 2,
        "bonuses": {
          "class_skill": false,
          "int_bonus": true
        }
      },
      "knowledge_history": {
        "ranks": "",
        "misc": "",
        "current": 2,
        "bonuses": {
          "class_skill": true,
          "int_bonus": true
        }
      },
      "knowledge_local": {
        "ranks": "",
        "misc": "",
        "current": 2,
        "bonuses": {
          "class_skill": false,
          "int_bonus": true
        }
      },
      "knowledge_nature": {
        "ranks": "",
        "misc": "",
        "current": 2,
        "bonuses": {
          "class_skill": false,
          "int_bonus": true
        }
      },
      "knowledge_nobility": {
        "ranks": "",
        "misc": "",
        "current": 2,
        "bonuses": {
          "class_skill": true,
          "int_bonus": true
        }
      },
      "knowledge_planes": {
        "ranks": "1",
        "misc": "",
        "current": 6,
        "bonuses": {
          "class_skill": true,
          "int_bonus": true
        }
      },
      "knowledge_religion": {
        "ranks": 5,
        "misc": "",
        "current": 10,
        "bonuses": {
          "class_skill": true,
          "int_bonus": true
        }
      },
      "linguistics": {
        "ranks": "",
        "misc": "",
        "current": 2,
        "bonuses": {
          "class_skill": true,
          "int_bonus": true
        }
      },
      "perception": {
        "ranks": 7,
        "misc": "",
        "current": 11,
        "bonuses": {
          "class_skill": false,
          "wis_bonus": true
        }
      },
      "perform_1": {
        "variant_name": "",
        "ranks": "",
        "misc": "",
        "current": 0,
        "bonuses": {
          "class_skill": false,
          "cha_bonus": true
        }
      },
      "perform_2": {
        "variant_name": "",
        "ranks": "",
        "misc": "",
        "current": 0,
        "bonuses": {
          "class_skill": false,
          "cha_bonus": true
        }
      },
      "profession_1": {
        "variant_name": "",
        "ranks": "",
        "misc": "",
        "current": 4,
        "bonuses": {
          "class_skill": true,
          "wis_bonus": true
        }
      },
      "profession_2": {
        "variant_name": "",
        "ranks": "",
        "misc": "",
        "current": 4,
        "bonuses": {
          "class_skill": false,
          "wis_bonus": true
        }
      },
      "ride": {
        "ranks": "",
        "misc": "",
        "current": 2,
        "bonuses": {
          "class_skill": false,
          "dex_bonus": true
        }
      },
      "sense_motive": {
        "ranks": "1",
        "misc": "",
        "current": 8,
        "bonuses": {
          "class_skill": true,
          "wis_bonus": true
        }
      },
      "sleight_of_hand": {
        "ranks": "",
        "misc": "",
        "current": 2,
        "bonuses": {
          "class_skill": false,
          "dex_bonus": true
        }
      },
      "spellcraft": {
        "ranks": 7,
        "misc": "",
        "current": 12,
        "bonuses": {
          "class_skill": true,
          "int_bonus": true
        }
      },
      "stealth": {
        "ranks": "",
        "misc": "",
        "current": 2,
        "bonuses": {
          "class_skill": false,
          "dex_bonus": true
        }
      },
      "survival": {
        "ranks": "",
        "misc": "",
        "current": 4,
        "bonuses": {
          "class_skill": false,
          "wis_bonus": true
        }
      },
      "swim": {
        "ranks": "",
        "misc": "",
        "current": 1,
        "bonuses": {
          "class_skill": false,
          "str_bonus": true
        }
      },
      "use_magic_device": {
        "ranks": "",
        "misc": "",
        "current": 0,
        "bonuses": {
          "class_skill": false,
          "cha_bonus": true
        }
      },
      "custom_1": {
        "name": "",
        "ranks": "",
        "misc": "",
        "current": 0,
        "bonuses": {
          "class_skill": false,
          "str_bonus": false,
          "dex_bonus": false,
          "con_bonus": false,
          "int_bonus": false,
          "wis_bonus": false,
          "cha_bonus": false,
          "level": false,
          "half_level": false
        }
      },
      "custom_2": {
        "name": "",
        "ranks": "",
        "misc": "",
        "current": 0,
        "bonuses": {
          "class_skill": false,
          "str_bonus": false,
          "dex_bonus": false,
          "con_bonus": false,
          "int_bonus": false,
          "wis_bonus": false,
          "cha_bonus": false,
          "level": false,
          "half_level": false
        }
      },
      "custom_3": {
        "name": "",
        "ranks": "",
        "misc": "",
        "current": 0,
        "bonuses": {
          "class_skill": false,
          "str_bonus": false,
          "dex_bonus": false,
          "con_bonus": false,
          "int_bonus": false,
          "wis_bonus": false,
          "cha_bonus": false,
          "level": false,
          "half_level": false
        }
      },
      "custom_4": {
        "name": "",
        "ranks": "",
        "misc": "",
        "current": 0,
        "bonuses": {
          "class_skill": false,
          "str_bonus": false,
          "dex_bonus": false,
          "con_bonus": false,
          "int_bonus": false,
          "wis_bonus": false,
          "cha_bonus": false,
          "level": false,
          "half_level": false
        }
      },
      "custom_5": {
        "name": "",
        "ranks": "",
        "misc": "",
        "current": 0,
        "bonuses": {
          "class_skill": ""
        }
      },
      "custom_6": {
        "name": "",
        "ranks": "",
        "misc": "",
        "current": 0,
        "bonuses": {
          "class_skill": ""
        }
      },
      "custom_7": {
        "name": "",
        "ranks": "",
        "misc": "",
        "current": 0,
        "bonuses": {
          "class_skill": ""
        }
      },
      "custom_8": {
        "name": "",
        "ranks": "",
        "misc": "",
        "current": 0,
        "bonuses": {
          "class_skill": ""
        }
      },
      "spent_ranks": {
        "include_custom": "",
        "current": 28
      }
    },
    "spells": {
      "per_day": {
        "level_0": 4,
        "level_1": 5,
        "level_2": 4,
        "level_3": "3",
        "level_4": "",
        "level_5": "",
        "level_6": "",
        "level_7": "",
        "level_8": "",
        "level_9": ""
      },
      "dc": {
        "level_0": 14,
        "level_1": 15,
        "level_2": 16,
        "level_3": 17,
        "level_4": 18,
        "level_5": "",
        "level_6": "",
        "level_7": "",
        "level_8": "",
        "level_9": ""
      },
      "known": {
        "level_0": "",
        "level_1": "",
        "level_2": "",
        "level_3": "",
        "level_4": 2,
        "level_5": "",
        "level_6": "",
        "level_7": "",
        "level_8": "",
        "level_9": ""
      },
      "book": [{
        "level_0": [{
          "name": "Detect magic",
          "prepared": 1,
          "active": false,
          "cast": 0
        }, {
          "name": "Guidance",
          "prepared": 1,
          "active": false,
          "cast": 0
        }, {
          "name": "Resistance",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Stabilise",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Bleed",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Create water",
          "prepared": 1,
          "active": false,
          "cast": 0
        }, {
          "name": "Detect poison",
          "prepared": 1,
          "active": false,
          "cast": 0
        }, {
          "name": "Light",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Mending",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Purify food and drink",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Read magic",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Spark",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Virtue",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Firebolt 1d6 +4",
          "prepared": 8,
          "active": false,
          "cast": 0
        }, {
          "name": "Channel Energy 4d6",
          "prepared": 5,
          "active": false,
          "cast": 0,
          "note": ""
        }, {
          "name": "Rebuke Death 1d4 +4",
          "prepared": 8,
          "active": false,
          "cast": 0
        }]
      }, {
        "level_1": [{
          "name": "Bless",
          "prepared": 1,
          "active": false,
          "cast": 0
        }, {
          "name": "Ant haul",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Bane",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Bless water",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Cause fear",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Command",
          "prepared": 1,
          "active": false,
          "cast": 0
        }, {
          "name": "Comprehend languages",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Cure light wounds",
          "prepared": 1,
          "active": false,
          "cast": 0
        }, {
          "name": "Remove fear",
          "prepared": 1,
          "active": false,
          "cast": 0
        }, {
          "name": "Dancing lantern",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Deathwatch",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Detect chaos",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Detect evil",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Detect good",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Detect law",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Detect undead",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Divine favor",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Endure elements",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Entropic shield",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Hide from undead",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Magic stone",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Magic weapon",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Obscuring mist",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Protection from chaos",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Protection from evil",
          "prepared": 1,
          "active": false,
          "cast": 0
        }, {
          "name": "Protection from good",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Protection from law",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Sanctuary",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Shield of faith",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Summon monster I",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Remove paralysis",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Resist energy",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Restoration, lesser",
          "prepared": 1,
          "active": false,
          "cast": 0
        }, {
          "name": "Share language",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Burning hands",
          "prepared": 1,
          "active": false,
          "cast": 0
        }]
      }, {
        "level_2": [{
          "name": "Aid",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Align weapon",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Augury",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Bear's endurance",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Blessing of courage and life",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Bull's strength",
          "prepared": 1,
          "active": false,
          "cast": 0
        }, {
          "name": "Calm emotions",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Consecrate",
          "prepared": 1,
          "active": false,
          "cast": 0
        }, {
          "name": "Cure moderate wounds",
          "prepared": 1,
          "active": false,
          "cast": 0
        }, {
          "name": "Darkness",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Death knell",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Delay poison",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Eagle's splendor",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Summon monster II",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Find traps",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Gentle repose",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Ghostbane dirge",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Grace",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Heroic fortune",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Hold person",
          "prepared": 1,
          "active": false,
          "cast": 0
        }, {
          "name": "Instant armor",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Make whole",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Shield other",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Silence",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Spiritual weapon",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Status",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Undetectable alignment",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Weapon of awe",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Zone of truth",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Owl's wisdom",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Sound burst",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Shatter",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Produce flame",
          "prepared": 1,
          "active": false,
          "cast": 0
        }, {
          "name": "Remove Paralysis",
          "prepared": 1,
          "active": false,
          "cast": 0,
          "note": ""
        }]
      }, {
        "level_3": [{
          "name": "Fireball",
          "prepared": 1,
          "active": false,
          "cast": 1
        }, {
          "name": "Blood biography",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Continual flame",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Create food and water",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Daylight",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Deeper darkness",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Dispell magic",
          "prepared": 1,
          "active": false,
          "cast": 1
        }, {
          "name": "Elemental speech",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Enter image",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Glyph of warding",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Guiding star",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Helping hand",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Invisibility purge",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Locate object",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Magic circle against evil",
          "prepared": 1,
          "active": false,
          "cast": 1
        }, {
          "name": "Magic vestment",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Meld into stone",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Nap stack",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Obscure object",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Prayer",
          "prepared": 1,
          "active": false,
          "cast": 0
        }, {
          "name": "Protection from energy",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Remove blindness/deafness",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Remove curse",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Remove disease",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Sacred bond",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Searing light",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Speak with dead",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Stone shape",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Summon monster III",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Unravel destiny",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Water breathing",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Water walk ",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Wind wall",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Wrathful mantle",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Cure Serious Wounds ",
          "prepared": 1,
          "active": false,
          "cast": 1,
          "note": ""
        }]
      }, {
        "level_4": [{
          "name": "Wall of Fire",
          "prepared": 1,
          "active": false,
          "cast": 1
        }, {
          "name": "Cure Critical Wounds",
          "prepared": 1,
          "active": false,
          "cast": 1
        }, {
          "name": "Air Walk",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Blessing of Fervor",
          "prepared": 1,
          "active": false,
          "cast": 0,
          "note": ""
        }, {
          "name": "Control Water",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Death Ward",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Dimensional Anchor",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Discern Lies",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Dismissal ",
          "prepared": 0,
          "active": false,
          "cast": 0,
          "note": ""
        }, {
          "name": "Divination",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Divine Power",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Freedom of Movement",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Giant Vermin",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Holy Smite",
          "prepared": 1,
          "active": false,
          "cast": 1
        }, {
          "name": "Imbue with Spell Ability",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Magic Weapon, Greater",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Neutralise Poison",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Planar Adaptation",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Planar Ally, Lesser",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Repel Vermin",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Restoration ",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Sending",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Spell Immunity",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Spiritual Ally",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Summon Monster IV",
          "prepared": 0,
          "active": false,
          "cast": 0
        }, {
          "name": "Tongues",
          "prepared": 0,
          "active": false,
          "cast": 0
        }]
      }, {
        "level_5": []
      }, {
        "level_6": []
      }, {
        "level_7": []
      }, {
        "level_8": []
      }, {
        "level_9": []
      }],
      "concentration": {
        "misc": "",
        "temp": "",
        "current": 0,
        "bonuses": ""
      }
    },
    "notes": {
      "character": "",
      "story": ""
    }
  };
  
  // exposed methods
  return {
    data: data
  };

})();

var ravich = (function() {

  var data = {
    awesomeSheet: true,
    basics: {
      name: "Ravich Swiftcloak",
      race: "Human",
      level: 6,
      classes: [{
        classname: "Rogue",
        level: 3,
        hp: 24,
        fortitude: 1,
        reflex: 3,
        will: 1,
        ranks: 27,
        bab: 2
      }, {
        classname: "Fighter",
        level: 3,
        hp: 21,
        fortitude: 3,
        reflex: 1,
        will: 1,
        ranks: 9,
        bab: 3
      }],
      size: {
        category: "Medium",
        size_modifier: 4,
        special_size_modifier: -4,
        size_modifier_fly: 6,
        size_modifier_stealth: 12
      },
      alignment: "Chaotic Neutral",
      deity: "",
      height: "6ft",
      weight: "134lbs",
      age: "24",
      gender: "Male",
      speed: {
        land: "30ft",
        fly: "",
        maneuverability: "",
        swim: "",
        climb: "",
        burrow: ""
      },
      hero_points: "1",
      character_description: "A sneaky man with a realistic outlook on life. Tall, slim build, sallow pale skin, long scruffy face, sunken cheeks, light blue wide-set eyes, bushy eyebrows.",
      initiative: {
        misc: "",
        temp: "",
        feat: 4,
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      xp: {
        total: 23000,
        advancement_speed: "Medium",
        next_level: "",
        needed: ""
      },
      character_image: {
        background: "average",
        color: {
          r: 81,
          g: 80,
          b: 81
        },
        contain: 100,
        cover: 100,
        orientation: "square",
        position: {
          x: 60,
          y: 60
        },
        scale: 130,
        image: "data:image/jpeg;base64,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bCAgZG91YkBv4AAAAAAAAAAAAEJyZFRVbnRGI1JsdAAAAAAAAAAAAAAAAEJsZCBVbnRGI1JsdAAAAAAAAAAAAAAAAFJzbHRVbnRGI1B4bEBSAAAAAAAAAAAACnZlY3RvckRhdGFib29sAQAAAABQZ1BzZW51bQAAAABQZ1BzAAAAAFBnUEMAAAAATGVmdFVudEYjUmx0AAAAAAAAAAAAAAAAVG9wIFVudEYjUmx0AAAAAAAAAAAAAAAAU2NsIFVudEYjUHJjQFkAAAAAAAAAAAAQY3JvcFdoZW5QcmludGluZ2Jvb2wAAAAADmNyb3BSZWN0Qm90dG9tbG9uZwAAAAAAAAAMY3JvcFJlY3RMZWZ0bG9uZwAAAAAAAAANY3JvcFJlY3RSaWdodGxvbmcAAAAAAAAAC2Nyb3BSZWN0VG9wbG9uZwAAAAAAOEJJTQPtAAAAAAAQAEgAAAABAAIASAAAAAEAAjhCSU0EJgAAAAAADgAAAAAAAAAAAAA/gAAAOEJJTQQNAAAAAAAEAAAAHjhCSU0EGQAAAAAABAAAAB44QklNA/MAAAAAAAkAAAAAAAAAAAEAOEJJTQQKAAAAAAABAAA4QklNJxAAAAAAAAoAAQAAAAAAAAACOEJJTQP1AAAAAABIAC9mZgABAGxmZgAGAAAAAAABAC9mZgABAKGZmgAGAAAAAAABADIAAAABAFoAAAAGAAAAAAABADUAAAABAC0AAAAGAAAAAAABOEJJTQP4AAAAAABwAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAADhCSU0ECAAAAAAAEAAAAAEAAAJAAAACQAAAAAA4QklNBB4AAAAAAAQAAAAAOEJJTQQaAAAAAANBAAAABgAAAAAAAAAAAAAB9AAAAfQAAAAGAHIAYQB2AGkAYwBoAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAH0AAAB9AAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAABAAAAABAAAAAAAAbnVsbAAAAAIAAAAGYm91bmRzT2JqYwAAAAEAAAAAAABSY3QxAAAA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ME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bXBSaWdodHM6TWFya2VkPSJGYWxzZSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ1dWlkOjRFRjVGNTM3Q0FDNkUxMTFBRUZBQ0MzRDQzNkQ1MzY4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkY1MzY2NzY5MkJCQTExRTI5MTFDRTg2NTQ5REMyQ0MyIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM2MjgwNDBiLWNkZjEtNDdkOS1hNzQ4LTMxMGY0YmZiZjRmZiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1MzIE1hY2ludG9zaCIgeG1wOkNyZWF0ZURhdGU9IjIwMTctMTEtMjdUMDA6Mzg6NDBaIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxNy0xMS0yN1QwMDo0MDoxOVoiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTctMTEtMjdUMDA6NDA6MTlaIiBkYzpmb3JtYXQ9ImltYWdlL2pwZWciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0idXVpZDpFM0VGQjEwMDU4MERFMjExQkNBMzhFQTA2NUM4NzM4MyIgc3RSZWY6ZG9jdW1lbnRJRD0idXVpZDo0RUY1RjUzN0NBQzZFMTExQUVGQUNDM0Q0MzZENTM2OCIvPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDozNjI4MDQwYi1jZGYxLTQ3ZDktYTc0OC0zMTBmNGJmYmY0ZmYiIHN0RXZ0OndoZW49IjIwMTctMTEtMjdUMDA6NDA6MTlaIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+4AIUFkb2JlAGRAAAAAAQMAEAMCAwYAAAAAAAAAAAAAAAD/2wCEAAEBAQEBAQEBAQEB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"
      }
    },
    statistics: {
      stats: {
        str: {
          current: "",
          modifier: "",
          base: 16,
          enhancement: 2,
          misc: "",
          racial: "",
          temp: ""
        },
        dex: {
          current: "",
          modifier: "",
          base: 16,
          enhancement: 2,
          misc: "",
          racial: 2,
          temp: ""
        },
        con: {
          current: "",
          modifier: "",
          base: 13,
          enhancement: "",
          misc: "",
          racial: "",
          temp: ""
        },
        int: {
          current: "",
          modifier: "",
          base: 13,
          enhancement: "",
          misc: "",
          racial: "",
          temp: ""
        },
        wis: {
          current: "",
          modifier: "",
          base: 12,
          enhancement: "",
          misc: "",
          racial: "",
          temp: -2
        },
        cha: {
          current: "",
          modifier: "",
          base: 10,
          enhancement: "",
          misc: "",
          racial: "",
          temp: ""
        }
      },
      feats: "Weapon Finesse, Weapon Focus (Rapier), Improved Initiative, Deft Hands, Acrobatic, Toughness, Two-Weapon Fighting, Magical Aptitude, Great Fortitude",
      traits: "Resilient, Dirty Fighter",
      languages: "Common, Humans, Dwarven, Undercommon",
      special_abilities: "Sneak Attack +2d6, Trapfinding, Evasion, Rogue Talent (Finesse Rogue), Trap Sense +1, Bonus Feat (2), Bravery +1, Armor Training 1"
    },
    equipment: {
      gear: "Backpack, Flask Of Oil (2), Pouch (belt), Sack, Candle, Flint And Steel, Tindertwig, Rations (5 Days), Waterskin, Bedroll, Blanket, Bloodblock, Rope (silk), Mirror, Compass, Ink, Inkpen, Paper Sheets, Case For Maps/scrolls, Torch, Dagger, Combat Horse (Tafi), Roc feathers, head and feet, Red Dragon (Adult) scales and claws",
      magic_gear: "Ioun Stone (Dusty Rose), Feather Token (Tree)<br><br>Potion:<br>Cure Light Wounds (4), Cure Moderate Wounds (5), Cure Serious Wounds (1), Resist Fire (1), Alchemist Fire (1), Lesser Restoration (1), Remove Disease (1)",
      item: [{
        name: "Flask of Oil",
        quantity: 2,
        weight: 2
      }, {
        name: "Waterskin",
        quantity: 1,
        weight: 4
      }, {
        name: "Bedroll & Blanket",
        quantity: 1,
        weight: 8
      }, {
        name: "Rope (silk)",
        quantity: 1,
        weight: 5
      }, {
        name: "Mirror",
        quantity: 1,
        weight: 0.5
      }, {
        name: "Compass",
        quantity: 1,
        weight: 1
      }],
      encumbrance: {
        encumbrance_str: "",
        carry_move: {
          light: "",
          medium: "",
          heavy: "",
          lift: "",
          drag: ""
        }
      },
      armor: {
        armor: "Mithral Chain Shirt +1",
        check_penalty: 0,
        max_dex: 6,
        shield: "Mithral Buckler +1"
      },
      body_slots: {
        belts: "Belt of Physical Might +2 (Str, Dex)",
        body: "",
        chest: "",
        eyes: "",
        feet: "Boots of Striding and Springing",
        hands: "",
        head: "",
        headband: "",
        neck: "Amulet of Natural Armor +1",
        ring_left_hand: "Ring of Protection +1",
        ring_right_hand: "",
        shoulders: "Cloak of Resistance +1",
        wrist: ""
      },
      wealth: {
        platinum: 120,
        gold: 26302,
        silver: 50,
        copper: "",
        total: ""
      },
      consumable: [{
        item: "Wand of Cure Light Wounds",
        current: "",
        total: 50,
        used: 32
      }, {
        item: "Wand of Invisibility",
        current: "",
        total: 50,
        used: 12
      }]
    },
    defense: {
      hp: {
        total: "",
        temp: "",
        damage: 5,
        non_lethal_damage: "",
        current: ""
      },
      ac: {
        misc: 1,
        temp: "",
        armor: 5,
        shield: 1,
        deflect: 1,
        dodge: "",
        natural: 1,
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          plus_ten: true,
          ac_armor: true,
          ac_shield: true,
          ac_deflect: true,
          ac_dodge: true,
          ac_natural: true,
          size: true,
          max_dex: true
        }
      },
      flat_footed: {
        misc: 1,
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          plus_ten: true,
          ac_armor: true,
          ac_shield: true,
          ac_deflect: true,
          ac_natural: true,
          size: true
        }
      },
      touch: {
        misc: 1,
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          plus_ten: true,
          ac_deflect: true,
          ac_dodge: true,
          size: true,
          max_dex: true
        }
      },
      ac_notes: "+1 dodge bonus to AC against attacks made by traps. +1 damage when flanking.",
      fortitude: {
        base: "",
        resistance: 1,
        feat: 2,
        trait: 1,
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: true,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      reflex: {
        base: "",
        resistance: 1,
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      will: {
        base: "",
        resistance: 1,
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      save_notes: "+1 bonus on Reflex saves made to avoid traps.",
      dr: {
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        overcome: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      sr: {
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      resist_notes: ""
    },
    offense: {
      base_attack: "",
      base_attack_bonuses: "",
      cmb: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          special_size: true,
          level: false,
          half_level: false
        }
      },
      cmd: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: true,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          special_size: true,
          level: false,
          half_level: false,
          plus_ten: true
        }
      },
      melee_attack: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          size: true,
          level: false,
          half_level: false
        }
      },
      ranged_attack: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          size: true,
          level: false,
          half_level: false
        }
      },
      attack: {
        melee: [{
          weapon: "Rapier +1 Flaming",
          attack: "+11",
          damage: "1d6+4, 1d6 fire",
          critical: "18–20/x2",
          type: "Piercing"
        }, {
          weapon: "Short Sword +1",
          attack: "+10",
          damage: "1d6+4",
          critical: "19–20/x2",
          type: "Piercing"
        }, {
          weapon: "Rapier +1 Flaming, Short Sword +1",
          attack: "+9/+8",
          damage: "1d6+4, 1d6 fire/1d6+4",
          critical: "18–20/x2, 19–20/x2",
          type: "Piercing"
        }],
        ranged: [{
          weapon: "Shortbow +1",
          attack: "+15",
          damage: "1d6",
          critical: "x3",
          range: "60ft",
          ammo: "30 nornal",
          type: "Piercing"
        }]
      },
      attack_notes: "Sneak Attack +2d6"
    },
    skills: {
      ranks: {
        total: "",
        spent: {
          include_custom: false,
          current: ""
        }
      },
      custom: [{
        name: "Perception (Traps)",
        ranks: 6,
        misc: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          class_skill: true,
          level: false,
          half_level: true,
          check_penalty: false
        },
        current: ""
      }, {
        name: "Disable Device (Traps)",
        ranks: 6,
        misc: 2,
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          class_skill: true,
          level: false,
          half_level: true,
          check_penalty: false
        },
        current: ""
      }, {
        name: "Acrobatics (Jump)",
        ranks: 6,
        misc: 5,
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          class_skill: true,
          level: false,
          half_level: false,
          check_penalty: false
        },
        current: ""
      }],
      acrobatics: {
        ranks: 6,
        misc: 2,
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          class_skill: true,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      appraise: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      bluff: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      climb: {
        ranks: 1,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      craft_1: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      craft_2: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      diplomacy: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      disable_device: {
        ranks: 6,
        misc: 2,
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      disguise: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      escape_artist: {
        ranks: 6,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      fly: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true,
          size_modifier_fly: true
        }
      },
      handle_animal: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      heal: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      intimidate: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_arcana: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_dungeoneering: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_engineering: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_geography: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_history: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_local: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_nature: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_nobility: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_planes: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_religion: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      linguistics: {
        ranks: 1,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      perception: {
        ranks: 6,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      perform_1: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      perform_2: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      profession_1: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      profession_2: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      ride: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      sense_motive: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      sleight_of_hand: {
        ranks: 4,
        misc: 2,
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      spellcraft: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      stealth: {
        ranks: 6,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true,
          size_modifier_stealth: true
        }
      },
      survival: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      swim: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      use_magic_device: {
        ranks: 6,
        misc: 2,
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      }
    },
    spells: {
      concentration: {
        current: "",
        misc: "",
        temp: "",
        feat: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      caster_level_check: {
        current: "",
        misc: "",
        temp: "",
        feat: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      spell_notes: "",
      per_day: {
        level_0: "",
        level_1: "",
        level_2: "",
        level_3: "",
        level_4: "",
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      dc: {
        level_0: "",
        level_1: "",
        level_2: "",
        level_3: "",
        level_4: "",
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      known: {
        level_0: "",
        level_1: "",
        level_2: "",
        level_3: "",
        level_4: "",
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      book: [{
        level_0: []
      }, {
        level_1: []
      }, {
        level_2: []
      }, {
        level_3: []
      }, {
        level_4: []
      }, {
        level_5: []
      }, {
        level_6: []
      }, {
        level_7: []
      }, {
        level_8: []
      }, {
        level_9: []
      }]
    },
    notes: {
      character: [],
      story: []
    },
    events: [{
      type: "platinum",
      event: {
        aggregate_value: 90
      },
      timestamp: {
        date: 13,
        day: 4,
        year: 2017,
        hours: 14,
        milliseconds: 700,
        minutes: 16,
        month: 6,
        seconds: 32
      }
    }, {
      type: "gold",
      event: {
        aggregate_value: 7655
      },
      timestamp: {
        date: 13,
        day: 4,
        year: 2017,
        hours: 14,
        milliseconds: 671,
        minutes: 16,
        month: 6,
        seconds: 19
      }
    }, {
      type: "xp",
      event: {
        aggregate_value: 1210
      },
      timestamp: {
        date: 13,
        day: 4,
        year: 2017,
        hours: 14,
        milliseconds: 937,
        minutes: 16,
        month: 6,
        seconds: 12
      }
    }, {
      type: "gold",
      event: {
        aggregate_value: 5600
      },
      timestamp: {
        date: 5,
        day: 3,
        year: 2017,
        hours: 18,
        milliseconds: 590,
        minutes: 40,
        month: 6,
        seconds: 42
      }
    }, {
      type: "gold",
      event: {
        aggregate_value: 8700
      },
      timestamp: {
        date: 28,
        day: 3,
        year: 2017,
        hours: 23,
        milliseconds: 951,
        minutes: 25,
        month: 5,
        seconds: 59
      }
    }, {
      type: "xp",
      event: {
        aggregate_value: 3000
      },
      timestamp: {
        date: 28,
        day: 3,
        year: 2017,
        hours: 21,
        milliseconds: 738,
        minutes: 1,
        month: 5,
        seconds: 41
      }
    }, {
      type: "gold",
      event: {
        aggregate_value: -5000
      },
      timestamp: {
        date: 21,
        day: 3,
        year: 2017,
        hours: 6,
        milliseconds: 633,
        minutes: 31,
        month: 5,
        seconds: 54
      }
    }, {
      type: "gold",
      event: {
        aggregate_value: 90
      },
      timestamp: {
        date: 21,
        day: 3,
        year: 2017,
        hours: 5,
        milliseconds: 199,
        minutes: 26,
        month: 5,
        seconds: 46
      }
    }, {
      type: "xp",
      event: {
        aggregate_value: 3600
      },
      timestamp: {
        date: 21,
        day: 3,
        year: 2017,
        hours: 5,
        milliseconds: 134,
        minutes: 26,
        month: 5,
        seconds: 31
      }
    }, {
      type: "silver",
      event: {
        aggregate_value: 50
      },
      timestamp: {
        date: 14,
        day: 3,
        year: 2017,
        hours: 7,
        milliseconds: 87,
        minutes: 40,
        month: 5,
        seconds: 45
      }
    }, {
      type: "gold",
      event: {
        aggregate_value: -3700
      },
      timestamp: {
        date: 14,
        day: 3,
        year: 2017,
        hours: 7,
        milliseconds: 748,
        minutes: 40,
        month: 5,
        seconds: 40
      }
    }, {
      type: "xp",
      event: {
        aggregate_value: 5440
      },
      timestamp: {
        date: 14,
        day: 3,
        year: 2017,
        hours: 18,
        milliseconds: 921,
        minutes: 20,
        month: 5,
        seconds: 28
      }
    }, {
      type: "gold",
      event: {
        aggregate_value: 4430
      },
      timestamp: {
        date: 14,
        day: 3,
        year: 2017,
        hours: 18,
        milliseconds: 923,
        minutes: 20,
        month: 5,
        seconds: 16
      }
    }, {
      type: "platinum",
      event: {
        aggregate_value: 20
      },
      timestamp: {
        date: 14,
        day: 3,
        year: 2017,
        hours: 18,
        milliseconds: 426,
        minutes: 20,
        month: 5,
        seconds: 11
      }
    }, {
      type: "gold",
      event: {
        aggregate_value: -3500
      },
      timestamp: {
        date: 31,
        day: 3,
        year: 2017,
        hours: 18,
        milliseconds: 802,
        minutes: 53,
        month: 4,
        seconds: 23
      }
    }, {
      type: "xp",
      event: {
        aggregate_value: 3400
      },
      timestamp: {
        date: 31,
        day: 3,
        year: 2017,
        hours: 18,
        milliseconds: 14,
        minutes: 49,
        month: 4,
        seconds: 24
      }
    }, {
      type: "gold",
      event: {
        aggregate_value: 5327
      },
      timestamp: {
        date: 31,
        day: 3,
        year: 2017,
        hours: 18,
        milliseconds: 604,
        minutes: 49,
        month: 4,
        seconds: 3
      }
    }, {
      type: "gold",
      event: {
        aggregate_value: -400
      },
      timestamp: {
        date: 24,
        day: 3,
        year: 2017,
        hours: 16,
        milliseconds: 193,
        minutes: 9,
        month: 4,
        seconds: 2
      }
    }, {
      type: "gold",
      event: {
        aggregate_value: -1000
      },
      timestamp: {
        date: 24,
        day: 3,
        year: 2017,
        hours: 16,
        milliseconds: 450,
        minutes: 8,
        month: 4,
        seconds: 58
      }
    }, {
      type: "gold",
      event: {
        aggregate_value: 4500
      },
      timestamp: {
        date: 24,
        day: 3,
        year: 2017,
        hours: 15,
        milliseconds: 939,
        minutes: 59,
        month: 4,
        seconds: 48
      }
    }, {
      type: "platinum",
      event: {
        aggregate_value: 10
      },
      timestamp: {
        date: 24,
        day: 3,
        year: 2017,
        hours: 15,
        milliseconds: 521,
        minutes: 59,
        month: 4,
        seconds: 41
      }
    }, {
      type: "xp",
      event: {
        aggregate_value: 3000
      },
      timestamp: {
        date: 24,
        day: 3,
        year: 2017,
        hours: 15,
        milliseconds: 769,
        minutes: 42,
        month: 4,
        seconds: 30
      }
    }, {
      type: "gold",
      event: {
        aggregate_value: -50
      },
      timestamp: {
        date: 17,
        day: 3,
        year: 2017,
        hours: 18,
        milliseconds: 476,
        minutes: 23,
        month: 4,
        seconds: 58
      }
    }, {
      type: "gold",
      event: {
        aggregate_value: -400
      },
      timestamp: {
        date: 17,
        day: 3,
        year: 2017,
        hours: 18,
        milliseconds: 829,
        minutes: 23,
        month: 4,
        seconds: 54
      }
    }, {
      type: "gold",
      event: {
        aggregate_value: -1000
      },
      timestamp: {
        date: 17,
        day: 3,
        year: 2017,
        hours: 18,
        milliseconds: 363,
        minutes: 23,
        month: 4,
        seconds: 53
      }
    }, {
      type: "gold",
      event: {
        aggregate_value: 3000
      },
      timestamp: {
        date: 17,
        day: 3,
        year: 2017,
        hours: 18,
        milliseconds: 532,
        minutes: 4,
        month: 4,
        seconds: 40
      }
    }, {
      type: "xp",
      event: {
        aggregate_value: 2000
      },
      timestamp: {
        date: 17,
        day: 3,
        year: 2017,
        hours: 17,
        milliseconds: 668,
        minutes: 55,
        month: 4,
        seconds: 31
      }
    }, {
      type: "gold",
      event: {
        aggregate_value: -400
      },
      timestamp: {
        date: 10,
        day: 3,
        year: 2017,
        hours: 15,
        milliseconds: 516,
        minutes: 42,
        month: 4,
        seconds: 38
      }
    }, {
      type: "xp",
      event: {
        aggregate_value: 1050
      },
      timestamp: {
        date: 10,
        day: 3,
        year: 2017,
        hours: 15,
        milliseconds: 941,
        minutes: 40,
        month: 4,
        seconds: 27
      }
    }, {
      type: "gold",
      event: {
        aggregate_value: 2000
      },
      timestamp: {
        date: 10,
        day: 3,
        year: 2017,
        hours: 15,
        milliseconds: 112,
        minutes: 33,
        month: 4,
        seconds: 18
      }
    }, {
      type: "gold",
      event: {
        aggregate_value: 450
      },
      timestamp: {
        date: 3,
        day: 3,
        year: 2017,
        hours: 18,
        milliseconds: 83,
        minutes: 40,
        month: 4,
        seconds: 4
      }
    }, {
      type: "xp",
      event: {
        aggregate_value: 300
      },
      timestamp: {
        date: 3,
        day: 3,
        year: 2017,
        hours: 18,
        milliseconds: 545,
        minutes: 50,
        month: 4,
        seconds: 52
      }
    }]
  };

  // exposed methods
  return {
    data: data
  };

})();

var marika = (function() {

  var data = {
    awesomeSheet: true,
    basics: {
      name: "Marika Spandrell",
      race: "Human",
      level: "9",
      classes: [{
        classname: "Rogue",
        level: 9,
        hp: 53,
        fortitude: 3,
        reflex: 6,
        will: 3,
        ranks: 72,
        bab: 6
      }],
      size: {
        category: "Medium",
        size_modifier: 0,
        special_size_modifier: 0,
        size_modifier_fly: 0,
        size_modifier_stealth: 0
      },
      alignment: "Chaotic Neutral",
      deity: "",
      height: "5’3",
      weight: "98 lb",
      age: "23",
      gender: "Female",
      speed: {
        land: "30ft",
        fly: "",
        maneuverability: "",
        swim: "",
        climb: "",
        burrow: ""
      },
      hero_points: "1",
      character_description: "",
      initiative: {
        misc: "",
        temp: "",
        feat: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      xp: {
        total: 76000,
        advancement_speed: "Medium",
        next_level: "",
        needed: ""
      },
      character_image: {
        background: "",
        color: {
          r: "",
          g: "",
          b: ""
        },
        contain: "",
        cover: "",
        orientation: "",
        position: {
          x: "",
          y: ""
        },
        scale: "",
        image: ""
      }
    },
    statistics: {
      stats: {
        str: {
          modifier: 1,
          base: 12,
          current: 12,
          racial: "",
          enhancement: "",
          misc: "",
          temp: ""
        },
        dex: {
          modifier: 8,
          base: 20,
          current: 26,
          racial: 2,
          enhancement: 4,
          misc: "",
          temp: ""
        },
        con: {
          modifier: 0,
          base: 10,
          current: 10,
          racial: "",
          enhancement: "",
          misc: "",
          temp: ""
        },
        int: {
          modifier: 1,
          base: 12,
          current: 12,
          racial: "",
          enhancement: "",
          misc: "",
          temp: ""
        },
        wis: {
          modifier: 1,
          base: 12,
          current: 12,
          racial: "",
          enhancement: "",
          misc: "",
          temp: ""
        },
        cha: {
          modifier: -1,
          base: 9,
          current: 9,
          racial: "",
          enhancement: "",
          misc: "",
          temp: ""
        }
      },
      feats: "Deft Hands, Weapon Finesse, Two Weapon Fighting, Improved Two Weapon Fighting, Double Slice, Extra Rogue Talent.",
      traits: "Child of the Streets, Deft Dodger.",
      languages: "Common, Giant, Goblin.",
      special_abilities: "Sneak Attack +5d6, Trapfinding, Trap Sense +3, Uncanny Dodge, Improved Uncanny Dodge, Minor Magic (Mage Hand 3/day), Major Magic (Unseen Servant 2/day), Fast Fingers, Fast Stealth, Powerful Sneak."
    },
    equipment: {
      gear: "Large Black Backpack, Bedroll, Silk Rope, Pencils, Ink, Paper, Sketch Book, Grappling Hook, Flint and Steel, Torch, Masterwork Thieves’ Tools (+2 Disable Device), Magnifying Glass (+2 Appraise), Merchant’s Scale (+2 Appraise), Trail Rations, Bread, Cheese and Wine.",
      magic_gear: "Potion of Cure Light Wounds (6) Potion of Cure Moderate Wounds (3), Potion of Cure Serious Wounds (2), Potion of BarkSkin (5), Potion of Shield of Faith (2), Rapier +2 (Flaming Crystal), Short Sword +2 (Frost Crystal), Studded Leather +2, Belt of Dexterity +4, Cloak of Resistance +2, Spider Climb Pendent 1/day, Ring of Protection +1, Eyes of the Eagle, Handy Haversack.",
      item: [],
      encumbrance: {
        encumbrance_str: "",
        carry_move: {
          light: "",
          medium: "",
          heavy: "",
          lift: "",
          drag: ""
        }
      },
      armor: {
        armor: "Leather +2",
        check_penalty: -3,
        max_dex: "",
        shield: ""
      },
      body_slots: {
        belts: "Belt of Dexterity +4",
        body: "",
        chest: "",
        eyes: "Eyes of the Eagle",
        feet: "Slippers of Spider Climbing",
        hands: "",
        head: "",
        headband: "",
        neck: "",
        ring_left_hand: "Ring of Protection +2",
        ring_right_hand: "",
        shoulders: "Cloak of Resistance +3",
        wrist: ""
      },
      wealth: {
        platinum: "21",
        gold: "763",
        silver: "",
        copper: "",
        total: ""
      },
      consumable: [{
        item: "Slippers of Spider Climbing",
        current: 10,
        total: 10,
        used: ""
      }]
    },
    defense: {
      hp: {
        total: "",
        temp: "",
        damage: "",
        non_lethal_damage: "",
        current: ""
      },
      ac: {
        misc: "",
        temp: "",
        armor: 4,
        shield: "",
        deflect: 2,
        dodge: "",
        natural: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          plus_ten: true,
          ac_armor: true,
          ac_shield: true,
          ac_deflect: true,
          ac_dodge: true,
          ac_natural: true,
          size: true,
          max_dex: true
        }
      },
      flat_footed: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          plus_ten: true,
          ac_armor: true,
          ac_shield: true,
          ac_deflect: true,
          ac_natural: true,
          size: true
        }
      },
      touch: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          plus_ten: true,
          ac_deflect: true,
          ac_dodge: true,
          size: true,
          max_dex: true
        }
      },
      ac_notes: "+3 dodge bonus to AC against attacks made by traps.",
      fortitude: {
        base: "",
        resistance: 3,
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: true,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      reflex: {
        base: "",
        resistance: 3,
        feat: "",
        trait: 1,
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      will: {
        base: "",
        resistance: 3,
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      save_notes: "+3 bonus on Reflex saves made to avoid traps.",
      dr: {
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        overcome: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      sr: {
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      resist_notes: ""
    },
    offense: {
      base_attack: "",
      base_attack_bonuses: "",
      cmb: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          special_size: true,
          level: false,
          half_level: false
        }
      },
      cmd: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: true,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          special_size: true,
          level: false,
          half_level: false,
          plus_ten: true
        }
      },
      melee_attack: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          size: true,
          level: false,
          half_level: false
        }
      },
      ranged_attack: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          size: true,
          level: false,
          half_level: false
        }
      },
      attack: {
        melee: [{
          weapon: "Rapier +2",
          attack: "+16",
          damage: "1d6+3",
          critical: "18–20/x2",
          type: "Piercing"
        }, {
          weapon: "Rapier +2 Powerful Sneak",
          attack: "+13",
          damage: "1d6+3",
          critical: "18–20/x2",
          type: "Piercing"
        }, {
          weapon: "Short Sword +2",
          attack: "+16",
          damage: "1d6+3",
          critical: "19–20/x2",
          type: "Piercing"
        }, {
          weapon: "Short Sword +2 Powerful Sneak",
          attack: "+13",
          damage: "1d6+3",
          critical: "19–20/x2",
          type: "Piercing"
        }, {
          weapon: "Full Attack Rapier +2 / Short Sword +2",
          attack: "+14/+9/+14/+9",
          damage: "1d6+3",
          critical: "19–20/x2 / 18–20/x2 / 19–20/x2 / 18–20/x2",
          type: "Piercing"
        }],
        ranged: [{
          weapon: "Shortbow +1",
          attack: "+15",
          damage: "1d6",
          critical: "x3",
          range: "60 ft",
          ammo: "50",
          type: "Piercing"
        }]
      },
      attack_notes: ""
    },
    skills: {
      ranks: {
        total: "",
        spent: {
          include_custom: false,
          current: ""
        }
      },
      custom: [{
        name: "Disable Device Trap",
        ranks: 9,
        misc: 4,
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          class_skill: true,
          level: false,
          half_level: true,
          check_penalty: false
        }
      }, {
        name: "Perception Trap",
        ranks: 9,
        misc: 5,
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: true,
          check_penalty: false
        }
      }],
      acrobatics: {
        ranks: 9,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      appraise: {
        ranks: 9,
        misc: 4,
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      bluff: {
        ranks: 9,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      climb: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      craft_1: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      craft_2: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      diplomacy: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      disable_device: {
        ranks: 9,
        misc: 4,
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      disguise: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      escape_artist: {
        ranks: 9,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      fly: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true,
          size_modifier_fly: true
        }
      },
      handle_animal: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      heal: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      intimidate: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_arcana: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_dungeoneering: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_engineering: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_geography: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_history: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_local: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_nature: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_nobility: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_planes: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_religion: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      linguistics: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      perception: {
        ranks: 9,
        misc: 5,
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      perform_1: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      perform_2: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      profession_1: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      profession_2: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      ride: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      sense_motive: {
        ranks: 9,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      sleight_of_hand: {
        ranks: 9,
        misc: 3,
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      spellcraft: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      stealth: {
        ranks: 9,
        misc: 5,
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true,
          size_modifier_stealth: true
        }
      },
      survival: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      swim: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      use_magic_device: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      }
    },
    spells: {
      concentration: {
        current: "",
        misc: "",
        temp: "",
        feat: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      caster_level_check: {
        current: "",
        misc: "",
        temp: "",
        feat: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      spell_notes: "",
      per_day: {
        level_0: "",
        level_1: "",
        level_2: "",
        level_3: "",
        level_4: "",
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      dc: {
        level_0: "",
        level_1: "",
        level_2: "",
        level_3: "",
        level_4: "",
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      known: {
        level_0: "",
        level_1: "",
        level_2: "",
        level_3: "",
        level_4: "",
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      book: [{
        level_0: [{
          name: "Mage Hand",
          prepared: 3,
          active: false,
          cast: 0,
          note: ""
        }]
      }, {
        level_1: [{
          name: "Unseen Servant",
          prepared: 2,
          active: false,
          cast: 0,
          note: ""
        }]
      }, {
        level_2: []
      }, {
        level_3: []
      }, {
        level_4: []
      }, {
        level_5: []
      }, {
        level_6: []
      }, {
        level_7: []
      }, {
        level_8: []
      }, {
        level_9: []
      }]
    },
    notes: {
      character: [{
        note: "<strong>Sneak attack</strong> Attack deals extra damage anytime her target would be denied a Dexterity bonus to AC (+5d6).<br><strong>Evasion (Ex)</strong> A rogue adds 1/2 her level to Perception skill checks made to locate traps and to Disable Device skill checks.<br><strong>Rogue talent</strong> Minor Magic (Sp) Mage Hand, 3/day.<br><strong>Rogue talent</strong> Major Magic (Sp) Unseen Servant, 2/day.<br><strong>Rogue talent</strong> Fast Fingers (Ex) Roll two dice while making a Sleight of Hand check and take the better result, 1/day.<br><strong>Rogue talent</strong> Fast Stealth (Ex) Move at full speed using the Stealth skill without penalty.<br><strong>Rogue talent</strong> During a full attack action you may take a –2 penalty on all attack rolls until the start of her next turn. If an attack during this time is a sneak attack, treats all 1s on the sneak attack damage dice as 2s.<br><strong>Trap sense (Ex)</strong> +3 bonus on Reflex saves made to avoid traps and a +3 dodge bonus to AC against attacks made by traps. These bonuses rise to +2 when the rogue reaches 6th level, to +3 when she reaches 9th level.<br><strong>Uncanny Dodge (Ex)</strong> cannot be caught flat-footed, nor lose Dex bonus to AC if the attacker is invisible. Still loses Dexterity bonus to AC if immobilized.<br><strong>Improved Uncanny Dodge (Ex)</strong> A rogue of 8th level or higher can no longer be flanked."
      }, {
        note: "<strong>Deft Hands</strong> +2 bonus on Disable Device and Sleight of Hand skill checks<br><strong>Weapon Finesse</strong> With a light weapon, rapier, whip, or spiked chain made for a creature of your size category, you may use your Dexterity modifier instead of your Strength modifier on attack rolls.<br><strong>Two Weapon Fighting</strong> Penalties on attack rolls for fighting with two weapons are reduced.<br><strong>Improved Two Weapon Fighting</strong> In addition to the standard single extra attack you get with an off-hand weapon, get a second attack with it, albeit at a –5 penalty.<br><strong>Double Slice</strong> Add your Strength bonus to damage rolls made with your off-hand weapon.<br><strong>Extra Rogue Talent</strong> Gain one additional rogue talent"
      }],
      story: []
    },
    events: []
  };

  // exposed methods
  return {
    data: data
  };

})();

var nefi = (function() {

  var data = {
    awesomeSheet: true,
    basics: {
      name: "Nefi Fefi",
      race: "Human",
      level: "11",
      classes: [{
        classname: "Fighter",
        level: 11,
        hp: 85,
        fortitude: 7,
        reflex: 3,
        will: 3,
        ranks: 22,
        bab: 11
      }],
      size: {
        category: "Medium",
        size_modifier: 0,
        special_size_modifier: 0,
        size_modifier_fly: 0,
        size_modifier_stealth: 0
      },
      alignment: "Neutral",
      deity: "",
      height: "6'2",
      weight: "202 lbs",
      age: "28",
      gender: "Male",
      speed: {
        land: "30ft",
        fly: "",
        maneuverability: "",
        swim: "",
        climb: "",
        burrow: ""
      },
      hero_points: "1",
      character_description: "",
      initiative: {
        misc: "2",
        temp: "",
        feat: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      xp: {
        total: 155000,
        advancement_speed: "Medium",
        next_level: "",
        needed: ""
      },
      character_image: {
        background: "",
        color: {
          r: "",
          g: "",
          b: ""
        },
        contain: "",
        cover: "",
        orientation: "",
        position: {
          x: "",
          y: ""
        },
        scale: "",
        image: ""
      }
    },
    statistics: {
      stats: {
        str: {
          modifier: 5,
          base: 15,
          current: 21,
          racial: 2,
          enhancement: 4,
          misc: "",
          temp: ""
        },
        dex: {
          modifier: 3,
          base: 14,
          current: 16,
          racial: "",
          enhancement: 2,
          misc: "",
          temp: ""
        },
        con: {
          modifier: 1,
          base: 12,
          current: 12,
          racial: "",
          enhancement: "",
          misc: "",
          temp: ""
        },
        int: {
          modifier: 1,
          base: 13,
          current: 13,
          racial: "",
          enhancement: "",
          misc: "",
          temp: ""
        },
        wis: {
          modifier: 1,
          base: 10,
          current: 12,
          racial: "",
          enhancement: 2,
          misc: "",
          temp: ""
        },
        cha: {
          modifier: 0,
          base: 8,
          current: 10,
          racial: "",
          enhancement: 2,
          misc: "",
          temp: ""
        }
      },
      feats: "Weapon Focus (Guisarme), Iron Will, Great Fortitude, Combat Reflexes, Dodge, Power Attack, Combat Expertise, Greater Trip, Improved Trip, Felling Smash, Greater Weapon Focus (Guisarme), Weapon Specialization (Guisarme), Furious Focus",
      traits: "Resilient, Adopted (Elven Reflexes)",
      languages: "Common, Elven, Draconic",
      special_abilities: "Bonus feat (5), Bravery +3, Weapon training 2 (Pole Arms +2, Blades, Heavy +1),  Armor training 3"
    },
    equipment: {
      gear: "Backpack, Flask Of Oil (2), Pouch (belt), Sack, Candle, Flint And Steel, Tindertwig, Rations (5 Days), Waterskin, Bedroll, Blanket, Bloodblock, Rope (silk), Mirror, Compass, Ink, Inkpen, Paper Sheets, Case For Maps/scrolls, Torch, Dagger, Combat Horse (Tafi), Roc feathers, head and feet, Red Dragon (Adult) scales and claws",
      magic_gear: "Potion of Cure Light Wounds (4) Potion of Cure Moderate Wounds (5), Potion of Cure Serious Wounds (1), Potion of Resist Fire (1), Alchemist Fire (1), Potion of Lesser Restoration (1), Potion of Remove Disease (1), Ioun Stone (Dusty rose), Feather Token (Tree)",
      item: [],
      encumbrance: {
        encumbrance_str: "",
        carry_move: {
          light: "",
          medium: "",
          heavy: "",
          lift: "",
          drag: ""
        }
      },
      armor: {
        armor: "Full Plate +2",
        check_penalty: -3,
        max_dex: "",
        shield: ""
      },
      body_slots: {
        belts: "Belt of Physical Might (+4 Str +2 Dex)",
        body: "",
        chest: "",
        eyes: "",
        feet: "Boots of Striding and Springing",
        hands: "",
        head: "Red Mantis Mask",
        headband: "Headband of Mental Prowess +2 (Wis & Cha)",
        neck: "Amulet of Natural Armor +3",
        ring_left_hand: "Ring of Protection +2",
        ring_right_hand: "",
        shoulders: "Cloak of Resistance +3",
        wrist: ""
      },
      wealth: {
        platinum: "",
        gold: "870",
        silver: "",
        copper: "",
        total: ""
      },
      consumable: []
    },
    defense: {
      hp: {
        total: "",
        temp: "",
        damage: "",
        non_lethal_damage: "",
        current: ""
      },
      ac: {
        misc: 1,
        temp: "",
        armor: 11,
        shield: "",
        deflect: 2,
        dodge: 1,
        natural: 3,
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          plus_ten: true,
          ac_armor: true,
          ac_shield: true,
          ac_deflect: true,
          ac_dodge: true,
          ac_natural: true,
          size: true,
          max_dex: true
        }
      },
      flat_footed: {
        misc: 1,
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          plus_ten: true,
          ac_armor: true,
          ac_shield: true,
          ac_deflect: true,
          ac_natural: true,
          size: true
        }
      },
      touch: {
        misc: 1,
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          plus_ten: true,
          ac_deflect: true,
          ac_dodge: true,
          size: true,
          max_dex: true
        }
      },
      ac_notes: "Ioun Stone (Dusty rose) +1 insight bonus to AC.",
      fortitude: {
        base: "",
        resistance: 3,
        feat: 2,
        trait: 1,
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: true,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      reflex: {
        base: "",
        resistance: 3,
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      will: {
        base: "",
        resistance: 3,
        feat: 2,
        trait: "",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      save_notes: "+3 bonus on Will saves against fear.",
      dr: {
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        overcome: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      sr: {
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      resist_notes: ""
    },
    offense: {
      base_attack: "",
      base_attack_bonuses: "",
      cmb: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          special_size: true,
          level: false,
          half_level: false
        }
      },
      cmd: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: true,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          special_size: true,
          level: false,
          half_level: false,
          plus_ten: true
        }
      },
      melee_attack: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          size: true,
          level: false,
          half_level: false
        }
      },
      ranged_attack: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          size: true,
          level: false,
          half_level: false
        }
      },
      attack: {
        melee: [{
          weapon: "Guisarme +1 Keen",
          attack: "+21/+16/+11",
          damage: "2d4+12",
          critical: "19-20/x3",
          type: "Piercing/Slashing"
        }, {
          weapon: "Guisarme +1 Keen Power Attack",
          attack: "+18/+13/+8",
          damage: "2d4+18",
          critical: "19-20/x3",
          type: "Piercing/Slashing"
        }, {
          weapon: "Guisarme +1 Trip",
          attack: "+24",
          damage: "",
          critical: "",
          type: "Piercing/Slashing"
        }, {
          weapon: "Greatsword MW",
          attack: "+18/+13/+8",
          damage: "1d10+8",
          critical: "19–20/x2",
          type: "Slashing"
        }, {
          weapon: "Greatsword MW Power Attack",
          attack: "+15/+10/+5",
          damage: "1d10+14",
          critical: "19–20/x2",
          type: "Slashing"
        }, {
          weapon: "Halberd MW",
          attack: "+19/+14/+9",
          damage: "1d8+10",
          critical: "x3",
          type: "Piercing/Slashing"
        }, {
          weapon: "Halberd MW Power Attack",
          attack: "+16/+10/+5",
          damage: "1d8+16",
          critical: "x3",
          type: "Piercing/Slashing"
        }, {
          weapon: "Earth Breaker +1 Frost",
          attack: "+17/+12/+7",
          damage: "2d6+8 1d6 (cold)",
          critical: "x3",
          type: "Bludgeoning"
        }],
        ranged: [{
          weapon: "Composite Longbow MW",
          attack: "+13/+8/+3",
          damage: "1d8+5",
          critical: "x3",
          range: "100 ft",
          ammo: "50",
          type: "Piercing"
        }]
      },
      attack_notes: "+2 bonus to CMD against trip."
    },
    skills: {
      ranks: {
        total: "",
        spent: {
          include_custom: false,
          current: ""
        }
      },
      custom: [],
      acrobatics: {
        ranks: "",
        misc: 5,
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          class_skill: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      appraise: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      bluff: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      climb: {
        ranks: 4,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      craft_1: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      craft_2: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      diplomacy: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      disable_device: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      disguise: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      escape_artist: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      fly: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true,
          size_modifier_fly: true
        }
      },
      handle_animal: {
        ranks: 8,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      heal: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      intimidate: {
        ranks: 4,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_arcana: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_dungeoneering: {
        ranks: 1,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_engineering: {
        ranks: 1,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_geography: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_history: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_local: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_nature: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_nobility: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_planes: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_religion: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      linguistics: {
        ranks: 1,
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      perception: {
        ranks: 11,
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      perform_1: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      perform_2: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      profession_1: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      profession_2: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      ride: {
        ranks: 9,
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      sense_motive: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      sleight_of_hand: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      spellcraft: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      stealth: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true,
          size_modifier_stealth: true
        }
      },
      survival: {
        ranks: 2,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      swim: {
        ranks: 3,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      use_magic_device: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      }
    },
    spells: {
      concentration: {
        current: "",
        misc: "",
        temp: "",
        feat: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      caster_level_check: {
        current: "",
        misc: "",
        temp: "",
        feat: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      spell_notes: "",
      per_day: {
        level_0: "",
        level_1: "",
        level_2: "",
        level_3: "",
        level_4: "",
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      dc: {
        level_0: "",
        level_1: "",
        level_2: "",
        level_3: "",
        level_4: "",
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      known: {
        level_0: "",
        level_1: "",
        level_2: "",
        level_3: "",
        level_4: "",
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      book: [{
        level_0: []
      }, {
        level_1: []
      }, {
        level_2: []
      }, {
        level_3: []
      }, {
        level_4: []
      }, {
        level_5: []
      }, {
        level_6: []
      }, {
        level_7: []
      }, {
        level_8: []
      }, {
        level_9: []
      }]
    },
    notes: {
      character: [{
        note: "<strong>Ability Score</strong> Human characters get a +2 bonus to one ability score of their choice at creation to represent their varied nature.<br><strong>Medium</strong> Humans are Medium creatures and have no bonuses or penalties due to their size.<br><strong>Normal Speed</strong> Humans have a base speed of 30 feet.<br><strong>Bonus Feat</strong> Humans select one extra feat at 1st level.<br><strong>Skilled</strong> Humans gain an additional skill rank at first level and one additional rank whenever they gain a level.<br><strong>Languages</strong> Humans begin play speaking Common. Humans with high Intelligence scores can choose any languages they want (except secret languages, such as Druidic)."
      }, {
        note: "<strong>Weapon Focus (Guisarme)</strong> You gain a +1 bonus on all attack rolls you make using the selected weapon<br><strong>Iron Will</strong> You get a +2 bonus on all Will saving throws<br><strong>Great Fortitude</strong> You get a +2 bonus on all Fortitude saving throws.<br><strong>Combat Reflexes</strong> You may make a number of additional attacks of opportunity per round equal to your Dexterity bonus. With this feat, you may also make attacks of opportunity while flat-footed<br><strong>Dodge</strong> You gain a +1 dodge bonus to your AC. A condition that makes you lose your Dex bonus to AC also makes you lose the benefits of this feat<br><strong>Power Attack</strong> You can choose to take a –1 penalty on all melee attack rolls and combat maneuver checks to gain a +2 bonus on all melee damage rolls. This bonus to damage is increased by half (+50%) if you are making an attack with a two-handed weapon, a one handed weapon using two hands, or a primary natural weapon that adds 1-1/2 times your Strength modifier on damage rolls. This bonus to damage is halved (–50%) if you are making an attack with an off-hand weapon or secondary natural weapon. When your base attack bonus reaches +4, and every 4 points thereafter, the penalty increases by –1 and the bonus to damage increases by +2. You must choose to use this feat before making an attack roll, and its effects last until your next turn. The bonus damage does not apply to touch attacks or effects that do not deal hit point damage<br><strong>Combat Expertise</strong> You can choose to take a –1 penalty on melee attack rolls and combat maneuver checks to gain a +1 dodge bonus to your Armor Class. When your base attack bonus reaches +4, and every +4 thereafter, the penalty increases by –1 and the dodge bonus increases by +1. You can only choose to use this feat when you declare that you are making an attack or a full-attack action with a melee weapon. The effects of this feat last until your next turn<br><strong>Greater Trip</strong> You receive a +2 bonus on checks made to trip a foe. This bonus stacks with the bonus granted by Improved Trip. Whenever you successfully trip an opponent, that opponent provokes attacks of opportunity<br><strong>Improved Trip</strong> You do not provoke an attack of opportunity when performing a trip combat maneuver. In addition, you receive a +2 bonus on checks made to trip a foe. You also receive a +2 bonus to your Combat Maneuver Defense whenever an opponent tries to trip you<br><strong>Felling Smash</strong> If you use the attack action to make a single melee attack at your highest base attack bonus while using Power Attack and you hit an opponent, you can spend a swift action to attempt a trip combat maneuver against that opponent<br><strong>Greater Weapon Focus (Guisarme)</strong> You gain a +1 bonus on attack rolls you make using the selected weapon. This bonus stacks with other bonuses on attack rolls, including those from Weapon Focus.<br><strong>Weapon Specialization</strong> You gain a +2 bonus on all damage rolls you make using the selected weapon.<br><strong>Furious Focus</strong> When you are wielding a two-handed weapon or a one-handed weapon with two hands, and using the Power Attack feat, you do not suffer Power Attack's penalty on melee attack rolls on the first attack you make each turn. You still suffer the penalty on any additional attacks, including attacks of opportunity."
      }, {
        note: "<strong>Bonus feat (5)</strong> At 1st level, and at every even level thereafter, a fighter gains a bonus feat in addition to those gained from normal advancement (meaning that the fighter gains a feat at every level). These bonus feats must be selected from those listed as combat feats, sometimes also called \"fighter bonus feats.\" </span>Upon reaching 4th level, and every four levels thereafter (8th, 12th, and so on), a fighter can choose to learn a new bonus feat in place of a bonus feat he has already learned. In effect, the fighter loses the bonus feat in exchange for the new one. The old feat cannot be one that was used as a prerequisite for another feat, prestige class, or other ability. A fighter can only change one feat at any given level and must choose whether or not to swap the feat at the time he gains a new bonus feat for the level.<br><strong>Bravery (Ex)</strong> Starting at 2nd level, a fighter gains a +1 bonus on Will saves against fear. This bonus increases by +1 for every four levels beyond 2nd.<br><strong>Weapon training 2 (Pole Arms +2, Blades, Heavy +1)</strong> Starting at 5th level, a fighter can select one group of weapons, as noted below. Whenever he attacks with a weapon from this group, he gains a +1 bonus on attack and damage rolls. </span>Every four levels thereafter (9th, 13th, and 17th), a fighter becomes further trained in another group of weapons. He gains a +1 bonus on attack and damage rolls when using a weapon from this group. In addition, the bonuses granted by previous weapon groups increase by +1 each. For example, when a fighter reaches 9th level, he receives a +1 bonus on attack and damage rolls with one weapon group and a +2 bonus on attack and damage rolls with the weapon group selected at 5th level. Bonuses granted from overlapping groups do not stack. Take the highest bonus granted for a weapon if it resides in two or more groups. </span>A fighter also adds this bonus to any combat maneuver checks made with weapons from this group. This bonus also applies to the fighter's Combat Maneuver Defense when defending against disarm and sunder attempts made against weapons from this group.<br><strong>Armor Training (Ex)</strong> Starting at 3rd level, a fighter learns to be more maneuverable while wearing armor. Whenever he is wearing armor, he reduces the armor check penalty by 1 (to a minimum of 0) and increases the maximum Dexterity bonus allowed by his armor by 1. Every four levels thereafter (7th, 11th, and 15th), these bonuses increase by +1 each time, to a maximum –4 reduction of the armor check penalty and a +4 increase of the maximum Dexterity bonus allowed. In addition, a fighter can also move at his normal speed while wearing medium armor. At 7th level, a fighter can move at his normal speed while wearing heavy armor."
      }, {
        note: "<strong>Resilient</strong> Growing up in a poor neighborhood or in the unforgiving wilds often forced you to subsist on food and water from doubtful sources. You've built up your mettle as a result, and gain a +1 trait bonus on Fortitude saves<br><strong>Adopted (Elven Reflexes)</strong> You were adopted and raised by someone not of your actual race, and raised in a society not your own. As a result, you picked up a race trait from your adoptive parents and society, and may immediately select a race trait from your adoptive parents' race.<br>One of your parents was a member of a wild elven tribe, and you've inherited a portion of your elven parent's quick reflexes. You gain a +2 trait bonus on Initiative checks."
      }, {
        note: "Harrow point = +5 on all damage rolls for one combat"
      }],
      story: []
    },
    events: []
  };

  // exposed methods
  return {
    data: data
  };

})();

var nif = (function() {

  var data = {
    awesomeSheet: true,
    basics: {
      name: "Nif Amakir",
      race: "Elf",
      level: "",
      classes: [{
        classname: "Wizard",
        level: 8,
        hp: 42,
        fortitude: 2,
        reflex: 2,
        will: 6,
        ranks: 16,
        bab: 4
      }],
      size: {
        category: "Medium",
        size_modifier: 0,
        special_size_modifier: 0,
        size_modifier_fly: 0,
        size_modifier_stealth: 0
      },
      alignment: "Lawful Neutral",
      deity: "",
      height: "6'0",
      weight: "136 lbs",
      age: "120",
      gender: "Male",
      speed: {
        land: "30ft",
        fly: "",
        maneuverability: "",
        swim: "",
        climb: "",
        burrow: ""
      },
      hero_points: "1",
      character_description: "",
      initiative: {
        misc: "",
        temp: "",
        feat: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      xp: {
        total: 51330,
        advancement_speed: "Medium",
        next_level: "",
        needed: ""
      }
    },
    statistics: {
      stats: {
        str: {
          modifier: -1,
          base: 8,
          current: 8,
          racial: "",
          enhancement: "",
          misc: "",
          temp: ""
        },
        dex: {
          modifier: 3,
          base: 15,
          current: 17,
          racial: 2,
          enhancement: "",
          misc: "",
          temp: ""
        },
        con: {
          modifier: 2,
          base: 16,
          current: 14,
          racial: -2,
          enhancement: "",
          misc: "",
          temp: ""
        },
        int: {
          modifier: 8,
          base: 20,
          current: 26,
          racial: 2,
          enhancement: 4,
          misc: "",
          temp: ""
        },
        wis: {
          modifier: 1,
          base: 12,
          current: 12,
          racial: "",
          enhancement: "",
          misc: "",
          temp: ""
        },
        cha: {
          modifier: 0,
          base: 10,
          current: 10,
          racial: "",
          enhancement: "",
          misc: "",
          temp: ""
        }
      },
      feats: "Alertness, Augment Summoning, Craft Wondrous Item, Greater Spell Focus (Conjuration), Scribe Scroll, Spell Focus (Conjuration), Combat Casting",
      traits: "Resilient",
      languages: "Aquan, Auran, Azlanti, Celestial, Common, Draconic, Dwarven, Elven, Giant, Gnome, Goblin, Ignan, Orc, Sylvan, Undercommon",
      special_abilities: "Arcane bond (Su), Bonus feats, Cantrips, Arcane schools, Teleportation sub school, Opposition arcane school, Elven Immunities (Ex), Elven Magic (Ex), Keen Senses (Ex), Low-Light Vision (Ex), Headband of Vast Intelligence skill (Use Magic Device, Fly), Linguistics Skill (Dwarven, Giant, Undercommon), Shift (Su), Summoner's Charm (Su), Weapon Familiarity (Ex)"
    },
    equipment: {
      gear: "Spellbook, Scroll case, Spell component pouch, Candle, Flint and Steel, Tindertwig, Ink, pen and paper, Belt Pouch, Backpack, Rations (5 days), Combat trained horse",
      magic_gear: "Handy Haversack<br><br>Viles:<br>Insect sap (14), Antitoxin(1), Holy Water(1), Yellow Mushroom Juice (3)<br><br>Potions:<br>Cure Light Wounds (0), Cure Moderate Wounds (1), Cure Serious Wounds (1), Protection from Evil (1), Adjustable Disguise (1), Aid (1), Displacement (1), Hide from Animals (1), Delay Poison (1), Bear's Endurance (1), Levitate (1)<br><br>Scrolls:<br>Acid Pit (2), Summon Monster III (2), Summon Monster IV (0), Invisibility (2), Create Pit (2), Web (3), Stinking Cloud (2), Grease (1), Mirror Image (3), Spiked Pit (6), Fly (1), Interposing Hand (0), Elemental Body 2 (0), Wall of Fire (0), Haste (1), Enlarge Person (2), Endure Elements (2), Acid Arrow (0), Gust of Wind (0), Animate Rope (0), False Life (2), Floating Disk (1), Comprehend Languages (0), Erase (1), Detect Secret Doors (1), Black Tentacles (2), Mage Armor (0)<br><br>Oils:<br>Magic Weapon (2)",
      item: [{
        name: "Flask of Oil",
        quantity: 5,
        weight: 5
      }, {
        name: "Sack",
        quantity: 1,
        weight: 0.5
      }, {
        name: "Waterskin",
        quantity: 1,
        weight: 4
      }, {
        name: "Bedroll",
        quantity: 1,
        weight: 5
      }, {
        name: "Blanket",
        quantity: 1,
        weight: 3
      }, {
        name: "Bloodblock",
        quantity: 2,
        weight: 2
      }, {
        name: "Healer's Kit",
        quantity: 2,
        weight: 2
      }, {
        name: "Rope (silk)",
        quantity: 1,
        weight: 5
      }, {
        name: "Mirror",
        quantity: 1,
        weight: 0.5
      }, {
        name: "Compass",
        quantity: 1,
        weight: 1
      }, {
        name: "Andorak spell book",
        quantity: 1,
        weight: 0.5
      }],
      encumbrance: {
        encumbrance_str: "",
        carry_move: {
          light: "",
          medium: "",
          heavy: "",
          lift: "",
          drag: ""
        }
      },
      armor: {
        armor: "",
        check_penalty: "",
        max_dex: "",
        shield: ""
      },
      body_slots: {
        belts: "",
        body: "",
        chest: "",
        eyes: "",
        feet: "",
        hands: "",
        head: "",
        headband: "Headband of Vast Intelligence +4",
        neck: "Amulet of Natural Armor +1",
        ring_left_hand: "Ring of Sustenance",
        ring_right_hand: "",
        shoulders: "Cloak of Resistance +2",
        wrist: ""
      },
      wealth: {
        platinum: "",
        gold: "1,027",
        silver: "",
        copper: "",
        total: ""
      },
      consumable: [{
        item: "Wand of Lightning Bolt",
        current: "",
        total: 50,
        used: 49
      }, {
        item: "Wand of Scorching Ray",
        current: "",
        total: 50,
        used: 42
      }, {
        item: "Wand of Swift Girding",
        current: "",
        total: 50,
        used: 30
      }, {
        item: "Wand of Carry Companion",
        current: "",
        total: 50,
        used: 40
      }, {
        item: "Shift",
        current: "",
        total: 11,
        used: 2
      }, {
        item: "Pearl of Power (1st Level)",
        current: "",
        total: 1,
        used: ""
      }, {
        item: "Wand of Purify Food and Drink",
        current: "",
        total: 50,
        used: ""
      }, {
        item: "Dimensional Step",
        current: "",
        total: 240,
        used: 50
      }]
    },
    defense: {
      hp: {
        total: "",
        temp: "",
        damage: "",
        non_lethal_damage: "",
        current: ""
      },
      ac: {
        misc: "",
        temp: "",
        armor: 4,
        shield: "",
        deflect: "",
        dodge: "",
        natural: 1,
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          plus_ten: true,
          ac_armor: true,
          ac_shield: true,
          ac_deflect: true,
          ac_dodge: true,
          ac_natural: true,
          size: true,
          max_dex: true
        }
      },
      flat_footed: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          plus_ten: true,
          ac_armor: true,
          ac_shield: true,
          ac_deflect: true,
          ac_natural: true,
          size: true
        }
      },
      touch: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          plus_ten: true,
          ac_deflect: true,
          ac_dodge: true,
          size: true,
          max_dex: true
        }
      },
      ac_notes: "Mage Armor active",
      fortitude: {
        base: "",
        resistance: 2,
        feat: "",
        trait: 1,
        misc: 2,
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: true,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      reflex: {
        base: "",
        resistance: 2,
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      will: {
        base: "",
        resistance: 2,
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      save_notes: "Immune to magic sleep effects. +2 saving throw against enchantment spells and effects.",
      dr: {
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        overcome: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      sr: {
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      resist_notes: ""
    },
    offense: {
      base_attack: "",
      base_attack_bonuses: "",
      cmb: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          special_size: true,
          level: false,
          half_level: false
        }
      },
      cmd: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: true,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          special_size: true,
          level: false,
          half_level: false,
          plus_ten: true
        }
      },
      melee_attack: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          size: true,
          level: false,
          half_level: false
        }
      },
      ranged_attack: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          size: true,
          level: false,
          half_level: false
        }
      },
      attack: {
        melee: [{
          weapon: "Dagger (Master Work)",
          attack: "+4",
          damage: "1d6+1",
          critical: "19–20/x2",
          type: "Slashing/Piercing"
        }],
        ranged: [{
          weapon: "Shortbow",
          attack: "+7",
          damage: "1d6",
          critical: "x3",
          range: "60 ft",
          ammo: "50",
          type: "Piercing"
        }]
      },
      attack_notes: ""
    },
    skills: {
      ranks: {
        total: "",
        spent: {
          include_custom: false,
          current: ""
        }
      },
      custom: [{
        name: "Spellcraft (Identify magic items)",
        ranks: 8,
        misc: 2,
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      }],
      acrobatics: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      appraise: {
        ranks: 1,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      bluff: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      climb: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      craft_1: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      craft_2: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      diplomacy: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      disable_device: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      disguise: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      escape_artist: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      fly: {
        ranks: 8,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true,
          size_modifier_fly: true
        }
      },
      handle_animal: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      heal: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      intimidate: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_arcana: {
        ranks: 4,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_dungeoneering: {
        ranks: 4,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_engineering: {
        ranks: 4,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_geography: {
        ranks: 4,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_history: {
        ranks: 4,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_local: {
        ranks: 4,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_nature: {
        ranks: 4,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_nobility: {
        ranks: 3,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_planes: {
        ranks: 4,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_religion: {
        ranks: 4,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      linguistics: {
        ranks: 8,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      perception: {
        ranks: 8,
        misc: 4,
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      perform_1: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      perform_2: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      profession_1: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      profession_2: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      ride: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      sense_motive: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      sleight_of_hand: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      spellcraft: {
        ranks: 8,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      stealth: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true,
          size_modifier_stealth: true
        }
      },
      survival: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      swim: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      use_magic_device: {
        ranks: 8,
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      }
    },
    spells: {
      concentration: {
        current: "",
        misc: "",
        temp: "",
        feat: 4,
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: true,
          half_level: false
        }
      },
      caster_level_check: {
        current: "",
        misc: "",
        temp: "",
        feat: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: true,
          half_level: false
        }
      },
      spell_notes: "<strong>Arcane school</strong> Conjuration (Teleportation).<br><strong>Opposition Arcane school</strong> Enchantment, Necromancy.<br>Conjuration spells +2 DC.",
      per_day: {
        level_0: 4,
        level_1: 7,
        level_2: 5,
        level_3: 5,
        level_4: 4,
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      dc: {
        level_0: 18,
        level_1: 19,
        level_2: 20,
        level_3: 21,
        level_4: 22,
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      known: {
        level_0: "",
        level_1: "",
        level_2: "",
        level_3: "",
        level_4: "",
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      book: [{
        level_0: [{
          name: "Bleed",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Erase",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Daze",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Disrupt Undead",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Touch of Fatigue",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Prestidigitation",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Light",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Ghost Sound",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Spark",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Acid Splash",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Mage Hand",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Flare",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Detect Magic",
          prepared: 1,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Detect Poison",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Dancing Lights",
          prepared: 1,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Mending",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Arcane Mark",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Message",
          prepared: 1,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Ray of Frost",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Read Magic",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Open/Close",
          prepared: 1,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Resistance",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }]
      }, {
        level_1: [{
          name: "Comprehend Languages",
          prepared: 1,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Enlarge Person",
          prepared: 1,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Feather Fall",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Grease",
          prepared: 2,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Mage Armor",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Mount",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Obscuring Mist",
          prepared: 1,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Protection from Chaos",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Protection from Evil",
          prepared: 2,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Shield",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Summon Monster I",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Unseen Servant",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Endure Elements",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Animate Rope",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Floating Disk",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Detect Secret Doors",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }]
      }, {
        level_2: [{
          name: "Blur",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Create Pit",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Flaming Sphere",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Glitterdust",
          prepared: 2,
          active: false,
          cast: 1,
          note: ""
        }, {
          name: "Invisibility",
          prepared: 2,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Levitate",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Mirror Image",
          prepared: 1,
          active: true,
          cast: 1,
          note: ""
        }, {
          name: "Resist Energy",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Stone Call",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Summon Monster II",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Web",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Create Treasure Map",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Gust of Wind",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Acid Arrow",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "False Life",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }]
      }, {
        level_3: [{
          name: "Stinking Cloud",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Summon Monster III",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Spiked Pit",
          prepared: 1,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Aqueous Orb",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Fly",
          prepared: 1,
          active: false,
          cast: 1,
          note: ""
        }, {
          name: "Sleet Storm",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Haste",
          prepared: 2,
          active: false,
          cast: 1,
          note: ""
        }, {
          name: "Lightning Bolt",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Slow",
          prepared: 1,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Dispel Magic",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }]
      }, {
        level_4: [{
          name: "Black Tentacles",
          prepared: 1,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Wall of Fire",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Secure Shelter",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Summon Monster IV",
          prepared: 2,
          active: false,
          cast: 2,
          note: ""
        }, {
          name: "Heroism",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Dimension Door",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Greater Invisibility",
          prepared: 1,
          active: false,
          cast: 1,
          note: ""
        }]
      }, {
        level_5: []
      }, {
        level_6: []
      }, {
        level_7: []
      }, {
        level_8: []
      }, {
        level_9: []
      }]
    },
    notes: {
      character: [{
        note: "<strong>Resilient</strong> (+1 trait bonus on Fortitude saves)<br><strong>Arcane bond (Su)</strong> Rat Bower, +2 Fortitude save.<br><strong>Bonus feats</strong>.<br><strong>Cantrips</strong>.<br><strong>Elven Immunities (Ex)</strong> Immune to magic sleep effects. +2 saving throw against enchantment spells and effects.<br><strong>Elven Magic (Ex)</strong> +2 caster level checks made to overcome SR. +2 Spellcraft check to identify properties of magic items.<br><strong>Keen Senses (Ex)</strong> +2 Perception checks.<br><strong>Low-Light Vision (Ex)</strong> See x2 as far as humans in low illumination.<br><strong>Shift (Su)</strong> Teleport 15 feet 9 times per day.<br><strong>Summoner's Charm (Su)</strong> +3 rounds duration for Conjuration (Summoning) spells.<br><strong>Weapon Familiarity (Ex)</strong> Proficient with longbows (including composite longbows), longswords, rapiers, and shortbows (including composite shortbows), treat weapon with \"elven\" in name as a martial weapon.<br><strong>Dimensional Steps (Sp)</strong> At 8th level, you can use this ability to teleport up to 30 feet per wizard level per day as a standard action. This teleportation must be used in 5-foot increments and such movement does not provoke an attack of opportunity. You can bring other willing creatures with you, but you must expend an equal amount of distance for each additional creature brought with you."
      }, {
        note: "Spells to find:<br>Scorching Ray<br>Lightning Bolt"
      }],
      story: [{
        note: "Baron Turbine Blackshield, lord of Thornkeep <br>Five factions in Thornkeep: Three Daggers (the thives), Iron jaws, Hunters guild, The Order (deal in magic), The Goblins, The Blue Basilisks (the muscle)"
      }, {
        note: "Andorak (Lich shade), wizard's apprentice, locked in tomb"
      }, {
        note: "Jonas the mail man, messenger of Thornkeep"
      }, {
        note: "Library reference: 957"
      }]
    },
    events: []
  };

  // exposed methods
  return {
    data: data
  };

})();

var orrin = (function() {

  var data = {
    awesomeSheet: true,
    basics: {
      name: "Orrin Alareth",
      race: "Human",
      level: "",
      classes: [{
        classname: "Rogue",
        level: 10,
        hp: 63,
        fortitude: 3,
        reflex: 7,
        will: 3,
        ranks: 90,
        bab: 7
      }],
      size: {
        category: "Medium",
        size_modifier: 0,
        special_size_modifier: 0,
        size_modifier_fly: 0,
        size_modifier_stealth: 0
      },
      alignment: "Lawful Evil",
      deity: "",
      height: "6'0",
      weight: "206 lbs",
      age: "26",
      gender: "Male",
      speed: {
        land: "30ft",
        fly: "",
        maneuverability: "",
        swim: "",
        climb: "",
        burrow: ""
      },
      hero_points: "",
      character_description: "A energetic overweight man. Reddened medium-brown skin, round face, blue-green, wrinkled eyes, a double chin and wavy light brown hair. Very good reflexes and exceptional dexterity and coordination.",
      initiative: {
        misc: "",
        temp: "",
        feat: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      xp: {
        total: 90148,
        advancement_speed: "Medium",
        next_level: "",
        needed: ""
      },
      character_image: {
        background: "",
        color: {
          r: "",
          g: "",
          b: ""
        },
        contain: "",
        cover: "",
        orientation: "",
        position: {
          x: "",
          y: ""
        },
        scale: "",
        image: ""
      }
    },
    statistics: {
      stats: {
        str: {
          modifier: 1,
          base: 13,
          current: 13,
          racial: "",
          enhancement: "",
          misc: "",
          temp: ""
        },
        dex: {
          modifier: 7,
          base: 18,
          current: 24,
          racial: 2,
          enhancement: 4,
          misc: "",
          temp: ""
        },
        con: {
          modifier: 1,
          base: 12,
          current: 12,
          racial: "",
          enhancement: "",
          misc: "",
          temp: ""
        },
        int: {
          modifier: 3,
          base: 12,
          current: 16,
          racial: "",
          enhancement: 4,
          misc: "",
          temp: ""
        },
        wis: {
          modifier: 1,
          base: 12,
          current: 12,
          racial: "",
          enhancement: "",
          misc: "",
          temp: ""
        },
        cha: {
          modifier: -2,
          base: 7,
          current: 7,
          racial: "",
          enhancement: "",
          misc: "",
          temp: ""
        }
      },
      feats: "Weapon Finesse, Dodge, Two-Weapon Fighting, Weapon focus (Rapier), Deft hands, Great Fortitude, Iron Will",
      traits: "Reactionary, Resilient",
      languages: "Common, Elven",
      special_abilities: "Sneak Attack (+5d6), Trapfinding, Evasion (Ex), Rogue Talent Trap spotter (Ex), Trap Sense +3 (Ex), Rogue Talent Finesse Rogue, Uncanny Dodge (Ex), Rogue Talent Fast Stealth (Ex), Improved Uncanny Dodge (Ex), Rogue Talent Combat Trick - Improved Two-Weapon Fighting, Rogue Talent Offensive Defense (Ex), Advanced Talent Knock-Out Blow (Ex)"
    },
    equipment: {
      gear: "Fur coat and cold weather outfit, Thieves' tools MW, Climber's kit, Magnifying glass, Merchant's scale, Backpack, Flask of Oil (3), Pouch (belt), Sack, Candle, Flint and Steel, Torch, Tindertwig (5), Rations (5 days), Waterskin, Bedroll, Blanket, Rope (silk), Mirror, Compass, Ink, Pen, Paper sheets, Dagger (2), Hide armor, 10ft pole in pieces",
      magic_gear: "Ioun Torch, Ioun Stones Dusty Rose, Rapier +1<br><br>Potions:<br>Cure Light Wounds (6), Endure Elements (1), Bless Weapon (4), Greese (1), Reduce Person (1), Stabilise (1), Cure Light Wounds (1), Jump (1), Protection from Good (1), Protection from Law (1), Protection from Evil (1), Remove Fear (1), Remove Sickness (1), Shield of Faith (1), Vanish (1), Gaseous Form (1)<br><br>Oils:<br>Dispel Magic",
      item: [{
        name: "Flask of Oil",
        quantity: 1,
        weight: 1
      }, {
        name: "Tanglefoot bag",
        quantity: 2,
        weight: 8
      }, {
        name: "Flat Bread",
        quantity: 10,
        weight: 2
      }, {
        name: "Bedrolls",
        quantity: 6,
        weight: 2
      }],
      encumbrance: {
        encumbrance_str: "",
        carry_move: {
          light: "",
          medium: "",
          heavy: "",
          lift: "",
          drag: ""
        }
      },
      armor: {
        armor: "Mithral Chain Shirt +2",
        check_penalty: "",
        max_dex: "",
        shield: ""
      },
      body_slots: {
        belts: "Belt of Dexterity +4",
        body: "",
        chest: "Vest of Escape",
        eyes: "Eyes of the Eagle",
        feet: "",
        hands: "Gloves of Reconnaissance",
        head: "Headband of Vast Intelligence +4",
        headband: "",
        neck: "Amulet of a Natural Armor +1",
        ring_left_hand: "Ring of Force Shield",
        ring_right_hand: "Ring of Protection +1",
        shoulders: "Cloak of Resistance +2",
        wrist: ""
      },
      wealth: {
        platinum: "3",
        gold: "13,009",
        silver: "5",
        copper: "",
        total: ""
      },
      consumable: [{
        item: "Gloves of Reconnaissance",
        current: "",
        total: 10,
        used: 1
      }, {
        item: "Wand of Magic Missile (CL5)",
        current: "",
        total: 50,
        used: 4
      }, {
        item: "Wand of Cure Light Wounds",
        current: "",
        total: 50,
        used: 1
      }, {
        item: "Knock-Out Blow",
        current: "",
        total: 1,
        used: ""
      }, {
        item: "Wand of Entangle",
        current: "",
        total: 50,
        used: ""
      }]
    },
    defense: {
      hp: {
        total: "",
        temp: "",
        damage: "",
        non_lethal_damage: "",
        current: ""
      },
      ac: {
        misc: 1,
        temp: "",
        armor: 6,
        shield: 2,
        deflect: 1,
        dodge: 1,
        natural: 1,
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          plus_ten: true,
          ac_armor: true,
          ac_shield: true,
          ac_deflect: true,
          ac_dodge: true,
          ac_natural: true,
          size: true,
          max_dex: true
        }
      },
      flat_footed: {
        misc: 1,
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          plus_ten: true,
          ac_armor: true,
          ac_shield: true,
          ac_deflect: true,
          ac_natural: true,
          size: true
        }
      },
      touch: {
        misc: 1,
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          plus_ten: true,
          ac_deflect: true,
          ac_dodge: true,
          size: true,
          max_dex: true
        }
      },
      ac_notes: "+3 dodge bonus to AC against attacks made by traps.<br>+2 AC against incorporeal attacks.<br>+5 Dodge to AC for 1 round after Sneak Attack.",
      fortitude: {
        base: "",
        resistance: 2,
        feat: 2,
        trait: 1,
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: true,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      reflex: {
        base: "",
        resistance: 2,
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      will: {
        base: "",
        resistance: 2,
        feat: 2,
        trait: "",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      save_notes: "+3 bonus on Reflex saves made to avoid traps.",
      dr: {
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        overcome: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      sr: {
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      resist_notes: ""
    },
    offense: {
      base_attack: "",
      base_attack_bonuses: "",
      cmb: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          special_size: true,
          level: false,
          half_level: false
        }
      },
      cmd: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: true,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          special_size: true,
          level: false,
          half_level: false,
          plus_ten: true
        }
      },
      melee_attack: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          size: true,
          level: false,
          half_level: false
        }
      },
      ranged_attack: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          size: true,
          level: false,
          half_level: false
        }
      },
      attack: {
        melee: [{
          weapon: "Mithral Rapier +2",
          attack: "+17",
          damage: "1d6+3",
          critical: "18–20/×2",
          type: "Piercing"
        }, {
          weapon: "Rapier +1 Shocking",
          attack: "+15",
          damage: "1d6+2 + 1d6 Electrical",
          critical: "18-20/x2",
          type: "Piercing"
        }, {
          weapon: "Short Sword +1",
          attack: "+15",
          damage: "1d6+2",
          critical: "19–20/×2",
          type: "Piercing"
        }, {
          weapon: "Mithral Rapier +2, Short Sword +1",
          attack: "+15/+15/+8/+8",
          damage: "1d6+3, 1d6+2",
          critical: "18–20/×2, 19–20/×2",
          type: "Piercing, Piercing"
        }, {
          weapon: "Silver Dagger",
          attack: "+14",
          damage: "1d6+1",
          critical: "19–20/×2",
          type: "Piercing"
        }, {
          weapon: "Sap",
          attack: "+14",
          damage: "1d6+1",
          critical: "x2",
          type: "Bludgeoning"
        }, {
          weapon: "Punching Dagger +2 Shocking",
          attack: "+16",
          damage: "1d4+3 + 1d6 Electrical",
          critical: "x3",
          type: "Piercing"
        }, {
          weapon: "Mithral Rapier +2, Punching Dagger +2 Shocking",
          attack: "+15/+15/+9/+9",
          damage: "1d6+3, 1d4+3 + 1d6 Electrical",
          critical: "18–20/×2, x3",
          type: "Piercing, Piercing"
        }],
        ranged: [{
          weapon: "Shortbow (MW)",
          attack: "+14/+9",
          damage: "1d6",
          critical: "x3",
          range: "60 ft",
          ammo: "50",
          type: "Piercing"
        }]
      },
      attack_notes: "+5d6 Sneak attack.<br>Knock-Out Blow DC 18."
    },
    skills: {
      ranks: {
        total: "",
        spent: {
          include_custom: false,
          current: ""
        }
      },
      custom: [{
        name: "Perception (Traps)",
        ranks: 10,
        misc: 5,
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          class_skill: true,
          level: false,
          half_level: true,
          check_penalty: false
        }
      }, {
        name: "Disable Device (Traps)",
        ranks: 10,
        misc: 8,
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: true,
          check_penalty: true
        }
      }],
      acrobatics: {
        ranks: 10,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      appraise: {
        ranks: 4,
        misc: 2,
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      bluff: {
        ranks: 10,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      climb: {
        ranks: 5,
        misc: 2,
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      craft_1: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      craft_2: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      diplomacy: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      disable_device: {
        ranks: 10,
        misc: 8,
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      disguise: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      escape_artist: {
        ranks: 10,
        misc: 6,
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      fly: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true,
          size_modifier_fly: true
        }
      },
      handle_animal: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      heal: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      intimidate: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_arcana: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_dungeoneering: {
        ranks: 4,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_engineering: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_geography: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_history: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_local: {
        ranks: 4,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_nature: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_nobility: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_planes: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_religion: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      linguistics: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      perception: {
        ranks: 10,
        misc: 5,
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      perform_1: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      perform_2: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      profession_1: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      profession_2: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      ride: {
        ranks: 3,
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      sense_motive: {
        ranks: 10,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      sleight_of_hand: {
        ranks: 10,
        misc: 2,
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      spellcraft: {
        ranks: 10,
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      stealth: {
        ranks: 10,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true,
          size_modifier_stealth: true
        }
      },
      survival: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      swim: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      use_magic_device: {
        ranks: 10,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      }
    },
    spells: {
      concentration: {
        current: "",
        misc: "",
        temp: "",
        feat: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      caster_level_check: {
        current: "",
        misc: "",
        temp: "",
        feat: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      spell_notes: "",
      per_day: {
        level_0: "",
        level_1: "",
        level_2: "",
        level_3: "",
        level_4: "",
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      dc: {
        level_0: "",
        level_1: "",
        level_2: "",
        level_3: "",
        level_4: "",
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      known: {
        level_0: "",
        level_1: "",
        level_2: "",
        level_3: "",
        level_4: "",
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      book: [{
        level_0: []
      }, {
        level_1: []
      }, {
        level_2: []
      }, {
        level_3: []
      }, {
        level_4: []
      }, {
        level_5: []
      }, {
        level_6: []
      }, {
        level_7: []
      }, {
        level_8: []
      }, {
        level_9: []
      }]
    },
    notes: {
      character: [{
        note: "<strong>+2 to One Ability Score</strong> Human characters get a +2 bonus to one ability score of their choice at creation to represent their varied nature.<br><strong>Medium</strong> Humans are Medium creatures and have no bonuses or penalties due to their size.<br><strong>Normal Speed</strong> Humans have a base speed of 30 feet.<br><strong>Bonus Feat</strong> Humans select one extra feat at 1st level.<br><strong>Skilled</strong> Humans gain an additional skill rank at first level and one additional rank whenever they gain a level.<br><strong>Languages</strong> Humans begin play speaking Common. Humans with high Intelligence scores can choose any languages they want (except secret languages, such as Druidic)."
      }, {
        note: "<strong>Sneak attack</strong> If a rogue can catch an opponent when he is unable to defend himself effectively from her attack, she can strike a vital spot for extra damage.<br>The rogue's attack deals extra damage anytime her target would be denied a Dexterity bonus to AC (whether the target actually has a Dexterity bonus or not), or when the rogue flanks her target. This extra damage is 1d6 at 1st level, and increases by 1d6 every two rogue levels thereafter. Should the rogue score a critical hit with a sneak attack, this extra damage is not multiplied. Ranged attacks can count as sneak attacks only if the target is within 30 feet.<br>With a weapon that deals nonlethal damage (like a sap, whip, or an unarmed strike), a rogue can make a sneak attack that deals nonlethal damage instead of lethal damage. She cannot use a weapon that deals lethal damage to deal nonlethal damage in a sneak attack, not even with the usual –4 penalty.<br>The rogue must be able to see the target well enough to pick out a vital spot and must be able to reach such a spot. A rogue cannot sneak attack while striking a creature with concealment.<br><strong>Trapfinding</strong> A rogue adds 1/2 her level to Perception skill checks made to locate traps and to Disable Device skill checks (minimum +1). A rogue can use Disable Device to disarm magic traps.<br><strong>Evasion (Ex)</strong> At 2nd level and higher, a rogue can avoid even magical and unusual attacks with great agility. If she makes a successful Reflex saving throw against an attack that normally deals half damage on a successful save, she instead takes no damage. Evasion can be used only if the rogue is wearing light armor or no armor. A helpless rogue does not gain the benefit of evasion.<br><strong>Rogue Talent Trap spotter (Ex)</strong> Whenever a rogue with this talent comes within 10 feet of a trap, she receives an immediate Perception skill check to notice the trap. This check should be made in secret by the GM.<br><strong>Trap Sense +3 (Ex)</strong> At 3rd level, a rogue gains an intuitive sense that alerts her to danger from traps, giving her a +1 bonus on Reflex saves made to avoid traps and a +1 dodge bonus to AC against attacks made by traps. These bonuses rise to +2 when the rogue reaches 6th level, to +3 when she reaches 9th level, to +4 when she reaches 12th level, to +5 at 15th, and to +6 at 18th level.<br><strong>Rogue Talent Finesse Rogue (Ex)</strong> A rogue that selects this talent gains Weapon Finesse as a bonus feat.<br><strong>Uncanny Dodge (Ex)</strong> Starting at 4th level, a rogue can react to danger before her senses would normally allow her to do so. She cannot be caught flat-footed, nor does she lose her Dex bonus to AC if the attacker is invisible. She still loses her Dexterity bonus to AC if immobilized. A rogue with this ability can still lose her Dexterity bonus to AC if an opponent successfully uses the feint action against her.<br><strong>Rogue Talent Fast Stealth (Ex)</strong> This ability allows a rogue to move at full speed using the Stealth skill without penalty.<br><strong>Improved Uncanny Dodge (Ex)</strong> A rogue of 8th level or higher can no longer be flanked.<br>This defense denies another rogue the ability to sneak attack the character by flanking her, unless the attacker has at least four more rogue levels than the target does.<br>If a character already has uncanny dodge (see above) from another class, the levels from the classes that grant uncanny dodge stack to determine the minimum rogue level required to flank the character.<br><strong>Rogue Talent Combat Trick - Improved Two-Weapon Fighting</strong> In addition to the standard single extra attack you get with an off-hand weapon, you get a second attack with it, albeit at a –5 penalty.<br><strong>Rogue Talent Offensive Defense</strong> When a rogue with this talent hits a creature with a melee attack that deals sneak attack damage, the rogue gains a +1 dodge bonus to AC for each sneak attack die rolled for 1 round.<br><strong>Advanced Talent Knock-Out Blow (Ex)</strong> Once per day, the rogue can forgo her sneak attack damage to attempt to knock out an opponent. She must declare the use of knock-out blow before she makes the attack. If the attack hits, it does normal damage, but instead of dealing sneak attack damage (and instead of any effect that triggers when the rogue deals sneak attack damage), the target falls unconscious for 1d4 rounds. A successful Fortitude save reduces this effect to staggered for 1 round. The DC of this save is equal to 10 + 1/2 the rogue's level + the rogue's Intelligence modifier."
      }, {
        note: "<strong>Reactionary</strong> You were bullied often as a child, but never quite developed an offensive response. Instead, you became adept at anticipating sudden attacks and reacting to danger quickly. You gain a +2 trait bonus on Initiative checks.<br><strong>Resilient</strong> Growing up in a poor neighborhood or in the unforgiving wilds often forced you to subsist on food and water from doubtful sources. You've built up your mettle as a result, and gain a +1 trait bonus on Fortitude saves.<br><strong>Weapon Finesse</strong> With a light weapon, rapier, whip, or spiked chain made for a creature of your size category, you may use your Dexterity modifier instead of your Strength modifier on attack rolls. If you carry a shield, its armor check penalty applies to your attack rolls.<br><strong>Dodge</strong> You gain a +1 dodge bonus to your AC. A condition that makes you lose your Dex bonus to AC also makes you lose the benefits of this feat.<br><strong>Two-Weapon Fighting</strong> Your penalties on attack rolls for fighting with two weapons are reduced. The penalty for your primary hand lessens by 2 and the one for your off hand lessens by 6. See Two-Weapon Fighting in Combat.<br><strong>Weapon focus</strong> You gain a +1 bonus on all attack rolls you make using the selected weapon.<br><strong>Deft hands</strong> You get a +2 bonus on Disable Device and Sleight of Hand skill checks. If you have 10 or more ranks in one of these skills, the bonus increases to +4 for that skill.<br><strong>Great Fortitude</strong> You get a +2 bonus on all Fortitude saving throws.<br><strong>Iron Will</strong> You get a +2 bonus on all Will saving throws."
      }, {
        note: "Headband of Vast Intelligence +4 Skills: Sense Motive, Spellcraft."
      }],
      story: []
    },
    events: []
  };

  // exposed methods
  return {
    data: data
  };

})();

var ro = (function() {

  var data = {
    awesomeSheet: true,
    basics: {
      name: "Ro Flint",
      race: "Elf",
      level: "7",
      classes: [{
        classname: "Magus Bladebound",
        level: 7,
        hp: 38,
        fortitude: 6,
        reflex: 2,
        will: 6,
        ranks: 14,
        bab: 5
      }],
      size: {
        category: "Medium",
        size_modifier: 0,
        special_size_modifier: 0,
        size_modifier_fly: 0,
        size_modifier_stealth: 0
      },
      alignment: "Lawful Evil",
      deity: "",
      height: "6'0",
      weight: "",
      age: "120",
      gender: "Male",
      speed: {
        land: "30ft",
        fly: "",
        maneuverability: "",
        swim: "",
        climb: "",
        burrow: ""
      },
      hero_points: "",
      character_description: "",
      initiative: {
        misc: "",
        temp: "",
        feat: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      xp: {
        total: 29090,
        advancement_speed: "Medium",
        next_level: "",
        needed: ""
      },
      character_image: {
        background: "",
        color: {
          r: "",
          g: "",
          b: ""
        },
        contain: "",
        cover: "",
        orientation: "",
        position: {
          x: "",
          y: ""
        },
        scale: "",
        image: ""
      }
    },
    statistics: {
      stats: {
        str: {
          modifier: 1,
          base: 12,
          current: 12,
          racial: "",
          enhancement: "",
          misc: "",
          temp: ""
        },
        dex: {
          modifier: 5,
          base: 17,
          current: 21,
          racial: 2,
          enhancement: 2,
          misc: "",
          temp: ""
        },
        con: {
          modifier: 0,
          base: 12,
          current: 10,
          racial: -2,
          enhancement: "",
          misc: "",
          temp: ""
        },
        int: {
          modifier: 4,
          base: 14,
          current: 18,
          racial: 2,
          enhancement: 2,
          misc: "",
          temp: ""
        },
        wis: {
          modifier: 0,
          base: 10,
          current: 10,
          racial: "",
          enhancement: "",
          misc: "",
          temp: ""
        },
        cha: {
          modifier: -2,
          base: 7,
          current: 7,
          racial: "",
          enhancement: "",
          misc: "",
          temp: ""
        }
      },
      feats: "Weapon Finesse, Dervish Dance, Alertness, Extra Arcane Pool, Weapon Focus (Black Blade), Intensified Spell",
      traits: "Magical Lineage (Shocking Grasp), Focused Mind (+2 on concentration checks)",
      languages: "Common, Draconic, Dwarven, Elven, Orc",
      special_abilities: "Low-Light Vision (Ex), Elven Immunities (Ex), Elven Magic (Ex), Weapon Familiarity (Ex), Keen Senses (Ex), Arcane Pool, Cantrips, Spell Combat (EX), Black Blade (Ex), Spell Recall (Su), Magus Arcana (Arcane Accuracy), Knowledge Pool (Su), Medium Armor (Ex)"
    },
    equipment: {
      gear: "Fur coat and cold weather outfit, Rapier, Spell component pouch, Spellbook, Backpack, Flask of Oil x3, Pouch (belt), Sack, Candle, Flint and Steel, Tindertwig, Rations (5 days), Waterskin, Bedroll, Blanket, Rope (silk), Mirror, Compass, Ink, Inkpen, Paper sheets, Case for maps/scrolls, Tent for 2, Trained Donkey (commands: come, down, stay heal, work), Alchemist Fire (3), Potion of CLW (3)",
      magic_gear: "Short Sword +1, Black Blade Scimitar +2",
      item: [],
      encumbrance: {
        encumbrance_str: "",
        carry_move: {
          light: "",
          medium: "",
          heavy: "",
          lift: "",
          drag: ""
        }
      },
      armor: {
        armor: "Mithral Chain Shirt +1",
        check_penalty: "",
        max_dex: "",
        shield: ""
      },
      body_slots: {
        belts: "Belt of Incredible Dexterity +2",
        body: "",
        chest: "",
        eyes: "",
        feet: "",
        hands: "",
        head: "Headband of Vast Intelligence +2",
        headband: "",
        neck: "",
        ring_left_hand: "",
        ring_right_hand: "",
        shoulders: "Cloak of Resistance  +1",
        wrist: ""
      },
      wealth: {
        platinum: "",
        gold: "1,570",
        silver: "",
        copper: "",
        total: ""
      },
      consumable: [{
        item: "Arcane Pool",
        current: "",
        total: 8,
        used: ""
      }, {
        item: "Black Blade Arcane Pool",
        current: "",
        total: 2,
        used: ""
      }, {
        item: "Alchemist Fire",
        current: "",
        total: 3,
        used: ""
      }, {
        item: "Potion of CLW",
        current: "",
        total: 3,
        used: ""
      }]
    },
    defense: {
      hp: {
        total: "",
        temp: "",
        damage: "",
        non_lethal_damage: "",
        current: ""
      },
      ac: {
        misc: "",
        temp: "",
        armor: 5,
        shield: "",
        deflect: "",
        dodge: "",
        natural: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          plus_ten: true,
          ac_armor: true,
          ac_shield: true,
          ac_deflect: true,
          ac_dodge: true,
          ac_natural: true,
          size: true,
          max_dex: true
        }
      },
      flat_footed: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          plus_ten: true,
          ac_armor: true,
          ac_shield: true,
          ac_deflect: true,
          ac_natural: true,
          size: true
        }
      },
      touch: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          plus_ten: true,
          ac_deflect: true,
          ac_dodge: true,
          size: true,
          max_dex: true
        }
      },
      ac_notes: "",
      fortitude: {
        base: "",
        resistance: 1,
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: true,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      reflex: {
        base: "",
        resistance: 1,
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      will: {
        base: "",
        resistance: 1,
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      save_notes: "Immune to sleep effects, +2 against enchantment spells and effects, +7 against cold weather",
      dr: {
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        overcome: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      sr: {
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      resist_notes: ""
    },
    offense: {
      base_attack: "",
      base_attack_bonuses: "",
      cmb: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          special_size: true,
          level: false,
          half_level: false
        }
      },
      cmd: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: true,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          special_size: true,
          level: false,
          half_level: false,
          plus_ten: true
        }
      },
      melee_attack: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          size: true,
          level: false,
          half_level: false
        }
      },
      ranged_attack: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          size: true,
          level: false,
          half_level: false
        }
      },
      attack: {
        melee: [{
          weapon: "Shortsword +1",
          attack: "+11",
          damage: "1d6+2",
          critical: "18–20/x2",
          type: "Piercing"
        }, {
          weapon: "Black Blade Scimitar +2",
          attack: "+13",
          damage: "1d6+7",
          critical: "18–20/x2",
          type: "Slashing"
        }, {
          weapon: "Spellstrike",
          attack: "+13",
          damage: "1d6+7",
          critical: "18–20/x2",
          type: "Slashing"
        }, {
          weapon: "Black Blade Scimitar +2/Spell Strike",
          attack: "+11/+11",
          damage: "1d6+7/Spell Effect",
          critical: "18–20/x2, 18–20/x2",
          type: "Slashing, Slashing"
        }, {
          weapon: "Black Blade Scimitar +3 Keen",
          attack: "+14",
          damage: "1d6+8",
          critical: "15-20x2",
          type: "Slashing"
        }, {
          weapon: "Black Blade Scimitar +3 Keen/Spell Strike Keen",
          attack: "+12/+12",
          damage: "1d6+8/Spell Effect",
          critical: "15-20x2,  15-20x2",
          type: "Slashing"
        }, {
          weapon: "Black Blade Scimitar +3 Arcane Accuracy Keen/Spell Strike Arcane Accuracy Keen",
          attack: "+16/+16",
          damage: "1d6+8/Spell Effect",
          critical: "15-20x2,  15-20x2",
          type: "Slashing"
        }],
        ranged: [{
          weapon: "Shortbow",
          attack: "+10",
          damage: "1d6",
          critical: "x3",
          range: "60 ft",
          ammo: "50",
          type: "Piercing"
        }]
      },
      attack_notes: "1 Arcane pool point = Arcane Accuracy +4 to attack or +2 or +1 and Keen"
    },
    skills: {
      ranks: {
        total: "",
        spent: {
          include_custom: false,
          current: ""
        }
      },
      custom: [],
      acrobatics: {
        ranks: 4,
        misc: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          class_skill: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      appraise: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      bluff: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      climb: {
        ranks: 2,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      craft_1: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      craft_2: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      diplomacy: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      disable_device: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      disguise: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      escape_artist: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      fly: {
        ranks: 7,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true,
          size_modifier_fly: true
        }
      },
      handle_animal: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      heal: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      intimidate: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_arcana: {
        ranks: 1,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_dungeoneering: {
        ranks: 1,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_engineering: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_geography: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_history: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_local: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_nature: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_nobility: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_planes: {
        ranks: 1,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_religion: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      linguistics: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      perception: {
        ranks: 7,
        misc: 2,
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      perform_1: {
        variant_name: "Dance",
        ranks: 2,
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      perform_2: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      profession_1: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      profession_2: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      ride: {
        ranks: 1,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      sense_motive: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      sleight_of_hand: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      spellcraft: {
        ranks: 7,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      stealth: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true,
          size_modifier_stealth: true
        }
      },
      survival: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      swim: {
        ranks: 2,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      use_magic_device: {
        ranks: 7,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      }
    },
    spells: {
      concentration: {
        current: "",
        misc: 2,
        temp: "",
        feat: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: true,
          half_level: false
        }
      },
      caster_level_check: {
        current: "",
        misc: 2,
        temp: "",
        feat: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: true,
          half_level: false
        }
      },
      spell_notes: "",
      per_day: {
        level_0: 6,
        level_1: 5,
        level_2: 4,
        level_3: 2,
        level_4: "",
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      dc: {
        level_0: 14,
        level_1: 15,
        level_2: 16,
        level_3: 17,
        level_4: "",
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      known: {
        level_0: "",
        level_1: "",
        level_2: "",
        level_3: "",
        level_4: "",
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      book: [{
        level_0: [{
          name: "Acid Splash",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Arcane Mark",
          prepared: 1,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Dancing Lights",
          prepared: 1,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Daze",
          prepared: 1,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Detect Magic",
          prepared: 1,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Disrupt Undead",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Flare",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Ghost Sound",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Light",
          prepared: 1,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Mage Hand",
          prepared: 1,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Open Close",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Prestidigitation",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Ray of Frost",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Read Magic",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Spark",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }]
      }, {
        level_1: [{
          name: "Color Spray",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Grease",
          prepared: 1,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Shocking Grasp",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "True Strike",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Magic Missile",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Shield",
          prepared: 1,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Vanish",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Obscuring Mist",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Chill Touch",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Frostbite",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Infernal Healing",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Windy Escape",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Unerring Weapon",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Ray of Enfeeblement",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Burning Hands",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Expeditious Retreat",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Shocking Grasp Intensified",
          prepared: 3,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Reduce Person",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }]
      }, {
        level_2: [{
          name: "Mirror Image",
          prepared: 2,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Frigid Touch",
          prepared: 2,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Glitter Dust",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Web",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Scorching Ray",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Pyrotechnics",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Web",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }]
      }, {
        level_3: [{
          name: "Fly",
          prepared: 1,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Haste",
          prepared: 1,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Force Hook Charge",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Ray of Exhaustion",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Vampiric Touch",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Stinking Cloud",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }, {
          name: "Slow",
          prepared: 0,
          active: false,
          cast: 0,
          note: ""
        }]
      }, {
        level_4: []
      }, {
        level_5: []
      }, {
        level_6: []
      }, {
        level_7: []
      }, {
        level_8: []
      }, {
        level_9: []
      }]
    },
    notes: {
      character: [{
        note: "<strong>+2 Dexterity, +2 Intelligence, –2 Constitution</strong> Elves are nimble, both in body and mind, but their form is frail.<br><strong>Medium</strong> Elves are Medium creatures and have no bonuses or penalties due to their size.<br><strong>Normal Speed</strong> Elves have a base speed of 30 feet.<br><strong>Low-Light Vision</strong> Elves can see twice as far as humans in conditions of dim light. See Additional Rules.<br><strong>Elven Immunities</strong> Elves are immune to magic sleep effects and get a +2 racial saving throw bonus against enchantment spells and effects.<br><strong>Elven Magic</strong> Elves receive a +2 racial bonus on caster level checks made to overcome spell resistance. In addition, elves receive a +2 racial bonus on Spellcraft skill checks made to identify the properties of magic items.<br><strong>Keen Senses</strong> Elves receive a +2 racial bonus on Perception skill checks.<br><strong>Weapon Familiarity</strong> Elves are proficient with longbows (including composite longbows), longswords, rapiers, and shortbows (including composite shortbows), and treat any weapon with the word \"elven\" in its name as a martial weapon.<br><strong>Languages</strong> Elves begin play speaking Common and Elven. Elves with high Intelligence scores can choose from the following: Celestial, Draconic, Gnoll, Gnome, Goblin, Orc, and Sylvan."
      }, {
        note: "<strong>Weapon Finesse</strong> With a light weapon, rapier, whip, or spiked chain made for a creature of your size category, you may use your Dexterity modifier instead of your Strength modifier on attack rolls. If you carry a shield, its armor check penalty applies to your attack rolls.<br><strong>Dervish Dance</strong> When wielding a scimitar with one hand, you can use your Dexterity modifier instead of your Strength modifier on melee attack and damage rolls. You treat the scimitar as a one-handed piercing weapon for all feats and class abilities that require such a weapon (such as a duelist’s precise strike ability). The scimitar must be for a creature of your size. You cannot use this feat if you are carrying a weapon or shield in your off hand.<br><strong>Extra Arcane Pool</strong> Your arcane pool increases by 2.<br><strong>Weapon Focus (Black Blade)</strong> You gain a +1 bonus on all attack rolls you make using the selected weapon.<br><strong>Intensified Spell</strong> An intensified spell increases the maximum number of damage dice by 5 levels. You must actually have sufficient caster levels to surpass the maximum in order to benefit from this feat. No other variables of the spell are affected, and spells that inflict damage that is not modified by caster level are not affected by this feat. An intensified spell uses up a spell slot one level higher than the spell's actual level.<br><strong>Magical Lineage (Shocking Grasp)</strong> One of your parents was a gifted spellcaster who not only used metamagic often, but also developed many magical items and perhaps even a new spell or two—and you have inherited a fragment of this greatness. Pick one spell when you choose this trait. When you apply metamagic feats to this spell, treat its actual level as 1 lower for determining the spell's final adjusted level.<br><strong>Focused Mind</strong> Your childhood was either dominated by lessons of some sort (whether musical, academic, or other) or by a horrible home life that encouraged your ability to block out distractions and focus on the immediate task at hand. You gain a +2 trait bonus on concentration checks."
      }, {
        note: "<strong>Arcane Pool (Su)</strong> At 1st level, the magus gains a reservoir of mystical arcane energy that he can draw upon to fuel his powers and enhance his weapon. This arcane pool has a number of points equal to 1/2 his magus level (minimum 1) + his Intelligence modifier. The pool refreshes once per day when the magus prepares his spells.<br>At 1st level, a magus can expend 1 point from his arcane pool as a swift action to grant any weapon he is holding a +1 enhancement bonus for 1 minute. For every four levels beyond 1st, the weapon gains another +1 enhancement bonus, to a maximum of +5 at 17th level. These bonuses can be added to the weapon, stacking with existing weapon enhancement to a maximum of +5. Multiple uses of this ability do not stack with themselves.<br>At 5th level, these bonuses can be used to add any of the following weapon properties: dancing, flaming, flaming burst, frost, icy burst, keen, shock, shocking burst, speed, or vorpal. Adding these properties consumes an amount of bonus equal to the property's base price modifier (see the Magic Weapon Special Ability Descriptions). These properties are added to any the weapon already has, but duplicates do not stack. If the weapon is not magical, at least a +1 enhancement bonus must be added before any other properties can be added. These bonuses and properties are decided when the arcane pool point is spent and cannot be changed until the next time the magus uses this ability. These bonuses do not function if the weapon is wielded by anyone other than the magus.<br>A magus can only enhance one weapon in this way at one time. If he uses this ability again, the first use immediately ends.<br><strong>Cantrips</strong> A magus can prepare a number of cantrips, or 0-level spells, each day, as noted in the table above under “Spells per Day.” These spells are cast like any other spell, but they are not expended when cast and may be used again.<br><strong>Spell Combat (Ex)</strong> At 1st level, a magus learns to cast spells and wield his weapons at the same time. This functions much like two-weapon fighting, but the off-hand weapon is a spell that is being cast. To use this ability, the magus must have one hand free (even if the spell being cast does not have somatic components), while wielding a light or one-handed melee weapon in the other hand. As a full-round action, he can make all of his attacks with his melee weapon at a –2 penalty and can also cast any spell from the magus spell list with a casting time of 1 standard action (any attack roll made as part of this spell also takes this penalty). If he casts this spell defensively, he can decide to take an additional penalty on his attack rolls, up to his Intelligence bonus, and add the same amount as a circumstance bonus on his concentration check. If the check fails, the spell is wasted, but the attacks still take the penalty. A magus can choose to cast the spell first or make the weapon attacks first, but if he has more than one attack, he cannot cast the spell between weapon attacks.<br><strong>Spellstrike (Su)</strong> At 2nd level, whenever a magus casts a spell with a range of “touch” from the magus spell list, he can deliver the spell through any weapon he is wielding as part of a melee attack. Instead of the free melee touch attack normally allowed to deliver the spell, a magus can make one free melee attack with his weapon (at his highest base attack bonus) as part of casting this spell. If successful, this melee attack deals its normal damage as well as the effects of the spell. If the magus makes this attack in concert with spell combat, this melee attack takes all the penalties accrued by spell combat melee attacks. This attack uses the weapon's critical range (20, 19–20, or 18–20 and modified by the keen weapon property or similar effects), but the spell effect only deals ×2 damage on a successful critical hit, while the weapon damage uses its own critical modifier.<br><strong>Magus Arcana Arcane Accuracy (Su)</strong> The magus can expend 1 point from his arcane pool as a swift action to grant himself an insight bonus equal to his Intelligence bonus on all attack rolls until the end of his turn.<br><strong>Knowledge Pool (Su)</strong>At 7th level, when a magus prepares his magus spells, he can decide to expend 1 or more points from his arcane pool, up to his Intelligence bonus. For each point he expends, he can treat any one spell from the magus spell list as if it were in his spellbook and can prepare that spell as normal that day. If he does not cast spells prepared in this way before the next time he prepares spells, he loses those spells. He can also cast spells added in this way using his spell recall ability, but only until he prepares spells again.<br><strong>Medium Armor (Ex)</strong> At 7th level, a magus gains proficiency with medium armor. A magus can cast magus spells while wearing medium armor without incurring the normal arcane spell failure chance. Like any other arcane spellcaster, a magus wearing heavy armor or using a shield incurs a chance of arcane spell failure if the spell in question has a somatic component."
      }, {
        note: "<strong>Black Blade (Ex)</strong> At 3rd level, the bladebound magus' gains a powerful sentient weapon called a black blade, whose weapon type is chosen by the magus. A magus with this class feature cannot take the familiar magus arcana, and cannot have a familiar of any kind, even from another class.<br>Instead of the normal arcane pool amount, the bladebound magus's arcane pool has a number of points equal to 1/3 his level (minimum 1) plus his Intelligence bonus. This ability changes the Arcane Pool class feature and replaces the magus arcana gained at 3rd level.<br><strong>Black Blade Ability Descriptions</strong> Enhancement Bonus +2, Int 12, Wis 8, Cha 8 Ego 8. Cause: To protect the Evles.<br><strong>Alertness (Ex)</strong> While a magus is wielding his black blade, he gains the Alertness feat.<br><strong>Black Blade Strike (Sp)</strong> As a free action, the magus can spend a point from the black blade's arcane pool to grant the black blade a +1 bonus on damage rolls for 1 minute. For every four levels beyond 1st, this ability gives the black blade another +1 on damage rolls.<br><strong>Telepathy (Su)</strong> While a magus is wielding or carrying his black blade, he can communicate telepathically with the blade in a language that the magus and the black blade share.<br><strong>Unbreakable (Ex)</strong> As long as it has at least 1 point in its arcane pool, a black blade is immune to the broken condition. If broken, the black blade is unconscious and powerless until repaired. If destroyed, the black blade can be reforged 1 week later through a special ritual that costs 200 gp per magus level. The ritual takes 24 hours to complete.<br><strong>Energy Attunement (Su)</strong> At 5th level, as a free action, a magus can spend a point of his black blade's arcane pool to have it deal one of the following types of damage instead of weapon damage: cold, electricity, or fire. He can spend 2 points from the black blade's arcane pool to deal sonic or force damage instead of weapon damage. This effect lasts until the start of the magus's next turn."
      }, {
        note: "Headband of Vast Intelligence +2 skill: Use Magic Device."
      }],
      story: []
    },
    events: []
  };

  // exposed methods
  return {
    data: data
  };

})();

var vos = (function() {

  var data = {
    awesomeSheet: true,
    basics: {
      name: "Vos Thunderstomp",
      race: "Dwarf",
      level: "",
      classes: [{
        classname: "Monk",
        level: 8,
        hp: 46,
        fortitude: 6,
        reflex: 6,
        will: 6,
        ranks: 32,
        bab: 6
      }],
      size: {
        category: "Medium",
        size_modifier: 0,
        special_size_modifier: 0,
        size_modifier_fly: 0,
        size_modifier_stealth: 0
      },
      alignment: "Chaotic Neutral",
      deity: "",
      height: "5'0",
      weight: "190 lbs",
      age: "40",
      gender: "Male",
      speed: {
        land: "50ft",
        fly: "",
        maneuverability: "",
        swim: "",
        climb: "",
        burrow: ""
      },
      hero_points: "",
      character_description: "",
      initiative: {
        misc: "",
        temp: "",
        feat: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      xp: {
        total: 51000,
        advancement_speed: "Medium",
        next_level: "",
        needed: ""
      },
      character_image: {
        background: "",
        color: {
          r: "",
          g: "",
          b: ""
        },
        contain: "",
        cover: "",
        orientation: "",
        position: {
          x: "",
          y: ""
        },
        scale: "",
        image: ""
      }
    },
    statistics: {
      stats: {
        str: {
          modifier: 4,
          base: 17,
          current: 19,
          racial: "",
          enhancement: 2,
          misc: "",
          temp: ""
        },
        dex: {
          modifier: 2,
          base: 14,
          current: 14,
          racial: "",
          enhancement: "",
          misc: "",
          temp: ""
        },
        con: {
          modifier: 1,
          base: 10,
          current: 12,
          racial: 2,
          enhancement: "",
          misc: "",
          temp: ""
        },
        int: {
          modifier: 0,
          base: 10,
          current: 10,
          racial: "",
          enhancement: "",
          misc: "",
          temp: ""
        },
        wis: {
          modifier: 4,
          base: 14,
          current: 18,
          racial: 2,
          enhancement: 2,
          misc: "",
          temp: ""
        },
        cha: {
          modifier: -2,
          base: 9,
          current: 7,
          racial: -2,
          enhancement: "",
          misc: "",
          temp: ""
        }
      },
      feats: "Weapon Focus (Unarmed Strike), Improved Grapple, Dodge, Extra Ki, Improved Disarm, Extra Ki, Combat Reflexes, Great Fortitude",
      traits: "",
      languages: "Common, Dwarven",
      special_abilities: "Darkvision, Defensive Training, Greed, Hatred, Hardy, Stability, Stonecunning, Weapon Familiarity, Evasion, Flurry of Blows (Ex), Stunning Fist (Ex), Unarmed Strike, AC Bonus (Ex), Evasion (Ex), Fast Movement (Ex), Maneuver Training (Ex), Still Mind (Ex), Ki Pool (magic/cold iron/silver) (Su), Slow Fall 40ft (Ex), High Jump (Ex), Purity of Body (Ex), Wholeness of Body (Su)"
    },
    equipment: {
      gear: "Backpack, Pouch (belt), Sack, Candle, Flint And Steel, Tindertwig, Rations (5 Days), Waterskin, Bedroll, Blanket, Bloodblock, Rope (silk), Mirror, Compass, Ink, Inkpen, Paper Sheets, Case For Maps/scrolls, Torch, Rubbing Poweder, Rubbing Oils, Fine Cheese (1), Smelly Cheese (3), Wine (2), Wrestling Costume (2), Dagger, Lavendar soap, Soap bar",
      magic_gear: "Good Berries (5), Bracers of Armor +1, Ioun Stones Dusty Rose",
      item: [{
        name: "Alchemist Fire",
        quantity: 3,
        weight: ""
      }, {
        name: "Flask Of Oil",
        quantity: 3,
        weight: ""
      }, {
        name: "Potion of Cure Light Wounds",
        quantity: 1,
        weight: ""
      }, {
        name: "Potion of Cure Moderate Wounds",
        quantity: 1,
        weight: ""
      }, {
        name: "Potion of Cure Serious Wounds ",
        quantity: 1,
        weight: ""
      }, {
        name: "Potion of Owls Wisdom",
        quantity: 1,
        weight: ""
      }, {
        name: "Potion of Stabilise",
        quantity: 1,
        weight: ""
      }, {
        name: "Scented Oils",
        quantity: 5,
        weight: ""
      }],
      encumbrance: {
        encumbrance_str: "",
        carry_move: {
          light: "",
          medium: "",
          heavy: "",
          lift: "",
          drag: ""
        }
      },
      armor: {
        armor: "",
        check_penalty: "",
        max_dex: "",
        shield: ""
      },
      body_slots: {
        belts: "Belt of Giant Strength +2",
        body: "",
        chest: "",
        eyes: "",
        feet: "",
        hands: "",
        head: "Headband of Inspired Wisdom +2",
        headband: "",
        neck: "Amulet of Mighty Fists +1 (Shock)",
        ring_left_hand: "",
        ring_right_hand: "Ring of Protection +1",
        shoulders: "Cloak of Resistance +2",
        wrist: "Bracers of Armor +2"
      },
      wealth: {
        platinum: "",
        gold: "2,155",
        silver: "",
        copper: "",
        total: ""
      },
      consumable: [{
        item: "Ki Pool",
        current: "",
        total: 11,
        used: 2
      }, {
        item: "Stunning Fist",
        current: "",
        total: 10,
        used: 1
      }]
    },
    defense: {
      hp: {
        total: "",
        temp: "",
        damage: "",
        non_lethal_damage: "",
        current: ""
      },
      ac: {
        misc: 3,
        temp: "",
        armor: 2,
        shield: "",
        deflect: 1,
        dodge: 1,
        natural: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          plus_ten: true,
          ac_armor: true,
          ac_shield: true,
          ac_deflect: true,
          ac_dodge: true,
          ac_natural: true,
          size: true,
          max_dex: true
        }
      },
      flat_footed: {
        misc: 3,
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          plus_ten: true,
          ac_armor: true,
          ac_shield: true,
          ac_deflect: true,
          ac_natural: true,
          size: true,
          ac_dodge: false
        }
      },
      touch: {
        misc: 3,
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          plus_ten: true,
          ac_deflect: true,
          ac_dodge: true,
          size: true,
          max_dex: true,
          ac_armor: false,
          ac_shield: false,
          ac_natural: false
        }
      },
      ac_notes: "",
      fortitude: {
        base: "",
        resistance: 2,
        feat: 2,
        trait: "",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: true,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      reflex: {
        base: "",
        resistance: 2,
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      will: {
        base: "",
        resistance: 2,
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      save_notes: "Immunity to all diseases, +2 against poison, spells, and spell-like abilities, +2 against enchantment spells and effects.",
      dr: {
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        overcome: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      sr: {
        feat: "",
        trait: "",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      resist_notes: ""
    },
    offense: {
      base_attack: "",
      base_attack_bonuses: "",
      cmb: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: false,
          special_size: true,
          level: true,
          half_level: false
        }
      },
      cmd: {
        misc: 1,
        temp: "",
        current: "",
        bonuses: {
          str_bonus: true,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          bab: true,
          special_size: true,
          level: false,
          half_level: false,
          plus_ten: true
        }
      },
      melee_attack: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          size: true,
          level: false,
          half_level: false
        }
      },
      ranged_attack: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          size: true,
          level: false,
          half_level: false
        }
      },
      attack: {
        melee: [{
          weapon: "Flurry of Blows",
          attack: "+11/+11/+8/+8",
          damage: "1d10+4 + 1d6 electricity",
          critical: "20x2",
          type: "Bludgeoning"
        }, {
          weapon: "Grapple",
          attack: "+14",
          damage: "1d10+4",
          critical: "20x2",
          type: ""
        }, {
          weapon: "Disarm",
          attack: "+14",
          damage: "",
          critical: "",
          type: ""
        }, {
          weapon: "Stunning Fist",
          attack: "+11",
          damage: "1d10+4 + 1d6 electricity",
          critical: "20x2",
          type: "Bludgeoning"
        }, {
          weapon: "Unarmed Strike",
          attack: "+11",
          damage: "1d10+4 + 1d6 electricity",
          critical: "20x2",
          type: "Bludgeoning"
        }],
        ranged: [{
          weapon: "Shortbow",
          attack: "+8",
          damage: "1d6",
          critical: "x3",
          range: "60 ft",
          ammo: "50",
          type: "Piercing"
        }]
      },
      attack_notes: "+1 weapon focus (Unarmed strike). +2 grapple, +2 to resist grapple. +2 disarm, +2 CMD to resist disarm. Stunning Fist DC 18, Fortitude."
    },
    skills: {
      ranks: {
        total: "",
        spent: {
          include_custom: false,
          current: ""
        }
      },
      custom: [{
        name: "Acrobatics (Jump)",
        ranks: 8,
        misc: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          class_skill: true,
          level: true,
          half_level: false,
          check_penalty: false
        }
      }],
      acrobatics: {
        ranks: 8,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      appraise: {
        ranks: "",
        misc: 2,
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      bluff: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      climb: {
        ranks: 5,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      craft_1: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      craft_2: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      diplomacy: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      disable_device: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      disguise: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      escape_artist: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      fly: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true,
          size_modifier_fly: true
        }
      },
      handle_animal: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      heal: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      intimidate: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_arcana: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_dungeoneering: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_engineering: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_geography: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_history: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_local: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_nature: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_nobility: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_planes: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_religion: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      linguistics: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      perception: {
        ranks: 8,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      perform_1: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      perform_2: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      profession_1: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      profession_2: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      ride: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      sense_motive: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      sleight_of_hand: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      spellcraft: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      stealth: {
        ranks: 8,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true,
          size_modifier_stealth: true
        }
      },
      survival: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      swim: {
        ranks: 3,
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      use_magic_device: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      }
    },
    spells: {
      concentration: {
        current: "",
        misc: "",
        temp: "",
        feat: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      caster_level_check: {
        current: "",
        misc: "",
        temp: "",
        feat: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      },
      spell_notes: "",
      per_day: {
        level_0: "",
        level_1: "",
        level_2: "",
        level_3: "",
        level_4: "",
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      dc: {
        level_0: "",
        level_1: "",
        level_2: "",
        level_3: "",
        level_4: "",
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      known: {
        level_0: "",
        level_1: "",
        level_2: "",
        level_3: "",
        level_4: "",
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      book: [{
        level_0: []
      }, {
        level_1: []
      }, {
        level_2: []
      }, {
        level_3: []
      }, {
        level_4: []
      }, {
        level_5: []
      }, {
        level_6: []
      }, {
        level_7: []
      }, {
        level_8: []
      }, {
        level_9: []
      }]
    },
    notes: {
      character: [{
        note: "<strong>+2 Constitution, +2 Wisdom, –2 Charisma</strong> Dwarves are both tough and wise, but also a bit gruff.<br><strong>Medium</strong> Dwarves are Medium creatures and have no bonuses or penalties due to their size.<br><strong>Slow and Steady</strong> Dwarves have a base speed of 20 feet, but their speed is never modified by armor or encumbrance.<br><strong>Darkvision</strong> Dwarves can see in the dark up to 60 feet.<br><strong>Defensive Training</strong> Dwarves get a +4 dodge bonus to AC against monsters of the giant subtype.<br><strong>Greed</strong> Dwarves receive a +2 racial bonus on Appraise skill checks made to determine the price of nonmagical goods that contain precious metals or gemstones.<br><strong>Hatred</strong> Dwarves receive a +1 bonus on attack rolls against humanoid creatures of the orc and goblinoid subtypes due to special training against these hated foes.<br><strong>Hardy</strong> Dwarves receive a +2 racial bonus on saving throws against poison, spells, and spell-like abilities.<br><strong>Stability</strong> Dwarves receive a +4 racial bonus to their Combat Maneuver Defense when resisting a bull rush or trip attempt while standing on the ground.<br><strong>Stonecunning</strong> Dwarves receive a +2 bonus on Perception checks to potentially notice unusual stonework, such as traps and hidden doors located in stone walls or floors. They receive a check to notice such features whenever they pass within 10 feet of them, whether or not they are actively looking.<br><strong>Weapon Familiarity</strong> Dwarves are proficient with battleaxes, heavy picks, and warhammers, and treat any weapon with the word \"dwarven\" in its name as a martial weapon.<br><strong>Languages</strong> Dwarves begin play speaking Common and Dwarven. Dwarves with high Intelligence scores can choose from the following Giant, Gnome, Goblin, Orc, Terran, and Undercommon."
      }, {
        note: "<strong>Weapon and Armor Proficiency</strong> Monks are proficient with the club, crossbow (light or heavy), dagger, handaxe, javelin, kama, nunchaku, quarterstaff, sai, shortspear, short sword, shuriken, siangham, sling, and spear.<br>Monks are not proficient with any armor or shields.<br>When wearing armor, using a shield, or carrying a medium or heavy load, a monk loses his AC bonus, as well as his fast movement and flurry of blows abilities.<br><strong>AC Bonus (Ex)</strong> When unarmored and unencumbered, the monk adds his Wisdom bonus (if any) to his AC and his CMD. In addition, a monk gains a +1 bonus to AC and CMD at 4th level. This bonus increases by 1 for every four monk levels thereafter, up to a maximum of +5 at 20th level.<br>These bonuses to AC apply even against touch attacks or when the monk is flat-footed. He loses these bonuses when he is immobilized or helpless, when he wears any armor, when he carries a shield, or when he carries a medium or heavy load.<br><strong>Flurry of Blows (Ex)</strong> Starting at 1st level, a monk can make a flurry of blows as a full-attack action. When doing so, he may make on additional attack, taking a -2 penalty on all of his attack rolls, as if using the Two-Weapon Fighting feat. These attacks can be any combination of unarmed strikes and attacks with a monk special weapon (he does not need to use two weapons to use this ability). For the purpose of these attacks, the monk's base attack bonus from his monk class levels is equal to his monk level. For all Other purposes, such as qualifying for a feat or a prestige class, the monk uses his normal base attack bonus.<br>At 8th level, the monk can make two additional attacks when he uses flurry of blows, as if using Improved Two-Weapon Fighting (even if the monk does not meet the prerequisites for the feat).<br>At 15th level, the monk can make three additional attacks using flurry of blows, as if using Greater Two-Weapon Fighting (even if the monk does not meet the prerequisites for the feat).<br>A monk applies his full Strength bonus to his damage rolls for all successful attacks made with flurry of blows, whether the attacks are made with an off-hand or with a weapon wielded in both hands. A monk may substitute disarm, sunder, and trip combat maneuvers for unarmed attacks as part of a flurry of blows. A monk cannot use any weapon other than an unarmed strike or a special monk weapon as part of a flurry of blows. A monk with natural weapons cannot use such weapons as part of a flurry of blows, nor can he make natural attacks in addition to his flurry of blows attacks.<br><strong>Unarmed Strike</strong> At 1st level, a monk gains Improved Unarmed Strike as a bonus feat. A monk's attacks may be with fist, elbows, knees, and feet. This means that a monk may make unarmed strikes with his hands full. There is no such thing as an off-hand attack for a monk striking unarmed. A monk may thus apply his full Strength bonus on damage rolls for all his unarmed strikes.<br>Usually a monk's unarmed strikes deal lethal damage, but he can choose to deal nonlethal damage instead with no penalty on his attack roll. He has the same choice to deal lethal or nonlethal damage while grappling.<br>A monk's unarmed strike is treated as both a manufactured weapon and a natural weapon for the purpose of spells and effects that enhance or improve either manufactured weapons or natural weapons.<br>A monk also deals more damage with his unarmed strikes than a normal person would, as shown above on Table: Monk. The unarmed damage values listed on Table: Monk is for Medium monks. A Small monk deals less damage than the amount given there with his unarmed attacks, while a Large monk deals more damage; see Small or Large Monk Unarmed Damage on the table given below.<br><strong>Bonus Feat</strong> At 1st level, 2nd level, and every 4 levels thereafter, a monk may select a bonus feat. These feats must be taken from the following list: Catch Off-Guard, Combat Reflexes, Deflect Arrows, Dodge, Improved Grapple, Scorpion Style, and Throw Anything. At 6th level, the following feats are added to the list: Gorgon's Fist, Improved Bull Rush, Improved Disarm, Improved Feint, Improved Trip, and Mobility. At 10th level, the following feats are added to the list: Improved Critical, Medusa's Wrath, Snatch Arrows, and Spring Attack. A monk need not have any of the prerequisites normally required for these feats to select them.<br><strong>Stunning Fist (Ex)</strong> At 1st level, the monk gains Stunning Fist as a bonus feat, even if he does not meet the prerequisites. At 4th level, and every 4 levels thereafter, the monk gains the ability to apply a new condition to the target of his Stunning Fist. This condition replaces stunning the target for 1 round, and a successful saving throw still negates the effect. At 4th level, he can choose to make the target fatigued. At 8th level, he can make the target sickened for 1 minute. At 12th level, he can make the target staggered for 1d6+1 rounds. At 16th level, he can permanently blind or deafen the target. At 20th level, he can paralyze the target for 1d6+1 rounds. The monk must choose which condition will apply before the attack roll is made. These effects do not stack with themselves (a creature sickened by Stunning Fist cannot become nauseated if hit by Stunning Fist again), but additional hits do increase the duration.<br><strong>Evasion (Ex)</strong> At 2nd level or higher, a monk can avoid damage from many area-effect attacks. If a monk makes a successful Reflex saving throw against an attack that normally deals half damage on a successful save, he instead takes no damage. Evasion can be used only if a monk is wearing light armor or no armor. A helpless monk does not gain the benefit of evasion.<br><strong>Fast Movement (Ex)</strong> At 3rd level, a monk gains an enhancement bonus to his land speed, as shown on Table: Monk. A monk in armor or carrying a medium or heavy load loses this extra speed.<br><strong>Maneuver Training (Ex)</strong> At 3rd level, a monk uses his monk level in place of his base attack bonus when calculating his Combat Maneuver Bonus. Base attack bonuses granted from other classes are unaffected and are added normally.<br><strong>Still Mind (Ex)</strong> A monk of 3rd level or higher gains a +2 bonus on saving throws against enchantment spells and effects.<br><strong>Ki Pool (Su)</strong> At 4th level, a monk gains a pool of ki points, supernatural energy he can use to accomplish amazing feats. The number of points in a monk's ki pool is equal to 1/2 his monk level + his Wisdom modifier. As long as he has at least 1 point in his ki pool, he can make a ki strike. At 4th level, ki strike allows his unarmed attacks to be treated as magic weapons for the purpose of overcoming damage reduction. At 7th level, his unarmed attacks are also treated as cold iron and silver for the purpose of overcoming damage reduction. At 10th level, his unarmed attacks are also treated as lawful weapons for the purpose of overcoming damage reduction. At 16th level, his unarmed attacks are treated as adamantine weapons for the purpose of overcoming damage reduction and bypassing hardness.<br>By spending 1 point from his ki pool, a monk can make one additional attack at his highest attack bonus when making a flurry of blows attack. In addition, he can spend 1 point to increase his speed by 20 feet for 1 round. Finally, a monk can spend 1 point from his ki pool to give himself a +4 dodge bonus to AC for 1 round. Each of these powers is activated as a swift action. A monk gains additional powers that consume points from his ki pool as he gains levels.<br>The ki pool is replenished each morning after 8 hours of rest or meditation; these hours do not need to be consecutive.<br><strong>Slow Fall (Ex)</strong> At 4th level or higher, a monk within arm's reach of a wall can use it to slow his descent. When first gaining this ability, he takes damage as if the fall were 20 feet shorter than it actually is. The monk's ability to slow his fall (that is, to reduce the effective distance of the fall when next to a wall) improves with his monk level until at 20th level he can use a nearby wall to slow his descent and fall any distance without harm.<br><strong>High Jump (Ex)</strong> At 5th level, a monk adds his level to all Acrobatics checks made to jump, both for vertical jumps and horizontal jumps. In addition, he always counts as having a running start when making jump checks using Acrobatics. By spending 1 point from his ki pool as a swift action, a monk gains a +20 bonus on Acrobatics checks made to jump for 1 round.<br><strong>Purity of Body (Ex)</strong> At 5th level, a monk gains immunity to all diseases, including supernatural and magical diseases.<br><strong>Wholeness of Body (Su)</strong> At 7th level or higher, a monk can heal his own wounds as a standard action. He can heal a number of hit points of damage equal to his monk level by using 2 points from his ki pool."
      }, {
        note: "<strong>Improved Grapple</strong> You do not provoke an attack of opportunity when performing a grapple combat maneuver. In addition, you receive a +2 bonus on checks made to grapple a foe. You also receive a +2 bonus to your Combat Maneuver Defense whenever an opponent tries to grapple you.<br><strong>Weapon Focus</strong> You gain a +1 bonus on all attack rolls you make using the selected weapon.<br><strong>Dodge</strong> You gain a +1 dodge bonus to your AC. A condition that makes you lose your Dex bonus to AC also makes you lose the benefits of this feat.<br><strong>Extra Ki</strong> Your ki pool increases by 2.<br><strong>Improved Disarm</strong> You do not provoke an attack of opportunity when performing a disarm combat maneuver. In addition, you receive a +2 bonus on checks made to disarm a foe. You also receive a +2 bonus to your Combat Maneuver Defense whenever an opponent tries to disarm you.<br><strong>Combat Reflexes</strong> You may make a number of additional attacks of opportunity per round equal to your Dexterity bonus. With this feat, you may also make attacks of opportunity while flat-footed.<br><strong>Great Fortitude</strong> You get a +2 bonus on all Fortitude saving throws."
      }, {
        note: "Infected with lycanthropy."
      }, {
        note: "Pippin making Ioun Stones Dusty Rose for Vos (2,500gp spent on materials)."
      }],
      story: [{
        note: "Party gear Wand of Cure Light Wounds x2 (Pippin and Morin)."
      }, {
        note: "Prince's Wolves scarf, a toke to proof."
      }]
    },
    events: []
  };

  // exposed methods
  return {
    data: data
  };

})();

var hardCodedCharacters = (function() {

  var demoCharacters = [
    izlara.data,
    ravich.data
  ];

  var allCharacters = [
    izlara.data,
    ravich.data,
    nif.data,
    vos.data,
    orrin.data,
    nefi.data,
    ro.data,
    marika.data
  ];

  var singleCharacters = {
    izlara: izlara.data,
    ravich: ravich.data,
    nif: nif.data,
    vos: vos.data,
    orrin: orrin.data,
    nefi: nefi.data,
    ro: ro.data,
    marika: marika.data
  }

  function all() {
    return allCharacters
  };

  function demo() {
    return demoCharacters
  };

  function single() {
    return singleCharacters
  };

  // exposed methods
  return {
    demo: demo,
    all: all,
    single: single
  };

})();

var characterImage = (function() {

  var resizeTimer = null;
  var backgroundTimer = null;

  function bind() {
    var characterImageInput = helper.e(".js-character-image-input");
    var characterImageClear = helper.e(".js-character-image-clear");

    var characterImageScaleInput = helper.e(".js-character-image-scale-input");
    var characterImageScaleDecrease = helper.e(".js-character-image-scale-decrease");
    var characterImageScaleIncrease = helper.e(".js-character-image-scale-increase");

    var characterImagePositionXInput = helper.e(".js-character-image-position-x-input");
    var characterImagePositionXDecrease = helper.e(".js-character-image-position-x-decrease");
    var characterImagePositionXIncrease = helper.e(".js-character-image-position-x-increase");

    var characterImagePositionYInput = helper.e(".js-character-image-position-y-input");
    var characterImagePositionYDecrease = helper.e(".js-character-image-position-y-decrease");
    var characterImagePositionYIncrease = helper.e(".js-character-image-position-y-increase");

    var characterImageScaleCover = helper.e(".js-character-image-scale-cover");
    var characterImageScaleContain = helper.e(".js-character-image-scale-contain");
    var characterImageScaleCenter = helper.e(".js-character-image-scale-center");

    var characterBasicsImageScaleAverage = helper.e(".js-basics-character-image-background-average");
    var characterBasicsImageScaleBlack = helper.e(".js-basics-character-image-background-black");
    var characterBasicsImageScaleWhite = helper.e(".js-basics-character-image-background-white");

    characterImageInput.addEventListener("change", function() {
      _handleFiles(this);
    }, false);
    characterImageClear.addEventListener("click", function() {
      _removeCharacterImage();
    }, false);

    characterImageScaleInput.addEventListener("input", function() {
      resizeTimer = setTimeout(_delayResize, 350, this);
    }, false);
    characterImageScaleDecrease.addEventListener("click", function() {
      _resize();
    }, false);
    characterImageScaleIncrease.addEventListener("click", function() {
      _resize();
    }, false);

    characterImagePositionXInput.addEventListener("input", function() {
      resizeTimer = setTimeout(_delayResize, 350, this);
    }, false);
    characterImagePositionXDecrease.addEventListener("click", function() {
      _resize();
    }, false);
    characterImagePositionXIncrease.addEventListener("click", function() {
      _resize();
    }, false);

    characterImagePositionYInput.addEventListener("input", function() {
      resizeTimer = setTimeout(_delayResize, 350, this);
    }, false);
    characterImagePositionYDecrease.addEventListener("click", function() {
      _resize();
    }, false);
    characterImagePositionYIncrease.addEventListener("click", function() {
      _resize();
    }, false);

    characterImageScaleCover.addEventListener("click", function() {
      _resize("cover", "center");
      _update_all_input();
      sheet.storeCharacters();
    }, false);
    characterImageScaleContain.addEventListener("click", function() {
      _resize("contain", "center");
      _update_all_input();
      sheet.storeCharacters();
    }, false);
    characterImageScaleCenter.addEventListener("click", function() {
      _resize(false, "center");
      _update_all_input();
      sheet.storeCharacters();
    }, false);

    characterBasicsImageScaleAverage.addEventListener("click", function() {
      backgroundTimer = setTimeout(_delayBakcground, 350, this);
    }, false);
    characterBasicsImageScaleBlack.addEventListener("click", function() {
      backgroundTimer = setTimeout(_delayBakcground, 350, this);
    }, false);
    characterBasicsImageScaleWhite.addEventListener("click", function() {
      backgroundTimer = setTimeout(_delayBakcground, 350, this);
    }, false);
  };

  function _delayResize() {
    _resize();
  };

  function _delayBakcground() {
    _render_background();
  };

  function _removeCharacterImage() {
    if (helper.getObject(sheet.getCharacter(), "basics.character_image.image") != "") {
      prompt.render("Remove Character Image?", "This can not be undone.", "Remove", destroy);
    };
  };

  function _handleFiles(input) {
    var files = input.files;
    if (files && files[0]) {
      for (var i = 0; i < files.length; i++) {
        _loadImage(files[i]);
      };
    };
  };

  function _loadImage(file) {
    var reader = new FileReader;
    reader.onload = function() {
      var tempImage = new Image;
      tempImage.onload = function() {
        // check width and height
        if (tempImage.width <= 2000 || tempImage.height <= 2000) {
          destroy();
          _store_image(reader.result);
          _store_background("average");
          _store_color(helper.getAverageColor(reader.result));
          _create_image();
          _render_background();
          _calculateSizes();
          _resize();
          _update_all_input();
          _update_all_radio();
          _clearInput();
          sheet.storeCharacters();
        } else {
          snack.render("Image too large, max 2000x2000px.", false, false);
        };
      };
      tempImage.src = reader.result;
    };
    // check size
    if (file.size <= 500000) {
      // check type
      if (file.type == "image/jpeg" || file.type == "image/jpg" || file.type == "image/gif" || file.type == "image/png") {
        reader.readAsDataURL(file);
      } else {
        snack.render("Not an image file.", false, false);
      };
    } else {
      snack.render("File too big, max 500KB.", false, false);
    };
  };

  function _calculateSizes() {
    var imageBase64 = helper.getObject(sheet.getCharacter(), "basics.character_image.image");
    var characterImagePreview = helper.e(".js-character-image-preview");
    var characterImage = helper.e(".js-character-image");
    var scale;
    var cover;
    var contain;
    var orientation;
    var size = {
      imageWidth: 0,
      imageHeight: 0,
      containerWidth: 0,
      containerHeight: 0
    }
    size.imageWidth = characterImage.width;
    size.imageHeight = characterImage.height;
    size.containerWidth = characterImagePreview.getBoundingClientRect().width;
    size.containerHeight = characterImagePreview.getBoundingClientRect().height;
    if (size.imageWidth > size.imageHeight) {
      orientation = "landscape";
      cover = parseInt((size.containerHeight / ((size.containerWidth / size.imageWidth) * size.imageHeight)) * 100, 10) + 1;
      contain = 100;
    } else if (size.imageWidth < size.imageHeight) {
      orientation = "portrait";
      cover = 100;
      contain = parseInt((size.containerHeight / ((size.containerWidth / size.imageWidth) * size.imageHeight)) * 100, 10) + 1;
    } else {
      orientation = "square";
      cover = 100;
      contain = 100;
    };
    scale = cover;
    // console.log(size);
    // console.log("scale = ", scale, "cover = ", cover, "contain = ", contain, "orientation = ", orientation);
    _store_orientation(orientation);
    _store_cover(cover);
    _store_contain(contain);
    _store_scale(scale);
    _store_position(50, 50);
  };

  function _create_image() {
    var characterImagePreview = helper.e(".js-character-image-preview");
    var background = helper.getObject(sheet.getCharacter(), "basics.character_image.background");
    var color = helper.getObject(sheet.getCharacter(), "basics.character_image.color");
    var imageBase64 = helper.getObject(sheet.getCharacter(), "basics.character_image.image");
    if (imageBase64) {
      var image = new Image;
      image.setAttribute("class", "m-character-image js-character-image");
      image.src = imageBase64;
      if (background == "black") {
        color = "rgb(0,0,0)";
      } else if (background == "white") {
        color = "rgb(255,255,255)";
      } else if (background == "average") {
        color = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
      };
      characterImagePreview.style.backgroundColor = color;
      characterImagePreview.appendChild(image);
    };
  };

  function render() {
    var characterImagePreview = helper.e(".js-character-image-preview");
    var imageBase64 = helper.getObject(sheet.getCharacter(), "basics.character_image.image");
    if (imageBase64) {
      var image = new Image;
      image.setAttribute("class", "m-character-image js-character-image");
      image.src = imageBase64;
      characterImagePreview.appendChild(image);
      _resize();
      _render_background();
    };
  };

  function _render_background() {
    var background = helper.getObject(sheet.getCharacter(), "basics.character_image.background");
    var color = helper.getObject(sheet.getCharacter(), "basics.character_image.color");
    var characterImagePreview = helper.e(".js-character-image-preview");
    if (background == "black") {
      color = "rgb(0,0,0)";
    } else if (background == "white") {
      color = "rgb(255,255,255)";
    } else if (background == "average") {
      color = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
    };
    characterImagePreview.style.backgroundColor = color;
  };

  function _store_position(axisX, axisY) {
    var position = {
      x: axisX,
      y: axisY
    };
    helper.setObject(sheet.getCharacter(), "basics.character_image.position", position);
  };

  function _store_background(background) {
    helper.setObject(sheet.getCharacter(), "basics.character_image.background", background);
  };

  function _store_color(color) {
    helper.setObject(sheet.getCharacter(), "basics.character_image.color", color);
  };

  function _store_image(imageBase64) {
    helper.setObject(sheet.getCharacter(), "basics.character_image.image", imageBase64);
  };

  function _store_scale(scale) {
    helper.setObject(sheet.getCharacter(), "basics.character_image.scale", scale);
  };

  function _store_cover(cover) {
    helper.setObject(sheet.getCharacter(), "basics.character_image.cover", cover);
  };

  function _store_contain(contain) {
    helper.setObject(sheet.getCharacter(), "basics.character_image.contain", contain);
  };

  function _store_orientation(orientation) {
    helper.setObject(sheet.getCharacter(), "basics.character_image.orientation", orientation);
  };

  function _resize(presetSize, presetPosition) {
    var imageBase64 = helper.getObject(sheet.getCharacter(), "basics.character_image.image");
    var characterImage = helper.e(".js-character-image");
    var scale;
    var x;
    var y;
    if (imageBase64) {
      if (presetSize) {
        if (presetSize == "contain") {
          scale = helper.getObject(sheet.getCharacter(), "basics.character_image.contain");
        } else if (presetSize == "cover") {
          scale = helper.getObject(sheet.getCharacter(), "basics.character_image.cover");
        };
        _store_scale(scale);
      } else {
        scale = helper.getObject(sheet.getCharacter(), "basics.character_image.scale");
      };
      if (presetPosition) {
        if (presetPosition == "center") {
          x = 50;
          y = 50;
        };
        _store_position(x, y);
      } else {
        x = helper.getObject(sheet.getCharacter(), "basics.character_image.position.x");
        y = helper.getObject(sheet.getCharacter(), "basics.character_image.position.y");
      };
      if (scale == "" && scale != 0) {
        scale = helper.getObject(sheet.getCharacter(), "basics.character_image.cover");
      };
      if (x == "" && x != 0) {
        x = 50;
      };
      if (y == "" && y != 0) {
        y = 50;
      };
      // characterImage.style.transform = "scale(" + scale + ") translate(" + x + "%, " + y + "%)";
      characterImage.style.width = scale + "%";
      characterImage.style.left = x + "%";
      characterImage.style.top = y + "%";
    };
  };

  function _update_all_input() {
    _update_input(helper.e(".js-character-image-scale-input"));
    _update_input(helper.e(".js-character-image-position-x-input"));
    _update_input(helper.e(".js-character-image-position-y-input"));
  };

  function _update_input(input) {
    var inputBlockElement = helper.getClosest(input, ".js-input-block");
    inputBlock.render(inputBlockElement);
  };

  function _update_all_radio() {
    _update_radio(helper.e(".js-basics-character-image-background-average"));
    _update_radio(helper.e(".js-basics-character-image-background-black"));
    _update_radio(helper.e(".js-basics-character-image-background-white"));
  };

  function _update_radio(radio) {
    var radioBlockElement = helper.getClosest(radio, ".js-radio-block");
    radioBlock.render(radioBlockElement);
  };

  function _clearInput(input) {
    var characterImageInput = helper.e(".js-character-image-input");
    characterImageInput.value = "";
  };

  function clear() {
    var characterImagePreview = helper.e(".js-character-image-preview");
    characterImagePreview.removeAttribute("style");
    while (characterImagePreview.lastChild) {
      characterImagePreview.removeChild(characterImagePreview.lastChild);
    };
  };

  function destroy() {
    var object = {
      background: "",
      color: {
        r: "",
        g: "",
        b: ""
      },
      contain: "",
      cover: "",
      image: "",
      orientation: "",
      position: {
        x: "",
        y: ""
      },
      scale: ""
    };
    helper.setObject(sheet.getCharacter(), "basics.character_image", object);
    sheet.storeCharacters();
    _update_all_input();
    _update_all_radio();
    clear();
  };

  // exposed methods
  return {
    bind: bind,
    clear: clear,
    destroy: destroy,
    render: render
  };

})();

var checkUrl = (function() {

  function checkHttps() {
    var host = "zombiefox.github.io"
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
      sheet.restore()
    } else if (helper.getUrlParameter("sheet") == "all") {
      sheet.all()
    } else if (helper.getUrlParameter("sheet") == "destroy") {
      sheet.destroy()
    };
  };

  function _loadCharacter() {
    var index;
    var characterParameter = helper.getUrlParameter("character");
    for (var i = 0; i < sheet.getAllCharacters().length; i++) {
      if (characterParameter == sheet.getAllCharacters()[i].basics.name.toLowerCase().split(" ")[0]) {
        index = i;
      };
    };
    if (typeof index !== "undefined") {
      sheet.switch(index);
    } else {
      if (hardCodedCharacters.single()[characterParameter]) {
        sheet.addCharacter(hardCodedCharacters.single()[characterParameter]);
      } else {
        snack.render("No character with that name.", false);
      };
    };
  }

  // exposed methods
  return {
    render: render,
    checkHttps: checkHttps,
  };

})();

var classes = (function() {

  function _total(classObjects, key) {
    var currentTotal = 0;
    for (var i = 0; i < classObjects.length; i++) {
      currentTotal = currentTotal + classObjects[i][key];
    };
    return parseInt(currentTotal, 10);
  };

  function _makeBaseAttackBonuses(totalBab) {
    var allBab = [];
    if (totalBab < 100) {
      if (totalBab >= 5) {
        while (totalBab > 0) {
          allBab.push("+" + totalBab);
          totalBab = totalBab - 5;
        };
      } else {
        if (totalBab > 0) {
          allBab.push("+" + totalBab);
        } else {
          allBab.push(totalBab);
        };
      };
    } else {
      allBab.push("BAB exceeds maximum calculation");
    };
    if (allBab.length > 1) {
      allBab = allBab.join(" / ");
    } else {
      allBab = allBab[0];
    };
    return allBab;
  };

  function delayUpdate(element) {
    render();
    textBlock.render();
    totalBlock.render();
  };

  var delayUpdateTimer = null;

  function bind(inputBlock) {
    var input = inputBlock.querySelector(".js-input-block-field");
    if (input) {
      input.addEventListener("input", function() {
        clearTimeout(delayUpdateTimer);
        delayUpdateTimer = setTimeout(delayUpdate, 300, this);
      }, false);
    };
  };

  function render() {
    var all_classes = helper.getObject(sheet.getCharacter(), "basics.classes");
    var totalLevels = _total(all_classes, "level");
    var totalHP = _total(all_classes, "hp") + (totalLevels * stats.getMod("con"));
    var totalBab = _total(all_classes, "bab");
    var totalRanks = _total(all_classes, "ranks") + (totalLevels * stats.getMod("int"));
    var totalFortitude = _total(all_classes, "fortitude");
    var totalReflex = _total(all_classes, "reflex");
    var totalWill = _total(all_classes, "will");
    var baseAttackBonuses = _makeBaseAttackBonuses(totalBab);
    helper.setObject(sheet.getCharacter(), "basics.level", totalLevels);
    helper.setObject(sheet.getCharacter(), "defense.hp.total", totalHP);
    helper.setObject(sheet.getCharacter(), "offense.base_attack", totalBab);
    helper.setObject(sheet.getCharacter(), "offense.base_attack_bonuses", baseAttackBonuses);
    helper.setObject(sheet.getCharacter(), "skills.ranks.total", totalRanks);
    helper.setObject(sheet.getCharacter(), "defense.fortitude.base", totalFortitude);
    helper.setObject(sheet.getCharacter(), "defense.reflex.base", totalReflex);
    helper.setObject(sheet.getCharacter(), "defense.will.base", totalWill);
  };

  function _get_allClassLevel(characterObject) {
    var classAndLevel = "";
    var classes = characterObject.basics.classes;
    for (var i = 0; i < classes.length; i++) {
      var classname = classes[i].classname || "No class";
      var level = classes[i].level || "No level";
      classAndLevel = classAndLevel + classname + " " + level;
      if (i < (classes.length - 1)) {
        classAndLevel = classAndLevel + " / ";
      };
    };
    return classAndLevel;
  };

  // exposed methods
  return {
    bind: bind,
    render: render,
    getClassLevel: _get_allClassLevel
  };

})();

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
        '    <div class="m-edit-box-item m-edit-box-group">' +
        '      <div class="m-edit-box-item-large">' +
        '        <div class="m-input-block js-input-block js-basics-class-level" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <label class="m-input-block-label js-input-block-label" for="class-classname-' + cloneIndex + '">Class Name</label>' +
        '          <input id="class-classname-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field" data-path="basics.classes" data-path-clone-key="classname" type="text" tabindex="1">' +
        '        </div>' +
        '      </div>' +
        '      <div class="m-edit-box-item-small">' +
        '        <div class="m-input-block js-input-block js-basics-class-level" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <label class="m-input-block-label js-input-block-label" for="class-level-' + cloneIndex + '">Levels</label>' +
        '          <input id="class-level-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field js-tip" data-path="basics.classes" data-path-clone-key="level" data-type="integer" data-clone="true" data-tip-show-on="focus" data-tip-message="Total number of Levels in this Class." type="text" tabindex="1">' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '    <div class="m-edit-box-item m-edit-box-group">' +
        '      <div class="m-edit-box-item-medium">' +
        '        <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <label class="m-input-block-label js-input-block-label" for="class-hp-' + cloneIndex + '">HP</label>' +
        '          <input id="class-hp-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field js-tip" data-path="basics.classes" data-path-clone-key="hp" data-type="integer" data-clone="true" data-tip-show-on="focus" data-tip-message="HP for all Levels in this Class, including favored class bonuses. CON bonuses will be automatically added." type="text" tabindex="1">' +
        '        </div>' +
        '      </div>' +
        '      <div class="m-edit-box-item-medium">' +
        '        <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <label class="m-input-block-label js-input-block-label" for="class-bab-' + cloneIndex + '">BAB</label>' +
        '          <input id="class-bab-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field js-tip" data-path="basics.classes" data-path-clone-key="bab" data-type="integer" data-clone="true" data-tip-show-on="focus" data-tip-message="The highest BAB for this Class. Additional attacks will be automatically added." type="text" tabindex="1">' +
        '        </div>' +
        '      </div>' +
        '      <div class="m-edit-box-item-medium">' +
        '        <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <label class="m-input-block-label js-input-block-label" for="class-ranks-' + cloneIndex + '">Ranks</label>' +
        '          <input id="class-ranks-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field js-tip" data-path="basics.classes" data-path-clone-key="ranks" data-type="integer" data-clone="true" data-tip-show-on="focus" data-tip-message="Skill Ranks for all Levels in this Class, including favored class bonuses. INT bonuses will be automatically added." type="text" tabindex="1">' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '    <div class="m-edit-box-item m-edit-box-group">' +
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
        '    <div class="m-edit-box-content m-edit-box-content-outline m-edit-box-content-margin-large">' +
        '      <div class="m-edit-box-item-max m-edit-box-group">' +
        '        <div class="m-edit-box-item-large">' +
        '          <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '            <label class="m-input-block-label js-input-block-label" for="consumable-item-' + cloneIndex + '">Consumables</label>' +
        '            <input id="consumable-item-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field" data-path="equipment.consumable" data-path-clone-key="item" type="text" tabindex="1">' +
        '          </div>' +
        '        </div>' +
        '        <div class="m-edit-box-item-total">' +
        '          <p class="m-edit-box-label">Remaining</p>' +
        '          <p class="m-edit-box-total js-total-block-total">0</p>' +
        '        </div>' +
        '      </div>' +
        '      <div class="m-edit-box-item m-edit-box-group-control-set">' +
        '        <div class="m-edit-box-item-button-large">' +
        '          <a href="javascript:void(0)" class="u-inline-with-input u-no-margin button button-large button-icon button-thin js-input-block-increment" data-clone="true" data-clone-count="' + cloneIndex + '" data-path-clone-key="total" data-increment-target="consumable-total-' + cloneIndex + '" data-increment="subtraction" tabindex="1"><span class="icon-remove"></span></a>' +
        '        </div>' +
        '        <div class="m-edit-box-item-large">' +
        '          <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '            <label class="m-input-block-label js-input-block-label" for="consumable-total-' + cloneIndex + '">Total</label>' +
        '            <input id="consumable-total-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field" data-path="equipment.consumable" data-path-clone-key="total" data-type="integer" data-minimum="0" type="text" tabindex="1">' +
        '          </div>' +
        '        </div>' +
        '        <div class="m-edit-box-item-button-large">' +
        '          <a href="javascript:void(0)" class="u-inline-with-input u-no-margin button button-large button-icon button-thin js-input-block-increment" data-clone="true" data-clone-count="' + cloneIndex + '" data-path-clone-key="total" data-increment-target="consumable-total-' + cloneIndex + '" data-increment="addition" tabindex="1"><span class="icon-add"></span></a>' +
        '        </div>' +
        '        <div class="m-edit-box-item-button-large">' +
        '          <a href="javascript:void(0)" class="u-inline-with-input u-no-margin button button-large button-icon button-thin js-input-block-increment" data-clone="true" data-clone-count="' + cloneIndex + '" data-path-clone-key="total" data-increment-target="consumable-total-' + cloneIndex + '" data-increment="clear" tabindex="1"><span class="icon-close"></span></a>' +
        '        </div>' +
        '      </div>' +
        '      <div class="m-edit-box-item m-edit-box-group-control-set">' +
        '        <div class="m-edit-box-item-button-large">' +
        '          <a href="javascript:void(0)" class="u-inline-with-input u-no-margin button button-large button-icon button-thin js-input-block-increment" data-clone="true" data-clone-count="' + cloneIndex + '" data-path-clone-key="used" data-increment-target="consumable-used-' + cloneIndex + '" data-increment="subtraction" tabindex="1"><span class="icon-remove"></span></a>' +
        '        </div>' +
        '        <div class="m-edit-box-item-large">' +
        '          <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '            <label class="m-input-block-label js-input-block-label" for="consumable-used-' + cloneIndex + '">Used</label>' +
        '            <input id="consumable-used-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field" data-total="subtract" data-path="equipment.consumable" data-path-clone-key="used" data-type="integer" data-minimum="0" type="text" tabindex="1">' +
        '          </div>' +
        '        </div>' +
        '        <div class="m-edit-box-item-button-large">' +
        '          <a href="javascript:void(0)" class="u-inline-with-input u-no-margin button button-large button-icon button-thin js-input-block-increment" data-clone="true" data-clone-count="' + cloneIndex + '" data-path-clone-key="used" data-increment-target="consumable-used-' + cloneIndex + '" data-increment="addition" tabindex="1"><span class="icon-add"></span></a>' +
        '        </div>' +
        '        <div class="m-edit-box-item-button-large">' +
        '          <a href="javascript:void(0)" class="u-inline-with-input u-no-margin button button-large button-icon button-thin js-input-block-increment" data-clone="true" data-clone-count="' + cloneIndex + '" data-path-clone-key="used" data-increment-target="consumable-used-' + cloneIndex + '" data-increment="clear" tabindex="1"><span class="icon-close"></span></a>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>' +
        '<div class="m-clone-block-delete-controls">' +
        '  <button class="button button-icon button-large button-primary js-clone-block-delete" tabindex="-1"><span class="icon-close"></span></button>' +
        '</div>'
    };
    if (cloneType == "item") {
      cloneString =
        '<div class="m-clone-block-content js-clone-block-content">' +
        '  <div class="m-edit-box-content m-edit-box-content-margin-small">' +
        '    <div class="m-edit-box-item m-edit-box-group">' +
        '      <div class="m-edit-box-item-max">' +
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
        '  <div class="m-skill js-total-block" data-total-path="skills.custom" data-total-path-addition="ranks,misc" data-total-bonuses="true" data-total-bonuses="true" data-total-bonuses-include="str_bonus,dex_bonus,con_bonus,int_bonus,wis_bonus,cha_bonus,class_skill,level,half_level,check_penalty" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '    <div class="m-edit-box m-edit-box-indent m-edit-box-head-large m-edit-box-guides">' +
        '      <div class="m-edit-box-head">' +
        '        <div class="m-skill-name m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <input class="m-input-block-field u-full-width u-no-margin js-input-block-field" data-path="skills.custom" data-path-clone-key="name" type="text" tabindex="1" placeholder="Custom skill">' +
        '        </div>' +
        '      </div>' +
        '      <div class="m-edit-box-body">' +
        '        <div class="m-edit-box-content">' +
        '          <div class="m-edit-box-item m-edit-box-group">' +
        '            <div class="m-edit-box-item-total">' +
        '              <p class="m-edit-box-label hidden-sm hidden-md hidden-lg hidden-xl u-text-center">Total</p>' +
        '              <p class="m-edit-box-total js-total-block-total">0</p>' +
        '            </div>' +
        '            <div class="m-edit-box-item-small m-edit-box-item-grow">' +
        '              <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '                <p class="m-edit-box-label hidden-sm hidden-md hidden-lg hidden-xl u-text-center">Ranks</p>' +
        '                <input class="m-input-block-field u-full-width u-text-center js-input-block-field js-input-block-field-ranks" data-path="skills.custom" data-path-clone-key="ranks" data-type="integer" type="text" tabindex="1">' +
        '              </div>' +
        '            </div>' +
        '            <div class="m-edit-box-item-small m-edit-box-item-grow">' +
        '              <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '                <p class="m-edit-box-label hidden-sm hidden-md hidden-lg hidden-xl u-text-center">Misc</p>' +
        '                <input class="m-input-block-field u-full-width u-text-center js-input-block-field" data-path="skills.custom" data-path-clone-key="misc" data-type="integer" type="text" tabindex="1">' +
        '              </div>' +
        '            </div>' +
        '            <div class="m-edit-box-item-check">' +
        '              <div class="m-check-block">' +
        '                <p class="m-edit-box-label hidden-sm hidden-md hidden-lg hidden-xl u-text-center">Class Skill</p>' +
        '                <input class="m-check-block-check js-total-block-bonus-check" data-path="skills.custom" data-path-array="true" data-bonus-type="class-skill" type="checkbox" tabindex="1">' +
        '                <span class="m-check-block-check-icon"></span>' +
        '              </div>' +
        '            </div>' +
        '            <div class="m-edit-box-item-button-small">' +
        '              <a href="javascript:void(0)" class="u-inline-with-input u-no-margin button button-secondary button-large button-icon button-thin js-total-block-bonuses" data-clone="true" data-modal-heading="Custom Skill bonuses" tabindex="1"><span class="icon-more-vertical"></span></a>' +
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
        '    <div class="m-edit-box-item m-edit-box-group">' +
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
        '    </div>' +
        '    <div class="m-edit-box-item m-edit-box-group">' +
        '      <div class="m-edit-box-item-medium">' +
        '        <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <label class="m-input-block-label js-input-block-label" for="attack-melee-critical-' + cloneIndex + '">Critical</label>' +
        '          <input id="attack-melee-critical-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field" data-path="offense.attack.melee" data-path-clone-key="critical" type="text" tabindex="1">' +
        '        </div>' +
        '      </div>' +
        '      <div class="m-edit-box-item-medium">' +
        '        <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <label class="m-input-block-label js-input-block-label" for="attack-melee-type-' + cloneIndex + '">Type</label>' +
        '          <input id="attack-melee-type-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field" data-path="offense.attack.melee" data-path-clone-key="type" type="text" tabindex="1">' +
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
        '    <div class="m-edit-box-item m-edit-box-group">' +
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
        '    <div class="m-edit-box-item m-edit-box-group">' +
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
        '    </div>' +
        '    <div class="m-edit-box-item m-edit-box-group">' +
        '      <div class="m-edit-box-item-medium">' +
        '        <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <label class="m-input-block-label js-input-block-label" for="attack-ranged-ammo-' + cloneIndex + '">Ammo</label>' +
        '          <input id="attack-ranged-ammo-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field" data-path="offense.attack.ranged" data-path-clone-key="ammo" type="text" tabindex="1">' +
        '        </div>' +
        '      </div>' +
        '      <div class="m-edit-box-item-medium">' +
        '        <div class="m-input-block js-input-block" data-clone="true" data-clone-count="' + cloneIndex + '">' +
        '          <label class="m-input-block-label js-input-block-label" for="attack-ranged-type-' + cloneIndex + '">Type</label>' +
        '          <input id="attack-ranged-type-' + cloneIndex + '" class="m-input-block-field u-full-width js-input-block-field" data-path="offense.attack.ranged" data-path-clone-key="type" type="text" tabindex="1">' +
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
        critical: "",
        type: ""
      };
    };
    if (cloneType == "attack-ranged") {
      object = {
        weapon: "",
        attack: "",
        damage: "",
        critical: "",
        range: "",
        ammo: "",
        type: ""
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
      _bind_inputBlockIncrement(newClone.querySelectorAll(".js-input-block-increment"));
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

  function _add_cloneObject(cloneType) {
    if (_get_cloneCount(cloneType) < 200) {
      _get_cloneObjects(cloneType).push(new _get_newCloneObject(cloneType));
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

  function _render_all_clones(cloneType) {
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
      helper.removeClass(cloneRemoveButton, "button-primary");
      helper.addClass(cloneRemoveButton, "button-secondary");
    };
  };

  function _update_all_clones(cloneType) {
    var target = _get_cloneTarget(cloneType);
    if (cloneType == "class") {
      var all_inputBlocks = target.querySelectorAll(".js-input-block");
      for (var i = 0; i < all_inputBlocks.length; i++) {
        inputBlock.render(all_inputBlocks[i]);
      };
      classes.render();
    };
    if (cloneType == "consumable" || cloneType == "item" || cloneType == "skill" || cloneType == "attack-melee" || cloneType == "attack-ranged") {
      var all_inputBlocks = target.querySelectorAll(".js-input-block");
      for (var i = 0; i < all_inputBlocks.length; i++) {
        inputBlock.render(all_inputBlocks[i]);
      };
    };
    if (cloneType == "note-story" || cloneType == "note-character") {
      var all_textareaBlock = target.querySelectorAll(".js-textarea-block");
      for (var i = 0; i < all_textareaBlock.length; i++) {
        textareaBlock.render(all_textareaBlock[i]);
      };
    };
  };

  function _remove_clone(button, cloneType) {
    var cloneIndex = parseInt(helper.getClosest(button, ".js-clone").dataset.cloneCount, 10);
    _remove_cloneObject(cloneType, cloneIndex);
    clear(cloneType);
    _render_all_clones(cloneType);
    _update_all_clones(cloneType);
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
    _update_all_clones(undoData.cloneType);
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

  function _bind_inputBlockIncrement(all_inputBlockIncrement) {
    for (var i = 0; i < all_inputBlockIncrement.length; i++) {
      inputBlock.bind_inputBlockIncrement(all_inputBlockIncrement[i]);
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

var display = (function() {

  function bind() {
    _bind_fab();
  };

  function _bind_fab() {
    var fabButton = helper.e(".js-fab-button");
    fabButton.addEventListener("click", function() {
      totalBlock.render();
      clear();
      render();
      toggle();
      themeColor.update();
    }, false);
  };

  function update() {
    _update_displayState();
    _update_displayPlaceholder();
  };

  function _update_displayState() {
    var quickNav = helper.e(".js-quick-nav");
    var fab = helper.e(".js-fab");
    var fabButton = helper.e(".js-fab-button");
    var fabIcon = helper.e(".js-fab-icon");
    var all_section = helper.eA(".js-section");
    var anySectionDisplay = false;
    var allSectionDisplay = 0;
    var _displayOn = function() {
      helper.addClass(fabIcon, "icon-edit");
      helper.removeClass(fabIcon, "icon-reader-mode");
      helper.removeClass(fabButton, "button-primary");
      helper.addClass(fabButton, "button-secondary");
      helper.addClass(quickNav, "is-display-mode");
    };
    var _displayOff = function() {
      helper.removeClass(fabIcon, "icon-edit");
      helper.addClass(fabIcon, "icon-reader-mode");
      helper.addClass(fabButton, "button-primary");
      helper.removeClass(fabButton, "button-secondary");
      helper.removeClass(quickNav, "is-display-mode");
    };
    for (var i = 0; i < all_section.length; i++) {
      if (all_section[i].dataset.displayMode == "true") {
        anySectionDisplay = true;
        allSectionDisplay++;
      };
    };
    if (anySectionDisplay) {
      if (allSectionDisplay == all_section.length) {
        fab.dataset.displayMode = true;
        fab.dataset.displayModeAll = true;
        _displayOn();
      } else {
        fab.dataset.displayMode = true;
        fab.dataset.displayModeAll = false;
        _displayOff();
      };
    } else {
      fab.dataset.displayMode = false;
      fab.dataset.displayModeAll = false;
      _displayOff();
    };
  };

  function _toggle_section(element, forceToggle) {
    var icon = element.querySelector(".js-card-toggle-icon");
    var section = helper.getClosest(element, ".js-section");
    var minimise = (section.dataset.minimise == "true");
    var edit = section.querySelector(".js-edit");
    var cardTabs = section.querySelector(".js-card-tabs");
    var all_display = section.querySelectorAll(".js-display");

    var _displayOn = function() {
      section.dataset.displayMode = "true";
      helper.addClass(section, "is-display-mode");
      helper.addClass(edit, "is-hidden");
      if (cardTabs && !minimise) {
        helper.addClass(cardTabs, "is-hidden");
      };
      for (var i = 0; i < all_display.length; i++) {
        helper.removeClass(all_display[i], "is-hidden");
      };
      helper.addClass(icon, "icon-edit");
      helper.removeClass(icon, "icon-reader-mode");
    };

    var _displayOff = function() {
      section.dataset.displayMode = "false";
      helper.removeClass(section, "is-display-mode");
      helper.removeClass(edit, "is-hidden");
      if (cardTabs && !minimise) {
        helper.removeClass(cardTabs, "is-hidden");
      };
      for (var i = 0; i < all_display.length; i++) {
        helper.addClass(all_display[i], "is-hidden");
      };
      helper.removeClass(icon, "icon-edit");
      helper.addClass(icon, "icon-reader-mode");
    };

    if (forceToggle == true) {
      _displayOn();
    } else if (forceToggle == false) {
      _displayOff();
    } else {
      if (section.dataset.displayMode == "true") {
        _displayOff();
      } else if (section.dataset.displayMode == "false" || !section.dataset.displayMode) {
        _displayOn();
      };
    };

  };

  function _toggle_all_section() {
    var fab = helper.e(".js-fab");
    var all_section = helper.eA(".js-section");
    if (fab.dataset.displayMode == "true") {
      fab.dataset.displayMode = "false";
      for (var i = 0; i < all_section.length; i++) {
        _toggle_section(all_section[i], false);
      };
    } else if (fab.dataset.displayMode == "false" || !fab.dataset.displayMode) {
      fab.dataset.displayMode = "true";
      for (var i = 0; i < all_section.length; i++) {
        _toggle_section(all_section[i], true);
      };
    };
    update();
  };

  function toggle(section, boolean) {
    if (section) {
      _toggle_section(section, boolean);
    } else {
      _toggle_all_section();
    };
  };

  function clear(section) {
    var _removeAllChildren = function(parent) {
      while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
      };
    };
    if (section) {
      var all_target = section.querySelectorAll(".js-display-block-target");
    } else {
      var all_target = helper.eA(".js-display-block-target");
    };
    for (var i = 0; i < all_target.length; i++) {
      var displayBlock = helper.getClosest(all_target[i], ".js-display-block");
      displayBlock.dataset.displayContent = false;
      _removeAllChildren(all_target[i]);
    };
  };

  function _get_all_spell(all_displayPath) {
    var all_node = [];
    for (var i = 0; i < all_displayPath.length; i++) {
      var bookPath = all_displayPath[i].split(".");
      var all_spells = sheet.getCharacter()[bookPath[0]][bookPath[1]][bookPath[2]]["level_" + bookPath[2]];
      if (all_spells.length == 0) {
        all_node.push(false);
      } else {
        for (var j = 0; j < all_spells.length; j++) {
          var spell = all_spells[j];
          all_node.push(_get_spell(spell, bookPath[2], j));
        };
      };
    };
    return all_node;
  };

  function _get_spell(spell, level, index) {
    var displayListItem = document.createElement("li");
    displayListItem.setAttribute("class", "m-display-list-item m-display-list-item-spell");
    var displayListItemPrefix = document.createElement("span");
    displayListItemPrefix.setAttribute("class", "m-display-list-item-spell-name");
    var spellName = document.createElement("span");
    spellName.textContent = spell.name;
    var displayListItemValue = document.createElement("span");
    displayListItemValue.setAttribute("class", "m-display-list-item-spell-count");
    displayListItemPrefix.appendChild(spellName);
    displayListItem.appendChild(displayListItemPrefix);
    displayListItem.appendChild(displayListItemValue);
    displayListItem.setAttribute("data-spell-level", level);
    displayListItem.setAttribute("data-spell-count", index);
    // prepared
    if (spell.prepared > 0) {
      // var marks = document.createElement("span");
      for (var j = 0; j < spell.prepared; j++) {
        var preparedIcon = document.createElement("span");
        preparedIcon.setAttribute("class", "icon-radio-button-checked");
        displayListItemValue.insertBefore(preparedIcon, displayListItemValue.firstChild);
      };
    };
    // cast
    if (spell.cast > 0) {
      var all_check = displayListItemValue.querySelectorAll(".icon-radio-button-checked");
      for (var j = 0; j < spell.cast; j++) {
        if (all_check[j]) {
          helper.toggleClass(all_check[j], "icon-radio-button-checked");
          helper.toggleClass(all_check[j], "icon-radio-button-unchecked");
        };
      };
    };
    // active
    if (spell.active) {
      var spellActive = document.createElement("span");
      spellActive.setAttribute("class", "m-display-list-item-spell-active");
      var activeIcon = document.createElement("span");
      activeIcon.setAttribute("class", "icon-play-arrow");
      spellActive.appendChild(activeIcon);
      spellName.insertBefore(spellActive, spellName.firstChild);
    };
    displayListItem.addEventListener("click", function() {
      spells.update(helper.e(".js-spell-book-known-level-" + level).querySelectorAll(".js-spell-col")[index].querySelector(".js-spell"), true);
    }, false);
    return displayListItem;
  };

  function _get_all_skill(all_displayPath, displayPrefix) {
    var all_node = [];
    for (var i = 0; i < all_displayPath.length; i++) {
      var path = all_displayPath[i];
      var prefix = displayPrefix[i];
      all_node.push(_get_skill(path, prefix));
    };
    return all_node;
  };

  function _get_skill(path, prefix) {
    var object = helper.getObject(sheet.getCharacter(), path);
    var displayListItem;
    if (typeof object != "undefined" && object != "") {

      if (object.ranks != "undefined" && object.ranks != "") {
        displayListItem = document.createElement("li");
        displayListItem.setAttribute("class", "m-display-list-item");
        var value = document.createElement("span");
        value.setAttribute("class", "m-display-list-item-value");
        value.textContent = "+" + object.current;
        if (prefix || object["name"] || object["variant_name"]) {
          var displayListItemPrefix = document.createElement("span");
          displayListItemPrefix.setAttribute("class", "m-display-list-item-prefix");
          if (object["name"]) {
            displayListItemPrefix.textContent = object["name"] + " ";
          } else if (object["variant_name"]) {
            displayListItemPrefix.textContent = object["variant_name"] + " ";
          } else {
            displayListItemPrefix.textContent = prefix;
          };
          displayListItem.appendChild(displayListItemPrefix);
        };
        displayListItem.appendChild(value);
      } else {
        displayListItem = false;
      };

    };
    return displayListItem;
  };

  function _get_all_clone(all_displayPath) {
    var all_node = [];

    for (var i = 0; i < all_displayPath.length; i++) {
      var all_clones = helper.getObject(sheet.getCharacter(), all_displayPath[i]);
      if (all_clones.length == 0) {
        all_node.push(false);
      } else {
        for (var j = 0; j < all_clones.length; j++) {
          var cloneType;
          if (all_displayPath[i] == "basics.classes") {
            cloneType = "class";
          };
          if (all_displayPath[i] == "equipment.consumable") {
            cloneType = "consumable";
          };
          if (all_displayPath[i] == "equipment.item") {
            cloneType = "item";
          };
          if (all_displayPath[i] == "skills.custom") {
            cloneType = "skill";
          };
          if (all_displayPath[i] == "offense.attack.melee") {
            cloneType = "attack-melee";
          };
          if (all_displayPath[i] == "offense.attack.ranged") {
            cloneType = "attack-ranged";
          };
          if (all_displayPath[i] == "notes.character") {
            cloneType = "note-character";
          };
          if (all_displayPath[i] == "notes.story") {
            cloneType = "note-story";
          };
          all_node.push(_get_clone(all_clones[j], cloneType));
        };
      };
    };
    return all_node;
  };

  function _get_clone(object, cloneType) {
    var _get_cloneItem = function(object, cloneType) {
      var displayListItem;

      if (cloneType == "class") {
        displayListItem = document.createElement("span");
        displayListItem.setAttribute("class", "m-display-item-text-snippet");
        for (var i in object) {
          if (i == "classname") {
            var data = object[i];
            if (typeof data != "undefined" && data != "") {
              var displayListItemPrefix = document.createElement("span");
              displayListItemPrefix.setAttribute("class", "m-display-item-text-snippet-prefix");
              displayListItemPrefix.textContent = data;
              displayListItem.appendChild(displayListItemPrefix);
            };
          } else if (i == "level") {
            var data = object[i];
            if (typeof data != "undefined" && data != "" || data == 0) {
              var displayListItemValue = document.createElement("span");
              displayListItemValue.setAttribute("class", "m-display-item-text-snippet-value");
              displayListItemValue.textContent = data;
              displayListItem.appendChild(displayListItemValue);
            };
          };
        };
      };

      if (cloneType == "consumable") {
        displayListItem = document.createElement("li");
        displayListItem.setAttribute("class", "m-display-list-item");
        for (var i in object) {
          if (i == "item") {
            var data = object[i];
            if (typeof data != "undefined" && data != "") {
              var displayListItemPrefix = document.createElement("span");
              displayListItemPrefix.setAttribute("class", "m-display-list-item-prefix");
              displayListItemPrefix.textContent = data;
              displayListItem.appendChild(displayListItemPrefix);
            };
          } else if (i == "current") {
            var data = object[i];
            if (typeof data != "undefined" && data != "" || data == 0) {
              var displayListItemValue = document.createElement("span");
              displayListItemValue.setAttribute("class", "m-display-list-item-value");
              if (typeof object.total != "undefined" && object.total != "") {
                data = data + "/" + object.total;
              };
              displayListItemValue.textContent = data;
              displayListItem.appendChild(displayListItemValue);
            };
          };
        };
        var percentage = parseFloat(((object.total - object.used) / object.total) * 100).toFixed(2);
        if (percentage < 0) {
          percentage = 0;
        };
        var percentageBar = document.createElement("span");
        percentageBar.setAttribute("class", "m-display-list-item-percentage");
        percentageBar.setAttribute("style", "width: " + percentage + "%;");
        displayListItem.appendChild(percentageBar);
        // console.log(object.item, object.total, object.used, percentage);
      };

      if (cloneType == "item") {
        displayListItem = document.createElement("li");
        displayListItem.setAttribute("class", "m-display-list-item");
        for (var i in object) {
          if (i == "name") {
            var data = object[i];
            if (typeof data != "undefined" && data != "") {
              var displayListItemPrefix = document.createElement("span");
              displayListItemPrefix.setAttribute("class", "m-display-list-item-prefix");
              displayListItemPrefix.textContent = data;
              displayListItem.appendChild(displayListItemPrefix);
            };
          } else if (i == "quantity") {
            var data = object[i];
            if (typeof data != "undefined" && data != "" || data == 0) {
              var displayListItemValue = document.createElement("span");
              displayListItemValue.setAttribute("class", "m-display-list-item-value");
              displayListItemValue.textContent = data;
              displayListItem.appendChild(displayListItemValue);
            };
          };
        };
      };

      if (cloneType == "skill") {
        if (object.ranks != "undefined" && object.ranks != "") {
          displayListItem = document.createElement("li");
          displayListItem.setAttribute("class", "m-display-list-item");
          var displayListItemValue = document.createElement("span");
          displayListItemValue.setAttribute("class", "m-display-list-item-value");
          displayListItemValue.textContent = "+" + object.current;
          if (object["name"]) {
            var displayListItemPrefix = document.createElement("span");
            displayListItemPrefix.setAttribute("class", "m-display-list-item-prefix");
            displayListItemPrefix.textContent = object["name"];
          } else {
            displayListItemPrefix.textContent = "Custom Skill";
          };
          displayListItem.appendChild(displayListItemPrefix);
          displayListItem.appendChild(displayListItemValue);
        } else {
          displayListItem = false;
        };
      };

      if (cloneType == "attack-melee" || cloneType == "attack-ranged") {
        displayListItem = document.createElement("li");
        displayListItem.setAttribute("class", "m-display-list-item-" + cloneType);
        for (var i in object) {
          if (i == "weapon" || i == "damage" || i == "critical" || i == "range" || i == "type" || i == "ammo") {
            var data = object[i];
            if (typeof data != "undefined" && data != "") {
              var displayListItemPrefix = document.createElement("span");
              displayListItemPrefix.setAttribute("class", "m-display-list-item-" + cloneType + "-" + i);
              displayListItemPrefix.textContent = data;
              displayListItem.appendChild(displayListItemPrefix);
            };
          } else if (i == "attack") {
            var data = object[i];
            if (typeof data != "undefined" && data != "") {
              var displayListItemValue = document.createElement("h2");
              displayListItemValue.setAttribute("class", "m-display-list-item-" + cloneType + "-" + i);
              displayListItemValue.textContent = data;
              displayListItem.appendChild(displayListItemValue);
            };
          };
        };
      };

      if (cloneType == "note-character" || cloneType == "note-story") {
        displayListItem = document.createElement("li");
        displayListItem.setAttribute("class", "m-display-list-item");
        for (var i in object) {
          var data = object[i];
          if (typeof data != "undefined" && data != "") {
            displayListItem.innerHTML = data;
          };
        };
      };

      return displayListItem;
    };

    for (var i in object) {
      var testForValues = false;
      for (var j in object[i]) {
        if (typeof object[i][j] != "undefined" && object[i][j] != "") {
          testForValues = true;
        };
      };
      if (testForValues) {
        return _get_cloneItem(object, cloneType);
      } else {
        return false;
      };
    };

  };

  function _get_all_list(all_displayPath, all_displayPrefix, all_displaySuffix, all_displayValueType) {
    var all_node = [];
    for (var i = 0; i < all_displayPath.length; i++) {
      var path = all_displayPath[i];
      var prefix = false;
      var suffix = false;
      var valueType = false;
      if (all_displayPrefix[i]) {
        prefix = all_displayPrefix[i];
      };
      if (all_displaySuffix[i]) {
        suffix = all_displaySuffix[i];
      };
      if (all_displayValueType[i]) {
        valueType = all_displayValueType[i];
      };
      all_node.push(_get_list(path, prefix, suffix, valueType));
    };
    return all_node;
  };

  function _get_list(path, prefix, suffix, valueType) {
    var data = helper.getObject(sheet.getCharacter(), path);
    var displayListItem;
    if (typeof data != "undefined" && data != "") {
      if (valueType == "bonus" && data > 0) {
        data = "+" + data;
      };
      displayListItem = document.createElement("li");
      displayListItem.setAttribute("class", "m-display-list-item");
      var displayListItemvalue = document.createElement("span");
      displayListItemvalue.setAttribute("class", "m-display-list-item-value");
      displayListItemvalue.textContent = data;
      if (prefix) {
        var displayListItemPrefix = document.createElement("span");
        displayListItemPrefix.setAttribute("class", "m-display-list-item-prefix");
        displayListItemPrefix.textContent = prefix;
        displayListItem.appendChild(displayListItemPrefix);
      };
      displayListItem.appendChild(displayListItemvalue);
      if (suffix) {
        var displayListItemSuffix = document.createElement("span");
        displayListItemSuffix.setAttribute("class", "m-display-list-item-suffix");
        displayListItemSuffix.textContent = prefix;
        displayListItem.appendChild(displayListItemSuffix);
      };
    } else {
      displayListItem = false;
    };
    return displayListItem;
  };

  function _get_all_modifier(all_displayPath, all_displayValueType) {
    var all_node = [];
    for (var i = 0; i < all_displayPath.length; i++) {
      var path = all_displayPath[i];
      all_node.push(_get_modifier(path, all_displayValueType));
    };
    return all_node;
  };

  function _get_modifier(path, all_displayValueType) {
    var displayItem;
    var data;
    var modifierPath = path.split(".");
    if (sheet.getCharacter()[modifierPath[0]][modifierPath[1]][modifierPath[2]].temp_modifier) {
      data = sheet.getCharacter()[modifierPath[0]][modifierPath[1]][modifierPath[2]].temp_modifier;
    } else {
      data = helper.getObject(sheet.getCharacter(), path);
    };
    if (typeof data != "undefined" && data != "") {
      displayItem = document.createElement("span");
      if (all_displayValueType) {
        if (all_displayValueType == "bonus" && data > 0) {
          data = "+" + data;
        };
      };
      displayItem.textContent = data;
    } else if (typeof data == "number" && data == 0) {
      displayItem = document.createElement("span");
      displayItem.textContent = data;
    } else {
      displayItem = false;
    };
    return displayItem;
  };

  function _get_all_stat(all_displayPath) {
    var all_node = [];
    for (var i = 0; i < all_displayPath.length; i++) {
      var path = all_displayPath[i];
      all_node.push(_get_stat(path));
    };
    return all_node;
  };

  function _get_stat(path) {
    var displayItem;
    var data;
    var statPath = path.split(".");
    if (sheet.getCharacter()[statPath[0]][statPath[1]][statPath[2]].temp_score) {
      data = sheet.getCharacter()[statPath[0]][statPath[1]][statPath[2]].temp_score
    } else {
      data = helper.getObject(sheet.getCharacter(), path);
    };
    if (typeof data != "undefined" && data != "") {
      displayItem = document.createElement("span");
      displayItem.textContent = data;
    } else if (typeof data == "number" && data == 0) {
      var displayItem = document.createElement("span");
      displayItem.textContent = data;
    } else {
      displayItem = false;
    };
    return displayItem;
  };

  function _get_all_textBlock(all_displayPath) {
    var all_node = [];
    for (var i = 0; i < all_displayPath.length; i++) {
      var path = all_displayPath[i];
      all_node.push(_get_textBlock(path));
    };
    return all_node;
  };

  function _get_textBlock(path, target) {
    var data = helper.getObject(sheet.getCharacter(), path);
    var displayItem;
    if (typeof data != "undefined" && data != "") {
      displayItem = document.createElement("span");
      displayItem.setAttribute("class", "m-display-item-text-block");
      var value = document.createElement("span");
      value.setAttribute("class", "m-display-item-text-block-value");
      value.innerHTML = data;
      displayItem.appendChild(value);
    } else {
      displayItem = false;
    };
    return displayItem;
  };

  function _get_all_textSnippet(all_displayPath, all_displayPrefix, all_displaySuffix, all_displayDependency, all_displayValueType) {
    var all_node = [];
    for (var i = 0; i < all_displayPath.length; i++) {
      var path = all_displayPath[i];
      var dependency = false;
      var prefix = false;
      var suffix = false;
      var valueType = false;
      if (all_displayPrefix[i]) {
        prefix = all_displayPrefix[i];
      };
      if (all_displayDependency[i]) {
        dependency = all_displayDependency[i];
      };
      if (all_displaySuffix[i]) {
        suffix = all_displaySuffix[i];
      };
      if (all_displayValueType[i]) {
        valueType = all_displayValueType[i];
      };
      all_node.push(_get_textSnippet(path, prefix, suffix, dependency, valueType));
    };
    // console.log("all_node", all_node);
    return all_node;
  };

  function _get_textSnippet(path, prefix, suffix, dependency, valueType) {
    var data = helper.getObject(sheet.getCharacter(), path);
    var displayItem;
    if (typeof data != "undefined" && data != "") {
      displayItem = document.createElement("span");
      displayItem.setAttribute("class", "m-display-item-text-snippet");
      var value = document.createElement("span");
      value.setAttribute("class", "m-display-item-text-snippet-value");
      if (valueType == "bonus" && data > 0) {
        data = "+" + data;
      } else if (valueType == "currency" && data > 0) {
        data = parseFloat(data).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      } else if (valueType == "number" && data > 0) {
        data = parseFloat(data).toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        })
      };
      if (dependency) {
        data = data + " / " + helper.getObject(sheet.getCharacter(), dependency);
      };
      value.innerHTML = data;
      if (prefix) {
        var spanPrefix = document.createElement("span");
        spanPrefix.setAttribute("class", "m-display-item-text-snippet-prefix");
        spanPrefix.textContent = prefix;
        displayItem.appendChild(spanPrefix);
      };
      displayItem.appendChild(value);
      if (suffix) {
        var spanSuffix = document.createElement("span");
        spanSuffix.setAttribute("class", "m-display-item-text-snippet-suffix");
        spanSuffix.textContent = suffix;
        displayItem.appendChild(spanSuffix);
      };
    } else {
      displayItem = false;
    };
    // console.log(path, displayItem);
    return displayItem;
  };

  function _get_all_image(all_displayPath, all_displayScale, all_displayPosition, all_displayColor) {
    var all_node = [];
    var scale = false;
    var position = false;
    var color = false;
    for (var i = 0; i < all_displayPath.length; i++) {
      if (all_displayScale[i]) {
        scale = all_displayScale[i];
      };
      if (all_displayPosition[i]) {
        position = all_displayPosition[i];
      };
      if (all_displayColor[i]) {
        color = all_displayColor[i];
      };
      var path = all_displayPath[i];
      all_node.push(_get_image(path, scale, position, color));
    };
    // console.log("all_node", all_node);
    return all_node;
  };

  function _get_image(path, scale, position, color) {
    var data = helper.getObject(sheet.getCharacter(), path);
    var displayImage;
    if (typeof data != "undefined" && data != "") {
      var displayImage = document.createElement("div");
      displayImage.setAttribute("class", "m-display-item-image-wrapper");
      var displayImageItem = new Image;
      // displayImage.setAttribute("class", "m-character-image js-character-image");
      displayImageItem.setAttribute("class", "m-display-item-image");
      displayImageItem.src = data;
      if (scale) {
        var scale = helper.getObject(sheet.getCharacter(), scale);
      } else {
        scale = 1;
      };
      if (position) {
        var position = helper.getObject(sheet.getCharacter(), position);
      } else {
        position = {
          x: 0,
          y: 0
        };
      };
      if (color) {
        var background = helper.getObject(sheet.getCharacter(), "basics.character_image.background");
        var color;
        if (background == "black") {
          color = "rgb(0,0,0)";
        } else if (background == "white") {
          color = "rgb(255,255,255)";
        } else if (background == "average") {
          color = helper.getObject(sheet.getCharacter(), color);
          color = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
        };
      };
      displayImage.style.backgroundColor = color;
      displayImageItem.style.width = scale + "%";
      displayImageItem.style.left = position.x + "%";
      displayImageItem.style.top = position.y + "%";
      displayImage.appendChild(displayImageItem);
    } else {
      displayImage = false;
    };
    return displayImage;
  };

  function _render_displayBlock(section) {
    // find all display blocks
    var all_displayBlock;
    if (section) {
      all_displayBlock = section.querySelectorAll(".js-display-block");
    } else {
      all_displayBlock = helper.eA(".js-display-block");
    };
    // loop all display blocks
    for (var i = 0; i < all_displayBlock.length; i++) {
      // find all targets in this display blocks
      var all_displayBlockTarget = all_displayBlock[i].querySelectorAll(".js-display-block-target");
      // start a "no data found at path" count
      var dataNotFoundAtPath = 0;
      var totalNodeLength = 0;
      var all_node = [];

      // loop over each target in this display blocks
      for (var j = 0; j < all_displayBlockTarget.length; j++) {

        // get all data from display blocks target
        var target = all_displayBlockTarget[j];
        // var display = helper.getClosest(all_displayBlockTarget[j], ".js-display");
        var displayType = all_displayBlockTarget[j].dataset.displayType;
        var all_displayPath;
        var all_displayDependency = false;
        var all_displayPrefix = false;
        var all_displaySuffix = false;
        var all_displayValueType = false;
        var all_displayScale = false;
        var all_displayPosition = false;
        var all_displayColor = false;

        if (all_displayBlockTarget[j].dataset.displayPath) {
          all_displayPath = all_displayBlockTarget[j].dataset.displayPath.split(",");
        };
        if (all_displayBlockTarget[j].dataset.displayDependency) {
          all_displayDependency = all_displayBlockTarget[j].dataset.displayDependency.split(",");
        };
        if (all_displayBlockTarget[j].dataset.displayPrefix) {
          all_displayPrefix = all_displayBlockTarget[j].dataset.displayPrefix.split(",");
        };
        if (all_displayBlockTarget[j].dataset.displaySuffix) {
          all_displaySuffix = all_displayBlockTarget[j].dataset.displaySuffix.split(",");
        };
        if (all_displayBlockTarget[j].dataset.displayValueType) {
          all_displayValueType = all_displayBlockTarget[j].dataset.displayValueType.split(",");
        };
        if (all_displayBlockTarget[j].dataset.displayScale) {
          all_displayScale = all_displayBlockTarget[j].dataset.displayScale.split(",");
        };
        if (all_displayBlockTarget[j].dataset.displayPosition) {
          all_displayPosition = all_displayBlockTarget[j].dataset.displayPosition.split(",");
        };
        if (all_displayBlockTarget[j].dataset.displayColor) {
          all_displayColor = all_displayBlockTarget[j].dataset.displayColor.split(",");
        };

        // get an array of nodes using the array of paths
        if (displayType == "stat") {
          all_node = _get_all_stat(all_displayPath);
        } else if (displayType == "modifier") {
          all_node = _get_all_modifier(all_displayPath, all_displayValueType);
        } else if (displayType == "image") {
          all_node = _get_all_image(all_displayPath, all_displayScale, all_displayPosition, all_displayColor);
        } else if (displayType == "text-snippet") {
          all_node = _get_all_textSnippet(all_displayPath, all_displayPrefix, all_displaySuffix, all_displayDependency, all_displayValueType);
        } else if (displayType == "text-block") {
          all_node = _get_all_textBlock(all_displayPath);
        } else if (displayType == "list") {
          all_node = _get_all_list(all_displayPath, all_displayPrefix, all_displaySuffix, all_displayValueType);
        } else if (displayType == "clone") {
          all_node = _get_all_clone(all_displayPath);
        } else if (displayType == "skill") {
          all_node = _get_all_skill(all_displayPath, all_displayPrefix);
        } else if (displayType == "spell") {
          all_node = _get_all_spell(all_displayPath);
        };

        // function for later use to check the element from node array for false or data
        var _appendToTarget = function(element) {
          if (element != false) {
            // append to target
            target.appendChild(element);
          } else {
            // or increment the "no data found at path" count
            dataNotFoundAtPath++;
          };
        };

        // loop over each node in array and append to target
        all_node.forEach(_appendToTarget);
        totalNodeLength = totalNodeLength + all_node.length;
      };
      // if the "no data found at path" count == total "path count" this display blocks target is empty so add a data vale to reflect this
      if (totalNodeLength > dataNotFoundAtPath) {
        all_displayBlock[i].dataset.displayContent = true;
      } else {
        all_displayBlock[i].dataset.displayContent = false;
      };

    };

  };

  function _update_displayPlaceholder(section) {
    var all_display
    if (section) {
      all_display = [section];
    } else {
      all_display = helper.eA(".js-display");
    };
    for (var i = 0; i < all_display.length; i++) {
      var placeholderDisplay = all_display[i].querySelector(".js-placeholder-display");
      var all_displayBlock = all_display[i].querySelectorAll(".js-display-block");
      var contentFound = false;
      var lastActiveDisplayBlock;

      for (var j = 0; j < all_displayBlock.length; j++) {
        if (all_displayBlock[j].dataset.displayContent == "true") {
          lastActiveDisplayBlock = all_displayBlock[j];
          contentFound = true;
          helper.removeClass(all_displayBlock[j], "is-hidden");
        } else {
          helper.addClass(all_displayBlock[j], "is-hidden");
        };
      };
      for (var j = 0; j < all_displayBlock.length; j++) {
        helper.removeClass(all_displayBlock[j], "m-display-block-last");
      };
      if (lastActiveDisplayBlock) {
        helper.addClass(lastActiveDisplayBlock, "m-display-block-last");
      };
      if (contentFound) {
        helper.addClass(placeholderDisplay, "is-hidden")
      } else {
        helper.removeClass(placeholderDisplay, "is-hidden")
      };
    };
  };

  function render(section) {
    _render_displayBlock(section);
    _update_displayPlaceholder(section);
  };

  function _get_displayState(anyOrSingle) {
    var fab = helper.e(".js-fab");
    if (anyOrSingle == "all") {
      return (fab.dataset.displayModeAll == "true");
    } else if (anyOrSingle == "any" || !anyOrSingle) {
      return (fab.dataset.displayMode == "true");
    };
  };

  // exposed methods
  return {
    toggle: toggle,
    bind: bind,
    update: update,
    render: render,
    clear: clear,
    state: _get_displayState
  };

})();

var encumbrance = (function() {

  var changeEncumbranceTimer = null;

  function bind(input) {
    var equipmentEncumbranceEncumbranceStr = helper.e("#equipment-encumbrance-encumbrance-str");
    equipmentEncumbranceEncumbranceStr.addEventListener("input", function() {
      clearTimeout(changeEncumbranceTimer);
      changeEncumbranceTimer = setTimeout(update, 350);
    }, false);
  };

  function update() {
    render();
    totalBlock.render();
    textBlock.render();
    if (display.state()) {
      display.clear();
      display.render();
    };
  };

  function render() {
    var object = _create_encumbranceObject(stats.getScore("str"));
    helper.setObject(sheet.getCharacter(), "equipment.encumbrance.carry_move", object);
    sheet.storeCharacters();
  };

  function _create_encumbranceObject(value) {
    var encumbranceStr = sheet.getCharacter().equipment.encumbrance.encumbrance_str;
    if (sheet.getCharacter().equipment.encumbrance.encumbrance_str != "" && !isNaN(sheet.getCharacter().equipment.encumbrance.encumbrance_str)) {
      value = sheet.getCharacter().equipment.encumbrance.encumbrance_str;
    };
    if (!isNaN(value)) {
      var str = parseInt(value, 10);
    } else {
      str = value;
    };
    var allEncumbrance = {};
    if (str > 0 && str <= 200) {
      var maxLoad;
      var base = [25, 28.75, 32.5, 37.5, 43.75, 50, 57.5, 65, 75, 87.5];
      if (parseInt(str, 10) <= 10) {
        maxLoad = 10 * str;
      } else {
        var index = (1 + str - 10 * parseInt(str / 10)) - 1;
        maxLoad = base[index] * Math.pow(4, parseInt(str / 10));
      };
      // console.log("maxLoad", maxLoad);
      var lightUpper = parseInt(maxLoad / 3).toLocaleString();
      var mediumUpper = parseInt((2 * maxLoad) / 3).toLocaleString();
      var mediumLower = (parseInt(maxLoad / 3) + 1).toLocaleString();
      var heavyUpper = maxLoad.toLocaleString();
      var heavyLower = (parseInt((2 * maxLoad) / 3) + 1).toLocaleString();
      var lift = parseInt(2 * maxLoad).toLocaleString();
      var drag = parseInt(5 * maxLoad).toLocaleString();
      allEncumbrance.light = lightUpper + " lbs. or less";
      allEncumbrance.medium = mediumLower + " - " + mediumUpper + " lbs.";
      allEncumbrance.heavy = heavyLower + " - " + heavyUpper + " lbs.";
      allEncumbrance.lift = lift + " lbs.";
      allEncumbrance.drag = drag + " lbs.";
    } else if (isNaN(str) || str <= 0) {
      allEncumbrance.light = 0;
      allEncumbrance.medium = 0;
      allEncumbrance.heavy = 0;
      allEncumbrance.lift = 0;
      allEncumbrance.drag = 0;
    } else {
      allEncumbrance.light = "STR exceeds maximum calculation";
      allEncumbrance.medium = "STR exceeds maximum calculation";
      allEncumbrance.heavy = "STR exceeds maximum calculation";
      allEncumbrance.lift = "STR exceeds maximum calculation";
      allEncumbrance.drag = "STR exceeds maximum calculation";
    };
    return allEncumbrance;
  };

  // exposed methods
  return {
    bind: bind,
    render: render
  };

})();

var events = (function() {

  function bind() {
    var eventXp = helper.e(".js-evets-xp");
    var eventWealth = helper.e(".js-evets-wealth");
    eventXp.addEventListener("click", function() {
      event.stopPropagation();
      event.preventDefault();
      render("xp");
    }, false)
    eventWealth.addEventListener("click", function() {
      event.stopPropagation();
      event.preventDefault();
      render("wealth");
    }, false)
  };

  function _create_event(type, eventObject) {
    var newEvent = {
      type: type,
      event: eventObject,
      timestamp: helper.getDateTime()
    };
    return newEvent;
  };

  function store(type, eventObject) {
    sheet.getCharacter().events.unshift(_create_event(type, eventObject));
    sheet.storeCharacters();
  };

  function _timestampString(timestamp) {
    var _prefixMinutes = function(minutes) {
      if (minutes < 10) {
        minutes = "0" + minutes;
      };
      return minutes;
    };
    var days = ["Sun", "Mon", "Tue", 'Wed', "Thu", "Fri", "Sat"];
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var timestampString =
      timestamp.hours + ":" +
      _prefixMinutes(timestamp.minutes) + ", " +
      days[timestamp.day] + ", " +
      timestamp.date + " " +
      months[timestamp.month] + " " +
      timestamp.year;
    return timestampString;
  };

  function _create_eventTr(eventLogType, eventObject) {
    // console.log(eventLogType, eventObject);
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var para = document.createElement("p");
    var data;
    if ("aggregate_value" in eventObject.event) {
      data = eventObject.event.aggregate_value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      if (eventObject.event.aggregate_value > 0) {
        data = "+" + data;
      };
      if (eventLogType == "xp") {
        data = data + " XP";
      } else if (eventLogType == "wealth") {
        if (eventObject.type == "platinum") {
          data = data + " PP";
        } else if (eventObject.type == "gold") {
          data = data + " GP";
        } else if (eventObject.type == "silver") {
          data = data + " SP";
        } else if (eventObject.type == "copper") {
          data = data + " CP";
        };
      };
    } else if ("note" in eventObject.event) {
      data = eventObject.event.note;
    };
    para.textContent = data;
    var timestamp = document.createElement("p");
    timestamp.setAttribute("class", "u-small-text u-text-right");
    timestamp.textContent = _timestampString(eventObject.timestamp);
    td2.appendChild(para);
    td1.appendChild(timestamp);
    tr.appendChild(td2);
    tr.appendChild(td1);
    return tr;
  };

  function _create_eventTable(eventLogType) {
    var table = document.createElement("table");
    var tbody = document.createElement("tbody");
    var all_events = helper.getObject(sheet.getCharacter(), "events");
    var all_eventsToRender = [];
    if (eventLogType == "xp") {
      all_events.forEach(function(object) {
        if (object.type == "xp") {
          all_eventsToRender.push(object);
        };
      });
    } else if (eventLogType == "wealth") {
      all_events.forEach(function(object) {
        if (object.type == "platinum" || object.type == "gold" || object.type == "silver" || object.type == "copper") {
          all_eventsToRender.push(object);
        };
      });
    };
    // console.log("all_eventsToRender", all_eventsToRender);
    if (all_eventsToRender.length > 0) {
      for (var i in all_eventsToRender) {
        var tr = _create_eventTr(eventLogType, all_eventsToRender[i]);
        tbody.appendChild(tr);
      };
    } else {
      var table = document.createElement("table");
      var tbody = document.createElement("tbody");
      var tr = document.createElement("tr");
      var td = document.createElement("td");
      var message = document.createElement("p");
      if (eventLogType == "xp") {
        message.textContent = "No XP logged yet. Why not add some?";
      } else if (eventLogType == "wealth") {
        message.textContent = "No wealth logged yet. Why not add some?";
      };
      td.appendChild(message);
      tr.appendChild(td);
      tbody.appendChild(tr);
    };
    table.appendChild(tbody);
    return table;
  };

  function render(eventLogType) {
    var heading;
    if (eventLogType == "xp") {
      heading = "XP log";
    } else if (eventLogType == "wealth") {
      heading = "Wealth log";
    };
    var body = _create_eventTable(eventLogType);
    modal.render(heading, body, "Close", false, "small");
  };

  function undo() {
    sheet.getCharacter().events.shift();
  };

  // exposed methods
  return {
    bind: bind,
    render: render,
    store: store,
    undo: undo
  };

})();

var fireball = (function() {

  function render() {

    var body = helper.e("body");
    var fireball = document.createElement("div");
    fireball.setAttribute("class", "m-fireball js-fireball");
    fireball.setAttribute("style", "left:" + helper.randomNumber(10,90) + "%");
    fireball.addEventListener("animationend", function(event, elapsed) {
      this.parentElement.removeChild(this);
    }.bind(fireball), false);

    body.appendChild(fireball);

  };

  // exposed methods
  return {
    render: render
  };

})();

var fullscreen = (function() {

  function toggle() {
    var fullscreen = helper.e(".js-fullscreen-mode");
    var root = window.document;
    var iconFullscreen = fullscreen.querySelector(".js-icon-fullscreen");
    var rootElement = root.documentElement;
    var requestFullScreen = rootElement.requestFullscreen || rootElement.mozRequestFullScreen || rootElement.webkitRequestFullScreen || rootElement.msRequestFullscreen;
    var cancelFullScreen = root.exitFullscreen || root.mozCancelFullScreen || root.webkitExitFullscreen || root.msExitFullscreen;
    if (!root.fullscreenElement && !root.mozFullScreenElement && !root.webkitFullscreenElement && !root.msFullscreenElement) {
      requestFullScreen.call(rootElement);
      helper.toggleClass(fullscreen, "is-active");
      helper.toggleClass(iconFullscreen, "icon-fullscreen-exit");
      helper.toggleClass(iconFullscreen, "icon-fullscreen");
    } else {
      cancelFullScreen.call(root);
      helper.toggleClass(fullscreen, "is-active");
      helper.toggleClass(iconFullscreen, "icon-fullscreen-exit");
      helper.toggleClass(iconFullscreen, "icon-fullscreen");
    };
  };

  // exposed methods
  return {
    toggle: toggle
  };

})();

var inputBlock = (function() {

  function _store(element) {
    var inputBlock = helper.getClosest(element, ".js-input-block");
    var inputBlockField = inputBlock.querySelector(".js-input-block-field");
    var path = inputBlockField.dataset.path;
    var type = inputBlockField.dataset.type;
    var clone = (inputBlock.dataset.clone == "true");
    var data;
    if (type == "integer") {
      data = parseInt(element.value, 10);
      if (isNaN(data) && type == "integer") {
        data = "";
      };
    } else if (type == "float") {
      data = parseFloat(element.value);
      if (isNaN(data)) {
        data = "";
      };
    } else {
      data = element.value;
    };
    if (path) {
      if (clone) {
        var pathCloneKey = inputBlockField.dataset.pathCloneKey;
        var cloneCount = parseInt(inputBlock.dataset.cloneCount, 10);
        var object = helper.getObject(sheet.getCharacter(), path, cloneCount);
        object[pathCloneKey] = data;
      } else {
        helper.setObject(sheet.getCharacter(), path, data);
      };
    };
  };

  var storeInputTimer = null;
  var updateNavTimer = null;

  function delayUpdate(element) {
    _store(element);
    sheet.storeCharacters();
    textBlock.render();
    totalBlock.render();
    if (display.state()) {
      display.clear();
      display.render();
    };
  };

  function _focus(element) {
    var inputBlock = helper.getClosest(element, ".js-input-block");
    if (element == document.activeElement) {
      helper.addClass(inputBlock, "is-focus");
    } else {
      helper.removeClass(inputBlock, "is-focus");
    };
  };

  function clear() {
    var all_inputBlock = helper.eA(".js-input-block");
    for (var i = 0; i < all_inputBlock.length; i++) {
      all_inputBlock[i].querySelector(".js-input-block-field").value = "";
    };
  };

  function _update_quickValueControls(button) {
    var target = button.dataset.quickValueTarget;
    var change = button.dataset.quickValueChange;
    var heading = button.dataset.modalHeading;
    var inputBlockField = helper.e("#" + target);
    var inputBlock = helper.getClosest(inputBlockField, ".js-input-block");
    var path = inputBlockField.dataset.path;

    function _render_count(quickValueControl) {
      var currentValue = parseInt(quickValueControl.dataset.quickValue, 10);
      var inputBlockQuickValue = quickValueControl.querySelector(".js-input-block-quick-value");
      inputBlockQuickValue.textContent = currentValue;
    };

    function _store_data(quickValueControl, value) {
      var currentValue = parseInt(quickValueControl.dataset.quickValue, 10);
      if (value == 0) {
        quickValueControl.dataset.quickValue = 0;
      } else {
        quickValueControl.dataset.quickValue = currentValue + value;
      };
    };

    function _create_button(quickValueControl, text, icon, value, size) {
      var button = document.createElement("button");
      if (size == "large") {
        button.setAttribute("class", "button button-icon button-large");
      } else if (size == "medium") {
        button.setAttribute("class", "button button-icon");
      } else if (size == "small") {
        button.setAttribute("class", "button button-icon button-small");
      };
      if (icon) {
        var buttonIcon = document.createElement("span");
        buttonIcon.setAttribute("class", icon);
        button.appendChild(buttonIcon);
      };
      if (text) {
        var buttonText = document.createElement("span");
        buttonText.setAttribute("class", "button-text");
        buttonText.textContent = text;
        button.appendChild(buttonText);
      };
      button.addEventListener("click", function() {
        _store_data(quickValueControl, value);
        _render_count(quickValueControl);
      }, false);
      return button;
    };

    function _create_editBoxItem(size, child) {
      var editBoxItem = document.createElement("div");
      editBoxItem.setAttribute("class", "m-edit-box-item-" + size);
      if (child) {
        editBoxItem.appendChild(child);
      };
      return editBoxItem;
    };

    function _update_value(quickValueControl) {
      var storedValue = parseInt(quickValueControl.dataset.quickValue, 10);
      var currentValue = parseInt(helper.getObject(sheet.getCharacter(), path), 10);
      var newValue;
      if (isNaN(currentValue)) {
        currentValue = 0;
      };

      // if negative healing is applied
      if (path == "defense.hp.damage" && change == "negative" && storedValue <= 0) {
        // console.log("negative healing found", " | stored", storedValue, " | old", currentValue);
        storedValue = 0;
      };

      if (change == "positive") {
        newValue = currentValue + storedValue;
      } else if (change == "negative") {
        newValue = currentValue - storedValue;
      };

      if (path == "defense.hp.damage" || path == "defense.hp.temp" || path == "defense.hp.non_lethal_damage") {
        if (newValue <= 0) {
          helper.setObject(sheet.getCharacter(), path, "");
        } else {
          helper.setObject(sheet.getCharacter(), path, newValue);
        };
      } else {
        if (newValue == 0) {
          helper.setObject(sheet.getCharacter(), path, "");
        } else {
          helper.setObject(sheet.getCharacter(), path, newValue);
        };
      };
    };

    function _create_quickValueModal() {
      var quickValueControl = document.createElement("div");
      quickValueControl.setAttribute("class", "m-input-block-quick-value");
      quickValueControl.setAttribute("data-quick-value", 0);
      quickValueControl.setAttribute("data-value-target", target);

      var editBox = document.createElement("div");
      editBox.setAttribute("class", "m-edit-box m-edit-box-head-small");
      var editBoxHead = document.createElement("div");
      editBoxHead.setAttribute("class", "m-edit-box-head");
      var editBoxHeadTitle = document.createElement("h2");
      editBoxHeadTitle.setAttribute("class", "m-edit-box-title");
      editBoxHeadTitle.textContent = "To apply";
      var editBoxBody = document.createElement("div");
      editBoxBody.setAttribute("class", "m-edit-box-body");
      var editBoxContent = document.createElement("div");
      editBoxContent.setAttribute("class", "m-edit-box-content m-edit-box-content-margin-large");
      var buttonGroup1 = document.createElement("div");
      buttonGroup1.setAttribute("class", "m-input-block-quick-value-button-group button-group button-group-line u-no-margin");
      var buttonGroup2 = document.createElement("div");
      buttonGroup2.setAttribute("class", "m-input-block-quick-value-button-group button-group button-group-line u-no-margin");

      var Count = document.createElement("p");
      Count.setAttribute("class", "m-edit-box-total js-input-block-quick-value");
      Count.textContent = 0;


      var clearButton = document.createElement("button");
      clearButton.setAttribute("class", "button button-icon button-large button-slim u-inline-with-input");
      var clearButtonIcon = document.createElement("span");
      clearButtonIcon.setAttribute("class", "icon-close");
      clearButton.appendChild(clearButtonIcon);
      clearButton.addEventListener("click", function() {
        _store_data(quickValueControl, 0);
        _render_count(quickValueControl);
      }, false);

      editBoxContent.appendChild(_create_editBoxItem("total", Count));
      editBoxContent.appendChild(_create_editBoxItem("button-large", clearButton));

      buttonGroup1.appendChild(_create_button(quickValueControl, 1, "icon-add", 1, "large"));
      buttonGroup1.appendChild(_create_button(quickValueControl, 2, "icon-add", 2, "large"));
      buttonGroup1.appendChild(_create_button(quickValueControl, 3, "icon-add", 3, "large"));
      buttonGroup1.appendChild(_create_button(quickValueControl, 5, "icon-add", 5, "large"));
      buttonGroup1.appendChild(_create_button(quickValueControl, 10, "icon-add", 10, "large"));
      buttonGroup1.appendChild(_create_button(quickValueControl, 20, "icon-add", 20, "large"));
      buttonGroup2.appendChild(_create_button(quickValueControl, 1, "icon-remove", -1, "large"));
      buttonGroup2.appendChild(_create_button(quickValueControl, 2, "icon-remove", -2, "large"));
      buttonGroup2.appendChild(_create_button(quickValueControl, 3, "icon-remove", -3, "large"));
      buttonGroup2.appendChild(_create_button(quickValueControl, 5, "icon-remove", -5, "large"));
      buttonGroup2.appendChild(_create_button(quickValueControl, 10, "icon-remove", -10, "large"));
      buttonGroup2.appendChild(_create_button(quickValueControl, 20, "icon-remove", -20, "large"));

      editBoxContent.appendChild(_create_editBoxItem("max", buttonGroup1));
      editBoxContent.appendChild(_create_editBoxItem("max", buttonGroup2));
      editBoxBody.appendChild(editBoxContent);
      editBoxHead.appendChild(editBoxHeadTitle);
      editBox.appendChild(editBoxHead);
      editBox.appendChild(editBoxBody);

      quickValueControl.appendChild(editBox);

      return quickValueControl;
    };

    var modalContent = _create_quickValueModal();

    modal.render(heading, modalContent, "Apply", function() {
      var defenceSection = helper.e(".js-section-defense");
      _update_value(this, change);
      sheet.storeCharacters();
      render(inputBlock);
      totalBlock.render();
      display.clear(defenceSection);
      display.render(defenceSection);
    }.bind(modalContent));
  };

  function _update_aggregateInput(input) {
    var path = input.dataset.aggregatePath;
    var message = input.dataset.aggregateSnackMessage;
    var valueToApply = parseInt(input.value.replace(/,/g, ""), 10);
    // if the value in the input is a number
    if (!isNaN(valueToApply)) {
      _aggregateGivenValue("aggregate", path, valueToApply, message);
      input.value = "";
      var type = input.dataset.eventType;
      var eventObject = {
        aggregate_value: valueToApply
      };
      events.store(type, eventObject);
    };
  };

  function _update_aggregateButton(button) {
    var source = button.dataset.source;
    var path = button.dataset.aggregatePath;
    var message = button.dataset.aggregateSnackMessage;
    var input = helper.e("#" + source);
    var valueToApply = parseInt(input.value.replace(/,/g, ""), 10);
    // if the value in the input is a number
    if (!isNaN(valueToApply)) {
      _aggregateGivenValue("aggregate", path, valueToApply, message);
      input.value = "";
      var type = button.dataset.eventType;
      var eventObject = {
        aggregate_value: valueToApply
      };
      events.store(type, eventObject);
    };
  };

  function _update_aggregateClear(button) {
    var path = button.dataset.aggregatePath;
    var promptHeading = button.dataset.aggregatePromptHeading;
    var promptMessage = button.dataset.aggregatePromptMessage;
    var snackMessage = button.dataset.aggregateSnackMessage;
    var clear = function() {
      _aggregateGivenValue("clear", path, false, snackMessage);
      var type = button.dataset.eventType;
      var note;
      if (type == "xp") {
        note = "XP cleared";
      } else if (type == "platinum") {
        note = "PP cleared";
      } else if (type == "gold") {
        note = "GP cleared";
      } else if (type == "silver") {
        note = "SP cleared";
      } else if (type == "copper") {
        note = "CP cleared";
      };
      var eventObject = {
        note: note
      };
      events.store(type, eventObject);
      wealth.update();
      xp.render();
      textBlock.render();
    };
    prompt.render(promptHeading, promptMessage, "Clear", clear);
  };

  function _aggregateGivenValue(action, path, value, message) {
    var currentValue = parseInt(helper.getObject(sheet.getCharacter(), path), 10);
    if (isNaN(currentValue)) {
      currentValue = 0;
    };
    var newValue;
    if (action == "aggregate") {
      newValue = currentValue + value;
      if (value >= 0) {
        message = "+" + value.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }) + " " + message;
      } else {
        message = value.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }) + " " + message;
      };
    } else if (action == "clear") {
      newValue = "";
    };
    helper.setObject(sheet.getCharacter(), path, newValue);
    sheet.storeCharacters();
    _store_lastAggregate(path, currentValue);
    snack.render(message, "Undo", _restore_lastAggregate, 8000);
    wealth.update();
    xp.render();
    textBlock.render();
  };

  function _store_lastAggregate(path, oldValue) {
    var object = {
      path: path,
      oldValue: oldValue
    };
    helper.store("lastAggregate", JSON.stringify(object));
  };

  function _restore_lastAggregate() {
    events.undo();
    var undoData = JSON.parse(helper.read("lastAggregate"));
    helper.setObject(sheet.getCharacter(), undoData.path, undoData.oldValue);
    wealth.update();
    xp.render();
    textBlock.render();
    sheet.storeCharacters();
    _remove_lastRemovedAggregate();
  };

  function _remove_lastRemovedAggregate() {
    helper.remove("lastAggregate");
  };

  function _increment(button, event) {
    var shift = event.shiftKey;
    var increment = button.dataset.increment;
    var target = button.dataset.incrementTarget;
    var clone = (button.dataset.clone == "true");
    var noZero = (button.dataset.noZero);
    var cloneCount;
    var pathCloneKey;
    if (clone) {
      cloneCount = parseInt(button.dataset.cloneCount, 10);
      pathCloneKey = button.dataset.pathCloneKey;
    };
    var minimum;
    var inputBlockField = helper.e("#" + target);
    var inputBlock = helper.getClosest(inputBlockField, ".js-input-block");
    if (inputBlockField.dataset.minimum !== undefined) {
      minimum = parseInt(inputBlockField.dataset.minimum, 10);
    };
    var path = inputBlockField.dataset.path;
    var oldValue;
    if (clone) {
      var object = helper.getObject(sheet.getCharacter(), path, cloneCount);
      oldValue = parseInt(object[pathCloneKey], 10);
    } else {
      oldValue = parseInt(helper.getObject(sheet.getCharacter(), path), 10);
    };
    if (isNaN(oldValue)) {
      oldValue = 0;
    };

    var newValue;
    if (increment == "addition") {
      if (shift) {
        newValue = oldValue + 10;
      } else {
        newValue = oldValue + 1;
      };
    } else if (increment == "subtraction") {
      if (shift) {
        newValue = oldValue - 10;
      } else {
        newValue = oldValue - 1;
      };
    } else if (increment == "clear") {
      newValue = 0;
    };
    if (typeof minimum == "number") {
      if (newValue <= minimum) {
        newValue = minimum;
      };
    };
    if (noZero) {
      if (newValue == 0) {
        newValue = "";
      };
    };

    if (clone) {
      var object = helper.getObject(sheet.getCharacter(), path, cloneCount);
      object[pathCloneKey] = newValue;
    } else {
      helper.setObject(sheet.getCharacter(), path, newValue);
    };

    render(inputBlock);
    sheet.storeCharacters();
    totalBlock.render();
  };

  function bind(inputBlock) {
    if (inputBlock) {
      _bind_inputBlock(inputBlock);
    } else {
      _bind_all_inputBlock();
      _bind_all_inputBlockIncrement();
      _bind_inputBlockQuickValue();
      _bind_inputBlockAggregateButton();
      _bind_inputBlockAggregateInput();
      _bind_inputBlockAggregateClear();
      _bind_name();
    };
  };

  function _bind_all_inputBlockIncrement() {
    var all_inputBlockIncrement = helper.eA(".js-input-block-increment");
    for (var i = 0; i < all_inputBlockIncrement.length; i++) {
      if (all_inputBlockIncrement[i].dataset.clone != "true") {
        bind_inputBlockIncrement(all_inputBlockIncrement[i]);
      };
    };
  };

  function bind_inputBlockIncrement(inputBlockIncrement) {
    inputBlockIncrement.addEventListener("click", function() {
      _increment(this, event);
    }, false);
  };

  function _bind_inputBlockQuickValue() {
    var all_inputBlockQuickValues = helper.eA(".js-input-block-quick-value");
    for (var i = 0; i < all_inputBlockQuickValues.length; i++) {
      all_inputBlockQuickValues[i].addEventListener("click", function() {
        _update_quickValueControls(this);
      }, false);
    };
  };

  function _bind_inputBlockAggregateInput() {
    var all_inputBlockAggregateinput = helper.eA(".js-input-block-aggregate-input");
    for (var i = 0; i < all_inputBlockAggregateinput.length; i++) {
      all_inputBlockAggregateinput[i].addEventListener("keydown", function(event) {
        // if enter
        if (event.keyCode == 13) {
          _update_aggregateInput(this);
        };
      }, false);
    };
  };

  function _bind_inputBlockAggregateButton() {
    var all_inputBlockAggregateButton = helper.eA(".js-input-block-aggregate-button");
    for (var i = 0; i < all_inputBlockAggregateButton.length; i++) {
      all_inputBlockAggregateButton[i].addEventListener("click", function() {
        _update_aggregateButton(this);
      }, false);
    };
  };

  function _bind_inputBlockAggregateClear() {
    var all_inputBlockAggregateClear = helper.eA(".js-input-block-aggregate-clear");
    for (var i = 0; i < all_inputBlockAggregateClear.length; i++) {
      all_inputBlockAggregateClear[i].addEventListener("click", function() {
        _update_aggregateClear(this);
      }, false);
    };
  };

  function _bind_all_inputBlock() {
    var all_inputBlock = helper.eA(".js-input-block");
    for (var i = 0; i < all_inputBlock.length; i++) {
      if (all_inputBlock[i].dataset.clone != "true") {
        _bind_inputBlock(all_inputBlock[i]);
      };
    };
  };

  function _bind_inputBlock(inputBlock) {
    var input = inputBlock.querySelector(".js-input-block-field");
    if (input) {
      input.addEventListener("input", function() {
        clearTimeout(storeInputTimer);
        storeInputTimer = setTimeout(delayUpdate, 300, this);
      }, false);
      input.addEventListener("focus", function() {
        _focus(this);
      }, false);
      input.addEventListener("blur", function() {
        _store(this);
        _focus(this);
      }, false);
    };
  };

  function _bind_name() {
    var inputBlock = helper.e(".js-basics-name");
    var input = inputBlock.querySelector(".js-input-block-field");
    input.addEventListener("input", function() {
      clearTimeout(updateNavTimer);
      updateNavTimer = setTimeout(nav.update, 300, this);
    }, false);
    // input.addEventListener("keydown", function(event) {
    //   // enter
    //   if (event.keyCode == 13) {
    //     if (input.value == "restore all") {
    //       sheet.all();
    //     };
    //     _focus(this);
    //   };
    // }, false);
  };

  function bind_classLevel(inputBlock) {
    var input = inputBlock.querySelector(".js-input-block-field");
    input.addEventListener("input", function() {
      clearTimeout(updateNavTimer);
      updateNavTimer = setTimeout(nav.update, 300, this);
    }, false);
  };

  function _render_inputBlock(inputBlock) {
    // console.log(inputBlock);
    var inputBlockField = inputBlock.querySelector(".js-input-block-field");
    var path = inputBlockField.dataset.path;
    var clone = (inputBlock.dataset.clone == "true");
    var type = inputBlockField.dataset.type;
    if (path) {
      // console.log(inputBlock);
      if (clone) {
        // console.log("clone", path);
        var pathCloneKey = inputBlockField.dataset.pathCloneKey;
        var cloneCount = parseInt(inputBlock.dataset.cloneCount, 10);
        var object = helper.getObject(sheet.getCharacter(), path, cloneCount);
        // console.log("found clone input", path, pathCloneKey, inputBlock.dataset.cloneCount, inputBlock);
        inputBlockField.value = object[pathCloneKey];
      } else {
        // console.log("not clone", path);
        // console.log(inputBlock.dataset.cloneCount);
        var content = helper.getObject(sheet.getCharacter(), path);
        if (type == "integer" && typeof content == "string") {
          content = parseInt(content, 10);
          if (isNaN(content)) {
            content = "";
          };
        };
        inputBlockField.value = content;
      };
    };
  };

  function render(inputBlock) {
    if (inputBlock) {
      _render_inputBlock(inputBlock);
    } else {
      var all_inputBlock = helper.eA(".js-input-block");
      for (var i = 0; i < all_inputBlock.length; i++) {
        _render_inputBlock(all_inputBlock[i]);
      };
    };
  };

  // exposed methods
  return {
    render: render,
    bind: bind,
    bind_classLevel: bind_classLevel,
    bind_inputBlockIncrement: bind_inputBlockIncrement,
    clear: clear
  };

})();

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
    logHeading.setAttribute("tabindex", "1");
    logHeading.setAttribute("class", "m-log-heading");
    logHeading.textContent = heading;

    var logBody = document.createElement("div");
    logBody.setAttribute("class", "m-log-body u-clearfix");

    var logControls = document.createElement("div");
    logControls.setAttribute("class", "m-log-controls");

    var actionButton = document.createElement("a");
    actionButton.setAttribute("href", "javascript:void(0)");
    actionButton.setAttribute("tabindex", "1");
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
    for (var i = 0; i < update.history.length; i++) {
      var row = document.createElement("div");
      row.setAttribute("class", "row");
      var col2 = document.createElement("div");
      col2.setAttribute("class", "col-xs-2");
      row.setAttribute("class", "row");
      var col10 = document.createElement("div");
      col10.setAttribute("class", "col-xs-10");
      row.setAttribute("class", "row");
      var hr = document.createElement("hr");
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
      col2.appendChild(version);
      col10.appendChild(list);
      row.appendChild(col2);
      row.appendChild(col10);
      container.appendChild(hr);
      container.appendChild(row);
    };
    return container;
  };

  function _create_fullChangeLog() {
    modal.render("Change Log", _create_fullChangeLogModal(), "Close");
  };

  function render() {
    var all_breakingChanges = [];
    var all_breakingChangesVersion = [];
    var changeVersion;
    var numberOfRecentChanges = 2;
    for (var i = 0; i < update.history.length; i++) {
      for (var j = 0; j < update.history[i].list.length; j++) {
        var asterisk = "*";
        if (update.history[i].list[j].indexOf(asterisk) != -1) {
          all_breakingChanges.push(update.history[i].list[j].substr(1));
          all_breakingChangesVersion.push(update.history[i].version);
        };
      };
    };
    for (var i = 0; i < numberOfRecentChanges; i++) {
      if (typeof changeVersion == "undefined") {
        changeVersion = all_breakingChangesVersion[i];
      } else {
        changeVersion = changeVersion + "/" + all_breakingChangesVersion[i];
      };
    };
    if (all_breakingChanges.length < numberOfRecentChanges) {
      numberOfRecentChanges = all_breakingChanges.length;
    };
    if (helper.read("latestVersionUpdate") != changeVersion) {
      var container = document.createElement("div");
      container.setAttribute("class", "container");
      var row = document.createElement("div");
      row.setAttribute("class", "row");
      var col = document.createElement("div");
      col.setAttribute("class", "col-xs-12");
      var list = document.createElement("ul");
      list.setAttribute("class", "m-log-list m-log-list-short");
      for (var i = 0; i < numberOfRecentChanges; i++) {
        var listItem = document.createElement("li");
        listItem.setAttribute("class", "m-log-list-item");
        listItem.textContent = all_breakingChanges[i];
        list.appendChild(listItem);
      };
      var seeAll = document.createElement("button");
      seeAll.setAttribute("class", "button button-medium button-tertiary u-no-margin");
      seeAll.textContent = "See complete Change Log"
      seeAll.addEventListener("click", function(event) {
        _create_fullChangeLog();
        destroy();
      }, false);
      col.appendChild(list);
      col.appendChild(seeAll);
      row.appendChild(col);
      container.appendChild(row);
      var heading = "Recent Changes";
      _render_logMessage(heading, container, "Don't show this again", function(){
        _store_confirmation(changeVersion);
      });
    };
  };

  function _store_confirmation(changeVersion) {
    helper.remove("latestVersionUpdate");
    helper.store("latestVersionUpdate", changeVersion);
  };

  // exposed methods
  return {
    changeLog: _create_fullChangeLog,
    render: render,
    bind: bind,
    destroy: destroy
  };

})();

var modal = (function() {

  var previousModal = null;
  var previousModalShade = null;

  function bind() {
    window.addEventListener("keydown", function(event) {
      if (event.keyCode == 27) {
        destroy();
      };
    }, false);
  };

  function checkForModal() {
    var modal = helper.e(".js-modal");
    if (modal) {
      body.dataset.modal = true;
    } else {
      body.dataset.modal = false;
    };
  };

  function destroy() {
    var modal = helper.e(".js-modal");
    var modalShade = helper.e(".js-modal-shade");
    var modalWrapper = helper.e(".js-modal-wrapper");
    if (modal) {
      getComputedStyle(modal).opacity;
      helper.removeClass(modalWrapper, "is-unrotate-in");
      helper.addClass(modalWrapper, "is-dropped-out");
      helper.removeClass(modal, "is-opaque");
      helper.addClass(modal, "is-transparent");
    };
    if (modalShade) {
      getComputedStyle(modalShade).opacity;
      helper.removeClass(modalShade, "is-opaque");
      helper.addClass(modalShade, "is-transparent");
    };
  };

  function render(heading, modalBodyContent, actionText, action, size) {
    prompt.destroy();
    var body = helper.e("body");
    var displayMode = (helper.e(".js-fab").dataset.displayMode == "true");

    var modalShade = document.createElement("div");
    modalShade.setAttribute("class", "m-modal-shade js-modal-shade");
    if (displayMode) {
      helper.addClass(modalShade, "is-display-mode");
    };
    modalShade.destroy = function() {
      helper.removeClass(modalShade, "is-opaque");
      helper.addClass(modalShade, "is-transparent");
    };

    var modalWrapper = document.createElement("div");
    modalWrapper.setAttribute("class", "m-modal-wrapper js-modal-wrapper is-unrotate-out");

    var modal = document.createElement("div");
    if (size == "large") {
      modal.setAttribute("class", "m-modal m-modal-large js-modal");
    } else if (size == "small") {
      modal.setAttribute("class", "m-modal m-modal-small js-modal");
    } else {
      modal.setAttribute("class", "m-modal js-modal");
    };
    modal.destroy = function() {
      helper.removeClass(modalWrapper, "is-unrotate-in");
      helper.addClass(modalWrapper, "is-dropped-out");
      helper.removeClass(modal, "is-opaque");
      helper.addClass(modal, "is-transparent");
    };

    var modalHeading = document.createElement("h1");
    modalHeading.setAttribute("tabindex", "1");
    modalHeading.setAttribute("class", "m-modal-heading");
    modalHeading.textContent = heading;

    var modalBody = document.createElement("div");
    modalBody.setAttribute("class", "m-modal-body u-clearfix");

    var modalControls = document.createElement("div");
    modalControls.setAttribute("class", "m-modal-controls");

    var actionButton = document.createElement("a");
    actionButton.setAttribute("href", "javascript:void(0)");
    actionButton.setAttribute("tabindex", "1");
    actionButton.setAttribute("class", "button button-primary button-block button-large");
    actionButton.textContent = actionText || "Ok";

    modalControls.appendChild(actionButton);

    if (heading != false) {
      modalBody.appendChild(modalHeading);
    };

    if (modalBodyContent) {
      if (typeof modalBodyContent == "string") {
        var container = document.createElement("div");
        container.setAttribute("class", "container");
        var para = document.createElement("p");
        para.textContent = modalBodyContent;
        container.appendChild(para);
        modalBody.appendChild(container);
      } else {
        modalBody.appendChild(modalBodyContent);
      };
    };

    modalWrapper.appendChild(modalBody);
    modalWrapper.appendChild(modalControls);
    modal.appendChild(modalWrapper);

    modal.addEventListener("transitionend", function(event, elapsed) {
      if (event.propertyName === "opacity" && getComputedStyle(this).opacity == 0) {
        this.parentElement.removeChild(this);
        checkForModal();
        page.update();
      };
    }.bind(modal), false);

    modalShade.addEventListener("transitionend", function(event, elapsed) {
      if (event.propertyName === "opacity" && getComputedStyle(this).opacity == 0) {
        this.parentElement.removeChild(this);
        checkForModal();
        page.update();
      };
    }.bind(modalShade), false);

    modalShade.addEventListener("click", destroy, false);
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

    if (previousModal) {
      previousModal.destroy();
    };

    if (previousModalShade) {
      previousModalShade.destroy();
    };

    previousModal = modal;
    previousModalShade = modalShade;

    body.appendChild(modalShade);
    body.appendChild(modal);

    getComputedStyle(modal).opacity;
    getComputedStyle(modalShade).opacity;
    helper.removeClass(modal, "is-transparent");
    helper.addClass(modal, "is-opaque");
    helper.removeClass(modalWrapper, "is-unrotate-out");
    helper.addClass(modalWrapper, "is-unrotate-in");
    helper.removeClass(modalShade, "is-transparent");
    helper.addClass(modalShade, "is-opaque");
    modalHeading.focus(this);
    checkForModal();
    page.update();
  };

  // exposed methods
  return {
    bind: bind,
    destroy: destroy,
    render: render
  };

})();

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
    var displayMode = (helper.e(".js-fab").dataset.displayMode == "true");
    var navShade = document.createElement("div");

    navShade.setAttribute("class", "m-nav-shade js-nav-shade");
    if (displayMode) {
      helper.addClass(navShade, "is-display-mode");
    };
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

  function scrollToTop() {
    if (window.innerWidth < 550) {
      window.scrollTo(0, 0);
    } else {
      smoothScroll.animateScroll(null, "#body");
    };
  };

  function _bind_characterOption(characterLink) {
    var label = characterLink.querySelector(".js-nav-character-label");
    var input = characterLink.querySelector(".js-nav-character-input");
    input.addEventListener("change", function() {
      _switch_character(label);
      sheet.storeCharacters();
      navClose();
      scrollToTop();
    }, false);
  };

  function _switch_character(characterLink) {
    var newIndex = parseInt(characterLink.dataset.characterIndex, 10);
    sheet.switch(newIndex);
    var name = sheet.getCharacter().basics.name;
    if (typeof name == "undefined" || name == "") {
      name = "New character";
    };
    snack.render(helper.truncate(name, 50, true) + " now in the game.", false);
    navClose();
  };


  function updateNavCharacters() {
    nav.clear();
    nav.render();
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

      var all_editControls = helper.eA(".js-edit-controls");

      for (var i = 0; i < all_editControls.length; i++) {
        var pinWatch = helper.e("." + all_editControls[i].dataset.pinWatch);
        var section = helper.getClosest(pinWatch, ".js-section");
        var fillWidth = parseInt(getComputedStyle(all_editControls[i]).width, 10);
        var fillHeight = parseInt(getComputedStyle(all_editControls[i]).height, 10) + parseInt(getComputedStyle(all_editControls[i]).marginTop, 10) + parseInt(getComputedStyle(all_editControls[i]).marginBottom, 10);
        if (section.dataset.minimise == "false" || !section.dataset.minimise && section.dataset.displayMode == "false" || !section.dataset.displayMode) {
          if (pinWatch.getBoundingClientRect().top <= (offset - fillHeight) && pinWatch.getBoundingClientRect().bottom >= (offset + fillHeight)) {
            // console.log("fire", pinWatch);
            helper.addClass(pinWatch, "is-pinned");
            if (!pinWatch.hasAttribute("style")) {
              all_editControls[i].setAttribute("style", "width: " + fillWidth + "px");
              pinWatch.setAttribute("style", "padding-top: " + fillHeight + "px");
            };
          } else {
            helper.removeClass(pinWatch, "is-pinned");
            pinWatch.removeAttribute("style");
            all_editControls[i].removeAttribute("style");
          };
        } else if (section.dataset.minimise == "true" || section.dataset.minimise && section.dataset.displayMode == "true" || section.dataset.displayMode) {
          helper.removeClass(pinWatch, "is-pinned");
          pinWatch.removeAttribute("style");
          all_editControls[i].removeAttribute("style");
        };
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
      navCharacters.appendChild(_createNavCharacterItem(characters[i], i));
    };
    var all_navCharacterInput = helper.eA(".js-nav-character-input");
    all_navCharacterInput[sheet.getIndex()].checked = true;
  };

  function _get_name(characterObject) {
    var characterName = characterObject.basics.name;
    if (typeof characterName == "undefined" || characterName == "") {
      characterName = "New Character";
    };
    return characterName;
  };

  function _createNavCharacterItem(characterObject, characterIndex) {
    var classLevel = classes.getClassLevel(characterObject);
    var characterName = _get_name(characterObject);

    var uniqueId = helper.randomId(10);

    var navCharacter = document.createElement("li");
    navCharacter.setAttribute("class", "m-nav-character js-nav-character-" + characterIndex);

    var input = document.createElement("input");
    input.setAttribute("id", characterName.replace(/\s+/g, "-").toLowerCase() + "-" + uniqueId);
    input.setAttribute("name", "js-nav-all-characters");
    input.setAttribute("class", "js-nav-character-input");
    input.setAttribute("type", "radio");
    input.setAttribute("tabindex", 1);

    var label = document.createElement("label");
    label.setAttribute("for", characterName.replace(/\s+/g, "-").toLowerCase() + "-" + uniqueId);
    label.setAttribute("class", "u-full-width js-nav-character-label");
    label.setAttribute("data-character-index", characterIndex);

    var detailsSpan = document.createElement("span");
    detailsSpan.setAttribute("class", "m-nav-characters-details");

    var nameSpan = document.createElement("span");
    nameSpan.setAttribute("class", "m-nav-characters-name");
    nameSpan.textContent = characterName;

    var classLevelSpan = document.createElement("span");
    classLevelSpan.setAttribute("class", "m-nav-characters-class-level");
    classLevelSpan.textContent = classLevel;

    // build module
    detailsSpan.appendChild(nameSpan);
    detailsSpan.appendChild(classLevelSpan);
    label.appendChild(detailsSpan);
    navCharacter.appendChild(input);
    navCharacter.appendChild(label);

    // bind
    _bind_characterOption(navCharacter);
    return navCharacter;
  };

  function navClose() {
    var body = helper.e("body");
    var nav = helper.e(".js-nav");
    var hamburger = helper.e(".js-hamburger");
    helper.removeClass(nav, "is-open");
    helper.removeClass(hamburger, "is-open");
    body.dataset.navOpen = false;
    _destroy_navShade();
    page.update();
  };

  function navOpen() {
    var body = helper.e("body");
    var nav = helper.e(".js-nav");
    var hamburger = helper.e(".js-hamburger");
    helper.addClass(nav, "is-open");
    helper.addClass(hamburger, "is-open");
    body.dataset.navOpen = true;
    _render_navShade();
    page.update();
  };

  function toggle() {
    var body = helper.e("body");
    var nav = helper.e(".js-nav");
    var hamburger = helper.e(".js-hamburger");
    if (body.dataset.navOpen == "true") {
      helper.removeClass(nav, "is-open");
      helper.removeClass(hamburger, "is-open");
      body.dataset.navOpen = false;
      _destroy_navShade();
      page.update();
    } else {
      helper.addClass(nav, "is-open");
      helper.addClass(hamburger, "is-open");
      body.dataset.navOpen = true;
      _render_navShade();
      page.update();
    };
  };

  function _quickLinkSmoothScroll(element) {
    var id = element.dataset.link;
    var all_section = helper.eA(".js-section");
    var quickNav = helper.e(".js-quick-nav");
    var offset;
    var options;
    // if nav is on the left after 900px wide viewport
    if (document.documentElement.clientWidth >= 900) {
      offset = parseInt(getComputedStyle(all_section[1]).marginTop, 10);
    } else {
      offset = parseInt(getComputedStyle(all_section[1]).marginTop, 10) + parseInt(getComputedStyle(quickNav).height, 10);
    };
    if (window.innerWidth < 550) {
      options = {
        speed: 150,
        offset: offset
      };
    } else {
      options = {
        speed: 300,
        offset: offset
      };
    };
    navClose();
    smoothScroll.animateScroll(null, id, options);
  };

  function _bind_navLinks() {

    // var nav = helper.e(".js-nav");
    var navToggle = helper.e(".js-nav-toggle");
    var fullscreenModeToggle = helper.e(".js-fullscreen-mode");
    var nightMode = helper.e(".js-night-mode");
    var chnageLog = helper.e(".js-chnage-log");
    var clearAll = helper.e(".js-clear-all");
    var restoreDemoPcs = helper.e(".js-restore-demo-pcs");
    var characterAdd = helper.e(".js-character-add");
    var characterRemove = helper.e(".js-character-remove");
    var characterImport = helper.e(".js-character-import");
    var characterExport = helper.e(".js-character-export");

    navToggle.addEventListener("click", function(event) {
      event.stopPropagation();
      event.preventDefault();
      toggle();
    }, false);

    fullscreenModeToggle.addEventListener("click", function(event) {
      event.stopPropagation();
      event.preventDefault();
      fullscreen.toggle();
    }, false);

    nightMode.addEventListener("click", function(event) {
      event.stopPropagation();
      event.preventDefault();
      night.toggle();
    }, false);

    chnageLog.addEventListener("click", function(event) {
      event.stopPropagation();
      event.preventDefault();
      navClose();
      log.changeLog();
    }, false);

    clearAll.addEventListener("click", function(event) {
      event.stopPropagation();
      event.preventDefault();
      navClose();
      prompt.render("Clear all characters?", "All characters will be removed. This can not be undone.", "Remove all", sheet.destroy);
    }, false);

    restoreDemoPcs.addEventListener("click", function(event) {
      event.stopPropagation();
      event.preventDefault();
      navClose();
      prompt.render("Restore demo PCs?", "All characters will be removed and the demo characters will be restored. Have you backed up your characters by Exporting?", "Restore", sheet.restore);
    }, false);

    characterImport.addEventListener("click", function(event) {
      event.stopPropagation();
      event.preventDefault();
      navClose();
      sheet.import();
    }, false);

    characterExport.addEventListener("click", function(event) {
      event.stopPropagation();
      event.preventDefault();
      navClose();
      sheet.export();
    }, false);

    characterAdd.addEventListener("click", function(event) {
      event.stopPropagation();
      event.preventDefault();
      navClose();
      sheet.addCharacter();
      snack.render("New character added.", false);
    }, false);

    characterRemove.addEventListener("click", function(event) {
      event.stopPropagation();
      event.preventDefault();
      navClose();
      sheet.removeCharacter();
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
        // navClose();
      };
      // ctrl+alt+i
      if (event.ctrlKey && event.altKey && event.keyCode == 73) {
        sheet.import();
        // navClose();
      };
      // ctrl+alt+e
      if (event.ctrlKey && event.altKey && event.keyCode == 69) {
        sheet.export();
        // navClose();
      };
      // ctrl+alt+m
      if (event.ctrlKey && event.altKey && event.keyCode == 77) {
        toggle();
        helper.e(".js-nav-title").focus(this);
      };
      // ctrl+alt+d
      if (event.ctrlKey && event.altKey && event.keyCode == 68) {
        display.clear();
        display.render();
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
    toggle: toggle,
    scrollToTop: scrollToTop
  }

})();

var night = (function() {

  function update() {
    if (helper.read("nightMode") == "true") {
      toggle();
    };
  };

  function toggle() {
    var body = helper.e("body");
    var nightMode = helper.e(".js-night-mode");

    function _nightModeOn() {
      helper.addClass(body, "is-night-mode");
      helper.addClass(nightMode, "is-active");
    };

    function _nightModeOff() {
      helper.removeClass(body, "is-night-mode");
      helper.removeClass(nightMode, "is-active");
    };

    if (body.dataset.nightMode == "true") {
      body.dataset.nightMode = "false";
      _nightModeOff();
      helper.store("nightMode", false);
      sheet.storeCharacters();
    } else if (body.dataset.nightMode == "false" || !body.dataset.nightMode) {
      body.dataset.nightMode = "true";
      _nightModeOn();
      helper.store("nightMode", true);
      sheet.storeCharacters();
    };
  };

  // exposed methods
  return {
    update: update,
    toggle: toggle
  };

})();

var page = (function() {

  function update() {
    var body = helper.e("body");
    var modal = (body.dataset.modal == "true");
    var prompt = (body.dataset.prompt == "true");
    var nav = (body.dataset.navOpen == "true");
    if (modal || prompt || nav) {
      helper.addClass(body, "is-scrolll-disabled");
    } else {
      helper.removeClass(body, "is-scrolll-disabled");
    };
  };

  function lock() {
    var body = helper.e("body");
    helper.addClass(body, "is-scrolll-disabled");
  };

  function unlock() {
    var body = helper.e("body");
    helper.removeClass(body, "is-scrolll-disabled");
  };

  // exposed methods
  return {
    lock: lock,
    unlock: unlock,
    update: update
  };

})();

var prompt = (function() {

  var previousPrompt = null;
  var previousPromptShade = null;

  function bind() {
    window.addEventListener("keydown", function(event) {
      if (event.keyCode == 27) {
        destroy();
      };
    }, false);
  };

  function checkForPrompt() {
    var prompt = helper.e(".js-prompt");
    if (prompt) {
      body.dataset.prompt = true;
    } else {
      body.dataset.prompt = false;
    };
  };

  function destroy() {
    var prompt = helper.e(".js-prompt");
    var promptShade = helper.e(".js-prompt-shade");
    var promptWrapper = helper.e(".js-prompt-wrapper");
    if (prompt) {
      getComputedStyle(prompt).opacity;
      helper.removeClass(promptWrapper, "is-unrotate-in");
      helper.addClass(promptWrapper, "is-dropped-out");
      helper.removeClass(prompt, "is-opaque");
      helper.addClass(prompt, "is-transparent");
    };
    if (promptShade) {
      getComputedStyle(promptShade).opacity;
      helper.removeClass(promptShade, "is-opaque");
      helper.addClass(promptShade, "is-transparent");
    };
  };

  function render(heading, message, actionText, action, actionUrl, actionAttributeKey, actionAttributeValue) {
    modal.destroy();
    var body = helper.e("body");
    var displayMode = (helper.e(".js-fab").dataset.displayMode == "true");

    var promptShade = document.createElement("div");
    promptShade.setAttribute("class", "m-prompt-shade js-prompt-shade");
    if (displayMode) {
      helper.addClass(promptShade, "is-display-mode");
    };
    promptShade.destroy = function() {
      helper.removeClass(promptShade, "is-opaque");
      helper.addClass(promptShade, "is-transparent");
    };

    var promptWrapper = document.createElement("div");
    promptWrapper.setAttribute("class", "m-prompt-wrapper js-prompt-wrapper is-unrotate-out");

    var prompt = document.createElement("div");
    prompt.setAttribute("class", "m-prompt js-prompt");
    prompt.destroy = function() {
      helper.removeClass(promptWrapper, "is-unrotate-in");
      helper.addClass(promptWrapper, "is-dropped-out");
      helper.removeClass(prompt, "is-opaque");
      helper.addClass(prompt, "is-transparent");
    };

    var promptbody = document.createElement("div");
    promptbody.setAttribute("class", "m-prompt-body");

    var promptHeading = document.createElement("h1");
    promptHeading.setAttribute("tabindex", "1");
    promptHeading.setAttribute("class", "m-prompt-heading");
    promptHeading.textContent = heading;

    var promptText = document.createElement("p");
    promptText.setAttribute("class", "m-prompt-text");
    promptText.textContent = message;

    var promptControls = document.createElement("div");
    promptControls.setAttribute("class", "m-prompt-controls button-group button-group-line button-group-equal");

    var actionButton = document.createElement("a");
    actionButton.setAttribute("href", "javascript:void(0)");
    actionButton.setAttribute("tabindex", "1");
    actionButton.setAttribute("class", "button button-primary button-large js-prompt-action");
    actionButton.textContent = actionText || "Ok";

    var cancelButton = document.createElement("a");
    cancelButton.setAttribute("href", "javascript:void(0)");
    cancelButton.setAttribute("tabindex", "1");
    cancelButton.setAttribute("class", "button button-large");
    cancelButton.textContent = "Cancel";

    promptControls.appendChild(cancelButton);
    promptControls.appendChild(actionButton);
    if (heading) {
      promptbody.appendChild(promptHeading);
    };
    if (message) {
      promptbody.appendChild(promptText);
    };
    promptWrapper.appendChild(promptbody);
    promptWrapper.appendChild(promptControls);

    prompt.appendChild(promptWrapper);

    prompt.addEventListener("transitionend", function(event, elapsed) {
      if (event.propertyName === "opacity" && getComputedStyle(this).opacity == 0) {
        this.parentElement.removeChild(this);
        checkForPrompt();
        page.update();
      };
    }.bind(prompt), false);

    promptShade.addEventListener("transitionend", function(event, elapsed) {
      if (event.propertyName === "opacity" && getComputedStyle(this).opacity == 0) {
        this.parentElement.removeChild(this);
        checkForPrompt();
        page.update();
      };
    }.bind(promptShade), false);

    if (action) {
      actionButton.addEventListener("click", function(event) {
        event.stopPropagation();
        event.preventDefault();
        action();
      }, false);
    };
    if (actionUrl) {
      actionButton.href = actionUrl;
    };
    if (actionAttributeKey && actionAttributeValue) {
      actionButton.setAttribute(actionAttributeKey, actionAttributeValue);
    };
    actionButton.addEventListener("click", destroy, false);
    cancelButton.addEventListener("click", function(event) {
      event.stopPropagation();
      event.preventDefault();
      destroy();
    }, false);
    promptShade.addEventListener("click", destroy, false);

    if (previousPrompt) {
      previousPrompt.destroy();
    };

    if (previousPromptShade) {
      previousPromptShade.destroy();
    };

    previousPrompt = prompt;
    previousPromptShade = promptShade;

    body.appendChild(promptShade);
    body.appendChild(prompt);

    getComputedStyle(prompt).opacity;
    getComputedStyle(promptShade).opacity;
    helper.removeClass(prompt, "is-transparent");
    helper.addClass(prompt, "is-opaque");
    helper.removeClass(promptWrapper, "is-unrotate-out");
    helper.addClass(promptWrapper, "is-unrotate-in");
    helper.removeClass(promptShade, "is-transparent");
    helper.addClass(promptShade, "is-opaque");
    promptHeading.focus(this);
    checkForPrompt();
    page.update();
  };

  // exposed methods
  return {
    bind: bind,
    destroy: destroy,
    render: render
  };

})();

var radioBlock = (function() {

  function _store(element) {
    var radioBlock = helper.getClosest(element, ".js-radio-block");
    var radioBlockInput = radioBlock.querySelector(".js-radio-block-input");
    var path = element.dataset.path;
    var value = element.value;
    if (path) {
      helper.setObject(sheet.getCharacter(), path, value);
    };
  };

  var storeRadioTimer = null;

  function delayUpdate(element) {
    _store(element);
    sheet.storeCharacters();
  };

  function clear() {
    var all_radioBlock = helper.eA(".js-radio-block");
    for (var i = 0; i < all_radioBlock.length; i++) {
      all_radioBlock[i].querySelector(".js-radio-block-input").checked = false;
    };
  };

  function bind(radioBlock) {
    if (radioBlock) {
      _bind_radioBlock(radioBlock);
    } else {
      var all_radioBlock = helper.eA(".js-radio-block");
      for (var i = 0; i < all_radioBlock.length; i++) {
        if (all_radioBlock[i].dataset.clone != "true") {
          _bind_radioBlock(all_radioBlock[i]);
        };
      };
    };
  };

  function _bind_radioBlock(radioBlock) {
    var radioBlockInput = radioBlock.querySelector(".js-radio-block-input");
    if (radioBlockInput) {
      radioBlockInput.addEventListener("change", function() {
        clearTimeout(storeRadioTimer);
        storeRadioTimer = setTimeout(delayUpdate, 300, this);
      }, false);
    };
  };

  function render(radioBlock) {
    if (radioBlock) {
      _render_radioBlock(radioBlock);
    } else {
      var all_radioBlock = helper.eA(".js-radio-block");
      for (var i = 0; i < all_radioBlock.length; i++) {
        _render_radioBlock(all_radioBlock[i]);
      };
    };
  };

  function _render_radioBlock(radioBlock) {
    var radioBlockInput = radioBlock.querySelector(".js-radio-block-input");
    var path = radioBlockInput.dataset.path;
    var value = radioBlockInput.value;
    if (path) {
      var selection = helper.getObject(sheet.getCharacter(), path);
      if (selection == value) {
        radioBlockInput.checked = true;
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

var registerServiceWorker = (function() {

  function bind() {
    if ("serviceWorker" in navigator) {
      // Delay registration until after the page has loaded, to ensure that our
      // precaching requests don't degrade the first visit experience.
      // See https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration
      window.addEventListener("load", function() {
        // Your service-worker.js *must* be located at the top-level directory relative to your site.
        // It won't be able to control pages unless it's located at the same level or higher than them.
        // *Don't* register service worker file in, e.g., a scripts/ sub-directory!
        // See https://github.com/slightlyoff/ServiceWorker/issues/468
        navigator.serviceWorker.register("service-worker.js").then(function(reg) {
          // updatefound is fired if service-worker.js changes.
          reg.onupdatefound = function() {
            // The updatefound event implies that reg.installing is set; see
            // https://w3c.github.io/ServiceWorker/#service-worker-registration-updatefound-event
            var installingWorker = reg.installing;

            installingWorker.onstatechange = function() {
              switch (installingWorker.state) {
                case "installed":
                  if (navigator.serviceWorker.controller) {
                    // At this point, the old content will have been purged and the fresh content will
                    // have been added to the cache.
                    // It's the perfect time to display a "New content is available; please refresh."
                    // message in the page's interface.
                    console.log("[Service Worker] New or updated content is available.");
                    window.location.reload(true);
                  } else {
                    // At this point, everything has been precached.
                    // It's the perfect time to display a "Content is cached for offline use." message.
                    console.log("[Service Worker] Content is now available offline!");
                  };
                  break;
                case "redundant":
                  console.error("[Service Worker] The installing service worker became redundant.");
                  break;
              };
            };
          };
        }).catch(function(e) {
          console.error("[Service Worker] Error during service worker registration:", e);
        });
      });
    };
  };

  // exposed methods
  return {
    bind: bind
  };

})();

var repair = (function() {

  function render(characterObject) {
    // console.log("Repair update fired");
    // --------------------------------------------------
    // add spell notes
    if (characterObject.spells.book) {
      for (var i in characterObject.spells.book) {
        for (var j in characterObject.spells.book[i]) {
          if (characterObject.spells.book[i][j].length > 0) {
            for (var k in characterObject.spells.book[i][j]) {
              if (!("note" in characterObject.spells.book[i][j][k]) && typeof characterObject.spells.book[i][j][k].note != "string") {
                // console.log("\tspell notes not found");
                characterObject.spells.book[i][j][k].note = "";
              };
            };
          };
        };
      };
    };
    // --------------------------------------------------
    // add item array
    if (typeof characterObject.equipment.item == "string" || !characterObject.equipment.item) {
      // console.log("\tadd item array");
      characterObject.equipment.item = [];
    };
    // --------------------------------------------------
    // add note array
    if (typeof characterObject.notes.character == "string" || typeof characterObject.notes.story == "string") {
      // console.log("\tadd note array");
      characterObject.notes.character = [];
      characterObject.notes.story = [];
    };
    // --------------------------------------------------
    // add custom skills array
    if (typeof characterObject.skills.custom == "string" || !characterObject.skills.custom) {
      // console.log("\tadd custom skills array");
      characterObject.skills.custom = [];
    };
    // --------------------------------------------------
    // move custom skills to new custom skills
    if ("custom_1" in characterObject.skills || "custom_2" in characterObject.skills || "custom_3" in characterObject.skills || "custom_4" in characterObject.skills || "custom_5" in characterObject.skills || "custom_6" in characterObject.skills || "custom_7" in characterObject.skills || "custom_8" in characterObject.skills) {
      // console.log("\tmove custom skills to new custom skills");
      var skillKeys = ["custom_1", "custom_2", "custom_3", "custom_4", "custom_5", "custom_6", "custom_7", "custom_8"];
      for (var i = 0; i < skillKeys.length; i++) {
        if (characterObject.skills[skillKeys[i]].name != "" || characterObject.skills[skillKeys[i]].ranks || characterObject.skills[skillKeys[i]].misc) {
          var newSkill = characterObject.skills[skillKeys[i]];
          characterObject.skills.custom.push(newSkill);
        };
        delete characterObject.skills[skillKeys[i]];
      };
    };
    // --------------------------------------------------
    // add concentration bonus object
    if (typeof characterObject.spells.concentration.bonuses != "object" || !characterObject.spells.concentration.bonuses) {
      // console.log("\tadd concentration bonus object");
      characterObject.spells.concentration.bonuses = {
        str_bonus: false,
        dex_bonus: false,
        con_bonus: false,
        int_bonus: false,
        wis_bonus: false,
        cha_bonus: false,
        level: false,
        half_level: false
      };
    };
    // --------------------------------------------------
    // add initiative object
    if (typeof characterObject.basics.initiative != "object" || typeof characterObject.basics.initiative.bonuses != "object" || !characterObject.basics.initiative.bonuses) {
      // console.log("\tadd initiative object");
      characterObject.basics.initiative = {
        misc: "",
        temp: "",
        feat: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      };
    };
    // --------------------------------------------------
    // add size object
    if (typeof characterObject.basics.size != "object" || "size_bonus" in characterObject.defense.ac) {
      // console.log("\tadd size object");
      var size = characterObject.basics.size;
      if (size == "M" || size == "m" || size == "medium" || size == "Medium" || size != "") {
        size = "Medium";
      } else if (size == "") {
        size = false;
      };
      characterObject.basics.size = {
        category: "",
        size_modifier: 0,
        special_size_modifier: 0,
        size_modifier_fly: 0,
        size_modifier_stealth: 0
      };
      if (size) {
        characterObject.basics.size.category = size;
      };
      delete characterObject.defense.ac.size_bonus;
      delete characterObject.offense.cmb.size;
      delete characterObject.offense.cmd.size;
      delete characterObject.offense.melee_attack.size;
      delete characterObject.offense.ranged_attack.size;
      characterObject.offense.cmb.bonuses.special_size = true;
      characterObject.offense.cmd.bonuses.special_size = true;
      characterObject.offense.melee_attack.bonuses.size = true;
      characterObject.offense.ranged_attack.bonuses.size = true;
      characterObject.skills.fly.bonuses.size_modifier_fly = true;
      characterObject.skills.stealth.bonuses.size_modifier_stealth = true;
    };
    // --------------------------------------------------
    // update alignment
    if (["Lawful Good", "Lawful Neutral", "Lawful Evil", "Neutral Good", "Neutral", "Neutral Evil", "Chaotic Good", "Chaotic Neutral", "Chaotic Evil"].indexOf(characterObject.basics.alignment) === -1) {
      if (["Lawful Good", "Lawful good", "lawful good", "LG", "Lg", "lg"].indexOf(characterObject.basics.alignment) > -1) {
        characterObject.basics.alignment = "Lawful Good";
      };
      if (["Lawful Neutral", "Lawful neutral", "lawful neutral", "LN", "Ln", "ln"].indexOf(characterObject.basics.alignment) > -1) {
        characterObject.basics.alignment = "Lawful Neutral";
      };
      if (["Lawful Evil", "Lawful evil", "lawful evil", "LE", "Le", "le"].indexOf(characterObject.basics.alignment) > -1) {
        characterObject.basics.alignment = "Lawful Evil";
      };
      if (["Neutral Good", "Neutral good", "neutral good", "NG", "Ng", "ng"].indexOf(characterObject.basics.alignment) > -1) {
        characterObject.basics.alignment = "Neutral Good";
      };
      if (["Neutral", "Neutral", "neutral", "N", "n"].indexOf(characterObject.basics.alignment) > -1) {
        characterObject.basics.alignment = "Neutral";
      };
      if (["Neutral Evil", "Neutral evil", "neutral evil", "NE", "Ne", "ne"].indexOf(characterObject.basics.alignment) > -1) {
        characterObject.basics.alignment = "Neutral Evil";
      };
      if (["Chaotic Good", "Chaotic good", "chaotic good", "CG", "Cg", "cg"].indexOf(characterObject.basics.alignment) > -1) {
        characterObject.basics.alignment = "Chaotic Good";
      };
      if (["Chaotic Neutral", "Chaotic neutral", "chaotic neutral", "CN", "Cn", "cn"].indexOf(characterObject.basics.alignment) > -1) {
        characterObject.basics.alignment = "Chaotic Neutral";
      };
      if (["Chaotic Evil", "Chaotic evil", "chaotic evil", "CE", "Ce", "ce"].indexOf(characterObject.basics.alignment) > -1) {
        characterObject.basics.alignment = "Chaotic Evil";
      };
    };
    // --------------------------------------------------
    // update armor
    if (typeof characterObject.equipment.armor != "object") {
      // console.log("\tupdate armor");
      characterObject.equipment.armor = {
        armor: "",
        check_penalty: "",
        max_dex: "",
        shield: ""
      };
      if (characterObject.equipment.body_slots.armor != "") {
        characterObject.equipment.armor.armor = characterObject.equipment.body_slots.armor;
      };
      if (characterObject.equipment.body_slots.shield != "") {
        characterObject.equipment.armor.shield = characterObject.equipment.body_slots.shield;
      };
      if (characterObject.defense.ac.max_dex != "") {
        characterObject.equipment.armor.max_dex = characterObject.defense.ac.max_dex;
      };
      if (characterObject.defense.ac.check_penalty != "") {
        characterObject.equipment.armor.check_penalty = characterObject.defense.ac.check_penalty;
      };
      delete characterObject.equipment.body_slots.armor;
      delete characterObject.equipment.body_slots.shield;
      delete characterObject.defense.ac.max_dex;
      delete characterObject.defense.ac.check_penalty;
    };
    // --------------------------------------------------
    // remove racial save bonuses
    function ifRacial(key, object) {
      if (key in object) {
        // console.log("\tremove racial save bonuses");
        if (object.racial != "" && !isNaN(object.racial)) {
          console.log("racial found");
          console.log(object, object.racial);
          if (object.misc != "" && !isNaN(object.misc)) {
            console.log("misc found");
            console.log(object.misc);
            object.misc = object.misc + object.racial;
          } else {
            object.misc = object.racial;
          };
        };
        delete object[key];
      };
    };
    ifRacial("racial", characterObject.defense.fortitude);
    ifRacial("racial", characterObject.defense.reflex);
    ifRacial("racial", characterObject.defense.will);
    // --------------------------------------------------
    // update classes
    if (!characterObject.basics.classes) {
      // console.log("\tupdate classes");
      characterObject.basics.classes = [{
        classname: "",
        level: "",
        hp: "",
        fortitude: "",
        reflex: "",
        will: "",
        ranks: "",
        bab: ""
      }];
      // move class to classes
      if (characterObject.basics.class != "") {
        characterObject.basics.classes[0].classname = characterObject.basics.class;
      };
      // move level to classes
      if (characterObject.basics.level != "") {
        characterObject.basics.classes[0].level = parseInt(characterObject.basics.level, 10);
        characterObject.basics.level = "";
      };
      // remove con bonus from hp and add it to classes
      if (characterObject.defense.hp.total != "") {
        var conMod = 0;
        if (characterObject.statistics.stats.con.temp_score != "") {
          conMod = Math.floor((parseInt(characterObject.statistics.stats.con.temp_score, 10) - 10) / 2);
        } else {
          conMod = Math.floor((parseInt(characterObject.statistics.stats.con.score, 10) - 10) / 2);
        };
        var conHp = conMod * characterObject.basics.classes[0].level;
        characterObject.basics.classes[0].hp = characterObject.defense.hp.total - conHp;
        characterObject.defense.hp.total = "";
      };
      // move bab
      if (characterObject.offense.base_attack != "") {
        characterObject.basics.classes[0].bab = parseInt(characterObject.offense.base_attack, 10);
        characterObject.offense.base_attack = "";
        characterObject.offense.base_attack_bonuses = "";
      };
      // move base saves
      if (characterObject.defense.fortitude.base != "") {
        characterObject.basics.classes[0].fortitude = characterObject.defense.fortitude.base;
      };
      if (characterObject.defense.reflex.base != "") {
        characterObject.basics.classes[0].reflex = characterObject.defense.reflex.base;
      };
      if (characterObject.defense.will.base != "") {
        characterObject.basics.classes[0].will = characterObject.defense.will.base;
      };
      delete characterObject.basics.class;
    };
    // --------------------------------------------------
    // update caster level check
    if (!characterObject.spells.caster_level_check) {
      // console.log("\tupdate caster level check");
      characterObject.spells.caster_level_check = {
        current: "",
        misc: "",
        temp: "",
        feat: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: true,
          half_level: false
        }
      };
    };
    // --------------------------------------------------
    // udpate encumbrance
    if ("light" in characterObject.equipment.encumbrance || "medium" in characterObject.equipment.encumbrance || "heavy" in characterObject.equipment.encumbrance || "lift" in characterObject.equipment.encumbrance || "drag" in characterObject.equipment.encumbrance) {
      delete characterObject.equipment.encumbrance.light;
      delete characterObject.equipment.encumbrance.medium;
      delete characterObject.equipment.encumbrance.heavy;
      delete characterObject.equipment.encumbrance.lift;
      delete characterObject.equipment.encumbrance.drag;
    };
    // --------------------------------------------------
    // udpate xp
    if (typeof characterObject.basics.xp == "string" && !characterObject.basics.xp == "") {
      characterObject.basics.xp = parseInt(characterObject.basics.xp.replace(/,/g, ""), 10);
    };
    // --------------------------------------------------
    // udpate wealth
    if (typeof characterObject.equipment.wealth.platinum == "string" && !characterObject.equipment.wealth.platinum == "") {
      characterObject.equipment.wealth.platinum = parseInt(characterObject.equipment.wealth.platinum.replace(/,/g, ""), 10);
    };
    if (typeof characterObject.equipment.wealth.gold == "string" && !characterObject.equipment.wealth.gold == "") {
      characterObject.equipment.wealth.gold = parseInt(characterObject.equipment.wealth.gold.replace(/,/g, ""), 10);
    };
    if (typeof characterObject.equipment.wealth.silver == "string" && !characterObject.equipment.wealth.silver == "") {
      characterObject.equipment.wealth.silver = parseInt(characterObject.equipment.wealth.silver.replace(/,/g, ""), 10);
    };
    if (typeof characterObject.equipment.wealth.copper == "string" && !characterObject.equipment.wealth.copper == "") {
      characterObject.equipment.wealth.copper = parseInt(characterObject.equipment.wealth.copper.replace(/,/g, ""), 10);
    };
    // --------------------------------------------------
    // add events array
    if (!characterObject.hasOwnProperty("events")) {
      characterObject.events = [];
    };
    // --------------------------------------------------
    // update xp and next level
    if (typeof characterObject.basics.xp == "string" || typeof characterObject.basics.xp == "number") {
      var oldXp;
      if (typeof characterObject.basics.xp == "number") {
        oldXp = characterObject.basics.xp;
      } else if (typeof characterObject.basics.xp == "string") {
        oldXp = parseInt(characterObject.basics.xp.replace(/,/g, ""), 10);
      };
      if (isNaN(oldXp)) {
        oldXp = "";
      };
      characterObject.basics.xp = {};
      characterObject.basics.xp.total = oldXp;
    };
    // --------------------------------------------------
    // update speed
    if (typeof characterObject.basics.speed == "string" || typeof characterObject.basics.speed == "number" || characterObject.basics.speed == "" || typeof characterObject.basics.speed != "object") {
      var oldSpeed = characterObject.basics.speed;
      characterObject.basics.speed = {};
      characterObject.basics.speed.land = oldSpeed;
    };
    // --------------------------------------------------
    // update character image
    if (!characterObject.basics.character_image) {
      characterObject.basics.character_image = {
        background: "",
        color: {
          r: "",
          g: "",
          b: ""
        },
        contain: "",
        cover: "",
        image: "",
        orientation: "",
        position: {
          x: "",
          y: ""
        },
        scale: ""
      };
    };
    // --------------------------------------------------
    // update attack types
    if (characterObject.offense.attack.melee.length > 0) {
      for (var i = 0; i < characterObject.offense.attack.melee.length; i++) {
        if (!characterObject.offense.attack.melee[i].type) {
          characterObject.offense.attack.melee[i].type = "";
        };
      };
    };
    if (characterObject.offense.attack.ranged.length > 0) {
      for (var i = 0; i < characterObject.offense.attack.ranged.length; i++) {
        if (!characterObject.offense.attack.ranged[i].type) {
          characterObject.offense.attack.ranged[i].type = "";
        };
      };
    };
    // --------------------------------------------------
    // update stats
    if (!characterObject.statistics.stats.str.enhancement && characterObject.statistics.stats.str.enhancement != "" || !characterObject.statistics.stats.dex.enhancement && characterObject.statistics.stats.dex.enhancement != "" || !characterObject.statistics.stats.con.enhancement && characterObject.statistics.stats.con.enhancement != "" || !characterObject.statistics.stats.int.enhancement && characterObject.statistics.stats.int.enhancement != "" || !characterObject.statistics.stats.wis.enhancement && characterObject.statistics.stats.wis.enhancement != "" || !characterObject.statistics.stats.cha.enhancement && characterObject.statistics.stats.cha.enhancement != "") {
      for (var key in characterObject.statistics.stats) {
        var score = parseInt(characterObject.statistics.stats[key].score, 10);
        var tempScore = parseInt(characterObject.statistics.stats[key].temp_score, 10);
        // console.log("\t" + key, "new score = ", score, "\ttempScore = ", tempScore);
        characterObject.statistics.stats[key].base = score;
        if (!isNaN(tempScore)) {
          characterObject.statistics.stats[key].temp = (tempScore - score);
        } else {
          characterObject.statistics.stats[key].temp = "";
        };
        delete characterObject.statistics.stats[key].score;
        delete characterObject.statistics.stats[key].temp_score;
        delete characterObject.statistics.stats[key].temp_modifier;
      };
    };
    // --------------------------------------------------
    // update events
    if ("events" in characterObject) {
      if (characterObject.events.length > 0) {
        for (var i = 0; i < characterObject.events.length; i++) {
          if (characterObject.events[i].event.aggregateValue) {
            characterObject.events[i].event.aggregate_value = characterObject.events[i].event.aggregateValue;
            delete characterObject.events[i].event.aggregateValue;
          };
        };
      };
    } else {
      characterObject.events = [];
    };
    // --------------------------------------------------
    sheet.storeCharacters();
    return characterObject;
  };

  // exposed methods
  return {
    render: render
  };

})();

var selectBlock = (function() {

  function _store(element) {
    var selectBlock = helper.getClosest(element, ".js-select-block");
    var selectBlockDropdown = selectBlock.querySelector(".js-select-block-dropdown");
    var path = selectBlockDropdown.dataset.path;
    var data = selectBlockDropdown.options[selectBlockDropdown.selectedIndex].value;
    if (path) {
      helper.setObject(sheet.getCharacter(), path, data);
    };
  };

  var storeDropdownTimer = null;

  function delayUpdate(element) {
    _store(element);
    sheet.storeCharacters();
    textBlock.render();
    totalBlock.render();
    if (display.state()) {
      display.clear();
      display.render();
    };
  };

  function _focus(element) {
    var selectBlock = helper.getClosest(element, ".js-select-block");
    if (element == document.activeElement) {
      helper.addClass(selectBlock, "is-focus");
    } else {
      helper.removeClass(selectBlock, "is-focus");
    };
  };

  function clear() {
    var all_selectBlock = helper.eA(".js-select-block");
    for (var i = 0; i < all_selectBlock.length; i++) {
      all_selectBlock[i].querySelector(".js-select-block-dropdown").selectedIndex = 0;
    };
  };

  function bind(selectBlock) {
    if (selectBlock) {
      _bind_selectBlock(selectBlock);
    } else {
      var all_selectBlock = helper.eA(".js-select-block");
      for (var i = 0; i < all_selectBlock.length; i++) {
        if (all_selectBlock[i].dataset.clone != "true") {
          _bind_selectBlock(all_selectBlock[i]);
        };
      };
    };
  };

  function _bind_selectBlock(selectBlock) {
    var selectBlockDropdown = selectBlock.querySelector(".js-select-block-dropdown");
    if (selectBlockDropdown) {
      selectBlockDropdown.addEventListener("change", function() {
        clearTimeout(storeDropdownTimer);
        storeDropdownTimer = setTimeout(delayUpdate, 300, this);
      }, false);
      selectBlockDropdown.addEventListener("focus", function() {
        _focus(this);
      }, false);
      selectBlockDropdown.addEventListener("blur", function() {
        _focus(this);
      }, false);
    };
  };

  function _render_selectBlock(selectBlock) {
    var selectBlockDropdown = selectBlock.querySelector(".js-select-block-dropdown");
    var path = selectBlockDropdown.dataset.path;
    var selected = selectBlockDropdown.options.selectedIndex;
    if (path) {
      var selection = helper.getObject(sheet.getCharacter(), path);
      helper.setDropdown(selectBlockDropdown, selection);
    };
  };

  function render(selectBlock) {
    if (all_selectBlock) {
      _render_selectBlock(selectBlock);
    } else {
      var all_selectBlock = helper.eA(".js-select-block");
      for (var i = 0; i < all_selectBlock.length; i++) {
        _render_selectBlock(all_selectBlock[i]);
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

var sheet = (function() {

  var allCharacters = JSON.parse(JSON.stringify([blank.data]));

  var currentCharacterIndex = 0;

  var saveHardCodedCharacters = (function() {
    if (helper.read("allCharacters")) {
      allCharacters = JSON.parse(helper.read("allCharacters"));
    } else if (typeof hardCodedCharacters !== "undefined") {
      allCharacters = JSON.parse(JSON.stringify(hardCodedCharacters.demo())); // for demo load sample characters
      // allCharacters = [blank.data]; // for production load blank character
    };
    storeCharacters();
  })();

  var setCurrentCharacterIndex = (function() {
    if (helper.read("charactersIndex")) {
      currentCharacterIndex = parseInt(helper.read("charactersIndex"), 10);
    };
  })();

  function storeCharacters() {
    helper.store("allCharacters", JSON.stringify(allCharacters));
  };

  function getAllCharacters() {
    return allCharacters;
  };

  function getCharacter() {
    return allCharacters[currentCharacterIndex];
  };

  function getIndex() {
    return currentCharacterIndex;
  };

  function setIndex(index) {
    currentCharacterIndex = index;
    helper.store("charactersIndex", currentCharacterIndex);
  };

  function addCharacter(newCharacter) {
    var dataToAdd = newCharacter || JSON.parse(JSON.stringify(blank.data));
    allCharacters.push(dataToAdd);
    var newIndex = getAllCharacters().length - 1;
    setIndex(newIndex);
    storeCharacters();
    clear();
    render();
    nav.clear();
    nav.render();
    nav.scrollToTop();
  };

  function removeCharacter() {
    var name;
    if (sheet.getCharacter().basics.name) {
      name = sheet.getCharacter().basics.name;
    } else {
      name = "New character";
    };
    prompt.render("Remove " + name + "?", "This can not be undone.", "Remove", destroyCharacter);
  };

  function destroyCharacter() {
    var name = allCharacters[getIndex()].basics.name || "New character";
    allCharacters.splice(getIndex(), 1);
    var lastCharacterRemoved = false;
    if (allCharacters.length == 0) {
      addCharacter();
      lastCharacterRemoved = true;
    };
    setIndex(0);
    clear();
    render();
    storeCharacters();
    nav.clear();
    nav.render();
    if (lastCharacterRemoved) {
      snack.render(helper.truncate(name, 40, true) + " removed. New character added.", false, false);
    } else {
      nav.scrollToTop();
      snack.render(helper.truncate(name, 50, true) + " removed.", false, false);
    };
  };

  function all() {
    localStorage.clear();
    prompt.destroy();
    snack.destroy();
    allCharacters = JSON.parse(JSON.stringify(hardCodedCharacters.all()));
    setIndex(0);
    storeCharacters();
    clear();
    render();
    nav.clear();
    nav.render();
    nav.scrollToTop();
    snack.render("All characters restored.", false, false);
  };

  function restore() {
    localStorage.clear();
    prompt.destroy();
    snack.destroy();
    allCharacters = JSON.parse(JSON.stringify(hardCodedCharacters.demo()));
    setIndex(0);
    storeCharacters();
    clear();
    render();
    nav.clear();
    nav.render();
    nav.scrollToTop();
    snack.render("Default characters restored.", false, false);
  };

  function destroy() {
    localStorage.clear();
    prompt.destroy();
    snack.destroy();
    allCharacters = JSON.parse(JSON.stringify([blank.data]));
    setIndex(0);
    storeCharacters();
    clear();
    render();
    nav.clear();
    nav.render();
    nav.scrollToTop();
    snack.render("All characters cleared.", false, false);
  };

  function _createImportModal() {
    var container = document.createElement("div");
    container.setAttribute("class", "container");
    var row = document.createElement("div");
    row.setAttribute("class", "row");
    var col = document.createElement("div");
    col.setAttribute("class", "col-xs-12");
    var importSelectWrapper = document.createElement("div");
    importSelectWrapper.setAttribute("class", "m-import-select-wrapper");
    var importSelect = document.createElement("div");
    importSelect.setAttribute("class", "m-import-select");
    var input = document.createElement("input");
    input.setAttribute("id", "import-select");
    input.setAttribute("type", "file");
    input.setAttribute("class", "m-import-select-input js-import-select-input");
    var label = document.createElement("label");
    label.setAttribute("tabindex", "1");
    label.setAttribute("for", "import-select");
    label.setAttribute("class", "m-import-select-label button button-icon button-large js-import-select-label");
    var labelText = document.createElement("span");
    labelText.textContent = "Select a file";
    labelText.setAttribute("class", "js-import-select-label-text");
    var icon = document.createElement("span");
    icon.setAttribute("class", "icon-file-upload js-import-select-label-icon");
    var message = document.createElement("p");
    message.setAttribute("class", "m-import-select-message");
    message.textContent = "Import a previously exported character JSON file from another device.";
    label.appendChild(icon);
    label.appendChild(labelText);
    importSelect.appendChild(input);
    importSelect.appendChild(label);
    importSelectWrapper.appendChild(importSelect);
    col.appendChild(message);
    col.appendChild(importSelectWrapper);
    row.appendChild(col);
    container.appendChild(row);
    input.addEventListener("change", _handleFiles, false);
    return container;
  };

  function _handleFiles() {
    var importSelectLabel = helper.e(".js-import-select-label");
    var importSelectLabelText = helper.e(".js-import-select-label-text");
    var importSelectLabelIcon = helper.e(".js-import-select-label-icon");
    var fileList = this.files;
    helper.removeClass(importSelectLabel, "m-import-select-label-ok");
    helper.removeClass(importSelectLabel, "m-import-select-label-error");
    helper.removeClass(importSelectLabelIcon, "icon-check");
    helper.removeClass(importSelectLabelIcon, "icon-error-outline");
    helper.addClass(importSelectLabelIcon, "icon-file-upload");
    // console.log(fileList);

    var readFile = new FileReader();
    readFile.onload = function(event) {
      if (helper.isJsonString(event.target.result)) {
        // console.log("JSON true");
        if (JSON.parse(event.target.result).awesomeSheet) {
          // console.log("awesome key true");
          importSelectLabelText.textContent = fileList[0].name;
          helper.addClass(importSelectLabel, "m-import-select-label-ok");
          helper.removeClass(importSelectLabel, "m-import-select-label-error");
          helper.removeClass(importSelectLabelIcon, "icon-file-upload");
          helper.removeClass(importSelectLabelIcon, "icon-error-outline");
          helper.addClass(importSelectLabelIcon, "icon-check");
        } else {
          // console.log("awesome key false");
          importSelectLabelText.textContent = "JSON file not recognised by awesomeSheet";
          helper.removeClass(importSelectLabel, "m-import-select-label-ok");
          helper.addClass(importSelectLabel, "m-import-select-label-error");
          helper.removeClass(importSelectLabelIcon, "icon-file-upload");
          helper.removeClass(importSelectLabelIcon, "icon-check");
          helper.addClass(importSelectLabelIcon, "icon-error-outline");
        };
      } else {
        // console.log("JSON false");
        importSelectLabelText.textContent = "Not a JSON file";
        helper.removeClass(importSelectLabel, "m-import-select-label-ok");
        helper.addClass(importSelectLabel, "m-import-select-label-error");
        helper.removeClass(importSelectLabelIcon, "icon-file-upload");
        helper.removeClass(importSelectLabelIcon, "icon-check");
        helper.addClass(importSelectLabelIcon, "icon-error-outline");
      };
    };
    if (fileList.length > 0) {
      readFile.readAsText(fileList.item(0));
      // console.log(readFile.result);
    } else {
      importSelectLabelText.textContent = "Select a file";
    };
  };

  var _readJsonFile = function() {
    var fileList = helper.e(".js-import-select-input").files;

    // if no JSON file is selected
    if (fileList.length <= 0) {
      snack.render("No file selected.", false, false);
      return false;
    };

    var readFile = new FileReader();
    readFile.onload = function(event) {
      // console.log(event);
      if (helper.isJsonString(event.target.result)) {
        var data = JSON.parse(event.target.result);
        if (data.awesomeSheet) {
          addCharacter(data);
          var name = allCharacters[getIndex()].basics.name || "New character";
          snack.render(helper.truncate(name, 40, true) + " imported and now in the game.", false, false);
        } else {
          snack.render("JSON file not recognised by awesomeSheet.", false, false);
        };
      } else {
        snack.render("Not a JSON file.", false, false);
      };
    };

    readFile.readAsText(fileList.item(0));
  };

  function importJson() {
    modal.render("Import character", _createImportModal(), "Import", _readJsonFile);
  };

  function exportJson() {
    var fileName;
    var characterName = getCharacter().basics.name;
    var classLevel = classes.getClassLevel(sheet.getCharacter());
    if (characterName != "") {
      fileName = characterName;
    } else {
      fileName = "New character";
    };
    if (classLevel != "") {
      fileName = fileName + ", " + classLevel;
    };
    prompt.render("Export " + characterName, "Download " + characterName + " as a JSON file. This file can later be imported on another deivce.", "Download", false, "data:" + "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(getCharacter()), null, " "), "download", fileName + ".json");
  };

  function render() {
    repair.render(getCharacter(getIndex()));
    stats.render();
    clone.render();
    classes.render();
    inputBlock.render();
    selectBlock.render();
    radioBlock.render();
    textareaBlock.render();
    skills.render();
    spells.render();
    encumbrance.render();
    size.render();
    xp.render();
    wealth.render();
    totalBlock.render();
    textBlock.render();
    characterImage.render();
    display.render();
  };

  function bind() {
    prompt.bind();
    modal.bind();
    snack.bind();
    stats.bind();
    inputBlock.bind();
    selectBlock.bind();
    radioBlock.bind();
    textareaBlock.bind();
    clone.bind();
    spells.bind();
    skills.bind();
    encumbrance.bind();
    size.bind();
    totalBlock.bind();
    display.bind();
    card.bind();
    tip.bind();
    events.bind();
    xp.bind();
    characterImage.bind();
    registerServiceWorker.bind();
  };

  function clear() {
    totalBlock.clear();
    clone.clear();
    textBlock.clear();
    inputBlock.clear();
    selectBlock.clear();
    radioBlock.clear();
    textareaBlock.clear();
    characterImage.clear();
    spells.clear();
    display.clear();
  };

  function switchCharacter(index) {
    if (index >= 0 && index <= getAllCharacters().length) {
      setIndex(index);
      clear();
      render();
      nav.clear();
      nav.render();
      var name = sheet.getCharacter().basics.name;
      snack.render(helper.truncate(name, 50, true) + " now in the game.", false);
      nav.close();
    } else {
      snack.render("No character with that index.", false);
    };
  };

  // exposed methods
  return {
    getAllCharacters: getAllCharacters,
    getCharacter: getCharacter,
    addCharacter: addCharacter,
    removeCharacter: removeCharacter,
    getIndex: getIndex,
    setIndex: setIndex,
    storeCharacters: storeCharacters,
    destroy: destroy,
    clear: clear,
    all: all,
    restore: restore,
    import: importJson,
    export: exportJson,
    render: render,
    bind: bind,
    switch: switchCharacter
  };

})();

var size = (function() {

  var changeSizeTimer = null;

  function bind(input) {
    var size = helper.e(".js-size");
    var selectBlockDropdown = size.querySelector(".js-select-block-dropdown");
    selectBlockDropdown.addEventListener("change", function() {
      clearTimeout(changeSizeTimer);
      changeSizeTimer = setTimeout(update, 300, this);
    }, false);
  };

  function update() {
    render();
    totalBlock.render();
    textBlock.render();
    if (display.state()) {
      display.clear();
      display.render();
    };
  };

  function render() {
    var size = helper.e(".js-size");
    var selectBlockDropdown = size.querySelector(".js-select-block-dropdown");
    var index = selectBlockDropdown.selectedIndex;
    var object = _create_sizeObject(index);
    helper.setObject(sheet.getCharacter(), "basics.size.size_modifier", object.size_modifier);
    helper.setObject(sheet.getCharacter(), "basics.size.special_size_modifier", object.special_size_modifier);
    helper.setObject(sheet.getCharacter(), "basics.size.size_modifier_fly", object.size_modifier_fly);
    helper.setObject(sheet.getCharacter(), "basics.size.size_modifier_stealth", object.size_modifier_stealth);
    sheet.storeCharacters();
  };

  function _create_sizeObject(index) {
    var allSize = {};
    var all_size_modifier = [0, 8, 4, 2, 1, 0, -1, -2, -4, -8];
    var all_special_size_modifier = [0, -8, -4, -2, -1, 0, 1, 2, 4, 8];
    var all_size_modifier_fly = [0, 8, 6, 4, 2, 0, -2, -4, -6, -8];
    var all_size_modifier_stealth = [0, 16, 12, 8, 4, 0, -4, -8, -12, -16];
    allSize.size_modifier = all_size_modifier[index];
    allSize.special_size_modifier = all_special_size_modifier[index];
    allSize.size_modifier_fly = all_size_modifier_fly[index];
    allSize.size_modifier_stealth = all_size_modifier_stealth[index];
    return allSize;
  };

  function _create_encumbranceObject(str) {};

  // exposed methods
  return {
    bind: bind,
    render: render
  };

})();

var skills = (function() {

  var renderTimer = null;

  function bind() {
    var skillSpentRanksInput = helper.e(".js-skill-spent-ranks-input");
    var all_inputBlockFieldRanks = helper.eA(".js-input-block-field-ranks");
    var skillSpentRanksTotal = helper.e(".js-skill-spent-ranks-total");
    skillSpentRanksInput.addEventListener("change", function() {
      _store(skillSpentRanksInput, skillSpentRanksInput.checked);
      _store(skillSpentRanksTotal, parseInt(skillSpentRanksTotal.innerHTML, 10) || 0);
      _render_rankTotal();
    }, false);
    for (var i = 0; i < all_inputBlockFieldRanks.length; i++) {
      all_inputBlockFieldRanks[i].addEventListener("input", function() {
        clearTimeout(renderTimer);
        renderTimer = setTimeout(function() {
          _store(skillSpentRanksTotal, parseInt(skillSpentRanksTotal.innerHTML, 10) || 0);
          _render_rankTotal();
        }, 400, this);
      }, false);
    };
  };

  function _store(element, value) {
    var path = element.dataset.path;
    helper.setObject(sheet.getCharacter(), path, value);
    sheet.storeCharacters();
  };

  function render() {
    _render_includeCustomToggle();
    _render_rankTotal();
  };

  function _render_includeCustomToggle(argument) {
    var skillSpentRanksInput = helper.e(".js-skill-spent-ranks-input");
    var path = skillSpentRanksInput.dataset.path;
    var state = helper.getObject(sheet.getCharacter(), path);
    skillSpentRanksInput.checked = state;
  };

  function _render_rankTotal() {
    var all_skills = helper.getObject(sheet.getCharacter(), "skills");
    var all_customSkills = helper.getObject(sheet.getCharacter(), "skills.custom");
    var skillSpentRanksTotal = helper.e(".js-skill-spent-ranks-total");
    var ranks = [];
    var ranksTotal;
    for (var i in all_skills) {
      ranks.push(parseInt(all_skills[i].ranks, 10) || 0);
    };
    if (helper.getObject(sheet.getCharacter(), "skills.ranks.spent.include_custom")) {
      for (var i = 0; i < all_customSkills.length; i++) {
        ranks.push(parseInt(all_customSkills[i].ranks, 10) || 0);
      };
    };
    ranksTotal = ranks.reduce(function(a, b) {
      return a + b;
    });
    skillSpentRanksTotal.textContent = ranksTotal;
  };

  // exposed methods
  return {
    bind: bind,
    render: render
  };

})();

var snack = (function() {

  var previousSnackBar = null;

  function destroy() {
    var all_snackBar = helper.eA(".js-snack-bar");
    for (var i = 0; i < all_snackBar.length; i++) {
      all_snackBar[i].destroy();
    };
  };

  function render(message, actionText, action, destroyDelay, postSnack) {

    var body = helper.e("body");

    var snackBar = document.createElement("aside");
    snackBar.setAttribute("class", "m-snack-bar js-snack-bar");
    snackBar.destroy = function() {
      helper.addClass(snackBar, "is-transparent");
    };
    var text = document.createElement("p");
    text.setAttribute("class", "m-snack-bar-message");
    text.textContent = (message);
    snackBar.appendChild(text);

    if (actionText) {
      var destroyAction = snackBar.destroy.bind(snackBar);
      var actionButton = document.createElement("a");
      actionButton.setAttribute("class", "button button-medium button-tertiary m-snack-bar-button");
      if (typeof actionText == "boolean") {
        helper.addClass(actionButton, "button-icon");
        var icon = document.createElement("span");
        icon.setAttribute("class", "icon icon-close");
        actionButton.appendChild(icon);
      } else if (typeof actionText == "string") {
        actionButton.textContent = actionText;
      };
      actionButton.addEventListener("click", destroyAction);
      snackBar.appendChild(actionButton);
    };
    if (action) {
      actionButton.addEventListener("click", function(event) {
        event.stopPropagation();
        event.preventDefault();
        action();
      }, false);
    };

    snackBar.addEventListener("transitionend", function(event, elapsed) {
      if (event.propertyName === "opacity" && this.style.opacity == 0) {
        this.parentElement.removeChild(this);
        _checkBodyForSnack();
        if (postSnack) {
          postSnack();
        };
      };
    }.bind(snackBar), false);

    if (previousSnackBar) {
      previousSnackBar.destroy();
    };

    previousSnackBar = snackBar;

    setTimeout(function() {
      if (previousSnackBar === this) {
        previousSnackBar.destroy();
      };
    }.bind(snackBar), destroyDelay || 4000);

    body.appendChild(snackBar);
    getComputedStyle(snackBar).opacity;
    getComputedStyle(snackBar).transform;
    getComputedStyle(snackBar).margin;
    helper.addClass(snackBar, "is-reveal");
    _checkBodyForSnack();

  };

  function bind() {
    window.addEventListener("keydown", function(event) {
      if (event.keyCode == 27) {
        destroy();
      };
    }, false);
  };

  function _checkBodyForSnack() {
    var body = helper.e("body");
    var snackBar = helper.e(".js-snack-bar");
    if (snackBar) {
      helper.addClass(body, "is-onscreen-snack");
    } else {
      helper.removeClass(body, "is-onscreen-snack");
    };
  };

  // exposed methods
  return {
    bind: bind,
    destroy: destroy,
    render: render
  };

})();

var spells = (function() {

  function bind() {
    var spellPrepareButton = helper.e(".js-spell-prepare");
    var spellUnprepareButton = helper.e(".js-spell-unprepare");
    var spellCastButton = helper.e(".js-spell-cast");
    var spellActiveButton = helper.e(".js-spell-active");
    var spellRemoveButton = helper.e(".js-spell-remove");
    var spellReset = helper.e(".js-spell-reset");
    var spellSort = helper.e(".js-spell-sort");
    var all_newSpellAdd = helper.eA(".js-new-spell-add");
    for (var i = 0; i < all_newSpellAdd.length; i++) {
      var spellBook = helper.getClosest(all_newSpellAdd[i], ".js-spell-book");
      var newSpellField = spellBook.querySelector(".js-new-spell-field");
      all_newSpellAdd[i].addEventListener("click", function() {
        _addNewSpell(helper.getClosest(this, ".js-spell-book").querySelector(".js-new-spell-field"));
        sheet.storeCharacters();
      }, false);
      newSpellField.addEventListener("keypress", function() {
        _addNewSpellOnEnter(this);
        sheet.storeCharacters();
      }, false);
    };
    spellPrepareButton.addEventListener("click", function() {
      _change_spellState(this);
    }, false);
    spellUnprepareButton.addEventListener("click", function() {
      _change_spellState(this);
    }, false);
    spellCastButton.addEventListener("click", function() {
      _change_spellState(this);
    }, false);
    spellActiveButton.addEventListener("click", function() {
      _change_spellState(this);
    }, false);
    spellRemoveButton.addEventListener("click", function() {
      _change_spellState(this);
    }, false);
    spellReset.addEventListener("click", function() {
      prompt.render("Reset all spells?", "All prepared, cast and active spells will be set to normal states.", "Reset", _resetAllSpells);
    }, false);
    spellSort.addEventListener("click", function() {
      prompt.render("Sort Spells", "Sort all Spells in alphabetical order?", "Sort", _sortAllSpells);
    }, false);
  };

  function _resetAllSpells() {
    var all_spells = helper.eA(".js-spell");
    if (all_spells.length > 0) {
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
      clear();
      render();
      sheet.storeCharacters();
      snack.render("All spells reset.");
    };
  };

  function _sortAllSpells() {
    for (var i in sheet.getCharacter().spells.book) {
      for (var j in sheet.getCharacter().spells.book[i]) {
        helper.sortObject(sheet.getCharacter().spells.book[i][j], "name");
      };
    };
    sheet.storeCharacters();
    clear();
    render();
    snack.render("All spells alphabetically sorted.");
  };

  function _addNewSpell(element) {
    var spellLevel = helper.getClosest(element, ".js-spell-book").dataset.spellLevel;
    var spellName = element.value;
    var newSpell = new _create_spellObject(spellName, 0, false, 0);
    // if input value is not empty
    if (spellName !== "") {
      // add spell to current character known spells
      sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel].push(newSpell);
      var newSpellIndex = sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel].length - 1;
      _render_spell(sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][newSpellIndex], spellLevel, newSpellIndex);
      // clear input field
      element.value = "";
    };
  };

  function _addNewSpellOnEnter(element) {
    var keystroke = event.keyCode || event.which;
    if (keystroke == 13) {
      _addNewSpell(element);
    };
  };

  function _bind_spellKnownItem(element) {
    element.addEventListener("click", function() {
      _update_spellObject(this);
      _update_spellButton(this);
      _update_spellControls(this);
      _checkSpellState();
      _castFireball(this);
    }, false);
  };

  function _castFireball(button) {
    var spellLevel = parseInt(button.dataset.spellLevel, 10);
    var spellCount = parseInt(button.dataset.spellCount, 10);
    var spellRoot = helper.getClosest(button, ".js-spells") || helper.e(".js-spells");
    var spellState = spellRoot.dataset.spellState;
    var spellObject = sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount];

    if (spellState == "cast") {
      var fireballName = ["Fireball", "fireball", "Fire ball", "fire Ball", "fire ball", "Fire Ball", "FIREBALL", "FIREBALL!", "FIREBALL!!", "FIREBALL!!!", "FIREBALL!!!!"];
      if (fireballName.indexOf(spellObject.name) > -1) {
        // easter egg fireball!
        fireball.render();
      };
    };

  };

  function _update_spellControls(button, force) {

    var spellLevel = parseInt(button.dataset.spellLevel, 10);
    var spellCount = parseInt(button.dataset.spellCount, 10);
    var spellRoot = helper.getClosest(button, ".js-spells") || helper.e(".js-spells");
    var spellState = spellRoot.dataset.spellState;
    var spellObject = sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount];

    function _render_count(spellControl) {
      var currentPreparedCount = parseInt(spellControl.dataset.spellPrepared, 10);
      var currentCastCount = parseInt(spellControl.dataset.spellCast, 10);
      var spellControlPreparedCount = spellControl.querySelector(".js-spell-control-prepared-count");
      var spellControlCastCount = spellControl.querySelector(".js-spell-control-cast-count");
      spellControlPreparedCount.textContent = currentPreparedCount;
      spellControlCastCount.textContent = currentCastCount;
    };

    function _store_data(spellControl, action, type) {
      var newCount;
      var currentActive = spellControl.dataset.spellActive;
      var currentPreparedCount = parseInt(spellControl.dataset.spellPrepared, 10);
      var currentCastCount = parseInt(spellControl.dataset.spellCast, 10);
      if (type == "prepared") {
        if (action == "plus" && currentPreparedCount < 50) {
          spellControl.dataset.spellPrepared = currentPreparedCount + 1;
        } else if (action == "minus" && currentPreparedCount > 0) {
          spellControl.dataset.spellPrepared = currentPreparedCount - 1;
        } else if (action == "clear" && currentPreparedCount > 0) {
          spellControl.dataset.spellPrepared = 0;
        };
        if (parseInt(spellControl.dataset.spellCast, 10) > parseInt(spellControl.dataset.spellPrepared, 10)) {
          spellControl.dataset.spellCast = parseInt(spellControl.dataset.spellPrepared, 10);
        };
      };
      if (type == "cast") {
        if (action == "plus" && currentCastCount < 50) {
          spellControl.dataset.spellCast = currentCastCount + 1;
        } else if (action == "minus" && currentCastCount > 0) {
          spellControl.dataset.spellCast = currentCastCount - 1;
        } else if (action == "clear" && currentCastCount > 0) {
          spellControl.dataset.spellCast = 0;
        };
        if (parseInt(spellControl.dataset.spellPrepared, 10) < parseInt(spellControl.dataset.spellCast, 10)) {
          spellControl.dataset.spellPrepared = parseInt(spellControl.dataset.spellCast, 10);
        };
      };
      if (type == "active" && action == "toggle") {
        if (currentActive == "true") {
          spellControl.dataset.spellActive = false;
        } else {
          spellControl.dataset.spellActive = true;
        };
      };
    };

    function _update_spellObject(spellControl) {
      var spellLevel = parseInt(spellControl.dataset.spellLevel, 10);
      var spellCount = parseInt(spellControl.dataset.spellCount, 10);
      var spellObject = sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount];
      if (spellControl.dataset.spellActive == "true") {
        spellObject.active = true;
      } else {
        spellObject.active = false;
      };
      spellObject.prepared = parseInt(spellControl.dataset.spellPrepared, 10);
      spellObject.cast = parseInt(spellControl.dataset.spellCast, 10);
      spellObject.name = spellControl.querySelector(".js-spell-control-input-name").value;
      spellObject.note = spellControl.querySelector(".js-spell-control-textarea-note").innerHTML;
      if (spellObject.note == " " || spellObject.note == "&nbsp;" || spellObject.note == "<br/>" || spellObject.note == "<br>") {
        spellObject.note = "";
      };
    };

    function _create_editBoxItem(size, child) {
      var editBoxItem = document.createElement("div");
      editBoxItem.setAttribute("class", "m-edit-box-item-" + size);
      if (child) {
        editBoxItem.appendChild(child);
      };
      return editBoxItem;
    };

    function _create_spellControlModal() {
      var spellControl = document.createElement("div");
      spellControl.setAttribute("class", "m-spell-control js-spell-control");
      spellControl.setAttribute("data-spell-level", spellLevel);
      spellControl.setAttribute("data-spell-count", spellCount);
      spellControl.setAttribute("data-spell-name", spellObject.name);
      spellControl.setAttribute("data-spell-active", spellObject.active);
      spellControl.setAttribute("data-spell-prepared", spellObject.prepared);
      spellControl.setAttribute("data-spell-cast", spellObject.cast);

      var nameEditBox = document.createElement("div");
      nameEditBox.setAttribute("class", "m-edit-box m-edit-box-indent m-edit-box-head-small");
      var nameEditBoxHead = document.createElement("div");
      nameEditBoxHead.setAttribute("class", "m-edit-box-head");
      var nameEditBoxHeadTitle = document.createElement("h2");
      nameEditBoxHeadTitle.setAttribute("class", "m-edit-box-title");
      nameEditBoxHeadTitle.textContent = "Name";
      var nameEditBoxBody = document.createElement("div");
      nameEditBoxBody.setAttribute("class", "m-edit-box-body");
      var nameEditBoxContent = document.createElement("div");
      nameEditBoxContent.setAttribute("class", "m-edit-box-content m-edit-box-content-margin-large m-edit-box-content-nowrap");
      var nameEditBoxBodyInput = document.createElement("input");
      nameEditBoxBodyInput.setAttribute("class", "js-spell-control-input-name");
      nameEditBoxBodyInput.setAttribute("type", "text");
      nameEditBoxBodyInput.setAttribute("tabindex", "1");
      nameEditBoxBodyInput.value = spellObject.name;

      nameEditBoxContent.appendChild(_create_editBoxItem("max", nameEditBoxBodyInput));
      nameEditBoxBody.appendChild(nameEditBoxContent);
      nameEditBoxHead.appendChild(nameEditBoxHeadTitle);
      nameEditBox.appendChild(nameEditBoxHead);
      nameEditBox.appendChild(nameEditBoxBody);

      var preparedEditBox = document.createElement("div");
      preparedEditBox.setAttribute("class", "m-edit-box m-edit-box-indent m-edit-box-head-small");
      var preparedEditBoxHead = document.createElement("div");
      preparedEditBoxHead.setAttribute("class", "m-edit-box-head");
      var preparedEditBoxHeadTitle = document.createElement("h2");
      preparedEditBoxHeadTitle.setAttribute("class", "m-edit-box-title");
      preparedEditBoxHeadTitle.textContent = "Prepared";
      var preparedEditBoxBody = document.createElement("div");
      preparedEditBoxBody.setAttribute("class", "m-edit-box-body");
      var preparedEditBoxContent = document.createElement("div");
      preparedEditBoxContent.setAttribute("class", "m-edit-box-content m-edit-box-content-margin-large m-edit-box-content-nowrap");
      var preparedEditBoxGroup = document.createElement("div");
      preparedEditBoxGroup.setAttribute("class", "m-edit-box-item m-edit-box-group-control-set");
      var preparedCount = document.createElement("p");
      preparedCount.setAttribute("class", "m-edit-box-total js-spell-control-prepared-count");
      preparedCount.textContent = spellObject.prepared;
      var preparedPlus = document.createElement("button");
      preparedPlus.setAttribute("class", "u-inline-with-input button button-large button-thin button-icon");
      preparedPlus.setAttribute("tabindex", "1");
      var preparedPlusIcon = document.createElement("span");
      preparedPlusIcon.setAttribute("class", "icon-add");
      preparedPlus.addEventListener("click", function() {
        _store_data(spellControl, "plus", "prepared");
        _render_count(spellControl);
      }, false);
      var preparedMinus = document.createElement("button");
      preparedMinus.setAttribute("class", "u-inline-with-input button button-large button-thin button-icon");
      preparedMinus.setAttribute("tabindex", "1");
      var preparedMinusIcon = document.createElement("span");
      preparedMinusIcon.setAttribute("class", "icon-remove");
      preparedMinus.addEventListener("click", function() {
        _store_data(spellControl, "minus", "prepared");
        _render_count(spellControl);
      }, false);
      var preparedClear = document.createElement("button");
      preparedClear.setAttribute("class", "u-inline-with-input button button-large button-thin button-icon");
      preparedClear.setAttribute("tabindex", "1");
      var preparedClearIcon = document.createElement("span");
      preparedClearIcon.setAttribute("class", "icon-close");
      preparedClear.addEventListener("click", function() {
        _store_data(spellControl, "clear", "prepared");
        _render_count(spellControl);
      }, false);

      preparedMinus.appendChild(preparedMinusIcon);
      preparedPlus.appendChild(preparedPlusIcon);
      preparedClear.appendChild(preparedClearIcon);

      preparedEditBoxGroup.appendChild(_create_editBoxItem("button-large", preparedMinus));
      preparedEditBoxGroup.appendChild(_create_editBoxItem("max", preparedCount));
      preparedEditBoxGroup.appendChild(_create_editBoxItem("button-large", preparedPlus));
      preparedEditBoxContent.appendChild(preparedEditBoxGroup);
      preparedEditBoxContent.appendChild(_create_editBoxItem("button-large", preparedClear));
      preparedEditBoxBody.appendChild(preparedEditBoxContent);
      preparedEditBoxHead.appendChild(preparedEditBoxHeadTitle);
      preparedEditBox.appendChild(preparedEditBoxHead);
      preparedEditBox.appendChild(preparedEditBoxBody);

      var castEditBox = document.createElement("div");
      castEditBox.setAttribute("class", "m-edit-box m-edit-box-indent m-edit-box-head-small");
      var castEditBoxHead = document.createElement("div");
      castEditBoxHead.setAttribute("class", "m-edit-box-head");
      var castEditBoxHeadTitle = document.createElement("h2");
      castEditBoxHeadTitle.setAttribute("class", "m-edit-box-title");
      castEditBoxHeadTitle.textContent = "Cast";
      var castEditBoxBody = document.createElement("div");
      castEditBoxBody.setAttribute("class", "m-edit-box-body");
      var castEditBoxContent = document.createElement("div");
      castEditBoxContent.setAttribute("class", "m-edit-box-content m-edit-box-content-margin-large m-edit-box-content-nowrap");
      var castEditBoxGroup = document.createElement("div");
      castEditBoxGroup.setAttribute("class", "m-edit-box-item m-edit-box-group-control-set");
      var castCount = document.createElement("p");
      castCount.setAttribute("class", "m-edit-box-total js-spell-control-cast-count");
      castCount.textContent = spellObject.cast;
      var castPlus = document.createElement("button");
      castPlus.setAttribute("class", "u-inline-with-input button button-large button-thin button-icon");
      castPlus.setAttribute("tabindex", "1");
      var castPlusIcon = document.createElement("span");
      castPlusIcon.setAttribute("class", "icon-add");
      castPlus.addEventListener("click", function() {
        _store_data(spellControl, "plus", "cast");
        _render_count(spellControl);
      }, false);
      var castMinus = document.createElement("button");
      castMinus.setAttribute("class", "u-inline-with-input button button-large button-thin button-icon");
      castMinus.setAttribute("tabindex", "1");
      var castMinusIcon = document.createElement("span");
      castMinusIcon.setAttribute("class", "icon-remove");
      castMinus.addEventListener("click", function() {
        _store_data(spellControl, "minus", "cast");
        _render_count(spellControl);
      }, false);
      var castClear = document.createElement("button");
      castClear.setAttribute("class", "u-inline-with-input button button-large button-thin button-icon");
      castClear.setAttribute("tabindex", "1");
      var castClearIcon = document.createElement("span");
      castClearIcon.setAttribute("class", "icon-close");
      castClear.addEventListener("click", function() {
        _store_data(spellControl, "clear", "cast");
        _render_count(spellControl);
      }, false);

      castMinus.appendChild(castMinusIcon);
      castPlus.appendChild(castPlusIcon);
      castClear.appendChild(castClearIcon);

      castEditBoxGroup.appendChild(_create_editBoxItem("button-large", castMinus));
      castEditBoxGroup.appendChild(_create_editBoxItem("max", castCount));
      castEditBoxGroup.appendChild(_create_editBoxItem("button-large", castPlus));
      castEditBoxContent.appendChild(castEditBoxGroup);
      castEditBoxContent.appendChild(_create_editBoxItem("button-large", castClear));
      castEditBoxBody.appendChild(castEditBoxContent);
      castEditBoxHead.appendChild(castEditBoxHeadTitle);
      castEditBox.appendChild(castEditBoxHead);
      castEditBox.appendChild(castEditBoxBody);

      var activeEditBox = document.createElement("div");
      activeEditBox.setAttribute("class", "m-edit-box m-edit-box-indent m-edit-box-head-small");
      var activeEditBoxHead = document.createElement("div");
      activeEditBoxHead.setAttribute("class", "m-edit-box-head");
      var activeEditBoxHeadTitle = document.createElement("h2");
      activeEditBoxHeadTitle.setAttribute("class", "m-edit-box-title");
      activeEditBoxHeadTitle.textContent = "Active";
      var activeEditBoxBody = document.createElement("div");
      activeEditBoxBody.setAttribute("class", "m-edit-box-body");
      var activeEditBoxContent = document.createElement("div");
      activeEditBoxContent.setAttribute("class", "m-edit-box-content m-edit-box-content-margin-large m-edit-box-content-nowrap");
      var activeCheck = document.createElement("div");
      activeCheck.setAttribute("class", "m-check-block");
      var activeInput = document.createElement("input");
      activeInput.setAttribute("type", "checkbox");
      activeInput.setAttribute("id", "spell-active");
      activeInput.setAttribute("class", "m-check-block-check js-spell-control-active");
      activeInput.setAttribute("tabindex", "1");
      activeInput.checked = spellObject.active;
      activeInput.addEventListener("change", function() {
        _store_data(spellControl, "toggle", "active");
        _render_count(spellControl);
      }, false);
      var activeIcon = document.createElement("span");
      activeIcon.setAttribute("class", "m-check-block-check-icon");

      activeCheck.appendChild(activeInput);
      activeCheck.appendChild(activeIcon);
      activeEditBoxContent.appendChild(_create_editBoxItem("button-large", activeCheck));
      activeEditBoxBody.appendChild(activeEditBoxContent);
      activeEditBoxHead.appendChild(activeEditBoxHeadTitle);
      activeEditBox.appendChild(activeEditBoxHead);
      activeEditBox.appendChild(activeEditBoxBody);

      var noteEditBox = document.createElement("div");
      noteEditBox.setAttribute("class", "m-edit-box m-edit-box-indent m-edit-box-head-small");
      var noteEditBoxHead = document.createElement("div");
      noteEditBoxHead.setAttribute("class", "m-edit-box-head");
      var noteEditBoxHeadTitle = document.createElement("h2");
      noteEditBoxHeadTitle.setAttribute("class", "m-edit-box-title");
      noteEditBoxHeadTitle.textContent = "Spell Notes";
      var noteEditBoxBody = document.createElement("div");
      noteEditBoxBody.setAttribute("class", "m-edit-box-body");
      var noteEditBoxContent = document.createElement("div");
      noteEditBoxContent.setAttribute("class", "m-edit-box-content m-edit-box-content-margin-large m-edit-box-content-nowrap");
      var noteTextarea = document.createElement("div");
      noteTextarea.setAttribute("class", "m-textarea-block-field textarea textarea-large u-full-width js-spell-control-textarea-note");
      noteTextarea.setAttribute("contenteditable", "true");
      noteTextarea.setAttribute("tabindex", "1");
      noteTextarea.innerHTML = spellObject.note;
      noteTextarea.addEventListener("paste", function(event) {
        helper.pasteStrip(event);
      });

      noteEditBoxContent.appendChild(_create_editBoxItem("max", noteTextarea));
      noteEditBoxBody.appendChild(noteEditBoxContent);
      noteEditBoxHead.appendChild(noteEditBoxHeadTitle);
      noteEditBox.appendChild(noteEditBoxHead);
      noteEditBox.appendChild(noteEditBoxBody);

      spellControl.appendChild(nameEditBox);
      spellControl.appendChild(preparedEditBox);
      spellControl.appendChild(castEditBox);
      spellControl.appendChild(activeEditBox);
      spellControl.appendChild(noteEditBox);

      return spellControl;
    };

    if (spellState == "false" || force) {
      var modalContent = _create_spellControlModal();

      modal.render(spellObject.name, modalContent, "Save", function() {
        var spellSection = helper.e(".js-section-spells");
        _update_spellObject(this);
        _update_spellButton(button, true);
        sheet.storeCharacters();
        display.clear(spellSection);
        display.render(spellSection);
      }.bind(modalContent));
    };

  };

  function _update_spellButton(button, force) {
    var spellLevel = parseInt(button.dataset.spellLevel, 10);
    var spellCount = parseInt(button.dataset.spellCount, 10);
    var spellRoot = helper.getClosest(button, ".js-spells") || helper.e(".js-spells");
    var spellName = button.querySelector(".js-spell-name");
    var spellMarks = button.querySelector(".js-spell-marks");
    var spellActive = button.querySelector(".js-spell-active");
    var spellState = spellRoot.dataset.spellState;
    var spellObject = sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount];
    if (spellState == "prepare" || spellState == "unprepare" || spellState == "cast" || spellState == "active" || force) {
      if (spellMarks.lastChild) {
        while (spellMarks.lastChild) {
          spellMarks.removeChild(spellMarks.lastChild);
        };
      };
      if (spellActive.lastChild) {
        while (spellActive.lastChild) {
          spellActive.removeChild(spellActive.lastChild);
        };
      };
      if (spellObject.prepared > 0) {
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
        if (spellObject.active) {
          spellActive.appendChild(activeIcon);
        };
      };
      spellName.textContent = spellObject.name;
    } else if (spellState == "remove") {
      _destroy_spellBook(spellLevel);
      _render_all_spells(sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel], spellLevel);
    };
  };

  function _update_spellObject(button) {
    var spellRoot = helper.getClosest(button, ".js-spells");
    var spellState = spellRoot.dataset.spellState;
    var spellLevel = parseInt(button.dataset.spellLevel, 10);
    var spellCount = parseInt(button.dataset.spellCount, 10);
    if (spellState == "prepare") {
      if (sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].prepared < 50) {
        sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].prepared++;
      };
      // console.log(sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount]);
    } else if (spellState == "unprepare") {
      if (sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].prepared > 0) {
        sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].prepared--;
      };
      if (sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].prepared < sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].cast) {
        sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].cast = sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].prepared;
      };
      // console.log(sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount]);
    } else if (spellState == "cast") {
      if (sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].cast < 50) {
        sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].cast++;
      };
      if (sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].cast > sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].prepared) {
        sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].prepared = sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount].cast;
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
      _store_lastRemovedSpell(spellLevel, spellCount, sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount]);
      sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel].splice(spellCount, 1);
      snack.render(helper.truncate(spellName, 40, true) + " removed.", "Undo", _restore_lastRemovedSpell, 8000);
    };
    // console.log(sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel][spellCount]);
    sheet.storeCharacters();
  };

  function _store_lastRemovedSpell(spellLevel, spellCount, spell) {
    var object = {
      spellLevel: spellLevel,
      spellCount: spellCount,
      spell: spell
    };
    helper.store("lastRemovedSpell", JSON.stringify(object));
  };

  function _remove_lastRemovedSpell() {
    helper.remove("lastRemovedSpell");
  };

  function _restore_lastRemovedSpell() {
    var undoData = JSON.parse(helper.read("lastRemovedSpell"));
    _restore_spellObject(undoData.spellLevel, undoData.spellCount, undoData.spell);
    _remove_lastRemovedSpell();
    _checkSpellState();
  };

  function _restore_spellObject(spellLevel, spellCount, spell) {
    sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel].splice(spellCount, 0, spell);
    _destroy_spellBook(spellLevel);
    _render_all_spells(sheet.getCharacter().spells.book[spellLevel]["level_" + spellLevel], spellLevel);
    sheet.storeCharacters();
  };

  function _change_spellState(button) {
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

    var _normalStateSpellItems = function() {
      for (var i = 0; i < all_spellBookItem.length; i++) {
        helper.removeClass(all_spellBookItem[i], "button-primary");
        helper.removeClass(all_spellBookItem[i], "button-secondary");
      };
    };

    var _activeStateSpellItems = function() {
      for (var i = 0; i < all_spellBookItem.length; i++) {
        helper.addClass(all_spellBookItem[i], "button-secondary");
      };
    };

    var _remove_stateSpellItems = function() {
      for (var i = 0; i < all_spellBookItem.length; i++) {
        helper.addClass(all_spellBookItem[i], "button-primary");
      };
    };

    var _reset_allControls = function() {
      for (var i = 0; i < all_spellStateControls.length; i++) {
        helper.removeClass(all_spellStateControls[i], "is-live");
      };
    };

    // change spell state
    if (spellsFound) {
      if (button.dataset.state != spellRoot.dataset.spellState) {
        spellRoot.dataset.spellState = button.dataset.state;
        _reset_allControls();
        if (button.dataset.state == "prepare" || button.dataset.state == "unprepare" || button.dataset.state == "cast" || button.dataset.state == "active") {
          helper.addClass(button, "is-live");
        };
      } else {
        spellRoot.dataset.spellState = false;
        _reset_allControls();
      };
    };

    // change spells to reflect state
    if (spellRoot.dataset.spellState == "remove") {
      _normalStateSpellItems();
      _remove_stateSpellItems();
      helper.addClass(spellRoot, "is-state-remove");
      helper.addClass(spellRemoveButton, "button-primary");
      helper.removeClass(spellRemoveButton, "button-secondary");
    } else if (spellRoot.dataset.spellState != "false") {
      _activeStateSpellItems();
      helper.removeClass(spellRoot, "is-state-remove");
      helper.removeClass(spellRemoveButton, "button-primary");
      helper.addClass(spellRemoveButton, "button-secondary");
    } else {
      _normalStateSpellItems();
      helper.removeClass(spellRoot, "is-state-remove");
      helper.removeClass(spellRemoveButton, "button-primary");
      helper.addClass(spellRemoveButton, "button-secondary");
    };
  };

  function _checkSpellState() {
    var spellRoot = helper.e(".js-spells");
    var all_spellStateControls = spellRoot.querySelectorAll(".js-spell-state-control");
    var all_spellBookItem = helper.eA(".js-spell");
    var spellRemoveButton = helper.e(".js-spell-remove");
    if (all_spellBookItem.length == 0) {
      helper.removeClass(spellRoot, "is-state-remove");
      for (var i = 0; i < all_spellStateControls.length; i++) {
        helper.removeClass(all_spellStateControls[i], "is-live");
        helper.removeClass(spellRemoveButton, "button-primary");
        helper.addClass(spellRemoveButton, "button-secondary");
      };
      spellRoot.dataset.spellState = "false";
    };
  };

  function _create_spellObject(spellName, spellPrepared, spellActive, spellCast, spellNote) {
    return {
      name: this.name = spellName || "",
      prepared: this.prepared = spellPrepared || 0,
      active: this.active = spellActive || false,
      cast: this.cast = spellCast || 0,
      note: this.note = spellNote || ""
    };
  };

  function delayUpdate() {
    var spellRoot = helper.e(".js-spells");
    var spellState = spellRoot.dataset.spellState;
    if (spellState == "prepare" || spellState == "unprepare" || spellState == "cast" || spellState == "active" || spellState == "remove") {
      sheet.storeCharacters();
    };
    if (display.state()) {
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
          _render_all_spells(spellsToRender, i);
        };
      };
    };
  };

  function _render_all_spells(array, level) {
    // console.log(array, level);
    // read spells and add them to spell lists
    for (var i = 0; i < array.length; i++) {
      var spellObject = array[i];
      var spellButtonCol = document.createElement("div");
      spellButtonCol.setAttribute("class", "m-spell-col js-spell-col");
      // find spell list to add too
      var knownListToSaveTo = helper.e(".js-spell-book-known-level-" + level);
      // append new spell to spell list
      var spellButton = _create_spellButton(spellObject, level, i);
      spellButtonCol.appendChild(spellButton);
      knownListToSaveTo.appendChild(spellButtonCol);
      _bind_spellKnownItem(spellButton);
    };
  };

  function _render_spell(spellObject, level, spellIndex) {
    // read spell and add them to spell lists
    var spellButtonCol = document.createElement("div");
    spellButtonCol.setAttribute("class", "m-spell-col js-spell-col");
    // find spell list to add too
    var knownListToSaveTo = helper.e(".js-spell-book-known-level-" + level);
    // append new spell to spell list
    var spellButton = _create_spellButton(spellObject, level, spellIndex, true);
    spellButtonCol.appendChild(spellButton);
    knownListToSaveTo.appendChild(spellButtonCol);
    _bind_spellKnownItem(spellButton);
  };

  function _create_spellButton(spellObject, level, index, newSpell) {
    var spellRoot = helper.e(".js-spells");
    var spellButton = document.createElement("button");
    spellButton.setAttribute("data-spell-level", level);
    spellButton.setAttribute("data-spell-count", index);
    spellButton.setAttribute("class", "m-spell button button-medium js-spell");
    spellButton.setAttribute("type", "button");
    spellButton.setAttribute("tabindex", "1");
    if (spellRoot.dataset.spellState == "remove") {
      helper.addClass(spellButton, "button-primary");
    };
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
    if (newSpell) {
      var newSpellFlash = document.createElement("span");
      newSpellFlash.setAttribute("class", "m-spell-flash");
      newSpellFlash.addEventListener("animationend", function(event, elapsed) {
        this.remove();
      }.bind(newSpellFlash), false);
      spellButton.appendChild(newSpellFlash);
    };
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
    render: render,
    update: _update_spellControls
  };

})();

var stats = (function() {

  function render() {
    var stats = helper.eA(".js-stats");
    for (var i = 0; i < stats.length; i++) {
      _render_stat(stats[i]);
      _render_modifer(stats[i]);
    };
  };

  function _render_stat(element) {
    var path = element.dataset.path;
    var totalObject = helper.getObject(sheet.getCharacter(), path);
    var grandTotal;
    var toSum = [];
    for (var key in totalObject) {
      if (key == "base" || key == "enhancement" || key == "misc" || key == "racial" || key == "temp") {
        if (totalObject[key] != "") {
          toSum.push(totalObject[key]);
        };
      };
    };
    if (toSum.length > 0) {
      grandTotal = toSum.reduce(function(a, b) {
        return a + b;
      });
    } else {
      grandTotal = 0;
    };
    path = path + ".current";
    helper.setObject(sheet.getCharacter(), path, grandTotal);
  };

  function _render_modifer(element) {
    var path = element.dataset.path + ".current";
    var modifierPath = element.dataset.path + ".modifier";
    var modifier = _calculateModifer(helper.getObject(sheet.getCharacter(), path));
    helper.setObject(sheet.getCharacter(), modifierPath, modifier);
  };

  function _calculateModifer(value) {
    var modifier = Math.floor((parseInt(value, 10) - 10) / 2);
    if (isNaN(modifier)) {
      modifier = "";
    };
    return modifier;
  };

  var renderTimer = null;

  function delayUpdate(element) {
    _render_stat(element);
    _render_modifer(element);
    encumbrance.render();
    classes.render();
    textBlock.render();
    totalBlock.render();
    if (display.state()) {
      display.clear();
      display.render();
    };
  };

  function bind() {
    _bind_all_statField();
  };

  function _bind_all_statField() {
    var all_statsField = helper.eA(".js-stats-field");
    for (var i = 0; i < all_statsField.length; i++) {
      all_statsField[i].addEventListener("input", function() {
        clearTimeout(renderTimer);
        renderTimer = setTimeout(delayUpdate, 350, helper.getClosest(this, ".js-stats"));
      }, false);
    };
  };

  function get_score(key) {
    var value = 0;
    if (sheet.getCharacter().statistics.stats[key].current != "") {
      value = sheet.getCharacter().statistics.stats[key].current;
    };
    return value;
  };

  function get_mod(key) {
    var value = 0;
    if (sheet.getCharacter().statistics.stats[key].modifier != "") {
      value = sheet.getCharacter().statistics.stats[key].modifier;
    };
    return value;
  };

  // exposed methods
  return {
    render: render,
    bind: bind,
    getMod: get_mod,
    getScore: get_score,
  };

})();

var tabs = (function() {

  function bind() {
    _bind_tabGroup();
    _bind_tabArrow();
  };

  function _bind_tabGroup() {
    var all_tabGroups = helper.eA(".js-tab-group");
    for (var i = 0; i < all_tabGroups.length; i++) {
      var all_tabItem = all_tabGroups[i].querySelectorAll(".js-tab-item");
      for (var j = 0; j < all_tabItem.length; j++) {
        all_tabItem[j].addEventListener("click", function() {
          _switchTabPanel(this);
        }, false);
      };
    };
  };

  function _bind_tabArrow() {
    var all_tabLeft = helper.eA(".js-tab-left");
    var all_tabRight = helper.eA(".js-tab-right");
    for (var i = 0; i < all_tabLeft.length; i++) {
      all_tabLeft[i].addEventListener("click", function() {
        _tabLeftRight(this);
      }, false);
    };
    for (var i = 0; i < all_tabRight.length; i++) {
      all_tabRight[i].addEventListener("click", function() {
        _tabLeftRight(this);
      }, false);
    };
  };

  function _tabLeftRight(arrowButton) {
    var direction;
    var tabGroup = helper.getClosest(arrowButton, ".js-tab-group");
    var tabRow = tabGroup.querySelector(".js-tab-row");
    if (arrowButton.classList.contains("js-tab-left")) {
      direction = "left";
    } else if (arrowButton.classList.contains("js-tab-right")) {
      direction = "right";
    };
    var all_tabItem = tabGroup.querySelectorAll(".js-tab-item");
    var currentIndex;
    var newIndex;
    for (var i = 0; i < all_tabItem.length; i++) {
      if (all_tabItem[i].dataset.tabActive == "true") {
        currentIndex = i;
      };
      helper.removeClass(all_tabItem[i], "is-active");
      all_tabItem[i].dataset.tabActive = false;
    };
    if (direction == "right") {
      newIndex = currentIndex + 1;
      if (newIndex > all_tabItem.length - 1) {
        newIndex = 0;
      };
    } else if (direction == "left") {
      newIndex = currentIndex - 1;
      if (newIndex < 0) {
        newIndex = all_tabItem.length - 1;
      };
    };
    helper.addClass(all_tabItem[newIndex], "is-active");
    all_tabItem[newIndex].dataset.tabActive = true;
    _scrollTabInToView(tabRow, all_tabItem[newIndex]);
    _switchTabPanel(all_tabItem[newIndex]);
  };

  function _scrollTabInToView(tabRow, tab) {
    var tabRowArea = tabRow.getBoundingClientRect();
    var tabArea = tab.getBoundingClientRect();
    if (tabArea.left < tabRowArea.left) {
      var left = tab.offsetLeft;
      tabRow.scrollLeft = left;
    } else if (tabArea.right > tabRowArea.right) {
      var right = Math.ceil(tab.offsetLeft - tabRowArea.width + tabArea.width, 10);
      tabRow.scrollLeft = right;
    };
  };

  function _switchTabPanel(tab) {
    var all_targetToReveal = tab.dataset.tabTarget.split(",");
    var tabGroup = helper.getClosest(tab, ".js-tab-group");
    var tabRow = tabGroup.querySelector(".js-tab-row");
    var all_tabItem = tabGroup.querySelectorAll(".js-tab-item");
    for (var i = 0; i < all_tabItem.length; i++) {
      var all_targetToHide = all_tabItem[i].dataset.tabTarget.split(",");
      for (var j = 0; j < all_targetToHide.length; j++) {
        var target = helper.e("." + all_targetToHide[j]);
        helper.addClass(target, "is-hidden");
      };
      helper.removeClass(all_tabItem[i], "is-active");
      all_tabItem[i].dataset.tabActive = false;
    };
    helper.addClass(tab, "is-active");
    for (var i = 0; i < all_targetToReveal.length; i++) {
      var target = helper.e("." + all_targetToReveal[i]);
      helper.removeClass(target, "is-hidden");
    };
    tab.dataset.tabActive = true;
    _scrollTabInToView(tabRow, tab);
  };

  // function render() {
  //   var all_tabGroup = helper.eA(".js-tab-group");
  //   for (var i = 0; i < all_tabGroup.length; i++) {
  //     var tabRow = all_tabGroup[i].querySelector(".js-tab-row");
  //     if (tabRow.scrollWidth > tabRow.clientWidth) {
  //     var tabLeft = document.createElement("button");
  //     tabLeft.setAttribute("class", "m-tab-arrow button button-tertiary button-icon js-tab-left");
  //     var tabLeftIcon = document.createElement("span");
  //     tabLeftIcon.setAttribute("class", "icon-chevron-left");
  //     tabLeft.appendChild(tabLeftIcon);
  //     tabLeft.addEventListener("click", function() {
  //       _tabLeftRight(this);
  //     }, false);
  //
  //     var tabRight = document.createElement("button");
  //     tabRight.setAttribute("class", "m-tab-arrow button button-tertiary button-icon js-tab-right");
  //     var tabRightIcon = document.createElement("span");
  //     tabRightIcon.setAttribute("class", "icon-chevron-right");
  //     tabRight.appendChild(tabRightIcon);
  //     tabRight.addEventListener("click", function() {
  //       _tabLeftRight(this);
  //     }, false);
  //
  //     all_tabGroup[i].insertBefore(tabLeft, all_tabGroup[i].firstChild);
  //     all_tabGroup[i].insertBefore(tabRight, all_tabGroup[i].lastChild);
  //     };
  //   };
  // };

  // exposed methods
  return {
    bind: bind
  };

})();

var textBlock = (function() {

  function clear() {
    var all_textBlock = helper.eA(".js-text-block");
    for (var i = 0; i < all_textBlock.length; i++) {
      all_textBlock[i].textContent = "";
    };
  };

  function _render_textBlock(textBlock) {
    var path = textBlock.dataset.path;
    var textType = textBlock.dataset.textType;
    var content;
    if (path) {
      content = helper.getObject(sheet.getCharacter(), path);
    };
    if (textType) {
      if (textType == "currency") {
        if (content != "") {
          content = parseFloat(content).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }) + " GP";
        };
      } else if (textType == "number") {
        if (content != "") {
          content = parseFloat(content).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          });
        } else {
          content = 0;
        };
      } else if (textType == "bonus") {
        if (content != "" && content > 0) {
          content = "+" + content;
        };
      };
    };
    textBlock.textContent = content;
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

var textareaBlock = (function() {

  function _store(element) {
    var textareaBlock = helper.getClosest(element, ".js-textarea-block");
    var textareaBlockField = textareaBlock.querySelector(".js-textarea-block-field");
    var path = textareaBlockField.dataset.path;
    var type = textareaBlockField.dataset.type;
    var data = element.innerHTML;
    if (data == "<div><br></div>" || data == "<br>" || data == "<br><br>" || data == "<br><br><br>") {
      console.log("found");
      data = "";
    };
    if (path) {
      if (textareaBlock.dataset.clone == "true") {
        var pathCloneKey = textareaBlockField.dataset.pathCloneKey;
        var cloneCount = parseInt(textareaBlock.dataset.cloneCount, 10);
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
    if (display.state()) {
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
        storeInputTimer = setTimeout(delayUpdate, 300, this);
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

  function _render_textareaBlock(textareaBlock) {
    var textareaBlockField = textareaBlock.querySelector(".js-textarea-block-field");
    var path = textareaBlockField.dataset.path;
    if (path) {
      if (textareaBlock.dataset.clone == "true") {
        // console.log("clone", path);
        var pathCloneKey = textareaBlockField.dataset.pathCloneKey;
        var cloneCount = parseInt(textareaBlock.dataset.cloneCount, 10);
        var object = helper.getObject(sheet.getCharacter(), path, cloneCount);
        textareaBlockField.innerHTML = object[pathCloneKey];
        // console.log("found clone input", path, pathCloneKey, textareaBlock.dataset.cloneCount, textareaBlock);
      } else {
        // console.log("not clone", path);
        var content = helper.getObject(sheet.getCharacter(), path);
        textareaBlockField.innerHTML = content;
      };
    };
  };

  function render(textareaBlock) {
    if (textareaBlock) {
      _render_textareaBlock(textareaBlock);
    } else {
      var all_textareaBlock = helper.eA(".js-textarea-block");
      for (var i = 0; i < all_textareaBlock.length; i++) {
        _render_textareaBlock(all_textareaBlock[i]);
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

var themeColor = (function() {

  function update() {
    var themeMeta = document.getElementsByTagName("meta");
    if (display.state("all")) {
      for (var i = 0; i < themeMeta.length; i++) {
        if (themeMeta[i].getAttribute("name") == "theme-color") {
          themeMeta[i].setAttribute("content", "#b0002e");
        };
      };
    } else {
      for (var i = 0; i < themeMeta.length; i++) {
        if (themeMeta[i].getAttribute("name") == "theme-color") {
          themeMeta[i].setAttribute("content", "#245689");
        };
      };
    };
  };

  // exposed methods
  return {
    update: update
  };

})();

var tip = (function() {

  function bind(tip) {
    if (tip) {
      _bind_tip(tip);
    } else {
      var all_tip = helper.eA(".js-tip");
      for (var i = 0; i < all_tip.length; i++) {
        if (all_tip[i].dataset.clone != "true") {
          if (all_tip[i].dataset.clone != "true") {
            _bind_tip(all_tip[i]);
          };
        };
      };
    };
  };

  function _bind_tip(tip) {
    var showOn = tip.dataset.tipShowOn;
    if (showOn == "focus") {
      tip.addEventListener("focus", function() {
        render(tip);
      }, false);
      tip.addEventListener("blur", function() {
        destroy();
        clearTimeout(destroyTimer);
        destroyTimer = setTimeout(delayDestroy, 400, this);
      }, false);
    };
    if (showOn == "hover") {
      tip.addEventListener("mouseover", function() {
        render(tip);
      }, false);
      tip.addEventListener("mouseout", function() {
        destroy();
        clearTimeout(destroyTimer);
        destroyTimer = setTimeout(delayDestroy, 400, this);
      }, false);
    };
  };

  function delayDestroy() {
    var all_tipBox = helper.eA(".js-tip-box");
    for (var i = 0; i < all_tipBox.length; i++) {
      if (!all_tipBox[i].classList.contains("is-opaque")) {
        all_tipBox[i].parentElement.removeChild(all_tipBox[i]);
      };
    };
  };

  var destroyTimer = null;

  function destroy() {
    var all_tipBox = helper.eA(".js-tip-box");
    for (var i = 0; i < all_tipBox.length; i++) {
      all_tipBox[i].destroy();
    };
  };

  function render(tip) {
    // console.log(tip.getBoundingClientRect());
    var body = helper.e("body");
    var tipWrapper = document.createElement("div");
    tipWrapper.setAttribute("class", "m-tip js-tip-box is-transparent");
    var tipArrow = document.createElement("span");
    tipArrow.setAttribute("class", "m-tip-arrow");
    tipWrapper.setAttribute("class", "m-tip js-tip-box is-transparent");
    var tipMessage = document.createElement("p");
    tipMessage.setAttribute("class", "m-tip-message");
    tipMessage.textContent = tip.dataset.tipMessage;
    tipWrapper.destroy = function() {
      helper.removeClass(tipWrapper, "is-opaque");
      helper.addClass(tipWrapper, "is-transparent");
      helper.removeClass(tipWrapper, "m-tip-intro");
      helper.addClass(tipWrapper, "m-tip-outro");
    };
    tipWrapper.addEventListener("transitionend", function(event, elapsed) {
      if (event.propertyName === "opacity" && getComputedStyle(this).opacity == 0) {
        this.parentElement.removeChild(this);
      };
    }.bind(tipWrapper), false);

    tipWrapper.appendChild(tipMessage);
    tipWrapper.appendChild(tipArrow);
    body.appendChild(tipWrapper);
    tipWrapper.setAttribute("style", "width: " + parseInt(tipWrapper.getBoundingClientRect().width + 2, 10) + "px;");

    var width = parseInt(tipWrapper.getBoundingClientRect().width + 2);
    var top =
      parseInt(tip.getBoundingClientRect().top, 10) +
      parseInt(pageYOffset, 10) -
      parseInt(tipWrapper.getBoundingClientRect().height, 10) -
      parseInt(getComputedStyle(tipWrapper).marginTop, 10) -
      parseInt(getComputedStyle(tipWrapper).marginBottom, 10);
    var left =
      parseInt(tip.getBoundingClientRect().left, 10) +
      parseInt((tip.getBoundingClientRect().width / 2), 10) -
      parseInt(((width + parseInt(getComputedStyle(tipWrapper).marginLeft, 10) + parseInt(getComputedStyle(tipWrapper).marginRight, 10) + 2) / 2), 10);

    tipWrapper.setAttribute("style", "width: " + width + "px; top: " + top + "px; left: " + left + "px");

    // if (!helper.inViewport(tipWrapper)) {
    if (tipWrapper.getBoundingClientRect().left < 10) {
      // console.log("too far left");
      var style = {
        top: tipWrapper.style.top,
        width: tipWrapper.style.width
      };
      tipWrapper.setAttribute("style", "width: " + style.width + "; top: " + style.top + "; left: " + 0 + "px;");
      tipArrow.setAttribute("style", "left: " +
        (
          parseInt(tip.getBoundingClientRect().left, 10) +
          parseInt((tip.getBoundingClientRect().width / 2), 10) -
          parseInt(getComputedStyle(tipWrapper).marginLeft, 10)
        ) +
        "px;");
    } else if (tipWrapper.getBoundingClientRect().right > (document.documentElement.clientWidth - 10)) {
      // console.log("too far right");
      var style = {
        top: tipWrapper.style.top,
        width: tipWrapper.style.width
      };
      tipWrapper.setAttribute("style", "width: " + style.width + "; top: " + style.top + "; left: " +
        (
          document.documentElement.clientWidth - parseInt((parseInt(tipWrapper.getBoundingClientRect().width, 10) + parseInt(getComputedStyle(tipWrapper).marginLeft, 10) + parseInt(getComputedStyle(tipWrapper).marginRight, 10)), 10)
        ) +
        "px;");
      tipArrow.setAttribute("style", "left: " +
        (-parseInt(tipWrapper.getBoundingClientRect().left, 10) +
          parseInt(tip.getBoundingClientRect().left, 10) +
          (parseInt((tip.getBoundingClientRect().width), 10) / 2)
        ) +
        "px;");
    };
    // };

    getComputedStyle(tipWrapper).opacity;
    helper.removeClass(tipWrapper, "is-transparent");
    helper.addClass(tipWrapper, "is-opaque");
    helper.addClass(tipWrapper, "m-tip-intro");
  };

  // exposed methods
  return {
    bind: bind
  };

})();

var totalBlock = (function() {

  function render(totalBlock) {
    if (totalBlock) {
      _render_totalBlock(totalBlock);
    } else {
      _render_all_totalBlock();
    };
  };

  function _render_totalBlock(totalBlock) {
    // console.log("---------------------------------------------------");
    // console.log(totalBlock);
    var _checkValue = function(data) {
      var value;
      if (typeof data == "number") {
        value = data;
      } else if (typeof data == "string") {
        value = parseInt(data, 10) || 0;
      };
      if (isNaN(value)) {
        value = 0;
      };
      return value;
    };
    var _checkClassSkill = function(totalObject) {
      var classSkill;
      if (totalObject.ranks > 0) {
        classSkill = 3;
      } else {
        classSkill = 0;
      };
      return classSkill;
    };
    var _get_externalBonus = function(key, totalObject) {
      var externalBouns;
      if (key == "str_bonus") {
        externalBouns = _checkValue(stats.getMod("str"));
      };
      // if dex data attribute is true
      if (key == "dex_bonus") {
        // if max dex is true
        if (totalObject.bonuses.max_dex) {
          if (sheet.getCharacter().equipment.armor.max_dex < _checkValue(stats.getMod("dex")) && sheet.getCharacter().equipment.armor.max_dex != "") {
            externalBouns = sheet.getCharacter().equipment.armor.max_dex;
          } else {
            externalBouns = _checkValue(stats.getMod("dex"));
          };
        } else {
          externalBouns = _checkValue(stats.getMod("dex"));
        };
      };
      // if con data attribute is true
      if (key == "con_bonus") {
        externalBouns = _checkValue(stats.getMod("con"));
      };
      // if int data attribute is true
      if (key == "int_bonus") {
        externalBouns = _checkValue(stats.getMod("int"));
      };
      // if wis data attribute is true
      if (key == "wis_bonus") {
        externalBouns = _checkValue(stats.getMod("wis"));
      };
      // if cha data attribute is true
      if (key == "cha_bonus") {
        externalBouns = _checkValue(stats.getMod("cha"));
      };
      // if bab data attribute is true
      if (key == "bab") {
        externalBouns = _checkValue(sheet.getCharacter().offense.base_attack);
      };
      // size
      if (key == "size") {
        externalBouns = _checkValue(sheet.getCharacter().basics.size.size_modifier);
      };
      // special size
      if (key == "special_size") {
        externalBouns = _checkValue(sheet.getCharacter().basics.size.special_size_modifier);
      };
      // level
      if (key == "level") {
        externalBouns = _checkValue(sheet.getCharacter().basics.level);
      };
      // half level
      if (key == "half_level") {
        externalBouns = Math.floor(_checkValue(sheet.getCharacter().basics.level) / 2);
      };
      // ac armor
      if (key == "ac_armor") {
        externalBouns = _checkValue(sheet.getCharacter().defense.ac.armor);
      };
      // ac shield
      if (key == "ac_shield") {
        externalBouns = _checkValue(sheet.getCharacter().defense.ac.shield);
      };
      // ac deflect
      if (key == "ac_deflect") {
        externalBouns = _checkValue(sheet.getCharacter().defense.ac.deflect);
      };
      // ac dodge
      if (key == "ac_dodge") {
        externalBouns = _checkValue(sheet.getCharacter().defense.ac.dodge);
      };
      // ac natural
      if (key == "ac_natural") {
        externalBouns = _checkValue(sheet.getCharacter().defense.ac.natural);
      };
      // armor check penalty
      if (key == "check_penalty") {
        externalBouns = _checkValue(sheet.getCharacter().equipment.armor.check_penalty);
      };
      // class skill
      if (key == "class_skill") {
        externalBouns = _checkClassSkill(totalObject);
      };
      // class skill
      if (key == "size_modifier_fly") {
        externalBouns = _checkValue(sheet.getCharacter().basics.size.size_modifier_fly);
      };
      // class skill
      if (key == "size_modifier_stealth") {
        externalBouns = _checkValue(sheet.getCharacter().basics.size.size_modifier_stealth);
      };
      // 10
      if (key == "plus_ten") {
        externalBouns = 10;
      };
      // console.log("\t\t\t", key, externalBouns);
      return externalBouns;
    };
    var _get_totalObject = function(character, totalPath, cloneCount, totalCloneSet) {
      var object;
      // console.log("cloneCount = ", cloneCount);
      // console.log("totalCloneSet = ", totalCloneSet);
      if (totalPath && !isNaN(cloneCount)) {
        // console.log("route ", 1);
        object = helper.getObject(character, totalPath, cloneCount);
      } else if (totalPath && totalCloneSet) {
        // console.log("route ", 2);
        object = helper.getObject(character, totalPath);
      } else if (totalPath) {
        // console.log("route ", 3);
        object = helper.getObject(character, totalPath);
      };
      // console.log(object);
      return object;
    };
    var _get_all_additionSubtractionPaths = function(addOrMinus) {
      if (addOrMinus == "add") {
        if (totalBlock.dataset.totalPathAddition) {
          return totalBlock.dataset.totalPathAddition.split(",");
        } else {
          return false;
        };
      } else if (addOrMinus == "minus"); {
        if (totalBlock.dataset.totalPathSubtraction) {
          return totalBlock.dataset.totalPathSubtraction.split(",");
        } else {
          return false;
        };
      };
    };
    var _addPrefixSuffix = function(grandTotal, totalType) {
      var total;
      if (totalType == "bonus" && grandTotal > 0) {
        total = grandTotal = "+" + grandTotal;
      } else if (totalType == "weight" && parseInt(grandTotal, 10) > 0) {
        total = grandTotal + " lbs";
      } else {
        total = grandTotal;
      };
      return total;
    };
    var _updateCheck = function(check, object) {
      var bonusType = check.dataset.bonusType.replace(/-+/g, "_");
      check.checked = object[bonusType];
    };
    var _updateAllCheck = function(allCheck, totalObject) {
      if (allCheck.length > 0) {
        for (var i = 0; i < allCheck.length; i++) {
          // console.log(totalObject, totalObject.bonuses);
          _updateCheck(allCheck[i], totalObject.bonuses);
          // if (totalObject.length > 0) {
          //   // console.log(totalObject.length);
          //   _updateCheck(allCheck[i], totalObject[0].bonuses);
          // } else {
          //   // console.log(totalObject);
          //   _updateCheck(allCheck[i], totalObject.bonuses);
          // };
        };
      };
    };

    // the total render target
    var totalElement = totalBlock.querySelector(".js-total-block-total");
    // prefix or suffix type
    var totalType = totalBlock.dataset.totalType;
    // total variable location
    var totalPath = totalBlock.dataset.totalPath;
    // is this a clone
    var cloneCount = parseInt(totalBlock.dataset.cloneCount, 10);
    // are we totalling variable from multiple clones
    var totalCloneSet = (totalBlock.dataset.totalCloneSet == "true");
    // check to see if there are total bonuses to include
    var totalBonuses = (totalBlock.dataset.totalBonuses == "true");
    // console.log("bonuses", totalBonuses);
    // are there exposed bonuses with checkboxes
    var all_bonusCheck = totalBlock.querySelectorAll(".js-total-block-bonus-check");
    // the paths to add
    var totalPathAddition = _get_all_additionSubtractionPaths("add");
    // the paths to subtract
    var totalPathSubtraction = _get_all_additionSubtractionPaths("false");

    var totalObject = _get_totalObject(sheet.getCharacter(), totalPath, cloneCount, totalCloneSet);
    // console.log(totalObject);
    var toSum = [];
    var grandTotal;

    _updateAllCheck(all_bonusCheck, totalObject);

    // push all external bonuses to sum array
    if (totalBonuses) {
      for (var key in totalObject.bonuses) {
        // max dex is not a bonus too add or subtract but a value to limit the dex modifier
        if (totalObject.bonuses[key] && key != "max_dex") {
          // console.log("\t\t\t  adding:", key, totalObject.bonuses[key]);
          toSum.push(_get_externalBonus(key, totalObject));
        };
      };
    };

    // if adding
    if (totalPathAddition && totalCloneSet) {
      // if adding a set of clones
      for (var i = 0; i < totalObject.length; i++) {
        for (var j = 0; j < totalPathAddition.length; j++) {
          toSum.push(parseFloat(totalObject[i][totalPathAddition[j]]) || 0);
        };
      };
    } else {
      for (var i = 0; i < totalPathAddition.length; i++) {
        toSum.push(parseInt(totalObject[totalPathAddition[i]], 10) || 0);
      };
    };

    // if subtracting
    if (totalPathSubtraction && totalCloneSet) {
      // if subtracting a set of clones
      for (var i = 0; i < totalObject.length; i++) {
        for (var j = 0; j < totalPathSubtraction.length; j++) {
          toSum.push(parseFloat(-totalObject[i][totalPathSubtraction[j]]) || 0);
        };
      };
    } else {
      for (var i = 0; i < totalPathSubtraction.length; i++) {
        toSum.push(parseInt(-totalObject[totalPathSubtraction[i]], 10) || 0);
      };
    };

    // console.log("\t\t\t", toSum);

    if (toSum.length > 0) {
      grandTotal = toSum.reduce(function(a, b) {
        return a + b;
      });
      // if not an integer
      if (grandTotal != parseInt(grandTotal, 10)) {
        grandTotal = grandTotal.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
        // parseFloat(grandTotal).toFixed(2);
      };
    } else {
      grandTotal = 0;
    };

    if (totalObject) {
      // if ("current" in totalObject) {
      totalObject.current = grandTotal;
      // };
    };

    totalElement.textContent = _addPrefixSuffix(grandTotal, totalType);
    // console.log("------------------------------");
  };

  function _render_all_totalBlock() {
    var all_totalBlock = helper.eA(".js-total-block");
    for (var i = 0; i < all_totalBlock.length; i++) {
      _render_totalBlock(all_totalBlock[i]);
    };
  };

  function _bonusTextLable(bonusType) {
    if (bonusType == "str-bonus" || bonusType == "str_bonus") {
      return "STR Bonus";
    } else if (bonusType == "dex-bonus" || bonusType == "dex_bonus") {
      return "DEX Bonus";
    } else if (bonusType == "con-bonus" || bonusType == "con_bonus") {
      return "CON Bonus";
    } else if (bonusType == "int-bonus" || bonusType == "int_bonus") {
      return "INT Bonus";
    } else if (bonusType == "wis-bonus" || bonusType == "wis_bonus") {
      return "WIS Bonus";
    } else if (bonusType == "cha-bonus" || bonusType == "cha_bonus") {
      return "CHA Bonus";
    } else if (bonusType == "bab") {
      return "Base Attack Bonus";
    } else if (bonusType == "size") {
      return "Size Bonus";
    } else if (bonusType == "special_size") {
      return "Special Size Bonus";
    } else if (bonusType == "size_modifier_fly") {
      return "Size Fly Bonus";
    } else if (bonusType == "size_modifier_stealth") {
      return "Size Stealth Bonus";
    } else if (bonusType == "level") {
      return "Level";
    } else if (bonusType == "half-level" || bonusType == "half_level") {
      return "Half Level";
    } else if (bonusType == "plus-ten" || bonusType == "plus_ten") {
      return "Plus 10";
    } else if (bonusType == "ac-armor" || bonusType == "ac_armor") {
      return "Armor Bonus";
    } else if (bonusType == "ac-shield" || bonusType == "ac_shield") {
      return "Shield Bonus";
    } else if (bonusType == "ac-deflect" || bonusType == "ac_deflect") {
      return "Deflect Bonus";
    } else if (bonusType == "ac-dodge" || bonusType == "ac_dodge") {
      return "Dodge Bonus";
    } else if (bonusType == "ac-natural" || bonusType == "ac_natural") {
      return "Natural Armor Bonus";
    } else if (bonusType == "class-skill" || bonusType == "class_skill") {
      return "Class Skill";
    } else if (bonusType == "check-penalty" || bonusType == "check_penalty") {
      return "Armor Check Penalty";
    } else if (bonusType == "max-dex" || bonusType == "max_dex") {
      return "Max Dex Bonus";
    } else {
      return bonusType;
    };
  };

  function _update_totalBlockControls(element) {
    var totalBlock = helper.getClosest(element, ".js-total-block");
    var totalPath = totalBlock.dataset.totalPath;
    var cloneCount = parseInt(totalBlock.dataset.cloneCount, 10);
    // collect all bonuses which should apply to this total block
    var totalBonuses = (totalBlock.dataset.totalBonuses == "true");
    var totalBonusesInclude = false;
    if (totalBonuses) {
      totalBonusesInclude = totalBlock.dataset.totalBonusesInclude.split(",");
    };
    // get the right total object or clone total object
    var object;
    if (totalPath && !isNaN(cloneCount)) {
      object = helper.getObject(sheet.getCharacter(), totalPath, cloneCount);
    } else if (totalPath) {
      object = helper.getObject(sheet.getCharacter(), totalPath);
    };
    // if no bonuses object found
    if (!object.bonuses) {
      object.bonuses = {};
    };
    // if a key is not in the object bonuses add it
    if (totalBonusesInclude.length > 0) {
      for (var i = 0; i < totalBonusesInclude.length; i++) {
        if (!(totalBonusesInclude[i] in object.bonuses)) {
          object.bonuses[totalBonusesInclude[i]] = false;
        };
      };
    };

    // get heading
    var heading = element.dataset.modalHeading || "Bonuses to add to this ability";

    function _update_objectBonuses(totalBlockControls) {
      var storedBonuses = JSON.parse(totalBlockControls.dataset.bonuses);
      object.bonuses = storedBonuses;
    };

    function _store_data(totalBlockControls, input, key) {
      var storedBonuses = JSON.parse(totalBlockControls.dataset.bonuses);
      storedBonuses[key] = input.checked;
      totalBlockControls.dataset.bonuses = JSON.stringify(storedBonuses);
    };

    function _create_check(totalBlockControls, key) {
      var checkBlock = document.createElement("div");
      checkBlock.setAttribute("class", "m-check-block");
      var checkBlockCheck = document.createElement("input");
      checkBlockCheck.setAttribute("class", "m-check-block-check");
      checkBlockCheck.setAttribute("type", "checkbox");
      checkBlockCheck.setAttribute("id", key);
      checkBlockCheck.checked = object.bonuses[key];
      var checkBlockCheckIcon = document.createElement("span");
      checkBlockCheckIcon.setAttribute("class", "m-check-block-check-icon");
      checkBlock.appendChild(checkBlockCheck);
      checkBlock.appendChild(checkBlockCheckIcon);
      checkBlockCheck.addEventListener("change", function() {
        _store_data(totalBlockControls, this, key);
      }, false);
      return checkBlock;
    };

    function _create_checkLabel(text, key) {
      var editBoxText = document.createElement("label");
      editBoxText.setAttribute("class", "m-edit-box-check-label");
      editBoxText.setAttribute("for", key);
      editBoxText.textContent = text;
      return editBoxText;
    };

    function _create_editBoxItem(size, child) {
      var editBoxItem = document.createElement("div");
      editBoxItem.setAttribute("class", "m-edit-box-item-" + size);
      if (child) {
        editBoxItem.appendChild(child);
      };
      return editBoxItem;
    };

    function _create_editBox(nodes) {
      var editBox = document.createElement("div");
      editBox.setAttribute("class", "m-edit-box");
      var editBoxHead = document.createElement("div");
      editBoxHead.setAttribute("class", "m-edit-box-head");
      var editBoxBody = document.createElement("div");
      editBoxBody.setAttribute("class", "m-edit-box-body");
      var editBoxContent = document.createElement("div");
      editBoxContent.setAttribute("class", "m-edit-box-content m-edit-box-content-margin-large");
      var editBoxGroup = document.createElement("div");
      editBoxGroup.setAttribute("class", "m-edit-box-item-max m-edit-box-group");
      for (var i = 0; i < arguments.length; i++) {
        editBoxGroup.appendChild(arguments[i]);
      };
      editBoxContent.appendChild(editBoxGroup);
      editBoxBody.appendChild(editBoxContent);
      editBox.appendChild(editBoxBody);
      return editBox;
    };

    function _create_totalBlockControls() {
      var totalBlockControls = document.createElement("div");
      totalBlockControls.setAttribute("data-bonuses", JSON.stringify(object.bonuses));
      if (object) {
        // order the bonuses for rendering in modal
        var orderedBonuses = [];
        if ("str_bonus" in object.bonuses) {
          orderedBonuses.push({
            "str_bonus": object.bonuses["str_bonus"]
          })
        };
        if ("dex_bonus" in object.bonuses) {
          orderedBonuses.push({
            "dex_bonus": object.bonuses["dex_bonus"]
          })
        };
        if ("con_bonus" in object.bonuses) {
          orderedBonuses.push({
            "con_bonus": object.bonuses["con_bonus"]
          })
        };
        if ("int_bonus" in object.bonuses) {
          orderedBonuses.push({
            "int_bonus": object.bonuses["int_bonus"]
          })
        };
        if ("wis_bonus" in object.bonuses) {
          orderedBonuses.push({
            "wis_bonus": object.bonuses["wis_bonus"]
          })
        };
        if ("cha_bonus" in object.bonuses) {
          orderedBonuses.push({
            "cha_bonus": object.bonuses["cha_bonus"]
          })
        };
        if ("bab" in object.bonuses) {
          orderedBonuses.push({
            "bab": object.bonuses["bab"]
          })
        };
        if ("level" in object.bonuses) {
          orderedBonuses.push({
            "level": object.bonuses["level"]
          })
        };
        if ("half_level" in object.bonuses) {
          orderedBonuses.push({
            "half_level": object.bonuses["half_level"]
          })
        };
        if ("class_skill" in object.bonuses) {
          orderedBonuses.push({
            "class_skill": object.bonuses["class_skill"]
          })
        };
        if ("max_dex" in object.bonuses) {
          orderedBonuses.push({
            "max_dex": object.bonuses["max_dex"]
          })
        };
        if ("check_penalty" in object.bonuses) {
          orderedBonuses.push({
            "check_penalty": object.bonuses["check_penalty"]
          })
        };
        if ("plus_ten" in object.bonuses) {
          orderedBonuses.push({
            "plus_ten": object.bonuses["plus_ten"]
          })
        };
        if ("ac_armor" in object.bonuses) {
          orderedBonuses.push({
            "ac_armor": object.bonuses["ac_armor"]
          })
        };
        if ("ac_shield" in object.bonuses) {
          orderedBonuses.push({
            "ac_shield": object.bonuses["ac_shield"]
          })
        };
        if ("ac_deflect" in object.bonuses) {
          orderedBonuses.push({
            "ac_deflect": object.bonuses["ac_deflect"]
          })
        };
        if ("ac_dodge" in object.bonuses) {
          orderedBonuses.push({
            "ac_dodge": object.bonuses["ac_dodge"]
          })
        };
        if ("ac_natural" in object.bonuses) {
          orderedBonuses.push({
            "ac_natural": object.bonuses["ac_natural"]
          })
        };
        if ("size" in object.bonuses) {
          orderedBonuses.push({
            "size": object.bonuses["size"]
          })
        };
        if ("special_size" in object.bonuses) {
          orderedBonuses.push({
            "special_size": object.bonuses["special_size"]
          })
        };
        if ("size_modifier_fly" in object.bonuses) {
          orderedBonuses.push({
            "size_modifier_fly": object.bonuses["size_modifier_fly"]
          })
        };
        if ("size_modifier_stealth" in object.bonuses) {
          orderedBonuses.push({
            "size_modifier_stealth": object.bonuses["size_modifier_stealth"]
          })
        };
        for (var i = 0; i < orderedBonuses.length; i++) {
          for (var key in orderedBonuses[i]) {
            var title = _bonusTextLable(key);
            var check = _create_check(totalBlockControls, key);
            var label = _create_checkLabel(title, key);
            var editBoxItem1 = _create_editBoxItem("large", label);
            var editBoxItem2 = _create_editBoxItem("check", check);
            var editBox = _create_editBox(editBoxItem1, editBoxItem2);
            totalBlockControls.appendChild(editBox);
          };
        };
      };
      return totalBlockControls;
    };

    var modalContent = _create_totalBlockControls();

    modal.render(heading, modalContent, "Apply", function() {
      _update_objectBonuses(this);
      sheet.storeCharacters();
      render();
      display.clear();
      display.render();
    }.bind(modalContent), "small");
  };

  function bind(totalBlock) {
    if (totalBlock) {
      _bind_totalBlock(totalBlock);
    } else {
      var all_totalBlock = helper.eA(".js-total-block");
      for (var i = 0; i < all_totalBlock.length; i++) {
        if (all_totalBlock[i].dataset.clone != "true") {
          _bind_totalBlock(all_totalBlock[i]);
        };
      };
    };
  };

  function _bind_totalBlock(totalBlock) {
    var totalBlockBonuses = totalBlock.querySelector(".js-total-block-bonuses");
    var totalBlockBonusCheck = totalBlock.querySelector(".js-total-block-bonus-check");
    if (totalBlockBonusCheck) {
      _bind_bonusCheck(totalBlockBonusCheck);
    };
    if (totalBlockBonuses) {
      _bind_bonusButton(totalBlockBonuses);
    };
  };

  function _bind_bonusCheck(check) {
    check.addEventListener("change", function() {
      _update_bonuses(this);
      render();
      sheet.storeCharacters();
    }, false);
  };

  function _bind_bonusButton(button) {
    button.addEventListener("click", function(event) {
      event.stopPropagation();
      event.preventDefault();
      _update_totalBlockControls(this);
    }, false);
  };

  function _update_bonuses(input) {
    var bonusType = input.dataset.bonusType.replace(/-+/g, "_");
    var totalBlock = helper.getClosest(input, ".js-total-block") || helper.getClosest(input, ".js-total-block-control");
    var totalPath = totalBlock.dataset.totalPath;
    var bonusesPath;
    var bonusesObject;
    var object;
    if (totalBlock.dataset.clone == "true") {
      // console.log(1);
      var cloneCount = parseInt(totalBlock.dataset.cloneCount, 10);
      object = helper.getObject(sheet.getCharacter(), totalPath, cloneCount);
      object.bonuses[bonusType] = input.checked;
    } else {
      // console.log(2);
      bonusesPath = totalPath + ".bonuses";
      bonusesObject = helper.getObject(sheet.getCharacter(), bonusesPath);
      bonusesObject[bonusType] = input.checked;
    };
  };

  function clear() {
    var all_total = helper.eA(".js-total-block-total");
    for (var i = 0; i < all_total.length; i++) {
      all_total[i].textContent = "";
    };
  };

  // exposed methods
  return {
    clear: clear,
    bind: bind,
    render: render
  };

})();

var update = (function() {

  var history = [{
    version: "3.30.0",
    list: [
      "Improved Event logger."
    ]
  }, {
    version: "3.29.0",
    list: [
      "*Improved the Stat and Modifier inputs. You may have to review your stats as new options for Racial, Enhancement and Misc modifiers are now available."
    ]
  }, {
    version: "3.28.0",
    list: [
      "Added Weapon Type to each attack block."
    ]
  }, {
    version: "3.27.0",
    list: [
      "*Added Character Image options."
    ]
  }, {
    version: "3.26.0",
    list: [
      "*Added new Speed options: fly, swim, climb and burrow."
    ]
  }, {
    version: "3.25.0",
    list: [
      "*Added a Feedback link. If you find a problem, issue or just have suggestions use the link in the Nav."
    ]
  }, {
    version: "3.24.0",
    list: [
      "Added XP advancement speed and next level counts."
    ]
  }, {
    version: "3.23.0",
    list: [
      "*XP and Wealth is now tracked and can be viewd in logs."
    ]
  }, {
    version: "3.22.0",
    list: [
      "Added apply and clearing to XP and Wealth counts."
    ]
  }, {
    version: "3.21.1",
    list: [
      "Added missing 512x512 icon to manifest file."
    ]
  }, {
    version: "3.21.0",
    list: [
      "Added alternative STR score to calculation Encumbrance."
    ]
  }, {
    version: "3.20.1",
    list: [
      "Fixed an issue causing Clone Skills Bonuses not applying correctly."
    ]
  }, {
    version: "3.20.0",
    list: [
      "Adding SR, DR and Energy Resistance."
    ]
  }, {
    version: "3.19.2",
    list: [
      "Refactor Nav open and close logic and performance."
    ]
  }, {
    version: "3.19.1",
    list: [
      "Fix bug where invisible line breaks would cause empty Textarea Blocks to render in Display mode."
    ]
  }, {
    version: "3.19.0",
    list: [
      "Introduced Tabs to improve Edit layout."
    ]
  }, {
    version: "3.18.0",
    list: [
      "Added Character Description."
    ]
  }, {
    version: "3.17.0",
    list: [
      "*Added Wealth totaling.",
      "Improved Display layout.",
      "General UI fixes to Card design."
    ]
  }, {
    version: "3.16.1",
    list: [
      "*Added automatic Encumbrance calculation.",
      "Improved Display layout.",
      "Added more Tips.",
      "General refactoring and UI fixes."
    ]
  }, {
    version: "3.15.0",
    list: [
      "Added Alphabetical Spell sort."
    ]
  }, {
    version: "3.14.0",
    list: [
      "Improved Total Bonus modal layout."
    ]
  }, {
    version: "3.13.1",
    list: [
      "Added more Tips.",
      "Fixing bug where Tips would not be removed from the DOM."
    ]
  }, {
    version: "3.12.0",
    list: [
      "Added Caster Level Check support.",
      "Updated demo PCs."
    ]
  }, {
    version: "3.10.0",
    list: [
      "Improved Damage, Temp and Non Leathal HP controls."
    ]
  }, {
    version: "3.9.1",
    list: [
      "Update print styles to use columns."
    ]
  }, {
    version: "3.9.0",
    list: [
      "*Added Multi class support!",
      "Added areas for more than one Class.",
      "Added skill rank totals.",
      "Improved edit mode layout and general UI fixes."
    ]
  }, {
    version: "3.8.0",
    list: [
      "Redesigned layout of Display mode.",
      "Improved Log design."
    ]
  }, {
    version: "3.7.0",
    list: [
      "*Offline use feature added. AwesomeSheet will now work offline if it has been cached."
    ]
  }, {
    version: "3.6.1",
    list: [
      "Added Feat and Trait inputs to Saves, removing Racial inputs on Saves.",
      "*Added Size categories with auto calculation and Alignment dropdown. You may need to re-enter you size and Alignment.",
      "Moved Armor and Shield to Equipment section."
    ]
  }, {
    version: "3.5.2",
    list: [
      "Added Item list total weight.",
      "Updated character object repair for concentration bonuses."
    ]
  }, {
    version: "3.5.1",
    list: [
      "Improve Clone and Import UI."
    ]
  }, {
    version: "3.5.0",
    list: [
      "Refactored Clones, Input and Textarea modules.",
      "*New Items feature added.",
      "*New Custom Skills feature added."
    ]
  }, {
    version: "3.4.0",
    list: [
      "Redesigned edit mode layout and style for ease of reading."
    ]
  }, {
    version: "3.3.0",
    list: [
      "Optimise Consumable, Attack and Note modules for faster page load.",
      "Fixed a bug with Skill totals not recognising class skill."
    ]
  }, {
    version: "3.2.2",
    list: [
      "Refactored change log module.",
      "*Customisable Initiative block added. You will have to re-enter you Initiative bonuses if any.",
      "Fixed a bug with Update Prompt not hiding and Change Log control in the Nav not working.",
      "UI fixes and updates."
    ]
  }, {
    version: "3.1.0",
    list: [
      "Added a new feature Update Prompt. You're looking at it.",
      "UI fixes and updates."
    ]
  }, {
    version: "3.0.0",
    list: [
      "Improve edit and display modes and introduce card layout."
    ]
  }];

  function currentVersion() {
    return history[0].version;
  };

  // exposed methods
  return {
    ver: currentVersion,
    history: history
  };

})();

var wealth = (function() {

  function update() {
    render();
    totalBlock.render();
    textBlock.render();
    if (display.state()) {
      display.clear();
      display.render();
    };
  };

  function render() {
    var total = _create_goldTotal(helper.getObject(sheet.getCharacter(), "equipment.wealth"));
    helper.setObject(sheet.getCharacter(), "equipment.wealth.total", total);
    sheet.storeCharacters();
  };

  function _create_goldTotal(wealth) {
    var wealthInGp = [];
    if ("platinum" in wealth) {
      var platinum = wealth.platinum * 10;
      if (!isNaN(platinum) && platinum != "") {
        wealthInGp.push(platinum);
      } else {
        wealthInGp.push(0);
      };
    };
    if ("gold" in wealth) {
      var gold = wealth.gold;
      if (!isNaN(gold) && gold != "") {
        wealthInGp.push(gold);
      } else {
        wealthInGp.push(0);
      };
    };
    if ("silver" in wealth) {
      var silver = wealth.silver / 10;
      if (!isNaN(silver) && silver != "") {
        wealthInGp.push(silver);
      } else {
        wealthInGp.push(0);
      };
    };
    if ("copper" in wealth) {
      var copper = wealth.copper / 100;
      if (!isNaN(copper) && copper != "") {
        wealthInGp.push(copper);
      } else {
        wealthInGp.push(0);
      };
    };
    var grandTotal;
    if (wealthInGp.length > 0) {
      grandTotal = wealthInGp.reduce(function(a, b) {
        return a + b;
      });
      grandTotal = parseFloat(grandTotal).toFixed(2);
    } else {
      grandTotal = 0;
    };
    return grandTotal;
  };

  // exposed methods
  return {
    update: update,
    render: render,
  };

})();

var xp = (function() {

  var renderTimer = null;

  function bind() {
    var advancementSpeed = helper.e(".js-advancement-speed");
    advancementSpeed.addEventListener("change", function() {
      clearTimeout(renderTimer);
      renderTimer = setTimeout(delayUpdate, 300, this);
    }, false);
  };

  function delayUpdate(element) {
    render();
    sheet.storeCharacters();
    textBlock.render();
  };

  function render() {
    var trackSlow = [0, 3000, 7500, 14000, 23000, 35000, 53000, 77000, 115000, 160000, 235000, 330000, 475000, 665000, 955000, 1350000, 1900000, 2700000, 3850000, 5350000];
    var trackMedium = [0, 2000, 5000, 9000, 15000, 23000, 35000, 51000, 75000, 105000, 155000, 220000, 315000, 445000, 635000, 890000, 1300000, 1800000, 2550000, 3600000];
    var trackFast = [0, 1300, 3300, 6000, 10000, 15000, 23000, 34000, 50000, 71000, 105000, 145000, 210000, 295000, 425000, 600000, 850000, 1200000, 1700000, 2400000];
    var selectedTrack = false;
    var speed = helper.getObject(sheet.getCharacter(), "basics.xp.advancement_speed");
    var nextLevel;
    var nextLevelXpMileStone;
    var nextLevelXpNeeded;
    var nextLevelIndex;
    var currentXp = helper.getObject(sheet.getCharacter(), "basics.xp.total");
    if (speed == "Slow") {
      selectedTrack = trackSlow;
    } else if (speed == "Medium") {
      selectedTrack = trackMedium;
    } else if (speed == "Fast") {
      selectedTrack = trackFast;
    };
    var _render_nextXp = function() {
      if (selectedTrack) {
        selectedTrack.forEach(function(item, index, array) {
          if (selectedTrack[index] <= currentXp) {
            nextLevelIndex = (index + 1);
          };
        });
        nextLevelXpMileStone = selectedTrack[nextLevelIndex];
        nextLevelXpNeeded = nextLevelXpMileStone - helper.getObject(sheet.getCharacter(), "basics.xp.total");
        if (nextLevelXpMileStone == undefined || isNaN(nextLevelXpMileStone)) {
          nextLevelXpMileStone = "";
          nextLevelXpNeeded = "";
        };
        helper.setObject(sheet.getCharacter(), "basics.xp.next_level", nextLevelXpMileStone);
        helper.setObject(sheet.getCharacter(), "basics.xp.needed", nextLevelXpNeeded);
      } else {
        helper.setObject(sheet.getCharacter(), "basics.xp.next_level", "");
        helper.setObject(sheet.getCharacter(), "basics.xp.needed", "");
      };
    };
    var _clear_nextXp = function() {
      helper.setObject(sheet.getCharacter(), "basics.xp.next_level", "");
      helper.setObject(sheet.getCharacter(), "basics.xp.needed", "");
    };
    // if xp is less than level 20 for any advancement speed
    if (currentXp <= selectedTrack[selectedTrack.length - 1]) {
      _render_nextXp();
    } else {
      _clear_nextXp();
    };
  };

  // exposed methods
  return {
    bind: bind,
    render: render
  };

})();

(function() {

})();

(function() {

  sheet.render();
  sheet.bind();
  nav.bind();
  nav.render();
  tabs.bind();
  log.bind();
  log.render();
  night.update();
  checkUrl.render();
  checkUrl.checkHttps();

})();
