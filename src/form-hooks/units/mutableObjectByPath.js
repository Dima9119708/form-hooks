import { formatPath } from './formatPath'

export const mutableObjectByPath = (values, path) => {
  const splitPath = formatPath(path)

  let reference = values
  let referenceEnd = null

  const endPropertyInPath = splitPath[splitPath.length - 1]

  splitPath.forEach((str, idx) => {
    const current = splitPath[idx]
    const next = splitPath[idx + 1]

    if (Number(next) || next === '0') {
      if (reference[current] === undefined) {
        reference[current] = Array.from({ length: Number(next) })

        reference = reference[current]
      } else {
        if (!Array.isArray(reference[current])) {
          reference[current] = Array.from({ length: Number(next) })
        }

        reference = reference[current]
      }
    } else {
      if (reference[current] === undefined) {
        reference[current] = idx === splitPath.length - 1 ? undefined : {}

        referenceEnd = reference
        reference = reference[current]
      } else {
        if (next && !(reference[current] instanceof Object)) {
          reference[current] = {}
        }

        referenceEnd = reference

        reference = reference[current]
      }
    }
  })

  return {
    property: endPropertyInPath,
    reference: referenceEnd,
    defaultValue: referenceEnd[endPropertyInPath],
  }
}
