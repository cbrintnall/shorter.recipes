const webpack = require('webpack')
const { merge } = require('webpack-merge')

// These next three configs are SHARED between client and server
// this makes sense while we have little differences between the two,
// but eventually we may need to separate this into separate ones.
const localConfig = {
  mode: 'development',
  plugins: [
    new webpack.EnvironmentPlugin({ SETTINGS: 'local' })
  ]
}

const devConfig = {
  plugins: [
    new webpack.EnvironmentPlugin({ SETTINGS: 'development' })
  ]
}

const prodConfig = {
  plugins: [
    new webpack.EnvironmentPlugin({ SETTINGS: 'production' })
  ]
}

module.exports = (env, args) => {
  const mode = env.BUILD || 'local';
  const bundle = env.BUNDLE;

  if (!bundle) {
    console.error('No bundle specified, please choose either [server, client]');
    process.exit(1);
  }

  const commonConfig = require(`./webpack.${bundle}.config`);

  console.log(`Building config for mode: ${mode} with bundle ${bundle}`);

  switch (mode) {
    case 'local':
      return merge(commonConfig, localConfig);
    case 'development':
      return merge(commonConfig, devConfig);
    case 'production':
      return merge(commonConfig, prodConfig);
    default:
      return merge(commonConfig, localConfig);
  }
}