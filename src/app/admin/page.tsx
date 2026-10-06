import Link from "next/link";
import {
  getPostRaw,
  isAuthed,
  listPosts,
  loginAction,
  logoutAction,
} from "@/lib/admin-actions";
import Editor from "@/components/admin/editor";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { edit?: string; error?: string };
}) {
  if (!(await isAuthed())) {
    return (
      <main className="mx-auto w-full max-w-md px-4 py-24">
        <h1 className="text-2xl font-bold tracking-tight">Admin login</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your admin password to write and manage blog posts.
        </p>
        {searchParams?.error && (
          <p className="mt-4 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">
            Wrong password. Try again.
          </p>
        )}
        <form action={loginAction} className="mt-6 space-y-4">
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            autoComplete="current-password"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background"
          >
            Log in
          </button>
        </form>
      </main>
    );
  }

  const edit = searchParams?.edit;
  if (edit) {
    const initial = edit === "new" ? null : await getPostRaw(edit);
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/admin"
            className="text-sm text-muted-foreground hover:underline"
          >
            ← All posts
          </Link>
          <form action={logoutAction}>
            <button className="text-sm text-muted-foreground hover:underline">
              Log out
            </button>
          </form>
        </div>
        <Editor initial={initial} />
      </main>
    );
  }

  const posts = await listPosts();
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Blog posts</h1>
        <div className="flex items-center gap-4">
          <Link
            href="/admin?edit=new"
            className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background"
          >
            + New post
          </Link>
          <form action={logoutAction}>
            <button className="text-sm text-muted-foreground hover:underline">
              Log out
            </button>
          </form>
        </div>
      </div>
      {posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No posts yet. Write your first one.
        </p>
      ) : (
        <ul className="divide-y divide-border rounded-lg border">
          {posts.map((p) => (
            <li
              key={p.slug}
              className="flex items-center justify-between gap-4 px-4 py-3"
            >
              <div className="min-w-0">
                <Link
                  href={`/admin?edit=${p.slug}`}
                  className="truncate font-medium hover:underline"
                >
                  {p.title}
                </Link>
                <p className="text-xs text-muted-foreground">
                  {p.publishedAt} · /blog/{p.slug}
                </p>
              </div>
              <Link
                href={`/blog/${p.slug}`}
                className="shrink-0 text-xs text-muted-foreground hover:underline"
              >
                View →
              </Link>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
        Publishing, updating, or deleting a post commits it to GitHub and
        triggers a site rebuild — changes go live in about a minute.
      </p>
    </main>
  );
}
