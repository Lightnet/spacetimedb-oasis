//-----------------------------------------------
// 
//-----------------------------------------------
import * as THREE from 'three';
import van from "vanjs-core";
import { Pane } from 'tweakpane';
import { 
  connState, 
  dbEntities, 
  dbTransform3Ds,
  phHolder,
  phPosition,
  phQuaternion,
  phRotation,
  phScale,
  stateEntityId,
  UI,
} from './context';


export function setup_Pane(){
  const conn = connState.val;
  // console.log(conn);
  const pane = new Pane();
  // console.log(pane);
  //-----------------------------------------------
  // ENTITY
  //-----------------------------------------------
  const entityFolder = pane.addFolder({
    title: 'Entity',
  });

  //-----------------------------------------------
  // CREATE ENTITY
  //-----------------------------------------------
  entityFolder.addButton({title: 'Create'}).on('click',()=>{
    conn.reducers.createEntity()
  });
  //-----------------------------------------------
  // DELETE ENTITY
  //-----------------------------------------------
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
  //-----------------------------------------------
  // ENTITIES LOGS
  //-----------------------------------------------
  entityFolder.addButton({title: 'Entities Logs'}).on('click',()=>{
    console.log(dbEntities.val);
    console.log(dbTransform3Ds.val);
  });

  entityFolder.addButton({title: 'Toggle T3'}).on('click',()=>{
    console.log(dbEntities.val);
    console.log(dbTransform3Ds.val);
    if(UI.component3DFolder){
      UI.component3DFolder.expanded = !UI.component3DFolder.expanded
    }
  });
  //-----------------------------------------------
  // SELECT ENTITIES
  //-----------------------------------------------
  let selectEntityBinding;
  van.derive(()=>{
    if(selectEntityBinding) selectEntityBinding.dispose();
    const entities = dbEntities.val;
    // console.log(entities);
    // console.log(entities.size);
    // if(!entities) return;
    const entitiesOptions = Array.from(entities.keys()).map(id => ({
        text: id,
        value: id,
    }));
    // console.log(entitiesOptions);
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
  });

  //-----------------------------------------------
  // SELECT ENTITY ID DERIVE
  //-----------------------------------------------
  van.derive(()=>{
    const entityId = stateEntityId.val;
    console.log("entityId: ",entityId)
    if(!entityId){
      //if not select disable.
      return;
    }
    const t3 = dbTransform3Ds.val.get(entityId);
    if(t3){
      console.log(t3);
    }
  });

  setup_component3d(pane);
  setup_component2d(pane);
}

function setup_component3d(pane){
  //-----------------------------------------------
  // COMPONENT TRANSFORM 3D
  //-----------------------------------------------
  const component3DFolder = pane.addFolder({
    title: 'Component 3D',
  }).on('fold', (ev) => {
    // console.log(ev.expanded); // true if expanded, false if collapsed
    localStorage.setItem('component3DFolder',ev.expanded)
  });
  UI.component3DFolder=component3DFolder;
  if(UI.component3DFolder){
    const toggle = localStorage.getItem('component3DFolder')
    // console.log(typeof toggle)
    // console.log(toggle)
    if(toggle=='true'){
      // console.log("expand")
      UI.component3DFolder.expanded=true;
    }else{
      // console.log("not expand")
      UI.component3DFolder.expanded=false;
    }
  }

  const transform3dFolder = component3DFolder.addFolder({
    title: 'Transform 3D',
  });
  transform3dFolder.addBinding(stateEntityId, 'val',{
    label:'Select:',
    readonly:true
  })

  transform3dFolder.addBinding(phPosition, 'val',{label:'Position'}).on('change',update_place_holder)
  transform3dFolder.addBinding(phRotation, 'val',{label:'Rotation'}).on('change',update_place_holder)
  transform3dFolder.addBinding(phScale, 'val',{label:'Scale'}).on('change',update_place_holder)

  function update_place_holder(){
    console.log(phPosition.val);
    const ph_holder = phHolder.val;
    ph_holder.matrixAutoUpdate = true;
    ph_holder.position.set(
      phPosition.val.x,
      phPosition.val.y,
      phPosition.val.z
    );

    const radX = THREE.MathUtils.degToRad(phRotation.val.x);
    const radY = THREE.MathUtils.degToRad(phRotation.val.y);
    const radZ = THREE.MathUtils.degToRad(phRotation.val.z);
    // 2. Create Euler angles (default order is 'XYZ')
    const euler = new THREE.Euler(radX, radY, radZ, 'XYZ');
    const quat = new THREE.Quaternion().setFromEuler(euler);
    phQuaternion.val.x = quat.x;
    phQuaternion.val.y = quat.y;
    phQuaternion.val.z = quat.z;
    phQuaternion.val.w = quat.w;
    ph_holder.quaternion.setFromEuler(euler);
    ph_holder.scale.set(
      phScale.val.x,
      phScale.val.y,
      phScale.val.z
    )
  }

  UI.addTransform3DBinding = transform3dFolder.addButton({
  title: 'Add Transform 3D',
  }).on('click',()=>{
    console.log("add Transform 3D")
    // conn.reducers.addEntityTransform3D({
    //   id: PARAMS.entityId
    // });
    const conn = connState.val;
    conn.reducers.addEntityTransform3D({
      id: stateEntityId.val,
      position:phPosition.val,
      quaternion:phQuaternion.val,
      scale:phScale.val,
    });
  });

  UI.removeTransform3DBinding = transform3dFolder.addButton({
    title: 'Remove Transform 3D',
  }).on('click',()=>{
    const conn = connState.val;
    conn.reducers.removeEntityTransform3D({
      id:stateEntityId.val
    });
    stateEntityId.val=null;
  })





}

function setup_component2d(pane){
  // //-----------------------------------------------
  // // COMPONENT TRANSFORM 2D
  // //-----------------------------------------------
  // const component2DFolder = pane.addFolder({
  //   title: 'Component 2D',
  // });
}

