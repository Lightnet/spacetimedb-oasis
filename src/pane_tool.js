//-----------------------------------------------
// 
//-----------------------------------------------
import van from "vanjs-core";
import { Pane } from 'tweakpane';
import { 
  connState, 
  dbEntities, 
  dbTransform3Ds,
  stateEntityId,
} from './context';


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
      if(stateEntityId.val !== "" ){
        conn.reducers.deleteEntity({
          id:stateEntityId.val
        });
      }
    } catch (error) {
      console.log("delete entity error!");
    }
  });

  entityFolder.addButton({title: 'Entities Logs'}).on('click',()=>{
    console.log(dbEntities.val);
    console.log(dbTransform3Ds.val);
  });
  let selectEntityBinding;

  van.derive(()=>{
    if(selectEntityBinding) selectEntityBinding.dispose();
    const entities = dbEntities.val;
    console.log(entities);
    console.log(entities.size);

    // if(!entities) return;

    const entitiesOptions = Array.from(entities.keys()).map(id => ({
        text: id,
        value: id,
    }));
    console.log(entitiesOptions);

    selectEntityBinding = entityFolder.addBlade({
      view: 'list',
      label: 'Select Entity:',
      options: entitiesOptions,
      value: '',
    }).on('change',(event)=>{
      // selectEntity(event.value)
      // console.log(event.value);
      stateEntityId.val = event.value
    });
  }) 
      
    
    
  






}



