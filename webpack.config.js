const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: [
    './src/index.ts',
    './src/operators.ts'
  ],
  devtool: 'inline-source-map', // 开启sourcemap便于映射到出错代码
  plugins: [new MiniCssExtractPlugin({
    filename: '[name].[ext]'
  })],
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
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
        }, ],
      }, {
        test: /\.(ttf|woff|eot|svg)$/i,
        use: ['file-loader'],
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname,'dist'),
    publicPath: '/'
  }
};