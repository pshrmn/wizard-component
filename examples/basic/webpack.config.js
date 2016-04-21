module.exports = {
  context: __dirname,
  entry: "./index.js",
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  output: {
    path: __dirname + "/public/",
    filename: "./index.js",
  },
  module: {
    loaders: [
     {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
