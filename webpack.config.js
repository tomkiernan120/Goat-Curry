const path = require( "path" );

var config = {
  mode: 'development',
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  entry: {
    index: "./src/index.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve( __dirname, 'dist' )
  },
  devServer: {
    contentBase: './public'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};

module.exports = config;