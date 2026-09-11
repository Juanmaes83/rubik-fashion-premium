/* Fashion capabilities extend the existing Studio / config API / media library. */
(() => {
  'use strict';
  const $=s=>document.querySelector(s), api=()=>window.RestaurantStudioConfig;
  const get=p=>api().get(p), set=(p,v)=>api().set(p,v);
  const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
  let frame, panel, report, lastSent='', syncToken=0, built=false;
  const labels={environment:'Escena · apertura de paredes',light:'Luz · hora azul',colorway:'Ropa · giro y color',fullLook:'Casting · salto y corte'};
  async function resolve(ref){
    if(!ref)return '';
    if(/^(retake\/|assets\/|\/[^/]|https?:\/\/)/.test(ref))return new URL(ref,location.href).href;
    return await window.RestaurantMedia.url(ref);
  }
  async function sync(){
    if(!built||!get('fashion'))return;
    const token=++syncToken, f=get('fashion');
    document.title=`${get('brand.name')} — Moda en movimiento`;
    const phone=$('.fashion-phone');phone.textContent=f.phone;phone.href=`tel:${String(f.phone).replace(/[^+0-9]/g,'')}`;
    $('.hero').classList.toggle('is-disabled',f.heroEnabled===false);
    for(const [key,selector] of Object.entries({story:'#story',signature:'#signature',experience:'#experience',campaign:'.experience-section',design:'.chef-section',visit:'#visit'}))$(selector).hidden=f.sections[key]===false;
    const secondary=$('.fashion-secondary-logo');
    secondary.hidden=!f.secondaryLogo;
    if(f.secondaryLogo)secondary.src=await resolve(f.secondaryLogo);
    const settings={brand:get('brand.name'),phone:f.phone,title:[get('hero.line1'),get('hero.line2')].filter(Boolean).join(' '),description:get('hero.body'),logo:$('.brand-visual img')?.src||'',secondaryLogo:secondary.src||'',base:await resolve(f.active.base),clips:[]};
    for(const [id,c] of Object.entries(f.active.clips))settings.clips.push({id,src:await resolve(c.ref),guard:Number(c.guard)||0});
    if(token!==syncToken)return;
    const signature=JSON.stringify(settings);
    if(signature!==lastSent){lastSent=signature;frame.contentWindow?.postMessage({type:'rubik-hero-config',settings},location.origin);}
    for(const n of panel.querySelectorAll('[data-fashion-text]'))n.textContent=String(get(n.dataset.fashionText)||'Sin asignar').split('/').pop();
    for(const n of panel.querySelectorAll('[data-fashion-check]'))n.checked=get(n.dataset.fashionCheck)!==false;
    for(const n of panel.querySelectorAll('[data-fashion-guard]'))if(document.activeElement!==n)n.value=get(n.dataset.fashionGuard);
    const phoneInput=$('#fashion-phone-input');if(document.activeElement!==phoneInput)phoneInput.value=f.phone;
    // Public conversion reuses the existing contact CTA, without the restaurant demo form.
    document.querySelectorAll('.reserve-open').forEach(b=>{b.onclick=()=>window.open(`https://wa.me/${String(get('fashion.phone')).replace(/\D/g,'').replace(/^(\d{9})$/,'34$1')}`,'_blank','noopener,noreferrer');});
  }
  function message(text,error=false){report.textContent=text;report.dataset.error=String(error);}
  async function upload(path,file,kind){
    if(!file)return;
    try{
      if(file.size>60*1024*1024)throw new Error('Usa archivos de hasta 60 MB por pieza.');
      if(kind==='video'&&!['video/mp4','video/webm'].includes(file.type))throw new Error('Selecciona un MP4 o WebM.');
      if(kind==='image'&&!['image/png','image/jpeg','image/webp','image/svg+xml'].includes(file.type))throw new Error('Selecciona PNG, JPG, WebP o SVG.');
      message('Guardando archivo en la biblioteca…');
      const ref=`project/fashion/${crypto.randomUUID()}/${file.name.replace(/[^a-zA-Z0-9._-]/g,'_')}`;
      await window.RestaurantMedia.save(ref,file);set(path,ref);
      message('Archivo guardado en este navegador. El pack activo no cambia hasta que pulses Validar y aplicar.');
    }catch(err){message(err.message,true);}
  }
  function asset(label,path,kind){
    const card=el('article','fashion-asset');card.append(el('strong','',label));
    const value=el('small');value.dataset.fashionText=path;value.textContent=String(get(path)||'Sin asignar').split('/').pop();card.append(value);
    const actions=el('div','fashion-asset-actions'),uploadLabel=el('label','fashion-file','Subir archivo');
    const input=el('input');input.type='file';input.accept=kind==='video'?'video/mp4,video/webm':'image/png,image/jpeg,image/webp,image/svg+xml';input.setAttribute('aria-label',`Subir ${label}`);
    input.addEventListener('change',()=>upload(path,input.files[0],kind));uploadLabel.append(input);actions.append(uploadLabel);
    const choose=el('button','','Biblioteca');choose.type='button';choose.addEventListener('click',async()=>{const picked=await window.RestaurantMediaPicker.open({kind,title:label});if(picked){set(path,picked.ref);message('Referencia asignada. Valida el pack antes de aplicarlo.');}});actions.append(choose);
    const restore=el('button','','Restaurar');restore.type='button';restore.addEventListener('click',()=>{const v=path.split('.').reduce((o,k)=>o?.[k],window.RestaurantDefaults);set(path,v||'');});actions.append(restore);card.append(actions);return card;
  }
  function probe(src,kind){return new Promise((resolveProbe,reject)=>{
    if(!src){reject(new Error('Falta un archivo asignado.'));return;}
    const node=document.createElement(kind==='video'?'video':'img');let timer;
    const finish=(error,result)=>{clearTimeout(timer);node.onload=node.onerror=node.onloadeddata=null;if(kind==='video'){node.pause();node.removeAttribute('src');node.load();}error?reject(error):resolveProbe(result);};
    timer=setTimeout(()=>finish(new Error('No se pudo decodificar el archivo en 15 segundos.')),15000);
    node.onerror=()=>finish(new Error('Archivo no compatible o no disponible.'));
    if(kind==='video'){node.muted=true;node.preload='auto';node.onloadeddata=()=>finish(null,{width:node.videoWidth,height:node.videoHeight,duration:node.duration});}
    else node.onload=()=>finish(null,{width:node.naturalWidth,height:node.naturalHeight});
    node.src=src;
  });}
  async function applyPack(button){
    button.disabled=true;message('Validando la imagen base y los ocho vídeos…');
    try{
      const draft=structuredClone(get('fashion.draft'));
      const base=await probe(await resolve(draft.base),'image');
      if(Math.abs(base.width/base.height-16/9)>.025)throw new Error('La imagen base debe tener proporción 16:9.');
      for(const [id,c] of Object.entries(draft.clips)){
        const info=await probe(await resolve(c.ref),'video');
        if(Math.abs(info.width/info.height-base.width/base.height)>.025)throw new Error(`${id}: el encuadre debe ser 16:9, como la base.`);
        if(!Number.isFinite(info.duration)||info.duration<.4||info.duration>30)throw new Error(`${id}: usa un vídeo de 0,4 a 30 segundos.`);
        if(!Number.isFinite(Number(c.guard))||c.guard<0||c.guard>=info.duration-.1)throw new Error(`${id}: margen final incompatible con su duración.`);
      }
      set('fashion.active',draft);
      message('Pack aplicado. Comprueba visualmente las cuatro idas y vueltas: la validación técnica no comprueba identidad, color ni continuidad.');
    }catch(err){message(`No se ha cambiado el pack activo. ${err.message}`,true);}finally{button.disabled=false;}
  }
  function showPanel(){
    document.querySelectorAll('.studio-nav button').forEach(b=>b.classList.toggle('active',b.dataset.panel==='fashion'));
    document.querySelectorAll('.studio-panel').forEach(p=>p.hidden=p!==panel);
    $('#studio-scroll').scrollTop=0;
  }
  function build(){
    if(built||!window.RestaurantMedia||!window.RestaurantMediaPicker||!api())return false;
    // Defaults use the blonde campaign. An explicitly selected archive stays selected.
    built=true;
    frame=el('iframe','fashion-hero-frame');frame.title='Campaña de moda interactiva';frame.src='assets/fashion-hero/index.html';frame.allow='autoplay';$('.hero').append(frame);
    frame.addEventListener('load',()=>{lastSent='';sync();});
    window.addEventListener('message',e=>{if(e.origin===location.origin&&e.source===frame.contentWindow&&e.data?.type==='rubik-hero-ready'){lastSent='';sync();}});
    const phone=el('a','fashion-phone');$('.topbar .nav-actions').prepend(phone);
    const logo=el('img','fashion-secondary-logo');logo.alt='Marca colaboradora';logo.hidden=true;$('.topbar .brand').after(logo);
    const tab=el('button','','Hero · Moda');tab.type='button';tab.dataset.panel='fashion';$('.studio-nav').prepend(tab);tab.addEventListener('click',showPanel);
    panel=el('section','studio-panel');panel.dataset.panel='fashion';panel.hidden=true;
    const intro=el('div','panel-intro');intro.append(el('p','eyebrow','CAMPAÑA INTERACTIVA'),el('h3','','Tu hero, tu colección.'),el('p','','Cambia la imagen base y las cuatro parejas desde la biblioteca compartida. Prepara todos los archivos antes de aplicar el pack.'));
    panel.append(intro);
    report=el('p','fashion-feedback','Los cambios se guardan en este navegador. Este Studio todavía no sincroniza entre ordenadores.');report.setAttribute('role','status');panel.append(report);
    const toggles=el('div','fashion-section-toggles');
    for(const [label,path] of [['Hero interactivo','fashion.heroEnabled'],['La marca','fashion.sections.story'],['Colección','fashion.sections.signature'],['Editorial','fashion.sections.experience'],['Campaña','fashion.sections.campaign'],['Diseño','fashion.sections.design'],['Contacto','fashion.sections.visit']]){
      const wrap=el('label'),input=el('input');input.type='checkbox';input.checked=get(path)!==false;input.dataset.fashionCheck=path;input.addEventListener('change',()=>set(path,input.checked));wrap.append(input,document.createTextNode(label));toggles.append(wrap);
    }panel.append(toggles);
    const actions=el('div','fashion-action-row'),apply=el('button','','Validar y aplicar pack'),preview=el('button','','Ver la web'),prompts=el('a','','Abrir prompts');
    apply.id='fashion-apply-pack';apply.type='button';apply.onclick=()=>applyPack(apply);preview.type='button';preview.onclick=()=>{window.RestaurantStudioShell.close();$('.hero').scrollIntoView({behavior:'smooth'});};prompts.href='docs/PROMPTS-MODA-RUBIK.md';prompts.target='_blank';prompts.rel='noopener';actions.append(apply,preview,prompts);panel.append(actions);
    const grid=el('div','fashion-pack-grid');grid.append(asset('Imagen base','fashion.draft.base','image'));
    for(const [scene,label] of Object.entries(labels))for(const [direction,way] of [['forward','ida'],['reverse','vuelta']]){
      const path=`fashion.draft.clips.${scene}-${direction}`,card=asset(`${label} · ${way}`,`${path}.ref`,'video');
      const wrap=el('label','','Margen antes del final (s)'),input=el('input');input.type='number';input.min='0';input.max='3';input.step='.01';input.value=get(`${path}.guard`);input.dataset.fashionGuard=`${path}.guard`;input.setAttribute('aria-label',`${label} ${way} margen final`);input.onchange=()=>set(`${path}.guard`,Number(input.value));wrap.append(input);card.append(wrap);grid.append(card);
    }
    const refs=el('details'),summary=el('summary','','Imágenes destino para preparar nuevos vídeos');refs.append(summary);
    for(const [scene,label] of Object.entries(labels))refs.append(asset(label,`fashion.draft.references.${scene}`,'image'));
    grid.append(refs);panel.append(grid);$('#studio-scroll').prepend(panel);
    const brand=el('div','fashion-brand-extra'),phoneLabel=el('label','','Teléfono de marca'),phoneInput=el('input');phoneInput.id='fashion-phone-input';phoneInput.type='text';phoneInput.value=get('fashion.phone');phoneInput.oninput=()=>set('fashion.phone',phoneInput.value);phoneLabel.append(phoneInput);brand.append(phoneLabel,asset('Logo adicional','fashion.secondaryLogo','image'));$('.studio-panel[data-panel="brand"]').append(brand);
    $('.studio-titleline small').textContent='RUBIK · FASHION STUDIO';
    document.querySelectorAll('.desktop-nav a').forEach((a,i)=>a.textContent=['Colección','La marca','Editorial','Contacto'][i]||a.textContent);
    document.querySelectorAll('.studio-panel[data-panel="dishes"] .studio-help').forEach(p=>p.textContent='Usa fotografías de prendas o looks con encuadre consistente. Este catálogo reutiliza el motor de productos existente. Composición, confección, combinaciones y tallas se editan aquí.');
    const note=el('span','fashion-footer-note','Imágenes de demostración');$('footer').append(note);
    $('.orbit-shell').setAttribute('aria-label','Colección interactiva. Usa las flechas o arrastra para navegar.');
    const tuneNav=()=>{const memories=$('.studio-nav [data-panel="memories"]');if(memories&&memories.textContent!=='Lookbook')memories.textContent='Lookbook';};
    new MutationObserver(tuneNav).observe($('.studio-nav'),{childList:true});tuneNav();
    document.addEventListener('restaurant:config-applied',sync);sync();return true;
  }
  const timer=setInterval(()=>{if(build())clearInterval(timer);},100);
  setTimeout(()=>clearInterval(timer),15000);
})();
