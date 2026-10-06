import assert from 'node:assert/strict';
import { exportAccount, deleteAccount, ownRows } from '../src/app/lib/account/data.js';
const reads=[];
function clientWithRows(tables, fail=null) {
  return {
    from(table) {
      const query = {
        select() { return query; },
        eq(column, id) { reads.push({ table, column, id }); return query; },
        order() { return query; },
        async range(from, to) {
          if (table === fail) return { error: new Error('denied') };
          return { data: (tables[table] || []).slice(from, to + 1) };
        }
      };
      return query;
    },
    storage: { from() { return { download: async () => ({ data: new Blob(['photo'], { type: 'image/jpeg' }) }) }; } }
  };
}
const user={id:'owner',email:'owner@example.test',created_at:'2026-10-06'};
const client=clientWithRows({profiles:[{id:'owner'}],cultivos:[{id:'season1',user_id:'owner'}],cultivo_event_photos:[{id:'photo1',storage_path:'owner/season1/event/photo.jpg'}]});
const exported=await exportAccount(client,user);assert.equal(exported.account.id,'owner');assert.equal(exported.data.cultivos.length,1);assert.equal(Buffer.from(exported.photos[0].base64,'base64').toString(),'photo');assert.ok(reads.every(read=>read.id==='owner'));assert.ok(reads.some(read=>read.table==='profiles'&&read.column==='id'));assert.ok(reads.filter(read=>read.table!=='profiles').every(read=>read.column==='user_id'));
await assert.rejects(exportAccount(clientWithRows({},'plantas'),user));
await assert.rejects(exportAccount(clientWithRows({cultivo_event_photos:[{storage_path:'other/photo.jpg'}]}),user));
const paginated=await ownRows(clientWithRows({cultivos:Array.from({length:501},(_,id)=>({id}))}),'cultivos','owner');assert.equal(paginated.length,501);
const calls=[];const storageTree={'owner':[{name:'season',id:null}],'owner/season':[{name:'event',id:null}],'owner/season/event':[{name:'photo.jpg',id:'file'}]};
const admin={storage:{from(){return{list:async prefix=>({data:storageTree[prefix]||[]}),remove:async paths=>{calls.push(['remove',paths]);return{}}}}},auth:{admin:{deleteUser:async id=>{calls.push(['delete',id]);return{}}}}};
await deleteAccount(admin,'owner');assert.deepEqual(calls,[['remove',['owner/season/event/photo.jpg']],['delete','owner']]);
calls.length=0;admin.storage.from=()=>({list:async()=>({error:new Error('offline')})});await assert.rejects(deleteAccount(admin,'owner'));assert.equal(calls.length,0);
console.log('PASS: account export ownership, pagination, private photo export, fail-closed reads and storage cleanup before account deletion.');
