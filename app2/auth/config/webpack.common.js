module.exports = {
	module: {
		// Containes an object with an array of loaders (a lodaer tells Webpack how to process different files)
		rules: [
			{
				test: /\.js$|jsx/, // what files to target
				exclude: /node_modules/, // what to exclude from processing
				use: {
					loader: "babel-loader", // what loader to use
					options: {
						presets: ["@babel/preset-react", "@babel/preset-env"], // [0] - tells Babel how to process .jsx files, [1] - tells Babel how to process ES2015(16,17,18,19,20)
						plugins: ["@babel/plugin-transform-runtime"], // adds polyfills for JS
					},
				},
			},
		],
	},
};
