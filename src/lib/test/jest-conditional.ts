declare namespace jest {
  interface Describe {
    if(
      condition: unknown,
      name: number | string | Function | jest.FunctionLike,
      fn: jest.EmptyFunction,
    ): void
    unless: typeof describe.if
  }

  interface It {
    if(
      condition: unknown,
      name: string,
      fn?: ProvidesCallback,
      timeout?: number,
    ): void
    unless: typeof it.if
  }
}

describe.if = (
  condition: unknown,
  name: number | string | Function | jest.FunctionLike,
  fn: jest.EmptyFunction,
) => {
  if (condition) {
    describe(name, fn)
  }
}
describe.unless = (
  condition: unknown,
  name: number | string | Function | jest.FunctionLike,
  fn: jest.EmptyFunction,
) => {
  if (!condition) {
    describe(name, fn)
  }
}

it.if = (
  condition: unknown,
  name: string,
  fn?: jest.ProvidesCallback,
  timeout?: number,
) => {
  if (condition) {
    it(name, fn, timeout)
  }
}
it.unless = (
  condition: unknown,
  name: string,
  fn?: jest.ProvidesCallback,
  timeout?: number,
) => {
  if (!condition) {
    it(name, fn, timeout)
  }
}
