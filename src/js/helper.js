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

  function replaceAt(string, index, newCharacter) {
    if (index > string.length - 1) {
      return string;
    } else {
      return string.substring(0, index) + newCharacter + string.substring(index + 1);
    };
  };

  function makeObject(string) {
    var _stringOrBooleanOrNumber = function(stringToTest) {
      if (stringToTest == "true") {
        return true;
      } else if (stringToTest == "false") {
        return false;
      } else if (stringToTest.indexOf("#") != -1) {
        return stringToTest.substr(1, kevValuePair[1].length);
      } else {
        return "\"" + stringToTest + "\"";
      };
    };
    // if argument is a string
    if (typeof string == "string") {
      // start building the object
      var objectString = "{";
      // split the string on comma not followed by a space
      // split on character if not followed by a space
      var items = string.split(/,(?=\S)/);
      // loop over each item
      for (var i = 0; i < items.length; i++) {
        // split each would be object key values pair
        // split on character if not followed by a space
        var kevValuePair = items[i].split(/:(?=\S)/);
        // get the key
        var key = "\"" + kevValuePair[0] + "\"";
        var value;
        // if the value has + with a space after it
        if (/\+(?=\S)/.test(kevValuePair[1])) {
          // remove first + symbol
          kevValuePair[1] = kevValuePair[1].substr(1, kevValuePair[1].length);
          // split the would be values
          // split on character if not followed by a space
          var all_value = kevValuePair[1].split(/\+(?=\S)/);
          // if there are multiple values make an array
          value = "["
          for (var q = 0; q < all_value.length; q++) {
            value += _stringOrBooleanOrNumber(all_value[q]) + ",";
          };
          // remove last comma
          value = value.substr(0, value.length - 1);
          // close array
          value += "]"
        } else {
          value = _stringOrBooleanOrNumber(kevValuePair[1]);
        };
        objectString += key + ":" + value + ",";
      };
      // remove last comma
      objectString = objectString.substr(0, objectString.length - 1);
      // close object
      objectString += "}";
      var object = JSON.parse(objectString);
      return object;
    } else {
      return false;
    };
  };

  function setObject(options) {
    var defaultOptions = {
      path: null,
      object: null,
      newValue: null
    };
    if (options) {
      var defaultOptions = helper.applyOptions(defaultOptions, options);
    };
    var _setData = function() {
      // split path into array items
      var address = defaultOptions.path.split(".");
      // while array has more than 1 item
      while (address.length > 1) {
        // shift off and store the first key
        var currentKey = address.shift();
        // copy the object
        var parentObject = defaultOptions.object;
        // drill down the object with the first key
        defaultOptions.object = defaultOptions.object[currentKey];
        // if there is not object there make one
        if (!defaultOptions.object || typeof defaultOptions.object != "object") {
          defaultOptions.object = parentObject;
          defaultOptions.object[currentKey] = {};
        };
      };
      var finalKey = address.shift();
      if (finalKey in defaultOptions.object) {
        defaultOptions.object[finalKey] = defaultOptions.newValue;
      };
    };
    var _setCloneData = function() {
      var addressOne = defaultOptions.path.substr(0, defaultOptions.path.indexOf("[")).split(".");
      var index = parseInt(defaultOptions.path.substr((defaultOptions.path.indexOf("[") + 1), (defaultOptions.path.indexOf("]") - 1)), 10);
      var addressTwo = defaultOptions.path.substr((defaultOptions.path.indexOf("]") + 1), defaultOptions.path.length).split(".");
      if (addressTwo[0] == "") {
        addressTwo.shift();
      };
      if (addressOne.length > 0) {
        while (addressOne.length > 1) {
          // shift off and store the first key
          var currentKey = addressOne.shift();
          // drill down the object with the first key
          defaultOptions.object = defaultOptions.object[currentKey];
        };
        var finalKey = addressOne.shift();
        defaultOptions.object = defaultOptions.object[finalKey][index];
      };
      if (addressTwo.length > 0) {
        while (addressTwo.length > 1) {
          // shift off and store the first key
          var currentKey = addressTwo.shift();
          // drill down the object with the first key
          defaultOptions.object = defaultOptions.object[currentKey];
        };
        var finalKey = addressTwo.shift();
        defaultOptions.object[finalKey] = defaultOptions.newValue;
      };
    };
    if (defaultOptions.object != null && defaultOptions.path != null && defaultOptions.newValue != null) {
      if (defaultOptions.path.indexOf("[") != -1 && defaultOptions.path.indexOf("]") != -1) {
        _setCloneData();
      } else {
        _setData();
      };
    } else {
      return false;
    };
  };

  function getObject(options) {
    var defaultOptions = {
      object: null,
      path: null
    };
    if (options) {
      var defaultOptions = helper.applyOptions(defaultOptions, options);
    };
    var _getData = function() {
      // split path into array items
      var address = defaultOptions.path.split(".");
      // while array has more than 1 item
      while (address.length > 1) {
        // shift off and store the first key
        var currentKey = address.shift();
        // copy the object
        var parentObject = defaultOptions.object;
        // drill down the object with the first key
        defaultOptions.object = defaultOptions.object[currentKey];
        // if there is not object there make one
        if (!defaultOptions.object || typeof defaultOptions.object != "object") {
          defaultOptions.object = parentObject;
          defaultOptions.object[currentKey] = {};
        };
      };
      var finalKey = address.shift();
      if (finalKey in defaultOptions.object) {
        return defaultOptions.object[finalKey];
      } else {
        // if nothing found set empty value and then return
        defaultOptions.object[finalKey] = "";
        return defaultOptions.object[finalKey];
      };
    };
    var _getCloneData = function() {
      var addressOne = defaultOptions.path.substr(0, defaultOptions.path.indexOf("[")).split(".");
      var index = parseInt(defaultOptions.path.substr((defaultOptions.path.indexOf("[") + 1), (defaultOptions.path.indexOf("]") - 1)), 10);
      var addressTwo = defaultOptions.path.substr((defaultOptions.path.indexOf("]") + 1), defaultOptions.path.length).split(".");
      if (addressTwo[0] == "") {
        addressTwo.shift();
      };
      if (addressOne.length > 0) {
        while (addressOne.length > 1) {
          // shift off and store the first key
          var currentKey = addressOne.shift();
          // drill down the object with the first key
          defaultOptions.object = defaultOptions.object[currentKey];
        };
        var finalKey = addressOne.shift();
        defaultOptions.object = defaultOptions.object[finalKey][index];
      };
      if (addressTwo.length > 0) {
        while (addressTwo.length > 1) {
          // shift off and store the first key
          var currentKey = addressTwo.shift();
          // drill down the object with the first key
          defaultOptions.object = defaultOptions.object[currentKey];
        };
        var finalKey = addressTwo.shift();
        defaultOptions.object = defaultOptions.object[finalKey];
      };
      return defaultOptions.object;
    };
    if (defaultOptions.object != null && defaultOptions.path != null) {
      if (defaultOptions.path.indexOf("[") != -1 && defaultOptions.path.indexOf("]") != -1) {
        return _getCloneData();
      } else {
        return _getData();
      };
    } else {
      return false;
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

  function randomString(stringLength) {
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
      canvas = document.createElement("canvas"),
      context = canvas.getContext && canvas.getContext("2d"),
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

  function applyOptions(defaultOptions, options) {
    if (defaultOptions && options) {
      if (options) {
        for (var key in options) {
          if (key in defaultOptions) {
            defaultOptions[key] = options[key];
          };
        };
      };
      return defaultOptions;
    } else {
      return null;
    };
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
    randomString: randomString,
    randomNumber: randomNumber,
    getRadioValue: getRadioValue,
    getUrlParameter: getUrlParameter,
    pasteStrip: pasteStrip,
    inViewport: inViewport,
    makeObject: makeObject,
    sortObject: sortObject,
    getDateTime: getDateTime,
    getAverageColor: getAverageColor,
    applyOptions: applyOptions,
    replaceAt: replaceAt
  };

})();
