import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { EnvSchema } from './env.schema.ts';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig((config) => {
    const env = loadEnv(config.mode, '.');
    const envValidation = EnvSchema.validate(env);
    if (envValidation.error) throw envValidation.error;
    return {
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                '@products': path.resolve(__dirname, 'src/contexts/products'),
                '@shared': path.resolve(__dirname, 'src/contexts/shared'),
            },
        },
        test: {
            coverage: {
                include: ['src/**/*.{ts,tsx}'],
            },
            environment: 'jsdom',
            globals: true,
            include: ['tests/**/*.spec.{ts,tsx}'],
            setupFiles: './tests/setup-tests.ts',
        },
    };
});
