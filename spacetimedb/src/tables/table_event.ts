//-----------------------------------------------
// TABLE EVENT
//-----------------------------------------------
import { table, t } from 'spacetimedb/server';


export const damageEvent = table({
  public: true,
  event: true,
}, {
  entityId: t.string(),
  damage: t.u32(),
  source: t.string(),
});