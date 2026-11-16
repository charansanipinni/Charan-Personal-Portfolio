import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { JSDOM, VirtualConsole } from 'jsdom';

// Load the real page and scripts. Only browser/OS boundaries are simulated:
// dialogs, media queries, frame scheduling, clipboard, and outbound navigation.
const errors = [];
const virtualConsole = new VirtualConsole();
virtualConsole.on('jsdomError', error => {
  if (!error.message.includes('navigation')) errors.push(error);
});
const dom = new JSDOM(await readFile('dist/index.html', 'utf8'), {
  url: 'http://127.0.0.1:4173/', runScripts: 'outside-only', virtualConsole
});
const { window } = dom;
const { document } = window;
const media = new Map();
window.matchMedia = query => {
  if (!media.has(query)) {
    const value = new window.EventTarget();
    value.matches = query.includes('pointer: fine');
    media.set(query, value);
  }
  return media.get(query);
};
const frames = new Map();
let frameId = 0;
window.requestAnimationFrame = callback => { frames.set(++frameId, callback); return frameId; };
window.cancelAnimationFrame = id => frames.delete(id);
const drainFrames = () => {
  let count = 0;
  while (frames.size && count++ < 500) {
    const batch = [...frames.values()]; frames.clear(); batch.forEach(callback => callback());
  }
  assert.equal(frames.size, 0, 'Badge must settle without a perpetual animation');
};
window.HTMLMediaElement.prototype.pause = function () { this.dataset.paused = 'true'; };
window.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
window.HTMLDialogElement.prototype.close = function () { this.open = false; this.dispatchEvent(new window.Event('close')); };
window.HTMLElement.prototype.setPointerCapture = function () {};
let copied = '';
Object.defineProperty(window.navigator, 'clipboard', { value: { writeText: async text => { copied = text; } }, configurable: true });
const destinations = [];
const recordLink = event => {
  const anchor = event.target.closest?.('a');
  if (anchor) { destinations.push(anchor.href); event.preventDefault(); }
};
document.addEventListener('click', recordLink);
// Detached programmatically-created anchors also need an outbound boundary.
const anchorClick = window.HTMLAnchorElement.prototype.click;
window.HTMLAnchorElement.prototype.click = function () {
  if (!this.isConnected) { destinations.push(this.href); return; }
  anchorClick.call(this);
};
for (const path of ['dist/script.js', 'dist/experience.js']) window.eval(await readFile(path, 'utf8'));
const $ = selector => { const element = document.querySelector(selector); assert(element, selector); return element; };
const $$ = selector => [...document.querySelectorAll(selector)];
const checked = new Set();
const click = element => { checked.add(element); element.click(); };
const tick = () => new Promise(resolve => setTimeout(resolve, 0));

// Every section link resolves, including the keyboard skip link and both wordmarks.
for (const link of $$('a[href^="#"]')) {
  assert(document.getElementById(link.hash.slice(1)), `Missing anchor ${link.hash}`);
  click(link);
}
const menu = $('.menu-toggle');
click(menu); assert.equal($('#mobile-nav').hidden, false);
click(menu); assert.equal($('#mobile-nav').hidden, true);
for (const link of $$('#mobile-nav a')) {
  click(menu); click(link); assert.equal($('#mobile-nav').hidden, true);
}
click(menu);
document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape' }));
assert.equal($('#mobile-nav').hidden, true);
assert.equal(document.activeElement, menu, 'Escape returns keyboard focus to the menu toggle');
click(menu);
const desktop = media.get('(min-width: 761px)'); desktop.matches = true;
const desktopChange = new window.Event('change');
Object.assign(desktopChange, { matches: true });
desktop.dispatchEvent(desktopChange);
assert.equal($('#mobile-nav').hidden, true);

