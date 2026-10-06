"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  deletePost,
  previewMarkdown,
  savePost,
  type AdminPost,
} from "@/lib/admin-actions";

const inputCls =
  "w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";
const labelCls = "mb-1 block text-xs font-medium text-muted-foreground";

export default function Editor({ initial }: { initial: AdminPost | null }) {
  const isNew = !initial;
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [publishedAt, setPublishedAt] = useState(
    initial?.publishedAt ?? new Date().toISOString().slice(0, 10)
  );
  const [body, setBody] = useState(initial?.body ?? "");
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [html, setHtml] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onPreview() {
    setTab("preview");
    setBusy(true);
    try {
      setHtml(await previewMarkdown(body));
    } catch (e: any) {
      setHtml("<p>Preview failed.</p>");
    } finally {
      setBusy(false);
    }
  }

  async function onSave() {
    setError("");
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    setBusy(true);
    try {
      await savePost({
        slug: isNew ? slug : initial!.slug,
        title: title.trim(),
        summary: summary.trim(),
        publishedAt,
        body,
        sha: initial?.sha,
        isNew,
      });
      router.push("/admin");
      router.refresh();
    } catch (e: any) {
      setError(e?.message || "Save failed.");
      setBusy(false);
    }
  }

  async function onDelete() {
    if (!initial) return;
    if (!confirm(`Delete "${initial.title}" permanently?`)) return;
    setBusy(true);
    try {
      await deletePost(initial.slug, initial.sha);
      router.push("/admin");
      router.refresh();
    } catch (e: any) {
      setError(e?.message || "Delete failed.");
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold tracking-tight">
        {isNew ? "New post" : "Edit post"}
      </h1>

      {error && (
        <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <div>
        <label className={labelCls}>Title</label>
        <input
          className={inputCls}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="My awesome post"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>
            Slug {isNew ? "(URL — auto from title if blank)" : "(cannot change)"}
          </label>
          <input
            className={inputCls}
            value={slug}
            disabled={!isNew}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="my-awesome-post"
          />
        </div>
        <div>
          <label className={labelCls}>Publish date</label>
          <input
            type="date"
            className={inputCls}
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>Summary (shown on the blog index)</label>
        <input
          className={inputCls}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="One or two sentences about this post"
        />
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className={labelCls}>Content (Markdown)</label>
          <div className="flex gap-1 rounded-md border p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setTab("write")}
              className={`rounded px-2 py-1 ${tab === "write" ? "bg-foreground text-background" : "text-muted-foreground"}`}
            >
              Write
            </button>
            <button
              type="button"
              onClick={onPreview}
              className={`rounded px-2 py-1 ${tab === "preview" ? "bg-foreground text-background" : "text-muted-foreground"}`}
            >
              Preview
            </button>
          </div>
        </div>
        {tab === "write" ? (
          <textarea
            className={`${inputCls} min-h-[320px] font-mono leading-relaxed`}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your post in Markdown..."
          />
        ) : (
          <div
            className="prose max-w-full rounded-md border px-4 py-3 text-sm dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: html || "<p>Loading preview…</p>" }}
          />
        )}
      </div>

      <div className="flex items-center justify-between pt-2">
        <div>
          {!isNew && (
            <button
              type="button"
              onClick={onDelete}
              disabled={busy}
              className="text-sm text-red-600 hover:underline disabled:opacity-50 dark:text-red-400"
            >
              Delete post
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={onSave}
          disabled={busy}
          className="rounded-md bg-foreground px-6 py-2 text-sm font-medium text-background disabled:opacity-50"
        >
          {busy ? "Publishing…" : isNew ? "Publish post" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
