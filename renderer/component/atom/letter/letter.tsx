//

import * as react from "react";
import {ReactElement, useMemo} from "react";
import {create} from "/renderer/component/create";
import {data} from "/renderer/util/data";
import {LetterChar} from "./letter-char";


export const Letter = create(
  require("./letter.scss"), "Letter",
  function ({
    string,
    length,
    decimalLength,
    split = false,
    unit = false,
    wide = false,
    simple = false,
    ...rest
  }: {
    string: string | number,
    length?: number,
    decimalLength?: number,
    split?: boolean,
    unit?: boolean,
    wide?: boolean,
    simple?: boolean,
    className?: string
  }): ReactElement {

    const actualString = useMemo(() => getActualString(string, length, decimalLength), [string, length, decimalLength]);
    const chars = (split) ? actualString.split("") : [actualString];

    return (
      <span styleName="root" {...data({content: actualString, simple})} {...rest}>
        {chars.map((char, index) => (
          <LetterChar key={index} {...{char, unit, wide, simple}}/>
        ))}
      </span>
    );

  }
);


function getActualString(string: string | number, length?: number, decimalLength?: number): string {
  if (typeof string === "string") {
    let actualString = string;
    if (length !== undefined) {
      actualString = actualString.padStart(length, " ");
    }
    return actualString;
  } else {
    const sign = Math.sign(string);
    let actualString = (decimalLength !== undefined) ? Math.abs(string).toFixed(decimalLength) : Math.abs(string).toString();
    if (length !== undefined) {
      let stringLength = (decimalLength !== undefined) ? length + decimalLength + 1 : length;
      if (sign < 0) {
        stringLength -= 1;
      }
      actualString = actualString.padStart(stringLength, "0");
    }
    if (sign < 0) {
      actualString = "−" + actualString;
    }
    return actualString;
  }
}