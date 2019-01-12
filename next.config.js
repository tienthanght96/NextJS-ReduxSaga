const withSass = require('@zeit/next-sass')
const withImages = require('next-images')
if (typeof require !== 'undefined') {
	require.extensions['.css'] = file => {}
}

module.exports = withImages(withSass({
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000
        }
      }
    })

    return config
  }
}));
