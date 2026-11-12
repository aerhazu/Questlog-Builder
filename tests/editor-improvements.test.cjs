const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../website files/app.js'),'utf8');
function functionSource(name,next){return source.slice(source.indexOf('function '+name+'('),source.indexOf('function '+next+'('));}
test('JSON highlighting escapes HTML and preserves original text',()=>{
 const scope=vm.createContext({esc:s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')});
 vm.runInContext(functionSource('highlightJsonText','initEditorImprovements'),scope);
 const text=JSON.stringify({key:'<script>"test"',number:-2.5e4,boolean:true,nil:null},null,2);
 const html=scope.highlightJsonText(text);
 for(const kind of ['key','string','number','boolean','null'])assert.ok(html.includes('json-'+kind));
 assert.ok(!html.includes('<script>'));
 const decoded=html.replace(/<\/?span[^>]*>/g,'').replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
 assert.equal(decoded,text);
});
test('experience exports use levels while accepting legacy level',()=>{
 const scope=vm.createContext({});vm.runInContext(functionSource('finR','finO'),scope);
 const reward={type:'questlog:experience',experience:5,level:true};scope.finR(reward);
 assert.equal(reward.levels,true);assert.equal(reward.level,undefined);
});
test('project shortcuts undo and redo without overriding text editing or Canvas',()=>{
 let handler,undo=0,redo=0,prevented=0;
 const document={body:{dataset:{layout:'classic'}},addEventListener:(name,callback)=>{handler=callback;}};
 const scope=vm.createContext({document,guiStudioModalOpen:()=>false,undoWorkbenchOrProject:()=>undo++,redoWorkbenchOrProject:()=>redo++});
 const start=source.indexOf(" document.addEventListener('keydown',event=>{",source.indexOf('function initEditorImprovements('));
 const end=source.indexOf('\n });',start)+5;
 vm.runInContext(source.slice(start,end),scope);
 const event=(key,extra={})=>({key,ctrlKey:true,target:{closest:()=>false},preventDefault:()=>prevented++,...extra});
 handler(event('z'));handler(event('z',{shiftKey:true}));handler(event('y'));
 assert.equal(undo,1);assert.equal(redo,2);assert.equal(prevented,3);
 handler(event('z',{target:{closest:()=>true}}));
 document.body.dataset.layout='canvas';handler(event('z'));
 assert.equal(undo,1);assert.equal(prevented,3);
});
