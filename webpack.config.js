import webpack from 'webpack';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin';

const uglifyJsPlugin = process.env.PROD == 1? [
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    output: {
      comments: false
    },
    compressor: {
      warnings: false
    }
  }),

  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  })
] : [];

const uglifyCssPlugin = process.env.PROD == 1? [ new OptimizeCssAssetsWebpackPlugin() ] : []

export default [
  {
    name: 'JavaScript',
    entry: __dirname + '/resources/js/entry.js',
    output: {
      filename: 'app.js',
      path: __dirname + '/src/public'
    },
    module: {
      rules: [
        {
          test: /\.js/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },
    plugins: uglifyJsPlugin
  },

  {
    name: 'SASS',
    entry: __dirname + '/resources/sass/entry.sass',
    output: {
      filename: 'app.css',
      path: __dirname + '/src/public'
    },
    module: {
      rules: [
        {
          test: /\.sass/,
          loader: ExtractTextWebpackPlugin.extract({
            use: 'css-loader!postcss-loader!sass-loader',
            fallback: 'style-loader'
          })
        }
      ]
    },
    plugins: [
      new ExtractTextWebpackPlugin('app.css')
    ].concat(uglifyCssPlugin)
  }
];