module.exports = function intcode(program, pointer, ...input) {
    program = [...program];

    let i = pointer;
    let halted = false;
    let inputNo = 0;
    let outputs = [];
    let relBase = 0;
    
    while (!halted) {
        const instruction = '' + program[i];
        const iLength = instruction.length;
        const opcode = +instruction.substring(iLength - 2);
        const modes = [0,0,0];
        if (instruction.length > 2) modes[0] = +instruction.substring(iLength - 3, iLength - 2);
        if (instruction.length > 3) modes[1] = +instruction.substring(iLength - 4, iLength - 3);
        if (instruction.length > 4) modes[2] = +instruction.substring(iLength - 5, iLength - 4);

        function getParam(paramId) {
            switch(modes[paramId - 1]) {
                case 0:
                    return program[program[i+paramId]] || 0;
                case 1:
                    return program[i+paramId] || 0;
                case 2:
                    return program[relBase + program[i+paramId]] || 0;
            }
        }

        function setParam(paramId, value) {
            switch(modes[paramId - 1]) {
                case 0:
                    program[program[i+paramId]] = value;
                    break;
                case 1:
                    throw new Error('Cannot set in immediate mode');
                case 2:
                    program[relBase + program[i+paramId]] = value;
                    break;
            }
        }

        switch(opcode) {
            case 1:
                setParam(3, getParam(1) + getParam(2));
                i += 4;
                break;
            case 2:
                setParam(3, getParam(1) * getParam(2));
                i += 4;
                break;
            case 3:
                console.log(`Input at ${inputNo}: ${input[inputNo]}`);
                if (input[inputNo] === undefined) {
                    return {
                        result: program[0],
                        pointer: i,
                        halted,
                        outputs,
                        program,
                    }
                }
                setParam(1, input[inputNo]);
                inputNo++;
                i += 2;
                break;
            case 4:
                outputs.push(getParam(1));
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
                setParam(3, getParam(1) < getParam(2) ? 1 : 0);
                i += 4;
                break;
            case 8:
                setParam(3, getParam(1) == getParam(2) ? 1 : 0);
                i += 4;
                break;
            case 9:
                relBase += getParam(1);
                i += 2;
                break;
            case 99:
                halted = true;
                break;
            default:
                throw new Error("Unrecognised opcode " + opcode);
        }
    }

    return {
        result: program[0],
        pointer: i,
        halted,
        outputs,
        program,
    };
}