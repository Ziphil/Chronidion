//

import * as react from "react";
import {
  ReactElement,
  useMemo
} from "react";
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
    let innerNode = (split) ? actualString.split("").map((char, index) => <span className="letter-char" key={index}>{char}</span>) : <span className="letter-char">{actualString}</span>;
    let node = (
      <span className="letter">
        {innerNode}
      </span>
    );
    return node;

  }
);


export default Letter;