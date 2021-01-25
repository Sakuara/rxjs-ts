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
        include: path.resolve(__dirname,'./src'),
        use: [
          'babel-loader',
          'ts-loader'
        ]
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname,'./src'),
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/i,
        include: path.resolve(__dirname,'./src'), // 使用include说明loader具体在那个文件夹下执行，优化性能
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
        include: path.resolve(__dirname,'./src'), //在次目录下使用
        use: ['file-loader'],
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // 支持的后缀列表，引入时不用加后缀
    modules: [path.resolve(__dirname,'./node_modules')], // 查找第三方模块
    alias: { // 别名 使用别名减少查找过程，节省时间
      // react: "./node_modules/react/umd/react.production.js" // eg.
      "@": path.resolve(__dirname,'./src/styles'), // 使用绝对路径减少相对路径 转换成绝对路径时间
    }
  },
  externals: { // 优化静态资源cdn，__防止__将某些 import 的包(package)__打包__到 bundle 中，而是在运行时(runtime)再去从外部获取这些_扩展依赖(external dependencies)_
    
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};