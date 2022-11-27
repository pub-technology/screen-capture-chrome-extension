const waitFor = require('./delay');

const captureCurrentScreen = async (isBase64 = false, delay = 1000) => {
  await waitFor(delay);
  const result = await new Promise((resolve) => {
    chrome.tabs.captureVisibleTab({ quality: 100 }, resolve);
  });
  if (isBase64 && result) {
    return result.split(';base64,')[1];
  }
  return result;
}

module.exports = captureCurrentScreen;
