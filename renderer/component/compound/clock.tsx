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

    let yearNode = (() => {
      if (instant.prefix === null) {
        let yearNode = (
          <span className="clock-year">
            <Letter string={instant.year ?? ""} length={4} split={true}/>
          </span>
        );
        return yearNode;
      } else {
        let yearClassName = (instant.year !== null) ? "clock-year-prefixed" : "clock-year-alone";
        let yearNode = (
          <span className={yearClassName}>
            <Letter string={instant.prefix}/>
            <Letter string={instant.year ?? ""} length={2} split={true}/>
          </span>
        );
        return yearNode;
      }
    })();
    let node = (
      <div className="clock">
        <div className="clock-date">
          <div className="clock-date-full">
            {yearNode}
            <span className="clock-slash">
              <Letter string={(instant.year !== null) ? "/" : ""}/>
            </span>
            <span className="clock-month">
              <Letter string={instant.month ?? ""} length={2} split={true}/>
            </span>
            <span className="clock-slash">
              <Letter string={(instant.month !== null) ? "/" : ""}/>
            </span>
            <span className="clock-day">
              <Letter string={instant.day ?? ""} length={2} split={true}/>
            </span>
          </div>
          <div className="clock-date-hairia">
            <span className="clock-hairia">
              <Letter string={instant.hairia ?? ""} length={4} split={true}/>
            </span>
          </div>
        </div>
        <div className="clock-time">
          <span className="clock-hours">
            <Letter string={instant.hours ?? ""} length={2} split={true}/>
          </span>
          <span className="clock-colon">
            <Letter string=":"/>
          </span>
          <span className="clock-minutes">
            <Letter string={instant.minutes ?? ""} length={2} split={true}/>
          </span>
          <span className="clock-colon">
            <Letter string=":"/>
          </span>
          <span className="clock-seconds">
            <Letter string={instant.seconds ?? ""} length={2} split={true}/>
          </span>
        </div>
      </div>
    );
    return node;

  }
);


export default Clock;