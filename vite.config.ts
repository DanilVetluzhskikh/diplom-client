import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [svgr({ exportAsDefault: true }), react()],
    resolve: {
        alias: [{ find: '@', replacement: '/src' }],
    },
    define: {
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('https://diplom-server-8s40.onrender.com/'),
        __PROJECT__: JSON.stringify('frontend'),
    },
});
