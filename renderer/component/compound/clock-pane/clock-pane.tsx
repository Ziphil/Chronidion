//

import * as react from "react";
import {ReactElement} from "react";
import {Instant} from "/renderer/model/instant";
import {Letter} from "/renderer/component/atom/letter";
import {create} from "/renderer/component/create";
import {Pane, PaneHeader, PaneMain} from "/renderer/component/compound/pane";


export const ClockPane = create(
  require("./clock-pane.scss"), "ClockPane",
  function ({
    instant
  }: {
    instant: Instant
  }): ReactElement {

    return (
      <Pane>
        <PaneHeader>
          <div>
            {(instant.prefix !== null) ? <Letter string={instant.prefix} wide={true}/> : <Letter string={instant.year ?? ""} length={2} split={true}/>}
            <Letter string={(instant.year !== null) ? instant.yearSeparator : ""}/>
            <Letter string={instant.month ?? ""} length={2} split={true}/>
            <Letter string={(instant.month !== null) ? instant.monthSeparator : ""}/>
            <Letter string={instant.day ?? ""} length={2} split={true}/>
            <Letter styleName="weekday-separator" string={(instant.weekday !== null) ? instant.weekdaySeparator : ""}/>
            <Letter string={instant.weekday ?? ""} length={1} split={true}/>
          </div>
          <div>
            <Letter styleName="hairia-prefix" string={(instant.hairia !== null) ? "H" : ""}/>
            <Letter string={instant.hairia ?? ""} length={4} split={true}/>
          </div>
        </PaneHeader>
        <PaneMain>
          <div/>
          <div>
            <Letter string={instant.hours ?? ""} length={2} split={true}/>
            <Letter string={instant.hoursSeparator}/>
            <Letter string={instant.minutes ?? ""} length={2} split={true}/>
            <Letter string={instant.minutesSeparator}/>
            <Letter string={instant.seconds ?? ""} length={2} split={true}/>
          </div>
        </PaneMain>
      </Pane>
    );

  }
);