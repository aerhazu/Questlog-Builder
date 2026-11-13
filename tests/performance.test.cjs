const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync(require('node:path').join(__dirname,'../website files/app.js'),'utf8');
function section(start,end){return source.slice(source.indexOf(start),source.indexOf(end,source.indexOf(start)));}
test('duplicate history snapshots avoid cloning and preserve independent undo state',()=>{
 let clones=0;
 const scope=vm.createContext({quests:{'a.json':{title:'A',objectives:[{custom:7}]}},chapters:{},mode:'quest',currentFile:'a.json',historyRestoring:false,undoStack:[],redoStack:[],HISTORY_LIMIT:60,getNs:()=> 'test',$:()=>({checked:false}),updateHistoryButtons(){},scheduleAutosave(){}});
 scope.cloneProjectState=()=>{clones++;return JSON.parse(JSON.stringify({namespace:'test',quests:scope.quests,chapters:scope.chapters,mode:scope.mode,currentFile:scope.currentFile,rawMode:false}));};
 vm.runInContext(section('function stateSig(', 'function updateHistoryButtons(')+section('let historySnapshotSignatures=', 'function syncVisibleStateForHistory('),scope);
 for(let i=0;i<100;i++)scope.pushHistorySnapshot();
 assert.equal(clones,1);assert.equal(scope.undoStack.length,1);
 scope.quests['a.json'].title='B';scope.pushHistorySnapshot();assert.equal(clones,2);assert.equal(scope.undoStack[0].quests['a.json'].title,'A');
 assert.equal(scope.undoStack[1].quests['a.json'].objectives[0].custom,7);
 scope.undoStack.pop();scope.quests['a.json'].title='A';scope.pushHistorySnapshot();assert.equal(clones,2);
});
test('scoped chapter lookup preserves reference matching and does not retain stale misses',()=>{
 const scope=vm.createContext({chapters:{'one.json':{},'nested/two.json':{}},chapterBase:x=>String(x).replace(/\.json$/i,'')});
 vm.runInContext(section('function chapterRefLevel(', '// Accepts "name"'),scope);
 for(const ref of ['one','one.json','namespace:one'])assert.equal(scope.chapterFileForRef(ref),'one.json');
 vm.runInContext('chapterLookupBatch=new Map()',scope);assert.equal(scope.chapterFileForRef('other'),null);
 vm.runInContext('chapterLookupBatch=null',scope);scope.chapters['other.json']={};assert.equal(scope.chapterFileForRef('other'),'other.json');
 delete scope.chapters['one.json'];assert.equal(scope.chapterFileForRef('one'),null);
});
test('autosave scope views serialize identically while normal export bundles remain isolated',()=>{
 const draft={questMenu:{'a.json':{texture:'data:png',layers:[{name:'paint'}]}},questList:null,activeKey:'quest:a.json'};
 const history={questMenu:{'a.json':{undo:[{pixels:[1,2,3]}]}},questList:null,activeKey:'quest:a.json'};
 const scope=vm.createContext({guiStudioDraftScopes:draft,guiStudioHistoryScopes:history,guiStudioSaveActiveDraftToScope(){},guiStudioPruneScopedDrafts(){},guiStudioSaveActiveHistoryToScope(){},guiStudioPruneHistoryScopes(){},cloneGuiStudioDraft:structuredClone,cloneGuiStudioValue:structuredClone});
 vm.runInContext(section('function guiStudioScopedDraftBundle(', 'function guiStudioSplitLegacyDraftIntoScopes(')+section('function guiStudioHistoryBundle(', 'function restoreGuiStudioHistoryScopes('),scope);
 for(const name of ['guiStudioScopedDraftBundle','guiStudioHistoryBundle']){
  const copy=scope[name](),view=scope[name](false);assert.equal(JSON.stringify(copy),JSON.stringify(view));assert.notEqual(copy.quests,view.quests);
  copy.quests.extra={};assert.equal(view.quests.extra,undefined);
 }
});
