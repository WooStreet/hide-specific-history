import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [tailwindcss()],
	// ルートディレクトリを指定
	root: "./src",
	// ビルド時の出力先を指定
	build: {
		outDir: "../dist",
		// ビルド時に出力先のディレクトリを空にする
		emptyOutDir: true,
		rollupOptions: {
			input: {
				// htmlファイルのパスを指定
				popup: "src/popup.html",
				settings: "src/pages/settings/index.html",
				// service workerファイルのパスを指定
				// バックグラウンドで動作するためhtmlからは呼び出さない
				serviceWorker: "src/assets/scripts/serviceWorker/index.ts",
			},
			output: {
				// tsのコンパイル後のファイル名を指定
				entryFileNames: () => {
					return "assets/scripts/[name].js";
				},
			},
		},
	},
});
