import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { RequestHandler } from 'express';

export const userProxy = (): RequestHandler =>
  createProxyMiddleware({
    target: 'http://user-service:5001',
    changeOrigin: true,
    pathRewrite: { '^/users': '' },
  });

export const reviewProxy = (): RequestHandler =>
  createProxyMiddleware({
    target: 'http://review-service:5002',
    changeOrigin: true,
    pathRewrite: { '^/reviews': '' },
  });

export const movieProxy = (): RequestHandler =>
  createProxyMiddleware({
    target: 'http://movie-service:5003',
    changeOrigin: true,
    pathRewrite: { '^/movies': '' },
  });
