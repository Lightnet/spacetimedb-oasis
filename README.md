# spacetimedb-oasis

# License: MIT

# Status:
- Work in progress.
- prototying builds.

# Program Languages:
- Typescript ( server )
- Javascript ( Client )

# SpaceTimeDB
 - 2.1.0

# Bugs:
- Parent each other needs to fixed later.
  - Need to clean up transform parent does not exist when remove.
- if other users sync if there tables change it might refresh list for select entity.
- ui tool bugs on select id, create and delete entity

# Information:
  This project use SpacetimeDB which is database and server sandbox module for webassembly. To able to use browser with the web socket to access the SpaceTimeDB with api calls. Base on server module. SpaceTimeDB use ram for fast access to database and server to respone to clients to reduce lag. Read more in the SpaceTimeDB.

  Prototype idea to create mesh tool. To able to create 3d models. As well editor tools for open world creation. Which will have some set of rules in javascript in server to need to translate to browser. As well need to deal with permission system later.

  Building module style format for entity component system. Since it need some basic logics to work. This remind of the novel story from those sci-fi head gear that enter the virutal world. So it need some rules to setup. Idea that frontier developer trying to make world in virutal world while other races to build games.

# Type mesh create types:
- [ ] triangles
- [x] meshVertices + meshIndices ( Grok recommended )
- [ ] meshGeometry

## Notes:
  Some idea for effects for triangles. It come down to make it module components.

# Features:
- [ ] mesh
  - [x] sample create test
- [ ] key frame editor
  - [x] simple animation test
  - [x] transform3d animation assign test
  - [x] play position test
- [ ] image
- [ ] terrain
- [ ] logic
  - [ ] 
- [ ] visual block ?


# Config:
  Make sure the application database name match the server and client. Since using the ***spacetime dev*** command line to run development mode to watch and build.

## Client
```js
const DB_NAME = 'spacetimedb-oasis';
```
## Server:
spacetime.json
```json
//...
"database": "spacetimedb-oasis",
//...
```
spacetime.local.json
```json
//...
"database": "spacetimedb-oasis",
//...
```

# Commands:
```
bun install
```
```
spacetime start
```
```
spacetime dev --server local
```
# SQL:
```
spacetime sql --server local spacetimedb-oasis "SELECT * FROM entity"

spacetime sql --server local spacetimedb-oasis "SELECT * FROM transform3d"

spacetime sql --server local spacetimedb-oasis "SELECT * FROM transform2d"

spacetime sql --server local spacetimedb-oasis "SELECT * FROM meshes"

spacetime sql --server local spacetimedb-oasis "SELECT * FROM animation_clips"

```
 For query table in command line.

# SQL to text file:

```
spacetime sql --server local spacetimedb-oasis "SELECT * FROM transform3d" > backup_your_table.txt

spacetime sql --server local spacetimedb-oasis "SELECT * FROM transform2d" > backup_your_table.txt
```

# Delete
```
spacetime publish --server local spacetimedb-oasis --delete-data
```
 In case bug and can't update table error.

# Credits:
- https://spacetimedb.com/docs
- Grok AI agent
