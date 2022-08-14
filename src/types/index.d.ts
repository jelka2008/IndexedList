export {};

declare global {
  interface Array<T> {
    $add: (arg: T) => number
  }
}
