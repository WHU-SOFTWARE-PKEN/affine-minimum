    // // webpack.config.js

    // const path = require('path');

    // module.exports = {
    //   mode: 'development',
    //   entry: './composables/dbClient.ts',
    //   output: {
    //     filename: 'main.js', // 输出的bundle文件名
    //     path: path.resolve(__dirname, './'), // 输出的目录
    //   },
    //   module: {
    //     rules: [
    //       {
    //         test: /\.ts$/,
    //         use: [
    //           'json-loader',
    //           'babel-loader',
    //           'ts-loader'
    //         ],
    //       },
    //     ],
    //   },
    // };