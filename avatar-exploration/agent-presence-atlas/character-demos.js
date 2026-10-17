'use strict';
const $=id=>document.getElementById(id),family=document.body.dataset.family;
const CAST={
collectives:[
 {id:'trio',name:'Trio',source:'C01',color:'#e6a595',ink:'#56362d',trait:'Sociable / softly unruly',signature:'One leader, two companions',description:'The leading face holds the conversation while the smaller parts look outward. A small team, with a recognizable center.'},
 {id:'mote',name:'Mote',source:'C02',color:'#a8ceec',ink:'#294250',trait:'Watchful / softly alien',signature:'A calm center, active satellites',description:'The eye stays focused on you. Small satellites signal searching, uncertainty, and arrival without a busy central body.'},
 {id:'chorus',name:'Chorus',source:'C06',color:'#c6d798',ink:'#3d4d2c',trait:'Ambient / distributed',signature:'Expression without a face',description:'Spacing becomes the expression. The ring opens for attention, aligns for work, and settles into a shared rhythm.'},
 {id:'fable',name:'Fable',source:'C08',color:'#cbb7e7',ink:'#473651',trait:'Playful / many-minded',signature:'Three neighborhoods, three gazes',description:'Each cluster has a small point of view. They spread out to explore and draw closer when a shared answer emerges.'}
],pressure:[
 {id:'puff',name:'Puff',source:'P01',color:'#d3e8b8',ink:'#34462c',trait:'Mellow / reassuring',signature:'Sleepy eyes, dependable presence',description:'Small pixel steps and a low-key face make waiting feel calm. Success is a tiny lift, not a celebration that takes over.'},
 {id:'bud',name:'Bud',source:'P04',color:'#f1b277',ink:'#593b26',trait:'Bouncy / optimistic',signature:'A bright, spring-loaded helper',description:'An open face and a narrow stem make every little hop legible. The character leans toward a task before getting to work.'},
 {id:'glitch',name:'Glitch',source:'P08',color:'#c4b6ec',ink:'#3a2b56',trait:'Odd / mischievous',signature:'One eye, an awkward silhouette',description:'Off-center weight and clipped motion make the character feel curious. A snag becomes a puzzled pause, not a panic.'},
 {id:'flick',name:'Flick',source:'P11',color:'#ed9f8a',ink:'#55362b',trait:'Quick / creature-adjacent',signature:'A posture, not a face',description:'The projecting edge gives it direction. Short advances, a lowered body, and a little lift communicate without eyes.'}
]};
const C=CAST[family];
const pixelRows={puff:[[4,7],[2,9],[1,10],[1,10],[0,11],[0,11],[1,10],[1,10],[2,9],[4,7]],bud:[[3,7],[2,8],[1,9],[1,9],[0,10],[1,9],[2,8],[4,6],[4,6],[3,7]],glitch:[[1,6],[1,6],[1,6],[3,6],[3,10],[3,10],[3,10],[3,8],[5,8],[5,8]],flick:[[3,5],[3,5],[2,6],[2,9],[2,11],[2,9],[2,6],[2,6],[1,7],[0,8]]};
const E=(state,title,text,extra={})=>({state,title,text,out:0,actor:0,type:'reply',duration:4300,...extra});
const SCRIPTS={collectives:[
 {name:'Gather a brief',sub:'Parallel discovery',title:'Find the thread',subtitle:'Listening session / research room',app:'Gather / shared workspace',badge:'3 contributors',kind:'notes',docTitle:'A smaller, better gathering',docSub:'A working brief from the supplied notes.',request:'Turn these workshop notes into a clear direction. Keep the interesting tensions.',
 docs:choice=>[choice===1?'Practical direction: prototype one small activity.':'Reflective direction: begin with a shared question.','People want a quieter way to contribute, not another presentation.','Use pairs first; bring observations into the room afterward.','Leave with one question to carry into the next gathering.'],steps:[
 E('idle','A new thread','Turn these workshop notes into a clear direction. Keep the interesting tensions.',{type:'user',duration:2600}),
 E('working','Divide the attention','I’ll hold the main thread while the others look for patterns and contradictions.',{note:'The group opens up: independent attention, one recognizable identity.'}),
 E('working','Read in parallel','Reading the three supplied note bundles.',{type:'tool',tool:'Scan notes',detail:'session-notes.md · reflections.md · open-questions.md',actor:1,out:1}),
 E('handoff','Bring the findings back','The strongest pattern is participation without performance. I’m passing that into the brief.',{actor:2,out:2,note:'A handoff becomes a directional ripple, rather than a generic loading spinner.'}),
 E('attention','Ask for a direction','There are two useful ways into this. Which should lead?',{type:'choice',choices:['A reflective gathering','A practical workshop'],out:2,note:'The group gathers near the speaker and waits. The interface explains the decision.'}),
 E('working','Shape the response','I’m making the chosen direction concrete while keeping the quieter participation pattern.',{out:3}),
 E('success','A brief you can use','The brief is ready: one direction, a simple participation format, and a question to take forward.',{out:4,note:'The nodes lift together, then return to rest. The work product gets the emphasis.'})]},
 {name:'Compare possibilities',sub:'Several perspectives',title:'Which format fits?',subtitle:'Planning / compare three formats',app:'Gather / decision room',badge:'3 options',kind:'compare',docTitle:'Ways to bring people together',docSub:'Fictional options, compared against the same brief.',
 docs:choice=>['Walk + talk — open-ended, weather-dependent; best for pairs.','Studio circle — sheltered, reflective; easy to include quiet voices.','Shared table — hands-on, social; needs more preparation.',choice===1?'Selected: Walk + talk. Keep a simple indoor fallback.':'Selected: Studio circle. Start with a short pair conversation.'],steps:[
 E('idle','The question','Compare three formats for our next listening session.',{type:'user',duration:2600}),
 E('working','Set the criteria','Let’s compare participation, preparation, and room for a quiet voice.',{out:0}),
 E('working','Explore the first option','A walking conversation gives pairs space to find their own pace.',{actor:1,out:1}),
 E('working','Explore the alternatives','The studio circle is gentler to organize. A shared table offers more doing, but needs preparation.',{actor:2,out:3}),
 E('attention','Make the tradeoff visible','My leaning is the studio circle. Would you prefer the open air?',{type:'choice',choices:['Choose studio circle','Choose walk + talk'],out:3}),
 E('handoff','Agree on a direction','I’m carrying the choice into the plan, with a small adjustment for quieter participants.',{actor:3,out:4}),
 E('success','Decision captured','The comparison and the reason for the choice are together, ready to revisit later.',{out:4})]},
 {name:'Recover together',sub:'A source goes missing',title:'Keep the useful work',subtitle:'Research / a missing reference',app:'Gather / research room',badge:'Recovery',kind:'checklist',docTitle:'Research with a visible gap',docSub:'Useful progress, with uncertainty kept explicit.',
 docs:choice=>['Session notes: read and summarized.','Participant reflections: read and summarized.',choice===1?'Reference pack: demo retry succeeded; summary included.':'Reference pack: unavailable; clearly marked as a gap.','Next step: review the open question before treating this as a final answer.'],steps:[
 E('idle','Resume the research','Pull the notes and reference pack into one short summary.',{type:'user',duration:2600}),
 E('working','Gather what is available','The session notes are available. I’m starting there.',{type:'tool',tool:'Read supplied notes',detail:'2 local demo documents',out:1,actor:1}),
 E('error','One path is blocked','The reference pack didn’t load. The other two summaries are safe.',{type:'error',tool:'Reference unavailable',detail:'Simulated source failure · no work discarded',out:2,note:'One part falls out of alignment. The rest of the group stays present.'}),
 E('attention','Offer a useful choice','We can continue with the available notes, or retry the reference once.',{type:'choice',choices:['Continue with notes','Retry demo reference'],out:2}),
 E('working','Recover without starting over','I’m following that choice and keeping the source status visible.',{out:3,actor:2}),
 E('handoff','Check the boundaries','The summary separates what we have from what still needs a human look.',{out:4,actor:3}),
 E('success','A useful partial result','The research is ready for review. Any missing evidence stays visible in the artifact.',{out:4})]},
 {name:'A careful handoff',sub:'From draft to review',title:'Pass the work, keep the context',subtitle:'Review / a shared invitation',app:'Gather / review room',badge:'Review',kind:'draft',docTitle:'An invitation to a quieter room',docSub:'An editable demo invitation. Nothing is sent.',
 docs:choice=>['Come with a question you have not quite found the words for.','We’ll begin in pairs, then bring a few observations into the room.',choice===1?'There is no need to prepare or speak to the whole group. Listening counts.':'You are welcome to listen first. There is room for every pace.','We’ll close with one small thing to carry into the week.'],steps:[
 E('idle','A draft to share','Draft a gentle invitation for the listening session, then have another perspective check it.',{type:'user',duration:2600}),
 E('working','Find the opening','I’m starting with an invitation to curiosity, rather than a list of expectations.',{out:1}),
 E('handoff','Pass to a second perspective','The opening is ready. Could you check whether the participation format feels welcoming?',{actor:0,out:2,note:'The motion points toward the next collaborator; the conversation preserves why the work is moving.'}),
 E('working','Review for inclusion','I’d make it explicit that listening is a valid way to take part.',{actor:2,out:3}),
 E('attention','Let the author decide','Keep that line subtle, or make the permission to listen more explicit?',{type:'choice',choices:['Keep it subtle','Make it explicit'],out:3}),
 E('working','Keep the intent intact','I’m applying the review while preserving the warm opening.',{actor:1,out:4}),
 E('success','Ready for your review','The invitation is drafted and reviewed. You can open it here; it has not been sent anywhere.',{out:4})]}
],pressure:[
 {name:'Tidy a small mess',sub:'Plan before changing',title:'A little less scattered',subtitle:'Notebook / organize a few fragments',app:'Pocket / your workbench',badge:'6 demo notes',kind:'files',docTitle:'A gentler notebook',docSub:'Proposed organization of fictional notes.',
 docs:choice=>choice===1?['Monday / early questions.md','Wednesday / workshop fragments.md','Friday / what stayed with me.md','Original note text preserved. No external files changed.']:['Questions / what makes a good gathering.md','Experiments / a quieter participation format.md','Observations / what stayed with people.md','Original note text preserved. No external files changed.'],steps:[
 E('idle','A small request','These notes are a mess. Can you help me find a simple order?',{type:'user',duration:2600}),
 E('working','Look before moving','I’ll look for a useful pattern first. No need to invent a whole filing system.',{note:'The companion takes a small step toward the task. Its identity stays stable at sidebar size.'}),
 E('working','Find the shape of the pile','Reading titles and short excerpts from six demo notes.',{type:'tool',tool:'Inspect note fragments',detail:'6 notes · 3 emerging themes',out:2}),
 E('attention','Show the plan first','I see questions, experiments, and observations. Would you rather keep a chronological order?',{type:'choice',choices:['Group by theme','Group by day'],out:3,note:'A lifted body and open eyes invite a decision. The proposed result is visible before the choice.'}),
 E('working','Apply the chosen order','I’m arranging the demo notes using that structure, without rewriting their contents.',{out:3}),
 E('success','A little more room','The notebook has a simple order now. The original fragments are intact.',{out:4,note:'A quick hop acknowledges completion; the companion settles while you read the result.'}),
 E('idle','Stay available','I’m here if another pattern starts to emerge.',{out:4})]},
 {name:'Write beside me',sub:'Tone, draft, revise',title:'Find the words together',subtitle:'Writing / a short project update',app:'Pocket / writing desk',badge:'Draft',kind:'draft',docTitle:'A note about the first experiment',docSub:'A fictional update, drafted locally inside this demo.',
 docs:choice=>choice===1?['We tested the first version with a small group.','The clearest finding: people wanted more time in pairs and less time presenting.','Next, we will try a shorter opening and a quieter way to share observations.','The next version will follow what we learned.']:['We tried a small version of the idea, and a few things stayed with us.','People seemed to find their voice in pairs, before speaking to the whole room.','Next time, we’ll leave more room for that quieter beginning.','It is still an experiment. That is part of what makes it useful.'],steps:[
 E('idle','Start with the rough version','Help me turn these experiment notes into a short update. Keep it human.',{type:'user',duration:2600}),
 E('working','Find the useful thread','I’ll keep the observation in front and make the next step clear.',{out:1}),
 E('working','Build the first draft','The pair conversations seem to be the heart of it. I’m keeping that concrete.',{out:2}),
 E('attention','Check the voice','Should this sound warm and reflective, or short and direct?',{type:'choice',choices:['Warm and reflective','Short and direct'],out:2}),
 E('working','Follow your voice','I’m revising the opening and closing to match that choice.',{out:4,note:'Working stays small: focused eyes and a clipped rhythm, without competing with the draft.'}),
 E('success','A draft to make yours','The update is ready. Open it to read the complete version, then make it your own.',{out:4}),
 E('idle','Leave room for the author','No rush. The draft is here when you want to revisit it.',{out:4})]},
 {name:'Make room to focus',sub:'Quiet companionship',title:'One thing at a time',subtitle:'Focus / compressed time demonstration',app:'Pocket / focus space',badge:'Time-lapse',kind:'focus',docTitle:'A small pocket of attention',docSub:'A 25-minute session shown as a short, fictional time-lapse.',
 docs:choice=>[choice===1?'Focus: sketch three possible openings.':'Focus: write one rough opening.','Distractions parked in a separate note.','One imperfect beginning is enough.','Session complete. Take a short break.'],steps:[
 E('idle','A place to begin','I have twenty-five minutes and too many possible starting points.',{type:'user',duration:2600,minutes:'25:00'}),
 E('attention','Make the task smaller','Let’s choose a small enough beginning.',{type:'choice',choices:['Write one opening','Sketch three options'],minutes:'25:00',out:1}),
 E('working','Begin quietly','I’ll keep the task visible and stay out of the way.',{minutes:'24:00',out:2,note:'The companion becomes quieter during focus. Presence is allowed to be peripheral.'}),
 E('idle','Hold the space','A little progress, a little more room. Keep going.',{minutes:'16:00',out:2,duration:5000}),
 E('idle','Stay with one thing','No extra suggestions. Just the task you chose.',{minutes:'05:00',out:3,duration:5000}),
 E('success','A gentle finish','That is enough for this session. Leave a breadcrumb for where you want to return.',{minutes:'00:00',out:4}),
 E('idle','Rest is part of it','Your rough beginning is safe here. Time to step away for a moment.',{minutes:'Break',out:4})]},
 {name:'A snag, not a crisis',sub:'Recovery with agency',title:'Pick up the thread',subtitle:'Export / a recoverable interruption',app:'Pocket / your workbench',badge:'Recovery',kind:'checklist',docTitle:'Your work is still here',docSub:'A simulated export issue with two recovery routes.',
 docs:choice=>['Draft content: preserved.','Formatting and source notes: preserved.',choice===1?'Local demo copy: prepared for review.':'Demo export: retry completed successfully.','Nothing sent, uploaded, or changed outside this page.'],steps:[
 E('idle','One last step','Prepare this draft for sharing, please.',{type:'user',duration:2600}),
 E('working','Prepare the result','I’m checking the draft and preparing a clean copy.',{type:'tool',tool:'Prepare demo export',detail:'Draft preserved · format check complete',out:2}),
 E('error','A small snag','The demo export route is unavailable. Your draft is still here.',{type:'error',tool:'Export interrupted',detail:'Simulated connection error · no content lost',out:2,note:'The character lowers and pauses. The message offers a specific next step, without amplifying alarm.'}),
 E('attention','Keep you in control','Would you like to retry the demo export or keep a local demo copy?',{type:'choice',choices:['Retry demo export','Keep demo copy'],out:2}),
 E('working','Continue from here','I’m taking that route. We don’t need to redo the writing.',{out:3}),
 E('success','Back on track','The result is ready to review, and the draft is intact.',{out:4}),
 E('idle','Settle again','All done. I’ll stay nearby.',{out:4})]}
]};
const scripts=SCRIPTS[family],pref=matchMedia('(prefers-reduced-motion: reduce)');
let scenario=0,step=0,character=0,playing=!pref.matches,tour=false,motion=!pref.matches,elapsed=0,last=performance.now(),speed=1;
let decisions={},lastResultFocus=null;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const current=()=>scripts[scenario].steps[step];
function eyes(x,y,state,c,r=3,pixel=false,lens=false){
 let art='';const dark=c.ink,stroke=`fill="none" stroke="${dark}" stroke-width="${pixel?2.8:2.2}" stroke-linecap="${pixel?'square':'round'}"`;
 if(lens){art=`<circle cx="${x}" cy="${y}" r="${r+4}" fill="#faf8ea"/>`;art+=state==='success'?`<path d="M${x-r} ${y+2}q${r} ${-r*1.6} ${r*2} 0" ${stroke}/>`:state==='error'?`<path d="M${x-r} ${y+2}l${r*2} -4" ${stroke}/>`:`<g class="gaze"><circle cx="${x}" cy="${y}" r="${r*.7}" fill="${dark}"/></g>`;
 }else if(state==='success'){art=`<path d="M${x-9} ${y+2}q3 -5 6 0M${x+3} ${y+2}q3 -5 6 0M${x-4} ${y+9}q4 4 8 0" ${stroke}/>`;
 }else if(state==='error'){art=`<path d="M${x-9} ${y-2}l6 3M${x+3} ${y+1}l6 -3M${x-3} ${y+9}h6" ${stroke}/>`;
 }else if(c.id==='puff'&&state==='idle'){art=`<path d="M${x-9} ${y}h6M${x+3} ${y}h6" ${stroke}/>`;
 }else if(pixel){const h=state==='attention'?7:5;art=`<g class="gaze"><path d="M${x-9} ${y-3}h5v${h}h-5ZM${x+4} ${y-3}h5v${h}h-5Z" fill="${dark}"/></g>`;
 }else art=`<g class="gaze"><ellipse cx="${x-6}" cy="${y}" rx="${r}" ry="${state==='attention'?r*1.35:r}" fill="${dark}"/><ellipse cx="${x+6}" cy="${y}" rx="${r}" ry="${state==='attention'?r*1.35:r}" fill="${dark}"/></g>`;
 return `<g class="eye-blink">${art}</g>`;
}
function avatar(c,size=48,state='idle'){
 let body='';
 if(pixelRows[c.id]){const pixels=pixelRows[c.id].map(([a,b],y)=>`<rect x="${16+a*8}" y="${16+y*8}" width="${(b-a+1)*8}" height="8"/>`).join('');
 const face=c.id==='flick'?'':c.id==='glitch'?eyes(51,32,state,c,6,true,true):eyes(c.id==='bud'?60:64,c.id==='bud'?47:53,state,c,3,true);
 const pose=state==='error'?'translate(0 3)':state==='attention'?'translate(0 -3)':'translate(0 0)';body=`<g transform="${pose}"><g class="pixel-body ${c.id}"><g shape-rendering="crispEdges">${pixels}</g>${face}</g></g>`;
 }else{
 const points=c.id==='trio'?[[43,40,20],[88,49,14],[59,88,16]]:c.id==='mote'?[[54,64,25],[93,40,9],[98,76,7],[69,103,6]]:c.id==='chorus'?[[64,23,9],[91,38,10],[104,68,8],[82,94,11],[49,102,7],[27,79,10],[30,44,8]]:[[32,33,11],[51,29,6],[36,51,5],[88,47,12],[104,62,6],[84,69,5],[53,91,13],[32,94,6],[66,109,5]];
 body=points.map(([x,y,r],i)=>{let dx=0,dy=0;if(state==='working'){dx=(x-64)*.11;dy=(y-64)*.08;if(c.id==='chorus'){dx=(28+i*12)-x;dy=(i%2?58:70)-y;}}if(state==='attention'){dx=(64-x)*.1;dy=i===0?-7:2;}if(state==='error'){dx=i%3===0?-3:2;dy=i===points.length-1?8:2;}if(state==='success'){dx=(64-x)*.08;dy=-3;}if(state==='handoff'){dx=i*1.2-3;dy=(64-y)*.12;}
 const face=(c.id==='trio'&&i===0)?eyes(x,y,state,c,3):(c.id==='mote'&&i===0)?eyes(x,y,state,c,8,false,true):(c.id==='fable'&&[0,3,6].includes(i))?eyes(x,y,state,c,2):'';
 return `<g class="node-layout" transform="translate(${dx} ${dy})"><g class="node" style="--i:${i};--dx:${[2,-2,3,-1][i%4]};--dy:${[-2,3,-3,2][i%4]}"><circle cx="${x}" cy="${y}" r="${r}"/>${face}</g></g>`}).join('');
 }
 const signal=state==='attention'?'<g class="signal-mark"><rect x="110" y="15" width="4" height="11" rx="1"/><rect x="110" y="31" width="4" height="4"/></g>':state==='success'?'<path class="signal-mark" d="M108 14v12m-6-6h12" fill="none" stroke="currentColor" stroke-width="3"/>':'';
 return `<span class="avatar" data-character="${c.id}" data-state="${state}" style="--size:${size}px;color:${c.color}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="${c.name}, ${state}"><g fill="currentColor">${body}<g class="character-signal">${signal}</g></g></svg></span>`;
}
function actorFor(event){return family==='pressure'?C[character]:C[(character+(event.actor||0))%C.length]}
function chosen(){return decisions[scenario]}
function docs(){return scripts[scenario].docs(chosen())}
function announce(message){$('announce').textContent=message}
function renderCast(){$('cast').innerHTML=C.map((c,i)=>`<button class="cast-card" data-cast="${i}" aria-pressed="${character===i}" aria-label="Use ${c.name}">${avatar(c,72,'idle')}<span><strong>${c.name}</strong><small>${c.trait}</small><span class="cast-id">${c.source} ${character===i?'· IN THIS DEMO':'· TRY THIS CHARACTER'}</span></span></button>`).join('')}
function renderScenes(){$('scenario-buttons').innerHTML=scripts.map((s,i)=>`<button class="scenario" data-scenario="${i}" aria-pressed="${scenario===i}"><span class="num">0${i+1}</span><span>${s.name}<small>${s.sub}</small></span></button>`).join('')}
function renderFeed(){const script=scripts[scenario],event=current();$('feed').innerHTML=script.steps.slice(0,step+1).map((e,i)=>{
 const latest=i===step,actor=actorFor(e);if(e.type==='user')return `<div class="feed-entry user"><div class="user-message">${esc(e.text)}</div></div>`;
 const stream=latest&&playing&&e.type==='reply';let text=esc(e.text);if(stream)text='';
 let content=`<p${stream?' class="stream-text"':''}>${text}</p>`;
 if(e.type==='tool'||e.type==='error'){const done=!latest&&e.type!=='error';content=`<div class="tool-call ${e.type==='error'?'error':done?'done':''}"><span class="tool-glyph">${e.type==='error'?'!':done?'✓':'↗'}</span><div><strong>${esc(e.tool)}</strong><small>${esc(e.detail)}</small></div><span class="tool-status">${e.type==='error'?'Blocked':done?'Complete':e.tool.includes('export')?'Preparing':'Reading'}</span></div><p style="margin-top:8px">${esc(e.text)}</p>`}
 if(e.type==='choice'){const decision=chosen();content+=`<div class="choice-box"><div class="choice-title">${decision===undefined?(tour?'Sample choice in the tour':'Your choice · playback waits here'):'Direction chosen'}</div>${decision===undefined?`<div class="choice-buttons">${e.choices.map((label,j)=>`<button data-choice="${j}">${esc(label)}</button>`).join('')}</div>`:`<div class="decision">✓ ${esc(e.choices[decision])}</div>`}</div>`;}
 return `<div class="feed-entry ${latest?'arriving':''}">${avatar(actor,36,latest?e.state:'idle')}<div class="feed-body"><div class="feed-meta"><strong>${actor.name}</strong><time>${String(i).padStart(2,'0')} / ${esc(e.title)}</time></div>${content}${latest&&playing&&e.state==='working'?'<div class="typing" aria-label="Working"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i></div>':''}</div></div>`;
 }).join('');$('feed').scrollTop=$('feed').scrollHeight;
}
function renderArtifact(){const s=scripts[scenario],e=current(),rows=docs().slice(0,e.out),complete=step===s.steps.length-1||e.state==='success';
 $('artifact-label').textContent=s.kind==='files'?'Proposed organization':s.kind==='compare'?'Live comparison':s.kind==='focus'?'Focus session':'Live work product';$('artifact-status').textContent=complete?'Ready to review':e.state==='error'?'Partial work saved':e.out?'Taking shape':'Waiting to begin';
 let contents='';if(s.kind==='focus'){const fraction=step/(s.steps.length-1);contents=`<div style="display:flex;justify-content:center;position:relative;margin:8px 0 18px"><svg width="132" height="132" viewBox="0 0 132 132" aria-label="${esc(e.minutes||'25:00')} remaining in simulated focus session"><circle cx="66" cy="66" r="55" fill="none" stroke="var(--paper-line)" stroke-width="5"/><circle cx="66" cy="66" r="55" fill="none" stroke="var(--text)" stroke-width="5" stroke-dasharray="${345*fraction} 345" transform="rotate(-90 66 66)"/><text x="66" y="66" text-anchor="middle" dominant-baseline="middle" fill="var(--text)" font-family="ui-monospace,monospace" font-size="23">${e.minutes||'25:00'}</text><text x="66" y="86" text-anchor="middle" fill="var(--soft)" font-family="sans-serif" font-size="8">DEMO TIME-LAPSE</text></svg></div>`}
 contents+=rows.map((text,i)=>s.kind==='draft'?`<p class="doc-subtitle" style="color:var(--text);font-family:Georgia,serif;font-size:12px">${esc(text)}</p>`:`<div class="doc-item"><span>${s.kind==='files'?'▤':s.kind==='checklist'?'✓':String(i+1).padStart(2,'0')}</span><span>${esc(text)}</span></div>`).join('');
 if(!rows.length)contents+='<div aria-label="Draft will appear as the agent works"><div class="doc-placeholder"></div><div class="doc-placeholder"></div><div class="doc-placeholder"></div></div>';
 $('paper').innerHTML=`<div class="doc-eyebrow">${s.kind==='focus'?'One small intention':'Demo artifact / 0'+(scenario+1)}</div><h3>${s.docTitle}</h3><p class="doc-subtitle">${s.docSub}</p>${contents}${complete?'<button class="document-action" id="open-result">Open complete result ↗</button>':''}`;
 $('contributors').innerHTML=(family==='collectives'?C.slice(0,Math.min(4,1+step)): [C[character]]).map(c=>avatar(c,24,complete?'success':'idle')).join('')+`<span>${family==='collectives'?'Shared context, distinct contributors':C[character].name+' is keeping you company'}</span>`;
 $('artifact-note').textContent=e.state==='error'?'The available work is preserved.':complete?'Ready to read. No external changes made.':e.out?'The artifact updates as the story unfolds.':'The agent will build this as the demo progresses.';
}
const STATE_LABELS={idle:'Present / at rest',working:'Working / focused',attention:'Needs you / waiting',handoff:'Handoff / shared context',error:'A snag / work preserved',success:'Complete / ready for review'};
function morphMascot(c,state){
 const container=$('mascot'),old=container.querySelector('.avatar');
 if(!old||old.dataset.character!==c.id){container.innerHTML=avatar(c,132,state);return}
 const template=document.createElement('template');template.innerHTML=avatar(c,132,state);const fresh=template.content.querySelector('.avatar');
 old.dataset.state=state;old.querySelector('svg').setAttribute('aria-label',c.name+', '+state);
 const pixel=old.querySelector('.pixel-body'),newPixel=fresh.querySelector('.pixel-body');if(pixel&&newPixel)pixel.parentElement.setAttribute('transform',newPixel.parentElement.getAttribute('transform'));
 const oldNodes=old.querySelectorAll('.node-layout'),newNodes=fresh.querySelectorAll('.node-layout');
 oldNodes.forEach((node,i)=>{const transform=newNodes[i].getAttribute('transform');node.setAttribute('transform',transform);const values=transform.match(/-?[\d.]+/g);node.style.transform=`translate(${values[0]}px,${values[1]}px)`;});
 const oldEyes=old.querySelectorAll('.eye-blink'),newEyes=fresh.querySelectorAll('.eye-blink');oldEyes.forEach((node,i)=>node.innerHTML=newEyes[i].innerHTML);
 old.querySelector('.character-signal').innerHTML=fresh.querySelector('.character-signal').innerHTML;
}
function renderPerformance(){const c=C[character],e=current();morphMascot(c,e.state);$('state-label').textContent=STATE_LABELS[e.state];$('performance-title').textContent=e.title;$('performance-description').textContent=e.note||c.description;$('signature-title').textContent=c.name+' / '+c.signature;$('signature-copy').textContent=family==='collectives'?'Grouping, spacing, and rhythm carry expression alongside the words.':'Discrete pixel movement carries the gesture. The task remains the main event.';$('composer-avatar').innerHTML=avatar(c,22,e.state);$('composer-status').textContent=e.type==='choice'&&chosen()===undefined?'Waiting for your choice':playing?'Scripted demo is playing':'Demo paused / use controls below';}
function syncControls(){const e=current(),waiting=e.type==='choice'&&chosen()===undefined&&!tour,done=step===scripts[scenario].steps.length-1;
 $('play').textContent=waiting?'Choose above':done&&!playing?'▶ Replay':playing?'Ⅱ Pause':'▶ Play';$('play').disabled=waiting;$('next').disabled=waiting||done;$('demo-status').textContent=tour?'Guided tour · sample choices':waiting?'Your choice · playback paused':playing?'Scripted demo · playing':done?'Scenario complete':'Scripted demo · paused';$('tour').textContent=tour?'Stop guided tour':'Play all scenarios ↗';$('tour').setAttribute('aria-pressed',tour);$('motion').textContent=motion?'Motion on':'Motion off';$('motion').setAttribute('aria-pressed',!motion);document.body.classList.toggle('motion-off',!motion);document.body.classList.toggle('frozen',!playing&&!waiting);$('composer-status').textContent=waiting?'Waiting for your choice':playing?'Scripted demo is playing':'Demo paused / use controls below';}
