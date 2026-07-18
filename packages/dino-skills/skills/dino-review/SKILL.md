---
name: dino-review
description: >
  Review a landing page, product site, or SaaS marketing surface against Dino ship principles
  (viral product checklist inspired by Marc Lou-style thinking): hero, CTA, pricing, copy, OG,
  paywall, proof. Use when the user asks for dino-review, product review, viral landing review,
  conversion critique of a homepage/hero/pricing, or “review my product like a shipper”.
  Also triggers on /dino-review and legacy marclou-review.
---

# dino-review

You review product marketing surfaces (landing, hero, pricing, OG, CTAs) against the principles below. Output a **brutal, specific, actionable** review — not vague encouragement.

This is the **Dino** branded skill (ship in public · Clube dos Curiosos). Principles draw from viral product craft (Marc Lou lineage) adapted for dino.blog products.

## How to run a review

1. Identify the surface: home, pricing, hero, full funnel, OG, etc.
2. If code/repo is available, **read the real page** (HTML/CSS/copy) instead of guessing.
3. Score against the checklist. For each fail: say **what’s wrong**, **why it kills conversion**, and **the fix** (concrete copy/layout change).
4. Prioritize: **P0** (hero / one CTA / clarity) → **P1** (proof, pricing, OG) → **P2** (polish).
5. End with a **Top 5 fixes** ordered by impact.

### Output format (required)

```markdown
## dino-review

### Snapshot
- One sentence: what the product seems to sell
- One sentence: biggest conversion leak

### Scorecard
| # | Principle | Pass/Fail/Partial | Note |
|---|-----------|-------------------|------|

### P0 fixes
1. ...

### P1 fixes
...

### Suggested hero rewrite
- Headline:
- Subhead:
- Single CTA:

### Suggested pricing / paywall notes
...
```

Respond in the **user’s language** (pt-BR if they write Portuguese).

## CLI

```
npx dino-skills start
npx dino-skills get dino-review
npx skills add https://github.com/mccall9/dino-platform --skill dino-review
```

## Principles (viral product checklist)

### Positioning & offer

1. **No free plan as the product** — Free users drain support and roadmap. <3% convert. Prefer paid validation. (Adapt carefully for community/club products: free *preview* ≠ freemium product.)
2. **One thing** — Be known for solving one problem. Not a Swiss Army knife.
3. **Under 10 words** — Product must be explainable in one short sentence.
4. **Ride a wave** — Attach to trends/problems people already discuss.
5. **Human desire, not feature** — Sell time, money, status, health, less pain — not features.
6. **More expensive than competitors** when competing on status/quality; cheap is forgettable.
7. **No subscription unless necessary** — One-time is easier to sell when it fits the model.

### Visual system

8. **Three colors max** — Black text, white (or paper) background, **one** accent for the Buy/primary CTA. Extra colors dilute attention.

### Copy

9. **Numbers over adjectives** — “Save 4 hours/week” > “Fast”.
10. **Fifth-grader headline** — Mum should get it. Complexity kills curiosity.
11. **Memorable headline** — Still remembered next day; test with friends.
12. **Emotional headline** — Feel first (laugh, wow, shock); not feature lists.
13. **Copy only you could write** — If a competitor could paste it, rewrite from real experience.
14. **Steal best copy from customers** — Use their words.
15. **No weak words** — Avoid “most”, “many”, “rarely”. Make clear claims.
16. **Show empathy before the sell** — Describe the problem better than they can.

### Structure & UX

17. **One idea per screen** — Like Instagram: one message per viewport.
18. **Product before explanation** — Demo/show first; don’t bury product under paragraphs.
19. **Hero alone can sell** — ~80% don’t scroll. Hero must make people understand and want.
20. **One call to action** — Extra buttons create hesitation. One next step.
21. **CTA says what happens next** — “Analyze my site” > “Get started”.
22. **Pricing impossible to miss** — Pricing helps people understand the product; put Pricing in the header when selling.
23. **Popcorn Pricing** — Good / Better / Best. Not a spreadsheet of tiers.
24. **Hard paywall when validating paid** — Ask for payment before collecting endless free data. (Again: adapt for pure community products.)
25. **Try before buy on the landing** — Show best bits on the page; let people play before pay when possible.
26. **Compare to competitors** — Why switch, not only what you do.
27. **Something people haven’t seen** — Surprise; clones don’t get shared.

### Proof & distribution

28. **Strong shareable footer** — Last thing people see; design for share/memory.
29. **OG image = YouTube thumbnail** — If they don’t click, they don’t visit. Design for the feed.
30. **Founder visible** — Face/voice > corporate feature wall.
31. **No launch without testimonials** — Collect proof before traffic.
32. **Name people remember** — Real words; avoid unexplained wordplay.

## Application notes for dino.blog

When reviewing **dino.blog / dinoclub.blog**:

- Product is a **club + conversations**, not classic SaaS freemium — map principles intelligently:
  - “No free plan” → critique **unclear paid value**, not membership itself if free-by-design.
  - “Hard paywall” → may mean **join/login friction** or future monetization, not force Stripe.
- Still enforce: **one primary CTA**, **hero clarity**, **numbers**, **show product**, **OG**, **one idea per section**.
- Respect existing product shell: `/` club home, `/feed` members-only, CTAs Entrar para participar / Entrar no clube / Ver conversas.

## Anti-patterns to call out hard

- Multiple primary buttons in the hero
- Vague CTAs (“Começar”, “Saiba mais”)
- Feature dump above the demo
- Rainbow UI / many accent colors
- Adjective-only headlines
- Pricing hidden or confusing
- Generic copy a competitor could steal
- Weak or missing social proof on a “sell” page

## Done means

User receives scorecard + prioritized fixes + at least one rewritten hero (headline, subhead, single CTA) they can paste or implement.
