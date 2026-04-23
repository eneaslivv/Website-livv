/* LIVV real navbar — scroll shrink + mobile menu */
(function(){
  function init(){
    const nav=document.getElementById('livv-nav');
    if(!nav)return;
    let ticking=false;
    function onScroll(){
      if(!ticking){
        ticking=true;
        requestAnimationFrame(()=>{nav.classList.toggle('scrolled',window.scrollY>50);ticking=false;});
      }
    }
    window.addEventListener('scroll',onScroll,{passive:true});
    onScroll();

    const mobileBtn=document.querySelector('.livv-nav-mobile');
    const mobileMenu=document.querySelector('.livv-mobile-menu');
    if(mobileBtn&&mobileMenu){
      const bg=mobileMenu.querySelector('.livv-mobile-menu-bg');
      mobileBtn.addEventListener('click',()=>mobileMenu.classList.toggle('open'));
      bg&&bg.addEventListener('click',()=>mobileMenu.classList.remove('open'));
      mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileMenu.classList.remove('open')));
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();
})();
