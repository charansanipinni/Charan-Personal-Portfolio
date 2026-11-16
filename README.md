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
