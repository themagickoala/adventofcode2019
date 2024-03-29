const intcode = require('./lib/intcode');
const permutations = [
    [0,1,2,3,4],
    [1,0,2,3,4],
    [2,0,1,3,4],
    [0,2,1,3,4],
    [1,2,0,3,4],
    [2,1,0,3,4],
    [2,1,3,0,4],
    [1,2,3,0,4],
    [3,2,1,0,4],
    [2,3,1,0,4],
    [1,3,2,0,4],
    [3,1,2,0,4],
    [3,0,2,1,4],
    [0,3,2,1,4],
    [2,3,0,1,4],
    [3,2,0,1,4],
    [0,2,3,1,4],
    [2,0,3,1,4],
    [1,0,3,2,4],
    [0,1,3,2,4],
    [3,1,0,2,4],
    [1,3,0,2,4],
    [0,3,1,2,4],
    [3,0,1,2,4],
    [4,0,1,2,3],
    [0,4,1,2,3],
    [1,4,0,2,3],
    [4,1,0,2,3],
    [0,1,4,2,3],
    [1,0,4,2,3],
    [1,0,2,4,3],
    [0,1,2,4,3],
    [2,1,0,4,3],
    [1,2,0,4,3],
    [0,2,1,4,3],
    [2,0,1,4,3],
    [2,4,1,0,3],
    [4,2,1,0,3],
    [1,2,4,0,3],
    [2,1,4,0,3],
    [4,1,2,0,3],
    [1,4,2,0,3],
    [0,4,2,1,3],
    [4,0,2,1,3],
    [2,0,4,1,3],
    [0,2,4,1,3],
    [4,2,0,1,3],
    [2,4,0,1,3],
    [3,4,0,1,2],
    [4,3,0,1,2],
    [0,3,4,1,2],
    [3,0,4,1,2],
    [4,0,3,1,2],
    [0,4,3,1,2],
    [0,4,1,3,2],
    [4,0,1,3,2],
    [1,0,4,3,2],
    [0,1,4,3,2],
    [4,1,0,3,2],
    [1,4,0,3,2],
    [1,3,0,4,2],
    [3,1,0,4,2],
    [0,1,3,4,2],
    [1,0,3,4,2],
    [3,0,1,4,2],
    [0,3,1,4,2],
    [4,3,1,0,2],
    [3,4,1,0,2],
    [1,4,3,0,2],
    [4,1,3,0,2],
    [3,1,4,0,2],
    [1,3,4,0,2],
    [2,3,4,0,1],
    [3,2,4,0,1],
    [4,2,3,0,1],
    [2,4,3,0,1],
    [3,4,2,0,1],
    [4,3,2,0,1],
    [4,3,0,2,1],
    [3,4,0,2,1],
    [0,4,3,2,1],
    [4,0,3,2,1],
    [3,0,4,2,1],
    [0,3,4,2,1],
    [0,2,4,3,1],
    [2,0,4,3,1],
    [4,0,2,3,1],
    [0,4,2,3,1],
    [2,4,0,3,1],
    [4,2,0,3,1],
    [3,2,0,4,1],
    [2,3,0,4,1],
    [0,3,2,4,1],
    [3,0,2,4,1],
    [2,0,3,4,1],
    [0,2,3,4,1],
    [1,2,3,4,0],
    [2,1,3,4,0],
    [3,1,2,4,0],
    [1,3,2,4,0],
    [2,3,1,4,0],
    [3,2,1,4,0],
    [3,2,4,1,0],
    [2,3,4,1,0],
    [4,3,2,1,0],
    [3,4,2,1,0],
    [2,4,3,1,0],
    [4,2,3,1,0],
    [4,1,3,2,0],
    [1,4,3,2,0],
    [3,4,1,2,0],
    [4,3,1,2,0],
    [1,3,4,2,0],
    [3,1,4,2,0],
    [2,1,4,3,0],
    [1,2,4,3,0],
    [4,2,1,3,0],
    [2,4,1,3,0],
    [1,4,2,3,0],
    [4,1,2,3,0]
];

const input = [3,8,1001,8,10,8,105,1,0,0,21,34,51,76,101,114,195,276,357,438,99999,3,9,1001,9,3,9,1002,9,3,9,4,9,99,3,9,101,4,9,9,102,4,9,9,1001,9,5,9,4,9,99,3,9,1002,9,4,9,101,3,9,9,102,5,9,9,1001,9,2,9,1002,9,2,9,4,9,99,3,9,1001,9,3,9,102,2,9,9,101,4,9,9,102,3,9,9,101,2,9,9,4,9,99,3,9,102,2,9,9,101,4,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,99,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,99];

console.log('--- Part A ---');
let maxThrust = 0;
for (var p = 0, tot = permutations.length; p < tot; p++) {
    let nextInput = 0;
    for (var i = 0; i < 5; i++) {
        console.log("Amp " + i + " input = (" + permutations[p][i] + ", " + nextInput + ")");
        const { outputs } = intcode(input, 0, 0, permutations[p][i], nextInput);
        nextInput = outputs[0];
        console.log("Amp " + i + " output = " + nextInput);
    }
    maxThrust = Math.max(maxThrust, nextInput);
}

console.log(maxThrust);
console.log('--- Part B ---');
maxThrust = 0;

for (var p = 0, tot = permutations.length; p < tot; p++) {
    let nextInput = 0;
    let programStates = [];
    let i;
    for (i = 0; i < 5; i++) {
        const programState = intcode(input, 0, 0, permutations[p][i] + 5, nextInput);
        nextInput = programState.outputs[0];
        programStates.push(programState);
    }
    let halted = false;
    while (!halted) {
        if (i >= 5) i = 0;
        const program = programStates[i];
        if (program.halted) break;
        const state = intcode(program.program, program.pointer, program.relBase, nextInput);
        nextInput = state.outputs[0];
        programStates[i] = state;
        i++;
    }

    maxThrust = Math.max(maxThrust, nextInput);
}

console.log(maxThrust);
