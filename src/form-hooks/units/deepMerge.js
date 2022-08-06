export const isPlainObject = (item) =>
  item !== null && typeof item === 'object' && item.constructor === Object

const deepmerge = (target, source) => {
  const output = target

  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach((key) => {
      if (key === '__proto__') {
        return
      }
      if (
        isPlainObject(source[key]) &&
        key in target &&
        isPlainObject(target[key])
      ) {
        output[key] = deepmerge(target[key], source[key])
      } else {
        output[key] = source[key]
      }
    })
  }
  return output
}
export default deepmerge
