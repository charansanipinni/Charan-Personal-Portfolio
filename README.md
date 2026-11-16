# Charan Sanipinni — Personal Portfolio

A responsive portfolio centered on AI automation, with website collaboration and content creation. Inspired by the icy blue palette, expressive typography, and hanging identity badge of the supplied Framer reference, with an original implementation and content.

## Run locally

Requires Node.js 18 or later. No dependencies or build step are needed.

```sh
npm run dev
```

Open http://127.0.0.1:4173. Run `npm run check` to verify JavaScript syntax, local assets, navigation targets, and project/contact content. The deployable static site is in `dist/`.

## Features

- Interactive, four-step walkthroughs of both automation projects
- Copyable inquiry briefs with a clipboard fallback and WhatsApp handoff
- Responsive desktop and mobile navigation
- Custom hanging identity badge with Charan’s supplied portrait
- Filterable project gallery and accessible native dialog case studies
- Three service areas and a clear collaboration process
- A real testimonial excerpt from supplied Tatsyana Wade screenshots
- Native FAQ accordions
- Email brief composer and direct WhatsApp contact; no hidden form submission or backend
- Local fonts, no analytics, no third-party scripts, reduced-motion support, keyboard focus states

## Editing

- `dist/experience.js` and `dist/experience.css`: workflow walkthroughs and inquiry enhancements
- `dist/index.html`: page copy, social links, contact details, and section structure
- `dist/styles.css`: visual design and responsive layouts
- `dist/script.js`: case-study data, gallery filtering, dialogs, and email composition
- `dist/assets/`: portrait, original project illustration assets, fonts, and favicon
- `.openai/hosting.json`: Sites identity and static output directory
- `CONTENT_SOURCES.md`: editorial provenance and verification limits

The inquiry form opens a prepared message in the visitor’s email app. It does not send mail or store personal data. WhatsApp is an alternative. Connecting a submission service later requires a server endpoint and appropriate privacy copy.

## Deployment

Publish the `dist/` folder on any static hosting service. The included Sites manifest points to the same directory. No environment variables or secrets are required. If moving to another domain, update the Open Graph URL and image URL in `dist/index.html`.

## Content integrity

The two automation projects come from user-provided workflow references. Project artworks are original illustrations, not live execution evidence or literal website screenshots. Tatsyana’s quote is excerpted from the supplied recommendation, without invented outcomes. There are no fabricated clients, testimonials, certifications, audience metrics, or revenue claims.

## Recovery and design review - 16 November 2026

The original conversation was unavailable. Recovered the project direction from this repository and reviewed the supplied Framer reference and the original local portfolio in Comet. Read `PROJECT_CONTEXT.md` to continue the project across future chats.

This pass sharpens the automation-builder positioning, explains the Content Engine more concretely, adds explicit project exploration controls, improves mobile body text, and adds a restrained desktop drag-and-spring interaction to the hanging identity badge. Touch and reduced-motion visitors retain the static badge.

Validation: `npm.cmd run check` and `npm.cmd run build` pass, including local resources, section targets, project content, walkthrough selection, inquiry encoding, clipboard fallback, and blank-input validation. Local HTTP returned 200. The original desktop page was visually reviewed; a second browser review of the final changes could not complete because both browser windows became minimized and the available UI tool could not restore them. Final desktop interaction and mobile visual QA remain incomplete.

The existing owner-private Site remains at https://charan-sanipinni-portfolio.springybuddy2.chatgpt.site. These local refinements have not been deployed there. The requested source repository is https://github.com/charansanipinni/Charan-Personal-Portfolio. GitHub stores the complete static site and its source documentation; the local preview runs at http://127.0.0.1:4173.

On Windows, use `npm.cmd run dev` if PowerShell blocks the npm.ps1 wrapper. The reviewed working project is this directory. The existing publishing checkout is `../portfolio-publish/.sites-checkout`; synchronize the final local source into it only after opening the repository through the Sites helper.


## Media and interaction update — 16 November 2026

Corrected both Instagram links. Replaced the rotation-only badge with direct two-axis dragging and a damped spring release; the strap stretches from a fixed anchor, touch dragging is supported, cancellation is handled, and reduced-motion users get a static card.

The gallery now contains seven entries: two supplied automation workflows, Tatsyana’s website, Scitisense Futurize, Akbar’s portfolio, and two explicitly labeled automation concepts (Lead Desk and Inbox Assist). Added actual website hero previews, two optimized silent video walkthroughs with native controls, direct website links, richer case studies, and original client-feedback screenshots. Extra testimonial excerpts all retain Tatsyana’s attribution. No new client identities or fabricated endorsements were introduced.

Validation: `npm.cmd run check` passes, covering all 43 page buttons, 21 project triggers, filters, links, contact handoffs, media controls and pause-on-close, touch and mouse direction, spring overshoot/settling, cancellation, and reduced motion. `node scripts/check-media-server.mjs` checks HTTP delivery, MIME types and MP4 byte-range seeking. Live visual review remains unavailable because the browser host is unavailable and Comet access was denied by the computer-use tool. Responsive styles have been implemented but require a final visual check in a browser.

See `CONTENT_SOURCES.md` and `IMAGE_PROMPTS.md` for asset provenance and concept labels. The preview server supports WebP, MP4, HEAD and range requests. Run `npm.cmd run dev` for local preview.

Deployment verified: the media and interaction update is published at https://charan-sanipinni-portfolio.springybuddy2.chatgpt.site with the existing owner-only audience. Published source commit: 996410553a8e411f3ca5edb9df71400e78c1b8ac. Native Sites deployment returned succeeded on 16 November 2026. The historical recovery section above describes the earlier deployment state. This status note was added locally after deployment.



## Authentic work and focused layout — 16 November 2026

Removed Lead Desk and Inbox Assist from the gallery and case studies. The five supplied projects remain, with the original Content Engine and Hidden Muses screenshots now displayed using CSS framing (source images unchanged). Simplified explanatory maps remain in their case studies. Consolidated Tatsyana’s repeated testimonial cards into one launch quote with her original feedback visible and the launch post linked. No invented speakers or endorsements. Changed all authored branding to Charan Sanipinni; historic source screenshots remain unedited. Folded the duplicate creator section into About, removed the redundant proof strip, and refined responsive spacing, hover transitions, dialog entry, and modal scroll locking with reduced-motion support.

Validation for this revision: npm run check passes for all five projects, navigation, dialogs, contact controls, workflow walkthroughs, and badge motion. Local HTTP checks pass for JPEG/WebP images and both seekable MP4 recordings. Browser visual QA remains unverified: browser access host unavailable and Comet access denied.
