import { registerTools } from "@/tools";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { name, version } from "../package.json";

const server = new McpServer({ name, version });
registerTools(server);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.error(`Running ${name}@${version} MCP Server on stdio`);
}

main().catch((error) => {
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.error("Fatal error in main():", error);
  process.exit(1);
});
