//


export class DataUtil {

  public static create(object: Record<string, DataSpec>): Record<`data-${string}`, string> {
    let dataEntries = [];
    for (let [name, spec] of Object.entries(object)) {
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
    let data = Object.fromEntries(dataEntries);
    return data;
  }

}


type DataSpec = {if: boolean, true?: MaybeString, false?: MaybeString} | MaybeString;
type MaybeString = string | null | undefined;