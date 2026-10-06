import Link from "next/link";
import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Blog",
  description: "Writing by Samrat Neupane — notes on SEO, web development, and shipping products.",
};

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();
  const sorted = [...posts].sort(
    (a, b) =>
      +new Date(b.metadata.publishedAt) - +new Date(a.metadata.publishedAt)
  );

  return (
    <main className="mx-auto w-full max-w-2xl space-y-8 px-4 py-10">
      <BlurFade delay={0.04}>
        <div>
          <div className="inline-block rounded-lg bg-foreground px-3 py-1 text-sm text-background">
            Blog
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tighter sm:text-5xl">
            Writing
          </h1>
          <p className="mt-2 text-muted-foreground">
            Notes on SEO, web development, and shipping products.
          </p>
        </div>
      </BlurFade>
      <div className="flex flex-col gap-3">
        {sorted.map((post, id) => (
          <BlurFade key={post.slug} delay={0.04 * (id + 2)}>
            <Link
              href={`/blog/${post.slug}`}
              className="block rounded-lg border p-4 transition-shadow hover:shadow-md"
            >
              <h2 className="font-semibold tracking-tight">
                {post.metadata.title}
              </h2>
              {post.metadata.summary && (
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {post.metadata.summary}
                </p>
              )}
              <p className="mt-2 text-xs text-muted-foreground">
                {formatDate(post.metadata.publishedAt)}
              </p>
            </Link>
          </BlurFade>
        ))}
        {sorted.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No posts yet — check back soon.
          </p>
        )}
      </div>
    </main>
  );
}
