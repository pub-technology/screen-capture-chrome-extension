const debug = require('debug');
const logInfo = require('debug')('pub-technology:main');
const notify = require('./notify');

debug.enable('*');

chrome.runtime.onMessage.addListener((msg) => {
  const { type, text } = msg;
  logInfo(JSON.stringify(msg));
  type === 'notify' && notify(text);
});
