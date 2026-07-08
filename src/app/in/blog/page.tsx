import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { BLOG_POSTS } from '@/lib/blog-posts'

export const metadata: Metadata = {
  title: 'Restaurant Management Blog — Tips, Guides & Technology for Indian Restaurants',
  description:
    'Practical guides for Indian restaurant owners: QR ordering, UPI payments, cloud kitchen software, kitchen display systems, and how to run a more profitable restaurant.',
  alternates: { canonical: 'https://omniviya.in/in/blog' },
  openGraph: {
    title: 'Omniviya Blog — Restaurant Management Tips for India',
    description: 'QR ordering, UPI payments, cloud kitchen technology, and operations guides for Indian restaurant owners.',
    url: 'https://omniviya.in/in/blog',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Omniviya Blog' }],
  },
}

const CATEGORY_COLORS: Record<string, string> = {
  Operations: 'bg-teal/10 border-teal/25 text-teal',
  'Buying Guide': 'bg-ember/10 border-ember/25 text-ember',
  'Cloud Kitchen': 'bg-gold/10 border-gold/25 text-gold',
  Payments: 'bg-teal/10 border-teal/25 text-teal',
  Technology: 'bg-ember/10 border-ember/25 text-ember',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogIndexPage() {
  const sorted = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-midnight">
        {/* Hero */}
        <section className="pt-32 pb-16 px-4 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-ember/6 blur-3xl pointer-events-none" />
          <div className="max-w-3xl mx-auto text-center relative">
            <div className="inline-block px-3 py-1 rounded-full bg-ember/10 border border-ember/20 text-ember text-xs font-mono mb-6">
              Restaurant Management Blog
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-warm-white mb-6 text-balance leading-tight">
              Guides for Indian Restaurant Owners
            </h1>
            <p className="text-stone/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Practical articles on QR ordering, digital payments, cloud kitchen operations, and choosing the right restaurant technology — written for the Indian market.
            </p>
          </div>
        </section>

        {/* Article grid */}
        <section className="max-w-4xl mx-auto px-4 pb-24">
          <div className="grid gap-5">
            {sorted.map((post) => {
              const catStyle = CATEGORY_COLORS[post.category] ?? 'bg-stone/10 border-wire/20 text-stone'
              return (
                <Link
                  key={post.slug}
                  href={`/in/blog/${post.slug}`}
                  className="group block rounded-2xl border border-wire/30 p-6 sm:p-8 transition-all duration-300 hover:border-ember/30 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(21,27,46,0.8) 0%, rgba(11,16,32,0.6) 100%)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ background: 'radial-gradient(300px circle at 0% 50%, rgba(239,68,68,0.05), transparent)' }}
                  />
                  {/* Top line */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`text-xs font-mono px-2.5 py-1 rounded-full border ${catStyle}`}>
                      {post.category}
                    </span>
                    <time className="text-xs text-stone/40 font-mono" dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                    <span className="text-xs text-stone/30">· {post.readTime} min read</span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-display font-bold text-warm-white mb-3 leading-snug group-hover:text-ember transition-colors duration-200 text-balance">
                    {post.title}
                  </h2>
                  <p className="text-stone/55 text-sm leading-relaxed mb-4">{post.excerpt}</p>

                  <span className="text-xs text-ember font-mono group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1">
                    Read article →
                  </span>
                </Link>
              )
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
