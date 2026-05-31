# RestOS Website — Design Spec
**Date:** 2026-05-31
**Status:** Approved
**Launch Target:** 1 month

---

## 1. PROJECT CONTEXT

**Product:** RestOS — Restaurant Operating System
**Parent Brand:** Omniviya
**Positioning:** "The Operating System For Restaurants"
**Region:** India First
**Launch Goal:** Onboard first 10 Founding Partner restaurants

---

## 2. BUSINESS GOALS

| Priority | Goal |
|----------|------|
| Primary | Book demo calls |
| Secondary | WhatsApp leads |
| Tertiary | Founding Partner signups |

**Launch Offer:** 10 Founding Partners — 90 days completely free + direct founder access

---

## 3. TECH STACK

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Deployment | Vercel |
| Demo Booking | Cal.com embed |
| Video | YouTube lite embed |
| WhatsApp | WhatsApp Business link (wa.me) |
| Blog (future) | MDX |

---

## 4. DESIGN SYSTEM

### Colors
```
Midnight Ops:  #0B1020  — primary background
Carbon Slate:  #151B2E  — card/panel background
Ember Orange:  #E8742A  — primary CTA, accents
Deep Teal:     #0E8C84  — flow diagrams, success states
Brass Gold:    #C6A35B  — founding partner accents
Warm White:    #F3EFE7  — primary text
Muted Stone:   #9CA3AF  — secondary text
Wire:          #1E2640  — borders, dividers
```

### Typography
```
Headlines:   Space Grotesk (Google Fonts)
Body:        Inter (Google Fonts)
Monospace:   Space Mono (labels, metrics)
```

### Animation Principles
- Scroll-triggered reveals: fade-up, 0.4s ease-out
- Stagger delay between list items: 0.1s
- Ecosystem diagram: each node fades in on scroll milestone
- Pain statements: crossfade sequence as user scrolls
- CTA buttons: subtle scale on hover (1.02), orange glow on focus
- Page transitions: fade (0.2s)

---

## 5. SITE ARCHITECTURE

6 pages for launch. In order of build priority:

```
/              → Homepage
/demo          → Book Demo
/features      → Full Product Overview
/pricing       → Pricing + Founding Partner Offer
/founding      → Founding Partner Program
/about         → About + Founder Story
```

### Navigation
- Left: RestOS wordmark + "by Omniviya" (muted, small)
- Center: Features · Pricing · Founding Partner · About
- Right: "WhatsApp Us" (ghost) + "Book Demo" (orange filled)
- Behavior: transparent → solid `#0B1020` on scroll, always sticky
- Mobile: hamburger → full-screen overlay menu

---

## 6. HOMEPAGE — SECTION BY SECTION

### 6.1 Hero
**Objective:** Stop the scroll. Establish category. Drive to demo.

**Headline:** Your Restaurant Is Running You. *It's time to flip that.*
**Subheadline:** RestOS is the complete operating system for Indian restaurants. One screen. Every order. Every table. Every rupee.

**Visual:**
- Full-screen `#0B1020` background
- Product UI (admin dashboard screenshot/video) floating in from bottom, glowing teal border
- Background: dimmed product video at 15–20% opacity, playing silently, autoplay loop
- Subtle floating particle animation (CSS, not canvas — keep it performant)

**CTAs:**
- Primary: "Book a Free Demo" → `/demo`
- Secondary: "WhatsApp Us" → `wa.me` link
- Below CTAs small text: "10 Founding Partner spots · First 3 months free"

---

### 6.2 Pain Discovery
**Objective:** Make restaurant owners feel seen. No product. Pure empathy.

No section heading. Statements scroll one by one using Framer Motion scroll progress:

1. "A customer complained their order never reached the kitchen."
2. "Your waiter wrote it down wrong. Again."
3. "You found out at closing that 3 tables had billing errors."
4. "You were at home and had no idea what was happening inside."
5. "You lost a regular because the queue was too long."

Each statement: large type, centered, Warm White, fades in as previous fades out.

**Closing line (stays visible):**
> This is what running a restaurant feels like today.
> *There is a better way.*

---

### 6.3 Transformation
**Objective:** Show the before/after. Create desire for the "after" state.

**Headline:** (none — visual does the work)

**Layout:** Two columns. Left = BEFORE (red-tinted, slightly blurred). Right = AFTER (teal-tinted, sharp, clean).

| BEFORE | AFTER |
|--------|-------|
| Paper KOTs getting lost | Kitchen sees every order on screen, live |
| Waiter shouts across the floor | Silent, digital, instant |
| Owner finds out at closing | Owner sees revenue live from anywhere |
| Customer waits to flag a waiter | Customer orders from their own phone |
| Billing mistakes and arguments | Every order tracked, every rupee accounted |

