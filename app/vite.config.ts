import { defineConfig } from "vite";
// import tailwindcss from "tailwindcss";
// import autoprefixer from "autoprefixer";

export default defineConfig({
	// ルートディレクトリを指定
	root: "./src",
	// ビルド時の出力先を指定
	build: {
		outDir: "../dist",
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
