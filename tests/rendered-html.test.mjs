import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { once } from "node:events";
import test from "node:test";

let nextServer;
let origin;
let serverOutput = "";

async function reservePort() {
  const socket = createServer();
  socket.listen(0, "127.0.0.1");
  await once(socket, "listening");
  const address = socket.address();
  const port = typeof address === "object" && address ? address.port : 0;
  await new Promise((resolve, reject) =>
    socket.close((error) => (error ? reject(error) : resolve())),
  );
  return port;
}

async function waitForServer(url, timeoutMs = 120_000) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    if (nextServer?.exitCode !== null) {
      throw new Error(
        `Next.js server exited with code ${nextServer.exitCode}\n${serverOutput}`,
      );
    }

    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The production server may still be starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  throw new Error(
    `Timed out waiting for the Next.js production server\n${serverOutput}`,
  );
}

test.before(async () => {
  const port = await reservePort();
  origin = `http://127.0.0.1:${port}`;
  nextServer = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "start", "-H", "127.0.0.1", "-p", String(port)],
    {
      cwd: process.cwd(),
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  nextServer.stdout.on("data", (chunk) => {
    serverOutput += chunk.toString();
  });
  nextServer.stderr.on("data", (chunk) => {
    serverOutput += chunk.toString();
  });
  await waitForServer(origin);
});

test.after(() => {
  nextServer?.kill();
});

async function render(path = "/") {
  return fetch(`${origin}${path}`, {
    headers: { accept: "text/html" },
  });
}

test("server-renders the finished RedSecure home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /RedSecure/);
  assert.match(html, /An Innovative IT Solutions Provider/);
  assert.match(html, /Bespoke services for you/);
  assert.match(html, /Contact for any query/);
  assert.match(html, /RS-CMS/);
  assert.match(html, /Loading RedSecure website/);
  assert.match(html, /first-visit-loader/);
  assert.doesNotMatch(html, /codex-preview/);
  assert.doesNotMatch(html, /react-loading-skeleton/);
});

test("preserves the original html routes", async () => {
  const expected = [
    ["/about.html", "About Us"],
    ["/service.html", "Services"],
    ["/project.html", "Products"],
    ["/hrms-features.html", "HRMS Features"],
    ["/contact.html", "Contact Us"],
    ["/blog.html", "Latest Blog &amp; News"],
    ["/team.html", "Meet our expert Team"],
    ["/testimonial.html", "Our Client Saying!"],
    ["/404.html", "Page Not Found"],
  ];

  for (const [path, text] of expected) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(await response.text(), new RegExp(text), path);
  }
});
