const backgroundScript = {
  mode: "development",
  name: "backgroundScript",
  entry: './src/index.js',
  output: {
    path: __dirname + "/build",
    filename: "index.js"
  },
  devtool: 'cheap-module-source-map',
}

const contentScripts = {
  mode: "development",
  name: "contentScripts",
  entry: './src/contentScripts.js',
  output: {
    path: __dirname + "/build",
    filename: "contentScripts.js"
  },
  devtool: 'cheap-module-source-map',
}

// Return Array of Configurations
module.exports = [backgroundScript, contentScripts];
