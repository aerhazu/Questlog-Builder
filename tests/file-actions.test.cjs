const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync(require('node:path').join(__dirname,'../website files/app.js'),'utf8');
function slice(a,b){return source.slice(source.indexOf(a),source.indexOf(b,source.indexOf(a)));}
function fixture(){
 let pending,snapshots=0;
 const scope=vm.createContext({quests:{'a.json':{chapter:'mod:one'},'b.json':{chapter:'one'},'c.json':{chapter:'two'}},chapters:{'one.json':{default_chapter:true},'two.json':{}},fileMeta:{'quest:a.json':{}},currentFile:'one.json',mode:'chapter',sidebarSelection:new Set(),sidebarAnchor:null,chapterBase:f=>f.replace(/\.json$/i,''),chapterIdFor:f=>f.replace(/\.json$/i,''),sidebarKey:(kind,file)=>JSON.stringify([kind,file]),metaKey:(kind,file)=>kind+':'+file,showMsg(){},openConfirmModal:o=>{pending=o;},syncVisibleStateForHistory(){},pushHistorySnapshot:()=>snapshots++,normalizeDefaultChapter(){},recordActivity(){},closeBulkDeleteModal(){},renderFileList(){},renderMain(){},renderValidation(){},scheduleAutosave(){},defQ:()=>({title:'New Quest',requirements:[],objectives:[],rewards:[]}),insertNewFile(kind,file){scope.quests[file].sort_order=Object.values(scope.quests).filter(q=>q.chapter===scope.quests[file].chapter).length-1;},touchFile(){},selectFile(file,kind){scope.currentFile=file;scope.mode=kind;}});
 vm.runInContext(slice('function chapterRefLevel(', '// Accepts "name"')+slice('function questBoundCh(', 'function bindQ(')+slice('function requestDeleteFiles(', '// ── Events'),scope);
 return {scope,pending:()=>pending,snapshots:()=>snapshots};
}
test('chapter-only deletion keeps quests; cascade matches namespaced and plain chapter references',()=>{
 let f=fixture();f.scope.requestChapterDelete('one.json',false);assert.ok(f.scope.chapters['one.json']);f.pending().onConfirm();assert.equal(f.scope.chapters['one.json'],undefined);assert.equal(Object.keys(f.scope.quests).length,3);
 f=fixture();f.scope.requestChapterDelete('one.json',true);f.pending().onConfirm();assert.equal(Object.keys(f.scope.quests).join(','),'c.json');assert.ok(f.scope.chapters['two.json']);assert.equal(f.snapshots(),1);
});
test('selection deletion ignores stale entries, deduplicates files, and leaves data intact until confirmed',()=>{
 const f=fixture();f.scope.sidebarSelection.add(JSON.stringify(['quest','a.json']));
 f.scope.requestDeleteFiles([{kind:'quest',file:'a.json'},{kind:'quest',file:'a.json'},{kind:'quest',file:'missing.json'}]);
 assert.match(f.pending().title,/1 selected file/);assert.equal(Object.keys(f.scope.quests).length,3);assert.equal(f.snapshots(),0);
 f.pending().onConfirm();assert.ok(f.scope.quests['b.json']);assert.equal(f.scope.quests['a.json'],undefined);assert.equal(f.scope.fileMeta['quest:a.json'],undefined);assert.equal(f.scope.sidebarSelection.size,0);assert.equal(f.snapshots(),1);
});
test('new quests inherit the active chapter from chapter or quest editors with unique filenames',()=>{
 const f=fixture();f.scope.createNewQuest();assert.equal(f.scope.quests['new_quest.json'].chapter,'one');assert.equal(f.scope.currentFile,'new_quest.json');
 f.scope.currentFile='c.json';f.scope.mode='quest';f.scope.createNewQuest();assert.equal(f.scope.quests['new_quest_1.json'].chapter,'two');assert.equal(f.scope.quests['a.json'].chapter,'mod:one');
});
test('chapter cascade includes quests implicitly bound to main and keeps unrelated quests',()=>{
 const f=fixture();f.scope.chapters['main.json']={};f.scope.quests['implicit.json']={};f.scope.requestChapterDelete('main.json',true);f.pending().onConfirm();assert.equal(f.scope.quests['implicit.json'],undefined);assert.ok(f.scope.quests['a.json']);
});
test('file deletion shortcuts ignore text fields, dialogs, modified keys and Canvas background',()=>{
 let handler,requests=0,modal=false;
 const scope=vm.createContext({document:{body:{dataset:{layout:'classic'}},addEventListener:(name,fn)=>{handler=fn;},querySelector:()=>modal},guiStudioModalOpen:()=>false,sidebarSelection:new Set([JSON.stringify(['quest','a.json'])]),quests:{'a.json':{}},chapters:{},requestDeleteFiles:()=>requests++});
 const first=source.indexOf(" document.addEventListener('keydown',event=>{",source.indexOf('function initEditorImprovements('));
 const start=source.indexOf(" document.addEventListener('keydown',event=>{",first+1),end=source.indexOf('\n });',start)+5;
 vm.runInContext(source.slice(start,end),scope);
 const event=(key,extra={})=>({key,target:{closest:()=>false},preventDefault(){this.defaultPrevented=true;},...extra});
 handler(event('Delete'));handler(event('Backspace'));assert.equal(requests,2);
 handler(event('Delete',{target:{closest:()=>true}}));handler(event('Delete',{ctrlKey:true}));handler(event('Delete',{repeat:true}));modal=true;handler(event('Delete'));modal=false;
 scope.document.body.dataset.layout='canvas';handler(event('Delete'));assert.equal(requests,2);
 handler(event('Delete',{target:{closest:selector=>selector==='#fileList'}}));assert.equal(requests,3);
});
