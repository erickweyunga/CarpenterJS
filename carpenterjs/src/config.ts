import type { ProxyOptions } from "vite";

export function getProxy(
  env: Record<string, string>
): Record<string, string | ProxyOptions> {
  const backendUrl = `http://${env.CARPENTER_HOST}:${env.CARPENTER_PORT}`;

  return {
    "/_actions": {
      target: backendUrl,
      changeOrigin: true,
      headers: {
        "X-Powered-By": "CarpenterJS",
      },
      rewrite: (path) => path.replace(/^\/_actions/, "/_actions"),
    },
    "/api": {
      target: backendUrl,
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, "/_actions"),
    },
  };
}

export const getWatchOptions = () => ({
  include: ["pages/**/*", "types/**/*"],
  exclude: ["node_modules", "**/node_modules/**"],
});
