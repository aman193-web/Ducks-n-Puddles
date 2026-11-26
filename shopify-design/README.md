# Ducks ’n Puddles: Shopify design

A clickable design prototype for the Shopify side of Ducks ’n Puddles. ducksnpuddles.com stays custom-built. This folder covers the two Shopify templates in the brief:

| File | Shopify template | Purpose |
|---|---|---|
| `index.html` | `templates/index.json` | Shop homepage, built for browsing and finding products |
| `reserve.html` | `templates/product.reserve.json` | Pre-launch $1 reservation page: email capture plus deposit |

Checkout is **not** designed in this phase. Pressing "Reserve for $1" checks the email field, then shows a toast where Shopify checkout would open.

## Viewing it

Run the main site's dev server and open the prototype on it:

```bash
npm run dev
```

Then go to http://localhost:3000/shopify-design (the reservation page is `/shopify-design/reserve.html`). `app/shopify-design/[[...path]]/route.ts` serves this folder in development only. A production build answers 404, so the mock store never ships with ducksnpuddles.com.

**Standalone files:** `standalone/index.html` and `standalone/reserve.html` are single files with every font, style, script and image inlined, so they open by double-click with no internet or asset folder. Keep the two side by side, since they link to each other. Rebuild after any change with `node shopify-design/tools/build-standalone.mjs`.

The folder also works on its own with any static server, e.g. `python3 -m http.server 4310 --directory shopify-design`.

`reserve.html?duck=chi-chi` opens the page with a duck already chosen (`vincey`, `chi-chi`, `goosey`, `trio`, `undecided`). Every "Reserve" button on the homepage uses this link.

**Open items:** the orange button at the bottom left outlines every piece of copy, price or campaign detail that is still waiting on the client, and lists them. Add `?review` to a URL to open it in review mode.

## Brand

The tokens come straight from the main site's `styles/tokens.css`: the same palette, the same ink (`#10264A`), and the same three typefaces (Bangbang for display, Poppins for text, DM Mono for labels, plus Edu QLD Beginner for character lines). It also keeps the 1.5px ink outlines on flat colour, the cloud eyebrow sticker, and the button with its arrow badge. The changes for Shopify are:

- The cloud sticker is pure CSS here, so it can live in a Liquid snippet without React.
- Section grounds follow a fixed order (pale blue, then cream, then a dark panel) so that sections from the theme editor can be reordered and still look right.
- Product cards follow Shopify's card pattern (media, title, price, button), with the main site's "duck peeking out from behind its bottle" moved into the hover state.

## Homepage sections → Shopify

The header and footer are the main site's own (`components/SiteHeader.tsx`, `components/SiteFooter.tsx`), with the same links, so moving between ducksnpuddles.com and the shop feels like one site. The only Shopify changes: the call to action is "Reserve for $1", a cart sits beside it, and the footer's links point at the shop where the shop has that page.

| Section | Shopify implementation |
|---|---|
| Header + menu sheet | `header`, `main-menu` (The Ducks dropdown, Features, Our Story, Blog, Store) |
| Hero + shop by duck | custom `hero-split` (blocks: eyebrow, heading, text, button, duck avatars) |
| Product grid with filter pills | `featured-collection` on `all`, tabs from product type, `card-product` snippet |
| Reserve band | custom `reserve-promo` (three step blocks + image) |
| Duck finder | custom `duck-finder`, one block per duck (the client's character copy) |
| Meet the Puddle + features | `image-with-text` + `multicolumn` |
| In the wild gallery | custom `scrapbook-gallery` (photo / video blocks), same as the main site |
| FAQ | `collapsible-content` |
| Footer | `footer`, three menus + Settings → Policies |

"Notify me" on coming-soon cards opens an email field inline, then saves it as a customer with the tag `notify:<product>`.

## Reservation page

Buy box (gallery in the chosen duck's colour, duck picker, what the $1 gets you, email, $1 button) → How it works in three steps (reserve for $1 → first pick on launch day → pay the rest, get your bottle) → what you're reserving → founders → FAQ → email-only signup → footer.

## Reservation mechanics (recommended)

- **A $1 product** ("Duck Reservation") on the `product.reserve` template. The $1 then goes through native Shopify checkout, Shop Pay included, with no app needed.
- **Variants = duck preference** (Vincey / Chi Chi / Goosey / All three). That way the choice is recorded on the order.
- **Shopify Flow:** order paid → tag customer `reserver` → Shopify Email or Klaviyo segment. On launch day, that segment gets the launch link first.
- **Email-only signups** (the "Not ready to reserve?" band) are tagged `prelaunch-lead`. This gives the team two separate audiences: likely backers and warm leads.
- **Refunds** go through Shopify admin. The refund policy page must cover the reservation before it goes live.
- **Indexing:** if the client wants the page kept out of search, add `{% if template.suffix == 'reserve' %}<meta name="robots" content="noindex">{% endif %}` to `theme.liquid`. (Both prototype pages are noindex either way.)

## Open items: need client confirmation

These are also outlined on the pages themselves (orange button, bottom left).

1. Deposit: $1. Still to confirm: whether it's refundable, and the terms.
2. How the $1 is credited toward the final price (the flow says "pay the rest").
3. The early-bird incentive (discount or reward).
4. Launch date.
5. Fulfilment timeline (the meeting said "several months after the campaign").
6. Limit per customer / multiple reservations.
7. Retail price of each bottle (the cards say "Launch price announced soon").
8. Trio bundle: this is our proposal. Offer and price not confirmed.
9. Add-ons from the meeting (theme song, stickers, hats, merch): which ones sell in Shopify.
10. Personalized Puddle: personalization is currently held back on the main site.
11. Snack-holder claim: waiting on the client's written food-contact approval.
12. Refund policy page, which must cover the reservation.
13. Whether the reservation page is indexed by search engines.

## Assets

`assets/img` and `assets/video` hold copies of the main site's optimised images and gallery clips. `assets/fonts` holds Bangbang. Icons are Phosphor (regular), inlined as an SVG sprite at the top of each page.
