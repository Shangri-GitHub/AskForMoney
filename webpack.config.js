const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const url = require('url')
const publicPath = ''

module.exports = (options = {}) => ({

  entry: {
    vendor: './src/vendor',
    index: './src/main.js'
  },
  externals:{
    'vue-router': 'VueRouter',
    'vue': 'Vue',
    'axios': 'axios',
    'element-ui': 'ELEMENT',
    'vuex': 'Vuex',
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
    chunkFilename: '[id].js?[chunkhash]',
    publicPath: options.dev ? '/assets/' : publicPath
  },
  module: {
    rules: [{
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      { test: /\.mp3$/, loader: 'file-loader'},
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    //gzip 压缩
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',   // 目标文件名
      algorithm: 'gzip',   // 使用gzip压缩
      test: new RegExp(
        '\\.(js|css)$'    // 压缩 js 与 css
      ),
      threshold: 10240,   // 资源文件大于10240B=10kB时会被压缩
      minRatio: 0.8  // 最小压缩比达到0.8时才会被压缩
    }),



  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
      'jquery': 'jquery'
    }
  },
  devServer: {
    host: '127.0.0.1',
    port: 8011,
    proxy: {
      '/sell/': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    historyApiFallback: {
      index: url.parse(options.dev ? '/assets/' : publicPath).pathname
    }
  },
  devtool: options.dev ? '#eval-source-map' : false
})
