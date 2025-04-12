// vite.config.ts
import { defineConfig } from "file:///C:/Users/maver/dev/framework/node_modules/vite/dist/node/index.js";
import path from "path";
import react from "file:///C:/Users/maver/dev/framework/node_modules/@vitejs/plugin-react/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\maver\\dev\\framework";
var proxy = {
  "/_actions": {
    target: "http://localhost:8000",
    changeOrigin: true,
    headers: {
      "X-Powered-By": "CarpenterJS"
    },
    rewrite: (path2) => path2.replace(/^\/api/, "/_actions")
  },
  "/api": {
    target: "http://localhost:8000",
    changeOrigin: true,
    rewrite: (path2) => path2.replace(/^\/api/, "/_actions")
  }
};
var watch = {
  include: ["pages/**/*", "types/**/*"],
  exclude: ["node_modules", "**/node_modules/**"],
  ignored: ["!**/node_modules/**"]
};
var vite_config_default = defineConfig({
  root: "pages",
  plugins: [react()],
  server: {
    port: 3e3,
    proxy,
    watch
  },
  preview: {
    port: 3e3,
    proxy
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./"),
      "@carpenterjs/actions": path.resolve(__vite_injected_original_dirname, "carpenterjs/src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxtYXZlclxcXFxkZXZcXFxcZnJhbWV3b3JrXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxtYXZlclxcXFxkZXZcXFxcZnJhbWV3b3JrXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9tYXZlci9kZXYvZnJhbWV3b3JrL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCB0eXBlIFByb3h5T3B0aW9ucyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcclxuXHJcbmNvbnN0IHByb3h5OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmcgfCBQcm94eU9wdGlvbnM+ID0ge1xyXG4gIFwiL19hY3Rpb25zXCI6IHtcclxuICAgIHRhcmdldDogXCJodHRwOi8vbG9jYWxob3N0OjgwMDBcIixcclxuICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgXCJYLVBvd2VyZWQtQnlcIjogXCJDYXJwZW50ZXJKU1wiLFxyXG4gICAgfSxcclxuICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCBcIi9fYWN0aW9uc1wiKSxcclxuICB9LFxyXG4gIFwiL2FwaVwiOiB7XHJcbiAgICB0YXJnZXQ6IFwiaHR0cDovL2xvY2FsaG9zdDo4MDAwXCIsXHJcbiAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgXCIvX2FjdGlvbnNcIiksXHJcbiAgfSxcclxufTtcclxuXHJcbmNvbnN0IHdhdGNoID0ge1xyXG4gIGluY2x1ZGU6IFtcInBhZ2VzLyoqLypcIiwgXCJ0eXBlcy8qKi8qXCJdLFxyXG4gIGV4Y2x1ZGU6IFtcIm5vZGVfbW9kdWxlc1wiLCBcIioqL25vZGVfbW9kdWxlcy8qKlwiXSxcclxuICBpZ25vcmVkOiBbXCIhKiovbm9kZV9tb2R1bGVzLyoqXCJdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICByb290OiBcInBhZ2VzXCIsXHJcbiAgcGx1Z2luczogW3JlYWN0KCldLFxyXG4gIHNlcnZlcjoge1xyXG4gICAgcG9ydDogMzAwMCxcclxuICAgIHByb3h5LFxyXG4gICAgd2F0Y2gsXHJcbiAgfSxcclxuICBwcmV2aWV3OiB7XHJcbiAgICBwb3J0OiAzMDAwLFxyXG4gICAgcHJveHksXHJcbiAgfSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL1wiKSxcclxuICAgICAgXCJAY2FycGVudGVyanMvYWN0aW9uc1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcImNhcnBlbnRlcmpzL3NyY1wiKSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1IsU0FBUyxvQkFBdUM7QUFDaFUsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sV0FBVztBQUZsQixJQUFNLG1DQUFtQztBQUl6QyxJQUFNLFFBQStDO0FBQUEsRUFDbkQsYUFBYTtBQUFBLElBQ1gsUUFBUTtBQUFBLElBQ1IsY0FBYztBQUFBLElBQ2QsU0FBUztBQUFBLE1BQ1AsZ0JBQWdCO0FBQUEsSUFDbEI7QUFBQSxJQUNBLFNBQVMsQ0FBQ0EsVUFBU0EsTUFBSyxRQUFRLFVBQVUsV0FBVztBQUFBLEVBQ3ZEO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixRQUFRO0FBQUEsSUFDUixjQUFjO0FBQUEsSUFDZCxTQUFTLENBQUNBLFVBQVNBLE1BQUssUUFBUSxVQUFVLFdBQVc7QUFBQSxFQUN2RDtBQUNGO0FBRUEsSUFBTSxRQUFRO0FBQUEsRUFDWixTQUFTLENBQUMsY0FBYyxZQUFZO0FBQUEsRUFDcEMsU0FBUyxDQUFDLGdCQUFnQixvQkFBb0I7QUFBQSxFQUM5QyxTQUFTLENBQUMscUJBQXFCO0FBQ2pDO0FBRUEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBQ04sU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsSUFBSTtBQUFBLE1BQ2pDLHdCQUF3QixLQUFLLFFBQVEsa0NBQVcsaUJBQWlCO0FBQUEsSUFDbkU7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
