// Usage: NODE_PATH=<dir with playwright> node films/render.js <film abc|tg|p2q> <frames> <tEnd> <outdir> [only-frame-indices,comma]
const {chromium}=(()=>{try{return require('playwright')}catch(e){return require('playwright-core')}})(),path=require('path'),fs=require('fs');
(async()=>{const [film,NF,tend,out,only]=process.argv.slice(2);fs.mkdirSync(out,{recursive:true});
 const b=await chromium.launch({executablePath:process.env.CHROME||undefined,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
 const pg=await b.newPage({viewport:{width:1920,height:1080}});const errs=[];pg.on('pageerror',e=>errs.push(e.message));pg.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 await pg.goto('file://'+path.resolve(__dirname,'film.html')+`?film=${film}&frames=${NF}&tend=${tend}`);await pg.waitForFunction(()=>window.__ready,null,{timeout:60000});
 const idx=only?only.split(',').map(Number):[...Array(+NF).keys()];const log=[];let worst=0,maxdiv=0;
 for(const i of idx){const d=await pg.evaluate(i=>window.frame(i),i);worst=Math.max(worst,d.rel);maxdiv=Math.max(maxdiv,d.div);
  await pg.screenshot({path:`${out}/f${String(i).padStart(4,'0')}.jpg`,type:'jpeg',quality:94});if(i%150==0||only)log.push(d);if(i%100==0)console.error(film,i);}
 fs.writeFileSync(`${out}/diag.json`,JSON.stringify({film,frames:+NF,tend:+tend,worstRelResidual:worst,maxDiv:maxdiv,samples:log,errors:errs},null,1));
 console.log(film,'worstRel',worst,'maxDiv',maxdiv,'errors',errs);await b.close();})();
