const input = `<x=-9, y=10, z=-1>
<x=-14, y=-8, z=14>
<x=1, y=5, z=6>
<x=-19, y=7, z=8>`;

let moons = [
    {p:{x:-9,y:10,z:-1},a:{x:0,y:0,z:0}},
    {p:{x:-14,y:-8,z:14},a:{x:0,y:0,z:0}},
    {p:{x:1,y:5,z:6},a:{x:0,y:0,z:0}},
    {p:{x:-19,y:7,z:8},a:{x:0,y:0,z:0}},
];

const xStates = [];
const yStates = [];
const zStates = [];

let xPeriod = -1;
let yPeriod = -1;
let zPeriod = -1;

xStates.push(moons.map(c => `${c.p.x}.${c.a.x}`).join('.'));
yStates.push(moons.map(c => `${c.p.y}.${c.a.y}`).join('.'));
zStates.push(moons.map(c => `${c.p.z}.${c.a.z}`).join('.'));

const abs = Math.abs;
let i = 0;

while (true) {
    let newMoons = [];
    for (let j = 0; j < 4; j++) {
        const moon = {
            p: {
                ...moons[j].p,
            },
            a: {
                ...moons[j].a,
            }
        };
        for (let k = 0; k < 4; k++) {
            if (j == k) continue;
            moon.a.x += (moons[k].p.x - moons[j].p.x) / (abs(moons[k].p.x - moons[j].p.x) || 1);
            moon.a.y += (moons[k].p.y - moons[j].p.y) / (abs(moons[k].p.y - moons[j].p.y) || 1);
            moon.a.z += (moons[k].p.z - moons[j].p.z) / (abs(moons[k].p.z - moons[j].p.z) || 1);
        }
        moon.p.x += moon.a.x;
        moon.p.y += moon.a.y;
        moon.p.z += moon.a.z;
        newMoons.push(moon);
    }
    moons = newMoons;
    i++;
    if (xPeriod < 0) {
        const x = moons.map(c => `${c.p.x}.${c.a.x}`).join('.');
        if (xStates.indexOf(x) >= 0) {
            xPeriod = i - xStates.indexOf(x);
        }
    }
    if (yPeriod < 0) {
        const y = moons.map(c => `${c.p.y}.${c.a.y}`).join('.');
        if (yStates.indexOf(y) >= 0) {
            yPeriod = i - yStates.indexOf(y);
        }
    }
    if (zPeriod < 0) {
        const z = moons.map(c => `${c.p.z}.${c.a.z}`).join('.');
        if (zStates.indexOf(z) >= 0) {
            zPeriod = i - zStates.indexOf(z);
        }
    }
    if (xPeriod >= 0 && yPeriod >= 0 && zPeriod >= 0) {
        break;
    }
}

console.log(`x: ${xPeriod}, y: ${yPeriod}, z: ${zPeriod}`);