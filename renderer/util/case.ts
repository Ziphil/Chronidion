//


export function toKebabCase(string: string): string {
  return string.replace(/([A-Z])/g, (char) => "-" + char.toLowerCase());
}

export function toSnakeCase(string: string): string {
  return string.replace(/([A-Z])/g, (char) => "_" + char.toLowerCase());
}

export type ToKebabCase<S extends string> = ToKebabCaseRec<S, "">;

type ToKebabCaseRec<S extends string, P extends string> = string extends S ? string : ToKebabcaseInner<S, P>;
type ToKebabcaseInner<S extends string, P extends string> = S extends `${infer C}${infer R}` ? ToKebabCaseRec<R, `${P}${C extends Lowercase<C> ? "" : "-"}${Lowercase<C>}`> : P;