**Animation:** On scroll, left column desaturates further and fades back. Right column brightens and scales up slightly.

---

### 6.4 Connected Ecosystem
**Objective:** Show that RestOS connects everything — not just one feature.

**Headline:** Every Part of Your Restaurant. Finally Connected.

**Visual:** Animated node diagram. Nodes appear one by one as user scrolls.

```
[Customer Phone]
       ↓
   [QR Menu]
       ↓
  [Live Order]
   ↙        ↘
[Kitchen   [Waiter
 Display]    App]
       ↓
  [Payment]
       ↓
 [Analytics]
       ↓
  [You — Admin]
```

Each node:
- Dark card with icon
- 1-line description ("Kitchen sees it instantly")
- Connecting lines animate in after node appears
- Color: teal connectors, orange active node

---

### 6.5 Product Highlights
**Objective:** Translate features into human outcomes. Drive to Features page.

**Headline:** One System. Everything Inside.

**Layout:** 2×3 grid of cards (mobile: 1 column, tablet: 2 columns)

| # | Card Headline | Subtext | Underlying Feature |
|---|---------------|---------|-------------------|
| 1 | Customers order themselves | No waiter needed for every table | QR Ordering |
| 2 | Kitchen never misses an order | Every KOT is digital, timestamped, visible | KDS |
| 3 | Your waiter always knows what's next | Table-by-table, order-by-order clarity | Waiter App |
| 4 | Every rupee tracked automatically | UPI, card, cash — all in one place | Payments + Reports |
| 5 | Manage your restaurant from anywhere | Full admin on your phone or laptop | Admin Dashboard |
| 6 | No new hardware needed | Works on phones, tablets, TVs you already have | BYOD |

**Card design:** `#151B2E` background, ember orange icon, hover lifts card (translateY -4px, shadow).

**CTA below grid:** "See the full product →" → `/features`

---

### 6.6 Demo Video
**Objective:** Show proof. Reduce risk. Build confidence.

**Headline:** See It Running In A Real Restaurant

**Layout:** Centered YouTube embed (lite-youtube-embed component — no performance hit).
Below: 3 short labels in a row:
- "QR ordering live in 60 seconds"
- "Kitchen display — no paper KOTs"
- "Admin dashboard — from anywhere"

---

### 6.7 Founding Partner Program
**Objective:** Create urgency and exclusivity. Drive to `/founding`.

**Headline:** We're Looking For 10 Founding Partners

**Subheadline:** Not customers. Partners. The restaurants that shape how RestOS works.

**What you get:**
- RestOS completely free for 90 days
- Direct WhatsApp line to the founding team
- Your feedback shapes the product roadmap
- Founding Partner badge
- First access to every new feature

**Scarcity indicator:**
```
[●●●●●●○○○○]  6 of 10 spots taken
```
(Update this number manually as restaurants onboard)

**CTA:** "Apply To Be A Founding Partner" → `/founding`

**Design:** Brass Gold `#C6A35B` accents on this section. Feels premium, not discounted.

---

### 6.8 Trust
**Objective:** Remove the "what's the catch" objection before it forms.

**Headline:** Built For India. Built To Last.

**4 trust signals (horizontal row, icon + text):**
1. Your money goes directly to your Razorpay/Cashfree account. We never touch it.
2. Your data is completely isolated. No other restaurant can see it.
3. Works on any phone, tablet, or laptop you already own.
4. No app download. No new hardware. No setup fee.

---

### 6.9 Final CTA
**Objective:** Capture everyone who scrolled this far.

**Headline:** Ready to see RestOS in your restaurant?

**Layout:** Full-width dark section, centered, generous padding.

**CTAs:**
- Primary: "Book a 20-Minute Demo" → `/demo`
- Secondary: "WhatsApp Us Now" → wa.me link

**Below:** "No commitment. No credit card. Just a conversation."

---

## 7. PAGE 2 — /demo (Book Demo)

**Objective:** Convert interest into a booked call. Remove all friction.

**Layout:** Single column, centered, clean.

**Headline:** Let's show you RestOS in your restaurant.

**Subheadline:** Pick a time. 20 minutes. We'll walk you through everything live.

**Form fields (minimal):**
1. Your name
2. Restaurant name
3. City
4. Phone number (WhatsApp preferred)
5. Preferred time (Cal.com embed handles this)

**Below form:** "Or just WhatsApp us directly →" with WhatsApp link

**No navigation distractions. No footer links. Focus only on booking.**

---

## 8. PAGE 3 — /features (Full Product Overview)

