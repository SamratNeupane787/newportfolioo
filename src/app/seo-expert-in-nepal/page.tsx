import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best SEO Expert in Nepal",
  description:
    "SEO services in Nepal from Samrat Neupane, an SEO Specialist and Full-Stack Developer in Kathmandu. Technical SEO, on-page SEO, local SEO, audits, and analytics.",
  alternates: {
    canonical: "https://www.samratneupane.com.np/seo-expert-in-nepal",
  },
};

const faqs = [
  {
    question: "What does SEO cost in Nepal?",
    answer:
      "It depends on the scope of the work, the size of the website, and how competitive the market is. A small local site and a large ecommerce site do not need the same amount of work, so pricing is discussed after an audit and a clear scope is agreed. No fixed price is listed here because it would not reflect every project.",
  },
  {
    question: "How long does SEO take to show results?",
    answer:
      "SEO is a longer-term channel, not an overnight fix. Search visibility usually builds over months as technical issues are fixed, content is improved, and search engines recrawl the site. For one client ecommerce site, visibility grew from near zero to 265K Google Search impressions and 6.76K clicks over 8 months, but that result is specific to that site and is not a guarantee for any other site.",
  },
  {
    question: "What makes a good SEO expert?",
    answer:
      "A good SEO expert starts with an audit, explains what will change and why, focuses on technical foundations and useful content, and measures results in Google Search Console and GA4 rather than relying on vanity metrics. Clear reporting matters as much as the work itself.",
  },
  {
    question: "Do you serve clients outside Kathmandu?",
    answer:
      "Yes. Samrat Neupane is based in Kathmandu, Nepal, and SEO work can be carried out remotely, so location does not prevent working with clients elsewhere in Nepal or outside the country.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function SeoExpertInNepalPage() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section id="intro">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="flex flex-col space-y-4">
            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm w-fit">SEO Services in Nepal</div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Best SEO Expert in Nepal</h1>
            <p className="max-w-[600px] md:text-xl text-muted-foreground">Samrat Neupane is an SEO Specialist &amp; Full-Stack Developer at Griffity Studios, based in Kathmandu, Nepal. His SEO work focuses on the technical foundations, content, and measurement that help a website earn visibility in Google Search.</p>
            <p className="text-muted-foreground">He also builds full-stack products with Next.js, React, NestJS, and PostgreSQL, so SEO recommendations are made with the implementation in mind, not as an abstract checklist.</p>
          </div>
        </div>
      </section>
      <section id="results">
        <h2 className="text-xl font-bold">Results</h2>
        <p className="text-sm text-muted-foreground">For a client ecommerce site, Samrat Neupane took search visibility from near zero to the following results in 8 months:</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-lg border p-4"><p className="text-2xl font-bold">265K</p><p className="text-sm text-muted-foreground">Google Search impressions</p></div>
          <div className="rounded-lg border p-4"><p className="text-2xl font-bold">6.76K</p><p className="text-sm text-muted-foreground">Google Search clicks</p></div>
          <div className="rounded-lg border p-4"><p className="text-2xl font-bold">8.2</p><p className="text-sm text-muted-foreground">Average search position</p></div>
        </div>
      </section>
      <section id="services">
        <h2 className="text-xl font-bold">Services</h2>
        <ul className="flex min-h-0 flex-col gap-y-3 text-sm text-muted-foreground">
          <li><strong className="text-foreground">Technical SEO:</strong> site structure, crawling, indexing, speed, and schema markup.</li>
          <li><strong className="text-foreground">On-page SEO:</strong> titles, headings, internal links, and content structured for search.</li>
          <li><strong className="text-foreground">Local SEO:</strong> visibility for searches in Kathmandu and across Nepal.</li>
          <li><strong className="text-foreground">SEO audits:</strong> a review of what is holding a site back, with prioritised fixes.</li>
          <li><strong className="text-foreground">Google Search Console &amp; GA4 analytics:</strong> measurement and reporting based on search and traffic data.</li>
        </ul>
      </section>
      <section id="process">
        <h2 className="text-xl font-bold">Process</h2>
        <ol className="flex min-h-0 flex-col gap-y-3 text-sm text-muted-foreground">
          <li><strong className="text-foreground">1. Audit:</strong> review the site, its technical setup, and its current search performance.</li>
          <li><strong className="text-foreground">2. Strategy:</strong> agree priorities, target pages, and what success will be measured by.</li>
          <li><strong className="text-foreground">3. Implement:</strong> fix technical issues, improve pages, and publish useful content.</li>
          <li><strong className="text-foreground">4. Measure:</strong> track impressions, clicks, and positions in Google Search Console and GA4, and adjust based on the data.</li>
        </ol>
      </section>
      <section id="faq">
        <h2 className="text-xl font-bold">Frequently asked questions</h2>
        <div className="flex min-h-0 flex-col gap-y-6">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <h3 className="font-bold">{faq.question}</h3>
              <p className="text-sm text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <div className="space-y-3">
            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">Contact</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">Want to discuss an SEO project? Start from the{" "}<Link href="/" className="text-blue-500 hover:underline">homepage</Link>{" "}or reach Samrat Neupane on{" "}<Link href="https://www.linkedin.com/in/samrat-neupane" className="text-blue-500 hover:underline">LinkedIn</Link>.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
