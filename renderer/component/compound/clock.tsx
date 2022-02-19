//

import * as react from "react";
import {
  ReactElement
} from "react";
import {
  create
} from "../create";
import Letter from "./letter";


const Clock = create(
  "Clock",
  function ({
  }): ReactElement {

    let node = (
      <div className="clock">
        <div className="clock-date">
          <div className="clock-date-full">
            <Letter string={2022} length={4} split={true}/>
            <Letter string="/"/>
            <Letter string={2} length={2} split={true}/>
            <Letter string="/"/>
            <Letter string={18} length={2} split={true}/>
          </div>
          <div className="clock-date-hairia">
            <Letter string={3657} length={4} split={true}/>
          </div>
        </div>
        <div className="clock-time">
          <Letter string={19} length={2} split={true}/>
          <Letter string=":"/>
          <Letter string={28} length={2} split={true}/>
          <Letter string=":"/>
          <Letter string={15} length={2} split={true}/>
        </div>
      </div>
    );
    return node;

  }
);


export default Clock;