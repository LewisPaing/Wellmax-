if(matchMedia('(pointer:fine) and (min-width:901px)').matches){
  document.querySelectorAll('.site-header nav').forEach(nav=>{
    nav.addEventListener('pointermove',event=>{
      const rect=nav.getBoundingClientRect();
      nav.style.setProperty('--glass-x',`${event.clientX-rect.left}px`);
      nav.style.setProperty('--glass-y',`${event.clientY-rect.top}px`);
    });
    nav.addEventListener('pointerleave',()=>{
      nav.style.setProperty('--glass-x','45%');
      nav.style.setProperty('--glass-y','20%');
    });
  });
}
