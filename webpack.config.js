const path = require('path');
const baseConfig = require('./config/webpack').config;
const app = {
    entry: {
        graphing: './src/app/graphing/index.ts',
        probabilities: './src/app/probabilities/index.ts',
        index: './src/app/index.ts'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/app/js')
    },
    ...baseConfig
};

const benchmark = {
    entry: {
        benchmark: './src/benchmark/index.ts'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/tests')
    },
    ...baseConfig
};

const lib = {
    entry: {
        smath: './src/lib.ts'
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'dist/lib'),
        library: 'smath',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    ...baseConfig
};

module.exports = [app, lib, benchmark];
