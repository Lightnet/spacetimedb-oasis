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

# Information:
  This project use SpacetimeDB that use as add on server module. To able to use browser to access the server database.

  Prototype idea to create mesh tool. To able to create 3d models.

  Building module style format for entity component system. Since it need some basic logics to work.

# Type mesh create types:
- [ ] triangles
- [x] meshVertices + meshIndices ( Grok recommended )
- [ ] meshGeometry

## Notes:
  Some idea for effects for triangles. It come down to make it module components.


# Features:
- mesh
  - [x] sample create test


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
