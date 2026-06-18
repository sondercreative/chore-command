# Level Up — Planning Document

> Living document. Updated as features are adjusted during the build.
> Last updated: 2026-06-18

**App name:** Level Up

## Overview

A family chore tracking app for two kids (ages 6 and 8), named **Level Up**. Hosted on Netlify with Blob storage so both kids share live data across devices. No logins required. Admin access via PIN only.

**Build status:** Planning. During development we will use **localStorage** to test, then migrate persistence to **Netlify Blobs**.

---

## Users

- **Kid profiles** — admin can add/remove children; each has a name (e.g. Ashwin, Naveen), a fun color, and a chosen avatar. Name displayed large and bold.
- Seeded with two kids: **Ashwin** and **Naveen** (editable in admin).
- **Admin** — PIN-protected, accessible from a discreet button on the main screen

### Avatars

- Avatars are **illustrated/uploaded square images**, not emoji
- Admin manages an **avatar pool**: upload as many square images as wanted (stored as data URLs in localStorage during testing, Netlify Blobs in production)
- Each kid picks their avatar from the uploaded pool

---

## Chore Schedule

- Admin manually creates chores via the admin panel
- Each chore is assigned to one or more days of the week (Mon–Fri vs Sat–Sun supported as distinct groups)
- Each chore has a time slot: **Morning** or **Evening**
- Each chore has a **point value**, defaulting to 1 — admin can override per chore (e.g. Saturday full house clean = 5 points)
- Chores reset daily at midnight automatically

### Weekly Schedule Logic

- Weekday chores (Mon–Fri) and weekend chores (Sat–Sun) are configured separately
- Admin can assign different chore lists to each day group
- Example: lighter lists on weekdays, heavier chores on Saturday

---

## Kid-Facing UI

### Design Direction

- **Clean and bold — game UI aesthetic**
- Large tap targets, minimal text, high contrast
- Feels rewarding and exciting to interact with
- Optimized for tablet use by a 6 and 8 year old

### Profile Screen

- Each kid selects their profile on arrival (no login)
- Avatar displayed with name in large bold type, unique fun color per kid
- Shows their current total points and progress toward next reward

### Chore Checklist

- Morning and Evening sections displayed clearly
- Large checkboxes / tap-to-complete interaction
- Satisfying check animation on completion
- Completed chores visually distinct (checked off, greyed, struck)

### Progress Toward Next Reward

- Visible progress bar or meter showing points vs. next reward threshold
- Updates in real time as chores are checked off

---

## Point & Reward System

### Individual Points

- Points accumulate continuously toward the current **main goal** — no automatic weekly reset
- Each completed chore adds its point value to the kid's total
- Points keep climbing until **parents manually reset** them from the admin panel
- This is intentional: one kid can surpass a threshold (e.g. 100) and keep going while the other catches up. Once both have reached the main goal, parents reset to start a new main goal cycle.

### Milestones (within the current main goal)

- **Every 10 points** — small milestone celebration
- **Every 50 points** — halfway / bigger milestone celebration (more emphasis than the every-10 version)
- Milestones are markers of progress toward the main goal, not separate rewards

### Small Milestone Celebrations

- Triggered at each milestone (every 10, with extra fanfare at every 50)
- **Confetti burst animation** on screen
- Accompanied by a **random silly message** from a rotating pool
  - Messages should be unexpected and funny so kids look forward to the next one
  - Examples: "YOU ARE A CHORE LEGEND", "THE DISHES FEAR YOU", "SOCKS: DEFEATED"
  - Pool of 20–30 messages, never repeats until all seen
- The surprise factor is intentional — each milestone should feel different

### Individual Reward Tiers (admin configures)

- Admin sets both the **point threshold** and the **reward label** for each tier
- Two tiers within the current cycle:
  - **Small reward** (early milestone, e.g. 20 points = 30 min screen time) — an early payoff on the way to the main goal
  - **Large reward = the main goal** (e.g. 100 points = movie night) — this is the cycle's finish line
- When a kid reaches the large reward / main goal, their points keep climbing until the other kid catches up; once both reach it, parents reset for a new cycle
- The small tier resets along with points at the start of each new cycle
- Kids see what each reward is and how close they are

### Family Rewards (4 total)

- Admin configures 4 family rewards, each with:
  - A point threshold
  - A reward label (e.g. "Trip to West Edmonton Mall", "Camping Weekend")
