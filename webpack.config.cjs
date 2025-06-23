const CopyPlugin = require("copy-webpack-plugin")
const webpack = require("webpack")
const path = require("path")
const PROD = (process.env.NODE_ENV === "production")
const MINIMIZE = (process.env.MINIMIZE === "true")
let filename = "[name]"
let sourceMapFilename = "[name]"

if (MINIMIZE) {
	filename += ".min.js"
	sourceMapFilename += ".min.js.map"
} else {
	filename += ".js"
	sourceMapFilename += ".js.map"
}

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
	output: {
		path: path.resolve("dist"),
		filename: filename,
		sourceMapFilename: sourceMapFilename,
		library: "ePub",
		libraryTarget: "umd",
		libraryExport: "default",
		publicPath: "/dist/"
	},
	optimization: {
		minimize: MINIMIZE
	},
	externals: {
		"jszip": "JSZip",
		"localforage": "localforage"
	},
	plugins: [
		new webpack.ProvidePlugin({
			process: "process/browser"
		}),
		new CopyPlugin({
			patterns: [
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
					from: "node_modules/mocha/mocha.css",
					to: "mocha.css",
					toType: "file",
					force: true
				},
				{
					from: "node_modules/marked/marked.min.js",
					to: "marked.min.js",
					toType: "file",
					force: true
				}
			]
		})
	],
	resolve: {
		alias: {
			process: "process/browser"
		}
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
							corejs: { version: "3.38", proposals: true },
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
}