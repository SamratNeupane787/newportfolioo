"use server";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { markdownToHTML } from "@/data/blog";

const COOKIE_NAME = "portfolio_admin_session";
const OWNER = "SamratNeupane787";
const REPO = "newportfolioo";

function getSecret(): string {
  const s = process.env.ADMIN_PASSWORD;
  if (!s) throw new Error("ADMIN_PASSWORD env var is not set");
  return s;
}

function b64url(input: string | Buffer): string {
  return Buffer.from(input).toString("base64url");
}

function signJwt(
  payload: Record<string, unknown>,
  secret: string,
  expiresInSec: number
): string {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = b64url(
    JSON.stringify({ ...payload, iat: now, exp: now + expiresInSec })
  );
  const sig = createHmac("sha256", secret)
    .update(`${header}.${body}`)
    .digest("base64url");
  return `${header}.${body}.${sig}`;
}

function verifyJwt(token: string, secret: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [header, body, sig] = parts;
  const expected = createHmac("sha256", secret)
    .update(`${header}.${body}`)
    .digest("base64url");
  const a = Buffer.from(sig, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  try {
    if (!timingSafeEqual(a, b)) return false;
    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString("utf-8")
    );
    return (
      typeof payload.exp === "number" &&
      payload.exp > Math.floor(Date.now() / 1000)
    );
  } catch {
    return false;
  }
}

function getToken(): string {
  const t = process.env.GITHUB_TOKEN;
  if (!t) throw new Error("GITHUB_TOKEN env var is not set");
  return t;
}

async function gh(path: string, init?: RequestInit): Promise<any> {
  const res = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API error ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

export async function isAuthed(): Promise<boolean> {
  const c = cookies().get(COOKIE_NAME)?.value;
  if (!c) return false;
  return verifyJwt(c, getSecret());
}

async function requireAuth(): Promise<void> {
  if (!(await isAuthed())) throw new Error("Not authorized. Please log in.");
}

export async function loginAction(formData: FormData): Promise<void> {
  const pw = formData.get("password");
  if (
    typeof pw !== "string" ||
    !process.env.ADMIN_PASSWORD ||
    pw !== process.env.ADMIN_PASSWORD
  ) {
    redirect("/admin?error=1");
  }
  const token = signJwt({ admin: true }, getSecret(), 60 * 60 * 24 * 30);
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  cookies().delete(COOKIE_NAME);
  redirect("/admin");
}

export type AdminPostMeta = {
  slug: string;
  title: string;
  publishedAt: string;
  sha: string;
};

function parseFrontmatter(raw: string): {
  data: Record<string, string>;
  body: string;
} {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const mm = line.match(/^([A-Za-z0-9_]+):\s*"?([^"\r\n]*)"?\s*$/);
    if (mm) data[mm[1]] = mm[2].trim();
  }
  return { data, body: m[2] };
}

export async function listPosts(): Promise<AdminPostMeta[]> {
  await requireAuth();
  let items: any[];
  try {
    items = await gh(`/repos/${OWNER}/${REPO}/contents/content`);
  } catch {
    return [];
  }
  const files = (Array.isArray(items) ? items : []).filter(
    (f) => f.type === "file" && typeof f.name === "string" && f.name.endsWith(".mdx")
  );
  const posts: AdminPostMeta[] = [];
  for (const f of files) {
    try {
      const file = await gh(`/repos/${OWNER}/${REPO}/contents/${f.path}`);
      const raw = Buffer.from(file.content || "", "base64").toString("utf-8");
      const { data } = parseFrontmatter(raw);
      posts.push({
        slug: f.name.replace(/\.mdx$/, ""),
        title: data.title || f.name.replace(/\.mdx$/, ""),
        publishedAt: data.publishedAt || "",
        sha: file.sha,
      });
    } catch {
    }
  }
  posts.sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));
  return posts;
}

export type AdminPost = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  body: string;
  sha: string;
};

function cleanSlug(s: string): string {
  return s.toLowerCase().trim().replace(/[^a-z0-9-]/g, "");
}

export async function getPostRaw(slug: string): Promise<AdminPost> {
  await requireAuth();
  const clean = cleanSlug(slug);
  if (!clean) throw new Error("Invalid slug");
  const file = await gh(`/repos/${OWNER}/${REPO}/contents/content/${clean}.mdx`);
  const raw = Buffer.from(file.content || "", "base64").toString("utf-8");
  const { data, body } = parseFrontmatter(raw);
  return {
    slug: clean,
    title: data.title || "",
    summary: data.summary || "",
    publishedAt: data.publishedAt || new Date().toISOString().slice(0, 10),
    body: body.trim(),
    sha: file.sha,
  };
}

function slugify(s: string): string {
  const out = s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return out || "untitled";
}

function esc(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

export async function savePost(input: {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  body: string;
  sha?: string;
  isNew: boolean;
}): Promise<{ ok: true; slug: string }> {
  await requireAuth();
  const title = input.title.trim();
  if (!title) throw new Error("Title is required.");
  const slug = input.isNew ? slugify(input.slug || title) : cleanSlug(input.slug);
  if (!slug) throw new Error("Invalid slug.");
  const content =
    `---\ntitle: "${esc(title)}"\n` +
    `publishedAt: "${input.publishedAt || new Date().toISOString().slice(0, 10)}"\n` +
    `summary: "${esc(input.summary.trim())}"\n---\n\n${input.body.trim()}\n`;
  const payload: Record<string, unknown> = {
    message: `${input.isNew ? "Publish" : "Update"} post: ${title}`,
    content: Buffer.from(content, "utf-8").toString("base64"),
    branch: "main",
  };
  if (!input.isNew && input.sha) payload.sha = input.sha;
  await gh(`/repos/${OWNER}/${REPO}/contents/content/${slug}.mdx`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return { ok: true, slug };
}

export async function deletePost(slug: string, sha: string): Promise<{ ok: true }> {
  await requireAuth();
  const clean = cleanSlug(slug);
  if (!clean || !sha) throw new Error("Invalid slug.");
  await gh(`/repos/${OWNER}/${REPO}/contents/content/${clean}.mdx`, {
    method: "DELETE",
    body: JSON.stringify({
      message: `Delete post: ${clean}`,
      sha,
      branch: "main",
    }),
  });
  return { ok: true };
}

export async function previewMarkdown(md: string): Promise<string> {
  await requireAuth();
  return markdownToHTML(md || "");
}
