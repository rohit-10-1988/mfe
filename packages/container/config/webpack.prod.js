const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const domain = process.env.PRODUCTION_DOMAIN
const prodConfig = {
  mode: 'production',
  output: {
    filename:'[name].[contenthash].js',
    publicPath: '/container/latest/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      filename: 'remoteEntry.js',
      remotes: {
        marketing:`marketing@${domain}/marketing/latest/remoteEntry.js`,
      },
      
    }),
    
  ],
};

module.exports = merge(commonConfig, prodConfig);
