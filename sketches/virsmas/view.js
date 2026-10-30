'use strict';
(()=>{
const canvas=document.querySelector('canvas'),ctx=canvas.getContext('2d'),pause=document.querySelector('#pause'),select=document.querySelector('#study');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');let paused=reduced.matches,seed=4101,model=new Virsmas.Field(),last=0,acc=0,raf=0,held=null;
const descriptions={weave:'Woven currents / Each passage invites another. Slow accumulation eventually repels the movement that built it. Channels gather, persist and lose their hold.',rift:'Restless territories / Two kinds of movement reinforce their own paths and avoid one another’s traces. Shared exhaustion loosens their boundaries. Separation is temporary.'};
function labels(){pause.textContent=paused?'Resume':'Pause';pause.setAttribute('aria-pressed',String(paused));document.querySelector('#state').textContent=paused?'Paused':'Becoming';document.querySelector('#description').textContent=descriptions[model.mode];document.querySelector('#seedLabel').textContent='Beginning '+seed;}
function resize(){const rect=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(rect.width*dpr);canvas.height=canvas.width;draw();}
function draw(){const size=canvas.width,s=size/128;ctx.fillStyle='#000';ctx.fillRect(0,0,size,size);ctx.fillStyle='#fff';ctx.strokeStyle='#fff';
 // Sparse square field traces are state, not a fading screen buffer.
 for(let y=1;y<128;y+=2)for(let x=1;x<128;x+=2){const i=y*128+x,v=model.a[i]+model.b[i];if(v>.25){const q=Math.min(.38,(v-.25)*.18)*s;ctx.fillRect(x*s,y*s,q,q);}}
 ctx.lineWidth=Math.max(1,size/640);ctx.beginPath();
 for(const p of model.p){const x=p.x*s,y=p.y*s;if(model.mode==='rift'&&p.side){const q=Math.max(size/400,.46*s);ctx.fillRect(x-q/2,y-q/2,q,q);}else{const dx=Math.cos(p.h)*1.05*s,dy=Math.sin(p.h)*1.05*s;ctx.moveTo(x-dx/2,y-dy/2);ctx.lineTo(x+dx/2,y+dy/2);}}
 ctx.stroke();
}
function frame(t){raf=0;if(!paused&&!document.hidden){if(last)acc+=Math.min(t-last,80);last=t;let n=0;while(acc>=1000/60&&n<5){model.step();acc-=1000/60;n++;}draw();}else last=0;schedule();}
function schedule(){if(!raf&&!document.hidden&&!paused)raf=requestAnimationFrame(frame);}
function setPaused(v){paused=v;last=0;acc=0;held=null;labels();if(paused){cancelAnimationFrame(raf);raf=0;}else schedule();}
function start(){model=new Virsmas.Field(select.value,seed);last=0;acc=0;held=null;labels();draw();schedule();}
function disturb(e){if(paused)return;const r=canvas.getBoundingClientRect();model.disturb(Math.max(0,Math.min(127.99,(e.clientX-r.left)/r.width*128)),Math.max(0,Math.min(127.99,(e.clientY-r.top)/r.height*128)));}
canvas.addEventListener('pointerdown',e=>{if(held!==null)return;held=e.pointerId;canvas.setPointerCapture(e.pointerId);disturb(e);});canvas.addEventListener('pointermove',e=>{if(held===e.pointerId)disturb(e);});for(const type of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(type,()=>{held=null;});
canvas.addEventListener('keydown',e=>{if(e.key===' '){e.preventDefault();setPaused(!paused);}if(e.key==='Enter'&&!paused){e.preventDefault();model.disturb(64,64);}});
pause.onclick=()=>setPaused(!paused);select.onchange=start;document.querySelector('#reset').onclick=start;document.querySelector('#seed').onclick=()=>{seed=(seed+7919)>>>0;start();};
reduced.addEventListener('change',e=>{if(e.matches)setPaused(true);});document.addEventListener('visibilitychange',()=>{last=0;acc=0;held=null;if(document.hidden){cancelAnimationFrame(raf);raf=0;}else schedule();});
new ResizeObserver(resize).observe(canvas);labels();resize();schedule();
// Diagnostics expose copies and measured state; no production mutation controls.
window.virsmas={snapshot:()=>({...model.metrics(),seed,mode:model.mode,paused}),build:'virsmas-01'};
})();
