import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import assert from 'node:assert/strict';

// Exercise visitor actions without a browser dependency.
class Element {
  constructor(dataset = {}) { this.dataset = dataset; this.listeners = {}; this.attributes = {}; this.style = {}; this.hidden = true; }
  addEventListener(event, fn) { (this.listeners[event] ??= []).push(fn); }
  setAttribute(key, value) { this.attributes[key] = value; }
  async emit(event) { for (const fn of this.listeners[event] ?? []) await fn({ preventDefault() {} }); }
  click() { this.clicked = true; return this.emit('click'); }
  focus() { this.focused = true; }
  select() { this.selected = true; }
}
const nodes = new Map();
const flows = ['content', 'stories'].map(flow => new Element({ flow }));
const steps = [0, 1, 2, 3].map(step => new Element({ flowStep: String(step) }));
const groups = { '[data-flow]': flows, '[data-flow-step]': steps };
const get = selector => { if (!nodes.has(selector)) nodes.set(selector, new Element()); return nodes.get(selector); };
let anchor;
const document = { querySelector: get, querySelectorAll: selector => groups[selector], documentElement: { scrollHeight: 2000 }, createElement: () => (anchor = new Element()) };
const form = get('#inquiry-form');
form.elements = { name: new Element(), brief: new Element(), service: new Element() };
form.elements.name.value = 'Asha & team';
form.elements.brief.value = 'Connect Drive → YouTube. Keep #tags & review first.';
form.elements.service.value = 'AI automation';
form.reportValidity = () => true;
const window = { location: { href: '' }, innerHeight: 800, scrollY: 0, addEventListener() {}, matchMedia: () => ({ matches: false, addEventListener() {} }) };
let copied;
const navigator = { clipboard: { writeText: async text => { copied = text; } } };
runInNewContext(await readFile('dist/experience.js', 'utf8'), { document, window, navigator, requestAnimationFrame: fn => fn() });

assert.match(get('#flow-title').textContent, /video/);
await get('#flow-next').click();
assert.match(get('#flow-output').textContent, /Title/);
assert.equal(steps[1].attributes['aria-pressed'], 'true');
await steps[3].click();
assert.equal(get('#flow-count').textContent, '04 / 04');
await get('#flow-next').click();
assert.equal(get('#flow-count').textContent, '01 / 04');
await flows[1].click();
assert.match(get('#flow-title').textContent, /memory/);
assert.equal(flows[0].attributes['aria-pressed'], 'false');
await steps[3].click();
assert.match(get('#flow-output').textContent, /story history/);
await get('#copy-brief').click();
assert.match(copied, /Asha & team/);
assert.match(copied, /#tags & review first/);
await get('#whatsapp-brief').click();
assert.equal(new URL(anchor.href).searchParams.get('text'), copied);
assert.equal(anchor.clicked, true);
await form.emit('submit');
const email = new URL(window.location.href);
assert.equal(email.searchParams.get('body'), copied);
assert.equal(email.searchParams.get('subject'), 'Project inquiry: AI automation');
navigator.clipboard.writeText = async () => { throw new Error('Clipboard unavailable'); };
await get('#copy-brief').click();
assert.equal(get('#brief-fallback').hidden, false);
assert.equal(get('#brief-fallback').selected, true);
assert.equal(get('#brief-fallback').value, copied);
await form.emit('input');
assert.equal(get('#brief-fallback').hidden, true);
form.elements.name.value = '   ';
anchor = undefined;
await get('#whatsapp-brief').click();
assert.equal(anchor, undefined, 'Whitespace-only input must not open WhatsApp');
assert.equal(form.elements.name.focused, true);
assert.match(get('#form-status').textContent, /Please add/);
console.log('Verified workflow selection, step navigation, email and WhatsApp encoding, clipboard fallback, and blank-input validation.');
