import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { RequestHandler } from 'express';

export const userProxy = (): RequestHandler =>
  createProxyMiddleware({
    target: 'http://localhost:5001',
    changeOrigin: true,
    pathRewrite: { '^/users': '' },
  });

export const reviewProxy = (): RequestHandler =>
  createProxyMiddleware({
    target: 'http://localhost:5002',
    changeOrigin: true,
    pathRewrite: { '^/reviews': '' },
  });

export const movieProxy = (): RequestHandler =>
  createProxyMiddleware({
    target: 'http://localhost:5003',
    changeOrigin: true,
    pathRewrite: { '^/movies': '' },
  });
