const waitFor = ms => new Promise(res => setTimeout(res, ms));

module.exports = waitFor;