- **Trigger condition:** BOTH kids must individually reach the threshold
- If one kid is at threshold and the other isn't, reward does not unlock — creates cooperation incentive

---

## Combined Power Bar

A shared family progress indicator visible on the main screen.

- **Fill reflects the actual unlock condition, not the sum.** The bar fills based on the kid who is *furthest behind* — i.e. `min(kidA, kidB) / threshold`. The reward only unlocks when both kids individually reach the threshold, so the bar shows the true distance to unlock.
- This means the bar can't be "full" while one kid lags. Surfacing the gap is the point: it keeps the bar honest and reinforces the cooperation incentive.
- Optionally show each kid's individual contribution as markers/segments so kids can see who needs to catch up.
- Styled as a **power/charge bar** — like a video game ultimate ability meter
- **Color and energy shifts with fill level:**
  - 0–40%: low energy, cool/muted color (blue or grey)
  - 40–60%: warming up, yellow/orange
  - 60–80%: getting dangerous, green, starts to pulse
  - 80–100%: fully charged, electric green, animated lightning/vibration effect — looks ready to unleash
- The visual intensity (glow, animation speed, particle effects) increases as it fills
- When both kids individually hit the threshold: a major unlock animation fires

---

## Admin Panel (PIN protected)

### Access

- Discreet admin button on main screen
- PIN entry required (4-digit, set at first launch)

### Chore Management

- Add / edit / delete chores
- Set chore name, time slot (morning/evening), days applicable, point value
- Preview weekly schedule

### Reward Configuration

- Set small reward threshold + label (per kid)
- Set large reward threshold + label (per kid)
- Set 4 family reward thresholds + labels

### Kid Management

- **Add / remove children**, each with a name and color
- Set kid avatar selection from the uploaded avatar pool
- **Avatar pool management:** upload square images (any number), delete unused ones
- View each kid's current point total
- Ability to manually adjust points if needed (with confirmation step)
- **Reset points** — clears both kids' totals to start a new main goal cycle (with confirmation step). Can reset individually or both at once.

### PIN Management

- Change PIN from admin panel

---

## Storage

- **Netlify Blobs** for all persistent data (production)
- **localStorage** for local testing during the build phase
- All state (points, chore completions, reward config, chore schedule) stored and synced via Blob storage
- Both kids see live shared data — sibling progress is always visible
- No user accounts or authentication beyond admin PIN

---

## Technical Notes

- Built as a single-page web app (React or vanilla HTML depending on Cowork build preference)
- Deployed to Netlify
- Confetti library (e.g. canvas-confetti) for milestone celebrations
- CSS animations for power bar effects — glow, pulse, lightning at high charge levels
- Daily reset logic handled client-side on load, keyed to current date stored in Blob
- Admin PIN hashed before storage (even for a family app, good habit)

---

## Open Questions for Build Session

- Avatar set: emoji-based, simple illustrated characters, or something else?
- Should completed-today chores be visible to the sibling's profile view (transparency) or private?
- Should there be a sound design layer (completion sounds, milestone fanfare)?

---

## Rank / Level System

The current run (0 → main goal points) is split into 6 tiers, each with a glowing hex badge:

1. Untrained · 2. Novice · 3. Apprentice · 4. Elite · 5. Heroic · 6. Legendary

Level = `min(6, floor(points / (mainGoal/6)) + 1)`. Profile shows level name, badge, "LEVEL x/6", points-to-next, and a progress bar. Resetting points sends a kid back to Star Recruit (new run).

## Profile Stats

- **Missions this week** — completions since Monday (from a rolling daily history log, kept 14 days).
- **Total missions** — lifetime completion counter that persists across point resets.
- Big tappable avatar; kid can change their own avatar anytime from the uploaded pool (no PIN).
- **Team / sibling card** at the bottom: "See how X is doing — help out!" with the sibling's avatar, level badge, points, and missions this week. Tapping it opens that kid's profile.

## Chore Model & Editor

Chores use a **group + slot** model: `group` is one of `everyday`, `weekday` (Mon–Fri), `sat`, `sun`; `slot` is `morning` or `evening`. A day shows its `everyday` chores plus the chores matching that day's specific group.

The admin **Chores** tab opens a **full-screen editor** with 8 buckets (Every Day / Mon–Fri / Saturday / Sunday × Morning / Evening). Each bucket supports: paste a list (one chore per line) to bulk-add, inline edit of name and point value, delete, and moving a chore to another bucket via dropdown or drag-and-drop. Old day-array chores are auto-migrated on load.