for (const filter of $$('[data-filter]')) {
  click(filter);
  const expected = { all: 5, automation: 2, website: 3 }[filter.dataset.filter];
  assert.equal($$('[data-category]').filter(card => !card.hidden).length, expected);
  assert.equal(filter.getAttribute('aria-pressed'), 'true');
  assert.equal($$('[data-filter][aria-pressed="true"]').length, 1);
  assert.match($('#filter-status').textContent, new RegExp(`^${expected} project`));
}
click($('[data-filter="all"]'));
const projectDialog = $('#project-dialog');
const inquiry = $('#inquiry-dialog');
for (const trigger of $$('[data-project]')) {
  click(trigger);
  assert(projectDialog.open);
  assert.equal($('#project-dialog-title').textContent, {
    youtube: 'The Content Engine', muses: 'Hidden Muses', travel: 'A safer way to explore', scitisense: 'Scitisense Futurize', akbar: 'Akbar’s digital home'
  }[trigger.dataset.project]);
  assert.equal($$('#project-detail li').length, 3);
  const contact = document.querySelector('#project-detail button');
  if (contact) {
    click(contact); assert.equal(projectDialog.open, false); assert(inquiry.open);
    assert.equal($('#service').value, 'AI automation');
    click($('#inquiry-dialog [data-close]'));
  } else {
    const link = $('#project-detail a');
    assert.equal(link.href, {travel:'https://tatsyana.store/',scitisense:'https://www.scitisensefuturize.in/',akbar:'https://akbar-teal.vercel.app/'}[trigger.dataset.project]); click(link);
    const video=document.querySelector('#project-detail video');
    if(video){ assert.equal(video.preload,'none'); assert(video.controls); assert(video.playsInline); }
    const recording=document.querySelector('#project-detail video');
    click($('#project-dialog [data-close]'));
    if(recording) assert.equal(recording.dataset.paused,'true','Closing the project stops video playback');
  }
}
for (const trigger of $$('[data-inquiry]')) {
  $('#brief-fallback').hidden = false;
  $('#form-status').textContent = 'Stale confirmation';
  click(trigger); assert(inquiry.open);
  if (trigger.dataset.service) assert.equal($('#service').value, trigger.dataset.service);
  assert.equal($('#brief-fallback').hidden, true);
  assert.match($('#form-status').textContent, /stays on this page/);
  click($('#inquiry-dialog [data-close]')); assert.equal(inquiry.open, false);
}
// Backdrop clicks close; clicks within the dialog bounds do not.
for (const dialog of $$('dialog')) {
  dialog.getBoundingClientRect = () => ({ left: 100, right: 500, top: 100, bottom: 600 });
  dialog.showModal();
  dialog.dispatchEvent(new window.MouseEvent('click', { clientX: 200, clientY: 200 }));
  assert(dialog.open);
  dialog.dispatchEvent(new window.MouseEvent('click', { clientX: 10, clientY: 10 }));
  assert.equal(dialog.open, false);
}

for (const picker of $$('[data-flow]')) {
  click(picker); assert.equal(picker.getAttribute('aria-pressed'), 'true');
  assert.equal($$('[data-flow][aria-pressed="true"]').length, 1);
  for (const step of $$('[data-flow-step]')) {
    click(step);
    assert.equal($('#flow-count').textContent, `0${Number(step.dataset.flowStep) + 1} / 04`);
    assert.equal($$('[data-flow-step][aria-pressed="true"]').length, 1);
    assert($('#flow-title').textContent && $('#flow-output').textContent);
  }
  click($('#flow-next')); assert.equal($('#flow-count').textContent, '01 / 04');
  for (let step = 2; step <= 4; step++) {
    click($('#flow-next')); assert.equal($('#flow-count').textContent, `0${step} / 04`);
  }
}
for (const summary of $$('.faq-list summary')) {
  click(summary); assert(summary.parentElement.open);
  click(summary); assert.equal(summary.parentElement.open, false);
}

click($('[data-inquiry]'));
const form = $('#inquiry-form');
$('#name').value = ''; $('#brief').value = '';
let before = destinations.length;
click($('#copy-brief')); await tick(); assert.equal(copied, '');
click($('#whatsapp-brief')); assert.equal(destinations.length, before);
click($('#inquiry-form [type="submit"]')); assert.equal(form.checkValidity(), false);
$('#name').value = 'Asha & team'; $('#brief').value = 'Connect Drive to YouTube; keep #tags & review first.';
for (const option of $$('#service option')) {
  $('#service').value = option.value;
  click($('#copy-brief')); await tick();
  assert(copied.includes('Asha & team') && copied.includes(option.value.toLowerCase()));
  click($('#whatsapp-brief'));
  const url = new URL(destinations.at(-1));
  assert.equal(url.origin + url.pathname, 'https://wa.me/919394083525');
  assert.equal(url.searchParams.get('text'), copied);
}
click($('#inquiry-form [type="submit"]'));
assert.match($('#form-status').textContent, /email draft is ready/);
window.navigator.clipboard.writeText = async () => { throw new Error('Unavailable'); };
click($('#copy-brief')); await tick();
assert.equal($('#brief-fallback').hidden, false);
assert.equal($('#brief-fallback').value, copied);
assert.equal($('#brief-fallback').selectionEnd, copied.length);
$('#brief').dispatchEvent(new window.Event('input', { bubbles: true }));
assert.equal($('#brief-fallback').hidden, true);
for (const field of [$('#name'), $('#brief')]) {
  const original = field.value; field.value = '   '; before = destinations.length;
  click($('#whatsapp-brief')); assert.equal(destinations.length, before);
  assert.equal(document.activeElement, field); field.value = original;
}
click($('#inquiry-dialog [data-close]'));

