const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'project-name.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    devServer: {
        static: '/dist',
        client: {
          reconnect: 5,
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
        title: "Weather API",
        template: "./src/index.html"
        }),
    ],
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
         {
           test: /\.(png|svg|jpg|jpeg|gif)$/i,
           type: 'asset/resource',
         },
        ],
      },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
};