module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue({file}) {
                console.log('0000000000000000000000', file)
                return 37.5;
            },
            propList: ['*'],
        },
    },
};
