module.exports = function intcode(program, input) {
    program = [...program];

    let i = 0;
    let halted = false;
    
    while (!halted) {
        const instruction = '' + program[i];
        const iLength = instruction.length;
        const opcode = +instruction.substring(iLength - 2);
        const modes = [0,0,0];
        if (instruction.length > 2) modes[0] = +instruction.substring(iLength - 3, iLength - 2);
        if (instruction.length > 3) modes[1] = +instruction.substring(iLength - 4, iLength - 3);
        if (instruction.length > 4) modes[2] = +instruction.substring(iLength - 5, iLength - 4);

        function getParam(paramId) {
            return modes[paramId - 1] ? program[i+paramId] : program[program[i+paramId]];
        }

        switch(opcode) {
            case 1:
                program[program[i+3]] = getParam(1) + getParam(2);
                i += 4;
                break;
            case 2:
                program[program[i+3]] = getParam(1) * getParam(2);
                i += 4;
                break;
            case 3:
                program[program[i+1]] = input;
                i += 2;
                break;
            case 4:
                console.log(`Output at ${i}: ${getParam(1)}`);
                i += 2;
                break;
            case 5:
                if (getParam(1) != 0) i = getParam(2);
                else i += 3;
                break;
            case 6:
                if (getParam(1) == 0) i = getParam(2);
                else i += 3;
                break;
            case 7:
                program[program[i+3]] = getParam(1) < getParam(2) ? 1 : 0;
                i += 4;
                break;
            case 8:
                program[program[i+3]] = getParam(1) == getParam(2) ? 1 : 0;
                i += 4;
                break;
            case 99:
                halted = true;
                break;
            default:
                throw new Error("Unrecognised opcode " + opcode);
        }
    }

    return program[0];
}