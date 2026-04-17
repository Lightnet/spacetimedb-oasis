//-----------------------------------------------
// REDUCERS TEST
//-----------------------------------------------
import { table, t, SenderError } from 'spacetimedb/server';
import spacetimedb from '../module';
//-----------------------------------------------
// MESSAGE TEST
//-----------------------------------------------
export const sent_message_event = spacetimedb.reducer({}, (ctx, { }) => {
  console.log("bar");
});
//-----------------------------------------------
// TEST
//-----------------------------------------------
export const attack = spacetimedb.reducer(
  { target_id: t.string(), damage: t.u32() },
  (ctx, { target_id, damage }) => {
    // Game logic...

    // Publish the event
    ctx.db.damageEvent.insert({
      entityId: target_id,
      damage,
      source: "melee_attack",
    });
  }
);
/*
conn.db.damageEvent.onInsert((ctx, event) => {
  console.log(`Entity ${event.entityId} took ${event.damage} damage from ${event.source}`);
});
*/

