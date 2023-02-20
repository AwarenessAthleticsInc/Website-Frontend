const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    if(process.env.NODE_ENV === "development") {
        app.use(
            '/',
            createProxyMiddleware({
                target: 'http://localhost:5000',
                changeOrigin: true,
            })
        );
    }
};