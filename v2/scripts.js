var dict = {
  "a": "ᔑ",
  "b": "ʖ",
  "c": "ᓵ",
  "d": "↸",
  "e": "ŀ",
  "f": "⎓",
  "g": "ㅓ",
  "h": "〒",
  "i": "╎",
  "j": "፧",
  "k": "ꖌ",
  "l": "ꖎ",
  "m": "ᒲ",
  "n": "リ",
  "o": "フ",
  "p": "¡",
  "q": "ᑑ",
  "r": "።",
  "s": "ነ",
  "t": "ﬧ",
  "u": "⚍",
  "v": "⍊",
  "w": "∴",
  "x": "∕",
  "y": "॥",
  "z": "∩",
  zeroWidthSpace: '​',
};

var uppercaseEnabled = true;

function sgaChanged() {
  var normalInput = document.getElementById('normalInput');
  var sgaInput = document.getElementById('sgaInput');

  var from = sgaInput.value;
  var to = "";

  if (!uppercaseEnabled) {
    while (from.includes(dict.zeroWidthSpace)) {
      from = from.replace(dict.zeroWidthSpace, "");
    }
    sgaInput.value = from;
  }

  var upper = false;

  for (var i = 0; i < from.length; i++) {
    var c = from.charAt(i);
    if (c === dict.zeroWidthSpace) {
      upper = true;
      continue;
    }

    var didAdd = false;
    for (const key in dict) {
      if (dict[key] === c) {
        to += upper ? key.toUpperCase() : key;
        didAdd = true;
      }
    }
    if (!didAdd) {
      to += upper ? c.toUpperCase() : c;
    }
    upper = false;
  }

  normalInput.value = to;
}

function normalChanged() {
  var normalInput = document.getElementById('normalInput');
  if (!uppercaseEnabled) {
    normalInput.value = normalInput.value.toLowerCase();
  }
  var sgaInput = document.getElementById('sgaInput');

  var from = normalInput.value;
  var to = "";

  for (var i = 0; i < from.length; i++) {
    var c = from.charAt(i);
    if (Object.prototype.hasOwnProperty.call(dict, c)) {
      to += dict[c];
    } else if (Object.prototype.hasOwnProperty.call(dict, c.toLowerCase())) {
      to += dict.zeroWidthSpace + dict[c.toLowerCase()];
    } else {
      to += c;
    }
  }

  sgaInput.value = to;
}

function checkChanged(box) {
  if (!box.checked) {
    var r = confirm("Warning: This will remove all capitalization in the existing text. Confirm?");
    if (!r) {
      box.checked = true;
      return;
    }
  }

  uppercaseEnabled = box.checked;
  normalChanged();
}

function onLoad() {
  normalChanged();
}