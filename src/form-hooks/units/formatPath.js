const logic = (path) => (acc, symbol, idx) => {
    const prev = path[idx - 1]
    const next = path[idx + 1]

    if (symbol === '[' && prev === '.') {
        acc += ''
    }
    else if (symbol === ']' && next === '.') {
        acc += ''
    }
    else if (symbol === '[' && prev !== '.') {
        acc += '.'
    }
    else if (symbol === ']' && next !== '.') {
        acc += ''
    }
    else if (symbol === '.' && next === '.') {
        acc += ''
    }
    else if (symbol === '.' && prev === '.') {
        acc += ''
    }
    else {
        acc += symbol
    }

    return acc
}

export const formatPath = (path) => path.split('').reduce(logic(path), '').split('.')
