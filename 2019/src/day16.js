const { fact, comb } = require('./lib/combinations');
const input = `59731816011884092945351508129673371014862103878684944826017645844741545300230138932831133873839512146713127268759974246245502075014905070039532876129205215417851534077861438833829150700128859789264910166202535524896960863759734991379392200570075995540154404564759515739872348617947354357737896622983395480822393561314056840468397927687908512181180566958267371679145705350771757054349846320639601111983284494477902984330803048219450650034662420834263425046219982608792077128250835515865313986075722145069152768623913680721193045475863879571787112159970381407518157406924221437152946039000886837781446203456224983154446561285113664381711600293030463013`;

const pattern = [1,0,-1,0];

function fft(signal, startIndex = 0) {
    const sigLen = signal.length;
    let output = signal.substr(0, startIndex);
    for (let i = startIndex; i < sigLen; i++) {
        let digit = 0;
        for (let j = i; j < sigLen; j++) {
            if (i > sigLen / 2) {
                digit += signal[j];
            } else {
                const index = Math.floor((j-i)/(i+1)) % 4;
                digit += signal[j]*pattern[index];
            }
        }
        output += ('' + digit).split('').pop();
    }
    return output;
}

function simpleFft(signal) {
    const sigLen = signal.length;
    let output = '';
    let lastResult = 0;
    for (let i = sigLen - 1; i >= 0; i--) {
        let digit = +signal[i];
        lastResult = digit + lastResult;
        output = `${lastResult % 10}${output}`;
    }
    return output;
}

let offset = 5973181;
let signal = '';
for (var i = 0; i < 10000; i++) {
    signal += input;
}

signal = signal.substring(offset);
// console.log(signal);
for (var i = 0; i < 100; i++) {
    signal = simpleFft(signal);
}

console.log(signal.substr(0,8));

// function digitAt(pos,iter) {
//     let original = +input[pos];
//     console.log(`Original: ${original}`);
//     let result = 0;
//     for (var j = pos; j < input.length; j++) {
//         const toAdd = comb(iter+j-pos,iter) * (+input[j]);
//         console.log('Adding ' + toAdd);
//         result += toAdd;
//     }
//     result = ('' + result).split('').pop();
//     console.log(`New: ${result}`);
//     return result;
// }

// console.log(digitAt(input.length - 2, 100));