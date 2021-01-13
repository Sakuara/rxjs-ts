const path = require('path');

module.exports = {
  entry: [
    './src/index.ts',
    './src/operators.ts'
  ],
  devtool: 'inline-source-map', // 开启sourcemap便于映射到出错代码
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: "style-loader"
          }, {
            loader: "css-loader",
            options: {
              modules: true // 开启模块化
            }
          }, {
            loader: 'postcss-loader',

          }, {
            loader: "less-loader"
          }
        ]
      }, {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  }
};