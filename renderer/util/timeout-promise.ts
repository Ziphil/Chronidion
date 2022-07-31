//


export function makeRace<T>(promise: Promise<T>, timeout: number): Promise<T> {
  const racingPromise = Promise.race([promise, createTimeoutPromise(timeout)]);
  return racingPromise;
}

function createTimeoutPromise(timeout: number): Promise<never> {
  const promise = new Promise<never>((resolve, reject) => {
    setTimeout(() => reject("timeout"), timeout);
  });
  return promise;
}