// eslint-disable-next-line @typescript-eslint/sort-type-union-intersection-members
export type RecursiveReadonly<T> = {
  readonly [P in keyof T]: RecursiveReadonly<T[P]>;
};
