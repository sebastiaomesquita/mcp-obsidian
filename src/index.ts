import { registerTools } from "@/tools";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { name, version } from "../package.json";

const server = new McpServer(
  { name, version },
  {
    instructions:
      "This is a MCP server for Obsidian. It is a simple server that can be used to run commands and get responses from the client running Local REST API community plugin.",
  },
);
registerTools(server);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  transport.onerror = (error) => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error("Transport error:", error);
  };
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.error(`Running ${name}@${version} MCP Server on stdio`);
}

main().catch((error) => {
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.error("Fatal error in main():", error);
  process.exit(1);
});
