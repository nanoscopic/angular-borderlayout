/**
 * Created by scott on 16-6-13.
 */
'use strict'
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const _ = require('lodash')

const UnminifiedWebpackPlugin = require('unminified-webpack-plugin')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractSCSS = new ExtractTextPlugin('[name].min.css')

const PACKAGE = require('./package.json')
const banner = fs.readFileSync('./src/banner.ejs')

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: {
		borderLayout: './borderLayout'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].min.js',
		libraryTarget: 'umd'
	},
	debug: false,
	devtool: null,
	externals: {
		angular: true
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: [
					path.resolve(__dirname, './src')
				],
				exclude: /(node_modules|bower_components)/,
				loader: 'ng-annotate!babel'
			},
			{
				test: /\.html$/,
				include: [
					path.resolve(__dirname, './src')
				],
				loader: 'html?attrs=link:href img:src use:xlink:href'
			},
			{
				test: /\.s[ac]ss$/,
				include: [
					path.resolve(__dirname, './src')
				],
				loader: extractSCSS.extract(['css', 'postcss', 'resolve-url', 'sass?sourceMap'])
			},
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
		new UnminifiedWebpackPlugin(),
		extractSCSS,
		new webpack.BannerPlugin(_.template(banner)({ pkg: PACKAGE }))
	],
	eslint: {
		emitError: false,
		emitWarning: false,
		quiet: false,
		failOnWarning: false,
		failOnError: false
	},
	postcss: function () {
		return [
			require('autoprefixer')({
				browsers: [
					'last 2 versions',
					'> 1%',
					'not ie <= 8'
				],
				add: true
			}),
			require('postcss-normalize-charset')
		]
	}
}
