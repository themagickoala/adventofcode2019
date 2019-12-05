const input = {min: 307237, max: 769058};
const realInput = {min: 333333, max: 699999};

function match(password) {
    if (password < input.min) return false;
    if (password > input.max) return false;
    const chars = '' + password;
    if (chars.length != 6) return false;
    let double = false;
    for (var i = 0; i < 5; i++) {
        const a = +chars.charAt(i);
        const b = +chars.charAt(i+1);
        if (b < a) return false;
        if (i == 0) {
            if (b == a && b != +chars.charAt(i+2)) double = true;
        } else {
            if (b == a && b != +chars.charAt(i+2) && b != +chars.charAt(i-1)) double = true;
        }
    }
    return double;
}

let count = 0;

for (var i = input.min; i <= input.max; i++) {
    if (match(i)) count++;
}

console.log(count);
