//-----------------------------------------------
// 
//-----------------------------------------------

import { Pane } from 'tweakpane';
import { connState } from './context';


export function setup_Pane(){
  const conn = connState.val;
  console.log(conn);

  const pane = new Pane();
  //-----------------------------------------------
  // ENTITY
  //-----------------------------------------------
  const entityFolder = pane.addFolder({
    title: 'Entity',
  });

  entityFolder.addButton({title: 'Create'}).on('click',()=>{
    conn.reducers.createEntity()
  });

  entityFolder.addButton({title: 'Delete'}).on('click',()=>{
    try {
      if(PARAMS.entityId !== "" ){
        conn.reducers.deleteEntity({
          id:PARAMS.entityId
        });
      }
    } catch (error) {
      console.log("delete entity error!");
    }
  });




}



