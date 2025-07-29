import { createProxyMiddleware } from 'http-proxy-middleware';
export const userProxy = () => createProxyMiddleware({
    target: 'http://localhost:5001',
    changeOrigin: true,
    pathRewrite: { '^/users': '' },
});
export const reviewProxy = () => createProxyMiddleware({
    target: 'http://localhost:5002',
    changeOrigin: true,
    pathRewrite: { '^/reviews': '' },
});
export const movieProxy = () => createProxyMiddleware({
    target: 'http://localhost:5003',
    changeOrigin: true,
    pathRewrite: { '^/movies': '' },
});
