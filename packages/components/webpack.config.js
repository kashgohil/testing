const prod = process.env.NODE_ENV === "production";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // mode: self explanatory
  mode: prod ? "production" : "development",
  // entry: entry point of the web app
  entry: "./src/index.tsx",
  // output: emits the bundles at the path and with the name
  output: {
    path: __dirname + "/build/",
    filename: "[name].js",
    chunkFilename: "[chunkhash].js",
  },
  // module: all the rules and loaders are applied here
  module: {
    // resolve files with ts, tsx, js, jsx, json extensions with babel loader
    // trivia: loaders are resolved from right to left or bottom to top
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        resolve: {
          modules: ["node_modules", "src"],
          extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        },
        use: [{ loader: "babel-loader" }],
      },
      {
        // resolve css files with css loader and mini css extract loader
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
        ],
      },
      {
        // resolve svgs - This loader helps to use SVGs directly either as a link or as a ReactComponent
        test: /\.svg$/,
        use: [{ loader: "@svgr/webpack" }],
      },
      // resolve fonts - This is to make font files parseable for webpack
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  // creating source map for development
  devtool: prod ? undefined : "source-map",
  // different plugins for templating, css and many more things
  plugins: [
    // generates html file with with bundles injected in the script tag
    new HtmlWebpackPlugin({
      template: "public/index.html",
      minify: prod
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          }
        : undefined,
    }),
    new MiniCssExtractPlugin(),
  ],
};
