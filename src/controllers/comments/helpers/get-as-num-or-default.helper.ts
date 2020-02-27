
export const getAsNumOrDefault = (maybeStringNum: string | undefined, defaultVal: number) => {
  if (!maybeStringNum) return defaultVal
  const asInt = parseInt(maybeStringNum, 10)
  return !isNaN(asInt) ? asInt : defaultVal
}