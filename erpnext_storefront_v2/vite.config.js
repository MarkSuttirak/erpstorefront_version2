import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";
import { webserver_port } from "../../../sites/common_site_config.json";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
	port : 8080,
	proxy : getProxyOptions({ port : webserver_port}),
	cors: {
		origin: "*",
		credentials: true,
		methods: "GET POST PUT DELETE OPTIONS",
		
	}
  },
  build: {
		outDir: `../${path.basename(path.resolve(".."))}/public/erpnext_storefront_v2`,
		emptyOutDir: true,
		target: "es2015",
		sourcemap: true,
	},
})


function getProxyOptions({ port }) {
	return {
		
		"^/(app|login|api|assets|files|pages)": {
			target: `http://127.0.0.1:${port}`,
			ws: true,
			router: function (req) {
				const site_name = req.headers.host.split(":")[0];
				return `http://${site_name}:${port}`;
			},
		},
	};
}