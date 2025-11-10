# Glasses Drop Off SDK (Mail‑In, English‑only)

A minimal Next.js app for instant lens quotes and simple order capture. Pricing rules:
- Single Vision: $150
- Progressive: $350
- Add‑ons: +$50 each (Transitions, Sunglass Tint, Blue‑Light)

## Quick Start (Local)
1) Install Node LTS (18+).
2) Run:
   npm install
   npm run dev
3) Open http://localhost:3000

## Deploy to Vercel
1) Visit https://vercel.com/new
2) Drag this folder onto the page, or use the **Upload Project** option.
3) Click **Deploy**.

### Where to change brand color
- Edit `styles/globals.css` → `--brand-blue` variable.

### Where to change pricing
- Edit `components/QuoteForm.js`:
  - `const base = lensType === 'single' ? 150 : 350`
  - Add‑on price is `50` per item in `calc()`.

### Notes
- This starter does not process payments or file uploads yet. You can add Shopify/Stripe later.
- The API route `/api/quote` simply calculates a price and returns a summary JSON.
