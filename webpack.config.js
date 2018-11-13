const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const publicPath = ''
const PrerenderSPAPlugin = require('prerender-spa-plugin')

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
    // new PrerenderSPAPlugin({
    //   staticDir: resolve(__dirname, 'dist'),
    //   routes: [ '/', '/Contacts' ], // 需要预渲染的路由（视你的项目而定）
    //   minify: {
    //     collapseBooleanAttributes: true,
    //     collapseWhitespace: true,
    //     decodeEntities: true,
    //     keepClosingSlash: true,
    //     sortAttributes: true
    //   }
    // })
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
  devtool: options.dev ? '#eval-source-map' : '#source-map'
})
