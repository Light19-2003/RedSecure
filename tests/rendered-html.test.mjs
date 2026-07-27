import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
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
  assert.doesNotMatch(html, /codex-preview/);
  assert.doesNotMatch(html, /react-loading-skeleton/);
});

test("preserves the original html routes", async () => {
  const expected = [
    ["/about.html", "About Us"],
    ["/service.html", "Services"],
    ["/project.html", "Products"],
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
