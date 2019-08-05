const path = require( "path" );

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
    libraryTarget: 'umd'
  },
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
        use: 'ts-loader',
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
};

module.exports = config;