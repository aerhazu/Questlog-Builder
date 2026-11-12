const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../website files/gui-atlas.js'),'utf8');
test('QuestlogGuiSet panel nine-slice preserves 16-unit corners and stretches centers',()=>{
 const context=vm.createContext({});
 vm.runInContext(source.slice(source.indexOf('function nineSlice('),source.indexOf('function panel(')),context);
 const calls=[],ctx={drawImage:(...args)=>calls.push(args)};
 context.nineSlice(ctx,{}, {x:375,y:174,w:275,h:166},340,200);
 assert.equal(ctx.imageSmoothingEnabled,false);assert.equal(calls.length,9);
 assert.deepEqual(calls[0].slice(1),[375,174,16,16,0,0,16,16]);
 assert.deepEqual(calls[4].slice(1),[391,190,243,134,16,16,308,168]);
 assert.deepEqual(calls[8].slice(1),[634,324,16,16,324,184,16,16]);
});
test('live CSS no longer requests pre-generated GUI PNGs',()=>{
 const css=fs.readFileSync(path.join(__dirname,'../website files/style.css'),'utf8');
 assert.ok(!css.includes('questlog-assets/gui/generated/'));
 assert.ok(css.includes('--ql-atlas-button'));
});
test('atlas imports are mounted globally rather than in the quest form',()=>{
 const app=fs.readFileSync(path.join(__dirname,'../website files/app.js'),'utf8');
 const controls=app.slice(app.indexOf('function mountGuiAtlasControls('),app.indexOf('function bindQForm('));
 assert.ok(controls.includes("$('#preferencesProject')"));
 assert.ok(!controls.includes("$('#advancedLayoutGuiStudioBtn')"));
 assert.ok(!/function bindQForm\(\)\{\s*mountGuiAtlasControls\(\);/.test(app));
 assert.match(app,/initEditorImprovements\(\);\s*mountGuiAtlasControls\(\);/);
});
