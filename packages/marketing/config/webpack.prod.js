const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const domain = process.env.PRODUCTION_DOMAIN
const prodConfig = {
  mode: 'production',
  output: {
    filename:'[name].[contenthash].js',
    publicPath: `${domain}/marketing/latest/`,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'marketing',
      filename: 'remoteEntry.js',
      exposes: {
        './Marketing': './src/bootstrap',
      },
      
    }),
    
  ],
};

module.exports = merge(commonConfig, prodConfig);
