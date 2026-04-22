/* ============================================================
   LIVV · Lead ingest for static landing page forms
   Mirrors lib/lead-ingest.ts on the React side.
   Usage: <form onsubmit="handleSubmit(event, 'Agencies Landing', 'agencies-lp')">
   ============================================================ */
(function(){
  var LEAD_INGEST_URL='https://ngswutcpsgdgmmjnfddi.supabase.co/functions/v1/lead-ingest';
  var SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nc3d1dGNwc2dkZ21tam5mZGRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1NzY3NDUsImV4cCI6MjA4MzE1Mjc0NX0.fd_OLVMTOMqN1EF-Ca1EV0MeclzM24kY0rOFDihvzd8';
  var TENANT_SLUG='livvv';

  function getUtm(){
    var p=new URLSearchParams(window.location.search),out={};
    ['utm_source','utm_medium','utm_campaign'].forEach(function(k){var v=p.get(k);if(v)out[k]=v;});
    return out;
  }

  function fireTracking(payload){
    var w=window;
    w.dataLayer=w.dataLayer||[];
    w.dataLayer.push({event:'lead_submitted',lead_origin:payload.origin,lead_category:payload.category,lead_source:payload.source});
    if(typeof w.gtag==='function'){
      w.gtag('event','generate_lead',{form_origin:payload.origin,category:payload.category});
      w.gtag('set','user_data',{email:payload.email});
    }
    if(typeof w.fbq==='function'){
      w.fbq('track','Lead',{content_name:payload.origin,content_category:payload.category});
    }
  }

  async function submitLead(payload){
    var body=Object.assign({tenant_slug:TENANT_SLUG},payload,getUtm());
    var res=await fetch(LEAD_INGEST_URL,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'apikey':SUPABASE_ANON_KEY,
        'Authorization':'Bearer '+SUPABASE_ANON_KEY
      },
      body:JSON.stringify(body)
    });
    if(!res.ok){var t=await res.text();throw new Error(t||'Lead ingest failed ('+res.status+')');}
    try{fireTracking(payload);}catch(_){}
  }

  /**
   * Generic form submit handler for landing pages.
   * Collects every [name] field in the form into the payload, maps commonly
   * aliased fields (agency/brand/company → company), then POSTs to lead-ingest.
   */
  window.handleSubmit=async function(e,origin,source){
    e.preventDefault();
    var form=e.target;
    var btn=form.querySelector('.form-submit');
    var originalHTML=btn?btn.innerHTML:'';
    if(btn){btn.innerHTML='Sending…';btn.disabled=true;btn.style.opacity='.7';}

    var data={};
    Array.prototype.forEach.call(form.elements,function(el){
      if(!el.name)return;
      var v=el.value;
      if(typeof v==='string')v=v.trim();
      if(v)data[el.name]=v;
    });

    // Map common aliases → canonical lead fields
    var company=data.company||data.agency||data.brand||data.startup||data.store||'';
    var message=[
      data.message,
      data.brief,
      data.scope,
      data.bottleneck,
      data.services,
      data.stage,
      data.size,
      data.revenue,
      data.platform,
      data.url||data.website?('Website: '+(data.url||data.website)):''
    ].filter(Boolean).join('\n').trim();

    var payload={
      name:data.name||'',
      email:data.email||'',
      phone:data.phone||undefined,
      company:company||undefined,
      message:message||undefined,
      project_type:data.scope||data.bottleneck||data.services||undefined,
      category:'inquiry',
      source:source||'landing-page',
      origin:origin||document.title
    };

    try{
      await submitLead(payload);
      if(btn){
        btn.innerHTML='✓ Thanks — we\'ll reply within 2h';
        btn.style.background='#769268';
        btn.style.opacity='1';
      }
      form.reset();
    }catch(err){
      if(btn){
        btn.innerHTML='✗ Try again';
        btn.style.background='#2C0405';
        btn.style.opacity='1';
        btn.disabled=false;
      }
      console.error('Lead submit failed:',err);
    }
  };
})();
