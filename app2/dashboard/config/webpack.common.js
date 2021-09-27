const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "[name].[contenthash].js",
	},
	resolve: {
		extensions: [".js", ".vue"],
	},
	module: {
		// Containes an object with an array of loaders (a lodaer tells Webpack how to process different files)
		rules: [
			{
				test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
				use: [{ loader: "file-loader" }],
			},
			{
				test: /\.vue$/,
				use: "vue-loader",
			},
			{
				test: /\.scss|\.css$/,
				use: ["vue-style-loader", "style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.js$|jsx/, // what files to target
				exclude: /node_modules/, // what to exclude from processing
				use: {
					loader: "babel-loader", // what loader to use
					options: {
						presets: ["@babel/preset-env"], // tells Babel how to process ES2015(16,17,18,19,20)
						plugins: ["@babel/plugin-transform-runtime"], // adds polyfills for JS
					},
				},
			},
		],
	},
	plugins: [new VueLoaderPlugin()],
};
