const input = `.###..#......###..#...#
#.#..#.##..###..#...#.#
#.#.#.##.#..##.#.###.##
.#..#...####.#.##..##..
#.###.#.####.##.#######
..#######..##..##.#.###
.##.#...##.##.####..###
....####.####.#########
#.########.#...##.####.
.#.#..#.#.#.#.##.###.##
#..#.#..##...#..#.####.
.###.#.#...###....###..
###..#.###..###.#.###.#
...###.##.#.##.#...#..#
#......#.#.##..#...#.#.
###.##.#..##...#..#.#.#
###..###..##.##..##.###
###.###.####....######.
.###.#####.#.#.#.#####.
##.#.###.###.##.##..##.
##.#..#..#..#.####.#.#.
.#.#.#.##.##########..#
#####.##......#.#.####.`;

const rows = input.split(/\n/);
const rowLength = rows[0].length;

function calculateVisibleAsteroids(x, y) {
    const rowCopy = [...rows];
    rowCopy[y] = rowCopy[y].substr(0, x) + '0' + rowCopy[y].substr(x+1);
    // console.log(x, y);
    debug = false;
    if (x == 11 && y == 13) debug = true;
    let visible = 0;
    for (let i = 0, tot = rows.length; i < tot; i++) {
        for (let j = 0; j < rowLength; j++) {
            if (rows[i][j] == '#' && !(i == y && j == x)) {
                let localDebug = false;
                if (i == 7 && j == 3) localDebug = debug && true;
                const dx = j - x;
                const dy = i - y;
                if (Math.abs(dx) < Math.abs(dy)) {
                    const xstep = dx == 0 ? 0 : -(dx / Math.abs(dx));
                    const ystep = dx == 0 ? -(dy / Math.abs(dy)) : -(dy / Math.abs(dx));
                    let add = true;
                    for (let k = j + xstep, l = i + ystep; Math.abs(l - y) > 0.00001; k += xstep, l += ystep) {
                        if (localDebug) console.log(`Checking ${k},${l}`);
                        if (j == k && i == l) console.log(xstep, ystep);
                        if ((l % 1 < 0.00001 || 1 - (l % 1) < 0.00001) && rows[Math.round(l)][k] == '#') {
                            add = false;
                            if (localDebug) console.log(`${j},${i} blocked by ${k},${l}`);
                            break;
                        }
                    }
                    if (add) {
                        if (localDebug) console.log(`${j},${i} visible`);
                        rowCopy[i] = rowCopy[i].substr(0, j) + 'X' + rowCopy[i].substr(j+1);
                        visible++;
                    }
                } else {
                    const xstep = dy == 0 ? -(dx / Math.abs(dx)) : -(dx / Math.abs(dy));
                    const ystep = dy == 0 ? 0 : -(dy / Math.abs(dy));
                    let add = true;
                    for (let k = j + xstep, l = i + ystep; Math.abs(k - x) > 0.00001; k += xstep, l += ystep) {
                        if (localDebug) console.log(`Checking ${k},${l}`);
                        if (j == k && i == l) console.log(xstep, ystep);
                        if ((k % 1 < 0.00001 || 1 - (k % 1) < 0.00001) && rows[l][Math.round(k)] == '#') {
                            add = false;
                            if (localDebug) console.log(`${j},${i} blocked by ${k},${l}`);
                            break;
                        }
                    }
                    if (add) {
                        if (localDebug) console.log(`${j},${i} visible`);
                        rowCopy[i] = rowCopy[i].substr(0, j) + 'X' + rowCopy[i].substr(j+1);
                        visible++;
                    }
                }
                
            }
        }
    }

    if (debug) {
        const output = rowCopy.join('\n');
        console.log(output);
        console.log(output.match(/X/g).length);
    }

    return visible;
}

let highestVisible = 0;
let coordinates = {x:0,y:0};

for (let i = 0, tot = rows.length; i < tot; i++) {
    for (let j = 0; j < rowLength; j++) {
        if (rows[i][j] == '#') {
            const visible = calculateVisibleAsteroids(j, i);
            if (visible >= highestVisible) {
                highestVisible = visible;
                coordinates.x = j;
                coordinates.y = i;
            }
        }
    }
}

console.log(highestVisible);

const aList = rows.reduce((p, c, y) => {
    return p.concat(c.split('').reduce((p2, c2, x) => {
        if (c2 == '#' && !(x == coordinates.x && y == coordinates.y)) {
            const dy = y - coordinates.y;
            const dx = x - coordinates.x;
            let angle = Math.atan2(dy, dx) * 180 / Math.PI + 90;
            angle = angle < 0 ? 360 + angle : angle;
            const asteroid = {
                x: x,
                y: y,
                angle: angle,
                distance: Math.sqrt(Math.pow(dy, 2) + Math.pow(dx, 2)),
            };
            p2.push(asteroid);
        }
        return p2;
    }, []))
}, []);

const groupedAlist = aList.reduce((p, c) => {
    if (!p[c.angle]) {
        p[c.angle] = {
            angle: c.angle,
            asteroids: []
        };
        let pushed = false;
        for (let i = 0, tot = p[c.angle].asteroids.length; i < tot; i++) {
            if (c.distance < p[c.angle].asteroids[i].distance) {
                p[c.angle].asteroids.splice(i, 0, c);
                pushed = true;
            }
        }
        if (!pushed) {
            p[c.angle].asteroids.push(c);
        }
    }
    return p;
}, {});

const values = Object.values(groupedAlist).sort((a, b) => a.angle < b.angle ? -1 : 1);

const orderedAlist = [];

let i = 0;

while (orderedAlist.length < 200) {
    const angleGroup = values[i];
    if (angleGroup.asteroids.length > 0) {
        const asteroid = angleGroup.asteroids.shift();
        orderedAlist.push(asteroid);
    }
    i++;
    if (i >= values.length) i = 0;
}

console.log(orderedAlist[199]);
