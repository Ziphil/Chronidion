//

import * as react from "react";
import {
  ReactElement
} from "react";
import {
  Instant
} from "../../module/instant/instant";
import {
  create
} from "../create";
import Letter from "./letter";


const Clock = create(
  "Clock",
  function ({
    instant
  }: {
    instant: Instant
  }): ReactElement {

    let node = (
      <div className="clock">
        <div className="clock-date">
          <div className="clock-date-full">
            <Letter string={instant.year ?? ""} length={4} split={true}/>
            <Letter string="/"/>
            <Letter string={instant.month ?? ""} length={2} split={true}/>
            <Letter string="/"/>
            <Letter string={instant.day ?? ""} length={2} split={true}/>
          </div>
          <div className="clock-date-hairia">
            <Letter string={instant.hairia ?? ""} length={4} split={true}/>
          </div>
        </div>
        <div className="clock-time">
          <Letter string={instant.hours ?? ""} length={2} split={true}/>
          <Letter string=":"/>
          <Letter string={instant.minutes ?? ""} length={2} split={true}/>
          <Letter string=":"/>
          <Letter string={instant.seconds ?? ""} length={2} split={true}/>
        </div>
      </div>
    );
    return node;

  }
);


export default Clock;