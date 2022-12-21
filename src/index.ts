import SHG from "@jgtools/shg";

/**
 * GridMap - Spatial Hash Grid that extends Map
 */
export default class GridMap<K, V> extends Map {
    #shg;
    constructor(w: number, h: number, cs: number) {
        super();
        this.#shg = new SHG<K>(w, h, cs);
    }
    set(id: K, value: V, x = 0, y = 0) {
        this.#shg.set(id, x, y);
        return super.set(id, value);
    }
    delete(id: K) {
        this.#shg.delete(id);
        return super.delete(id);
    }
    update(id: K, x: number, y: number) {
        this.#shg.update(id, x, y);
    }
    query(x: number, y: number, range: number): K[] {
        return this.#shg.query(x, y, range);
    }
}