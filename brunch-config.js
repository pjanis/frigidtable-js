// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      'app.js': /^app/
    }
  },
  stylesheets: {joinTo: 'app.css'}
};

exports.plugins = {
  babel: {presets: ['latest']}
};

exports.modules = {
  autoRequire: {
    'app.js': ['initialize']
  }
};

exports.overrides = {
  production: {
    sourceMaps: true
  },
};
