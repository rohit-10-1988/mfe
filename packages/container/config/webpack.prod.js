const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
console.log('PRODUCTION_DOMAIN:', process.env.PRODUCTION_DOMAIN);
const domain = process.env.PRODUCTION_DOMAIN
const prodConfig = {
  mode: 'production',
  output: {
    filename:'[name].[contenthash].js',
    publicPath: `${domain}/container/latest/`,
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
console.log('Marketing URL will be:', `${domain}/marketing/latest/remoteEntry.js`);
module.exports = merge(commonConfig, prodConfig);