## Celebration Triggers

A confetti + message celebration fires when:
- A kid clears **all** their morning chores for the day, or **all** their evening chores (slot-clear). Message like "MORNING · CRUSHED IT!".
- A kid's total points cross a **multiple of 10** (small) or **50** (bigger).
If a slot-clear and a threshold land on the same tap, the slot-clear celebration shows (single pop).

## Reward System (current)

One points total per kid (earned from chores) feeds four independent reward tracks, each with its own baseline so they reset on different clocks:

- **Daily reward** (per kid, repeats): every N points (default 20) a kid earns a daily reward. Fires a celebration and shows a "★ EARNED TODAY" badge on their profile that stays only for that day.
- **Weekly goal** (team meter): both kids must reach X points. On reach: celebrate, then the meter resets (baselines bump to current points).
- **Monthly goal** (team meter): both kids must reach Y points. On reach: celebrate, then resets.
- **Overarching goal** (team meter): both kids reach a big Z. On reach: celebrate. Never resets.

Team meters fill by the kid furthest behind (min) and only complete when every kid passes the threshold. Levels (Untrained → Legendary) are scaled to the Overarching goal. Admin "Rewards" tab now configures all four in one place (the old separate per-kid Rewards and Team tabs were merged). Resetting a kid's points also zeroes their daily/weekly/monthly meters (lifetime mission count is kept).

## Change Log

- **2026-06-18** — Major reward rework. Replaced the single per-kid small/main reward + 4 team rewards with: Daily reward (per kid, repeats every N pts, same-day badge), Weekly + Monthly team meters (reset on reach), Overarching team meter (never resets). Each kid now has per-meter baselines so tracks reset independently. Merged the Rewards and Team admin tabs into one. Re-based levels onto the Overarching goal. Replaced the single Team Power bar with three meters on home and profile.
- **2026-06-18** — Added morning/evening slot-clear celebrations (fires when all chores in a time slot are completed), alongside the existing 10/50 point-threshold celebrations.

- **2026-06-18** — Reworked chores to a group+slot model with a full-screen bulk editor (paste-to-add, inline edit, drag/dropdown move, delete). Added 'Every Day' buckets. Auto-migration from the old day-array model. Replaced the old one-chore-at-a-time form.
- **2026-06-18** — Celebration messages are now editable in Admin → Messages (every-10 and every-50 lists), with no-repeat-until-all-seen cycling. canvas-confetti is bundled inline (works offline). Modal only closes on a deliberate backdrop click.
- **2026-06-18** — Profile upgrades: larger avatar (158px) with kid-editable avatar picker; top-of-profile stats (missions this week, total missions); 6-tier run-based rank system with hex badges + progress to next; sibling "help out" card. Added per-kid mission history (14-day log) and lifetime mission counter that survive point resets.
- **2026-06-18** — Initial planning document created.
- **2026-06-18** — Resolved two open items: (1) Points accumulate toward a "main goal" with no auto-reset; parents reset manually for a new cycle, allowing one kid to surpass a threshold while the other catches up. Added 10-point and 50-point milestones. (2) Combined Power Bar now reflects the actual unlock condition `min(kidA, kidB) / threshold` instead of the summed total. Added admin point-reset capability.
- **2026-06-18** — Clarified reward tiers: the **large reward is the main goal** (cycle finish line), the small tier is an early milestone. Both reset with points at the start of each new cycle.
- **2026-06-18** — Per-kid bookmarkable URLs via `?kid=<name-slug>` (id also accepted; case-insensitive; bad value falls back to home). Admin "Copy link" button per child. Note: slug is derived from the name, so renaming a kid changes their link.
- **2026-06-18** — Full UI overhaul to a sci-fi HUD aesthetic: space grid + scanline background, cyan/magenta neon glow, notched angular panels with corner brackets, Orbitron/Rajdhani fonts, segmented charge-meter power bar, glowing chore checks and operator cards.
- **2026-06-18** — Named the app **Level Up**. Avatars are uploaded square images managed in an admin avatar pool (not emoji). Admin can add/remove children with names; seeded with Ashwin and Naveen. Started building v1 as a single HTML file with localStorage. Favicon/logo to be created.

---

## Outstanding / To Resolve

- **Family rewards vs. cycle resets:** the 4 family rewards currently use the same per-cycle points that reset each cycle. Big-ticket family rewards (mall trip, camping) probably need a separate *lifetime* total that doesn't reset. To be decided.
