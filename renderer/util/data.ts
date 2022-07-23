//


export class DataUtil {

  public static create(object: Record<string, DataSpec>): Record<`data-${string}`, string> {
    const dataEntries = [];
    for (const [name, spec] of Object.entries(object)) {
      if (spec !== null && spec !== undefined) {
        if (typeof spec === "string") {
          dataEntries.push([`data-${name}`, spec]);
        } else {
          if (spec.if && spec.true !== null && spec.true !== undefined) {
            dataEntries.push([`data-${name}`, spec.true]);
          } else if (!spec.if && spec.false !== null && spec.false !== undefined) {
            dataEntries.push([`data-${name}`, spec.false]);
          }
        }
      }
    }
    const data = Object.fromEntries(dataEntries);
    return data;
  }

}


type DataSpec = {if: boolean, true?: MaybeString, false?: MaybeString} | MaybeString;
type MaybeString = string | null | undefined;