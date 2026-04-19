

# Design:
  There will be assets model to build the world. Since it will be voxel or some degree. The reason is destuction of the world to able to edit the lansscape with propes.
  This is after some thoughts. It need way to edit those mesh in some ways. As well the physics will be added so those objects which needed some mass in those.

  There will be prefab system which not build yet. Just like a brush or make those properties work in some degree.

# Ideas:
- need assets model store for backup.
- need to copy objects for destruction.

# entity component system:

```
-Entity
  - id
```
 For this reason is keep it simple.

```
- tranform3d
  - entityId
  - position
```

```
- mesh
  - entityId
  - data
```
  For this reason is develop components to able to query and delete relate to entity id. Which is still in work in progress. To able to filter what type of components being use to attach or remove base on entity.

# Editor:
- save
- load
- backup
- mesh tools:
  - [ ] create box
  - [ ] create sphere
  - [ ] create door
  - [ ]
- physics arcade
- prefab

# Admin, auth and permission:
  Use timer?

# Terrain:
- chuck
- position


# Animations:
  After thinking some time. It best to test on server side. One reason is the physics will be added into the game. So it would sync with the server and browser. Another reason is collision checks.

  From I guess it would lag if the server is not close to the user location.

  Need to thinking differently since it table data.

## Key frames:
  There will be two type. One for normal and other is for editor tool. The reason is query those table for those key frame each entityId. Which will use the procccess.

### Method 1
```ts
keyframes:
- entityId
- index
- position
- rotation
- scale

animation
- keyframes: t.array(keyframes)
```
```ts
getValueAtTime(animation.keyframes, time)
```
### Method 2
```ts
const keyframe = ctx.db.keyframes.iter()
getValueAtTime(keyframe, time)
```
just an example refs.

## editor:
  It would use the method 1 for edit the time line for better handle. Then it can be export to array format. Since does not need to query all from the table and ids.

  Method 2 is use for playing the animation.

## animation play:
 By using the key frames silder time to preview or schedule table to play the animation.

### record:
  This could use to record and use to create animaiton which required timer, event and schedule table.


# Back up:
  There is SpaceTimeDB on cloud server back up file. But for the local is non exist. Which mean code it your self.

  Using the vite server middlewares to handle backup with the SpaceTimeDB procedure function.

# Premade prefab:
  Need to have some default assets for easy to create those mesh and other things.

