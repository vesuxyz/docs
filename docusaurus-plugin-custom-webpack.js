// docusaurus-plugin-custom-webpack.js
const path = require("path");

module.exports = function (context, options) {
  return {
    name: "docusaurus-plugin-custom-webpack",
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          alias: {
            "@site": path.resolve(__dirname),
          },
        },
      };
    },
  };
};
