const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, "src"),
}

module.exports = {
  entry: './src/index.ts',
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    publicPath: "/dist/",
  },

  devtool: "source-map",

  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: "all",
          enforce: true
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ],
  },

  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ],
  },

  devServer: {
    static: path.join(__dirname, "dist"),
    historyApiFallback: true,
    hot: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),

    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true} ),
    }),
  ],
};