// Validate every external destination without sending messages or opening accounts.
for (const link of $$('a:not([href^="#"])')) {
  const url = new URL(link.href);
  const localAsset = url.origin === window.location.origin && url.pathname.startsWith('/assets/');
  assert(localAsset || ['https:', 'mailto:'].includes(url.protocol), link.href);
  if (link.target === '_blank') assert(link.relList.contains('noopener'));
  click(link); assert.equal(destinations.at(-1), link.href);
}

const badge = $('.badge-rig');
const pointer = (type, x, y=100, id=1, pointerType='mouse') => {
  const event = new window.Event(type);
  Object.assign(event, { pointerId:id, clientX:x, clientY:y, button:0, pointerType }); badge.dispatchEvent(event);
};
pointer('pointerdown',100,100); pointer('pointermove',220,190);
assert.equal(badge.style.getPropertyValue('--badge-x'),'120px','A right drag moves right');
assert.equal(badge.style.getPropertyValue('--badge-y'),'90px','A downward drag moves down');
pointer('pointermove',500,500,2);
assert.equal(badge.style.getPropertyValue('--badge-x'),'120px','A second pointer cannot hijack the drag');
pointer('pointerup',220,190);
let bounced=false, count=0;
while(frames.size && count++<500){
  const batch=[...frames.values()]; frames.clear(); batch.forEach(fn=>fn());
  if(parseFloat(badge.style.getPropertyValue('--badge-y'))<0) bounced=true;
}
assert(bounced,'A stretched card overshoots its rest position on release');
assert.equal(frames.size,0,'The spring settles without a perpetual animation');
assert.equal(badge.style.getPropertyValue('--badge-x'),'0px');
assert.equal(badge.style.getPropertyValue('--badge-y'),'0px');
assert.equal(badge.classList.contains('is-dragging'),false);
pointer('pointerdown',200,200,3,'touch'); pointer('pointermove',130,150,3,'touch');
assert.equal(badge.style.getPropertyValue('--badge-x'),'-70px','A touch drag moves left');
assert.equal(badge.style.getPropertyValue('--badge-y'),'-50px','A touch drag moves up');
pointer('pointercancel',130,150,3,'touch'); drainFrames();
assert.equal(badge.style.getPropertyValue('--badge-y'),'0px');
pointer('pointerdown',100,100); pointer('pointermove',160,160);
const reduced=media.get('(prefers-reduced-motion: reduce)');
reduced.matches=true; reduced.dispatchEvent(new window.Event('change'));
pointer('pointerdown',100,100); pointer('pointermove',220,220);
assert.equal(badge.classList.contains('is-dragging'),false);
assert.equal(badge.style.getPropertyValue('--badge-x'),'0px');
assert.equal(badge.style.getPropertyValue('--badge-y'),'0px');
for(const details of $$('.testimonial-evidence')){
  click(details.querySelector('summary')); assert(details.open); assert.equal(details.querySelectorAll('img').length,2);
}

const untested = $$('button').filter(button => !checked.has(button));
assert.deepEqual(untested.map(button => button.outerHTML), [], 'Every rendered button must be exercised');
assert.equal(document.querySelector('.monogram'), null);
assert.deepEqual(errors, [], 'Scripts must execute without DOM errors');
console.log(`Verified all ${$$('button').length} page buttons, all ${$$('[data-project]').length} project triggers, both workflows, 5 FAQs, mobile navigation, form validation, contact handoffs, every link destination, and badge motion. Native dialog focus and responsive layout require browser QA.`);
dom.window.close();
