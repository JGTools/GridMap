# GridMap

[![npm](https://img.shields.io/npm/v/@jgtools/gridmap)](https://www.npmjs.com/package/@jgtools/gridmap)
[![npm](https://img.shields.io/npm/dm/@jgtools/gridmap)](https://www.npmjs.com/package/@jgtools/gridmap)
[![GitHub](https://img.shields.io/github/license/jgtools/gridmap)](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt)

Spatial Hash Grid that extends Map

## Features

- :heavy_check_mark: Elements are stored on a 2D grid
- :heavy_check_mark: Filter nearby elements
- :heavy_check_mark: Extends Map
- :blue_square: Written in TypeScript

## Installation

### Using npm

```bash
npm i @jgtools/gridmap
```

```javascript
import GridMap from "@jgtools/gridmap";
// ...
```

## Usage

```javascript
import GridMap from "@jgtools/gridmap";

const entities = new GridMap(100, 60, 10);

const entity = { id: "1", x: 0, y: 0, name: "Bob" };
entities.set(entity.id, entity, entity.x, entity.y);

const entity2 = { id: "2", x: 15, y: 15, name: "Joe" };
entities.set(entity2.id, entity2, entity2.x, entity2.y);

console.log("nearby entities: ", gm.query(20, 20, 10));

entities.update("1", 15, 20);
console.log("nearby entities: ", gm.query(20, 20, 10));

entities.delete("2");
console.log("nearby entities: ", gm.query(20, 20, 10));

console.log("amount of entities:", gm.size);
console.log("entity with id 1: ", gm.get("1"));

entities.clear();
console.log("nearby entities: ", gm.query(20, 20, 10));
console.log("amount of entities after clear:", gm.size);
```

## License

MIT
