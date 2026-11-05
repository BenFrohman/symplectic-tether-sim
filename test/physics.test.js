const assert=require('assert'),{MODES,fullDiag,lattice}=require('../src/physics.js');
const P={A:1,B:1,C:1};let fails=0;
for(const mode of ['abc','tg'])for(const [t,nu] of [[0,0.05],[2,0.05],[5,0.2],[1,0.01]]){
  const d=fullDiag(mode,t,nu,P,24),a=MODES[mode].analytic(t,nu,P),rel=(x,y)=>Math.abs(x-y)/Math.max(Math.abs(y),1e-12);
  const row={mode,t,nu,E:d.E,Ea:a.E,Z:d.Z,Za:a.Z,H:d.H,Ha:a.H,dEdt:d.dEdt,dEdta:a.dEdt,res:d.residual,relRes:d.relResidual,divMax:d.divMax,wMax:d.wMax};
  console.log(JSON.stringify(row,(k,v)=>typeof v==='number'?+v.toPrecision(8):v));
  try{assert(rel(d.E,a.E)<1e-10);assert(rel(d.Z,a.Z)<1e-4);assert(Math.abs(d.H-a.H)<1e-4*Math.max(1,a.E));assert(d.relResidual<1e-4);assert(d.divMax<1e-12);}catch(e){fails++;console.log('FAIL',mode,t,nu);}
}
const L=lattice(25);console.log('lattice points:',L.length/3);if(L.length/3!==15625)fails++;
if(fails){console.log(fails,'failures');process.exit(1);}console.log('ALL PASS');
