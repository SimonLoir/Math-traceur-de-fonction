module.exports = {
    config: {
        target: 'node',

        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: 'ts-loader'
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: 'style-loader' // creates style nodes from JS strings
                        },
                        {
                            loader: 'css-loader' // translates CSS into CommonJS
                        },
                        {
                            loader: 'sass-loader' // compiles Sass to CSS
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        watch: true
    }
};
