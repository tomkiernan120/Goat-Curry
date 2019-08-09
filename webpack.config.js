const path = require( "path" );
const { CheckerPlugin } = require('awesome-typescript-loader');

var config = {
  mode: 'development',
  entry: {
    index: "./src/index.ts"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve( __dirname, 'dist' ),
    library: "GoatCurry",
    libraryExport: "default" ,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000,
    publicPath: "http://localhost:8080/dist/",
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/
      },
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
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  plugins: [
    new CheckerPlugin()
  ]
};

module.exports = config;