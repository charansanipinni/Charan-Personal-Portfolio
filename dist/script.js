const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  mobileNav.hidden = true;
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  mobileNav.hidden = !open;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const projectData = {
  youtube: {
    category: 'AI AUTOMATION / CONTENT OPERATIONS', title: 'The Content Engine', image: 'youtube-workflow.svg', alt: 'Illustration of the YouTube content automation pipeline',
    intro: 'A multi-step n8n workflow that connects video files with AI-assisted content preparation, publishing, and team updates. Built around the repetitive work that sits between making a video and getting it ready to share.',
    challenge: 'Content creation involves more than recording. Titles, descriptions, metadata, short-form ideas, and publishing updates all need to stay connected.',
    steps: ['Start with a scheduled trigger and videos from Google Drive.', 'Prepare a title, description, SEO tags, and a short-form script with AI.', 'Connect the prepared content to YouTube and send Slack or WhatsApp updates.'],
    note: 'Based on my supplied n8n workflow reference. This is an architectural overview; no live execution results or measured performance claims are implied.'
  },
  muses: {
    category: 'AI AUTOMATION / RESEARCH', title: 'Hidden Muses', image: 'hidden-muses.svg', alt: 'Illustration of the Hidden Muses daily story discovery workflow',
    intro: 'An automated story-hunting workflow designed to discover underexplored ideas, turn them into an email digest, and remember what has already been shared.',
    challenge: 'Finding interesting stories can become a daily research loop. A useful digest needs fresh material and a reliable way to avoid sending the same ideas again.',
    steps: ['Load previously sent stories on a daily schedule.', 'Build an exclusion list before AI-assisted story discovery.', 'Format the digest, email it, and log the new stories for the next run.'],
    note: 'Based on my supplied “Hidden Muses — Underhyped Story Hunter” workflow reference. The visual is a simplified redraw of its structure.'
  },
  travel: {
    category: 'CLIENT COLLABORATION / WEBSITE', title: 'A safer way to explore', image: 'travel-platform.svg', alt: 'Illustrative travel coaching website presentation',
    intro: 'A website collaboration with Tatsyana Wade, a solo travel coach and content creator. Her platform brings together travel safety guidance, a free guide, and a way for visitors to connect with her.',
    challenge: 'Translate a creator’s existing vision into a clear online home that introduces her work and helps visitors find the next step.',
    steps: ['Collaborate around the client’s vision for her new website.', 'Support a digital presence for travel safety and coaching.', 'Bring the project to launch, as shared in Tatsyana’s public recommendation.'],
    note: 'The accompanying artwork is an illustrative project visualization, not a screenshot of the live website. Project context and the recommendation were supplied by Charan.',
    url: 'https://tatsyana.store', linkText: 'Visit Tatsyana’s website'
  }
};
const projectDialog = document.querySelector('#project-dialog');
const projectDetail = document.querySelector('#project-detail');
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projectData[button.dataset.project];
  projectDetail.replaceChildren();
  const img = document.createElement('img');
  img.src = `assets/${project.image}`; img.alt = project.alt; img.width = 1200; img.height = 760;
  const content = document.createElement('div'); content.className = 'project-detail-copy';
  const category = document.createElement('p'); category.className = 'eyebrow'; category.textContent = project.category;
  const title = document.createElement('h2'); title.id = 'project-dialog-title'; title.textContent = project.title;
  const intro = document.createElement('p'); intro.textContent = project.intro;
  const columns = document.createElement('div'); columns.className = 'project-detail-columns';
  const challenge = document.createElement('div');
  const challengeTitle = document.createElement('h3'); challengeTitle.textContent = 'The idea';
  const challengeText = document.createElement('p'); challengeText.textContent = project.challenge;
  challenge.append(challengeTitle, challengeText);
  const approach = document.createElement('div');
  const approachTitle = document.createElement('h3'); approachTitle.textContent = 'The approach';
  const steps = document.createElement('ul');
  project.steps.forEach(text => { const item = document.createElement('li'); item.textContent = text; steps.append(item); });
  approach.append(approachTitle, steps); columns.append(challenge, approach);
  const note = document.createElement('p'); note.className = 'project-detail-note'; note.textContent = project.note;
  content.append(category, title, intro, columns, note);
  if (project.url) {
    const link = document.createElement('a'); link.className = 'button button-dark'; link.href = project.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = `${project.linkText} ↗`; content.append(link);
  } else {
    const contact = document.createElement('button'); contact.className = 'button button-dark'; contact.textContent = 'Let’s build your workflow ↗'; contact.addEventListener('click', () => { projectDialog.close(); openInquiry('AI automation'); }); content.append(contact);
  }
  projectDetail.append(img, content); projectDialog.showModal(); projectDialog.scrollTop = 0;
}));

document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(option => { const selected = option === button; option.classList.toggle('active', selected); option.setAttribute('aria-pressed', String(selected)); });
  let visible = 0;
  document.querySelectorAll('[data-category]').forEach(card => { card.hidden = filter !== 'all' && card.dataset.category !== filter; if (!card.hidden) visible++; });
  document.querySelector('#filter-status').textContent = `${visible} ${visible === 1 ? 'project' : 'projects'} shown.`;
}));

const inquiryDialog = document.querySelector('#inquiry-dialog');
function openInquiry(service) {
  if (service) document.querySelector('#service').value = service;
  closeMenu();
  inquiryDialog.showModal(); inquiryDialog.scrollTop = 0;
}
document.querySelectorAll('[data-inquiry]').forEach(button => button.addEventListener('click', () => openInquiry(button.dataset.service)));
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target !== dialog) return; const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close(); });
});
document.querySelector('#year').textContent = new Date().getFullYear();
