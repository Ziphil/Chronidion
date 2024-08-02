//

import * as react from "react";
import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {data} from "/renderer/util/data";


export const LetterChar = create(
  require("./letter-char.scss"), "LetterChar",
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

    const numeral = char.match(/^\d$/) !== null;

    return (
      <span styleName="root" {...data({content: char, numeral, unit, wide, simple})}>
        {char}
      </span>
    );

  }
);