export function wait(foo?: any, time: number = 500) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
