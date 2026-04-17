//-----------------------------------------------
// TABLE EVENT
//-----------------------------------------------
import { table, t } from 'spacetimedb/server';


export const messageEvent = table({
  public: true,
  event: true,
}, {
  entityId: t.string(),
  text: t.string(),
  source: t.string(),
});