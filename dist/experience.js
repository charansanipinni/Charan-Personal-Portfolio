// A guided illustration of the supplied workflow architecture. No services run here.
const flowExamples = {
  content: [
    ['A video becomes the starting point.', 'A scheduled workflow looks for video files in Google Drive.', 'INPUT / GOOGLE DRIVE', 'A new video file', 'The same starting point keeps the preparation steps connected.'],
    ['One source. Several useful drafts.', 'AI prepares a title, description, SEO tags, and a short-form script.', 'DRAFTS / AI PREPARATION', 'Title + description + tags + short script', 'Review the drafts for accuracy and tone before publishing.'],
    ['Ready for the publishing step.', 'The workflow connects the prepared material to YouTube.', 'DESTINATION / YOUTUBE', 'Video and publishing metadata', 'Publishing permissions and review rules belong in the final setup.'],
    ['Keep the people in the loop.', 'Slack and WhatsApp nodes connect the workflow to team updates.', 'HANDOFF / NOTIFICATIONS', 'An update in the tools your team uses', 'The workflow reference shows these connections; this demo does not send messages.']
  ],
  stories: [
    ['Start with a little memory.', 'A daily trigger loads the stories already shared.', 'INPUT / STORY HISTORY', 'Previously sent stories', 'A useful research workflow remembers yesterday.'],
    ['Give discovery a clear boundary.', 'An exclusion list guides AI-assisted story discovery toward fresh ideas.', 'RESEARCH / DISCOVERY', 'New story candidates', 'The exclusion list helps keep repeat ideas out of the next digest.'],
    ['Turn research into a readable digest.', 'The selected stories are formatted for an email update.', 'DRAFT / EMAIL DIGEST', 'A concise collection of story ideas', 'Review sources and relevance as part of the production workflow.'],
    ['Send, then remember.', 'The workflow connects email delivery with logging newly shared stories.', 'HANDOFF / EMAIL + LOG', 'A digest and an updated story history', 'This illustrated walkthrough uses sample labels and sends no email.']
  ]
};
let selectedFlow = 'content';
let selectedStep = 0;
function showFlowStep() {
  const [title, description, label, output, note] = flowExamples[selectedFlow][selectedStep];
  document.querySelector('#flow-title').textContent = title;
  document.querySelector('#flow-description').textContent = description;
  document.querySelector('#flow-output-label').textContent = label;
  document.querySelector('#flow-output').textContent = output;
  document.querySelector('#flow-note').textContent = note;
  document.querySelector('#flow-count').textContent = `0${selectedStep + 1} / 04`;
  document.querySelectorAll('[data-flow-step]').forEach(button => {
    button.setAttribute('aria-pressed', String(Number(button.dataset.flowStep) === selectedStep));
  });
  document.querySelector('#flow-next').textContent = selectedStep === 3 ? 'Back to the beginning ↺' : 'Next step →';
}
document.querySelectorAll('[data-flow]').forEach(button => button.addEventListener('click', () => {
  selectedFlow = button.dataset.flow;
  selectedStep = 0;
  document.querySelectorAll('[data-flow]').forEach(option => option.setAttribute('aria-pressed', String(option === button)));
  showFlowStep();
}));
document.querySelectorAll('[data-flow-step]').forEach(button => button.addEventListener('click', () => {
  selectedStep = Number(button.dataset.flowStep);
  showFlowStep();
}));
document.querySelector('#flow-next').addEventListener('click', () => {
  selectedStep = (selectedStep + 1) % 4;
  showFlowStep();
});
showFlowStep();

