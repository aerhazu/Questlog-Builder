/* QuestLog 3.5.4 QuestlogGuiSet / NineSliceTexture atlas coordinates.
   Crops are derived in memory from original atlases, never bundled slices. */
(function(){
'use strict';
const root=new URL('./',document.currentScript.src);
const specs={questPage:['quest_page.png',1024,512],peripherals:['quest_peripherals.png',256,256],searchTabs:['questlog_search_tab_buttons.png',256,256],questlog:['questlog.png',1024,512]};
const images={},panels=new Map();let overrides={};
const regions={};
function region(name,key,x,y,w,h){regions[name]={key,x,y,w,h};}
region('quest_detail_panel','questPage',375,174,275,166);
[['button',46,65,54,18],['button_hover',122,65,54,18],['button_long',12,105,88,18],['button_long_hover',122,105,88,18],['important',2,2,28,36],['panel_hr',2,157,140,9],['small_hr',2,135,252,9],['big_hr',2,146,252,9],['scrollbar_thumb',32,2,28,36],['scrollbar_track',62,20,16,1],['scrollbar_track_top',62,19,16,1],['scrollbar_track_bottom',62,21,16,1]].forEach(([n,x,y,w,h])=>region(n,'peripherals',x,y,w,h));
[['search_tab_minimized',2,2,58,55],['search_tab_minimized_hover',62,2,58,55],['search_tab_expanded',2,59,252,55],['search_tab_expanded_hover',2,116,252,55],['arrow_left',2,173,28,27],['arrow_left_hover',32,173,28,27],['arrow_right',2,202,28,27],['arrow_right_hover',32,202,28,27],['tab_secondary',62,174,54,32],['tab_secondary_active',62,208,54,39],['tab_main',118,174,54,32],['tab_main_active',118,208,54,39],['expand_button',122,2,26,26],['expand_button_hover',150,2,26,26],['condense_button',122,30,26,26],['condense_button_hover',150,30,26,26],['hidden_button',180,2,26,26],['hidden_button_hover',208,2,26,26],['visible_button',180,30,26,26],['visible_button_hover',208,30,26,26]].forEach(([n,x,y,w,h])=>region(n,'searchTabs',x,y,w,h));
function canvas(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c;}
function crop(r){const c=canvas(r.w,r.h);c.getContext('2d').drawImage(images[r.key],r.x,r.y,r.w,r.h,0,0,r.w,r.h);return c.toDataURL();}
function nineSlice(ctx,img,r,w,h){
 const sx=[r.x,r.x+16,r.x+r.w-16],sy=[r.y,r.y+16,r.y+r.h-16];
 const sw=[16,r.w-32,16],sh=[16,r.h-32,16],dw=[16,w-32,16],dh=[16,h-32,16];
 const dx=[0,16,w-16],dy=[0,16,h-16];ctx.imageSmoothingEnabled=false;
 for(let y=0;y<3;y++)for(let x=0;x<3;x++)if(dw[x]>0&&dh[y]>0)ctx.drawImage(img,sx[x],sy[y],sw[x],sh[y],dx[x],dy[y],dw[x],dh[y]);
}
function panel(w,h){w=Math.max(32,Math.round(w));h=Math.max(32,Math.round(h));const key=w+'x'+h;if(panels.has(key))return panels.get(key);if(!images.questPage)return '';const c=canvas(w,h);nineSlice(c.getContext('2d'),images.questPage,regions.quest_detail_panel,w,h);const url=c.toDataURL();if(panels.size>64)panels.clear();panels.set(key,url);return url;}
function load(src){return new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>reject(new Error('Unable to load GUI atlas: '+src.slice(0,100)));image.src=src;});}
function metadata(){try{return JSON.parse(localStorage.getItem('ql.export.metadata.v1')||'{}');}catch{return {};}}
async function restore(values=metadata().guiTextures||{}){
 const next={};for(const [key,spec]of Object.entries(specs)){if(values[key]&&(typeof values[key]!=='string'||!values[key].startsWith('data:image/png;base64,')))throw new Error('Custom GUI atlases must be embedded PNG data');const image=await load(values[key]||new URL('questlog-assets/gui/'+spec[0],root).href);if(image.naturalWidth!==spec[1]||image.naturalHeight!==spec[2])throw new Error(spec[0]+' must be '+spec[1]+' × '+spec[2]+' pixels');next[key]=image;}
 Object.assign(images,next);overrides={...values};panels.clear();
 document.documentElement.style.setProperty('--ql-atlas-questlog','url("'+window.QUESTLOG_GUI_ATLAS.url('questlog')+'")');
 for(const [name,r]of Object.entries(regions))document.documentElement.style.setProperty('--ql-atlas-'+name,'url("'+crop(r)+'")');
 window.dispatchEvent(new Event('questlog-gui-atlas-changed'));
}
async function importPng(key,file){
 if(!specs[key])throw new Error('Unsupported atlas');if(file.size>8*1024*1024)throw new Error('PNG must be at most 8 MiB');
 const bytes=new Uint8Array(await file.arrayBuffer());if(bytes.slice(0,8).join(',')!=='137,80,78,71,13,10,26,10')throw new Error('Choose a PNG image');
 const src=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(file);});
 const image=await load(src),spec=specs[key];if(image.naturalWidth!==spec[1]||image.naturalHeight!==spec[2])throw new Error(spec[0]+' requires '+spec[1]+' × '+spec[2]+' pixels');
 const values={...overrides,[key]:src};const meta=metadata();localStorage.setItem('ql.export.metadata.v1',JSON.stringify({...meta,guiTextures:values}));await restore(values);
}
async function reset(key){const values={...overrides};delete values[key];localStorage.setItem('ql.export.metadata.v1',JSON.stringify({...metadata(),guiTextures:values}));await restore(values);}
window.QUESTLOG_GUI_ATLAS={specs,regions,nineSlice,panel,restore,importPng,reset,url:key=>overrides[key]||new URL('questlog-assets/gui/'+specs[key][0],root).href,
 export(zip){for(const[key,src]of Object.entries(overrides))if(specs[key])zip.file('assets/questlog/textures/gui/'+specs[key][0],src.split(',')[1],{base64:true});}};
window.QUESTLOG_GUI_ATLAS_READY=restore().catch(error=>{console.warn('[QuestLog GUI] Saved custom atlas could not be restored; using defaults.',error);return restore({});});
}());
