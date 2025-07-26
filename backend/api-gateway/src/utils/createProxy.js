import {createProxyMiddleware} from 'http-proxy-middleware'

export const userProxy=()=>
    createProxyMiddleware({
        target: 'http://user-service:5001',
        changeOrigin: true,
        pathRewrite: { '^/users': '' }
    });

export const reviewProxy=()=>
    createProxyMiddleware({
        target: 'http://review-service:5002',
        changeOrigin: true,
        pathRewrite: { '^/reviews': '' },
    });

export const movieProxy=()=>
    createProxyMiddleware({
        target: 'http://movie-service:5003',
        changeOrigin: true,
        pathRewrite: { '^/movies': '' }
    });

