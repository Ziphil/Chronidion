//

import * as react from "react";
import {
  ReactElement
} from "react";
import {
  Instant
} from "../../model/instant";
import Letter from "../atom/letter";
import {
  create
} from "../create";


const ClockPane = create(
  "ClockPane",
  function ({
    instant
  }: {
    instant: Instant
  }): ReactElement {

    let node = (
      <div className="pane">
        <div className="pane-head">
          <div className="pane-head-left">
            {(instant.prefix !== null) ? <Letter string={instant.prefix} wide={true}/> : <Letter string={instant.year ?? ""} length={2} split={true}/>}
            <Letter string={(instant.year !== null) ? instant.yearSeparator : ""}/>
            <Letter string={instant.month ?? ""} length={2} split={true}/>
            <Letter string={(instant.month !== null) ? instant.monthSeparator : ""}/>
            <Letter string={instant.day ?? ""} length={2} split={true}/>
            <Letter className="clock-weekday-separator" string={(instant.weekday !== null) ? instant.weekdaySeparator : ""}/>
            <Letter string={instant.weekday ?? ""} length={1} split={true}/>
          </div>
          <div className="pane-head-right">
            <Letter className="clock-hairia-prefix" string={(instant.hairia !== null) ? "H" : ""}/>
            <Letter string={instant.hairia ?? ""} length={4} split={true}/>
          </div>
        </div>
        <div className="pane-main">
          <div className="pane-main-left"/>
          <div className="pane-main-right">
            <Letter string={instant.hours ?? ""} length={2} split={true}/>
            <Letter string={instant.hoursSeparator}/>
            <Letter string={instant.minutes ?? ""} length={2} split={true}/>
            <Letter string={instant.minutesSeparator}/>
            <Letter string={instant.seconds ?? ""} length={2} split={true}/>
          </div>
        </div>
      </div>
    );
    return node;

  }
);


export default ClockPane;