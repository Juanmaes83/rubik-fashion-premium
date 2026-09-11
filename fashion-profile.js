/* Fashion profile over the canonical restaurant project contract; no parallel catalog/store. */
(() => {
  const d=window.RestaurantDefaults;
  d.id='rubik-fashion';
  d.brand={...d.brand,name:'RUBIK SOTA',logoText:'RUBIK SOTA',accent:'#c5ec9b',ink:'#101110',paper:'#eeeee7'};
  d.header={links:[['Colección','#signature'],['La marca','#story'],['Editorial','#experience'],['Contacto','#visit']],studioLabel:'Studio',reserveLabel:'Contactar'};
  d.hero={kicker:'RUBIK SOTA · 629554870',line1:'Moda en',line2:'movimiento',body:'Una colección. Cuatro formas de verla. Explora la escena, la luz, el color y el casting.',cta:'Descubrir colección',stamp:'RUBIK SOTA',scroll:'DESCUBRE LA COLECCIÓN ↓'};
  d.philosophy={index:'01 / La marca',title:'Vestir es una forma de estar en el mundo.',body1:'Color, textura y movimiento. Un espacio para descubrir cada look desde una nueva perspectiva.',body2:'Explora la colección, cambia de escenario y encuentra tu propia manera de llevarla.'};
  d.orbital={index:'02 / Colección',kicker:'Arrastra · explora · descubre',title:'Looks con carácter.',explore:'Descubrir look'};
  d.origin={index:'03 / Editorial',title:'Una silueta. Otra mirada.',body:'La misma actitud en distintos escenarios. Descubre los detalles y las combinaciones de nuestra selección visual.',caption:'RUBIK SOTA / Editorial'};
  d.atmosphere={index:'04 / Campaña',title:'El color cambia las reglas.',caption:'RUBIK SOTA / En movimiento',body:'Una forma de explorar prendas, escenarios y luz. Cada imagen abre una posibilidad.',cta:'Hablemos de tu look →'};
  d.chef={index:'05 / Diseño',title:'El detalle define el conjunto.',quote:'Texturas que se ven. Siluetas que se recuerdan.',badges:['Color','Textura','Movimiento']};
  d.visit={kicker:'RUBIK SOTA',title:'Encuentra tu próxima mirada.',cta:'Consultar por WhatsApp',addressLabel:'Atención',address:'Consulta disponibilidad y citas.',serviceLabel:'Tu colección',service:'Prendas, looks y nuevas perspectivas.',contactLabel:'Teléfono',contact:'629554870',bookingUrl:'https://wa.me/34629554870'};
  d.footer={left:'RUBIK SOTA',center:'Moda en movimiento',right:'629554870'};
  d.media={hero:{type:'image',url:'assets/campaigns/blonde-v1/state-base.png'},origin:{type:'image',url:'assets/campaigns/blonde-v1/state-environment.png'},atmosphere:{type:'image',url:'assets/campaigns/blonde-v1/state-colorway.png'},chef:{type:'image',url:'assets/campaigns/blonde-v1/keyframe-full-look-v3.png'}};
  d.dishes=[['look-01','Lavender day','Color · Textura','state-base.png'],['look-02','Cobalt edit','Azul · Contraste','state-colorway.png'],['look-03','Red statement','Rojo · Movimiento','keyframe-full-look-v3.png']].map(([id,name,meta,image])=>({id,name,meta,short:'Look editorial de demostración. Consulta las prendas y su disponibilidad.',price:'',image:`assets/campaigns/blonde-v1/${image}`,ingredients:'Pendiente de catálogo',origin:'Editorial de demostración',technique:'Pendiente de catálogo',pairing:'Consulta combinaciones',note:'Imagen de campaña de demostración; no representa un producto a la venta.',allergens:'Consultar',enabled:true}));
  const pack={base:'assets/campaigns/blonde-v1/state-base.png',references:{colorway:'assets/campaigns/blonde-v1/state-colorway.png',environment:'assets/campaigns/blonde-v1/state-environment.png',light:'assets/campaigns/blonde-v1/keyframe-light-shift-v2.png',fullLook:'assets/campaigns/blonde-v1/keyframe-full-look-v3.png'},clips:{}};
  for(const [scene,n] of [['environment',2],['light',3],['colorway',1],['fullLook',4]])for(const direction of ['forward','reverse'])pack.clips[`${scene}-${direction}`]={ref:`assets/campaigns/blonde-v1/video-${n}${direction==='reverse'?'-reverse':''}.mp4`,guard:.04};
  d.fashion={enabled:true,phone:'629554870',secondaryLogo:'',heroEnabled:true,sections:{story:true,signature:true,experience:true,campaign:true,design:true,visit:true},active:structuredClone(pack),draft:structuredClone(pack)};
  if(d.modules){for(const key of Object.keys(d.modules))if(d.modules[key]&&typeof d.modules[key]==='object')d.modules[key].enabled=false;}
  d.motion.media.hero='still';
})();
