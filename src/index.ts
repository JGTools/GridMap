/**
 * GridMap - Spatial grid that extends Map
 */
export default class GridMap extends Map {
    constructor() {
        super();
    }
    set(key: any, value: any) {
        super.set(key, value);
        return this;
    }
}