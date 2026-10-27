/* PRECISION DIGITAL MARKETING | INTERACTIVE GROWTH ENGINE v2
   No external libraries required. 3D depth uses native CSS transforms.
   Dashboard numbers are campaign examples, not live analytics. */
(() => {
  'use strict';
  function init() {
    const dashboard = document.getElementById('pdm-dashboard');
    const stage = document.getElementById('pdm-stage');
    if (!dashboard || !stage) return;
    const byId = id => document.getElementById(id);
    const modes = {
      ads: { title: 'Paid ads that bring leads', icon: '↗', label: 'LEADS GENERATED', value: '51', detail: 'In under 24 hours', sideLabel: 'COST PER LEAD', sideValue: '$0.50', sideDetail: 'Villa Fernando campaign', chart: 'LEAD ACTIVITY', event: 'New lead captured', desc: 'Campaign → landing page → inquiry', bars: [23,36,30,53,49,72,66,91,82,100] },
      sites: { title: 'Websites built to convert', icon: '▣', label: 'THE OBJECTIVE', value: '24/7', detail: 'Your digital storefront', sideLabel: 'DESIGNED FOR', sideValue: 'LEADS', sideDetail: 'Clear calls to action', chart: 'VISITOR JOURNEY / ILLUSTRATION', event: 'Inquiry form ready', desc: 'Visit → trust → contact', bars: [29,40,33,55,52,64,68,75,83,92] },
      auto: { title: 'Follow-up that never sleeps', icon: '⚡', label: 'AVAILABILITY', value: '24/7', detail: 'Automated workflows', sideLabel: 'RESPONSE', sideValue: 'FAST', sideDetail: 'Route leads automatically', chart: 'WORKFLOW ACTIVITY / ILLUSTRATION', event: 'Lead follow-up triggered', desc: 'Inquiry → message → booking', bars: [40,46,54,49,67,60,77,72,88,96] }
    };
    const tabs = [...document.querySelectorAll('.pdm-tab')];
    const bars = [...document.querySelectorAll('#pdm-bars span')];
    function selectMode(name, focus) {
      const data = modes[name];
      if (!data) return;
      tabs.forEach(tab => {
        const active = tab.dataset.mode === name;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        if (active && focus) tab.focus();
      });
      byId('pdm-panel').setAttribute('aria-labelledby', 'pdm-tab-' + name);
      const fields = {
        'pdm-panel-heading': data.title, 'pdm-panel-icon': data.icon,
        'pdm-metric-label': data.label, 'pdm-metric-value': data.value,
        'pdm-metric-detail': data.detail, 'pdm-side-label': data.sideLabel,
        'pdm-side-value': data.sideValue, 'pdm-side-detail': data.sideDetail,
        'pdm-chart-label': data.chart, 'pdm-event-title': data.event,
        'pdm-event-desc': data.desc
      };
      Object.entries(fields).forEach(([id, value]) => { const el = byId(id); if (el) el.textContent = value; });
      bars.forEach((bar, i) => bar.style.setProperty('--h', data.bars[i] + '%'));
    }
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => selectMode(tab.dataset.mode, false));
      tab.addEventListener('keydown', event => {
        if (!['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) return;
        event.preventDefault();
        let next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (i + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        selectMode(tabs[next].dataset.mode, true);
      });
    });
    const steps = [
      ['STEP 01 / ATTRACT','Get in front of buyers, not browsers.','Targeted Meta and Google campaigns reach people who are most likely to need your service.'],
      ['STEP 02 / CONVERT','Give every visitor a clear next step.','Fast, focused landing pages explain your offer and make contacting you simple.'],
      ['STEP 03 / FOLLOW UP','Keep leads moving automatically.','Connected messaging and lead-routing workflows help your team respond without unnecessary delays.'],
      ['STEP 04 / BOOK','Turn conversations into opportunities.','A frictionless booking process helps qualified prospects take the next step with your business.']
    ];
    document.querySelectorAll('.pdm-funnel-step').forEach(button => {
      button.addEventListener('click', () => {
        const index = Number(button.dataset.step);
        const data = steps[index];
        if (!data) return;
        document.querySelectorAll('.pdm-funnel-step').forEach(el => {
          const selected = el === button;
          el.classList.toggle('is-selected', selected);
          el.setAttribute('aria-pressed', String(selected));
        });
        byId('pdm-detail-tag').textContent = data[0];
        byId('pdm-detail-title').textContent = data[1];
        byId('pdm-detail-copy').textContent = data[2];
      });
    });
    // 3D mouse tracking: noticeable but restrained. Disabled for touch/reduced motion.
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');
    let frame = 0, targetX = -5, targetY = -9, x = -5, y = -9;
    function tick() {
      frame = 0;
      x += (targetX - x) * .2;
      y += (targetY - y) * .2;
      dashboard.style.setProperty('--rx', x.toFixed(2) + 'deg');
      dashboard.style.setProperty('--ry', y.toFixed(2) + 'deg');
      if (Math.abs(targetX - x) > .03 || Math.abs(targetY - y) > .03) frame = requestAnimationFrame(tick);
    }
    function move(event) {
      if (motion.matches || !finePointer.matches || window.innerWidth <= 640) return;
      const r = stage.getBoundingClientRect();
      const nx = Math.max(-1, Math.min(1, (event.clientX - r.left) / r.width * 2 - 1));
      const ny = Math.max(-1, Math.min(1, (event.clientY - r.top) / r.height * 2 - 1));
      targetX = -ny * 12;
      targetY = nx * 15;
      if (!frame) frame = requestAnimationFrame(tick);
    }
    function reset() { targetX = -5; targetY = -9; if (!frame) frame = requestAnimationFrame(tick); }
    stage.addEventListener('pointermove', move, { passive: true });
    stage.addEventListener('pointerleave', reset);
    if (motion.matches || !finePointer.matches) { targetX = 0; targetY = 0; reset(); }
    console.info('PDM interactive growth dashboard ready.');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

/* PRECISION 2.0: Interactive service preview */
(function(){
const tabs=[...document.querySelectorAll('[data-p2-service]')];
const content={web:{tag:'WEB EXPERIENCE',headline:'TURN CLICKS\nINTO CLIENTS',button:'GET STARTED →',float:'BUILT TO CONVERT',label:'CONVERSION-FOCUSED WEB DESIGN',desc:'Fast, clear pages built to make the next step obvious.'},ads:{tag:'CAMPAIGN STUDIO',headline:'REACH THE RIGHT\nCUSTOMERS',button:'LAUNCH CAMPAIGN ↗',float:'LEAD FLOW ACTIVE',label:'PAID ADVERTISING',desc:'Focused campaigns that connect real demand to your business.'},auto:{tag:'FOLLOW-UP SYSTEM',headline:'EVERY LEAD.\nFOLLOWED UP.',button:'BOOK A CALL →',float:'WORKFLOW ACTIVE',label:'LEAD AUTOMATION',desc:'Smart follow-up that keeps conversations moving after the first click.'}};
const targets={tag:document.getElementById('p2-preview-tag'),headline:document.getElementById('p2-graphic-headline'),button:document.getElementById('p2-graphic-button'),float:document.getElementById('p2-graphic-float'),label:document.getElementById('p2-service-label'),desc:document.getElementById('p2-service-desc')};
if(!tabs.length||Object.values(targets).some(x=>!x))return;
function select(tab){const d=content[tab.dataset.p2Service];if(!d)return;tabs.forEach(t=>{const selected=t===tab;t.classList.toggle('is-active',selected);t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1});targets.tag.textContent=d.tag;targets.headline.textContent=d.headline;const accent=document.createElement('span');accent.textContent='.';targets.headline.appendChild(accent);targets.button.textContent=d.button;targets.float.textContent=d.float;targets.label.textContent=d.label;targets.desc.textContent=d.desc;}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>select(tab));tab.addEventListener('keydown',e=>{if(!['ArrowDown','ArrowUp','ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowDown'||e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[next].focus();select(tabs[next]);});});
})();
