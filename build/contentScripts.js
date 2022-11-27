/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/handlers/index.js":
/*!*******************************!*\
  !*** ./src/handlers/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const UserTypingMonitoring = __webpack_require__(/*! ./onUserTypingHandler */ "./src/handlers/onUserTypingHandler.js");

window.onload = () => {
  new UserTypingMonitoring();
};


/***/ }),

/***/ "./src/handlers/onUserTypingHandler.js":
/*!*********************************************!*\
  !*** ./src/handlers/onUserTypingHandler.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { match: matchFunc } = __webpack_require__(/*! ../match */ "./src/match.js");

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


/***/ }),

/***/ "./src/match.js":
/*!**********************!*\
  !*** ./src/match.js ***!
  \**********************/
/***/ ((module) => {

const violenceTexts = [
  'sex',
  'porn',
  'fuck',
]

const match = (text = '') => {
  return violenceTexts.some((item) => {
    return text.toLowerCase().includes(item);
  })
}

module.exports = {
  match
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./src/contentScripts.js ***!
  \*******************************/
__webpack_require__(/*! ./handlers */ "./src/handlers/index.js");

})();

/******/ })()
;
//# sourceMappingURL=contentScripts.js.map