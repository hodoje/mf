const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const DEV_PORT = 8082;

const devConfig = {
	mode: "development",
	output: {
		// Used anytime you have some part of Webpack that tried to refer to a file that's been built by Webpack
		// Example is when HtmlWebpackPlugin tries to refer to some JS file built by Webpack
		// When resolving the path Webpack will look for domain + publicPath + filename
		// In case of nested routes where we have a route like http://localhost:8082/auth/signin
		// browser will see this as http://localhost:8082/auth/ and will try to fetch the remoteEntry.js file from there
		// This will break since the file is not there, but on http://localhost:8082/remoteEntry.js
		// In case this property isn't set, browser will try to load the main.js file from the same location remoteEntry.js file was !!!
		// All of this works in case of top level navigation since it will always try to fetch from the root domain like http://localhost:8082/
		// but in case of nested routes it will fail since it will try to fetch the files from wrong location
		publicPath: `http://localhost:${DEV_PORT}/`,
	},
	devServer: {
		port: DEV_PORT,
		historyApiFallback: true,
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "auth",
			filename: "remoteEntry.js",
			exposes: {
				"./AuthApp": "./src/bootstrap",
			},
			shared: packageJson.dependencies,
		}),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
	],
};

module.exports = merge(commonConfig, devConfig);
