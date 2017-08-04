var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

const nodeEnv = process.env.NODE_ENV || 'development'

try {
  console.log('NODE_ENV=' + nodeEnv)
  envConfig = require('../config/' + nodeEnv)
  console.dir(envConfig)
} catch (error) {
  console.error('NODE_ENV must correspond to a module defined in the config directory.')
  throw error
}

const extractStylus = new ExtractTextPlugin({
  filename: 'css/app.css'
})

module.exports = {
  entry: [
    path.resolve(__dirname, 'css/app.styl'),
    path.resolve(__dirname, 'js/app.js')
  ],

  output: {
    path: path.resolve(__dirname, '../priv/static'),
    filename: 'js/app.js'
  },

  resolve: {
    modules: ['node_modules', path.resolve(__dirname) + 'js'],
    extensions: ['.js', '.styl'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true
        }
      },
      {
        test: /\.styl$/,
        use: extractStylus.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'stylus-loader'
          }]
        })
      },
      {
        test: /\.(jpg|png|gif|eot|woff2?|ttf|svg)$/,
        loader: 'file-loader?name=[path][name].[hash].[ext]'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin(envConfig),
    new CopyWebpackPlugin([{ from: './static' }]), // Copy ./static to /priv/static
    extractStylus
  ]
}
