//

import * as react from "react";
import {
  ReactElement,
  useMemo
} from "react";
import {
  DataUtil
} from "../../module/data";
import {
  create
} from "../create";


const Letter = create(
  "Letter",
  function ({
    string,
    length,
    split = false
  }: {
    string: string | number,
    length?: number,
    split?: boolean
  }): ReactElement {

    let actualString = useMemo(() => {
      let actualString = string.toString();
      if (length !== undefined) {
        actualString = actualString.padStart(length, (typeof string === "string") ? " " : "0");
      }
      return actualString;
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