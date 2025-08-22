
// theme toggle
(function(){
  const qs=(s)=>document.querySelector(s);
  const root=document.documentElement;
  const saved=localStorage.getItem('clarivoice-theme');
  if(saved==='dark'){ root.classList.add('dark'); }
  const t=qs('#toggleTheme'); if(t){ t.onclick=()=>{ root.classList.toggle('dark'); localStorage.setItem('clarivoice-theme', root.classList.contains('dark')?'dark':'light'); }; }
})();

// simple line chart
function drawLineChart(canvasId, data, colorVar='--brand'){
  const c=document.getElementById(canvasId); if(!c) return;
  const ctx=c.getContext('2d'); const w=c.width=c.offsetWidth; const h=c.height=280;
  ctx.clearRect(0,0,w,h);
  const stroke=getComputedStyle(document.documentElement).getPropertyValue('--stroke').trim() || '#E5E7EB';
  const color=getComputedStyle(document.documentElement).getPropertyValue(colorVar).trim() || '#4F46E5';
  // grid
  ctx.strokeStyle=stroke; ctx.lineWidth=1;
  for(let i=0;i<5;i++){ let y=16+i*((h-32)/4); ctx.beginPath(); ctx.moveTo(40,y); ctx.lineTo(w-16,y); ctx.stroke(); }
  // line
  const max=Math.max(...data);
  ctx.strokeStyle=color; ctx.lineWidth=3; ctx.beginPath();
  data.forEach((v,i)=>{
    const x=40+i*((w-72)/(data.length-1));
    const y=h-24 - (v/max)*(h-64);
    if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  });
  ctx.stroke();
  ctx.fillStyle=color;
  data.forEach((v,i)=>{
    const x=40+i*((w-72)/(data.length-1));
    const y=h-24 - (v/max)*(h-64);
    ctx.beginPath(); ctx.arc(x,y,4,0,Math.PI*2); ctx.fill();
  });
}

// donut
function drawDonut(canvasId, values, colors){
  const c=document.getElementById(canvasId); if(!c) return;
  const ctx=c.getContext('2d'); const w=c.width=c.offsetWidth; const h=c.height=280;
  ctx.clearRect(0,0,w,h);
  const cx=w/2, cy=h/2, r=Math.min(w,h)/2 - 10;
  const total = values.reduce((a,b)=>a+b,0);
  let ang=-Math.PI/2;
  values.forEach((v,i)=>{
    const slice=(v/total)*Math.PI*2;
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.arc(cx,cy,r,ang,ang+slice);
    ctx.closePath();
    ctx.fillStyle=colors[i];
    ctx.fill();
    ang+=slice;
  });
  // hole
  ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--panel').trim() || '#fff';
  ctx.beginPath(); ctx.arc(cx,cy,r*0.58,0,Math.PI*2); ctx.fill();
}

// dummy init per page
document.addEventListener('DOMContentLoaded', ()=>{
  if(document.getElementById('callsTrend')){
    drawLineChart('callsTrend',[120,180,150,200,240,220,260]);
  }
  if(document.getElementById('outcomes')){
    drawDonut('outcomes',[60,25,15],['#10B981','#F59E0B','#EF4444']);
  }
});
