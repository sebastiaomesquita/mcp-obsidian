const { OBSIDIAN_API_KEY, OBSIDIAN_PROTOCOL, OBSIDIAN_HOST, OBSIDIAN_PORT } =
  process.env;

const config = {
  obsidian: {
    apiKey: OBSIDIAN_API_KEY || "",
    protocol: (OBSIDIAN_PROTOCOL || "http") as "http" | "https",
    host: OBSIDIAN_HOST || "localhost",
    port: Number(OBSIDIAN_PORT) || 27123,
  },
};

// biome-ignore lint/style/noDefaultExport: <explanation>
export default config;
