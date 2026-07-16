const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#site-nav');
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open');});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));}
const year=document.querySelector('#year');
if(year) year.textContent=new Date().getFullYear();

const counters=document.querySelectorAll('[data-count]');
if(counters.length){
  const countObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const el=entry.target,target=Number(el.dataset.count),suffix=el.dataset.suffix||'',start=performance.now(),duration=1400;
    const tick=now=>{const progress=Math.min((now-start)/duration,1),eased=1-Math.pow(1-progress,3);el.textContent=Math.round(target*eased)+suffix;if(progress<1)requestAnimationFrame(tick);};
    requestAnimationFrame(tick);countObserver.unobserve(el);
  }),{threshold:.65});
  counters.forEach(counter=>countObserver.observe(counter));
}

const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduceMotion){
  const parallax=[...document.querySelectorAll('[data-parallax]')];
  let ticking=false;
  const renderParallax=()=>{
    const y=window.scrollY;
    parallax.forEach(el=>{const speed=Number(el.dataset.parallax)||0;el.style.translate=`0 ${y*speed}px`;});
    document.querySelector('.site-header')?.classList.toggle('scrolled',y>80);
    ticking=false;
  };
  addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(renderParallax);ticking=true;}},{passive:true});
  renderParallax();

  if(matchMedia('(pointer:fine)').matches){
    document.querySelectorAll('[data-cursor-depth]').forEach(el=>{
      el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5,d=Number(el.dataset.cursorDepth);el.style.transform=`rotate(2deg) translate3d(${x*d}px,${y*d}px,0) scale(1.015)`;});
      el.addEventListener('pointerleave',()=>el.style.transform='rotate(2deg) translate3d(0,0,0) scale(1)');
    });
    document.querySelectorAll('.tilt').forEach(card=>{
      card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${-y*3}deg) rotateY(${x*3}deg) translateY(-3px)`;});
      card.addEventListener('pointerleave',()=>card.style.transform='');
    });
  }
}
