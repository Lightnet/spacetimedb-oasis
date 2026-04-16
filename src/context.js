// context

import van from "vanjs-core";

export const userIdentity = van.state(null);
export const networkStatus = van.state('Not Connected!');
export const connState = van.state(null);

export const stateScene = van.state(null);
export const dbEntities = van.state(new Map());
export const dbTransform3Ds = van.state(new Map());
export const dbTransform2Ds = van.state(new Map());

export const dbMeshes = van.state(new Map());
export const dbMeshVertices= van.state(new Map());
export const dbMeshIndices= van.state(new Map());

// need ray cast later?
export const sceneMeshes = van.state(new Map());

//-----------------------------------------------
// 
//-----------------------------------------------
export const stateEntityId = van.state('');
export const phPosition = van.state({x:0,y:0,z:0});
export const phRotation = van.state({x:0,y:0,z:0});
export const phQuaternion = van.state({x:0,y:0,z:0,w:1});
export const phScale = van.state({x:1,y:1,z:1});

export const phHolder = van.state(null);
export const phMarker = van.state(null);

//-----------------------------------------------
// pane binding
//-----------------------------------------------
export const UI={
  component3DFolder:null,
  addTransform3DBinding:null,
  removeTransform3DBinding:null,
};






