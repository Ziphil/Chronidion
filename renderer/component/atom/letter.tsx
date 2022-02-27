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
    unit = false
  }: {
    string: string | number,
    length?: number,
    decimalLength?: number
    split?: boolean,
    unit?: boolean
  }): ReactElement {

    let actualString = useMemo(() => {
      if (typeof string === "string") {
        let actualString = string;
        if (length !== undefined) {
          actualString = actualString.padStart(length, " ");
        }
        return actualString;
      } else {
        let sign = Math.sign(string);
        let actualString = (decimalLength !== undefined) ? Math.abs(string).toFixed(decimalLength) : Math.abs(string).toString();
        if (length !== undefined) {
          let stringLength = (decimalLength !== undefined) ? length + decimalLength + 1 : length;
          if (sign < 0) {
            stringLength = stringLength - 1;
          }
          actualString = actualString.padStart(stringLength, "0");
        }
        if (sign < 0) {
          actualString = "−" + actualString;
        }
        return actualString;
      }
    }, [string, length]);
    let chars = (split) ? actualString.split("") : [actualString];
    let innerNodes = chars.map((char, index) => {
      let data = DataUtil.create({
        content: char,
        numeral: {if: char.match(/^\d$/) !== null, true: "true"},
        unit: {if: unit, true: "true"}
      });
      let innerNode = (
        <span key={index} className="letter-char" {...data}>{char}</span>
      );
      return innerNode;
    });
    let node = (
      <span className="letter">
        {innerNodes}
      </span>
    );
    return node;

  }
);


export default Letter;