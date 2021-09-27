const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const DEV_PORT = 8083;

const devConfig = {
	mode: "development",
	output: {
		publicPath: `http://localhost:${DEV_PORT}/`,
	},
	devServer: {
		port: DEV_PORT,
		historyApiFallback: true,
		headers: {
			"Access-Control-Allow-Origin": "*", // Adding it because we'll be loading some external fonts and other files
		},
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "dashboard",
			filename: "remoteEntry.js",
			exposes: {
				"./DashboardApp": "./src/bootstrap",
			},
			shared: packageJson.dependencies,
		}),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
	],
};

module.exports = merge(commonConfig, devConfig);
