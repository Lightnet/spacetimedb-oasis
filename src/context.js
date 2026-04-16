// context

import van from "vanjs-core";

export const userIdentity = van.state(null);
export const networkStatus = van.state('Not Connected!');
export const connState = van.state(null);


export const stateEntityId = van.state('');
export const stateScene = van.state(null);
export const dbEntities = van.state(new Map());
export const dbTransform3Ds = van.state(new Map());
export const dbTransform2Ds = van.state(new Map());

export const dbMeshes = van.state(new Map());
export const dbMeshVertices= van.state(new Map());
export const dbMeshIndices= van.state(new Map());







