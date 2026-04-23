---
title: "manual -> automated"
description: "connecting your knowledge base directly to Claude using a basic Model Context Protocol (MCP) server."
pubDate: 2026-04-24
loop: "improve"
---

After implementing a local vault, the primary source of friction is the manual transfer of data. You must manually ask the model to read files and manually save summaries.

The Model Context Protocol (MCP) provides a standard for automating these interactions, allowing the model to interact with your local file system directly.

## The Simple Bridge

This implementation uses a minimal Node.js script to expose two tools to the model:
1. `read_lessons`: Autonomously retrieves standards from your vault.
2. `save_session`: Records the technical outcome of a session directly to the correct project directory.

### 1. Implementation

Initialize a new project:
```bash
mkdir simple-bridge
cd simple-bridge
npm init -y
npm install @modelcontextprotocol/sdk
```

### 2. Logic

Create `index.js`. This server enables direct file system interaction:

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

### 3. Configuration

Add the server to your `claude_desktop_config.json`:

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

## The Outcome

The model can now maintain the system autonomously. When a task is complete, you simply state:

> "Save a session log for project-x."

The model executes the tool, determines the correct directory, and writes the log. You have removed the manual overhead of context management.
