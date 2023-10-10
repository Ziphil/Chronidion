//

import * as react from "react";
import {
  ReactElement,
  useMemo
} from "react";
import {
  DataUtil
} from "../../util/data";
import {
  create
} from "../create";


const Letter = create(
  "Letter",
  function ({
    string,
    length,
    decimalLength,
    split = false,
    unit = false,
    wide = false,
    simple = false,
    className
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
    const data = DataUtil.create({
      content: actualString,
      simple: {if: simple, true: "true"}
    });
    const node = (
      <span className={"letter" + ((className) ? ` ${className}` : "")} {...data}>
        {chars.map((char, index) => (
          <LetterChar key={index} {...{char, unit, wide, simple}}/>
        ))}
      </span>
    );
    return node;

  }
);


const LetterChar = create(
  "LetterChar",
  function ({
    char,
    unit,
    wide,
    simple
  }: {
    char: string,
    unit: boolean,
    wide: boolean,
    simple: boolean
  }): ReactElement {

    const data = DataUtil.create({
      content: char,
      numeral: {if: char.match(/^\d$/) !== null, true: "true"},
      unit: {if: unit, true: "true"},
      wide: {if: wide, true: "true"},
      simple: {if: simple, true: "true"}
    });
    const node = (
      <span className="letter-char" {...data}>{char}</span>
    );
    return node;

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

export default Letter;