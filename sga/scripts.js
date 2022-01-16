var dict = {
  "a": "ᔑ",  "b": "ʖ",  "c": "ᓵ",  "d": "↸",  "e": "ŀ",
  "f": "⎓",  "g": "ㅓ",  "h": "〒",  "i": "╎",   "j": "፧",
  "k": "ꖌ",  "l": "ꖎ",  "m": "ᒲ",  "n": "リ",  "o": "フ",
  "p": "¡",  "q": "ᑑ",  "r": "።",  "s": "ነ",  "t": "ﬧ",
  "u": "⚍",  "v": "⍊",  "w": "∴",  "x": "∕",  "y": "॥",
  "z": "∩",   zeroWidthSpace: '​',
};

var uppercaseEnabled = true;

function checkChanged(box) {
  if (!box.checked) {
    var r = confirm("Warning: This will remove all capitalization in the existing text. Confirm?");
    if (!r) { box.checked = true; return; }
  }

  uppercaseEnabled = box.checked;
  normalChanged();
}

function onLoad() {
  normalChanged();
}

function sgaChanged() {
  var normalInput = document.getElementById('normalInput');
  var sgaInput = document.getElementById('sgaInput');

  var from = sgaInput.value;
  var to = "";

  var upper = false;

  for (var i = 0; i < from.length; i++) {
    var c = from.charAt(i);
    if (c === dict.zeroWidthSpace) {
      if (uppercaseEnabled) { upper = true; }
      continue;
    }

    var f = Object.keys(dict).find(key => dict[key] === c);
    to += f ? (upper ? f.toUpperCase() : f) : (upper ? c.toUpperCase() : c);
    upper = false;
  }

  normalInput.value = to;
}

function normalChanged() {
  var normalInput = document.getElementById('normalInput');
  var sgaInput = document.getElementById('sgaInput');

  if (!uppercaseEnabled) {
    normalInput.value = normalInput.value.toLowerCase();
  }

  var from = normalInput.value;
  var to = "";

  for (var i = 0; i < from.length; i++) {
    var c = from.charAt(i);

    var f = Object.keys(dict).find(k => k === c);
    if (f) { to += dict[f]; continue; }
    f = Object.keys(dict).find(k => k === c.toLowerCase());
    if (f) { to += dict.zeroWidthSpace + dict[f]; continue; }
    to += c;
  }

  sgaInput.value = to;
}

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function () {
    console.log('Async: Copying to clipboard was successful!');
  }, function (err) {
    console.error('Async: Could not copy text: ', err);
  });
}

function normalCopy() {
  var normalInput = document.getElementById('normalInput');
  copyTextToClipboard(normalInput.value);
}

function sgaCopy() {
  var normalInput = document.getElementById('sgaInput');
  copyTextToClipboard(normalInput.value);
}
