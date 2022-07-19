

const inValidPath = (reference, current, next) => {
    const isInstanceOf = !(reference[current] instanceof Object) || !(reference[current] instanceof Array)
    const nextElem = reference[current][next] ?? false

console.log('nextElem', next)

    return next && !nextElem && isInstanceOf
}

export const mutableObjectByPath = (values, path) => {
    const splitPath = path.split('.')

    let reference = values
    let referenceEnd = null

    const endPropertyInPath = splitPath[splitPath.length - 1]

    splitPath.forEach( (str, idx) => {
        const current = splitPath[idx]
        const next = splitPath[idx + 1]

        if (Number(next) || next === '0') {
            if (reference[current] === undefined) {
                reference[current] = Array.from({ length: Number(next) })

                reference = reference[current]
            } else {
                reference = reference[current]
            }
        } else {
            if (reference[current] === undefined) {
                reference[current] = (idx === splitPath.length - 1) ? undefined : {}

                referenceEnd = reference
                reference = reference[current]
            } else {
                referenceEnd = reference

console.log('reference', reference, current)
                if (next && reference[next] === undefined) reference[current] = {}
                if (next && (Number(next) || next === '0')) reference[current] = []


                reference = reference[current]

            }
        }
    })

    return {
        property: endPropertyInPath,
        reference: referenceEnd,
        defaultValue: referenceEnd[endPropertyInPath]
    }
}
