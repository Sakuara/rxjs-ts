// common config
const path = require('path');

module.exports = {
  entry: './src/index.ts', // single entry config
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
  }
};