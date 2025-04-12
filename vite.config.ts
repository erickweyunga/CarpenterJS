import { defineConfig, type ProxyOptions } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

import { getEnv } from "./utils/util";
import { getProxy, getWatchOptions } from "./carpenterjs/src";

export default defineConfig(({ mode }) => {
  const env = getEnv(mode);
  const proxy = getProxy(env);
  const watch = getWatchOptions();

  return {
    root: "pages",
    plugins: [react()],
    server: {
      port: Number(env.CARPENTER_VITE_PORT || 3000),
      proxy,
      watch,
    },
    preview: {
      port: Number(env.CARPENTER_VITE_PORT || 3000),
      proxy,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./"),
        "@carpenterjs/actions": path.resolve(__dirname, "carpenterjs/src"),
      },
    },
  };
});
