module.exports = {
  presets: [require.resolve("@docusaurus/core/lib/babel/preset")],
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.resolve.alias["@site"] = path.resolve(__dirname);
      return webpackConfig;
    },
  },
};
