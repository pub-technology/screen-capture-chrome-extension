global.userInfo = null;
global.platform = null;

const getProfileUserInfo = async () => {
  return new Promise((resolve) => {
    if (global.userInfo) {
      resolve(global.userInfo);
      return;
    }
    if (chrome && chrome.identity) {
      chrome.identity.getProfileUserInfo((userInfo) => {
        global.userInfo = userInfo;
        resolve(userInfo);
      });
    } else {
      resolve(null);
    }
  })
}

const getPlatformInfo = async () => {
  return new Promise((resolve) => {
    if (global.platform) {
      resolve(global.platform);
      return;
    }
    if (chrome && chrome.identity) {
      chrome.identity.getPlatformInfo((platformInfo) => {
        resolve(platformInfo);
      });
    } else {
      resolve(null);
    }
  })
}

module.exports = {
  getProfileUserInfo,
  getPlatformInfo
}

