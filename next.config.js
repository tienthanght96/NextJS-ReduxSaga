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

    return config
  }
}));
