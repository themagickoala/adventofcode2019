const input = `1 FVBHS, 29 HWPND => 4 CPXDX
5 TNWDG, 69 VZMS, 1 GXSD, 48 NCLZ, 3 RSRZ, 15 HWPND, 25 SGPK, 2 SVCQ => 1 FUEL
1 PQRLB, 1 TWPMQ => 4 QBXC
9 QBXC => 7 RNHQ
12 VZMS => 6 MGQRZ
6 QBVG, 10 XJWX => 6 BWLZ
4 MVGN => 6 BHZH
2 LKTWD => 7 FVBHS
2 BWFK => 7 TFPQ
15 VZBJ, 9 TSVN, 2 BWLZ => 2 TNWDG
10 KVFL, 2 BWLZ, 1 VGSBF => 4 KBFJV
12 TXCR, 2 JMBG => 4 DCFD
5 VMDT, 6 JKPFT, 3 RJKJD => 7 LGWM
1 LDFGW => 2 DHRBP
129 ORE => 8 LDFGW
9 DNVRJ => 8 BMNGX
7 NLPB => 6 NCLZ
1 VMDT, 6 DCFD => 9 SGRXC
1 LDFGW, 2 VRHFB => 8 QHGQC
10 VGSBF, 5 WVMG, 6 BWLZ => 3 BWFK
4 KVFL, 1 TSVN => 6 SVCQ
2 VZBJ, 3 SWJZ => 3 QZLC
5 JMBG, 1 PQRLB => 3 CJLH
13 LKTWD, 6 TFPQ => 3 WVRXR
20 QHGQC, 10 NSPVD => 5 VGSBF
5 TFPQ, 1 DHRBP, 2 KVFL => 8 NLPB
2 KBFJV, 1 CJLH, 20 RNHQ, 1 BWLZ, 13 MNBK, 1 BHZH, 1 PKRJF => 8 RSRZ
154 ORE => 2 VRHFB
2 NHRCK => 7 DNVRJ
2 VRHFB, 4 XJWX => 4 NHRCK
1 TFPQ, 12 JMBG => 5 MNBK
8 TMFS => 2 VZMS
175 ORE => 2 TMFS
1 LBZN, 2 SWJZ, 3 VGSBF => 8 BLDN
7 KFJD, 5 WVRXR, 5 RJKJD => 6 MVGN
3 RJKJD, 1 TXCR => 8 KVFL
3 QHGQC, 1 MGQRZ, 10 VGSBF => 8 LKTWD
178 ORE => 1 XJWX
1 QBXC, 1 BWFK => 6 TSVN
1 NHRCK, 2 DHRBP => 4 VZBJ
1 LDFGW, 2 NHRCK, 10 BWLZ => 8 TWPMQ
28 TWPMQ => 4 RJKJD
10 SVCQ, 1 KVFL => 6 CZNMG
3 VZMS, 3 MGQRZ => 3 WVMG
19 MGQRZ => 8 KFJD
3 WVMG => 6 PQRLB
31 SVCQ, 1 TXCR => 8 VMDT
20 KFJD, 5 CPXDX, 2 BLDN, 2 PQWJX, 12 TFPQ, 2 BHZH, 2 MVGN => 9 SGPK
7 QZLC => 8 JMBG
1 PQRLB => 1 HWPND
9 VMDT, 5 CZNMG, 3 CPXDX, 1 MVGN, 8 VSMTK, 2 SGRXC, 1 MNBK, 8 LGWM => 7 GXSD
2 NSPVD => 8 QBVG
20 CZNMG => 4 PQWJX
1 LDFGW => 4 NSPVD
16 KBFJV, 22 BLDN => 2 VSMTK
10 BWLZ => 9 LBZN
1 BWLZ => 3 SWJZ
1 HWPND => 9 TXCR
12 CJLH, 9 LGWM, 3 BHZH => 6 PKRJF
5 BMNGX => 7 JKPFT`;

// const input = `9 ORE => 2 A
// 8 ORE => 3 B
// 7 ORE => 5 C
// 3 A, 4 B => 1 AB
// 5 B, 7 C => 1 BC
// 4 C, 1 A => 1 CA
// 2 AB, 3 BC, 4 CA => 1 FUEL`;

const matcher = /\d+ [A-Z]+/g;

const parsedInput = input.split(/\n/).reduce((p, r) => {
    const split = r.split('=>');
    const output = split[1].match(matcher);
    const quantity = +output[0].match(/\d+/)[0];
    const name = output[0].match(/[A-Z]+/)[0];
    const inputs = split[0].match(matcher);
    p[name] = {
        name,
        quantity,
        inputs: inputs.map(i => {
            const quantity = +i.match(/\d+/)[0]
            const name = i.match(/[A-Z]+/)[0];
            return {
                name,
                quantity,
            };
        }),
    };
    return p;
}, {});

let supply = {};
let oreUsed = 0;

function turnToOre(rule, quantity) {
    console.log(`Making ${quantity} ${rule.name}`);
    const iterations = Math.ceil(quantity/rule.quantity);
    rule.inputs.forEach(c => {
        const amount = iterations * c.quantity;
        if (!supply[c.name]) supply[c.name] = 0;

        if (c.name === 'ORE') {
            oreUsed += amount;
            console.log(`Consuming ${amount} ORE`);
        } else if (supply[c.name] >= amount) {
            supply[c.name] -= amount;
            console.log(`Consuming ${amount} ${c.name} (${supply[c.name]} left)`);
        } else {
            console.log(`Have ${supply[c.name]} ${c.name} already`);
            turnToOre(parsedInput[c.name], amount - supply[c.name]);
            supply[c.name] -= amount;
            console.log(`Consuming ${amount} ${c.name} (${supply[c.name]} left)`);
        }
    });
    supply[rule.name] += rule.quantity * iterations;
}

let i = 0;
let lastSupply = JSON.parse(JSON.stringify(supply));
let lastOreUsed = oreUsed;
let digits = 100000;
const oreAvailable = 1000000000000;
// const oreAvailable = 200;

while (digits >= 1) {
    turnToOre(parsedInput.FUEL, digits);
    if (oreUsed > oreAvailable) {
        supply = lastSupply;
        oreUsed = lastOreUsed;
        digits = digits / 10;
        console.log('Set last ore to ' + oreUsed);
    } else {
        i += digits;
        lastSupply = JSON.parse(JSON.stringify(supply));
        lastOreUsed = oreUsed;
    }
    console.log(i);
}

console.log(`ORE used: ${oreUsed}`);
console.log(`FUEL produced: ${i}`);