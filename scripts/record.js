// Usage: NODE_PATH=<dir with playwright> node scripts/record.js <mode> <nu> <tEnd> <fps-in-video> <outdir>
const {chromium}=require('playwright'),path=require('path');
(async()=>{const [mode='abc',nu='0.05',tEnd='30',N='240',out='/tmp/rec']=process.argv.slice(2);
 const b=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});const pg=await b.newPage({viewport:{width:1280,height:720}});
 const errs=[];pg.on('pageerror',e=>errs.push(e.message));
 await pg.goto('file://'+path.resolve(__dirname,'../index.html')+`?mode=${mode}&nu=${nu}&t=0&fig=1`);await pg.waitForFunction(()=>window.__diag);
 require('fs').mkdirSync(out,{recursive:true});const log=[];
 for(let i=0;i<=+N;i++){const T=+tEnd*i/+N;await pg.evaluate(T=>window.stepTo(T),T);await pg.waitForTimeout(30);
  await pg.screenshot({path:`${out}/f${String(i).padStart(4,'0')}.png`});const d=await pg.evaluate(()=>window.__diag);if(i%40==0)log.push(d);}
 console.log(JSON.stringify(log.map(d=>({t:+d.t.toFixed(3),E:d.E,Ea:d.an.E,Z:d.Z,Za:d.an.Z,H:d.H,res:d.residual,rel:d.relResidual,div:d.divMax,wMax:d.wMax,n:d.n}))));
 console.log('errors:',errs);await b.close();})();
