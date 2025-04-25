import config from "@/config";
import { Obsidian } from "@/obsidian";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const obsidian = new Obsidian(config.obsidian);

export function registerTools(server: McpServer) {
  server.tool("status", async () => {
    const status = await obsidian.status();
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(status),
        },
      ],
    };
  });

  server.tool("delete_active", async () => {
    await obsidian.deleteActive();
    return {
      content: [{ type: "text", text: "OK" }],
    };
  });

  server.tool("get_active", async () => {
    const note = await obsidian.getActive();
    return {
      content: [{ type: "text", text: JSON.stringify(note) }],
    };
  });

  server.tool(
    "patch_active",
    {
      operation: z.enum(["append", "prepend", "replace"]),
      targetType: z.enum(["heading", "block", "frontmatter"]),
      target: z.string(),
      content: z.string(),
      trimTargetWhitespace: z.boolean().optional(),
      targetDelimiter: z.string().optional(),
      contentType: z.string().optional(),
    },
    async (args) => {
      const res = await obsidian.patchActive(args);
      return {
        content: [{ type: "text", text: JSON.stringify(res) }],
      };
    },
  );

  server.tool("post_active", { content: z.string() }, async (args) => {
    await obsidian.postActive(args);
    return {
      content: [{ type: "text", text: "OK" }],
    };
  });

  server.tool("put_active", { content: z.string() }, async (args) => {
    await obsidian.putActive(args);
    return {
      content: [{ type: "text", text: "OK" }],
    };
  });

  server.tool("get_commands", async () => {
    const commands = await obsidian.getCommands();
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(commands),
        },
      ],
    };
  });

  server.tool("execute_command", { commandId: z.string() }, async (args) => {
    await obsidian.executeCommand(args);
    return {
      content: [{ type: "text", text: "OK" }],
    };
  });

  server.tool(
    "open_file",
    { filename: z.string(), newLeaf: z.boolean().optional() },
    async (args) => {
      await obsidian.openFile(args);
      return {
        content: [{ type: "text", text: "OK" }],
      };
    },
  );

  server.tool(
    "delete_periodic",
    {
      period: z.enum(["daily", "weekly", "monthly", "quarterly", "yearly"]),
    },
    async (args) => {
      await obsidian.deletePeriodic(args);
      return {
        content: [{ type: "text", text: "OK" }],
      };
    },
  );

  server.tool(
    "get_periodic",
    {
      period: z.enum(["daily", "weekly", "monthly", "quarterly", "yearly"]),
    },
    async (args) => {
      const note = await obsidian.getPeriodic(args);
      return {
        content: [{ type: "text", text: JSON.stringify(note) }],
      };
    },
  );

  server.tool(
    "patch_periodic",
    {
      period: z.enum(["daily", "weekly", "monthly", "quarterly", "yearly"]),
      operation: z.enum(["append", "prepend", "replace"]),
      targetType: z.enum(["heading", "block", "frontmatter"]),
      target: z.string(),
      content: z.string(),
      trimTargetWhitespace: z.boolean().optional(),
      targetDelimiter: z.string().optional(),
      contentType: z.string().optional(),
    },
    async (args) => {
      await obsidian.patchPeriodic(args);
      return {
        content: [{ type: "text", text: "OK" }],
      };
    },
  );

  server.tool(
    "post_periodic",
    {
      period: z.enum(["daily", "weekly", "monthly", "quarterly", "yearly"]),
      content: z.string(),
    },
    async (args) => {
      await obsidian.postPeriodic(args);
      return {
        content: [{ type: "text", text: "OK" }],
      };
    },
  );

  server.tool(
    "put_periodic",
    {
      period: z.enum(["daily", "weekly", "monthly", "quarterly", "yearly"]),
      content: z.string(),
    },
    async (args) => {
      await obsidian.putPeriodic(args);
      return {
        content: [{ type: "text", text: "OK" }],
      };
    },
  );

  server.tool("search_dataview", { query: z.string() }, async (args) => {
    const results = await obsidian.searchDataview(args);
    return {
      content: [{ type: "text", text: JSON.stringify(results) }],
    };
  });

  server.tool(
    "search_json_logic",
    { logic: z.unknown() },
    async ({ logic }) => {
      const results = await obsidian.searchJsonLogic(logic);
      return {
        content: [{ type: "text", text: JSON.stringify(results) }],
      };
    },
  );

  server.tool(
    "simple_search",
    { query: z.string(), contextLength: z.number().optional() },
    async (args) => {
      const results = await obsidian.simpleSearch(args);
      return {
        content: [{ type: "text", text: JSON.stringify(results) }],
      };
    },
  );

  server.tool("list_vault_root", async () => {
    const files = await obsidian.listVaultRoot();
    return {
      content: [{ type: "text", text: JSON.stringify(files) }],
    };
  });

  server.tool(
    "list_vault_directory",
    { pathToDirectory: z.string() },
    async (args) => {
      const files = await obsidian.listVaultDirectory(args);
      return {
        content: [{ type: "text", text: JSON.stringify(files) }],
      };
    },
  );

  server.tool("delete_file", { filename: z.string() }, async (args) => {
    await obsidian.deleteFile(args);
    return {
      content: [{ type: "text", text: "OK" }],
    };
  });

  server.tool("get_file", { filename: z.string() }, async (args) => {
    const file = await obsidian.getFile(args);
    return {
      content: [{ type: "text", text: JSON.stringify(file) }],
    };
  });

  server.tool(
    "patch_file",
    {
      filename: z.string(),
      operation: z.enum(["append", "prepend", "replace"]),
      targetType: z.enum(["heading", "block", "frontmatter"]),
      target: z.string(),
      content: z.string(),
      trimTargetWhitespace: z.boolean().optional(),
      targetDelimiter: z.string().optional(),
      contentType: z.string().optional(),
    },
    async (args) => {
      const res = await obsidian.patchFile(args);
      return {
        content: [{ type: "text", text: JSON.stringify(res) }],
      };
    },
  );

  server.tool(
    "post_file",
    { filename: z.string(), content: z.string() },
    async (args) => {
      const res = await obsidian.postFile(args);
      return {
        content: [{ type: "text", text: JSON.stringify(res) }],
      };
    },
  );

  server.tool(
    "put_file",
    { filename: z.string(), content: z.string() },
    async (args) => {
      const res = await obsidian.putFile(args);
      return {
        content: [{ type: "text", text: JSON.stringify(res) }],
      };
    },
  );
}
