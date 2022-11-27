const logInfo = require('debug')('pub-technology:main');
const captureCurrentScreen = require('./utils/screenshot');
const { getProfileUserInfo } = require('./utils/runtime');

const notify = async (text) => {
  const userProfile = await getProfileUserInfo();
  const payload = {
    text: text,
    image: await captureCurrentScreen(true),
    profile: userProfile,
  }
  logInfo(payload);
}

module.exports = notify;
