const toggle=document.querySelector('.menu-toggle');
window.dataLayer=window.dataLayer||[];
window.gtag=function(){dataLayer.push(arguments);};
gtag('js',new Date());
gtag('config','G-BZS092V571');
const analytics=document.createElement('script');analytics.async=true;analytics.src='https://www.googletagmanager.com/gtag/js?id=G-BZS092V571';document.head.appendChild(analytics);
const nav=document.querySelector('#site-nav');
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open');});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));}
const year=document.querySelector('#year');
if(year) year.textContent=new Date().getFullYear();

const filterButtons=document.querySelectorAll('[data-filter]');
const portfolioItems=document.querySelectorAll('[data-category]');
filterButtons.forEach(button=>button.addEventListener('click',()=>{
  filterButtons.forEach(item=>item.classList.remove('active'));button.classList.add('active');
  const filter=button.dataset.filter;
  portfolioItems.forEach(item=>{item.hidden=filter!=='all'&&item.dataset.category!==filter;});
}));

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
    document.querySelectorAll('[data-parallax-img]').forEach(img=>{const frame=img.parentElement;frame.addEventListener('pointermove',e=>{const r=frame.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;img.style.transform=`scale(1.1) translate3d(${x*-14}px,${y*-14}px,0)`;});frame.addEventListener('pointerleave',()=>img.style.transform='scale(1.04)');});
    document.querySelectorAll('[data-cursor-depth]').forEach(el=>{
      el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5,d=Number(el.dataset.cursorDepth);el.style.transform=`rotate(2deg) translate3d(${x*d}px,${y*d}px,0) scale(1.015)`;});
      el.addEventListener('pointerleave',()=>el.style.transform='rotate(2deg) translate3d(0,0,0) scale(1)');
    });
    document.querySelectorAll('.tilt').forEach(card=>{
      card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${-y*3}deg) rotateY(${x*3}deg) translateY(-3px)`;});
      card.addEventListener('pointerleave',()=>card.style.transform='');
    });
    document.querySelectorAll('[data-icon-depth],.value-icon').forEach(icon=>{
      const card=icon.closest('article');
      card?.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;icon.style.transform=`perspective(400px) rotateX(${-y*18}deg) rotateY(${x*18}deg) translate3d(${x*10}px,${y*10}px,18px)`;});
      card?.addEventListener('pointerleave',()=>icon.style.transform='');
    });
    document.querySelectorAll('.contact-inner').forEach(section=>{const title=section.querySelector('h2');if(!title)return;section.addEventListener('pointermove',e=>{const r=section.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;title.style.transform=`perspective(1000px) rotateX(${-y*5}deg) rotateY(${x*7}deg) translate3d(${x*12}px,${y*8}px,24px)`;});section.addEventListener('pointerleave',()=>title.style.transform='');});
    document.querySelectorAll('.story-dimensional').forEach(section=>{const shapes=section.querySelectorAll('[data-story-depth]');section.addEventListener('pointermove',e=>{const r=section.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;shapes.forEach(shape=>{const depth=Number(shape.dataset.storyDepth);shape.style.translate=`${x*depth}px ${y*depth}px`;});});section.addEventListener('pointerleave',()=>shapes.forEach(shape=>shape.style.translate=''));});
  }
}

if(document.body.querySelector('.service-page')){
  const serviceLinks=['brand-strategy','graphic-packaging','social-media','paid-media','website-design','copy-content'];
  document.querySelectorAll('.service-page .service-list article').forEach((item,i)=>{item.tabIndex=0;item.setAttribute('role','link');item.addEventListener('click',()=>location.href=`article.html?topic=${serviceLinks[i]}`);item.addEventListener('keydown',e=>{if(e.key==='Enter')location.href=`article.html?topic=${serviceLinks[i]}`;});});
}
