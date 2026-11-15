const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(require('node:path').join(__dirname,'../website files/app.js'),'utf8');
function fixture(saved){
 const storage=new Map(saved?[['ql.newFilePlacement',saved]]:[]);
 const scope=vm.createContext({quests:{a:{chapter:'one',sort_order:0},b:{chapter:'one',sort_order:1},c:{chapter:'one',sort_order:2},outside:{chapter:'two',sort_order:5}},chapters:{one:{order:0},two:{order:1},three:{order:2}},mode:'quest',currentFile:'b',touchFile(){},$:()=>null,localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,value)}});
 scope.questBoundCh=name=>scope.quests[name]?.chapter||null;
 vm.runInContext(source.slice(source.indexOf("const ORDER_FIELD="),source.indexOf('function moveInOrder(')),scope);
 return {scope,storage,order:(kind,chapter)=>Array.from(scope.orderedGroup(kind,chapter))};
}
test('default inserts new or duplicated quests immediately after the active quest',()=>{
 const f=fixture();f.scope.quests.new={chapter:'one',sort_order:99};f.scope.insertNewFile('quest','new');assert.deepEqual(f.order('quest','one'),['a','b','new','c']);assert.equal(f.scope.quests.outside.sort_order,5);
 assert.deepEqual(f.order('quest','one').map(n=>f.scope.quests[n].sort_order),[0,1,2,3]);
});
test('start/end placement works for quests and chapters',()=>{
 for(const kind of ['quest','chapter'])for(const position of ['start','end']){
  const f=fixture(position),data=kind==='quest'?f.scope.quests:f.scope.chapters;data.new=kind==='quest'?{chapter:'one'}:{};f.scope.insertNewFile(kind,'new');const ordered=f.order(kind,kind==='quest'?'one':null);assert.equal(position==='start'?ordered[0]:ordered.at(-1),'new');
 }
});
test('chapter insertion follows the active chapter or the chapter of the active quest',()=>{
 for(const mode of ['chapter','quest']){
  const f=fixture();f.scope.mode=mode;f.scope.currentFile=mode==='chapter'?'two':'b';f.scope.chapters.new={};f.scope.insertNewFile('chapter','new');assert.deepEqual(f.order('chapter'),mode==='chapter'?['one','two','new','three']:['one','new','two','three']);
 }
});
test('after-active fallback stays in the destination chapter and appends when no matching anchor exists',()=>{
 const f=fixture();f.scope.quests.new={chapter:'two'};f.scope.insertNewFile('quest','new');assert.deepEqual(f.order('quest','two'),['outside','new']);assert.equal(f.scope.quests.new.chapter,'two');
 f.scope.mode='chapter';f.scope.currentFile='one';f.scope.quests.another={chapter:'one'};f.scope.insertNewFile('quest','another');assert.equal(f.order('quest','one').at(-1),'another');
});
test('preference persists and invalid stored values fall back to after-active',()=>{
 const f=fixture('invalid');f.scope.setNewFilePlacement('start');assert.equal(f.storage.get('ql.newFilePlacement'),'start');f.scope.setNewFilePlacement('bad');assert.equal(f.storage.get('ql.newFilePlacement'),'after');
});
