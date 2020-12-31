const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(proxy.createProxyMiddleware('/api', {
    target: 'https://www.fastmock.site/mock/24fcfa946d6641bd1ddd45d1e2c66310/ueba',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  }))
}
