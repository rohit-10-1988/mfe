const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const devConfig = {
  mode: 'development',
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes:{
        marketing: 'marketing@http://localhost:8081/remoteEntry.js'
      }
      
    })
    
  ],
};

module.exports = merge(commonConfig, devConfig);
