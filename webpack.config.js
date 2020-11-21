const path = require('path');

module.exports = {
  entry: './src/autosolo-maths.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'autosolo-maths.js',
    library: 'AutosoloMath',
    libraryTarget: 'var',
  },
};
