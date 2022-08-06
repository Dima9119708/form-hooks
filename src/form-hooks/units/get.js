import { formatPath } from './formatPath'

export const get = (path, values) => {
  const splitPath = formatPath(path)

  let value = values

  splitPath.forEach((str, idx) => {
    const current = splitPath[idx]

    value = value?.[current] // TODO => разобраться....

    if (value === undefined) return
  })

  return value
}
