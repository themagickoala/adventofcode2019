const input = [139301,84565,124180,133902,138726,62665,142967,95598,118044,73234,76476,51634,71582,63619,148430,134733,101537,101140,144543,102233,62048,128633,130113,92531,73820,54964,103485,96364,104119,121954,79215,99235,120179,69237,145584,79193,50684,146481,67783,112741,85024,62298,54083,137704,116561,76862,81410,96341,89992,132926,97955,74751,147553,121496,113303,119671,120871,114278,125628,144275,78826,87092,65883,87517,93974,55358,100922,113304,115728,144556,91728,86367,55283,101841,55454,140703,70706,98173,106920,126984,148960,77909,128304,140036,81044,141419,126770,52787,115783,128647,125986,124506,113935,142203,106404,78433,146573,68575,63563,115616];

function fuelReqs(input) {
    return Math.floor(input/3) - 2;
}

const outputA = input.reduce((p, c) => p + fuelReqs(c), 0);
console.log(outputA);

function recursiveFuelReqs(input) {
    let total = 0;
    let fuel = fuelReqs(input);
    while (fuel > 0) {
        total += fuel;
        fuel = fuelReqs(fuel);
    }
    return total;
}

const outputB = input.reduce((p, c) => p + recursiveFuelReqs(c), 0);
console.log(outputB);
