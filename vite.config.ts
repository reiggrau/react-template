import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		reactRouter(),
		{
			name: 'ignore-chrome-devtools-probe',
			configureServer(server) {
				server.middlewares.use((req, res, next) => {
					if (req.url === '/.well-known/appspecific/com.chrome.devtools.json') {
						res.writeHead(404).end();
						return;
					}
					next();
				});
			},
		},
	],
	resolve: {
		tsconfigPaths: true,
	},
});
