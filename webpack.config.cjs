const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const PROD = (process.env.NODE_ENV === "production");
const MINIMIZE = (process.env.MINIMIZE === "true");
const COMMONJS = (process.env.TARGET === "cjs");
let filename = "[name]";
let sourceMapFilename = "[name]";

if (MINIMIZE) {
  filename += COMMONJS ? ".min.cjs" : ".min.js";
  sourceMapFilename += COMMONJS ? ".min.cjs.map" : ".min.js.map";
} else {
  filename += COMMONJS ? ".cjs" : ".js";
  sourceMapFilename += COMMONJS ? ".cjs.map" : ".js.map";
}

const patterns = [
  {
    from: "node_modules/jszip/dist/jszip.min.js",
    to: "jszip.min.js",
    toType: "file",
    force: true
  },
  {
    from: "node_modules/localforage/dist/localforage.min.js",
    to: "localforage.min.js",
    toType: "file",
    force: true
  },
  {
    from: "node_modules/mocha/mocha.js",
    to: "mocha.js",
    toType: "file",
    force: true
  },
  {
    from: "node_modules/mocha/mocha.js.map",
    to: "mocha.js.map",
    toType: "file",
    force: true
  },
  {
    from: "node_modules/mocha/mocha.css",
    to: "mocha.css",
    toType: "file",
    force: true
  },
  {
    from: "node_modules/marked/lib/marked.umd.js",
    to: "marked.umd.js",
    toType: "file",
    force: true
  },
  {
    from: "node_modules/marked/lib/marked.umd.js.map",
    to: "marked.umd.js.map",
    toType: "file",
    force: true
  }
];

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    "epub": "./src/epub.js",
    "test": [
      "./test/book.js",
      "./test/epubcfi.js",
      "./test/locations.js",
      "./test/navigation.js",
      "./test/packaging.js",
      "./test/path.js",
      "./test/rendition.js",
      "./test/section.js",
      "./test/sections.js",
      "./test/themes.js",
      "./test/url.js"
    ]
  },
  devtool: PROD ? "source-map" : "eval-source-map",
  target: COMMONJS ? "node" : "web",
  output: {
    path: path.resolve(__dirname, COMMONJS ? "dist/server" : "dist/public"),
    filename: filename,
    sourceMapFilename: sourceMapFilename,
    library: "ePub",
    libraryTarget: COMMONJS ? "commonjs" : "umd",
    libraryExport: "default",
    publicPath: "/dist/public/"
  },
  optimization: {
    minimize: MINIMIZE
  },
  externals: {
    "jszip": COMMONJS ? "jszip" : "JSZip",
    "localforage": "localforage"
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser"
    }),
    !COMMONJS && new CopyPlugin({ patterns })
  ],
  resolve: {
    alias: {
      process: "process/browser"
    },
    tsconfig: false
  },
  devServer: {
    hot: false,
    liveReload: true,
    static: ["./"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", {
              corejs: { version: "3.49", proposals: true },
              modules: false,
              targets: "defaults",
              bugfixes: true,
              useBuiltIns: "usage"
            }]],
            plugins: [
              "@babel/plugin-proposal-export-default-from"
            ]
          }
        },
        resolve: {
          fullySpecified: false
        }
      }
    ]
  },
  performance: {
    hints: false
  }
};
