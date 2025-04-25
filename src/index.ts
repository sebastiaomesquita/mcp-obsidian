import "log-timestamp";
import type { ServerResponse } from "node:http";
import config from "@/config";
import { registerTools } from "@/tools";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express from "express";
import { name, version } from "../package.json";

const server = new McpServer({ name, version });
registerTools(server);

const transports = {} as Record<string, SSEServerTransport>;

const app = express();
app.use(express.json());

app.get("/sse", async (_req, res: ServerResponse) => {
  const transport = new SSEServerTransport("/messages", res);
  transports[transport.sessionId] = transport;
  res.on("close", () => {
    delete transports[transport.sessionId];
  });
  await server.connect(transport);
});

app.post("/messages", async (req, res) => {
  const sessionId = req.query.sessionId as string;
  const transport = transports[sessionId];
  if (transport) {
    await transport.handlePostMessage(req, res, req.body);
  } else {
    res.status(400).send("No transport found for sessionId");
  }
});

app.listen(config.port, () => {
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.log(`Server is running on http://localhost:${config.port}`);
});
