import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
    server: {
        port: 3001,
        host: true,
        strictPort: true,
		// this part of configuration is needed to docker
		watch : {
			usePolling: true
		}
    }
});
