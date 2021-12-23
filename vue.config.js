const fs = require('fs');
const $buildTime = new Date().getTime()

/**
 * 我们的代理设置
 */
function myProxy() {
    if (process.env.NODE_ENV === 'production' || !process.env.VUE_APP_SERVER) {
        // build的时候，不需要配置代理
        return null
    }

    // 以下url要转发到后端
    const urls = [
        '/api',
    ]

    // 迭代urls，生成代理规则
    const proxy = {}
    for (let i = 0; i < urls.length; i++) {
        const key = urls[i]
        proxy[key] = {
            target: process.env.VUE_APP_SERVER,
            ws: true,
            changeOrigin: true,
            secure: process.env.DEV_SERVER_HTTPS === 'true' // 如果是https接口，需要配置为 true
        }
    }
    console.log('当前用的API代理', process.env.VUE_APP_SERVER, proxy)
    return proxy
}

/**
 * 设置打包目录
 * @returns {string}
 */
function outputDirF() {
    let outputDir = './build'
    if (process.env.VUE_APP_build_mode !== 'unf') {
        outputDir = './build'
    }
    return outputDir
}


const ed = {
    // 选项...
    publicPath: './',

    // 直接build到发版目录中
    outputDir: outputDirF(),

    // 打开css的源码模式，方便调试
    css: {
        sourceMap: (process.env.NODE_ENV === 'development')
    },

    devServer: {
        port: 8090, // 端口
        proxy: myProxy(), // 转发
    },

    productionSourceMap: false, // 生产环境是否生成 sourceMap 文件

    // configureWebpack(config) {
    //     config.optimization = {
    //         splitChunks: {
    //             chunks: 'all',
    //             minSize: 20000,
    //             maxSize: 30000,
    //             minChunks: 1,
    //             maxAsyncRequests: 30,
    //             maxInitialRequests: 25,
    //             automaticNameDelimiter: '~',
    //             automaticNameMaxLength: 30,
    //             name: true,
    //             cacheGroups: {
    //                 vendors: {
    //                     test: /[\\/]node_modules[\\/]/,
    //                     priority: -10
    //                 },
    //                 default: {
    //                     minChunks: 2,
    //                     priority: -20,
    //                     reuseExistingChunk: true
    //                 }
    //             }
    //         }
    //     }
    // },

    chainWebpack(config) {
        // it can improve the speed of the first screen, it is recommended to turn on preload
        jsonWrite()

        config.plugin('preload').tap(() => [{
            rel: 'preload',
            // to ignore runtime.js
            // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
            fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
            include: 'initial'
        }])

        config.plugin('html')
            .tap(args => {
                // 给index.html增加占位变量 buildTime title
                const options = args[0]
                options.buildTime = $buildTime // 记录build的时间
                options.title = process.env.VUE_APP_TITLE // 设置页面标题
                return args
            })

        // when there are many pages, it will cause too many meaningless requests
        config.plugins.delete('prefetch')
    },
}

function jsonWrite() {
    let text = {
        'data': {
            'buildTime': $buildTime
        }
    }
    let str = JSON.stringify(text);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
    fs.writeFile('./public/v.json', str, function (err) {
        if (err) {
            console.error(err);
        }
        console.log('----------buildTime新增成功-------------');
    })
}


module.exports = ed
