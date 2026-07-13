/* Full article HTML for each blog post. Rendered via dangerouslySetInnerHTML. */
export const ARTICLE_CONTENT: Record<string, string> = {

'how-qr-ordering-works-restaurants-india': `
<p>QR code ordering lets restaurant customers scan a code at their table, browse the digital menu on their own phone, and place an order — all without a waiter. The order appears instantly on the kitchen display. That is the core of it.</p>

<p>But the mechanics matter, because the difference between a well-implemented QR ordering system and a clunky one determines whether your customers use it or ignore it. Here is how it works in practice.</p>

<h2>The customer journey, step by step</h2>

<ol style="padding-left: 1.5rem; list-style-type: decimal; space-y: 0.5rem;">
  <li style="margin-bottom: 0.5rem;"><strong>Customer sits down and scans the QR code</strong> on the table — using any phone camera, no app required.</li>
  <li style="margin-bottom: 0.5rem;"><strong>A web menu opens</strong> in the phone's browser. It shows your live menu, with photos, descriptions, and prices.</li>
  <li style="margin-bottom: 0.5rem;"><strong>The customer selects items</strong>, customises if needed (extra spice, no onion), and adds to cart.</li>
  <li style="margin-bottom: 0.5rem;"><strong>They place the order</strong> — either pay immediately via UPI or card, or choose to pay at the table later.</li>
  <li style="margin-bottom: 0.5rem;"><strong>The order hits the kitchen display instantly.</strong> No verbal relay, no ticket printer required.</li>
  <li style="margin-bottom: 0.5rem;"><strong>The kitchen marks it ready.</strong> The waiter brings the food. Simple.</li>
</ol>

<h2>What you need to set it up</h2>

<p>Contrary to what POS vendors suggest, you do not need expensive hardware. Here is the full list for a typical 40-cover restaurant:</p>

<ul style="padding-left: 1.5rem; list-style-type: disc;">
  <li style="margin-bottom: 0.4rem;"><strong>QR code stickers or stands</strong> — one per table. Printed in minutes from any software, or ordered pre-printed.</li>
  <li style="margin-bottom: 0.4rem;"><strong>A tablet or monitor in the kitchen</strong> — for the kitchen display system (KDS). An old Android tablet works fine.</li>
  <li style="margin-bottom: 0.4rem;"><strong>Reliable Wi-Fi</strong> — reaches the tables and the kitchen. A good router (₹2,000–5,000) is typically enough.</li>
  <li style="margin-bottom: 0.4rem;"><strong>Restaurant management software</strong> — this is what ties the QR menu, kitchen display, and payment together.</li>
</ul>

<p>Total hardware investment: ₹3,000–10,000 for most restaurants. Compare that to a traditional POS which can run ₹1–3 lakh.</p>

<h2>How QR ordering connects to payments</h2>

<p>In India, most QR ordering systems support UPI (via Razorpay or Cashfree), credit/debit card, and cash on delivery at the table. With Omniviya, payments go directly to your payment gateway account — the platform never touches your money.</p>

<p>When a customer pays via UPI at the time of ordering, the order only goes to the kitchen after payment is confirmed. This eliminates walk-outs and reduces disputes.</p>

<h2>Common implementation mistakes</h2>

<p><strong>Using a static PDF menu instead of a live digital menu.</strong> A static PDF cannot take orders. You need a system where the menu is editable and orders flow to the kitchen.</p>

<p><strong>Poor Wi-Fi coverage at tables.</strong> If the QR menu loads slowly, customers give up. Test signal strength at your furthest table before going live.</p>

<p><strong>Not updating the menu in the software.</strong> If a dish is out of stock but still showing on the QR menu, you create frustration. Live menu management solves this — mark an item unavailable in 10 seconds.</p>

<h2>How long does setup take?</h2>

<p>Most restaurants go live within one evening. Upload your menu, generate QR codes, place them on tables, and you are done. With Omniviya, the onboarding takes under an hour if you have your menu ready.</p>

<h2>Does QR ordering reduce your tips?</h2>

<p>Surprisingly, no. Studies in the Indian context show that when waiters spend less time taking orders and more time on hospitality — refilling water, checking satisfaction, explaining dishes — tip rates stay flat or improve. QR ordering removes the transactional friction; it does not remove the human experience.</p>

<h2>Is QR ordering right for every restaurant?</h2>

<p>It works best for dine-in, casual dining, fast-casual, and cloud kitchens with a counter. It works less well for fine-dining experiences where tableside service is part of the product. That said, you can always run a hybrid: QR ordering for casual tables, waiter-assisted ordering for special occasion covers.</p>

<p>The bottom line: QR code ordering for Indian restaurants is no longer a tech experiment. It is the default for new restaurants, and increasingly the upgrade path for established ones.</p>
`,

'restaurant-management-software-india-guide': `
<p>Most Indian restaurant owners are in one of two situations: they are paying ₹50,000–1,00,000 per year for a traditional POS that breaks, needs a technician, and does not integrate with their delivery platforms — or they are running on WhatsApp, paper chits, and a prayer.</p>

<p>Restaurant management software (also called restaurant management system or RMS) is the category of tools that replaces both. This guide explains what to look for, what questions to ask, and what the market looks like in 2026.</p>

<h2>What does restaurant management software actually do?</h2>

<p>At its core, restaurant management software handles the flow of an order from customer to kitchen to billing. But modern systems do much more:</p>

<ul style="padding-left: 1.5rem; list-style-type: disc;">
  <li style="margin-bottom: 0.4rem;"><strong>Order management</strong> — QR ordering, waiter-assisted ordering, and counter ordering, all feeding into one system</li>
  <li style="margin-bottom: 0.4rem;"><strong>Kitchen Display System (KDS)</strong> — replaces printed tickets; orders appear on a screen in the kitchen with timestamps</li>
  <li style="margin-bottom: 0.4rem;"><strong>Payments</strong> — UPI, card, cash; integrated with Razorpay or Cashfree; automatic reconciliation</li>
  <li style="margin-bottom: 0.4rem;"><strong>Menu management</strong> — update prices, add items, mark items unavailable — from anywhere</li>
  <li style="margin-bottom: 0.4rem;"><strong>Analytics</strong> — which dishes sell, when peak hours are, average order value, revenue by day</li>
  <li style="margin-bottom: 0.4rem;"><strong>Table management</strong> — track which tables are occupied, split bills, merge tables</li>
  <li style="margin-bottom: 0.4rem;"><strong>Multi-branch management</strong> — for restaurant groups, see all outlets from one dashboard</li>
</ul>

<h2>The four categories of restaurant software in India</h2>

<h3 style="color: #f9f6f1; font-size: 1.1rem; margin-top: 1.5rem; margin-bottom: 0.5rem;">1. Traditional POS systems (Petpooja, Posist, etc.)</h3>
<p>Hardware-heavy, often require on-site installation. Annual contracts, maintenance fees. Good for large chains that need deep customisation and have IT staff. Overkill for independent restaurants.</p>

<h3 style="color: #f9f6f1; font-size: 1.1rem; margin-top: 1.5rem; margin-bottom: 0.5rem;">2. Billing-only software (Vyapar, etc.)</h3>
<p>Handle invoicing and GST. Not built for restaurants — no kitchen display, no QR ordering, no table management. Common workaround is to use these alongside a separate ordering app, creating data silos.</p>

<h3 style="color: #f9f6f1; font-size: 1.1rem; margin-top: 1.5rem; margin-bottom: 0.5rem;">3. Delivery aggregator tools (Zomato/Swiggy restaurant panels)</h3>
<p>Manage your presence on the platforms. Not a replacement for a full restaurant management system — no dine-in flow, no kitchen display for your own kitchen, no own-channel payment.</p>

<h3 style="color: #f9f6f1; font-size: 1.1rem; margin-top: 1.5rem; margin-bottom: 0.5rem;">4. All-in-one restaurant operating systems (Omniviya, etc.)</h3>
<p>QR ordering + KDS + payments + analytics in one product. Web-based, so no hardware lock-in. Suitable for independent restaurants and small chains. Significantly cheaper than traditional POS.</p>

<h2>What to look for when evaluating restaurant software</h2>

<p><strong>No platform fee on orders.</strong> Some software takes 1–3% of every order that passes through them. At scale this becomes significant. Look for systems that charge a flat monthly fee with zero order commission.</p>

<p><strong>Real-time kitchen display, not printed tickets.</strong> Printers jam, paper runs out, and tickets get lost. A KDS tablet in the kitchen is more reliable and faster.</p>

<p><strong>Payments go to your account.</strong> Avoid any system where the software company holds your settlement. Your revenue should hit your bank account directly from Razorpay or Cashfree.</p>

<p><strong>Works on devices you already own.</strong> You should not need to buy proprietary tablets or terminals. Any Android tablet, iPhone, or laptop should run the software.</p>

<p><strong>Setup in hours, not weeks.</strong> Modern restaurant software should take one evening to set up. If the vendor tells you it takes 2–3 weeks, that is a red flag.</p>

<h2>What does restaurant management software cost in India?</h2>

<p>Pricing in 2026 ranges from free (limited features) to ₹5,000+/month for enterprise systems. For an independent restaurant, the realistic range is:</p>

<ul style="padding-left: 1.5rem; list-style-type: disc;">
  <li style="margin-bottom: 0.4rem;"><strong>Free tier</strong> — basic QR ordering, limited orders per month. Good for trial or very small operations.</li>
  <li style="margin-bottom: 0.4rem;"><strong>₹1,000–1,500/month</strong> — full QR ordering, KDS, UPI payments, analytics. Suitable for most restaurants.</li>
  <li style="margin-bottom: 0.4rem;"><strong>₹2,000–3,000/month</strong> — multi-branch, advanced analytics, priority support.</li>
</ul>

<p>Add in zero setup fee and no hardware requirement, and the total cost of ownership for a modern restaurant management system is a fraction of a traditional POS.</p>

<h2>Questions to ask any vendor before signing up</h2>

<ol style="padding-left: 1.5rem; list-style-type: decimal;">
  <li style="margin-bottom: 0.4rem;">Do you take a commission on orders? What is your platform fee?</li>
  <li style="margin-bottom: 0.4rem;">Does my payment settle directly to my Razorpay/Cashfree account?</li>
  <li style="margin-bottom: 0.4rem;">What hardware do I need to buy?</li>
  <li style="margin-bottom: 0.4rem;">How long does setup take?</li>
  <li style="margin-bottom: 0.4rem;">Is there a contract or annual commitment?</li>
  <li style="margin-bottom: 0.4rem;">Can I export my data if I want to switch?</li>
</ol>

<p>The right restaurant management software should feel like an upgrade to your operations, not a new administrative burden. If a demo takes longer than 30 minutes to show you how to take an order, keep looking.</p>
`,

'cloud-kitchen-technology-software-guide': `
<p>Cloud kitchens — also called dark kitchens or ghost kitchens — need different technology from dine-in restaurants. There is no front-of-house to manage, no QR codes at tables, and no reservation system needed. But the backend demands are higher: multiple delivery channels, fast order routing to the kitchen, real-time inventory tracking, and analytics across virtual brands.</p>

<p>This guide breaks down the software a cloud kitchen in India actually needs — and what you can safely skip.</p>

<h2>The core technology stack for a cloud kitchen</h2>

<h3 style="color: #f9f6f1; font-size: 1.1rem; margin-top: 1.5rem; margin-bottom: 0.5rem;">1. Kitchen Display System (KDS)</h3>
<p>This is the single most important technology in your kitchen. A KDS replaces printed order tickets with a screen that shows all incoming orders — from Swiggy, Zomato, and your own ordering channel — in one place, with timestamps and station assignments.</p>

<p>Without a KDS, kitchen staff are managing multiple tablets, multiple printers, and multiple ticket stacks simultaneously. This is the single biggest source of errors and delays in cloud kitchens.</p>

<h3 style="color: #f9f6f1; font-size: 1.1rem; margin-top: 1.5rem; margin-bottom: 0.5rem;">2. Order aggregation</h3>
<p>Cloud kitchens typically receive orders from 3–5 channels: Swiggy, Zomato, their own website or app, WhatsApp, and potentially direct phone orders. Without aggregation, you are managing separate tablets for each platform. An order aggregator routes all of these into a single stream.</p>

<p>Some restaurant management platforms include this natively; others require a third-party middleware tool.</p>

<h3 style="color: #f9f6f1; font-size: 1.1rem; margin-top: 1.5rem; margin-bottom: 0.5rem;">3. Own-channel ordering</h3>
<p>Every delivery platform charges a commission of 20–30%. Orders that come through your own channel — direct website, QR code at your pickup counter, or WhatsApp — are commission-free. Building this own channel is a priority for any cloud kitchen looking to improve margins.</p>

<h3 style="color: #f9f6f1; font-size: 1.1rem; margin-top: 1.5rem; margin-bottom: 0.5rem;">4. Payment processing</h3>
<p>For own-channel orders, you need UPI and card payment support — integrated with Razorpay or Cashfree. Ensure the system settles directly to your account with no platform fee on the transaction amount.</p>

<h3 style="color: #f9f6f1; font-size: 1.1rem; margin-top: 1.5rem; margin-bottom: 0.5rem;">5. Analytics</h3>
<p>Cloud kitchens live and die by data. Key metrics: average preparation time by dish, order volume by hour, cancelled order rate, revenue by channel, and top-selling SKUs. Without this data, you are optimising by gut feel.</p>

<h2>What cloud kitchens often over-invest in</h2>

<p><strong>Table management software.</strong> You have no tables. Skip it.</p>

<p><strong>Reservation systems.</strong> Also irrelevant unless you have a counter where customers pick up.</p>

<p><strong>Expensive loyalty platforms.</strong> For early-stage cloud kitchens, focus on product quality and speed first. Loyalty programs have marginal impact below ₹50 lakh annual revenue.</p>

<p><strong>Custom mobile apps.</strong> A progressive web app (PWA) via your restaurant management software is sufficient for most own-channel ordering. A native iOS/Android app requires ongoing development cost and app store management — typically not worth it until you have significant volume.</p>

<h2>Virtual brands: technology considerations</h2>

<p>Many cloud kitchen operators run 2–5 virtual brands from the same kitchen. Technology needs for multi-brand kitchens include:</p>

<ul style="padding-left: 1.5rem; list-style-type: disc;">
  <li style="margin-bottom: 0.4rem;">Separate menus per brand in the same system</li>
  <li style="margin-bottom: 0.4rem;">Revenue attribution by brand</li>
  <li style="margin-bottom: 0.4rem;">Station routing (which orders go to which prep station)</li>
  <li style="margin-bottom: 0.4rem;">Consolidated analytics across all brands</li>
</ul>

<h2>Practical technology cost for a cloud kitchen in India</h2>

<p>A realistic monthly technology budget for a cloud kitchen doing ₹5–15 lakh revenue:</p>

<ul style="padding-left: 1.5rem; list-style-type: disc;">
  <li style="margin-bottom: 0.4rem;">Restaurant management software (KDS + own-channel ordering + analytics): ₹1,200–2,500/month</li>
  <li style="margin-bottom: 0.4rem;">Android tablet for KDS: ₹8,000–12,000 one-time</li>
  <li style="margin-bottom: 0.4rem;">Payment processing: 2% + ₹2 per transaction (Razorpay standard rates)</li>
</ul>

<p>Total setup: under ₹15,000. Monthly: ₹1,200–2,500 plus payment fees.</p>

<h2>The single most impactful technology decision</h2>

<p>If you could only choose one technology investment for your cloud kitchen, it would be a kitchen display system. Faster preparation times, fewer errors, and lower stress for your team compound into better reviews, better delivery ratings, and more repeat orders.</p>

<p>Everything else is secondary. Get the KDS right first.</p>
`,

'upi-payments-restaurants-india-setup-guide': `
<p>UPI is how India pays. In 2026, over 60% of consumer transactions at Indian restaurants happen via UPI. If your restaurant cannot accept UPI seamlessly — for dine-in, takeaway, and advance orders — you are losing revenue and creating friction that sends customers to the competitor next door.</p>

<p>Here is the complete guide to setting up UPI payments for your restaurant correctly.</p>

<h2>What "accepting UPI" actually means for a restaurant</h2>

<p>There are three different ways a restaurant can accept UPI, and they are not equivalent:</p>

<ul style="padding-left: 1.5rem; list-style-type: disc;">
  <li style="margin-bottom: 0.4rem;"><strong>Static UPI QR code</strong> — a printed QR code customers scan and type the amount manually. Works, but payment is not linked to the order. Creates reconciliation headaches.</li>
  <li style="margin-bottom: 0.4rem;"><strong>Payment gateway integration</strong> — via Razorpay or Cashfree, linked to your order management system. Customer pays exact order amount. Payment confirmation triggers the order to the kitchen. This is the right approach.</li>
  <li style="margin-bottom: 0.4rem;"><strong>Third-party payment platform</strong> — some restaurant software platforms act as middlemen, collecting payment and settling to you after a delay and fee. Avoid these.</li>
</ul>

<h2>Razorpay vs Cashfree for restaurants</h2>

<p>Both are RBI-regulated, reputable payment gateways used by Indian restaurants. The practical differences:</p>

<p><strong>Razorpay</strong> — easier onboarding (KYC is typically faster for food businesses), broader UPI app coverage, instant settlement available at premium rate. Standard rate is 2% + ₹2 per transaction.</p>

<p><strong>Cashfree</strong> — slightly lower standard rates for higher volumes, strong for marketplaces and cloud kitchens. Standard rate is 1.75% for UPI.</p>

<p>For most restaurants starting out: Razorpay is slightly easier to get started with. For cloud kitchens processing ₹10 lakh+ per month: Cashfree often works out cheaper.</p>

<h2>Setting up payment gateway integration</h2>

<ol style="padding-left: 1.5rem; list-style-type: decimal;">
  <li style="margin-bottom: 0.6rem;"><strong>Create a Razorpay or Cashfree business account.</strong> You will need: GST number (or declaration of non-GST business), PAN, bank account details, and a cancelled cheque.</li>
  <li style="margin-bottom: 0.6rem;"><strong>Complete KYC.</strong> Typically takes 1–3 business days. Once approved, you have access to your payment gateway dashboard.</li>
  <li style="margin-bottom: 0.6rem;"><strong>Connect to your restaurant management software.</strong> Platforms like Omniviya connect to Razorpay and Cashfree directly — customers pay via the QR menu, payment is confirmed, and the order fires to the kitchen.</li>
  <li style="margin-bottom: 0.6rem;"><strong>Configure settlement schedule.</strong> Both gateways offer T+1 (next-day) or T+2 settlement by default. Instant settlement is available at higher rates.</li>
</ol>

<h2>The 0% platform fee rule</h2>

<p>This is critical: never use a restaurant management platform that adds a platform fee on top of gateway fees. Some platforms charge 1–3% of your order value on top of the 2% gateway fee — meaning you lose 3–5% of revenue just on payment processing.</p>

<p>The correct structure: restaurant management software charges a flat monthly subscription, and payments flow directly between your customer and your gateway account. The software never intermediates the money.</p>

<h2>Reconciliation: how to track UPI payments correctly</h2>

<p>The biggest accounting headache with UPI is reconciliation — matching which payment corresponds to which order. A proper integration solves this automatically: each order has a unique reference ID that is passed to the payment gateway and appears on your settlement report.</p>

<p>If you are using a static QR code where customers type the amount manually, you have to manually match bank statements to order records. At scale, this takes hours per week.</p>

<h2>Common UPI payment mistakes at restaurants</h2>

<p><strong>Accepting payment before order confirmation.</strong> If the payment gateway is not integrated with your order system, you may collect payment for a dish that is out of stock, requiring a refund. Integration ensures payment is only collected for available items.</p>

<p><strong>Not testing refund flows.</strong> Configure your gateway account to handle refunds before you go live. Customers will request refunds, and you want to be able to process them in 3–5 business days.</p>

<p><strong>Missing GST on payment receipts.</strong> UPI payment receipts from gateways do not automatically include GST breakdowns. Your restaurant management software should generate GST-compliant bills separate from the payment receipt.</p>

<h2>GST on restaurant payments</h2>

<p>For restaurants, GST on food is typically 5% (without input tax credit) or 12% (with ITC). Payment gateways are not GST agents — they process the total amount your software charges. GST billing is the restaurant management software's responsibility, not the gateway's.</p>

<p>With proper integration, every order automatically generates a GST-compliant bill that can be emailed or SMS-linked to the customer.</p>
`,

'restaurant-without-traditional-pos-india': `
<p>A traditional POS (Point of Sale) system for a restaurant in India costs between ₹80,000 and ₹3,00,000 upfront — including the touchscreen terminal, barcode scanner, receipt printer, and installation. Then add annual maintenance contracts (₹15,000–40,000/year), hardware that breaks and needs a technician, and software that has not meaningfully updated since 2018.</p>

<p>The question restaurant owners are increasingly asking: is all of this actually necessary?</p>

<h2>What a traditional POS system actually does</h2>

<p>Strip away the hardware, and a POS system has five core functions:</p>

<ol style="padding-left: 1.5rem; list-style-type: decimal;">
  <li style="margin-bottom: 0.4rem;">Takes orders (from staff, keyed in at the terminal)</li>
  <li style="margin-bottom: 0.4rem;">Sends orders to the kitchen (usually via a receipt printer)</li>
  <li style="margin-bottom: 0.4rem;">Tracks table status</li>
  <li style="margin-bottom: 0.4rem;">Processes payments (cash, card, UPI)</li>
  <li style="margin-bottom: 0.4rem;">Generates bills and reports</li>
</ol>

<p>Every single one of these functions can now be handled by software running on devices you already own — a tablet, a smartphone, or a laptop.</p>

<h2>Why the "you need a dedicated POS terminal" argument has collapsed</h2>

<p>The argument for a dedicated POS terminal used to be: reliability (always on, no internet dependency), speed (dedicated hardware is faster than a browser), and security (payment card data is handled by certified hardware).</p>

<p>In 2026, all three arguments have significantly weakened:</p>

<p><strong>Reliability:</strong> Restaurant management software running on a tablet with a local data cache handles brief internet outages. And unlike dedicated terminals, tablets and phones can be replaced for ₹8,000–15,000 — not ₹80,000.</p>

<p><strong>Speed:</strong> Modern web applications are as fast as dedicated software for order entry. A well-designed waiter app on an Android phone is faster than a 2018 POS terminal.</p>

<p><strong>Payment security:</strong> UPI payments in India do not involve card data on restaurant devices at all — the payment happens entirely within the customer's banking app. For card payments, Razorpay and Cashfree are PCI-DSS compliant and handle all sensitive data.</p>

<h2>What you replace the POS with</h2>

<p>A modern restaurant management system that replaces a traditional POS consists of:</p>

<ul style="padding-left: 1.5rem; list-style-type: disc;">
  <li style="margin-bottom: 0.5rem;"><strong>QR code menu ordering</strong> at tables — customers order on their phone</li>
  <li style="margin-bottom: 0.5rem;"><strong>Waiter app</strong> on smartphone or tablet — for assisted ordering at the table</li>
  <li style="margin-bottom: 0.5rem;"><strong>Kitchen Display System (KDS)</strong> on a tablet in the kitchen — replaces the ticket printer</li>
  <li style="margin-bottom: 0.5rem;"><strong>UPI and card payments</strong> via gateway integration — no dedicated payment terminal required</li>
  <li style="margin-bottom: 0.5rem;"><strong>Analytics dashboard</strong> on any browser — replaces the POS reporting module</li>
</ul>

<h2>What you cannot do without dedicated POS hardware</h2>

<p>There are genuine edge cases where traditional POS hardware still makes sense:</p>

<p><strong>High-volume fast food counter with cashier queue.</strong> If you have 50+ customers queuing at a single counter in a busy lunch rush, a dedicated terminal with integrated card swipe is still faster than a tablet-based system for the cashier.</p>

<p><strong>Loyalty card scanning with dedicated hardware.</strong> If your loyalty program uses physical plastic cards with barcodes, you need a barcode scanner. However, most modern loyalty systems use phone numbers or QR codes on phones instead.</p>

<p><strong>Offline-only operations.</strong> Some kitchens in remote locations have genuinely unreliable internet. In these cases, POS software with deep offline capability (syncing when connected) is more appropriate than a fully cloud-based system.</p>

<p>For the vast majority of Indian restaurants — dine-in, casual dining, fast-casual, cloud kitchen, QSR — none of these edge cases apply.</p>

<h2>The real question: what is your time worth?</h2>

<p>Traditional POS vendors will often argue that their system is more reliable. What they do not tell you is the cost of when it is not: the technician visit that takes 2–3 days to schedule, the restaurant that runs on paper during that time, and the data that does not sync correctly when the system comes back up.</p>

<p>Modern restaurant management software updates automatically. Support is via chat, not a field technician. And when a tablet breaks, you can replace it the same day.</p>

<h2>How to transition away from a traditional POS</h2>

<ol style="padding-left: 1.5rem; list-style-type: decimal;">
  <li style="margin-bottom: 0.5rem;"><strong>Run both systems in parallel for two weeks.</strong> Use the new system for dine-in while keeping the old POS as a fallback. Most owners find they stop using the old POS within the first week.</li>
  <li style="margin-bottom: 0.5rem;"><strong>Train staff on the waiter app first.</strong> The QR ordering is customer-facing and requires no training. Staff app training typically takes under an hour.</li>
  <li style="margin-bottom: 0.5rem;"><strong>Set up the KDS before anything else.</strong> The kitchen display is the most impactful change for operations. Get your kitchen comfortable with it before changing the front-of-house flow.</li>
  <li style="margin-bottom: 0.5rem;"><strong>Migrate historical data if needed.</strong> Menu items, pricing, and category structure should migrate first. Historical sales data from your old POS can usually be exported as CSV for reference.</li>
</ol>

<p>The shift away from a traditional POS is not a technology risk — it is a technology upgrade. The risk was always in the fragile, expensive hardware.</p>
`,

}
