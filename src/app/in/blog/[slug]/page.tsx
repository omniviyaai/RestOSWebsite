import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { BLOG_POSTS, getBlogPost } from '@/lib/blog-posts'
import { ARTICLE_CONTENT } from '@/lib/blog-content'

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPost(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://omniviya.in/in/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://omniviya.in/in/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: post.title }],
    },
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

const CATEGORY_COLORS: Record<string, string> = {
  Operations: 'bg-teal/10 border-teal/25 text-teal',
  'Buying Guide': 'bg-ember/10 border-ember/25 text-ember',
  'Cloud Kitchen': 'bg-gold/10 border-gold/25 text-gold',
  Payments: 'bg-teal/10 border-teal/25 text-teal',
  Technology: 'bg-ember/10 border-ember/25 text-ember',
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)
  if (!post) notFound()

  const content = ARTICLE_CONTENT[params.slug]
  if (!content) notFound()

  const catStyle = CATEGORY_COLORS[post.category] ?? 'bg-stone/10 border-wire/20 text-stone'

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'Omniviya',
      url: 'https://omniviya.in',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Omniviya',
      logo: { '@type': 'ImageObject', url: 'https://omniviya.in/og-image.png' },
    },
    url: `https://omniviya.in/in/blog/${post.slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://omniviya.in/in/blog/${post.slug}` },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Navbar />
      <main className="min-h-screen bg-midnight">
        {/* Hero */}
        <section className="pt-32 pb-12 px-4 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-ember/5 blur-3xl pointer-events-none" />
          <div className="max-w-2xl mx-auto relative">
            <Link href="/in/blog" className="inline-flex items-center gap-2 text-xs text-stone/40 hover:text-stone/70 transition-colors mb-8 font-mono">
              ← Back to blog
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className={`text-xs font-mono px-2.5 py-1 rounded-full border ${catStyle}`}>
                {post.category}
              </span>
              <time className="text-xs text-stone/40 font-mono" dateTime={post.date}>
                {formatDate(post.date)}
              </time>
              <span className="text-xs text-stone/30">· {post.readTime} min read</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-warm-white leading-snug mb-6 text-balance">
              {post.title}
            </h1>
            <p className="text-stone/60 text-base sm:text-lg leading-relaxed">
              {post.description}
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-2xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-wire/30 to-transparent" />
        </div>

        {/* Article body */}
        <article className="max-w-2xl mx-auto px-4 py-12 prose-blog">
          <div
            className="text-stone/70 text-sm sm:text-base leading-[1.85] space-y-6"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>

        {/* CTA */}
        <div className="max-w-2xl mx-auto px-4 pb-24">
          <div className="rounded-2xl border border-ember/25 p-7 sm:p-8 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(11,16,32,0.7) 100%)' }}>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/30 to-transparent" />
            <h2 className="text-lg sm:text-xl font-display font-bold text-warm-white mb-2">
              Ready to try Omniviya?
            </h2>
            <p className="text-stone/55 text-sm mb-5">
              Free plan available. No credit card, no setup cost, no hardware required.
            </p>
            <a
              href="https://restos.omniviya.in/admin/register"
              className="inline-flex items-center gap-2 bg-ember text-white text-sm font-display font-semibold px-5 py-2.5 rounded-xl hover:bg-ember/90 transition-colors"
            >
              Start free →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
