import GridMap from "@jgtools/gridmap";
import * as THREE from 'three';

class Entity {
    static init(scene, id) {
        const x = Math.random() * 100;
        const y = Math.random() * 60;

        const geo = new THREE.PlaneGeometry(2, 2);
        const mat = new THREE.MeshBasicMaterial();
        const mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);

        mesh.position.set(x, y, 0);
        mesh.material.color.set(0xffffff);

        return { id, x, y, s: Math.random() * 10, a: Math.random() * 6, mesh };
    }
    static update(g, e, delta) {
        e.x += delta * e.s * Math.cos(e.a);
        e.y += delta * e.s * Math.sin(e.a);

        if (e.x > g.level.field.scale.x)
            e.x = 0;
        if (e.x < 0)
            e.x = g.level.field.scale.x;
        if (e.y > g.level.field.scale.y)
            e.y = 0;
        if (e.y < 0)
            e.y = g.level.field.scale.y;

        e.mesh.position.set(e.x, e.y, 0);
        e.mesh.material.color.set(0xffffff);
        g.level.entities.update(e.id, e.x, e.y);
    }
}
class Level {
    static init(scene, camera) {
        const cw = 100;
        const ch = 100;
        const cs = 25;
        const entities = new GridMap(cw, ch, cs);

        const geo = new THREE.PlaneGeometry();
        const mat = new THREE.MeshBasicMaterial({ color: 0x00ffff, opacity: 0.2, transparent: true });
        const matB = new THREE.MeshBasicMaterial({ color: 0x00ff00, opacity: 0.2, transparent: true });
        const field = new THREE.Mesh(geo, mat);
        field.position.set(cw / 2, ch / 2, 1);
        camera.position.x = field.position.x;
        camera.position.y = field.position.y;
        field.scale.set(cw, ch, 1);
        scene.add(field);

        const yb = Math.floor(ch / cs) + 1;
        const xb = Math.floor(cw / cs) + 1;
        for (let y = 0; y < yb; y++) {
            for (let x = 0; x < xb; x++) {
                const b = new THREE.Mesh(geo, matB);
                b.position.set(cs * x + cs / 2, cs * y + cs / 2, 1);
                b.scale.set(cs - 1, cs - 1, 1);
                scene.add(b);
            }
        }

        const geo2 = new THREE.PlaneGeometry();
        const mat2 = new THREE.MeshBasicMaterial({ color: 0x88ff00, wireframe: true });
        const view = new THREE.Mesh(geo2, mat2);
        scene.add(view);

        for (let i = 0; i < 60; i++) {
            const p = Entity.init(scene, i.toString());
            entities.set(p.id, p, p.x, p.y);
        }

        setInterval(() => {
            view.position.set(entities.get("0").x, entities.get("0").y);
            const s = 30;
            view.scale.set(s, s, 1);
        }, 20);

        return { field, view, entities };
    }
    static update(g, delta) {
        const view = g.level.view;
        const es = g.level.entities;
        for (const [k, p] of es) {
            Entity.update(g, p, delta);
        }
        const nearby = es.query(view.position.x, view.position.y, view.scale.x / 2);
        for (const k of nearby) {
            const p = es.get(k);
            p.mesh.material.color.set(0xff0000);
        }
    }
}
class Game {
    static init() {
        const scene = new THREE.Scene();

        const w = document.body.clientWidth;
        const h = document.body.clientHeight;

        const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
        camera.position.set(0, 0, 100);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(w, h);
        document.body.appendChild(renderer.domElement);
        const clock = new THREE.Clock();

        const level = Level.init(scene, camera);
        const g = { scene, camera, renderer, clock, level };
        Game.update(g);
    }
    static update(g) {
        const delta = g.clock.getDelta();
        Level.update(g, delta);
        g.renderer.render(g.scene, g.camera);
        requestAnimationFrame(() => Game.update(g));
    }
}
Game.init();