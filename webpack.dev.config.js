const path = require('path');
const baseConfig = require('./webpack.base.config');
const {merge} = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const devConfig = {
    mode: 'development',
    devtool: 'cheap-inline-source-map', // 开启sourcemap便于映射到出错代码
    module: {
        rules: [
            {
                test: /\.less$/i,
                include: path.resolve(__dirname, './src'), // 使用include说明loader具体在那个文件夹下执行，优化性能
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            },
        ]
    },
    devServer: {
        contentBase: './dist',
        open: true,
        hotOnly: true, // 启用热模块替换（请参见 devServer.hot ），而无需页面刷新作为构建失败时的回退
        proxy: {
            '/api': 'http://localhost:3000'
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'myApp',
            template: './src/index.html',
            //template: './src/index.html', 
            //filename: 'app.html'  //这两个在使用dev-server时直接注释掉，否则挂载不到server上
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};

module.exports = merge(baseConfig, devConfig)