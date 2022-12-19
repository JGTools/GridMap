/**
 * GridMap - Spatial grid that extends Map
 */
export default class GridMap extends Map {
    #cells: [][][] = [];
    #cellSize = 1;
    constructor(w: number, h: number, cellSize: number) {
        super();
        for (let y = 0; y < h / cellSize; y++) {
            this.#cells[y] = [];
            for (let x = 0; x < w / cellSize; x++) {
                this.#cells[y][x] = [];
            }
        }
    }
    set(id: any, value: any, x = 0, y = 0) {


        return super.set(id, value);
    }
    delete(id: any) {


        return super.delete(id);
    }
    update(id: any, x: number, y: number) {

    }
    getIdsInView(rx: number, ry: number, rw: number, rh: number): any[] {
        const ids: any[] = [];
        for (let y = ry; y < (ry + rh) / this.#cellSize; y++) {
            for (let x = rx; x < (rx + rw) / this.#cellSize; x++) {
                ids.push(this.#cells[y][x]);
            }
        }
        return ids;
    }
}