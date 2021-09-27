const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const DEV_PORT = 8081;

const devConfig = {
	mode: "development",
	output: {
		publicPath: `http://localhost:${DEV_PORT}/`,
	},
	devServer: {
		port: DEV_PORT,
		historyApiFallback: true,
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "marketing",
			filename: "remoteEntry.js",
			exposes: {
				"./MarketingApp": "./src/bootstrap",
			},
			shared: packageJson.dependencies,
		}),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
	],
};

module.exports = merge(commonConfig, devConfig);
