/* VIRSMAS — finite local feedback model. No target shapes or time-driven field. */
(function(root){
'use strict';
const W=128,L=W*W,TAU=Math.PI*2;
const wrap=v=>(v%W+W)%W;
function rng(seed){let a=seed>>>0;return ()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};}
class Field{
 constructor(mode='weave',seed=4101,feedback=true){
 this.mode=mode;this.seed=seed;this.feedback=feedback;this.tick=0;
 this.a=new Float32Array(L);this.b=new Float32Array(L);this.fatigue=new Float32Array(L);
 this.nextA=new Float32Array(L);this.nextB=new Float32Array(L);this.nextF=new Float32Array(L);
 const r=rng(seed);this.p=Array.from({length:1900},(_,i)=>({x:r()*W,y:r()*W,h:r()*TAU,side:i%2,bias:(r()-.5)*.045,speed:.22+r()*.12}));
 }
 index(x,y){return (Math.floor(wrap(y))*W+Math.floor(wrap(x)));}
 sample(p,angle,d){const i=this.index(p.x+Math.cos(angle)*d,p.y+Math.sin(angle)*d);
 if(!this.feedback)return 0;
 if(this.mode==='weave')return this.a[i]*1.5-this.fatigue[i]*1.65;
 const own=p.side?this.b[i]:this.a[i],other=p.side?this.a[i]:this.b[i];
 return own*1.25-other*1.7-this.fatigue[i]*1.15;
 }
 diffuse(src,dst,rate,decay){for(let y=0;y<W;y++)for(let x=0;x<W;x++){
 const i=y*W+x;dst[i]=Math.max(0,(src[i]*(1-rate)+(src[y*W+(x+1)%W]+src[y*W+(x+W-1)%W]+src[((y+1)%W)*W+x]+src[((y+W-1)%W)*W+x])*rate*.25)*decay);
 }}
 step(){
 this.diffuse(this.a,this.nextA,.22,.986);this.diffuse(this.b,this.nextB,.22,.986);
 this.diffuse(this.fatigue,this.nextF,.06,.998);
 [this.a,this.nextA]=[this.nextA,this.a];[this.b,this.nextB]=[this.nextB,this.b];[this.fatigue,this.nextF]=[this.nextF,this.fatigue];
 // All agents sense the same prior field; deposition occurs only after all move.
 const d=this.mode==='weave'?3.6:5.2,angle=this.mode==='weave'?.6:.85;
 for(const p of this.p){const f=this.sample(p,p.h,d),l=this.sample(p,p.h-angle,d),r=this.sample(p,p.h+angle,d);
 const delta=r-l;const steer=Math.tanh(delta*3)*.16;
 p.h=(p.h+steer+p.bias+(f<Math.min(l,r)?Math.sign(p.bias)*.10:0)+TAU)%TAU;
 p.x=wrap(p.x+Math.cos(p.h)*p.speed);p.y=wrap(p.y+Math.sin(p.h)*p.speed);
 }
 if(this.feedback)for(const p of this.p){const i=this.index(p.x,p.y),f=this.mode==='weave'||!p.side?this.a:this.b;f[i]=Math.min(8,f[i]+.25);this.fatigue[i]=Math.min(8,this.fatigue[i]+.012);}
 this.tick++;
 }
 disturb(x,y){for(let dy=-9;dy<=9;dy++)for(let dx=-9;dx<=9;dx++){
 const d=Math.hypot(dx,dy);if(d>9)continue;const i=this.index(x+dx,y+dy),w=1-d/9;
 this.fatigue[i]=Math.min(8,this.fatigue[i]+w*1.7);this.a[i]*=1-w*.5;this.b[i]*=1-w*.5;
 }for(const p of this.p){let dx=p.x-x,dy=p.y-y;dx-=Math.round(dx/W)*W;dy-=Math.round(dy/W)*W;if(Math.hypot(dx,dy)<10)p.h=Math.atan2(dy,dx)+.5;}}
 metrics(){let mass=0,energy=0,occupied=0;for(let i=0;i<L;i++){const v=this.a[i]+this.b[i];mass+=v;energy+=this.fatigue[i];if(v>.6)occupied++;}return {tick:this.tick,mass,history:energy,occupied,signature:this.p.slice(0,24).map(p=>[p.x,p.y,p.h].map(v=>+v.toFixed(5)))};}
}
root.Virsmas={Field,W};if(typeof module!=='undefined')module.exports=root.Virsmas;
})(typeof globalThis!=='undefined'?globalThis:this);
