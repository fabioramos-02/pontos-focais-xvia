import type { NextConfig } from "next";

// PAGES=1 → export estático para GitHub Pages (servido em /pontos-focais-xvia)
const pages = process.env.PAGES === "1";
const basePath = pages ? "/pontos-focais-xvia" : "";

const nextConfig: NextConfig = {
  // hydrate do Stencil é app Node com DOM simulado: não bundlar
  serverExternalPackages: ["@plataforma-xvia/ds-core"],
  ...(pages && { output: "export", trailingSlash: true, basePath }),
  // links dos componentes do DS são <a href> crus: o basePath não chega neles sozinho
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