function renderTimeline(){const s=scripts[scenario];$('step-label').textContent=current().title;$('step-count').textContent=`${String(step+1).padStart(2,'0')} / ${String(s.steps.length).padStart(2,'0')}`;$('timeline').innerHTML=s.steps.map((e,i)=>`<button data-step="${i}" aria-label="Step ${i+1}: ${esc(e.title)}" ${i===step?'aria-current="step"':''} class="${i<step?'past':i===step?'current':''}" ${i>step&&current().type==='choice'&&chosen()===undefined?'disabled':''}></button>`).join('')}
function render(){const s=scripts[scenario];$('app-name').textContent=s.app;$('workspace-title').textContent=s.title;$('workspace-subtitle').textContent=s.subtitle;$('workspace-badge').textContent=s.badge;$('caption').textContent=tour?'The guided tour follows sample choices. You can still choose a different path.':'This scenario waits at decisions. Choose an answer or use “Play all scenarios” for a continuous tour.';renderFeed();renderArtifact();renderPerformance();renderTimeline();syncControls();}
function enter(index,{run=playing}={}){step=Math.max(0,Math.min(index,scripts[scenario].steps.length-1));elapsed=0;playing=run;if(current().type==='choice'&&chosen()===undefined&&!tour)playing=false;render();if(!playing&&current().type==='choice')announce(current().text);}
function setScenario(index,run=true){scenario=index;step=0;elapsed=0;delete decisions[scenario];playing=run;renderScenes();render();}
function advance(){if(current().type==='choice'&&chosen()===undefined){if(tour)decisions[scenario]=0;else return}if(step<scripts[scenario].steps.length-1)enter(step+1);else if(tour){if(scenario===scripts.length-1){tour=false;playing=false;syncControls();announce('Guided tour complete.')}else setScenario(scenario+1,true)}else{playing=false;syncControls();renderPerformance()}}
function choose(value){decisions[scenario]=value;playing=true;enter(step+1,{run:true});announce('Choice applied. The demo is continuing.');$('play').focus({preventScroll:true})}
$('scenario-buttons').addEventListener('click',e=>{const b=e.target.closest('[data-scenario]');if(!b)return;tour=false;setScenario(Number(b.dataset.scenario),!pref.matches);$('scenario-buttons').querySelector(`[data-scenario="${scenario}"]`).focus({preventScroll:true});announce(scripts[scenario].name)});
$('cast').addEventListener('click',e=>{const b=e.target.closest('[data-cast]');if(!b)return;character=Number(b.dataset.cast);renderCast();render();$('cast').querySelector(`[data-cast="${character}"]`).focus({preventScroll:true});announce(C[character].name+' is now in the demo.');document.querySelector('.theater').scrollIntoView({behavior:pref.matches?'instant':'smooth',block:'start'})});
$('feed').addEventListener('click',e=>{const b=e.target.closest('[data-choice]');if(b)choose(Number(b.dataset.choice))});
$('timeline').addEventListener('click',e=>{const b=e.target.closest('[data-step]');if(!b)return;const target=Number(b.dataset.step),firstUnanswered=scripts[scenario].steps.findIndex((s,i)=>i<target&&s.type==='choice'&&chosen()===undefined);tour=false;enter(firstUnanswered>=0?firstUnanswered:target,{run:false});$('timeline').querySelector(`[data-step="${step}"]`).focus({preventScroll:true});announce(current().title)});
$('play').onclick=()=>{if(step===scripts[scenario].steps.length-1&&!playing){setScenario(scenario,true);return}playing=!playing;syncControls();renderPerformance();if(!playing){const text=$('feed').querySelector('.stream-text');if(text)text.textContent=current().text;}};
$('next').onclick=()=>{playing=false;tour=false;advance();syncControls()};
$('replay').onclick=()=>{tour=false;setScenario(scenario,true)};
$('tour').onclick=()=>{if(tour){tour=false;playing=false;syncControls();return}tour=true;decisions={};setScenario(0,true)};
$('motion').onclick=()=>{motion=!motion;syncControls()};$('speed').onchange=e=>{speed=Number(e.target.value)};
$('paper').addEventListener('click',e=>{if(!e.target.closest('#open-result'))return;lastResultFocus=document.activeElement;playing=false;tour=false;syncControls();const s=scripts[scenario];$('result-title').textContent=s.docTitle;$('result-copy').innerHTML=`<p>${esc(s.docSub)}</p>`+(s.kind==='draft'?docs().map(text=>`<p>${esc(text)}</p>`).join(''):`<ol>${docs().map(text=>`<li>${esc(text)}</li>`).join('')}</ol>`);$('result').showModal()});
$('close-result').onclick=()=>$('result').close();$('result').addEventListener('close',()=>{if(lastResultFocus?.isConnected)lastResultFocus.focus({preventScroll:true})});
pref.addEventListener('change',()=>{if(pref.matches){playing=false;motion=false;tour=false;syncControls()}});
document.addEventListener('visibilitychange',()=>{last=performance.now();if(document.hidden){playing=false;tour=false;syncControls()}});
document.querySelector('.stage-wrap').addEventListener('pointermove',e=>{if(!motion||pref.matches)return;const box=e.currentTarget.getBoundingClientRect();document.body.style.setProperty('--gaze-x',((e.clientX-box.left)/box.width*3-1.5)+'px');document.body.style.setProperty('--gaze-y',((e.clientY-box.top)/box.height*2-1)+'px')});
function tick(now){const dt=Math.min(150,now-last);last=now;if(playing){elapsed+=dt*speed;const e=current(),duration=e.type==='choice'?6500:e.duration;const bar=$('timeline').querySelector('.current');if(bar)bar.style.setProperty('--progress',Math.min(100,elapsed/duration*100)+'%');const stream=$('feed').querySelector('.stream-text');if(stream){const chars=Math.min(e.text.length,Math.ceil(elapsed/14));if(stream.textContent.length!==chars){stream.textContent=e.text.slice(0,chars);$('feed').scrollTop=$('feed').scrollHeight;}}if(elapsed>=duration)advance()}requestAnimationFrame(tick)}
renderScenes();renderCast();render();requestAnimationFrame(tick);
