import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");

export default defineConfig({
    plugins: [vue()],
    resolve: {
        dedupe: ["vue"],
        alias: {'./runtimeConfig': './runtimeConfig.browser', "@": path.resolve(__dirname, "./src")}
    },
    server: {
        port: 8082
    },
    test: {
        globals: true,
        environment: "jsdom",
        environmentOptions: {
            jsdom: {
                url: 'http://localhost'
            }
        }
    },
});