// Keep the draft on the page; the visitor chooses where to take it.
const briefForm = document.querySelector('#inquiry-form');
const briefStatus = document.querySelector('#form-status');
function prepareBrief() {
  if (!briefForm.reportValidity()) return null;
  const name = briefForm.elements.name.value.trim();
  const brief = briefForm.elements.brief.value.trim();
  if (!name || !brief) {
    briefStatus.textContent = 'Please add your name and a little about your project.';
    (!name ? briefForm.elements.name : briefForm.elements.brief).focus();
    return null;
  }
  const service = briefForm.elements.service.value;
  return { service, body: `Hi Charan,\n\nI’m ${name}. I’d like to discuss ${service.toLowerCase()}.\n\n${brief}\n\nThanks,\n${name}` };
}
briefForm.addEventListener('submit', event => {
  event.preventDefault();
  const draft = prepareBrief();
  if (!draft) return;
  window.location.href = `mailto:charansanipinni96@gmail.com?subject=${encodeURIComponent(`Project inquiry: ${draft.service}`)}&body=${encodeURIComponent(draft.body)}`;
  briefStatus.textContent = 'Your email draft is ready to open. If your email app did not launch, copy the brief or open it in WhatsApp.';
});
document.querySelector('#copy-brief').addEventListener('click', async () => {
  const draft = prepareBrief();
  if (!draft) return;
  try {
    await navigator.clipboard.writeText(draft.body);
    briefStatus.textContent = 'Brief copied. Paste it into your email or messaging app when you’re ready.';
  } catch {
    const fallback = document.querySelector('#brief-fallback');
    fallback.hidden = false;
    fallback.value = draft.body;
    fallback.focus();
    fallback.select();
    briefStatus.textContent = 'Copy is unavailable in this browser. Your brief is selected below; copy it manually.';
  }
});
document.querySelector('#whatsapp-brief').addEventListener('click', () => {
  const draft = prepareBrief();
  if (!draft) return;
  const link = document.createElement('a');
  link.href = `https://wa.me/919394083525?text=${encodeURIComponent(draft.body)}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.click();
  briefStatus.textContent = 'Opening your brief in WhatsApp. Review it there and send when you’re ready.';
});
briefForm.addEventListener('input', () => {
  document.querySelector('#brief-fallback').hidden = true;
  briefStatus.textContent = 'Your brief stays on this page until you choose email, copy, or WhatsApp.';
});

// Subtle scroll depth, without a continuously running animation.
const progress = document.querySelector('.reading-progress');
let progressFrame = false;
function updateProgress() {
  const range = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0})`;
  progressFrame = false;
}
window.addEventListener('scroll', () => {
  if (!progressFrame) { progressFrame = true; requestAnimationFrame(updateProgress); }
}, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

// Pointer coordinates drive translation; a damped spring animates release.
const badge = document.querySelector('.badge-rig');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let badgeFrame = 0, badgePointer = null;
let badgeX = 0, badgeY = 0, badgeVX = 0, badgeVY = 0;
let originX = 0, originY = 0, moveTime = 0, frameTime = 0;
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
function paintBadge() {
  badge.style.setProperty('--badge-x', `${badgeX}px`);
  badge.style.setProperty('--badge-y', `${badgeY}px`);
  badge.style.setProperty('--badge-angle', `${clamp(-badgeX * .035, -14, 14)}deg`);
  document.querySelector('.badge-tether path').setAttribute('d', `M 0 -320 Q ${badgeX * .3} ${-150 + badgeY * .25} ${badgeX} ${badgeY - 10}`);
}
function settleBadge(timestamp) {
  const dt = Number.isFinite(timestamp) && frameTime ? clamp((timestamp-frameTime)/1000, .001, .032) : 1/60;
  frameTime = timestamp;
  for (let i=0; i<2; i++) {
    const step = dt/2;
    badgeVX += (-95*badgeX - 8.5*badgeVX)*step;
    badgeVY += (-120*badgeY - 8*badgeVY)*step;
    badgeX += badgeVX*step; badgeY += badgeVY*step;
  }
  paintBadge();
  if (Math.abs(badgeX)+Math.abs(badgeY)+Math.abs(badgeVX)+Math.abs(badgeVY)>.15) {
    badgeFrame=requestAnimationFrame(settleBadge);
  } else {
    badgeX=badgeY=badgeVX=badgeVY=0; paintBadge(); badgeFrame=0;
  }
}
function releaseBadge(event) {
  if(event.pointerId!==badgePointer) return;
  if(event.type==='pointercancel'||event.type==='lostpointercapture'||event.timeStamp-moveTime>90) badgeVX=badgeVY=0;
  const pointerId=badgePointer; badgePointer=null;
  badge.classList.remove('is-dragging');
  if(badge.hasPointerCapture?.(pointerId)) badge.releasePointerCapture(pointerId);
  cancelAnimationFrame(badgeFrame); frameTime=0;
  badgeFrame=requestAnimationFrame(settleBadge);
}
badge.addEventListener('pointerdown',event=>{
  if(event.button!==0||motionPreference.matches||badgePointer!==null) return;
  badgePointer=event.pointerId; originX=event.clientX-badgeX; originY=event.clientY-badgeY;
  moveTime=event.timeStamp; badgeVX=badgeVY=0;
  cancelAnimationFrame(badgeFrame); badge.classList.add('is-dragging');
  badge.setPointerCapture(event.pointerId); event.preventDefault();
});
badge.addEventListener('pointermove',event=>{
  if(event.pointerId!==badgePointer) return;
  const maxX=Math.min(330,Math.max(40,window.innerWidth/2-badge.offsetWidth/2-20));
  const x=clamp(event.clientX-originX,-maxX,maxX), y=clamp(event.clientY-originY,-100,170);
  const dt=clamp((event.timeStamp-moveTime)/1000,.008,.06);
  badgeVX=clamp((x-badgeX)/dt,-850,850); badgeVY=clamp((y-badgeY)/dt,-850,850);
  badgeX=x; badgeY=y; moveTime=event.timeStamp; paintBadge();
});
for(const type of ['pointerup','pointercancel','lostpointercapture']) badge.addEventListener(type,releaseBadge);
motionPreference.addEventListener('change',()=>{
  cancelAnimationFrame(badgeFrame);
  const pointerId=badgePointer; badgePointer=null;
  if(pointerId!==null&&badge.hasPointerCapture?.(pointerId)) badge.releasePointerCapture(pointerId);
  badgeX=badgeY=badgeVX=badgeVY=0; badge.classList.remove('is-dragging'); paintBadge();
});
window.addEventListener('blur',()=>{
  if(badgePointer!==null) releaseBadge({pointerId:badgePointer,type:'pointercancel'});
});
