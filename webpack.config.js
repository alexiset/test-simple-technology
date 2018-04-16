var webpack = require('webpack'),
	path = require('path');

module.exports = env => {
	return {
		entry: [
			path.resolve(__dirname, 'src/index.jsx')
		],

		output: {
			path: path.resolve(__dirname, './dist/js'),
			filename: 'bundle.js'
		},

		resolve: {
			extensions: ['.js', '.jsx'],
		},

		devtool: env.production ? false : 'inline-source-map',

		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /(node_modules)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								'babel-preset-env',
								'babel-preset-react',
								'babel-preset-stage-2'
							]
						}
					}
				},

				{
					test: /\.scss$/,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								modules: true,
								localIdentName: '[name]_[local]_[hash:base64:5]'
							}
						},
						'sass-loader'
					]
				},

				{
					test: /\.(png|jpg|jpeg|gif)$/,
					include: [path.resolve(__dirname, 'src')],
					loader: 'file-loader?name=assets/pictures/[name].[hash].[ext]'
				}
			]
		},

		devServer: {
			port: 3000,
			host: '0.0.0.0',
			compress: true,
			hot: true,
			https: false,
			historyApiFallback: true,
			disableHostCheck: true,
		}
	}
};