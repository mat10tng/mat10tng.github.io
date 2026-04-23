---
title: "your first mcp server"
description: "you've built the basic vault. now let's automate it so Claude can read and write to it directly."
pubDate: 2026-04-24
loop: "improve"
---

If you followed [the basic vault](/blog/2026-04-23-the-basic-vault) guide, you now have a working system. You have folders for `sessions` and `lessons`, and a `CLAUDE.md` file that tells the AI to use them.

But there is still friction. You have to manually ask Claude to "read the lessons folder." You have to ask it to "save this chat as a new file." 

The next step in the evolution of your system is **automation**. We want to give Claude the ability to read and write to your vault natively. For that, we need to build a tiny MCP (Model Context Protocol) server.

If you have a couple of years of programming experience, you can build this in about 15 minutes.

## What is MCP?

MCP is a standard way for AI assistants (like Claude Desktop or Cursor) to talk to local tools. Instead of Claude guessing how to save a file, you give it a specific tool called `save_session`.

## The Simple Bridge

We are going to write a tiny Node.js script that exposes two tools to Claude:
1. `read_lessons`: Reads all markdown files in your `~/vault/global/lessons/` directory.
2. `save_session`: Takes a summary string and saves it to a specific project folder.

### 1. The Setup

Create a new directory for your server:
```bash
mkdir simple-bridge
cd simple-bridge
npm init -y
npm install @modelcontextprotocol/sdk
```

### 2. The Code

Create `index.js`. This is the entire server:

```javascript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import fs from "fs/promises";
import path from "path";
import os from "os";

const VAULT_PATH = path.join(os.homedir(), "vault");

const server = new Server({ 
  name: "simple-bridge", 
  version: "1.0.0" 
}, { 
  capabilities: { tools: {} } 
});

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "read_lessons",
      description: "Read all global lessons from the vault",
      inputSchema: { type: "object", properties: {} }
    },
    {
      name: "save_session",
      description: "Save a session summary to the vault",
      inputSchema: {
        type: "object",
        properties: {
          project: { type: "string" },
          content: { type: "string" }
        },
        required: ["project", "content"]
      }
    }
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "read_lessons") {
    const lessonsDir = path.join(VAULT_PATH, "global/lessons");
    const files = await fs.readdir(lessonsDir);
    let content = "";
    for (const file of files) {
      if (file.endsWith(".md")) {
        const body = await fs.readFile(path.join(lessonsDir, file), "utf-8");
        content += `\n--- ${file} ---\n${body}\n`;
      }
    }
    return { content: [{ type: "text", text: content }] };
  }

  if (request.params.name === "save_session") {
    const { project, content } = request.params.arguments;
    const dir = path.join(VAULT_PATH, project, "sessions");
    await fs.mkdir(dir, { recursive: true });
    
    const filename = `${new Date().toISOString().replace(/[:.]/g, "-")}.md`;
    await fs.writeFile(path.join(dir, filename), content);
    return { content: [{ type: "text", text: `Saved to ${filename}` }] };
  }

  throw new Error("Tool not found");
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

### 3. Connecting it to Claude

If you are using Claude Desktop, open your `claude_desktop_config.json` and add your new server:

```json
{
  "mcpServers": {
    "simple-bridge": {
      "command": "node",
      "args": ["/absolute/path/to/your/simple-bridge/index.js"]
    }
  }
}
```

## The Result

Now, you don't have to manually prompt Claude. You can just say:

> "We finished the auth setup. Save a session note for the login-system project."

Claude will autonomously call `save_session`, and write it directly to your file system. You have just built **The Bridge**.
