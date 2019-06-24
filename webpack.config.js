const path = require("path");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    main: "./src/js/main.js"
  },

  output: {
    filename: "[name].js"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve("babel-loader"),
          query: {
            presets: [["@babel/preset-env", { modules: false }]]
          }
        }
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      }
    ]
  },

  resolve: {
    alias: {
      "%components%": path.resolve(__dirname, "src/components")
    }
  },

  plugins: [
    // убедитесь что подключили плагин!
    new VueLoaderPlugin()
  ]
};
