import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { EnvSchema } from './env.schema.ts';

// https://vite.dev/config/
export default defineConfig((config) => {
    const env = loadEnv(config.mode, '.');
    const envValidation = EnvSchema.validate(env);
    if (envValidation.error) throw envValidation.error;
    return {
        plugins: [react(), tailwindcss()],
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
