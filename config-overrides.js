const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = function override(config, env) {
  config.plugins = config.plugins.map(plugin => {
    if (plugin.constructor.name === 'GenerateSW') {
      return new WorkboxWebpackPlugin.InjectManifest({
        exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/, /netlify.toml/],
        swSrc: './src/sw.ts',
        swDest: 'service-worker.js',
      })
    }
    return plugin
  })

  config.optimization = {
    ...config.optimization,
    minimizer: config.optimization.minimizer.map(plugin => {
      if (plugin.constructor.name === 'TerserPlugin') {
        return new TerserPlugin({
          extractComments: false,
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
        })
      }
      return plugin
    }),
  }
  return config
}
