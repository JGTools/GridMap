class Grid<ID> {
    #cells: Map<number, Set<ID>> = new Map<number, Set<ID>>();
    #items: Map<ID, number> = new Map<ID, number>();
    #data = { cs: 1, cx: 1, cy: 1 };
    constructor(w: number, h: number, cs: number) {
        this.#data.cs = cs;
        this.#data.cx = Math.floor(w / cs) + 1;
        this.#data.cy = Math.floor(h / cs) + 1;

        for (let y = 0; y < this.#data.cy; y++) {
            for (let x = 0; x < this.#data.cx; x++) {
                this.#cells.set(this.#getCellHash(x, y), new Set<ID>());
            }
        }
    }
    set(id: ID, x: number, y: number) {
        const [cx, cy] = this.#getCellPos(x, y);
        const hash = this.#getCellHash(cx, cy);
        this.#setInner(id, hash);
    }
    #setInner(id: ID, hash: number) {
        this.#cells.get(hash)?.add(id);
        this.#items.set(id, hash);
    }
    delete(id: ID) {
        const item = this.#items.get(id);
        if (!item)
            return;
        this.#cells.get(item)?.delete(id);
        this.#items.delete(id);
    }
    update(id: ID, x: number, y: number) {
        const ph = this.#items.get(id);
        if (!ph)
            return;
        const [nx, ny] = this.#getCellPos(x, y);
        const nh = this.#getCellHash(nx, ny);
        if (nh == ph)
            return;
        this.delete(id);
        this.#setInner(id, nh);
    }
    query(x: number, y: number, w: number, h: number): ID[] {
        const [sx, sy] = this.#getCellPos(x, y);
        const [ex, ey] = this.#getCellPos(x + w, y + h);

        const ids: ID[] = [];
        for (let y = sy; y <= ey; y++) {
            for (let x = sx; x <= ex; x++) {
                const cell = this.#cells.get(this.#getCellHash(x, y));
                if (cell)
                    ids.push(...cell);
            }
        }
        return ids;
    }
    #getCellHash(x: number, y: number) {
        return y * this.#data.cx + x;
    }
    #getCellPos(x: number, y: number): [number, number] {
        const cx = this.#clamp(Math.floor(x / this.#data.cs), this.#data.cx);
        const cy = this.#clamp(Math.floor(y / this.#data.cs), this.#data.cy);
        return [cx, cy];
    }
    #clamp(n: number, max: number) { return Math.max(0, Math.min(n, max)) }
}

/**
 * GridMap - Spatial hash grid that extends Map
 */
export default class GridMap<K, V> extends Map {
    #grid;
    constructor(w: number, h: number, cs: number) {
        super();
        this.#grid = new Grid<K>(w, h, cs);
    }
    set(id: K, value: V, x = 0, y = 0) {
        this.#grid.set(id, x, y);
        return super.set(id, value);
    }
    delete(id: K) {
        this.#grid.delete(id);
        return super.delete(id);
    }
    update(id: K, x: number, y: number) {
        this.#grid.update(id, x, y);
    }
    query(x: number, y: number, w: number, h: number): K[] {
        return this.#grid.query(x, y, w, h);
    }
}