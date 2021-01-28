const path = require('path');
const baseConfig = require('./webpack.base.config');
const {merge} = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 开发模式使用style-loader,HMR功能支持不好
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // 压缩css
const prodConfig = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.less$/i,
                include: path.resolve(__dirname, './src'), // 使用include说明loader具体在那个文件夹下执行，优化性能
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            },
        ]
    },
    devServer: {
        contentBase: './build',
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
            minify: {
                // 压缩HTML⽂文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空⽩白符与换⾏行行符
                minifyCSS: true // 压缩内联css
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].min.css'
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new CssMinimizerPlugin(),//压缩css
        ],
        usedExports: 'global', // js tree shaking
        splitChunks: {
            chunks: 'all', // code spliting,eg. in main.bundle.js,split it with lodash.js ,main.js
            cacheGroups: {
                'lodash': { // 精确匹配到某个引用然后分割出去
                    test: /lodash/,
                    name: 'lodash'
                },
                'axios': {
                    test: /axios/,
                    name: 'axios'
                }
            }
        }
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build')
    }
};

module.exports = merge(baseConfig, prodConfig)