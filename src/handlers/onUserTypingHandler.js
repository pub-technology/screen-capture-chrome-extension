const { match: matchFunc } = require('../match');

// Find first ancestor of el with tagName
// or undefined if not found
function upTo(el, tagName) {
  tagName = tagName.toLowerCase();
  let maxUpto = 2;
  while (el && el.parentNode) {
    if (maxUpto === 0) {
      return null;
    }
    el = el.parentNode;
    if (el.tagName && el.tagName.toLowerCase() === tagName) {
      return el;
    }
    maxUpto--;
  }

  // Many DOM methods return null if they don't
  // find the element they are searching for
  // It would be OK to omit the following and just
  // return undefined
  return null;
}

class UserTypingMonitoring {
  constructor() {
    this.init();
    this.currentText = '';
  }

  extractDOMAndGetText(event) {
    let value = '';
    const tagName = event.target.tagName.toLowerCase();
    if (['input', 'textarea'].includes(tagName)) {
      value = event.target.value;
    } else if (['div', 'a'].includes(tagName)) {
      value = event.target.innerText || event.target.value;
    }
    if (tagName === 'a') {
      if (matchFunc(value)) {
        chrome.runtime.sendMessage({ type: 'notify', text: value });
        this.currentText = '';
      }
      return;
    }
    if (event.key === "Enter" && this.currentText && this.currentText !== '') {
      if (matchFunc(value)) {
        chrome.runtime.sendMessage({ type: 'notify', text: value });
      }
    } else {
      this.currentText = value;
    }
  }

  onChangeEventHandler(event) {
    if (event.target && event.target.tagName) {
      this.extractDOMAndGetText(event);
    }
  }

  keyupEventHandler(event) {
    if (event.target && event.target.tagName) {
      this.extractDOMAndGetText(event);
    }
  }

  onMouseHoverEventHandler(event) {
    if (event.target && event.target.tagName) {
      const linkElement = upTo(event.target, 'a');
      if (linkElement) {
        this.extractDOMAndGetText(linkElement);
      }
    }
  }

  onChangeHandler(event) {
    if (!event) {
      return;
    }
    switch (event.type) {
      case 'change':
        this.onChangeEventHandler(event);
        break;
      case 'keyup':
        this.keyupEventHandler(event);
        break;
      case 'mouseover':
        this.onMouseHoverEventHandler(event);
        break;
    }
  };

  init() {
    document.addEventListener('change', this.onChangeHandler.bind(this));
    document.addEventListener('keyup', this.onChangeHandler.bind(this));
  }
}

module.exports = UserTypingMonitoring;
