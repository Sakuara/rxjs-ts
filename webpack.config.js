const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 开发模式使用style-loader,HMR功能支持不好
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts', // single entry config
  devtool: 'inline-source-map', // 开启sourcemap便于映射到出错代码
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
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'ts-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
      }, {
        test: /\.(png|jpg|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },],
      }, {
        test: /\.(ttf|woff|eot|svg)$/i, // 引入字体处理
        use: ['file-loader'],
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};