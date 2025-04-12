import { loadEnv } from "vite";

export function getEnv(mode: string) {
  return loadEnv(mode, process.cwd(), "");
}
