//-----------------------------------------------
// PROCEDURE BACK UP
//-----------------------------------------------
// https://spacetimedb.com/docs/functions/procedures
import { table, t } from 'spacetimedb/server';
import spacetimedb from "../module";
//-----------------------------------------------
// place holder
//-----------------------------------------------
export const fetch_save_back_up = spacetimedb.procedure({}, t.unit(), (ctx, { }) => {
  // Fetch external data
  const response = ctx.http.fetch('localhost: /backup');
  const data = response.json();
  // Call the reducer within a transaction
  ctx.withTx(txCtx => {
    // processItem(txCtx, { itemId: data.id });
  });
  return {};
});
//-----------------------------------------------
// place holder
//-----------------------------------------------
export const fetch_load_back_up = spacetimedb.procedure({}, t.unit(), (ctx, { }) => {
  // Fetch external data
  const response = ctx.http.fetch('localhost: /backup');
  const data = response.json();
  // Call the reducer within a transaction
  ctx.withTx(txCtx => {
    // processItem(txCtx, { itemId: data.id });
  });
  return {};
});
//-----------------------------------------------
// 
//-----------------------------------------------
// Define a reducer and save the reference
// export const processItem = spacetimedb.reducer({ itemId: t.u64() }, (ctx, { itemId }) => {
//   // ... reducer logic
// });
// export const fetch_and_process = spacetimedb.procedure({ url: t.string() }, t.unit(), (ctx, { url }) => {
//   // Fetch external data
//   const response = ctx.http.fetch(url);
//   const data = response.json();
//   // Call the reducer within a transaction
//   ctx.withTx(txCtx => {
//     // processItem(txCtx, { itemId: data.id });
//   });
//   return {};
// });


