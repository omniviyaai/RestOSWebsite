import type { Context } from 'netlify:edge'

export default async (req: Request, ctx: Context) => {
  const url = new URL(req.url)

  if (
    url.pathname.startsWith('/in/') ||
    url.pathname.startsWith('/uk/') ||
    url.pathname.startsWith('/_next/') ||
    url.pathname.startsWith('/video/') ||
    url.pathname.startsWith('/og-image') ||
    url.pathname.startsWith('/favicon') ||
    url.pathname.match(/\.\w+$/)
  ) {
    return
  }

  const cookies = req.headers.get('cookie') || ''
  const regionCookie = cookies.match(/region=(in|uk)/)?.[1]
  if (regionCookie) {
    return ctx.rewrite(new URL(`/${regionCookie}${url.pathname}`, req.url))
  }

  const country = ctx.geo.country
  const prefix = country === 'GB' ? '/uk' : '/in'
  return ctx.rewrite(new URL(`${prefix}${url.pathname}`, req.url))
}
