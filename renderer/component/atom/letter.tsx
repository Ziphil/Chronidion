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
    split = false
  }: {
    string: string | number,
    length?: number,
    decimalLength?: number
    split?: boolean
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
    let innerNode = (() => {
      if (split) {
        let innerNode = actualString.split("").map((char, index) => <span key={index} className="letter-char" {...DataUtil.create({content: char})}>{char}</span>);
        return innerNode;
      } else {
        return <span className="letter-char" {...DataUtil.create({content: actualString})}>{actualString}</span>;
      }
    })();
    let node = (
      <span className="letter">
        {innerNode}
      </span>
    );
    return node;

  }
);


export default Letter;