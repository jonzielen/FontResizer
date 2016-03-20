var FontResizer = function(obj) {
  var settings = {
    lines: 1,
    maxFontSize: 0 // 0 = no minimum
  };

  function setSettings(newSettings) {
    for (var newSetting in newSettings) {
      if (newSettings.hasOwnProperty(newSetting)) {
        settings[newSetting] = newSettings[newSetting];
      }
    }

    init(settings);
  }

  // initializing function
  function init(settings) {
    // get all elems
    var elems = [].slice.call(obj);

    // resets all heights and change opacity
    elems.map(function(elem) {
      resetFontHeight(elem);
      hideElem(elem);
    });

    // get elem tag, make new elem, hide it, get height, remove elem
    function getDefaultElemHeight(s) {
      var newElemHeight = getHeightNumber(s);

      // clone elem add it to dom, read props
      var parentElem = elems[0].parentElement,
          newElem = document.createElement(elems[0].tagName);
      newElem.textContent = 'Z';
      newElem.id = 'tempElem';
      newElem.style.cssText = 'position:absolute;opacity:0;';

      if (newElemHeight !== 0) {
        newElem.style.fontSize = s;
      }

      parentElem.insertBefore(newElem, elems[0]);
      newElemHeight = getHeightNumber(window.getComputedStyle(newElem, null).height);
      parentElem.removeChild(document.getElementById('tempElem'));

      return newElemHeight;
    }

    function getHeightNumber(s) {
      return parseInt(s, 10);
    }

    function setHeightNumber(s) {
      return s+'px';
    }

    function resetFontHeight(elem) {
      elem.style.fontSize = '0px';
    }

    function hideElem(elem) {
      elem.style.opacity = 0;
    }

    function showElem(elem) {
      elem.style.opacity = 1;
    }

    function increaseFontSize(elem) {
      return getHeightNumber(window.getComputedStyle(elem, null).fontSize) + 1;
    }

    function decreaseFontSize(elem) {
      return getHeightNumber(window.getComputedStyle(elem, null).fontSize) - 1;
    }

    function elemHeightLessThanDefault(elem) {
      // current elem height is less than or equal to elem height at current font size
      if (getHeightNumber(window.getComputedStyle(elem, null).height) <= (getDefaultElemHeight(window.getComputedStyle(elem, null).fontSize) * settings.lines)) {
        return true;
      }

      return false;
    }

    function elemFontLessThanDefault(elem) {
      // font size is less than/equal to max font, OR if max font size set
      if (getHeightNumber(window.getComputedStyle(elem, null).fontSize) <= getHeightNumber(settings.maxFontSize) || getHeightNumber(settings.maxFontSize) === 0) {
        return true;
      }
      return false;
    }

    elems.map(function(elem) {
      while (elemHeightLessThanDefault(elem) && elemFontLessThanDefault(elem)) {
        elem.style.fontSize = increaseFontSize(elem)+'px';
      }
      elem.style.fontSize = decreaseFontSize(elem)+'px';
      showElem(elem);
      return;
    });
  }

  return {
    resize: setSettings
  };
};
