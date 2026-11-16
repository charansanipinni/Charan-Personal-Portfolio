# Portfolio project context

Recovered from the repository on 16 November 2026 after the original chat was deleted. The original conversation itself is unavailable. This document preserves the facts and direction recorded in the surviving project files.

## Purpose and audience

Build Charan Sanipinni's personal portfolio for potential freelance clients, collaborators, and people following his creator journey. Lead with AI automation; support it with website collaboration and content creation. Visitors should understand what he does, explore concrete work, and start a conversation.

Core message: **Less busywork. More possibilities.**

Voice: curious, practical, approachable, ambitious. Explain the work in clear language, and use the projects to substantiate the offer.

## Visual direction

Reference: https://plucky-listening-889962.framer.app/

Retain the reference's icy blue atmosphere, oversized typography, hanging portrait badge, spacious composition, and personal character. Create an original portfolio using Charan's own identity, projects, and recommendation. Local Antonio and Inter fonts, ink-colored text, soft blue surfaces, thin rules, and a dark workflow panel form the current visual system.

The badge supports two-axis pointer dragging on mouse and touch, a stretching tether, and a damped bounce on release. Reduced-motion users retain a readable static badge. Mobile layouts prioritize readable copy and stacked project content.

## Grounded content

- Name: Charan Sanipinni.
- Work: AI automation, freelance website collaboration, business growth support, and content creation about personal experience, updates, career guidance, and creator skills.
- The Content Engine: supplied n8n architecture connecting a scheduled trigger and Google Drive videos to AI-generated titles, descriptions, SEO tags, short scripts, YouTube, Slack, and WhatsApp.
- Hidden Muses: supplied daily story discovery architecture with history loading, exclusion lists, AI research, email digest formatting, and no-repeat logging.
- Tatsyana Wade collaboration: supplied website collaboration context and recommendation. Travel coaching and safety website at https://tatsyana.store.
- The project SVGs are illustrations. Workflow walkthroughs are demonstrations of architecture, without live integrations or execution claims.
- Contact and social links are recorded in CONTENT_SOURCES.md and dist/index.html. Preserve those exact destinations unless Charan supplies replacements.

Do not invent metrics, clients, accomplishments, certifications, executions, or testimonials. Consult CONTENT_SOURCES.md for provenance and verification limits.

## Visitor journey

1. Hero: identify Charan and the benefit of his work.
2. Selected projects: filter automation and website work; open detailed case studies.
3. Workflow walkthrough: explore both automation architectures in four steps.
4. Services and process: explain scope and collaboration.
5. About and creator story: introduce the person behind the work.
6. Supplied client recommendation and FAQs.
7. Contact: prepare an email or WhatsApp inquiry, or copy a brief.

The inquiry form has no backend. It prepares text for a visitor-controlled handoff; it does not submit or store inquiries.

## Technical map

- dist/index.html: source HTML, metadata, section content, inquiry dialog.
- dist/styles.css: base design and responsive layout.
- dist/script.js: navigation, filtering, project case studies, dialogs.
- dist/experience.css and dist/experience.js: walkthrough, inquiry handoffs, reading progress, badge interaction, and design refinements.
- dist/assets: supplied portrait, original workflow artwork, local fonts and licenses.
- npm.cmd run dev: Windows local preview at http://127.0.0.1:4173.
- npm.cmd run check: syntax, assets, navigation, content, and inquiry/walkthrough checks.
- npm.cmd run build: static source and interaction validation; dist is the deployable output.
- .openai/hosting.json retains the existing Sites project identity. Preserve its project_id and current audience.

## Continuing the project

Read this file, CONTENT_SOURCES.md, and README.md first. Inspect the current implementation before changing it. Use a review loop: understand the request, implement a focused improvement, check the real result, then refine observed issues. Record material changes and deployment status in README.md. Preserve the existing project rather than creating another Site.


16 November media update: gallery expanded to seven entries, with two supplied website recordings, Tatsyana’s actual hero screenshot and feedback evidence, and two labeled AI automation concepts. Instagram corrected to charan_sanipinni. Consult the newest CONTENT_SOURCES.md and README.md sections for provenance and verification limits.


## Authentic work and focused layout — 16 November 2026

Removed Lead Desk and Inbox Assist from the gallery and case studies. The five supplied projects remain, with the original Content Engine and Hidden Muses screenshots now displayed using CSS framing (source images unchanged). Simplified explanatory maps remain in their case studies. Consolidated Tatsyana’s repeated testimonial cards into one launch quote with her original feedback visible and the launch post linked. No invented speakers or endorsements. Changed all authored branding to Charan Sanipinni; historic source screenshots remain unedited. Folded the duplicate creator section into About, removed the redundant proof strip, and refined responsive spacing, hover transitions, dialog entry, and modal scroll locking with reduced-motion support.