**Objective:** For visitors who want the full picture before booking.

**Layout:** Alternating sections — text left / visual right, then visual left / text right.

**Sections in order:**
1. QR Ordering — "Customers order from their own phone"
2. Kitchen Display System — "Zero paper. Zero confusion."
3. Waiter App — "Your floor team, fully informed"
4. Payments — "Every rupee. Automatically tracked."
5. Admin Dashboard — "Your restaurant, from anywhere"
6. Analytics & Reports — "Finally know what's working"
7. Table Management — "Full floor visibility"
8. Reservations — "Never lose a booking"

Each section:
- Outcome-first headline
- 3–4 bullet points translated into human language (not technical specs)
- Product screenshot or video clip from YouTube
- Small "Learn more" or section-level CTA

**Bottom CTA:** Book Demo banner (same as homepage final CTA)

---

## 9. PAGE 4 — /pricing

**Objective:** Answer "what does it cost" without creating friction.

**Headline:** Simple, honest pricing.

**Two panels:**

**Panel 1 — Founding Partner (highlighted)**
- Price: Free for 90 days
- Spots: 10 only (show live count)
- Everything included
- Direct founder access
- CTA: "Claim Your Spot" → `/founding`

**Panel 2 — Regular Access**
- Price: "Coming soon — join waitlist"
- Everything included
- Standard support
- CTA: "Join Waitlist" → simple email capture

**Below panels:** FAQ section
- Is there a contract? No.
- Do I need to buy hardware? No.
- What happens after 90 days? You pay the regular price, or you leave. No tricks.
- Is my data safe? Yes — isolated per restaurant, AES-256 encrypted.
- Does it work for takeaway only restaurants? Yes.

---

## 10. PAGE 5 — /founding (Founding Partner Program)

**Objective:** Convert the most engaged visitors into Founding Partners.

**Headline:** You're Not Just a Customer. You're a Founder.

**Story flow:**
1. Why we're doing this (founder's mission, 2–3 paragraphs)
2. What Founding Partners get (detailed)
3. What we ask in return (feedback, candor, 20 mins/month with the team)
4. The 10 spots and current count
5. Application form: name, restaurant, city, phone, "tell us about your restaurant" (1 text area)

**Tone:** Personal. Human. Not corporate. Like a letter from the founder.

---

## 11. PAGE 6 — /about

**Objective:** Build trust in the people behind the product.

**Sections:**
1. The mission — why restaurants deserve better technology
2. The product — what RestOS is (1 paragraph)
3. The company — Omniviya, what we build, where we're based
4. The founder(s) — photo, name, 2–3 sentences
5. Contact — email, WhatsApp, address

---

## 12. MOBILE BEHAVIOR

- All layouts stack to single column on mobile
- Navigation: hamburger → full overlay
- CTAs: full width on mobile
- Videos: responsive 16:9 container
- Ecosystem diagram: vertical stack on mobile (not side-by-side)
- Touch targets: minimum 44px

---

## 13. PERFORMANCE REQUIREMENTS

- Lighthouse score: 90+ on mobile
- No heavy libraries (no jQuery, no Bootstrap)
- YouTube: lite-youtube-embed (lazy loads, no iframe until click)
- Images: Next.js Image component, WebP, lazy load
- Fonts: Google Fonts with `display=swap`
- Animations: `will-change: transform` only on animated elements

---

## 14. CONVERSION FLOWS

### Primary: Demo Booking
Homepage Hero CTA → /demo → Cal.com booking

### Secondary: WhatsApp
Any WhatsApp button → wa.me/[number]?text=Hi, I want to know more about RestOS

### Tertiary: Founding Partner
Homepage Section 6.7 → /founding → application form → founder reviews → WhatsApp follow-up

---

## 15. LAUNCH CHECKLIST

- [ ] Google Analytics / Vercel Analytics connected
- [ ] WhatsApp Business number configured
- [ ] Cal.com account set up with 20-min demo slot
- [ ] YouTube video uploaded and URL ready
- [ ] Founding Partner count set to 0/10 on launch
- [ ] Razorpay/Cashfree demo account screenshots ready
- [ ] favicon, OG image, meta descriptions on all 6 pages
- [ ] Mobile tested on Android Chrome (primary India browser)
- [ ] Form submissions go to email + WhatsApp notification

---

## 16. WHAT COMES AFTER LAUNCH

Once 10 Founding Partners are onboarded:
- Add real customer quotes to homepage
- Build /blog with SEO content engine
- Add individual product sub-pages (/qr-ordering, /kds, etc.)
- Add /solutions pages per restaurant type
- Build Demo Center with video library
- Add case studies
