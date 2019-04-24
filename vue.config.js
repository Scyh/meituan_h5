const path = require('path');

module.exports = {
    devServer: {
        proxy: {
            '/v1': {
                target: 'http://api.map.baidu.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/v1': ''
                }
            },
            '/v2': {
                target: 'http://pv.sohu.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/v2': ''
                },
            }
        },
    },

    pluginOptions: {
      'style-resources-loader': {
        preProcessor: 'sass',
        patterns: ['*']
      }
    },

    chainWebpack: config => {
        config.resolve.alias.set('src', path.join(__dirname, 'src'))
    },

    css: {
        loaderOptions: {
          sass: {
            data: `@import "@/common/style/common.scss";`
            }
        }
    }
}
