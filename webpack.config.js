const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const WebpackAutoInject = require('webpack-auto-inject-version');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env) => {
    console.log('NODE_ENV: ', env.NODE_ENV); // 'local'
    return {
        entry: {
            app: './src/main.js',
        },
        devtool: 'inline-source-map',
        devServer: {
            contentBase: './dist'
        },
        mode: env.development ? 'development' : 'production',
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new HtmlWebpackPlugin({
                title: 'Output Management',
                template: 'static/index.html'
            }),
            new VueLoaderPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'ENV': JSON.stringify(env.NODE_ENV),
                    'PRODUCTION': JSON.stringify(env.production),
                    'DEVELOPMENT': JSON.stringify(env.development)
                }
            }),
            new WebpackAutoInject({
                // options
                // example:
                components: {
                    AutoIncreaseVersion: true
                },
                componentsOptions: {
                    AutoIncreaseVersion: {
                        runInWatchMode: false // it will increase version with every single build!
                    }
                }
            })
        ],
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            globalObject: 'this'
        },
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    use: 'vue-loader'
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        "style-loader", // creates style nodes from JS strings
                        "css-loader", // translates CSS into CommonJS
                        "sass-loader" // compiles Sass to CSS, using Node Sass by default
                    ]
                }
            ]
        },
        resolve: {
            alias: {
                vue: 'vue/dist/vue.js'
            }
        }
    }

};