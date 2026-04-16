import * as THREE from 'three';


export function createBox(color=0xffffff){
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const wireframe = new THREE.WireframeGeometry( geometry );
  const edges = new THREE.EdgesGeometry(geometry);
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // const cube = new THREE.Mesh(geometry, material);
  // const cube = new THREE.Mesh(wireframe, material);
  const lineMaterial = new THREE.LineBasicMaterial({ color: color });
  // const cubeLine = new THREE.LineSegments(wireframe, lineMaterial);
  const cubeLine = new THREE.LineSegments(edges, lineMaterial);
  cubeLine.matrixAutoUpdate = false; // disable to use matrix
  const axesHelper = new THREE.AxesHelper( 1 ); // '5' is the line size
  cubeLine.add( axesHelper );
  // console.log(cubeLine);
  return cubeLine;
}


