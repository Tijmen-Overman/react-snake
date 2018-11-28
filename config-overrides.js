/* config-overrides.js */
const webpack = require('webpack')
const cp = require('child_process')

// Vars
const packageVersion = process.env.npm_package_version || ''
const commitHash =
  cp
    .execSync('git rev-parse HEAD')
    .toString()
    .trim() || ''

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: (config, env) => {
    // Version ouput for Build
    if (env === 'production') {
      console.log(`⚡ Version: ${packageVersion}`)
      console.log(`⚡ Commit: ${commitHash}`)
    }

    // Add polyfills
    const indexPath = config.entry.slice(-1)[0]
    config.entry = [
      ...config.entry.slice(0, -1),
      indexPath.replace('src/index.js', 'config/polyfills.js'),
      indexPath
    ]

    // Add suport for styled components
    const rewireStyledComponents = require('react-app-rewire-styled-components')
    config = rewireStyledComponents(config, env, {
      ssr: true
    })

    // Handle Plugins
    config.plugins = config.plugins
      .filter(plugin => {
        // remove ServiceWorker
        if (plugin.constructor.name === 'GenerateSW') {
          return false
        }

        return true
      })
      .map(plugin => {
        // Inject global ENVs
        if (
          plugin.constructor.name === 'DefinePlugin' &&
          plugin.definitions['process.env']
        ) {
          plugin = new webpack.DefinePlugin({
            'process.env': {
              ...plugin.definitions['process.env'], // place old vars

              // Set the current commit hash
              COMMIT: JSON.stringify(commitHash),
              // Set the current version
              VERSION: JSON.stringify(packageVersion)
            }
          })
        }

        return plugin
      })

    return config
  }
}
