import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';

export default [
  {
    name: 'bundling javascript files',
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
    }
  },

  {
    name: 'bundling sass files',
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
    ]
  }
];